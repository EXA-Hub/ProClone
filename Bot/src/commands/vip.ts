// commands/vip.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "vip",
    type: 1,
    description: "Displays info about your premium bot.",
    options: [
      {
        type: 1,
        name: "move",
        description: "Move your premium bot to a new server.",
        options: [
          {
            type: 3,
            name: "number",
            description: "Your premium bot number or ID.",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "transfer",
        description: "Transfer ownership of your premium bot to another user.",
        options: [
          {
            type: 3,
            name: "number",
            description: "Your premium bot number or ID.",
            required: true,
          },
          {
            type: 6,
            name: "user",
            description:
              "The user to whom you want to transfer your premium bot.",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "whitelist",
        description: "Whitelist a user to allow access to the ProBot panel.",
        options: [
          {
            type: 6,
            name: "user",
            description:
              "The user you want to allow or remove access from the ProBot panel.",
            required: false,
          },
        ],
      },
      {
        type: 1,
        name: "info",
        description: "Displays info about your premium bot.",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
