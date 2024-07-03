// commands/moveme.js

module.exports = {
  data: {
 "name": "moveme",
 "type": 1,
 "description": "Moves you to another voice channel.",
 "options": [
  {
   "type": 3,
   "name": "input",
   "description": "Channel/user to be moved to.",
   "required": true
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};