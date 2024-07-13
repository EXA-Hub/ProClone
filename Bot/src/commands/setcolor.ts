// commands/setcolor.js

import { CustomClient } from "../types"; // Import CustomClient interface

import { ColorResolvable, PermissionFlagsBits, Role } from "discord.js";
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
    name: "setcolor",
    type: 1,
    description: "Changes role's colors by hex codes.",

    default_member_permissions: PermissionFlagsBits.ManageRoles.toString(),
    options: [
      {
        type: 8,
        name: "role",
        description: "Role to set color for.",
        required: true,
      },
      {
        type: 3,
        name: "hex_code",
        description: ":rolling_eyes: - Hex color length must equal 6 or 3",
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
    const timeLang = client.i18n[await client.getLanguage(guild.id)].setcolor;

    // Retrieve options based on interaction or message context
    const role = (
      interaction
        ? interaction.options.get("role")?.role
        : message?.mentions.roles.first() || guild.roles.cache.get(args[1])
    ) as Role;
    const hexCode = (
      interaction ? interaction.options.get("hex_code")?.value : args[2]
    )
      ?.toString()
      .replace(/^#/, "");

    if (!role || !hexCode) return timeLang.invalid_role;

    // Validate hex code format
    if (!/^([0-9A-F]{3}){1,2}$/i.test(hexCode)) return timeLang.invalid_input;

    try {
      await role.setColor(`#${hexCode}`);

      return {
        embeds: [
          {
            description: timeLang.embed.desc.replace("{role}", `${role}`),
            color: role.color,
            author: {
              name: role.name,
              icon_url:
                role.iconURL() ||
                `https://www.colorcombos.com/images/colors/hex/${hexCode}.png`,
            },
            footer: {
              text: timeLang.embed.foot.replace("{user}", user.displayName),
              icon_url: user.avatarURL(),
            },
          },
        ],
      };
    } catch (error) {
      console.error(error);
      return {
        content: timeLang.error,
      };
    }
  },
};
