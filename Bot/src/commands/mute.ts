// commands/mute.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "mute",
    type: 1,
    description: "Mute a member from text/voice channels so they cannot type.",
    options: [
      {
        type: 1,
        name: "text",
        description: "Mute a member from text channels so they cannot type",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to mute.",
            required: true,
          },
          {
            type: 3,
            name: "time",
            description: "Time duration for the mute.",
          },
          {
            type: 3,
            name: "reason",
            description: "Reason of the mute.",
          },
          {
            type: 3,
            name: "bulk",
            description: "User to mute.",
          },
        ],
      },
      {
        type: 1,
        name: "voice",
        description: "Mute a member from voice channels so they cannot speak",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to mute.",
            required: true,
          },
          {
            type: 3,
            name: "time",
            description: "Time duration for the mute.",
          },
          {
            type: 3,
            name: "reason",
            description: "Reason of the mute.",
          },
          {
            type: 3,
            name: "bulk",
            description: "User to mute.",
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
