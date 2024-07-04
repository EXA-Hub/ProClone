// commands/rep.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "rep",
    type: 1,
    description: "Award someone a reputation point.",
    options: [
      {
        type: 6,
        name: "user",
        description: "rep_user_description",
        required: true,
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
