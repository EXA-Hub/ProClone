// commands/rank.js

module.exports = {
  data: {
 "name": "rank",
 "type": 1,
 "description": "View your rank card or someone else's in the server.",
 "options": [
  {
   "type": 6,
   "name": "user",
   "description": "User to get rank of."
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};