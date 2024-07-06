// commands/unlock.js
const { PermissionsBitField } = require("discord.js");

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
  GuildChannel,
  PermissionFlagsBits,
} from "discord.js";
module.exports = {
  data: {
    name: "unlock",
    type: 1,
    description: "🔓 Allows @everyone to send messages in specific channel.",
    default_member_permissions: PermissionFlagsBits.ManageChannels.toString(),
    options: [
      {
        type: 7,
        name: "channel",
        description: "Channel to unlock.",
        channel_types: [0],
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
    const lang = await client.getLanguage(guild.id);
    const i18n = client.i18n[lang].lock;

    const c =
      interaction.options.get("channel")?.channel || interaction.channel;

    if (!c) {
      return {
        content: i18n["invalidChannel"],
        ephemeral: true,
      };
      return;
    }

    const m = interaction.member as GuildMember;
    // Check if interaction.member!.permissions has the required permission
    if (!m.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return {
        content: i18n["noPermission"],
      };
      return;
    }

    try {
      await (interaction.channel as GuildChannel).permissionOverwrites.edit(
        guild.roles.everyone,
        {
          SendMessages: true,
          CreatePublicThreads: true,
          CreatePrivateThreads: true,
          SendMessagesInThreads: true,
        }
      );

      return {
        content: i18n["unlockSuccess"].replace("{channel}", c.toString()),
      };
    } catch (error) {
      console.error(error);
      return {
        content: i18n["lockError"],
        ephemeral: true,
      };
    }
  },
};
