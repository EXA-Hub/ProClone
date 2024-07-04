// commands/credits.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "credits",
    type: 1,
    description:
      "Shows your or someone's balance or transfer credits for someone",
    options: [
      {
        type: 6,
        name: "user",
        description: "User to show/transfer credits of/to.",
      },
      {
        type: 4,
        name: "amount",
        description: "Amount of credits to transfer.",
      },
      {
        type: 3,
        name: "comment",
        description: "An additional comment to the credits transaction.",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
