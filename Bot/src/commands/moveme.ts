// commands/moveme.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "moveme",
    type: 1,
    description: "Moves you to another voice channel.",
    options: [
      {
        type: 3,
        name: "input",
        description: "Channel/user to be moved to.",
        required: true,
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
