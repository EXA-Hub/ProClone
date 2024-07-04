// commands/warn_remove.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "warn_remove",
    type: 1,
    description: "Removes warnings from all members or specific user.",
    options: [
      {
        type: 3,
        name: "input",
        description: "[Warn id] or [user] or [all] to remove all warnings",
        required: true,
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
