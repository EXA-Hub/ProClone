const { PermissionsBitField } = require("discord.js");

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
  async execute(interaction) {
    const lang = await interaction.client.getLanguage(interaction.guild.id);
    const i18n = interaction.client.i18n[lang].lock;

    const channel =
      interaction.options.getChannel("channel") || interaction.channel;
    const reason =
      interaction.options.getString("reason") || "No reason provided";

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
          SendMessages: false,
          CreatePublicThreads: false,
          CreatePrivateThreads: false,
          SendMessagesInThreads: false,
        },
        { reason }
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
