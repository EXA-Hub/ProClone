// commands/unmute.js

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
    name: "unmute",
    type: 1,
    description: "Unmutes a member.",
    default_member_permissions: PermissionFlagsBits.ManageRoles.toString(),
    options: [
      {
        type: 1,
        name: "text",
        description: "Unmutes a member from text channels",
        options: [
          {
            type: 6,
            name: "user",
            description: "The user to unmute.",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "voice",
        description: "Unmutes a member from voice channels",
        options: [
          {
            type: 6,
            name: "user",
            description: "The user to unmute.",
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
    args: string[]
  ) => {
    return "Working on that command!";
  },
};
