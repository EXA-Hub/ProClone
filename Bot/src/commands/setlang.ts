// commands/setlang.js

// Function to format supported languages
function formatSupportedLanguages(languages: String[]) {
  const lastLanguage = languages.pop(); // Remove and get the last language
  return languages.length > 0
    ? `${languages.join(", ")}, and ${lastLanguage}`
    : lastLanguage;
}

import { CustomClient } from "../types"; // Import CustomClient interface

import { PermissionFlagsBits } from "discord.js";
import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
module.exports = {
  data: {
    name: "setlang",
    type: 1,
    description: "Sets your preferred language for the bot.",

    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
    options: [
      {
        type: 3,
        name: "language",
        description: "Language to change to.",
        required: true,
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
    const language = interaction
      ? interaction.options.get("language")?.value
      : args[1];

    // Get the list of supported languages from the client.i18n object
    const supportedLanguages = Object.keys(client.i18n);

    if (!supportedLanguages.includes(`${language}`)) {
      return (
        client.i18n[await client.getLanguage(guild.id)].setLang[1] +
        `**${formatSupportedLanguages(supportedLanguages)}.**`
      );
    }

    // Save the preferred language to the database
    await client.db.set(`guild_${guild.id}_language`, language);

    return client.i18n[await client.getLanguage(guild.id)].setLang[0];
  },
};
