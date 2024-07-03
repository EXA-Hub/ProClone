// commands/avatar.js

const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "avatar",
    type: 1,
    description: "Displays your avatar or someone else's avatar.",
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to get avatar for.",
      },
    ],
  },
  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL({ size: 1024, dynamic: true }),
      })
      .setImage(user.displayAvatarURL({ size: 1024, dynamic: true }))
      .setFooter({
        text:
          interaction.client.i18n[
            await interaction.client.getLanguage(interaction.guild.id)
          ].avatar + interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({
          size: 1024,
          dynamic: true,
        }),
      });

    await interaction.reply({
      embeds: [embed],
      allowedMentions: { repliedUser: false },
    });
  },
};
