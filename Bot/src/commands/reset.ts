// commands/reset.js

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
    name: "reset",
    type: 1,
    description:
      "Reset text/voice/invites/limits xp points for all or specific member.",
    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
    options: [
      {
        type: 3,
        name: "type",
        description: "Select the type of reset",
        required: true,
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
          {
            name: "Limits",
            value: "limits",
          },
        ],
      },
      {
        type: 9,
        name: "target",
        description: "The user to reset stats for.",
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
