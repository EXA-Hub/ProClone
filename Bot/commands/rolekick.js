// commands/rolekick.js

module.exports = {
  data: {
    name: "rolekick",
    type: 1,
    description: "Kicks all members with a specific role",
    options: [
      {
        type: 8,
        name: "role",
        description: "Specify the role to kick all members who have it.",
        required: true,
      },
      {
        type: 8,
        name: "exclude",
        description: "Exclude members with this role from being kicked",
      },
    ],
  },
  async execute(interaction) {
    const lang = await interaction.client.getLanguage(interaction.guild.id);
    const i18n = interaction.client.i18n[lang].rolekick;

    const roleToKickId = interaction.options.getRole("role").id;
    const excludeRoleId = interaction.options.getRole("exclude")?.id;

    await interaction.deferReply();

    // Fetch all members with the role to kick
    let membersToKick = interaction.guild.members.cache.filter(
      (member) =>
        member.roles.cache.has(roleToKickId) &&
        member.id !== interaction.client.user.id
    );

    // Exclude members with the exclude role if specified
    if (excludeRoleId) {
      membersToKick = membersToKick.filter(
        (member) => !member.roles.cache.has(excludeRoleId)
      );
    }

    try {
      // Kick each member
      membersToKick.forEach(async (member) => {
        await member.kick(
          `Kicked due to rolekick command by ${interaction.user.tag}`
        );
      });

      await interaction.editReply({
        content: i18n["success"]
          .replace("{count}", membersToKick.size)
          .replace("{role}", interaction.options.getRole("role").name),
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: i18n["error"],
      });
    }
  },
};
