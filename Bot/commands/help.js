// commands/help.js

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

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
  async execute(interaction) {
    const cmd = interaction.options.getString("command");
    if (cmd) {
      const command = interaction.client.commands.get(cmd);
      if (command) {
        const embed = new EmbedBuilder()
          .setTitle("Command: " + command.data.name)
          .setDescription(command.data.description)
          .setFields([
            {
              name: interaction.client.i18n[
                await interaction.client.getLanguage(interaction.guild.id)
              ].help[1],
              value: `/${command.data.name}`,
            },
            {
              name: interaction.client.i18n[
                await interaction.client.getLanguage(interaction.guild.id)
              ].help[2],
              value: `/${command.data.name}`,
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
            interaction.client.i18n[
              await interaction.client.getLanguage(interaction.guild.id)
            ].help[0],
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
        content: `**${interaction.guild.name}** prefix is \`/\` 
Commands list at https://probot.io/commands
Dashboard at https://probot.io/
Looking for support? https://discord.gg/probot`,
        components: [row],
      });
    }
  },
};
