import getUsersSortedByPermission from "../methods/memberSorter";
import { CustomClient } from "../types"; // Import CustomClient interface

import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
  PermissionFlagsBits,
  PermissionsBitField,
} from "discord.js";
module.exports = {
  data: {
    name: "untimeout",
    type: 1,
    description: "Remove timeout from a user",
    default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to untimeout",
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
    const i18n = client.i18n[await client.getLanguage(guild.id)].timeout;

    const m = (
      interaction
        ? interaction.options.get("user")?.member
        : message.mentions.members?.first() || guild.members.cache.get(args[1])
    ) as GuildMember;

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

    if (!m.isCommunicationDisabled())
      return {
        content: i18n["notTimedOut"],
      };

    try {
      await m.timeout(null);

      return {
        content: i18n["untimeoutSuccess"].replace("{user}", m.user.username),
      };
    } catch (error) {
      console.error(error);
      return {
        content: i18n["untimeoutError"],
      };
    }
  },
};
