const { PermissionsBitField } = require("discord.js");

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  GuildMember,
  PermissionFlagsBits,
} from "discord.js";
module.exports = {
  data: {
    name: "timeout",
    type: 1,
    description:
      "⏱ Timeout a user from sending messages, react or join voice channels.",
    default_member_permissions: PermissionFlagsBits.ModerateMembers.toString(),
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to timeout",
        required: true,
      },
      {
        type: 3,
        name: "time",
        description: "The duration of timeout",
      },
      {
        type: 3,
        name: "reason",
        description: "The reason of timeout.",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    const lang = await client.getLanguage(interaction.guild!.id);
    const i18n = client.i18n[lang].timeout;

    const member = interaction.options.get("user")?.member as GuildMember;
    let time = interaction.options.get("time")?.value || "2h";
    const reason =
      interaction.options.get("reason")?.value || "No reason provided";

    if (!member) {
      interaction.reply({
        content: i18n["invalidMember"],
      });
      return;
    }

    const memberUser = interaction.member as GuildMember;
    // Check if interaction.member!.permissions has the required permission
    if (!memberUser.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      interaction.reply({
        content: i18n["noPermission"],
      });
      return;
    }

    const timeInMs = parseDuration(`${time}`);
    if (!timeInMs) {
      interaction.reply({
        content: i18n["invalidDuration"],
      });
      return;
    }

    // 28 days in milliseconds
    if (timeInMs > 28 * 24 * 60 * 60 * 1000) {
      interaction.reply({
        content: i18n["max"],
      });
      return;
    }

    const endDate = new Date(Date.now() + timeInMs);
    const formattedEndDate = endDate.toLocaleString("en-US", {
      timeZone: "UTC", // Adjust to your preferred timezone
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const initiator = interaction.user.tag;
    const finalReason = `By: ${initiator}, REASON: ${reason}, ENDS ON: ${formattedEndDate}`;

    try {
      await member.timeout(timeInMs, finalReason);

      await interaction.reply({
        content: i18n["timeoutSuccess"].replace("{user}", member.user.username),
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: i18n["timeoutError"],
        ephemeral: true,
      });
    }
  },
};

function parseDuration(duration: String) {
  const match = duration.match(/^(\d+)([smhdwmoY])$/i);
  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 1000 * 60;
    case "h":
      return value * 1000 * 60 * 60;
    case "d":
      return value * 1000 * 60 * 60 * 24;
    case "w":
      return value * 1000 * 60 * 60 * 24 * 7;
    case "mo":
      return value * 1000 * 60 * 60 * 24 * 30;
    case "y":
      return value * 1000 * 60 * 60 * 24 * 365;
    default:
      return null;
  }
}
