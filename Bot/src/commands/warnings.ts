// commands/warnings.js

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
    name: "warnings",
    type: 1,
    description: "Get a list of warnings for the server or a user.",
    default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to get warnings for.",
      },
      {
        type: 4,
        name: "page",
        description: "Choose a page number",
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
