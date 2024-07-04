// commands/warn.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "warn",
    type: 1,
    description: "⚠ Warns a member.",
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to warn.",
        required: true,
      },
      {
        type: 3,
        name: "reason",
        description: "Reason of the warn.",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
