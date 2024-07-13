// commands/server.js

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
    name: "server",
    type: 1,
    description: "Displays information about the server.",
    options: [],
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
    let nums = {
      text: 0,
      voice: 0,
      category: 0,
    };

    guild.channels.cache.forEach((channel) => {
      if ([5, 0].includes(channel.type)) {
        nums.text++;
      } else if (channel.type === 2) {
        nums.voice++;
      } else if (channel.type == 4) {
        nums.category++;
      }
    });

    const lang = await client.getLanguage(guild.id);
    const i18n = client.i18n[lang];

    const fields = i18n.server.fields.map((field: any) => {
      let name = field.name;
      let value = field.value;

      // Replace placeholders with actual values for name
      name = name
        .replace("{guildId}", guild.id)
        .replace(
          "{createdTimestamp}",
          Math.floor(guild.createdTimestamp / 1000)
        )
        .replace("{ownerId}", guild.ownerId)
        .replace("{memberCount}", guild.memberCount)
        .replace(
          "{onlineMemberCount}",
          guild.members.cache.filter((member) => member.presence).size
        )
        .replace("{boostCount}", guild.premiumSubscriptionCount)
        .replace("{textChannelCount}", nums.text)
        .replace("{voiceChannelCount}", nums.voice)
        .replace(
          "{channelCount}",
          guild.channels.channelCountWithoutThreads - nums.category
        )
        .replace("{verificationLevel}", guild.verificationLevel)
        .replace("{roleCount}", guild.roles.cache.size);

      // Replace placeholders with actual values for value
      value = value
        .replace("{guildId}", guild.id)
        .replace(
          "{createdTimestamp}",
          Math.floor(guild.createdTimestamp / 1000)
        )
        .replace("{ownerId}", guild.ownerId)
        .replace("{memberCount}", guild.memberCount)
        .replace(
          "{onlineMemberCount}",
          guild.members.cache.filter((member) => member.presence).size
        )
        .replace("{boostCount}", guild.premiumSubscriptionCount)
        .replace("{textChannelCount}", nums.text)
        .replace("{voiceChannelCount}", nums.voice)
        .replace(
          "{channelCount}",
          guild.channels.channelCountWithoutThreads - nums.category
        )
        .replace("{verificationLevel}", guild.verificationLevel)
        .replace("{roleCount}", guild.roles.cache.size);

      return {
        name: name,
        value: value,
        inline: field.inline || false,
      };
    });

    const embed = new EmbedBuilder()
      .setColor(0)
      .setAuthor({ name: guild.name })
      .addFields(fields);

    // Set the guild's icon as the image if it exists
    if (guild.icon) {
      embed.setThumbnail(guild.iconURL({})).setAuthor({
        name: guild.name,
        iconURL: guild.iconURL({}),
      });
    }

    return {
      embeds: [embed],
    };
  },
};
