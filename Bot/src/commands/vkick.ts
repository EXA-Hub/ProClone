// commands/vkick.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction, PermissionFlagsBits } from "discord.js";
module.exports = {
  data: {
    name: "vkick",
    type: 1,
    description: "Kicks a member from a voice channel",
    default_member_permissions: PermissionFlagsBits.ManageChannels.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to kick from voice channel.",
        required: true,
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
