// commands/ban.js

import getUsersSortedByPermission from "../methods/memberSorter";
import parseDuration from "../methods/timeString";
import { CustomClient } from "../types"; // Import CustomClient interface

import {
  PermissionFlagsBits,
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
  APIInteractionDataResolvedGuildMember,
  Collection,
  Snowflake,
} from "discord.js";

module.exports = {
  data: {
    name: "ban",
    type: 1,
    description: "Bans a member.",
    default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "User to ban.",
        required: true,
      },
      {
        type: 3,
        name: "time",
        description: "Time duration for the ban.",
      },
      {
        type: 3,
        name: "reason",
        description: "The reason of the ban.",
      },
      {
        type: 3,
        name: "bulk",
        description: "User to ban.",
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
    let data: {
      member: GuildMember | undefined;
      time: number | undefined | null;
      reason: string | undefined;
      bulk: Snowflake[] | undefined;
    } = {
      member: undefined,
      time: undefined,
      reason: `By: ${user.tag}, REASON: ENDS ON: ${new Date(
        Date.now() + 604800
      ).toLocaleString()}`,
      bulk: undefined,
    };

    if (interaction)
      data = {
        member: interaction.options.get("user")?.member as GuildMember,
        time: parseDuration(
          interaction.options.get("time")?.value?.toString() || "0s"
        ),
        reason:
          interaction.options.get("reason")?.value?.toString() || data.reason,
        bulk: interaction.options
          .get("bulk")
          ?.value?.toString()
          .match(/<@!?(\d+)>/g)!
          .map((mention) => mention.match(/\d+/)?.[0])
          .filter((id) => id !== null) as Snowflake[],
      };
    else
      data = {
        member:
          message.mentions.members?.first() || guild.members.cache.get(args[1]),
        time: parseDuration(args[2]),
        reason: args.slice(2).join(" "),
        bulk: undefined,
      };

    const i18 = client.i18n[await client.getLanguage(guild.id)].ban;

    if (!data.member || !data.member.id) return i18.no_member;

    if (
      getUsersSortedByPermission(
        guild.id,
        [member, data.member],
        PermissionFlagsBits.BanMembers
      ).shift()?.id === data.member.id
    )
      return i18.non.replace("{user}", data.member.displayName);

    try {
      await guild.members.ban(data.member.id, {
        reason: data.reason,
        deleteMessageSeconds: 604800,
      });

      if (data.bulk && data.bulk.length > 0)
        guild.members.bulkBan(data.bulk, {
          reason: data.reason,
          deleteMessageSeconds: 604800,
        });

      if (data.time)
        await client.db.push(`bans.${guild.id}`, {
          ids: [data.member.id, ...(data.bulk ? data.bulk : [])],
          timeEnd: Date.now() + data.time!,
        });

      return i18.success_single.replace("{user}", data.member.user.username);
    } catch (error) {
      console.error("Failed to ban member:", error);
      return i18.failed;
    }
  },
};
