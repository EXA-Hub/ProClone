// commands/title.js

module.exports = {
  data: {
    name: "title",
    type: 1,
    description: "Changes your title in `/profile` command.",
    options: [
      {
        type: 3,
        name: "new_title",
        description: "The new title to set.",
      },
    ],
  },
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};
