// commands/slowmode.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction, PermissionFlagsBits } from "discord.js";
module.exports = {
  data: {
    name: "slowmode",
    type: 1,
    description: "Enable or disable slowmode on a channel.",
    default_member_permissions: PermissionFlagsBits.ManageChannels.toString(),
    options: [
      {
        type: 3,
        name: "time",
        description: "The time to set for slowmode channel.",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
