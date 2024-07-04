// commands/clear.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "clear",
    type: 1,
    description: "Cleans messages from a channel.",
    options: [
      {
        type: 4,
        name: "number_of_messages",
        description: "Number of messages to delete.",
        required: true,
        min_value: 1,
      },
      {
        type: 6,
        name: "filter_by_user",
        description: "Filter by user messages.",
      },
      {
        type: 8,
        name: "filter_by_role",
        description: "Filter by role messages.",
      },
      {
        type: 5,
        name: "filter_by_bots",
        description: "Filter by bots messages.",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
