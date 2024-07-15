// commands/warnings.js

import { CustomClient } from "../types"; // Import CustomClient interface

import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
module.exports = {
  data: {
    name: "warnings",
    type: 1,
    description: "Get a list of warnings for the server or a user.",
    default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to get warnings for.",
      },
      {
        type: 4,
        name: "page",
        description: "Choose a page number",
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
    const i18n = client.i18n[await client.getLanguage(guild.id)].warnings;

    const targetUser = interaction
      ? (interaction.options.get("user")?.member as GuildMember)
      : message.mentions.members!.first() || guild.members.cache.get(args[1]);

    const page = parseInt(
      (interaction
        ? interaction.options.get("page")?.value?.toString()
        : args[2]) || "1"
    );

    const warnings = (await client.db.get(`warns.${guild.id}`)) || [];

    let filteredWarnings = warnings;
    if (targetUser)
      filteredWarnings = warnings.filter(
        (warn: { user: string }) => warn.user === targetUser.id
      );

    const warningsPerPage = 5;
    const start = (page - 1) * warningsPerPage;

    const embed = new EmbedBuilder()
      .setTitle(
        `**${filteredWarnings.length} ${
          i18n.warningsTitle
        }** ( ${page}/${Math.ceil(filteredWarnings.length / warningsPerPage)} )`
      )
      .setFooter({
        text: `${i18n.requestedBy} ${user.username}`,
        iconURL: user.displayAvatarURL(),
      });

    filteredWarnings
      .slice(start, start + warningsPerPage)
      .forEach(
        (
          warn: { timestamp: number; moderator: any; user: any; reason: any },
          index: number
        ) => {
          embed.addFields({
            name: `⏱ <t:${Math.floor(warn.timestamp / 1000)}>`,
            value: `${i18n.warnID} (**${start + index + 1}**) - ${i18n.by} <@${
              warn.moderator
            }>\n${i18n.user}: <@${warn.user}>\n\`\`\`${warn.reason}\`\`\``,
            inline: false,
          });
        }
      );

    return { embeds: [embed] };
  },
};
