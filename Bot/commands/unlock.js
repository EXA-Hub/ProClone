// commands/unlock.js
const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: {
    name: "unlock",
    type: 1,
    description: "🔓 Allows @everyone to send messages in specific channel.",
    options: [
      {
        type: 7,
        name: "channel",
        description: "Channel to unlock.",
        channel_types: [0],
      },
    ],
  },
  async execute(interaction) {
    const lang = await interaction.client.getLanguage(interaction.guild.id);
    const i18n = interaction.client.i18n[lang].lock;

    const channel =
      interaction.options.getChannel("channel") || interaction.channel;

    if (!channel) {
      return interaction.reply({
        content: i18n["invalidChannel"],
        ephemeral: true,
      });
    }

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    ) {
      return interaction.reply({
        content: i18n["noPermission"],
      });
    }

    try {
      await interaction.channel.permissionOverwrites.edit(
        interaction.guild.roles.everyone,
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
