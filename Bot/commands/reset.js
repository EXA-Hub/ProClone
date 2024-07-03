// commands/reset.js

module.exports = {
  data: {
 "name": "reset",
 "type": 1,
 "description": "Reset text/voice/invites/limits xp points for all or specific member.",
 "options": [
  {
   "type": 3,
   "name": "type",
   "description": "Select the type of reset",
   "required": true,
   "choices": [
    {
     "name": "Text",
     "value": "text"
    },
    {
     "name": "Voice",
     "value": "voice"
    },
    {
     "name": "Invite",
     "value": "invites"
    },
    {
     "name": "Limits",
     "value": "limits"
    }
   ]
  },
  {
   "type": 9,
   "name": "target",
   "description": "The user to reset stats for.",
   "required": true
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};