// commands/slowmode.js

import { CustomClient } from "../types"; // Import CustomClient interface

import { PermissionFlagsBits, TextChannel } from "discord.js";
import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  User,
} from "discord.js";
import parseDuration from "../methods/timeString";

module.exports = {
  data: {
    name: "slowmode",
    type: 1,
    description: "Enable or disable slowmode on a channel.",
    default_member_permissions: PermissionFlagsBits.ManageChannels.toString(),
    options: [
      {
        type: 3,
        name: "time",
        description: "The time to set for slowmode channel.",
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
    const timeString = interaction
      ? interaction.options.get("time")?.value?.toString()
      : args[1];

    const timeLang = client.i18n[await client.getLanguage(guild.id)].slowMode;

    if (!timeString)
      return {
        content: timeLang["slowMode"].replace(
          "{seconds}",
          channel.rateLimitPerUser.toString()
        ),
        ephemeral: true,
      };

    let seconds = parseDuration(timeString);
    if (seconds === null) {
      await channel.setRateLimitPerUser(0); // Disable slowmode
      return {
        content: timeLang["invalid"],
        ephemeral: true,
      };
    } else seconds /= 1000;

    if (seconds > 21600)
      return {
        content: timeLang["max_time_exceeded"],
        ephemeral: true,
      };

    try {
      await channel.setRateLimitPerUser(seconds);
      return {
        content: timeLang["success"].replace("{seconds}", seconds.toString()),
        ephemeral: true,
      };
    } catch (error) {
      console.error(error);
      return {
        content: timeLang["error"],
        ephemeral: true,
      };
    }
  },
};
