// commands/help.js

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

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
    name: "help",
    type: 1,
    description: "Feeling lost?",
    options: [
      {
        type: 3,
        name: "command",
        description: "Shows details about how to use a command.",
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
    const cmd = interaction
      ? interaction.options.get("command")?.value
      : args[1];

    if (cmd && cmd !== "help") {
      const command = client.commands.get(`${cmd}`);
      if (command) {
        // Define the type of each object in help.json
        type HelpItem = {
          [key: string]: {
            credits: string;
            usage: string;
            examples: string;
            // Add more properties if needed
          };
        };
        const helpData: HelpItem = require("../database/help.json").find(
          (c: HelpItem) => c[command.data.name]
        );
        const embed = new EmbedBuilder()
          .setTitle("Command: " + command.data.name)
          .setDescription(command.data.description)
          .setFields([
            {
              name: client.i18n[await client.getLanguage(guild.id)].help[2],
              value: helpData.usage,
            },
            {
              name: client.i18n[await client.getLanguage(guild.id)].help[1],
              value: helpData.examples,
            },
          ]);

        return {
          embeds: [embed],
          ephemeral: true,
        };
      } else
        return {
          ephemeral: true,
          content: client.i18n[await client.getLanguage(guild.id)].help[0],
        };
    } else {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Add to your server")
          .setStyle(5)
          .setURL(`https://discord.gg/qGtQqZFr`),
        new ButtonBuilder()
          .setLabel("ProBot Dashboard")
          .setStyle(5)
          .setURL(`https://discord.gg/qGtQqZFr`)
      );

      return {
        ephemeral: true,
        content: `**${guild.name}** prefix is \`/\` 
Commands list at https://probot.io/commands
Dashboard at https://probot.io/
Looking for support? https://discord.gg/probot`,
        components: [row],
      };
    }
  },
};
