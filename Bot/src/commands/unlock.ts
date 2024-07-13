// commands/unlock.js
const { PermissionsBitField } = require("discord.js");

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
  GuildChannel,
  PermissionFlagsBits,
} from "discord.js";
module.exports = {
  data: {
    name: "unlock",
    type: 1,
    description: "🔓 Allows @everyone to send messages in specific channel.",
    default_member_permissions: PermissionFlagsBits.ManageChannels.toString(),
    options: [
      {
        type: 7,
        name: "channel",
        description: "Channel to unlock.",
        channel_types: [0],
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
    const i18n = client.i18n[await client.getLanguage(guild.id)].lock;

    const c = ((interaction
      ? interaction.options.get("channel")?.channel
      : message.mentions.channels.first() ||
        guild.channels.cache.get(args[1])) || channel) as GuildChannel;

    if (!c)
      return {
        content: i18n["invalidChannel"],
        ephemeral: true,
      };

    try {
      await c.permissionOverwrites.edit(guild.roles.everyone, {
        SendMessages: true,
        CreatePublicThreads: true,
        CreatePrivateThreads: true,
        SendMessagesInThreads: true,
      });

      return {
        content: i18n["unlockSuccess"].replace("{channel}", c.toString()),
      };
    } catch (error) {
      console.error(error);
      return {
        content: i18n["lockError"],
        ephemeral: true,
      };
    }
  },
};
