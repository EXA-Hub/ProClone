import {
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} from "discord.js";
import { CustomClient, commandData } from "../types";

module.exports = {
  async execute(message: Message, client: CustomClient) {
    if (message.author.bot) return;
    if (!message.guild) return;

    // Added all commands to aliases fo test Only!?

    // let commandsJSal: { [key: string]: string[] } = {};
    // client.commands.forEach(async ({ data }) => {
    //   commandsJSal[`${data.name}`] = [data.name];
    // });
    // await client.db.set(`aliases_${message.guild!.id}`, commandsJSal);

    const aliases = (await client.db.get(`aliases_${message.guild.id}`)) as any;
    if (aliases) {
      const aliasKey = Object.keys(aliases).find((key) =>
        aliases[key].some(
          (alias: string) => message.content.split(" ").shift() === alias
        )
      );

      if (aliasKey) {
        // Check if the command exists
        const command = client.commands.get(aliasKey);

        if (!command) return message.reply(`> !? ---> \`${aliasKey}\``);

        if (
          await (async () => {
            for (const key of Object.keys(client.cmdsec)) {
              if (
                client.cmdsec[key].includes(command.data.name) &&
                (await client.db.get(key + message.guild!.id))
              )
                return true;
            }
            return false;
          })()
        )
          return;

        // await client.db.set(
        //   `commands_${message.guild.id}.${command.data.name}`,
        //   {
        //     enabled: false,
        //     disabledChannels: [],
        //     enabledChannels: [],
        //     disabledRoles: [],
        //     enabledRoles: [],
        //     deleteCommandMsg: false,
        //     deleteReply: false,
        //     deleteWithInvocation: false,
        //   }
        // );

        const cmData = (await client.db.get(
          `commands_${message.guild.id}.${command.data.name}`
        )) as commandData;

        if (
          cmData &&
          (cmData.enabled ||
            (cmData.disabledChannels &&
              cmData.disabledChannels.length > 0 &&
              cmData.disabledChannels.includes(message.channel!.id)) ||
            (cmData.enabledChannels &&
              cmData.enabledChannels.length > 0 &&
              !cmData.enabledChannels.includes(message.channel!.id)) ||
            (cmData.disabledRoles &&
              cmData.disabledRoles.length > 0 &&
              cmData.disabledRoles.some((role) =>
                message.member!.roles.cache.has(role)
              )) ||
            (cmData.enabledRoles &&
              cmData.enabledRoles.length > 0 &&
              !cmData.enabledRoles.some((role) =>
                message.member!.roles.cache.has(role)
              )))
        )
          return;

        const requiredPermissions = command.data.default_member_permissions;
        if (requiredPermissions) {
          // Find the permission name from the PermissionFlagsBits object
          const permissionName = Object.keys(PermissionFlagsBits).find(
            (key) =>
              PermissionFlagsBits[key as keyof typeof PermissionFlagsBits] ===
              BigInt(requiredPermissions)
          );
          if (message.member && message.member.permissions && permissionName) {
            const missingPermissions = message.member.permissions.missing([
              PermissionFlagsBits[
                permissionName as keyof typeof PermissionFlagsBits
              ],
            ]);
            if (missingPermissions.length > 0) {
              return await message.reply({
                content: client.i18n[
                  await client.getLanguage(message.guild!.id)
                ].userPermissionRequired.replace(
                  "{permission}",
                  permissionName
                ),
              });
            }
          }
        }

        const response = await command.execute(
          client,
          undefined,
          message,
          message.guild,
          message.member!,
          message.author,
          message.channel,
          message.content.split(" ")
        );

        if (response)
          message.reply(
            typeof response === "string"
              ? {
                  content: response,
                  allowedMentions: { repliedUser: false },
                }
              : { ...response, allowedMentions: { repliedUser: false } }
          );
        return;
      }
    }

    const prefix = "#"; // Replace with your bot's prefix
    if (!message.content.startsWith(prefix)) return;

    // Split the message content to get the command
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    // Check if the command exists
    const command = client.commands.get(commandName);
    if (!command) return message.reply(`> !? ---> \`${commandName}\``);

    // If the command exists, inform the user to use the slash command instead
    if (command.data.name !== "help") {
      await message.reply({
        embeds: [
          new EmbedBuilder().setDescription(
            `**This command moved to Slash Commands \`/${commandName}\`.**`
          ),
        ],
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
              .setLabel("More Info")
              .setStyle(ButtonStyle.Link)
              .setURL(
                `https://discord.com/blog/welcome-to-the-new-era-of-discord-apps?ref=zampx`
              )
          ),
        ],
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
