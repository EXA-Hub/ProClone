// commands/roles.js

module.exports = {
  data: {
    name: "roles",
    type: 1,
    description: "Get a list of server roles and member counts.",
    options: [],
  },
  async execute(interaction) {
    await interaction.deferReply();

    let message = "```";
    for (const line of interaction.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => {
        let roleName = role.name.padEnd(20, " "); // Pad if shorter
        const memberCount = role.members.size;
        return `${roleName} ${memberCount} members`;
      })
      .join("\n")
      .split("\n")) {
      if ((message + line).length > 2000 - 3) {
        // 3 for the closing ```
        await interaction.followUp(message + "```");
        message = "```";
      }
      message += line + "\n";
    }
    message += "```";

    await interaction.followUp(message);
  },
};
