// commands/warn.js

import { CustomClient } from "../types"; // Import CustomClient interface

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
    name: "warn",
    type: 1,
    description: "⚠ Warns a member.",
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to warn.",
        required: true,
      },
      {
        type: 3,
        name: "reason",
        description: "Reason of the warn.",
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
    args: string[]
  ) => {
    const i18n = client.i18n[await client.getLanguage(guild.id)].warn;
    const targetUser = interaction
      ? (interaction.options.get("user")?.member as GuildMember)
      : message.mentions.members!.first() || guild.members.cache.get(args[1]);

    if (!targetUser) return;

    const reason = interaction
      ? interaction.options.get("reason")?.value
      : args.slice(2).join(" ");

    if (!reason) return i18n.noreason;

    await client.db.push(`warns.${guild.id}`, {
      user: targetUser.id,
      reason,
      moderator: user.id,
      timestamp: Date.now(),
    });

    return i18n.warned.replace("{user}", targetUser.user.username);
  },
};
