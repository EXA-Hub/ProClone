// commands/warnings.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction, PermissionFlagsBits } from "discord.js";
module.exports = {
  data: {
    name: "warnings",
    type: 1,
    description: "Get a list of warnings for the server or a user.",
    default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to get warnings for.",
      },
      {
        type: 4,
        name: "page",
        description: "Choose a page number",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.reply("Working on that command!");
  },
};
