// commands/move.js

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  Message,
  PermissionFlagsBits,
  Guild,
  GuildMember,
  Channel,
  User,
  VoiceChannel,
} from "discord.js";
module.exports = {
  data: {
    name: "move",
    type: 1,
    description: "Moves a member to another voice channel.",
    default_member_permissions: PermissionFlagsBits.MoveMembers.toString(),
    options: [
      {
        type: 1,
        name: "user",
        description: "Moves a member to another voice channel.",
        options: [
          {
            type: 6,
            name: "user",
            description: "The user to move.",
            required: true,
          },
          {
            type: 7,
            name: "channel",
            description: "Channel to move the user to.",
            channel_types: [2],
          },
        ],
      },
      {
        type: 1,
        name: "all",
        description:
          "Moves all members to the voice channel to which you are currently connected",
        options: [
          {
            type: 7,
            name: "channel",
            description: "Channel to move the user to.",
            channel_types: [2],
          },
        ],
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
    const i18 = client.i18n[await client.getLanguage(guild.id)].move;

    if (interaction) {
      const sub = interaction.options.data[0].name.toString();
      const vchannel = (interaction.options.get("channel")?.channel ||
        member.voice.channel) as VoiceChannel;

      // Check if the user is in a voice channel
      if (!vchannel) return i18.noVC;

      switch (sub) {
        case "all":
          const msg = await interaction.reply({
            content: i18.confirm,
            allowedMentions: {},
          });

          const collector = interaction.channel!.createMessageCollector({
            filter: (response) => response.author.id === user.id,
            max: 1,
          });

          collector.on("collect", (response) => {
            try {
              response.delete();

              if (response.content !== "y")
                return msg.edit({ content: i18.Aborted, allowedMentions: {} });

              msg.edit({ content: i18.move, allowedMentions: {} });

              guild.members.cache
                .filter(
                  (m) =>
                    m.voice.channel && m.voice.channel.guild.id === guild.id
                )
                .forEach(async (memberToMove) => {
                  await memberToMove.voice.setChannel(vchannel);
                });
            } catch (error) {
              return msg.edit({ content: i18.error, allowedMentions: {} });
            }
          });

          return msg;
        case "user":
          const vuser = interaction.options.get("user")?.member as GuildMember;
          if (!vuser.voice.channel) return i18.noVCM;
          if (vuser.voice.channel === vchannel)
            return i18.already.replace("{user}", vuser.displayName);
          vuser.voice.setChannel(vchannel);
          return i18.moved
            .replace("{channel}", vchannel.name)
            .replace("{user}", vuser.displayName);
      }
    } else {
      if (args[1] === "all") {
        // Check if the user is in a voice channel
        if (!member.voice.channel) return i18.noVC;

        const msg = await message.reply({
          content: i18.confirm,
          allowedMentions: {},
        });
        const collector = message.channel.createMessageCollector({
          filter: (response) => response.author.id === user.id,
          max: 1,
        });

        collector.on("collect", (response) => {
          try {
            response.delete();

            if (response.content !== "y")
              return msg.edit({ content: i18.Aborted, allowedMentions: {} });

            msg.edit({ content: i18.move, allowedMentions: {} });

            guild.members.cache
              .filter(
                (m) => m.voice.channel && m.voice.channel.guild.id === guild.id
              )
              .forEach(async (memberToMove) => {
                await memberToMove.voice.setChannel(member.voice.channel);
              });
          } catch (error) {
            return msg.edit({ content: i18.error, allowedMentions: {} });
          }
        });

        return msg;
      } else {
        const vuser =
          message.mentions.members?.first() || guild.members.cache.get(args[1]);
        if (!vuser) return i18.noMember;
        if (!vuser.voice.channel) return i18.noVCM;
        const vchannel =
          guild.channels.cache.find(
            (vc) => vc.name.toLocaleLowerCase() === args[2].toLocaleLowerCase()
          ) ||
          message.mentions.channels.first() ||
          guild.channels.cache.get(args[2]) ||
          message.mentions.members?.last()?.voice.channel ||
          guild.members.cache.get(args[2])?.voice.channel;
        if (!vchannel || !vchannel.isVoiceBased()) return i18.notFound;
        if (vchannel === vuser.voice.channel)
          return i18.already.replace("{user}", vuser.displayName);
        vuser.voice.setChannel(vchannel);
        return i18.moved
          .replace("{channel}", vchannel.name)
          .replace("{user}", vuser.displayName);
      }
    }
  },
};
