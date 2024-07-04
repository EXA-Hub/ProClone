// commands/kick.js

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  PermissionFlagsBits,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
module.exports = {
  data: {
    name: "kick",
    type: 1,
    description: "Kicks a member.",
    default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to kick.",
        required: true,
      },
      {
        type: 3,
        name: "reason",
        description: "Reason of the kick.",
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
    channel: Channel
  ) => {
    return "Working on that command!";
  },
};
