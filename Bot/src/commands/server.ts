// commands/server.js

const { EmbedBuilder } = require("discord.js");

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "server",
    type: 1,
    description: "Displays information about the server.",
    options: [],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    let nums = {
      text: 0,
      voice: 0,
      category: 0,
    };

    interaction.guild!.channels.cache.forEach((channel) => {
      if ([5, 0].includes(channel.type)) {
        nums.text++;
      } else if (channel.type === 2) {
        nums.voice++;
      } else if (channel.type == 4) {
        nums.category++;
      }
    });

    const lang = await client.getLanguage(interaction.guild!.id);
    const i18n = client.i18n[lang];

    const fields = i18n.server.fields.map((field: any) => {
      let name = field.name;
      let value = field.value;

      // Replace placeholders with actual values for name
      name = name
        .replace("{guildId}", interaction.guild!.id)
        .replace(
          "{createdTimestamp}",
          Math.floor(interaction.guild!.createdTimestamp / 1000)
        )
        .replace("{ownerId}", interaction.guild!.ownerId)
        .replace("{memberCount}", interaction.guild!.memberCount)
        .replace(
          "{onlineMemberCount}",
          interaction.guild!.members.cache.filter((member) => member.presence)
            .size
        )
        .replace("{boostCount}", interaction.guild!.premiumSubscriptionCount)
        .replace("{textChannelCount}", nums.text)
        .replace("{voiceChannelCount}", nums.voice)
        .replace(
          "{channelCount}",
          interaction.guild!.channels.channelCountWithoutThreads - nums.category
        )
        .replace("{verificationLevel}", interaction.guild!.verificationLevel)
        .replace("{roleCount}", interaction.guild!.roles.cache.size);

      // Replace placeholders with actual values for value
      value = value
        .replace("{guildId}", interaction.guild!.id)
        .replace(
          "{createdTimestamp}",
          Math.floor(interaction.guild!.createdTimestamp / 1000)
        )
        .replace("{ownerId}", interaction.guild!.ownerId)
        .replace("{memberCount}", interaction.guild!.memberCount)
        .replace(
          "{onlineMemberCount}",
          interaction.guild!.members.cache.filter((member) => member.presence)
            .size
        )
        .replace("{boostCount}", interaction.guild!.premiumSubscriptionCount)
        .replace("{textChannelCount}", nums.text)
        .replace("{voiceChannelCount}", nums.voice)
        .replace(
          "{channelCount}",
          interaction.guild!.channels.channelCountWithoutThreads - nums.category
        )
        .replace("{verificationLevel}", interaction.guild!.verificationLevel)
        .replace("{roleCount}", interaction.guild!.roles.cache.size);

      return {
        name: name,
        value: value,
        inline: field.inline || false,
      };
    });

    const embed = new EmbedBuilder()
      .setColor(0)
      .setAuthor({ name: interaction.guild!.name })
      .addFields(fields);

    // Set the guild's icon as the image if it exists
    if (interaction.guild!.icon) {
      embed.setThumbnail(interaction.guild!.iconURL({})).setAuthor({
        name: interaction.guild!.name,
        iconURL: interaction.guild!.iconURL({}),
      });
    }

    await interaction.reply({
      embeds: [embed],
    });
  },
};
