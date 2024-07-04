// commands/ban.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "ban",
    type: 1,
    description: "Bans a member.",
    options: [
      {
        type: 6,
        name: "user",
        description: "User to ban.",
        required: true,
      },
      {
        type: 3,
        name: "time",
        description: "Time duration for the ban.",
      },
      {
        type: 3,
        name: "reason",
        description: "The reason of the ban.",
      },
      {
        type: 3,
        name: "bulk",
        description: "User to ban.",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
