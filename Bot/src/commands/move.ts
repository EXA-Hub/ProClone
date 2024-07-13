// commands/move.js

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  Message,
  PermissionFlagsBits,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
module.exports = {
  data: {
    name: "move",
    type: 1,
    description: "Moves a member to another voice channel.",
    default_member_permissions: PermissionFlagsBits.MoveMembers.toString(),
    options: [
      {
        type: 1,
        name: "user",
        description: "Moves a member to another voice channel.",
        options: [
          {
            type: 6,
            name: "user",
            description: "The user to move.",
            required: true,
          },
          {
            type: 7,
            name: "channel",
            description: "Channel to move the user to.",
            channel_types: [2],
          },
        ],
      },
      {
        type: 1,
        name: "all",
        description:
          "Moves all members to the voice channel to which you are currently connected",
        options: [
          {
            type: 7,
            name: "channel",
            description: "Channel to move the user to.",
            channel_types: [2],
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
