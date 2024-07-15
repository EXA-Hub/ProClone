// commands/warn_remove.js

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
    name: "warn_remove",
    type: 1,
    description: "Removes warnings from all members or specific user.",
    options: [
      {
        type: 3,
        name: "input",
        description: "[Warn id] or [user] or [all] to remove all warnings",
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
    const i18n = client.i18n[await client.getLanguage(guild.id)].warn_remove;
    const input = interaction
      ? interaction.options.get("input")?.value
      : args.slice(1).join(" ");

    if (!input)
      return {
        embeds: [
          {
            title: "**Command: removewarn**",
            description: "Removes warnings from all members or specific user.",
            fields: [
              {
                name: "**Usage:**",
                value:
                  "/removewarn [warnID]\n/removewarn [user]\n/removewarn all",
                inline: false,
              },
              {
                name: "**Examples:**",
                value:
                  "/removewarn 69323094969\n/removewarn <@!718847838464770080>\n/removewarn all",
                inline: false,
              },
            ],
          },
        ],
      };

    const warnings = await client.db.get(`warns.${guild.id}`);

    if (warnings.length === 0) return i18n.invalid;

    if (input.toString().toLowerCase() === "all") {
      // Handle the "all" case
      await client.db.set(`warns.${guild.id}`, []);
      return i18n.warnsRemoved.replace("{size}", warnings.length.toString());
    }

    // Check if input is a user mention or user ID
    let targetUser: GuildMember | undefined;
    if (interaction) {
      const userIdMatch = input.toString().match(/^<@!?(\d+)>$/);
      targetUser = guild.members.cache.get(
        (userIdMatch ? userIdMatch[1] : input).toString()
      );
    } else {
      targetUser =
        message.mentions.members!.first() ||
        guild.members.cache.get(input.toString());
    }

    if (targetUser) {
      const nonTargetWarnings = warnings.filter(
        (warn: { user: string }) => warn.user !== targetUser.id
      );
      await client.db.set(`warns.${guild.id}`, nonTargetWarnings);
      return i18n.warnsRemoved.replace(
        "{size}",
        (warnings.length - nonTargetWarnings.length).toString()
      );
    }

    // Handle the case of removing by warn ID
    const warnID = parseInt(input.toString());
    if (!isNaN(warnID) || warnID < 0 || warnID > warnings.length) {
      // Splice out the warning from the array
      const removedWarn = warnings.splice(warnID - 1, 1);

      // Update the database with the modified warnings array
      await client.db.set(`warns.${guild.id}`, warnings);

      // Calculate how many warnings were removed
      const removedCount = removedWarn.length;

      // Return the response
      return i18n.warnsRemoved.replace("{size}", removedCount.toString());
    } else {
      // Return an error message if the warnID is invalid
      return i18n.invalid;
    }
  },
};
