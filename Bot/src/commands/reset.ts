// commands/reset.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "reset",
    type: 1,
    description:
      "Reset text/voice/invites/limits xp points for all or specific member.",
    options: [
      {
        type: 3,
        name: "type",
        description: "Select the type of reset",
        required: true,
        choices: [
          {
            name: "Text",
            value: "text",
          },
          {
            name: "Voice",
            value: "voice",
          },
          {
            name: "Invite",
            value: "invites",
          },
          {
            name: "Limits",
            value: "limits",
          },
        ],
      },
      {
        type: 9,
        name: "target",
        description: "The user to reset stats for.",
        required: true,
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
