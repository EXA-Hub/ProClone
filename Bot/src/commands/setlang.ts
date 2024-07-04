// commands/setlang.js

// Function to format supported languages
function formatSupportedLanguages(languages: String[]) {
  const lastLanguage = languages.pop(); // Remove and get the last language
  return languages.length > 0
    ? `${languages.join(", ")}, and ${lastLanguage}`
    : lastLanguage;
}

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
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
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    const language = interaction.options.get("language")?.value;

    // Get the list of supported languages from the client.i18n object
    const supportedLanguages = Object.keys(client.i18n);

    if (!supportedLanguages.includes(`${language}`)) {
      await interaction.reply(
        client.i18n[await client.getLanguage(interaction.guild!.id)]
          .setLang[1] + `**${formatSupportedLanguages(supportedLanguages)}.**`
      );
      return;
    }

    // Save the preferred language to the database
    await client.db.set(`guild_${interaction.guild!.id}_language`, language);

    await interaction.reply(
      client.i18n[await client.getLanguage(interaction.guild!.id)].setLang[0]
    );
  },
};
