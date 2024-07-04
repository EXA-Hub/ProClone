// commands/setcolor.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "setcolor",
    type: 1,
    description: "Changes role's colors by hex codes.",
    options: [
      {
        type: 8,
        name: "role",
        description: "Role to set color for.",
        required: true,
      },
      {
        type: 3,
        name: "hex_code",
        description: ":rolling_eyes: - Hex color length must equal 6 or 3",
        required: true,
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
