// commands/ban.js

module.exports = {
  data: {
 "name": "ban",
 "type": 1,
 "description": "Bans a member.",
 "options": [
  {
   "type": 6,
   "name": "user",
   "description": "User to ban.",
   "required": true
  },
  {
   "type": 3,
   "name": "time",
   "description": "Time duration for the ban."
  },
  {
   "type": 3,
   "name": "reason",
   "description": "The reason of the ban."
  },
  {
   "type": 3,
   "name": "bulk",
   "description": "User to ban."
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};