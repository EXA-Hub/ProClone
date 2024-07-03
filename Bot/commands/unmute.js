// commands/unmute.js

module.exports = {
  data: {
 "name": "unmute",
 "type": 1,
 "description": "Unmutes a member.",
 "options": [
  {
   "type": 1,
   "name": "text",
   "description": "Unmutes a member from text channels",
   "options": [
    {
     "type": 6,
     "name": "user",
     "description": "The user to unmute.",
     "required": true
    }
   ]
  },
  {
   "type": 1,
   "name": "voice",
   "description": "Unmutes a member from voice channels",
   "options": [
    {
     "type": 6,
     "name": "user",
     "description": "The user to unmute.",
     "required": true
    }
   ]
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};