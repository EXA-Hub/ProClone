// commands/warn.js

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
    name: "warn",
    type: 1,
    description: "⚠ Warns a member.",
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to warn.",
        required: true,
      },
      {
        type: 3,
        name: "reason",
        description: "Reason of the warn.",
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
