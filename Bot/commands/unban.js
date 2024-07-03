// commands/unban.js

module.exports = {
  data: {
 "name": "unban",
 "type": 1,
 "description": "Unbans a member.",
 "options": [
  {
   "type": 3,
   "name": "input",
   "description": "User to remove the ban of.",
   "required": true
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};