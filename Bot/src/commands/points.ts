// commands/points.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "points",
    type: 1,
    description: "A server based points that can be given by moderators.",
    options: [
      {
        type: 1,
        name: "increase",
        description: "Increase additional points.",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to set points for.",
            required: true,
          },
          {
            type: 4,
            name: "points",
            description: "Points to increase.",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "decrease",
        description: "Decrease points from a user.",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to set points for.",
            required: true,
          },
          {
            type: 4,
            name: "points",
            description: "Points to decrease.",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "set",
        description: "Set points to a specific amount.",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to set points for.",
            required: true,
          },
          {
            type: 4,
            name: "points",
            description: "Points to set.",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "reset",
        description: "Resets the points of all the members or a specific user.",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to reset points for.",
          },
        ],
      },
      {
        type: 1,
        name: "list",
        description: "Show all members points.",
        options: [
          {
            type: 8,
            name: "filter",
            description: "Role to filter points for.",
          },
          {
            type: 4,
            name: "page",
            description: "Choose a points page number",
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
