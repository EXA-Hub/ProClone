// commands/color.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "color",
    type: 1,
    description: "Changes your color in the server",
    options: [
      {
        type: 4,
        name: "number_of_color",
        description: "Number of the color given in the /colors commands",
        required: true,
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
