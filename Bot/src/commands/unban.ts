// commands/unban.js

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
    name: "unban",
    type: 1,
    description: "Unbans a member.",
    default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
    options: [
      {
        type: 3,
        name: "input",
        description: "User to remove the ban of.",
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
    args: String[]
  ) => {
    return "Working on that command!";
  },
};
