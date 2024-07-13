// commands/kick.js

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
    name: "kick",
    type: 1,
    description: "Kicks a member.",
    default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to kick.",
        required: true,
      },
      {
        type: 3,
        name: "reason",
        description: "Reason of the kick.",
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
    const i18n = client.i18n[await client.getLanguage(guild.id)].kick;

    // Resolve the member to kick
    const memberToKick = (
      interaction
        ? interaction.options.get("user")?.member
        : message.mentions.members?.first() || guild.members.cache.get(args[1])
    ) as GuildMember;

    if (
      memberToKick.id === client.user?.id ||
      getUsersSortedByPermission(
        guild.id,
        [member, memberToKick],
        PermissionFlagsBits.ModerateMembers
      ).shift()?.id === memberToKick.id
    )
      return i18n.uNonMember.replace("{username}", memberToKick.displayName);

    // Check if a valid member is provided
    if (!memberToKick)
      return {
        content: i18n.invalidMember,
      };

    // Fetch the reason for the kick
    const reason = interaction
      ? interaction.options.get("reason")?.value?.toString()
      : args.slice(2).join(" ");

    try {
      // Kick the member
      await memberToKick.kick(reason);

      return {
        content: i18n.kickSuccess.replace("{user}", memberToKick.user.username),
      };
    } catch (error) {
      console.error(error);
      return {
        content: i18n.kickError,
      };
    }
  },
};
