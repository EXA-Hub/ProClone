// commands/kick.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction, PermissionFlagsBits } from "discord.js";
module.exports = {
  data: {
    name: "kick",
    type: 1,
    description: "Kicks a member.",
    default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to kick.",
        required: true,
      },
      {
        type: 3,
        name: "reason",
        description: "Reason of the kick.",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
