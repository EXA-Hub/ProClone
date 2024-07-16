// commands/reset.js

import { CustomClient } from "../types"; // Import CustomClient interface

import { PermissionFlagsBits, ReplyOptions } from "discord.js";
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
    args: string[]
  ): Promise<ReplyOptions | String | Message | undefined> => {
    const i18n = client.i18n[await client.getLanguage(guild.id)].reset;

    let target: string | undefined;
    let xpType: string | undefined;

    if (interaction) {
      target = interaction.options.get("target")?.value?.toString();
      xpType = interaction.options.get("type")?.value?.toString();
    } else {
      target = args[1];
      xpType = args[2];
    }

    if (!target || !xpType) return;

    // Extract numerical ID from mention
    const targetId = target.match(/\d+/)?.[0];
    if (!targetId) return;

    if (!["text", "voice"].includes(xpType)) return "Working on that command!";

    // Fetch guild-specific user data from the database
    let xpData_guild = (await client.db.get(`xp_${guild.id}`)) || {};

    // Check if target is a role ID, everyone ID, or member ID
    const isRole = guild.roles.cache.has(targetId);
    const isEveryone = targetId === guild.id;
    const isMember = guild.members.cache.has(targetId);

    if (!isRole && !isEveryone && !isMember) return;

    const xpTypeValue = xpType === "voice" ? "voiceXP" : "textXP ";

    if (isEveryone) {
      for (let userId in xpData_guild) {
        xpData_guild[userId][xpTypeValue] = 0;
      }
    } else if (isRole) {
      const roleMembers = guild.roles.cache.get(targetId)?.members;
      roleMembers?.forEach((member) => {
        if (xpData_guild[member.id]) xpData_guild[member.id][xpTypeValue] = 0;
      });
    } else if (isMember) {
      if (xpData_guild[targetId]) xpData_guild[targetId][xpTypeValue] = 0;
    }

    await client.db.set(`xp_${guild.id}`, xpData_guild);

    return i18n.xp;
  },
};
