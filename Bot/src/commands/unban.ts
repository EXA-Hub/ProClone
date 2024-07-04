// commands/unban.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction, PermissionFlagsBits } from "discord.js";
module.exports = {
  data: {
    name: "unban",
    type: 1,
    description: "Unbans a member.",
    default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
    options: [
      {
        type: 3,
        name: "input",
        description: "User to remove the ban of.",
        required: true,
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
