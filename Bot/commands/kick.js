// commands/kick.js

module.exports = {
  data: {
 "name": "kick",
 "type": 1,
 "description": "Kicks a member.",
 "options": [
  {
   "type": 6,
   "name": "user",
   "description": "The user to kick.",
   "required": true
  },
  {
   "type": 3,
   "name": "reason",
   "description": "Reason of the kick."
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};