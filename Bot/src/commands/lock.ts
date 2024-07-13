import { CustomClient } from "../types"; // Import CustomClient interface

import {
  CommandInteraction,
  GuildChannel,
  PermissionFlagsBits,
  PermissionsBitField,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
module.exports = {
  data: {
    name: "lock",
    type: 1,
    description:
      "🔒 Disables @everyone from sending messages in specific channel.",
    default_member_permissions: PermissionFlagsBits.ManageChannels.toString(),
    options: [
      {
        type: 7,
        name: "channel",
        description: "Channel to lock.",
        channel_types: [0],
      },
      {
        type: 3,
        name: "reason",
        description: "Reason of the lock",
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
      ? interaction.options.get("channel")
      : message.mentions.channels.first() ||
        guild.channels.cache.get(args[1])) || channel) as GuildChannel;

    const reason =
      (interaction ? interaction.options.get("reason") : args[2]) ||
      "No reason provided";

    if (!c)
      return {
        content: i18n["invalidChannel"],
        ephemeral: true,
      };

    try {
      await c.permissionOverwrites.edit(
        guild.roles.everyone,
        {
          SendMessages: false,
          CreatePublicThreads: false,
          CreatePrivateThreads: false,
          SendMessagesInThreads: false,
        },
        { reason: `${reason}` }
      );

      return {
        content: i18n["lockSuccess"]
          .replace("{channel}", c.toString())
          .replace("{reason}", `${reason}`),
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
