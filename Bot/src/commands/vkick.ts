// commands/vkick.js

import { CustomClient } from "../types"; // Import CustomClient interface

import { PermissionFlagsBits } from "discord.js";
import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
import getUsersSortedByPermission from "../methods/memberSorter";
module.exports = {
  data: {
    name: "vkick",
    type: 1,
    description: "Kicks a member from a voice channel",
    default_member_permissions: PermissionFlagsBits.ManageChannels.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to kick from voice channel.",
        required: true,
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
    const i18n = client.i18n[await client.getLanguage(guild.id)].vkick;

    // Resolve the member to kick from voice channel
    const memberToKick = (
      interaction
        ? interaction.options.get("user")?.member
        : message.mentions.members?.first() || guild.members.cache.get(args[1])
    ) as GuildMember;

    // Check if a valid member is provided
    if (!memberToKick)
      return {
        content: i18n.invalidMember,
      };

    if (
      memberToKick.id === client.user?.id ||
      getUsersSortedByPermission(
        guild.id,
        [member, memberToKick],
        PermissionFlagsBits.ModerateMembers
      ).shift()?.id === memberToKick.id
    )
      return i18n.uNonMember.replace("{username}", memberToKick.displayName);

    try {
      if (!memberToKick.voice.channelId) return i18n.notVC;
      // Kick the member from the voice channel
      await memberToKick.voice.disconnect();

      return {
        content: i18n.vkickSuccess.replace(
          "{user}",
          memberToKick.user.username
        ),
      };
    } catch (error) {
      console.error(error);
      return {
        content: i18n.vkickError,
      };
    }
  },
};
