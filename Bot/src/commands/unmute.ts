// commands/unmute.js

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
    name: "unmute",
    type: 1,
    description: "Unmutes a member.",
    default_member_permissions: PermissionFlagsBits.ManageRoles.toString(),
    options: [
      {
        type: 1,
        name: "text",
        description: "Unmutes a member from text channels",
        options: [
          {
            type: 6,
            name: "user",
            description: "The user to unmute.",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "voice",
        description: "Unmutes a member from voice channels",
        options: [
          {
            type: 6,
            name: "user",
            description: "The user to unmute.",
            required: true,
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
    const i18 = client.i18n[await client.getLanguage(guild.id)].unmute;

    const handleUnmute = async (
      members: GuildMember[],
      type: "text" | "voice"
    ) => {
      try {
        for (const member of members) {
          if (type === "text") {
            const muteRole = guild.roles.cache.find(
              (role) => role.name.toLowerCase() === "muted"
            );
            if (!muteRole) return i18.no_mute_role;

            await member.roles.remove(muteRole);
          } else if (type === "voice") {
            await member.voice.setMute(false);
          }
        }

        return i18.success
          .replace("{type}", type)
          .replace("{members}", members.map((m) => m.displayName).join(", "));
      } catch (error) {
        console.error(`Failed to unmute members:`, error);
        return i18.failed.replace("{type}", type);
      }
    };

    if (interaction) {
      const subCommand = interaction.options.data[0].name as "text" | "voice";
      const targetUser = interaction.options.get("user")?.user;

      if (!targetUser) return i18.no_members;

      const members: GuildMember[] = [guild.members.cache.get(targetUser.id)!];

      if (!members.length) return i18.no_members;

      return handleUnmute(members, subCommand);
    } else if (message) {
      args.shift();
      const target = args.shift();
      const type = args.shift() as "text" | "voice";

      const targetMember =
        guild.members.cache.get(target!) || message.mentions.members?.first();
      if (!targetMember) return i18.no_members;

      const members: GuildMember[] = [targetMember];

      return handleUnmute(members, type);
    }
  },
};
