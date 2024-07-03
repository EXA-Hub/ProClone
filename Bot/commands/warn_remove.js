// commands/warn_remove.js

module.exports = {
  data: {
 "name": "warn_remove",
 "type": 1,
 "description": "Removes warnings from all members or specific user.",
 "options": [
  {
   "type": 3,
   "name": "input",
   "description": "[Warn id] or [user] or [all] to remove all warnings",
   "required": true
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};