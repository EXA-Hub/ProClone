// commands/setcolor.js

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
    name: "setcolor",
    type: 1,
    description: "Changes role's colors by hex codes.",

    default_member_permissions: PermissionFlagsBits.ManageRoles.toString(),
    options: [
      {
        type: 8,
        name: "role",
        description: "Role to set color for.",
        required: true,
      },
      {
        type: 3,
        name: "hex_code",
        description: ":rolling_eyes: - Hex color length must equal 6 or 3",
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
