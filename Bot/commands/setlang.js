// commands/setlang.js

// Function to format supported languages
function formatSupportedLanguages(languages) {
  const lastLanguage = languages.pop(); // Remove and get the last language
  return languages.length > 0
    ? `${languages.join(", ")}, and ${lastLanguage}`
    : lastLanguage;
}

module.exports = {
  data: {
    name: "setlang",
    type: 1,
    description: "Sets your preferred language for the bot.",
    options: [
      {
        type: 3,
        name: "language",
        description: "Language to change to.",
        required: true,
      },
    ],
  },
  async execute(interaction) {
    const language = interaction.options.getString("language");

    // Get the list of supported languages from the client.i18n object
    const supportedLanguages = Object.keys(interaction.client.i18n);

    if (!supportedLanguages.includes(language))
      return await interaction.reply(
        interaction.client.i18n[
          await interaction.client.getLanguage(interaction.guild.id)
        ].setLang[1] + `**${formatSupportedLanguages(supportedLanguages)}.**`
      );

    // Save the preferred language to the database
    await interaction.client.db.set(
      `guild_${interaction.guild.id}_language`,
      language
    );

    await interaction.reply(
      interaction.client.i18n[
        await interaction.client.getLanguage(interaction.guild.id)
      ].setLang[0]
    );
  },
};
