import {
  GuildMemberRoleManager,
  Interaction,
  PermissionFlagsBits,
  VoiceChannel,
  GuildChannel,
  TextChannel,
  Message,
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
} from "discord.js";
import { commandData, CustomClient } from "../types"; // Make sure to define and import CustomClient type

// const commandData = await client.db.get(
//   interaction.guild.id + command.data.name
// );
/**
default  {
    "disabledChannels": [],
    "enabledChannels": [],
    "disabledRoles": [],
    "enabledRoles": [],
    "skipRoles": []
    "deleteCommandMsg": false,
    "deleteReply": false,
    "deletewithinvocation": false,
    "enabled": false,
  }
 */

module.exports = {
  async execute(interaction: CommandInteraction, client: CustomClient) {
    const ban = await client.db.get(`bannedUsers.${interaction.user.id}`);
    if (ban) return interaction.reply({ ephemeral: true, content: ban });

    if (!interaction.guild)
      return interaction.reply({
        content: client.i18n["en"].disabled.serverOnly,
        ephemeral: true,
      });
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);

    if (!command)
      return interaction.reply(`> !? ---> \`${interaction.commandName}\``);

    if (
      await (async () => {
        for (const key of Object.keys(client.cmdsec)) {
          if (
            client.cmdsec[key].includes(command.data.name) &&
            (await client.db.get(key + interaction.guild!.id))
          )
            return true;
        }
        return false;
      })()
    )
      return await interaction.reply({
        content:
          client.i18n[await client.getLanguage(interaction.guild!.id)].disabled
            .module,
        ephemeral: true,
      });

    // await client.db.set(
    //   `commands_${interaction.guild.id}.${command.data.name}.${command.data.name}`,
    //   {
    //     enabled: false,
    //     disabledChannels: [],
    //     enabledChannels: ["1153868013657927720"],
    //     disabledRoles: [],
    //     enabledRoles: [],
    //     deleteCommandMsg: false,
    //     deleteReply: false,
    //     deleteWithInvocation: false,
    //   }
    // );

    const cmData = (await client.db.get(
      `commands_${interaction.guild.id}.${command.data.name}`
    )) as commandData;

    if (cmData) {
      if (cmData.enabled) {
        return interaction.reply({
          content:
            client.i18n[await client.getLanguage(interaction.guild!.id)]
              .disabled.command,
          ephemeral: true,
        });
      }

      // Fetch the interaction channel and its parent (category)
      const { parentId } = interaction.channel as
        | TextChannel
        | GuildChannel
        | VoiceChannel;

      if (
        (cmData.disabledChannels &&
          cmData.disabledChannels.length > 0 &&
          (cmData.disabledChannels.includes(interaction.channel!.id) ||
            (parentId && cmData.disabledChannels.includes(parentId)))) ||
        (cmData.enabledChannels &&
          cmData.enabledChannels.length > 0 &&
          !(
            cmData.enabledChannels.includes(interaction.channel!.id) ||
            (parentId && cmData.enabledChannels.includes(parentId))
          ))
      )
        return interaction.reply({
          content:
            client.i18n[await client.getLanguage(interaction.guild!.id)]
              .disabled.channel + `<#${interaction.channelId}>`,
          ephemeral: true,
        });

      if (
        (cmData.disabledRoles &&
          cmData.disabledRoles.length > 0 &&
          cmData.disabledRoles.some((role) =>
            (interaction.member!.roles as GuildMemberRoleManager).cache.has(
              role
            )
          )) ||
        (cmData.enabledRoles &&
          cmData.enabledRoles.length > 0 &&
          !cmData.enabledRoles.some((role) =>
            (interaction.member!.roles as GuildMemberRoleManager).cache.has(
              role
            )
          ))
      ) {
        return interaction.reply({
          content:
            client.i18n[await client.getLanguage(interaction.guild!.id)]
              .disabled.role,
          ephemeral: true,
        });
      }
    }

    // If no conditions were met to return early, the command continues execution.

    const requiredPermissions = command.data.default_member_permissions;
    if (requiredPermissions) {
      // Find the permission name from the PermissionFlagsBits object
      const permissionName = Object.keys(PermissionFlagsBits).find(
        (key) =>
          PermissionFlagsBits[key as keyof typeof PermissionFlagsBits] ===
          BigInt(requiredPermissions)
      );
      if (interaction.memberPermissions && permissionName) {
        const missingPermissions = interaction.memberPermissions.missing([
          PermissionFlagsBits[
            permissionName as keyof typeof PermissionFlagsBits
          ],
        ]);
        if (missingPermissions.length > 0) {
          return interaction.reply({
            content: client.i18n[
              await client.getLanguage(interaction.guild!.id)
            ].userPermissionRequired.replace("{permission}", permissionName),
            ephemeral: true,
          });
        }
      }
    }

    try {
      const helpData = require("../database/help.json").find(
        (c: { [x: string]: any }) => c[command.data.name]
      );

      const response =
        (await command.execute(
          client,
          interaction,
          undefined,
          interaction.guild,
          interaction.member!,
          interaction.user,
          interaction.channel!,
          undefined
        )) ||
        (await interaction.reply({
          allowedMentions: { repliedUser: false },
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setTitle("Command: " + command.data.name)
              .setDescription(command.data.description as string)
              .setFields([
                {
                  name: client.i18n[
                    await client.getLanguage(interaction.guild.id)
                  ].help[2],
                  value: helpData.usage,
                },
                {
                  name: client.i18n[
                    await client.getLanguage(interaction.guild.id)
                  ].help[1],
                  value: helpData.examples,
                },
              ]),
          ],
        }));

      if (response) {
        const msg =
          response instanceof Message || response instanceof InteractionResponse
            ? response
            : await interaction.reply(
                typeof response === "string"
                  ? {
                      content: response,
                      allowedMentions: { repliedUser: false },
                    }
                  : { ...response, allowedMentions: { repliedUser: false } }
              );

        if (cmData && cmData.deleteReply) {
          setTimeout(() => {
            msg.delete().catch(console.error);
          }, 5 * 1000);
        }
      }
    } catch (error) {
      console.error(error);
      return await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
