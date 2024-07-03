// commands/setlevel.js

module.exports = {
  data: {
 "name": "setlevel",
 "type": 1,
 "description": "Sets the user's level",
 "options": [
  {
   "type": 6,
   "name": "user",
   "description": "The user for whom you want to set level",
   "required": true
  },
  {
   "type": 3,
   "name": "type",
   "description": "Type of level to set either text or voice",
   "required": true,
   "choices": [
    {
     "name": "Text",
     "value": "text"
    },
    {
     "name": "Voice",
     "value": "voice"
    }
   ]
  },
  {
   "type": 4,
   "name": "level",
   "description": "The level that you want to set to a user",
   "required": true
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};