// commands/warn_remove.js

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
    name: "warn_remove",
    type: 1,
    description: "Removes warnings from all members or specific user.",
    options: [
      {
        type: 3,
        name: "input",
        description: "[Warn id] or [user] or [all] to remove all warnings",
        required: true,
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
