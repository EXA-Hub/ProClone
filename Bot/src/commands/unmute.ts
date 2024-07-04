// commands/unmute.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction, PermissionFlagsBits } from "discord.js";
module.exports = {
  data: {
    name: "unmute",
    type: 1,
    description: "Unmutes a member.",
    default_member_permissions: PermissionFlagsBits.ManageRoles.toString(),
    options: [
      {
        type: 1,
        name: "text",
        description: "Unmutes a member from text channels",
        options: [
          {
            type: 6,
            name: "user",
            description: "The user to unmute.",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "voice",
        description: "Unmutes a member from voice channels",
        options: [
          {
            type: 6,
            name: "user",
            description: "The user to unmute.",
            required: true,
          },
        ],
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
