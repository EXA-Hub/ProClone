// commands/ban.js

import { CustomClient } from "../types"; // Import CustomClient interface

import {
  PermissionFlagsBits,
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";

module.exports = {
  data: {
    name: "ban",
    type: 1,
    description: "Bans a member.",
    default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "User to ban.",
        required: true,
      },
      {
        type: 3,
        name: "time",
        description: "Time duration for the ban.",
      },
      {
        type: 3,
        name: "reason",
        description: "The reason of the ban.",
      },
      {
        type: 3,
        name: "bulk",
        description: "User to ban.",
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
