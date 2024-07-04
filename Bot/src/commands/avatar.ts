// commands/avatar.js

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction, EmbedBuilder } from "discord.js";

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
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient

    // Assuming interaction is of type CommandInteraction
    const userOption = interaction.options.get("user");
    const user = userOption?.user || interaction.user;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: user.username,
        iconURL: user.displayAvatarURL({ size: 1024 }),
      })
      .setImage(user.displayAvatarURL({ size: 1024 }))
      .setFooter({
        text:
          client.i18n[await client.getLanguage(interaction.guild!.id)].avatar +
          interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({
          size: 1024,
        }),
      });

    await interaction.reply({
      embeds: [embed],
      allowedMentions: { repliedUser: false },
    });
  },
};
