// commands/rolekick.js

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  GuildMember,
  PermissionsBitField,
} from "discord.js";
module.exports = {
  data: {
    name: "rolekick",
    type: 1,
    description: "Kicks all members with a specific role",
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
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    const lang = await client.getLanguage(interaction.guild!.id);
    const i18n = client.i18n[lang].rolekick;

    const member = interaction.member as GuildMember;
    // Check if interaction.member!.permissions has the required permission
    if (!member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      interaction.reply({
        content: i18n["noPermission"],
      });
      return;
    }

    const roleToKickId = interaction.options.get("role")?.role?.id;
    const excludeRoleId = interaction.options.get("exclude")?.role?.id;

    await interaction.deferReply();

    // Fetch all members with the role to kick
    let membersToKick = interaction.guild!.members.cache.filter(
      (member) =>
        member.roles.cache.has(`${roleToKickId}`) &&
        member.id !== client.user!.id
    );

    // Exclude members with the exclude role if specified
    if (excludeRoleId) {
      membersToKick = membersToKick.filter(
        (member) => !member.roles.cache.has(excludeRoleId)
      );
    }

    try {
      // Kick each member
      membersToKick.forEach(async (member) => {
        await member.kick(
          `Kicked due to rolekick command by ${interaction.user.tag}`
        );
      });

      await interaction.editReply({
        content: i18n["success"]
          .replace("{count}", membersToKick.size)
          .replace("{role}", interaction.options.get("role")!.role?.name),
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: i18n["error"],
      });
    }
  },
};
