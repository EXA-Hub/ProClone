// commands/ping.js

const { EmbedBuilder } = require("discord.js");

import { CustomClient } from "../types"; // Import CustomClient interface

import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
module.exports = {
  data: {
    name: "ping",
    type: 1,
    description: "Test the bots response time.",
    options: [],
  },
  execute: async (
    client: CustomClient,
    interaction: CommandInteraction,
    message: Message,
    guild: Guild,
    member: GuildMember,
    user: User,
    channel: Channel,
    args: String[]
  ) => {
    const sent = await (interaction || message).reply({
      content: "pong! 🏓",
      fetchReply: true,
      allowedMentions: { repliedUser: false },
    });

    await sent.edit({
      embeds: [
        new EmbedBuilder()
          .setTitle("pong! :ping_pong:")
          .setDescription(
            `:hourglass: **Time:** ${
              sent.createdTimestamp - (interaction || message).createdTimestamp
            } ms
:sparkles: **Micro:** ${Math.round(client.uptime! % 1000)} ms
:stopwatch: **WS:** ${client.ws.ping} ms`
          )
          .setTimestamp()
          .setFooter({ text: "IDK >:" })
          .setColor(8387074),
      ],
      allowedMentions: { repliedUser: false },
    });
    return null;
  },
};
