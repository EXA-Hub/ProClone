// commands/unlock.js
const { PermissionsBitField } = require("discord.js");

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  GuildChannel,
  GuildMember,
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
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    const lang = await client.getLanguage(interaction.guild!.id);
    const i18n = client.i18n[lang].lock;

    const channel =
      interaction.options.get("channel")?.channel || interaction.channel;

    if (!channel) {
      interaction.reply({
        content: i18n["invalidChannel"],
        ephemeral: true,
      });
      return;
    }

    const member = interaction.member as GuildMember;
    // Check if interaction.member!.permissions has the required permission
    if (!member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      interaction.reply({
        content: i18n["noPermission"],
      });
      return;
    }

    try {
      await (interaction.channel as GuildChannel).permissionOverwrites.edit(
        interaction.guild!.roles.everyone,
        {
          SendMessages: true,
          CreatePublicThreads: true,
          CreatePrivateThreads: true,
          SendMessagesInThreads: true,
        }
      );

      await interaction.reply({
        content: i18n["unlockSuccess"].replace("{channel}", channel.toString()),
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: i18n["lockError"],
        ephemeral: true,
      });
    }
  },
};
