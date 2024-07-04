import { Interaction, Message, PermissionFlagsBits } from "discord.js";
import { CustomClient } from "../types"; // Make sure to define and import CustomClient type

module.exports = {
  async execute(interaction: Interaction, client: CustomClient) {
    if (!interaction.isCommand() || !interaction.guild) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

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
          const lang = await client.getLanguage(interaction.guild!.id);
          const i18n = client.i18n[lang].userPermissionRequired;
          return await interaction.reply({
            content: i18n.replace("{permission}", permissionName),
            ephemeral: true,
          });
        }
      }
    }

    try {
      const response = await command.execute(
        client,
        interaction,
        undefined,
        interaction.guild,
        interaction.member,
        interaction.user,
        interaction.channel
      );
      if (response)
        await interaction.reply(
          typeof response === "string"
            ? {
                content: response,
                allowedMentions: { repliedUser: false },
              }
            : { ...response, allowedMentions: { repliedUser: false } }
        );
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
