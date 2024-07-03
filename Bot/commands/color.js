// commands/color.js

module.exports = {
  data: {
 "name": "color",
 "type": 1,
 "description": "Changes your color in the server",
 "options": [
  {
   "type": 4,
   "name": "number_of_color",
   "description": "Number of the color given in the /colors commands",
   "required": true
  }
 ]
},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};