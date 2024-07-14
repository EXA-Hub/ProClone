// commands/mute.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { ChannelType, PermissionFlagsBits } from "discord.js";
import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
import parseDuration from "../methods/timeString";
module.exports = {
  data: {
    name: "mute",
    type: 1,
    description: "Mute a member from text/voice channels so they cannot type.",
    default_member_permissions: PermissionFlagsBits.ManageRoles.toString(),
    options: [
      {
        type: 1,
        name: "text",
        description: "Mute a member from text channels so they cannot type",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to mute.",
            required: true,
          },
          {
            type: 3,
            name: "time",
            description: "Time duration for the mute.",
          },
          {
            type: 3,
            name: "reason",
            description: "Reason of the mute.",
          },
          {
            type: 3,
            name: "bulk",
            description: "User to mute.",
          },
        ],
      },
      {
        type: 1,
        name: "voice",
        description: "Mute a member from voice channels so they cannot speak",
        options: [
          {
            type: 6,
            name: "user",
            description: "User to mute.",
            required: true,
          },
          {
            type: 3,
            name: "time",
            description: "Time duration for the mute.",
          },
          {
            type: 3,
            name: "reason",
            description: "Reason of the mute.",
          },
          {
            type: 3,
            name: "bulk",
            description: "User to mute.",
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
    const i18 = client.i18n[await client.getLanguage(guild.id)].mute;

    const handleMute = async (
      action: "mute" | "unmute",
      members: GuildMember[],
      type: "text" | "voice",
      time?: number | null | undefined,
      reason?: string
    ) => {
      try {
        for (const member of members) {
          if (type === "text") {
            let muteRole = guild.roles.cache.find(
              (role) => role.name.toLowerCase() === "muted"
            );
            if (!muteRole) {
              muteRole = await guild.roles.create({
                name: "Muted",
                permissions: [],
                hoist: false,
                mentionable: false,
                reason: "Mute command setup.",
              });
            }

            if (!muteRole) return i18.no_mute_role;

            guild.channels.cache
              .filter((c) => c.type === ChannelType.GuildText)
              .forEach((c) => {
                c.permissionOverwrites.edit(muteRole, {
                  SendMessages: false,
                  CreatePublicThreads: false,
                  CreatePrivateThreads: false,
                  SendMessagesInThreads: false,
                  AddReactions: false,
                  Speak: false,
                });
              });

            if (action === "mute") await member.roles.add(muteRole, reason);
            else await member.roles.remove(muteRole, reason);
          } else if (type === "voice") {
            if (action === "mute") await member.voice.setMute(true, reason);
            else await member.voice.setMute(false, reason);
          }
        }

        if (time && action === "mute") {
          await client.db.push(`mutes.${guild.id}`, {
            ids: members.map((m) => m.id),
            timeEnd: Date.now() + time,
            text: type === "text",
          });
        }

        return i18.success
          .replace("{action}", action)
          .replace("{type}", type)
          .replace("{members}", members.map((m) => m.displayName).join(", "));
      } catch (error) {
        console.error(`Failed to ${action} members:`, error);
        return i18.failed.replace("{action}", action).replace("{type}", type);
      }
    };

    if (interaction) {
      const subCommand = interaction.options.data[0].name.toString() as
        | "text"
        | "voice";
      const targetUser = interaction.options.get("user")?.user;
      const bulkUsers = interaction.options.get("bulk")?.value?.toString();
      const time = interaction.options.get("time")?.value as string | undefined;
      const reason = interaction.options.get("reason")?.value as
        | string
        | undefined;

      let members: GuildMember[] = [guild.members.cache.get(targetUser!.id)!];
      if (bulkUsers)
        members = [
          ...members,
          ...bulkUsers
            .match(/<@!?(\d+)>/g)!
            .map((mention) => mention.match(/\d+/)?.[0])
            .filter((id) => id !== null)
            .map((id) => guild.members.cache.get(id!))
            .filter((mem) => mem !== undefined),
        ];

      if (!members.length) return i18.no_members;

      const duration = time ? parseDuration(time) : undefined;

      return handleMute("mute", members, subCommand, duration, reason);
    } else {
      args.shift();
      const target = args.shift();
      const timeArg = args.shift();
      const reason = args.join(" ");
      const duration = timeArg ? parseDuration(timeArg) : undefined;

      let members: GuildMember[];

      const targetMember =
        guild.members.cache.get(target!) || message.mentions.members?.first();
      if (!targetMember) return i18.no_members;
      members = [targetMember];

      if (!members.length) return i18.no_members;

      return handleMute("mute", members, "text", duration, reason);
    }
  },
};
