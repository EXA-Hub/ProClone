// commands/clear.js

module.exports = {
  data: {
 "name": "clear",
 "type": 1,
 "description": "Cleans messages from a channel.",
 "options": [
  {
   "type": 4,
   "name": "number_of_messages",
   "description": "Number of messages to delete.",
   "required": true,
   "min_value": 1
  },
  {
   "type": 6,
   "name": "filter_by_user",
   "description": "Filter by user messages."
  },
  {
   "type": 8,
   "name": "filter_by_role",
   "description": "Filter by role messages."
  },
  {
   "type": 5,
   "name": "filter_by_bots",
   "description": "Filter by bots messages."
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};