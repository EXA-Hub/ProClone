const { PermissionsBitField, BaseInteraction } = require("discord.js");

module.exports = {
  data: {
    name: "untimeout",
    type: 1,
    description: "Remove timeout from a user",
    options: [
      {
        type: 6,
        name: "user",
        description: "The user to untimeout",
        required: true,
      },
    ],
  },
  /**
   * @param {BaseInteraction} interaction
   * @returns
   */
  async execute(interaction) {
    const lang = await interaction.client.getLanguage(interaction.guild.id);
    const i18n = interaction.client.i18n[lang].timeout;

    const member = interaction.options.getMember("user");

    if (!member) {
      return interaction.reply({
        content: i18n["invalidMember"],
      });
    }

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    ) {
      return interaction.reply({
        content: i18n["noPermission"].replace("{user}", member.user.username),
      });
    }

    if (member.user.id === interaction.client.user.id) {
      return interaction.reply({
        content: i18n["unoPermission"].replace("{user}", member.user.username),
      });
    }

    if (!member.isCommunicationDisabled()) {
      return interaction.reply({
        content: i18n["notTimedOut"],
      });
    }

    try {
      await member.timeout(null);

      await interaction.reply({
        content: i18n["untimeoutSuccess"].replace(
          "{user}",
          member.user.username
        ),
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: i18n["untimeoutError"],
      });
    }
  },
};
