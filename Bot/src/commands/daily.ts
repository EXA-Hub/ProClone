// commands/daily.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "daily",
    type: 1,
    description:
      "Get the daily reward link and know when you can claim it again.",
    options: [],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
