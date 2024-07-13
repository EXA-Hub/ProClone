// commands/user.js
const { EmbedBuilder } = require("discord.js");
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
    name: "user",
    type: 1,
    description:
      "Displays information about yourself or another user, such as ID and join date.",
    options: [
      {
        type: 6,
        name: "user",
        description: "User to get information about.",
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
    const userLang = client.i18n[await client.getLanguage(guild.id)].user;

    const u =
      (interaction
        ? interaction.options.get("user")?.user
        : message.mentions.users.first() || client.users.cache.get(args[1])) ||
      user;

    return {
      embeds: [
        new EmbedBuilder()
          .setColor(8974168)
          .addFields(
            {
              name: userLang[0],
              value: `**<t:${Math.floor(u.createdTimestamp / 1000)}:R>**`,
              inline: true,
            },
            {
              name: userLang[1],
              value: `**<t:${Math.floor(
                (await guild.members.fetch(u.id)).joinedTimestamp! / 1000
              )}:R>**`,
              inline: true,
            }
          )
          .setThumbnail(u.displayAvatarURL({ size: 1024 }))
          .setFooter({
            text: u.username,
            iconURL: u.displayAvatarURL({ size: 1024 }),
          }),
      ],
    };
  },
};
