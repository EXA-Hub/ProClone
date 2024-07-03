// commands/profile.js

module.exports = {
  data: {
 "name": "profile",
 "type": 1,
 "description": "View your or someone else's customizable personal global profile card.",
 "options": [
  {
   "type": 6,
   "name": "user",
   "description": "User to get profile of."
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};