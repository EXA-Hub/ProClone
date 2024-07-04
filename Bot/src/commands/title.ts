// commands/title.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "title",
    type: 1,
    description: "Changes your title in `/profile` command.",
    options: [
      {
        type: 3,
        name: "new_title",
        description: "The new title to set.",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
