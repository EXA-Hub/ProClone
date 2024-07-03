// commands/roll.js
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: {
    name: "roll",
    type: 1,
    description: "rolling dice.",
    options: [
      {
        type: 3,
        name: "dice",
        description: "Picks a random number",
      },
    ],
  },
  async execute(interaction) {
    let min = 0;
    let max = 100; // Default max value for a standard dice roll

    const option = interaction.options.getString("dice");

    if (option) {
      // If the user provides a custom dice number, parse it
      max = parseInt(option);
      if (isNaN(max)) {
        const embed = new EmbedBuilder()
          .setDescription(
            interaction.client.i18n[
              await interaction.client.getLanguage(interaction.guild.id)
            ].roll.replace("{option}", option)
          )
          .setColor(14423100);
        return await interaction.reply({
          embeds: [embed],
        });
      }
    }

    // Generate a random number between min and max (inclusive)
    const num = Math.floor(Math.random() * (max - min + 1)) + min;

    await interaction.reply(`${num}`);
  },
};
