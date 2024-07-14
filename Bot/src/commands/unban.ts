// commands/unban.js

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
    name: "unban",
    type: 1,
    description: "Unbans a member.",
    default_member_permissions: PermissionFlagsBits.BanMembers.toString(),
    options: [
      {
        type: 3,
        name: "input",
        description: "User to remove the ban of.",
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
    const i18 = client.i18n[await client.getLanguage(guild.id)].unban;

    let input: string | undefined;

    if (interaction)
      input = interaction.options.get("input")?.value?.toString();
    else input = args[1];

    if (!input) return i18.invalid_input;

    try {
      const userToUnban = (await guild.bans.fetch()).find(
        (ban) =>
          ban.user.id === input ||
          `${ban.user.username}#${ban.user.discriminator}` === input ||
          ban.user.displayName === input ||
          ban.user.username === input
      );

      if (!userToUnban)
        return {
          embeds: [
            {
              description: i18.not_found.replace("{user}", input),
              color: 14423100,
            },
          ],
        };

      await guild.members.unban(userToUnban.user.id);
      return i18.success.replace("{user}", userToUnban.user.tag);
    } catch (error) {
      console.error("Failed to unban member:", error);
      return i18.failed;
    }
  },
};
