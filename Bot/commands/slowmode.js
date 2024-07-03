// commands/slowmode.js

module.exports = {
  data: {
 "name": "slowmode",
 "type": 1,
 "description": "Enable or disable slowmode on a channel.",
 "options": [
  {
   "type": 3,
   "name": "time",
   "description": "The time to set for slowmode channel."
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};