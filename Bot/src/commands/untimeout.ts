const { PermissionsBitField, BaseInteraction } = require("discord.js");

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  GuildMember,
  PermissionFlagsBits,
} from "discord.js";
module.exports = {
  data: {
    name: "untimeout",
    type: 1,
    description: "Remove timeout from a user",
    default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to untimeout",
        required: true,
      },
    ],
  },
  /**
   * @param {BaseInteraction} interaction
   * @returns
   */
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    const lang = await client.getLanguage(interaction.guild!.id);
    const i18n = client.i18n[lang].timeout;

    const member = interaction.options.get("user")?.member as GuildMember;

    if (!member) {
      interaction.reply({
        content: i18n["invalidMember"],
      });
      return;
    }

    const memberUser = interaction.member as GuildMember;
    // Check if interaction.member!.permissions has the required permission
    if (!memberUser.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      interaction.reply({
        content: i18n["noPermission"],
      });
      return;
    }

    if (member.user.id === client.user!.id) {
      interaction.reply({
        content: i18n["unoPermission"].replace("{user}", member.user.username),
      });
      return;
    }

    if (!member.isCommunicationDisabled()) {
      interaction.reply({
        content: i18n["notTimedOut"],
      });
      return;
    }

    try {
      await member.timeout(null);

      await interaction.reply({
        content: i18n["untimeoutSuccess"].replace(
          "{user}",
          member.user.username
        ),
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: i18n["untimeoutError"],
      });
    }
  },
};
