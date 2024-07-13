import { GuildMember, PermissionResolvable, Snowflake } from "discord.js";

/**
 * Sorts members by the highest role with a specified permission.
 * @param guildId - The guild from which members are taken.
 * @param members - Array of guild members to be sorted.
 * @param permission - The permission to check for.
 * @returns Sorted array of guild members by the highest role with the specified permission.
 */

// Function to get users sorted by highest role with specified permission
export default function getUsersSortedByPermission(
  guildId: Snowflake,
  members: GuildMember[],
  permission: PermissionResolvable
): GuildMember[] {
  return members
    .filter((user) => user.guild.id === guildId)
    .map((user) => {
      return {
        user,
        highestRole: user.roles.cache
          .filter((role) => role.permissions.has(permission))
          .sort((a, b) => b.position - a.position)
          .first(),
      };
    })
    .sort((a, b) => {
      if (!a.highestRole) return 1; // Users without the permission go to the end
      if (!b.highestRole) return -1; // Users without the permission go to the end
      return a.highestRole.position - b.highestRole.position; // Sort by role position descending
    })
    .map((entry) => entry.user);
}
