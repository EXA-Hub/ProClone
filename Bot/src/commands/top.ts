// commands/top.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { getGuildDataForDays } from "../database/guilds/recorder";

import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
  EmbedBuilder,
  Role,
} from "discord.js";
module.exports = {
  data: {
    name: "top",
    type: 1,
    description: "Displays the most active members on the server",
    options: [
      {
        type: 3,
        name: "type",
        description: "The leaderboard type either text or voice.",
        choices: [
          {
            name: "Text",
            value: "text",
          },
          {
            name: "Voice",
            value: "voice",
          },
          {
            name: "Invite",
            value: "invites",
          },
        ],
      },
      {
        type: 3,
        name: "duration",
        description: "The leaderboard specified duration.",
        choices: [
          {
            name: "Day",
            value: "day",
          },
          {
            name: "Week",
            value: "week",
          },
          {
            name: "Month",
            value: "month",
          },
        ],
      },
      {
        type: 4,
        name: "page",
        description: "The leaderboard page number.",
        min_value: 1,
      },
      {
        type: 8,
        name: "role",
        description: "Filter leaderboard for specific members with a role.",
      },
    ],
  },
  execute: async (
    client: CustomClient,
    interaction: CommandInteraction,
    message: Message,
    guild: Guild,
    member: GuildMember,
    user: User,
    channel: Channel,
    args: string[]
  ) => {
    let type, duration, page, role;

    if (interaction) {
      // Slash command handling
      type = interaction.options.get("type")?.value?.toString();
      duration = interaction.options.get("duration")?.value?.toString();
      page = interaction.options.get("page")?.value?.toString();
      role = interaction.options.get("role")?.role?.id;
    } else if (message && args) {
      args.shift();
      args = args.filter((arg) => arg !== "");
      // Message command handling
      [type, duration, page, role] = parseMessageArgs(args);
    }

    page = parseInt(page || "1");
    if (role) role = guild.roles.cache.get(role);

    if (type === "invites") return "Sorry, still working on that.";

    // Simulate fetching data for demonstration
    let xpData;
    if (duration)
      xpData = getGuildDataForDays(
        guild.id,
        duration === "day" ? 1 : duration === "week" ? 7 : 30
      ).reduce((acc: any, curr: any) => {
        const { xp } = curr;
        for (let userId in xp) {
          if (!acc[userId]) {
            acc[userId] = {
              textXP: 0,
              voiceXP: 0,
            };
          }
          acc[userId].textXP += xp[userId].textXP || 0;
          acc[userId].voiceXP += xp[userId].voiceXP || 0;
        }
        return acc;
      }, {});
    else xpData = await client.db.get(`xp_${guild.id}`);

    // Construct the leaderboard response based on fetched data
    let topTextXP = [];
    let topVoiceXP = [];

    // Add logic to populate topTextXP and topVoiceXP arrays
    if (xpData) {
      for (let userId in xpData) {
        if (!(role && role instanceof Role && !role.members.has(userId))) {
          if ((!type || type === "text") && xpData[userId].textXP) {
            topTextXP.push({
              userId: userId,
              xp: xpData[userId].textXP,
            });
          }
          if ((!type || type === "voice") && xpData[userId].voiceXP) {
            topVoiceXP.push({
              userId: userId,
              xp: xpData[userId].voiceXP,
            });
          }
        }
      }

      // Sort arrays by XP
      topTextXP.sort((a, b) => b.xp - a.xp);
      topVoiceXP.sort((a, b) => b.xp - a.xp);
    }

    const embed = new EmbedBuilder()
      .setColor(8387074)
      .setTimestamp(new Date())
      .setAuthor({ name: "📋 Guild Score Leaderboards" })
      .setFooter({
        text: user.username,
        iconURL: user.displayAvatarURL(),
      });

    if (topTextXP.length > 0) {
      const textField = {
        name: "**TOP TEXT :speech_balloon:**",
        value:
          topTextXP
            .map(
              (entry, index) =>
                `**#${index + 1} I <@!${entry.userId}> XP: \`${entry.xp}\`**`
            )
            .slice(type ? 10 : 5 * (page - 1), page * (type ? 10 : 5))
            .join("\n") + `\n:sparkles: **More?** \`/top text\``,
        inline: true,
      };
      embed.addFields(textField);
    }

    if (topVoiceXP.length > 0) {
      const voiceField = {
        name: "**TOP VOICE :microphone2:**",
        value:
          topVoiceXP
            .map(
              (entry, index) =>
                `**#${index + 1} I <@!${entry.userId}> XP: \`${entry.xp}\`**`
            )
            .slice(type ? 10 : 5 * (page - 1), page * (type ? 10 : 5))
            .join("\n") + `\n:sparkles: **More?** \`/top voice\``,
        inline: true,
      };
      embed.addFields(voiceField);
    }

    return { embeds: [embed] };
  },
};

function parseMessageArgs(args: string[]): string[] | undefined[] {
  let type, duration, page, role;

  args.forEach((arg) => {
    if (["text", "voice", "invites"].includes(arg)) type = arg;
    else if (["day", "week", "month"].includes(arg)) duration = arg;
    else if (!isNaN(parseInt(arg))) page = arg;
    else if (arg.startsWith("<@&") && arg.endsWith(">")) role = arg;
  });

  return [type, duration, page, role];
}
