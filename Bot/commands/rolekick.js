// commands/rolekick.js

module.exports = {
  data: {
 "name": "rolekick",
 "type": 1,
 "description": "Kicks all members with a specific role",
 "options": [
  {
   "type": 8,
   "name": "role",
   "description": "Specify the role to kick all members who have it.",
   "required": true
  },
  {
   "type": 8,
   "name": "exclude",
   "description": "Exclude member's with this role from being kicked"
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};