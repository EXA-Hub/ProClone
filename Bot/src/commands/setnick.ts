// commands/setnick.js

const { PermissionsBitField } = require("discord.js");

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  PermissionFlagsBits,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
module.exports = {
  data: {
    name: "setnick",
    type: 1,
    description: "Changes a member's nickname.",
    default_member_permissions: PermissionFlagsBits.ManageNicknames.toString(),
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
  execute: async (
    client: CustomClient,
    interaction: CommandInteraction,
    message: Message,
    guild: Guild,
    member: GuildMember,
    user: User,
    channel: Channel,
    args: String[]
  ) => {
    const lang = await client.getLanguage(guild.id);
    const i18n = client.i18n[lang].setnick;

    const m = interaction.options.get("user")?.member as GuildMember;
    const newNick = interaction.options.get("new_nick")?.value;

    const memberUser = interaction.member as GuildMember;
    // Check if interaction.member!.permissions has the required permission
    if (
      !memberUser.permissions.has(PermissionsBitField.Flags.ManageNicknames)
    ) {
      return {
        content: i18n["noPermission"],
      };
      return;
    }

    if (!m) {
      return {
        content: i18n["invalidMember"],
        ephemeral: true,
      };
      return;
    }

    try {
      await m.setNickname(`${newNick}`, `Changed by ${interaction.user.tag}`);

      return {
        content: i18n[newNick ? "nickSuccess" : "nickSuccessR"]
          .replace("{user}", m.user.tag)
          .replace("{newNick}", `${newNick}`),
      };
    } catch (error) {
      console.error(error);
      await interaction.channel?.send({
        content: i18n["noPermission"],
      });
      return {
        content: i18n["nickError"],
        ephemeral: true,
      };
    }
  },
};
