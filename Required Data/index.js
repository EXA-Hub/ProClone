const data = require("./primeCommands.json");
const fs = require("fs");

data.forEach((command) => {
  fs.writeFile(
    `./commands/${command.name}.js`,
    `// commands/${command.name}.js

module.exports = {
  data: ${JSON.stringify(
    {
      name: command.name,
      type: command.type,
      description: command.description,
      options: command.options ? command.options : [],
    },
    0,
    1
  )},
  async execute(interaction) {
    await interaction.reply("Working on that command!");
  },
};`,
    (err) => {
      if (err) console.error(err);
    }
  );
});
