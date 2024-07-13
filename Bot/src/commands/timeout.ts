import parseDuration from "../methods/timeString";
import getUsersSortedByPermission from "../methods/memberSorter";
import { CustomClient } from "../types"; // Import CustomClient interface

import {
  CommandInteraction,
  PermissionFlagsBits,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
module.exports = {
  data: {
    name: "timeout",
    type: 1,
    description:
      "⏱ Timeout a user from sending messages, react or join voice channels.",
    default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to timeout",
        required: true,
      },
      {
        type: 3,
        name: "time",
        description: "The duration of timeout",
      },
      {
        type: 3,
        name: "reason",
        description: "The reason of timeout.",
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
    const i18n = client.i18n[await client.getLanguage(guild.id)].timeout;

    const m = (
      interaction
        ? interaction.options.get("user")?.member
        : message.mentions.members?.first() || guild.members.cache.get(args[1])
    ) as GuildMember;

    let time =
      (interaction
        ? interaction.options.get("time")?.value?.toString()
        : args[2]) || "2h";

    const reason =
      (interaction
        ? interaction.options.get("reason")?.value?.toString()
        : args[3]) || "No reason provided";

    if (!m)
      return {
        content: i18n["invalidMember"],
      };

    if (
      m.id === client.user?.id ||
      getUsersSortedByPermission(
        guild.id,
        [member, m],
        PermissionFlagsBits.ModerateMembers
      ).shift()?.id === m.id
    )
      return i18n.uNonMember.replace("{username}", m.displayName);

    const timeInMs = parseDuration(time);
    if (!timeInMs)
      return {
        content: i18n["invalidDuration"],
      };

    // 28 days in milliseconds
    if (timeInMs > 28 * 24 * 60 * 60 * 1000)
      return {
        content: i18n["max"],
      };

    try {
      await m.timeout(
        timeInMs,
        `By: ${user.tag}, REASON: ${reason}, ENDS ON: ${new Date(
          Date.now() + timeInMs
        ).toLocaleString("en-US", {
          timeZone: "UTC", // Adjust to your preferred timezone
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })}`
      );

      return {
        content: i18n["timeoutSuccess"].replace("{user}", m.user.username),
      };
    } catch (error) {
      console.error(error);
      return {
        content: i18n["timeoutError"],
        ephemeral: true,
      };
    }
  },
};
