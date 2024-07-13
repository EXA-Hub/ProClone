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
  TextChannel,
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
    channel: TextChannel,
    args: string[]
  ) => {
    const i18n = client.i18n[await client.getLanguage(guild.id)].setnick;
    const m = (
      interaction
        ? interaction.options.get("user")?.member
        : message.mentions.members?.first() ||
          guild.members.cache.get(args[1].toString())
    ) as GuildMember;
    const newNick = interaction
      ? interaction.options.get("new_nick")?.value?.toString()
      : args.slice(2).join(" ").slice(0, 32);

    if (!m)
      return {
        content: i18n["invalidMember"],
        ephemeral: true,
      };

    try {
      await m.setNickname(newNick || null, `Changed by ${user.tag}`);

      return {
        content: i18n[newNick ? "nickSuccess" : "nickSuccessR"]
          .replace("{user}", m.user.tag)
          .replace("{newNick}", `${newNick}`),
      };
    } catch (error) {
      console.error(error);
      await channel.send({
        content: i18n["noPermission"],
      });
      return {
        content: i18n["nickError"],
        ephemeral: true,
      };
    }
  },
};
