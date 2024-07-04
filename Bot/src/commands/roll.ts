// commands/roll.js
const { EmbedBuilder } = require("discord.js");

import { CustomClient } from "../types"; // Import CustomClient interface

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
  execute: async (
    client: CustomClient,
    interaction: CommandInteraction,
    message: Message,
    guild: Guild,
    member: GuildMember,
    user: User,
    channel: Channel
  ) => {
    let min = 0;
    let max = 100; // Default max value for a standard dice roll

    const option = interaction.options.get("dice")?.value;

    if (option) {
      // If the user provides a custom dice number, parse it
      max = parseInt(`${option}`);
      if (isNaN(max)) {
        const embed = new EmbedBuilder()
          .setDescription(
            client.i18n[await client.getLanguage(guild.id)].roll.replace(
              "{option}",
              `${option}`
            )
          )
          .setColor(14423100);
        return {
          embeds: [embed],
        };
        return;
      }
    }

    // Generate a random number between min and max (inclusive)
    const num = Math.floor(Math.random() * (max - min + 1)) + min;

    return `${num}`;
  },
};
