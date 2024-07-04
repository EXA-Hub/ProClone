// commands/ping.js

const { EmbedBuilder } = require("discord.js");

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "ping",
    type: 1,
    description: "Test the bots response time.",
    options: [],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    const sent = await interaction.reply({
      content: "pong! 🏓",
      fetchReply: true,
    });

    const timeTaken = sent.createdTimestamp - interaction.createdTimestamp;
    const microTime = Math.round(client.uptime! % 1000);
    const wsLatency = client.ws.ping;

    const embed = new EmbedBuilder()
      .setTitle("pong! :ping_pong:")
      .setDescription(
        `:hourglass: **Time:** ${timeTaken} ms
:sparkles: **Micro:** ${microTime} ms
:stopwatch: **WS:** ${wsLatency} ms`
      )
      .setTimestamp()
      .setFooter({ text: "IDK >:" })
      .setColor(8387074);

    await interaction.editReply({
      embeds: [embed],
    });
  },
};
