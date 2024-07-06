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
    args: String[]
  ) => {
    const i18n = client.i18n[await client.getLanguage(guild.id)].timeout;

    const m = (
      interaction
        ? interaction.options.get("user")?.member
        : message.mentions.members?.first()
    ) as GuildMember;

    if (!m)
      return {
        content: i18n["invalidMember"],
      };

    if (!member.permissions.has(PermissionsBitField.Flags.ManageChannels))
      return {
        content: i18n["noPermission"],
      };

    if (m.user.id === client.user!.id)
      return {
        content: i18n["unoPermission"].replace("{user}", m.user.username),
      };

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
