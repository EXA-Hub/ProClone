// commands/invite.js

const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "invite",
    type: 1,
    description: "Looking for the bot invite link?",
    options: [],
  },
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Invite Links")
      .setDescription(
        "[Add To Your Server](https://discord.com/oauth2/authorize?client_id=282859044593598464&scope=bot+applications.commands+identify+guilds&response_type=code&permissions=2080374975)\n[ProBot Dashboard](https://probot.io/)"
      );

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
