import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  GuildChannel,
  GuildMember,
  PermissionsBitField,
} from "discord.js";

module.exports = {
  data: {
    name: "lock",
    type: 1,
    description:
      "🔒 Disables @everyone from sending messages in specific channel.",
    options: [
      {
        type: 7,
        name: "channel",
        description: "Channel to lock.",
        channel_types: [0],
      },
      {
        type: 3,
        name: "reason",
        description: "Reason of the lock",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    const lang = await client.getLanguage(interaction.guild!.id);
    const i18n = client.i18n[lang].lock;

    const channel = interaction.options.get("channel") || interaction.channel;
    const reason = interaction.options.get("reason") || "No reason provided";

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
          SendMessages: false,
          CreatePublicThreads: false,
          CreatePrivateThreads: false,
          SendMessagesInThreads: false,
        },
        { reason: `${reason}` }
      );

      await interaction.reply({
        content: i18n["lockSuccess"]
          .replace("{channel}", channel.toString())
          .replace("{reason}", reason),
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
