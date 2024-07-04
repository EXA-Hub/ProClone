import {
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { CustomClient } from "../types";

module.exports = {
  async execute(message: Message, client: CustomClient) {
    // Check if the message starts with your prefix and isn't sent by a bot
    const prefix = "#"; // Replace with your bot's prefix
    if (message.author.bot || !message.guild) return;

    if (!message.content.startsWith(prefix)) {
      // await client.db.push(`aliases_${message.guild.id}.${"credits"}`, "c");

      const aliases = (await client.db.get(
        `aliases_${message.guild.id}`
      )) as any;

      if (!aliases) return;

      const aliasKey = Object.keys(aliases).find((key) =>
        aliases[key].some((alias: string) => message.content.startsWith(alias))
      );

      if (!aliasKey) return;

      // Check if the command exists
      const command = client.commands.get(`${aliasKey}`);
      if (!command) return;

      message.reply(command.data.name);

      return;
    }

    // Split the message content to get the command
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    // Check if the command exists
    const command = client.commands.get(commandName);
    if (!command) return;

    // If the command exists, inform the user to use the slash command instead
    if (command.data.name !== "help") {
      const embed = new EmbedBuilder().setDescription(
        `**This command moved to Slash Commands \`/${commandName}\`.**`
      );

      // Create a button row
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setLabel("More Info")
          .setStyle(ButtonStyle.Link)
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
      // Create a button row
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setLabel("Add to your server")
          .setStyle(ButtonStyle.Link)
          .setURL(`https://discord.gg/qGtQqZFr`),
        new ButtonBuilder()
          .setLabel("ProBot Dashboard")
          .setStyle(ButtonStyle.Link)
          .setURL(`https://discord.gg/qGtQqZFr`)
      );
      try {
        await message.author.send({
          content: `**${message.guild?.name}** prefix is \`/\`
Commands list at https://probot.io/commands
Dashboard at https://probot.io/
Looking for support? https://discord.gg/probot`,
          components: [row],
        });
        await message.react("✅");
      } catch (error) {
        await message.react("❌");
      }
    }
  },
};
