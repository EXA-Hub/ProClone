// commands/roles.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "roles",
    type: 1,
    description: "Get a list of server roles and member counts.",
    options: [],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    await interaction.deferReply();

    let message = "```";
    for (const line of interaction
      .guild!.roles.cache.sort((a, b) => b.position - a.position)
      .map((role) => {
        let roleName = role.name.padEnd(20, " "); // Pad if shorter
        const memberCount = role.members.size;
        return `${roleName} ${memberCount} members`;
      })
      .join("\n")
      .split("\n")) {
      if ((message + line).length > 2000 - 3) {
        // 3 for the closing ```
        await interaction.followUp(message + "```");
        message = "```";
      }
      message += line + "\n";
    }
    message += "```";

    await interaction.followUp(message);
  },
};
