// commands/vkick.js

module.exports = {
  data: {
 "name": "vkick",
 "type": 1,
 "description": "Kicks a member from a voice channel",
 "options": [
  {
   "type": 6,
   "name": "user",
   "description": "The user to kick from voice channel.",
   "required": true
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};