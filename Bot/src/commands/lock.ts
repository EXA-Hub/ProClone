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
    args: String[]
  ) => {
    const lang = await client.getLanguage(guild.id);
    const i18n = client.i18n[lang].lock;

    const c = interaction.options.get("channel") || interaction.channel;
    const reason = interaction.options.get("reason") || "No reason provided";

    if (!c) {
      return {
        content: i18n["invalidChannel"],
        ephemeral: true,
      };
    }

    const m = interaction.member as GuildMember;
    // Check if interaction.member!.permissions has the required permission
    if (!m.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return {
        content: i18n["noPermission"],
      };
      return;
    }

    try {
      await (interaction.channel as GuildChannel).permissionOverwrites.edit(
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
