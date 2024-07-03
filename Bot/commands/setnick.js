// commands/setnick.js

const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: {
    name: "setnick",
    type: 1,
    description: "Changes a member's nickname.",
    options: [
      {
        type: 6,
        name: "user",
        description: "User to set nick for.",
        required: true,
      },
      {
        type: 3,
        name: "new_nick",
        description: "The new nickname.",
      },
    ],
  },
  async execute(interaction) {
    const lang = await interaction.client.getLanguage(interaction.guild.id);
    const i18n = interaction.client.i18n[lang].setnick;

    const member = interaction.options.getMember("user");
    const newNick = interaction.options.getString("new_nick");

    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageNicknames
      )
    ) {
      return interaction.reply({
        content: i18n["noPermission"],
      });
    }

    if (!member) {
      return interaction.reply({
        content: i18n["invalidMember"],
        ephemeral: true,
      });
    }

    try {
      await member.setNickname(newNick, `Changed by ${interaction.user.tag}`);

      await interaction.reply({
        content: i18n[newNick ? "nickSuccess" : "nickSuccessR"]
          .replace("{user}", member.user.tag)
          .replace("{newNick}", newNick),
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: i18n["nickError"],
        ephemeral: true,
      });
    }
  },
};
