// commands/warn.js

module.exports = {
  data: {
 "name": "warn",
 "type": 1,
 "description": "⚠ Warns a member.",
 "options": [
  {
   "type": 6,
   "name": "user",
   "description": "The user to warn.",
   "required": true
  },
  {
   "type": 3,
   "name": "reason",
   "description": "Reason of the warn."
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};