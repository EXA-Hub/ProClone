// commands/points.js

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
    name: "points",
    type: 1,
    description: "A server based points that can be given by moderators.",
    default_member_permissions: PermissionFlagsBits.ManageGuild.toString(),
    options: [
      {
        type: 1,
        name: "increase",
        description: "Increase additional points.",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to set points for.",
            required: true,
          },
          {
            type: 4,
            name: "points",
            description: "Points to increase.",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "decrease",
        description: "Decrease points from a user.",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to set points for.",
            required: true,
          },
          {
            type: 4,
            name: "points",
            description: "Points to decrease.",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "set",
        description: "Set points to a specific amount.",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to set points for.",
            required: true,
          },
          {
            type: 4,
            name: "points",
            description: "Points to set.",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "reset",
        description: "Resets the points of all the members or a specific user.",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to reset points for.",
          },
        ],
      },
      {
        type: 1,
        name: "list",
        description: "Show all members points.",
        options: [
          {
            type: 8,
            name: "filter",
            description: "Role to filter points for.",
          },
          {
            type: 4,
            name: "page",
            description: "Choose a points page number",
          },
        ],
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
    if (args) args = args.filter((arg) => arg !== "");
    const i18n = client.i18n[await client.getLanguage(guild.id)].points;
    // Check if there are mentioned members or a guild member exists with the provided argument
    // Determine the action based on the context (interaction or message)
    const action = interaction
      ? interaction.options.data[0].name // If interaction exists, use the action name from interaction options
      : args[1] === "reset" // If the second argument is "reset" (no numbers in message content)
      ? "reset" // Set action to "reset"
      : /(?<!<[@&#])\d+(?![\d>])/g.test(message.content) // If no interaction, check if message content contains numbers
      ? (message.mentions.members &&
          message.mentions.members.size &&
          message.mentions.members.size > 0) ||
        guild.members.cache.has(args[1]) // If message contains numbers, check if there are mentioned members or a guild member
        ? message.content.includes("+") // If content includes "+", set action to "increase"
          ? "increase"
          : message.content.includes("-") // If content includes "-", set action to "decrease"
          ? "decrease"
          : "set" // Otherwise, set action to "set"
        : "list" // If no members mentioned or valid guild member, set action to "list"
      : "list"; // Default action is "list" if no specific conditions are met
    // console.log(action);
    const targetUser = interaction
      ? (interaction.options.get("user")?.member as GuildMember)
      : message.mentions.members!.first() ||
        guild.members.cache.get(args[1]) ||
        guild.members.cache.get(args[2]) ||
        guild.members.cache.get(args[3]);
    if (["increase", "decrease", "set"].includes(action)) {
      if (!targetUser) return i18n.invalidUser;
      const pointString = interaction
        ? interaction.options.get("points")?.value
        : args[2].replace(/\D/g, ""); // Replace all non-digit characters with an empty string
      if (!pointString || pointString.toString().length === 0) return i18n.nan;
      const points = parseInt(pointString.toString());
      let newPoints: number = points;
      switch (action) {
        case "increase":
          newPoints = await client.db.add(
            `points.${guild.id}.${targetUser.id}`,
            points
          );
          break;
        case "decrease":
          newPoints = await client.db.sub(
            `points.${guild.id}.${targetUser.id}`,
            points
          );
          break;
        case "set":
          await client.db.set(`points.${guild.id}.${targetUser.id}`, points);
          break;
      }
      return i18n.pointsSuccess
        .replace("{user}", targetUser.displayName)
        .replace("{points}", newPoints.toString());
    } else {
      switch (action) {
        case "reset":
          if (targetUser) {
            await client.db.set(`points.${guild.id}.${targetUser.id}`, 0);
            return i18n.pointsSuccess
              .replace("{user}", targetUser.displayName)
              .replace("{points}", "0");
          } else {
            await client.db.set(`points.${guild.id}`, {});
            return i18n.resetSuccess;
          }
        case "list":
          if (targetUser) {
            const pointUser =
              (await client.db.get(`points.${guild.id}.${targetUser.id}`)) || 0;
            return i18n.userPoints
              .replace("{user}", targetUser.displayName)
              .replace("{points}", pointUser);
          }
          const roleFilter = interaction
            ? interaction.options.get("filter")?.role
            : message.mentions.roles.first() ||
              guild.roles.cache.get(args[3]) ||
              guild.roles.cache.get(args[2]);
          const page = interaction
            ? interaction.options.get("page")?.value?.toString()
            : args[3] || args[2];
          const pointsData = await client.db.get(`points.${guild.id}`);
          let membersPoints = Object.entries(pointsData || {}).map(
            ([id, points]) => ({
              id,
              points: points as number,
            })
          );
          if (roleFilter)
            membersPoints = membersPoints.filter((member) =>
              guild.members.cache.get(member.id)?.roles.cache.has(roleFilter.id)
            );
          membersPoints = membersPoints.sort((a, b) => b.points - a.points);
          const perPage = 10;
          const startIndex = ((page ? parseInt(page) : 1) - 1) * perPage;
          const pointsList = membersPoints
            .slice(startIndex, startIndex + perPage)
            .map((member, index) => {
              const memberData = guild.members.cache.get(member.id);
              return `${startIndex + index + 1}. ${memberData!.displayName} - ${
                member.points
              } points`;
            });
          if (pointsList.length === 0)
            return {
              content: i18n.noPoints,
            };
          return {
            embeds: [
              new EmbedBuilder()
                .setTitle(
                  `${i18n.page} [${page}/${membersPoints.length / perPage}]`
                )
                .setDescription(pointsList.join("\n"))
                .setFooter({
                  text: `Requested by ${
                    interaction ? interaction.user.tag : user!.tag
                  }`,
                  iconURL: interaction
                    ? interaction.user.displayAvatarURL()
                    : user!.displayAvatarURL(),
                }),
            ],
          };
      }
    }
  },
};
