// commands/setnick.js

const { PermissionsBitField } = require("discord.js");

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction, GuildMember } from "discord.js";
module.exports = {
  data: {
    name: "setnick",
    type: 1,
    description: "Changes a member's nickname.",
    options: [
      {
        type: 6,
        name: "user",
        description: "User to set nick for.",
        required: true,
      },
      {
        type: 3,
        name: "new_nick",
        description: "The new nickname.",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    const lang = await client.getLanguage(interaction.guild!.id);
    const i18n = client.i18n[lang].setnick;

    const member = interaction.options.get("user")?.member as GuildMember;
    const newNick = interaction.options.get("new_nick")?.value;

    const memberUser = interaction.member as GuildMember;
    // Check if interaction.member!.permissions has the required permission
    if (
      !memberUser.permissions.has(PermissionsBitField.Flags.ManageNicknames)
    ) {
      interaction.reply({
        content: i18n["noPermission"],
      });
      return;
    }

    if (!member) {
      interaction.reply({
        content: i18n["invalidMember"],
        ephemeral: true,
      });
      return;
    }

    try {
      await member.setNickname(
        `${newNick}`,
        `Changed by ${interaction.user.tag}`
      );

      await interaction.reply({
        content: i18n[newNick ? "nickSuccess" : "nickSuccessR"]
          .replace("{user}", member.user.tag)
          .replace("{newNick}", newNick),
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: i18n["nickError"],
        ephemeral: true,
      });
    }
  },
};
