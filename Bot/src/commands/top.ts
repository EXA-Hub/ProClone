// commands/top.js

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
    name: "top",
    type: 1,
    description: "Displays the most active members on the server",
    options: [
      {
        type: 3,
        name: "type",
        description: "The leaderboard type either text or voice.",
        choices: [
          {
            name: "Text",
            value: "text",
          },
          {
            name: "Voice",
            value: "voice",
          },
          {
            name: "Invite",
            value: "invites",
          },
        ],
      },
      {
        type: 3,
        name: "duration",
        description: "The leaderboard specified duration.",
        choices: [
          {
            name: "Day",
            value: "day",
          },
          {
            name: "Week",
            value: "week",
          },
          {
            name: "Month",
            value: "month",
          },
        ],
      },
      {
        type: 4,
        name: "page",
        description: "The leaderboard page number.",
        min_value: 1,
      },
      {
        type: 8,
        name: "role",
        description: "Filter leaderboard for specific members with a role.",
      },
    ],
  },
  execute: async (
    client: CustomClient,
    interaction: CommandInteraction,
    message: Message,
    guild: Guild,
    member: GuildMember,
    user: User,
    channel: Channel,
    args: string[]
  ) => {
    return "Working on that command!";
  },
};
