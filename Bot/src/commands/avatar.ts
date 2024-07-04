// commands/avatar.js

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  EmbedBuilder,
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";

module.exports = {
  data: {
    name: "avatar",
    type: 1,
    description: "Displays your avatar or someone else's avatar.",
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to get avatar for.",
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
    channel: Channel
  ) => {
    // Assuming interaction is of type CommandInteraction
    const targetUser = interaction
      ? interaction.options.get("user")?.user || interaction.user
      : message.author;

    const embed = new EmbedBuilder()
      .setTitle("Avatar Link")
      .setURL(targetUser!.displayAvatarURL({ size: 1024 }))
      .setAuthor({
        name: targetUser!.username,
        iconURL: targetUser!.displayAvatarURL({ size: 1024 }),
      })
      .setImage(targetUser!.displayAvatarURL({ size: 1024 }))
      .setFooter({
        text:
          client.i18n[
            await client.getLanguage(interaction ? guild.id : message.guild!.id)
          ].avatar + user.username,
        iconURL: user.displayAvatarURL({
          size: 1024,
        }),
      });

    return {
      embeds: [embed],
      allowedMentions: { repliedUser: false },
    };
  },
};
