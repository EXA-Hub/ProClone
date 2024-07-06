// commands/temp.js

import { CustomClient } from "../types"; // Import CustomClient interface

import { PermissionFlagsBits } from "discord.js";
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
    name: "temp",
    type: 1,
    description: "Makes a temporary channel.",
    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
    options: [
      {
        type: 1,
        name: "on",
        description: "turn on temporary channels.",
      },
      {
        type: 1,
        name: "off",
        description: "turn off temporary channels.",
      },
      {
        type: 1,
        name: "time",
        description: "Time to delete the temp channel in seconds.",
        options: [
          {
            type: 4,
            name: "seconds",
            description: "Time the voice channel.",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "max",
        description: "Max channels user can create at the same time.",
        options: [
          {
            type: 4,
            name: "number",
            description: "Max channels users can create, 0 is unlimited.",
            required: true,
          },
        ],
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
    args: String[]
  ) => {
    return "Working on that command!";
  },
};
