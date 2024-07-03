// commands/rep.js

module.exports = {
  data: {
 "name": "rep",
 "type": 1,
 "description": "Award someone a reputation point.",
 "options": [
  {
   "type": 6,
   "name": "user",
   "description": "rep_user_description",
   "required": true
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};