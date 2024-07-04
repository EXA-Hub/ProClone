// commands/help.js

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
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
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    const cmd = interaction.options.get("command");
    if (cmd && cmd.value !== "help") {
      const command = client.commands.get(`${cmd.value}`);
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
              name: client.i18n[await client.getLanguage(interaction.guild!.id)]
                .help[2],
              value: helpData.usage,
            },
            {
              name: client.i18n[await client.getLanguage(interaction.guild!.id)]
                .help[1],
              value: helpData.examples,
            },
          ]);

        await interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
      } else
        interaction.reply({
          ephemeral: true,
          content:
            client.i18n[await client.getLanguage(interaction.guild!.id)]
              .help[0],
        });
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

      await interaction.reply({
        ephemeral: true,
        content: `**${interaction.guild!.name}** prefix is \`/\` 
Commands list at https://probot.io/commands
Dashboard at https://probot.io/
Looking for support? https://discord.gg/probot`,
        components: [row],
      });
    }
  },
};
