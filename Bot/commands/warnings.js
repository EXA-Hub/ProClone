// commands/warnings.js

module.exports = {
  data: {
 "name": "warnings",
 "type": 1,
 "description": "Get a list of warnings for the server or a user.",
 "options": [
  {
   "type": 6,
   "name": "user",
   "description": "The user to get warnings for."
  },
  {
   "type": 4,
   "name": "page",
   "description": "Choose a page number"
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};