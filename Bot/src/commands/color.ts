// commands/color.js

import { CustomClient } from "../types"; // Import CustomClient interface

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
    name: "color",
    type: 1,
    description: "Changes your color in the server",
    options: [
      {
        type: 4,
        name: "number_of_color",
        description: "Number of the color given in the /colors commands",
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
    const colorNumber = interaction
      ? interaction.options.get("number_of_color", true).value
      : parseInt(args[1]);

    const i18n = client.i18n[await client.getLanguage(guild.id)].color;

    // Filter roles that have names consisting only of numbers and sort them numerically
    const colorRoles = guild.roles.cache.filter((role) =>
      /^\d+$/.test(role.name)
    );

    // Find the role corresponding to the provided color number
    const colorRole = colorRoles.find(
      (role) => parseInt(role.name) === colorNumber
    );

    if (!colorRole)
      return {
        embeds: [
          {
            title: i18n.invalidColorNumber,
            color: 0,
            footer: {
              text: i18n.requested.replace("{member}", member.displayName),
              icon_url: user.avatarURL(),
            },
          },
        ],
      };

    await member.roles.remove(
      member.roles.cache.filter((role) => colorRoles.has(role.id))
    );
    await member.roles.add(colorRole);

    return {
      embeds: [
        {
          title: i18n.success,
          color: colorRole.color,
          footer: {
            text: i18n.requested.replace("{member}", member.displayName),
            icon_url: user.avatarURL(),
          },
        },
      ],
    };
  },
};
