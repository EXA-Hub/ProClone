// commands/temp.js

module.exports = {
  data: {
 "name": "temp",
 "type": 1,
 "description": "Makes a temporary channel.",
 "options": [
  {
   "type": 1,
   "name": "on",
   "description": "turn on temporary channels."
  },
  {
   "type": 1,
   "name": "off",
   "description": "turn off temporary channels."
  },
  {
   "type": 1,
   "name": "time",
   "description": "Time to delete the temp channel in seconds.",
   "options": [
    {
     "type": 4,
     "name": "seconds",
     "description": "Time the voice channel.",
     "required": true
    }
   ]
  },
  {
   "type": 1,
   "name": "max",
   "description": "Max channels user can create at the same time.",
   "options": [
    {
     "type": 4,
     "name": "number",
     "description": "Max channels users can create, 0 is unlimited.",
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