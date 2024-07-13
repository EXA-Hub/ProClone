// commands/moveme.js

import { CustomClient } from "../types"; // Import CustomClient interface

import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
  VoiceChannel,
  ChannelType,
  GuildChannel,
} from "discord.js";
module.exports = {
  data: {
    name: "moveme",
    type: 1,
    description: "Moves you to another voice channel.",
    options: [
      {
        type: 3,
        name: "input",
        description: "Channel/user to be moved to.",
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
    // Multilingual support - Fetch messages from en.json
    const i18n = client.i18n[await client.getLanguage(guild.id)].moveme;

    const findChannel = (input: string): Channel | undefined => {
      const channelID = input.replace(/\D/g, ""); // Extract numeric parts (IDs)
      const channel = guild.channels.cache.find(
        (ch) => ch.name === input || ch.id === channelID
      );
      return channel;
    };

    const findMember = (input: string): GuildMember | undefined => {
      const userID = input.replace(/\D/g, ""); // Extract numeric parts (IDs)
      const member = guild.members.cache.find(
        (mem) =>
          mem.displayName.toLowerCase().includes(input.toLowerCase()) ||
          mem.user.username.toLowerCase().includes(input.toLowerCase()) ||
          mem.id === userID ||
          (mem.user.id === userID && input.startsWith("<@"))
      );
      return member;
    };

    // Check if input is provided
    const input: any = interaction
      ? interaction.options.get("input")?.value?.toString()
      : args.join(" ");

    // Find channel or member based on input
    let target = findChannel(input) || findMember(input);

    // If target is found and is a member, move the user to their voice channel
    if (target instanceof GuildMember) {
      if (target.voice.channel) {
        if (member.voice.channel === target.voice.channel)
          return {
            embeds: [
              {
                description: i18n.alreadyInVoiceChannel.replace(
                  "{member}",
                  member.displayName
                ),
                color: 14423100,
              },
            ],
          };

        await member.voice.setChannel(target.voice.channel);
        return {
          embeds: [
            {
              description: i18n.moveChannelSuccess
                .replace("{channel}", target.voice.channel.name)
                .replace("{member}", member.displayName),
              color: 3329330,
            },
          ],
        };
      } else return i18n.userNotInVoice.replace("{target}", target.displayName);
    } else if (target instanceof GuildChannel) {
      if (!target) return i18n.notFound.replace("{input}", input);

      if (target.type === ChannelType.GuildVoice) {
        const voiceChannel = target as VoiceChannel;
        if (member.voice.channel) {
          if (member.voice.channel === voiceChannel)
            return {
              embeds: [
                {
                  description: i18n.alreadyInVoiceChannel.replace(
                    "{member}",
                    member.displayName
                  ),
                  color: 14423100,
                },
              ],
            };

          await member.voice.setChannel(voiceChannel);
          return {
            embeds: [
              {
                description: i18n.moveChannelSuccess
                  .replace("{channel}", voiceChannel.name)
                  .replace("{member}", member.displayName),
                color: 3329330,
              },
            ],
          };
        } else
          return i18n.userNotInVoice.replace("{target}", voiceChannel.name);
      } else return i18n.notVoiceChannel.replace("{channel}", target.name);
    } else return i18n.notFound.replace("{input}", input);
  },
};
