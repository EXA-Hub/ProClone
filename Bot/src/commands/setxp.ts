// commands/setxp.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction, PermissionFlagsBits } from "discord.js";
module.exports = {
  data: {
    name: "setxp",
    type: 1,
    description: "Sets the user's xp",
    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user for whom you want to set xp",
        required: true,
      },
      {
        type: 3,
        name: "type",
        description: "Type of xp to set either text or voice",
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
        ],
      },
      {
        type: 4,
        name: "xp",
        description: "The amount of xp to set to the user",
        required: true,
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
