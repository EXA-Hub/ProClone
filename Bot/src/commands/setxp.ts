// commands/setxp.js

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
    name: "setxp",
    type: 1,
    description: "Sets the user's xp",
    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user for whom you want to set xp",
        required: true,
      },
      {
        type: 3,
        name: "type",
        description: "Type of xp to set either text or voice",
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
        ],
      },
      {
        type: 4,
        name: "xp",
        description: "The amount of xp to set to the user",
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
    const i18n = client.i18n[await client.getLanguage(guild.id)].setxp;

    let targetUser: GuildMember | undefined;
    let xpType;
    let newXp: string | number;

    if (interaction) {
      targetUser = interaction.options.get("user")?.member as GuildMember;
      xpType = interaction.options.get("type")?.value;
      newXp = interaction.options.get("xp")?.value as string;
    } else {
      targetUser =
        message.mentions.members?.first() || guild.members.cache.get(args[1]);
      xpType = args[2];
      newXp = args[3];
    }

    if (targetUser?.user.bot) return i18n.bot;
    newXp = parseInt(newXp?.toString());
    if (!targetUser || !xpType || !newXp) return;

    const guildId = guild.id;
    const userId = targetUser!.id;

    // Fetch guild-specific user data from the database
    const xpData_guild = (await client.db.get(`xp_${guildId}`)) || {};
    xpData_guild[userId] = xpData_guild[userId] || {
      textXP: 0,
      voiceXP: 0,
    };

    // Set the new XP
    if (xpType === "text") xpData_guild[userId].textXP = newXp;
    else if (xpType === "voice") xpData_guild[userId].voiceXP = newXp;

    // Save the updated user data to the database
    await client.db.set(`xp_${guildId}`, xpData_guild);

    return i18n.done.replace("{user}", targetUser?.user.username);
  },
};
