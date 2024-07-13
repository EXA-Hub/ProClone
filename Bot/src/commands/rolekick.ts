// commands/rolekick.js

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  GuildMember,
  Message,
  PermissionFlagsBits,
  Guild,
  Channel,
  User,
} from "discord.js";
module.exports = {
  data: {
    name: "rolekick",
    type: 1,
    description: "Kicks all members with a specific role",
    default_member_permissions: PermissionFlagsBits.KickMembers.toString(),
    options: [
      {
        type: 8,
        name: "role",
        description: "Specify the role to kick all members who have it.",
        required: true,
      },
      {
        type: 8,
        name: "exclude",
        description: "Exclude members with this role from being kicked",
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
    const i18n = client.i18n[await client.getLanguage(guild.id)].rolekick;

    if (guild.ownerId !== user.id) return i18n.ownerOnly;

    // Parse arguments based on command type
    const roleId = interaction
      ? interaction.options.get("role")?.role?.id
      : args[1]?.replace(/<@&!?(\d+)>/, "$1");

    if (!roleId)
      return {
        content: i18n["invalidRole"],
        ephemeral: true,
      };

    const role = guild.roles.cache.get(roleId);
    if (!role)
      return {
        content: i18n["roleNotFound"],
        ephemeral: true,
      };

    const excludeRoleId = interaction
      ? interaction.options.get("exclude")?.role?.id
      : args[2]?.replace(/<@&!?(\d+)>/, "$1");

    const excludeRole = excludeRoleId
      ? guild.roles.cache.get(excludeRoleId)
      : null;

    const membersToKick = role.members.filter((m) =>
      excludeRole ? !m.roles.cache.has(excludeRole.id) : true
    );

    if (membersToKick.size === 0)
      return {
        content: i18n["noMembers"],
        ephemeral: true,
      };

    try {
      for (const member of membersToKick.values()) {
        await member.kick(i18n["kickReason"].replace("{role}", role.name));
      }

      return {
        content: i18n["kickSuccess"].replace(
          "{count}",
          membersToKick.size.toString()
        ),
      };
    } catch (error) {
      console.error(error);
      return {
        content: i18n["kickError"],
        ephemeral: true,
      };
    }
  },
};
