const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
  async execute(message, client) {
    // Check if the message starts with your prefix and isn't sent by a bot
    const prefix = "#"; // Replace with your bot's prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Split the message content to get the command
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Check if the command exists
    const command = client.commands.get(commandName);

    if (!command) return;

    // If the command exists, inform the user to use the slash command instead
    if (command.data.name !== "help") {
      const embed = new EmbedBuilder().setDescription(
        `**This command moved to Slash Commands \`/${commandName}\`.**`
      );

      // Create a button row
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("More Info")
          .setStyle(5)
          .setURL(
            `https://discord.com/blog/welcome-to-the-new-era-of-discord-apps?ref=zampx`
          )
      );

      await message.reply({
        embeds: [embed],
        components: [row],
        allowedMentions: { repliedUser: false },
      });
    } else if (command.data.name === "help") {
      await message.react("✅");
      // Create a button row
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
      await message.author.send({
        content: `**${message.guild.name}** prefix is \`/\` 
Commands list at https://probot.io/commands
Dashboard at https://probot.io/
Looking for support? https://discord.gg/probot`,
        components: [row],
      });
    }
  },
};
