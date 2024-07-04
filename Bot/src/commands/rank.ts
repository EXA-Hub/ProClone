// commands/rank.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "rank",
    type: 1,
    description: "View your rank card or someone else's in the server.",
    options: [
      {
        type: 6,
        name: "user",
        description: "User to get rank of.",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
