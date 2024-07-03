require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const path = require("path");
const fs = require("fs");

const client = new Client({
  intents: [
    Object.values(GatewayIntentBits).reduce((acc, intent) => acc | intent, 0),
  ],
});

// Installing Simple DataBase
const {
  QuickDB,
  // MemoryDriver
} = require("quick.db");
// const memoryDriver = new MemoryDriver();
client.db = new QuickDB({
  filePath: "database/data.sqlite",
  // driver: memoryDriver,
});

/**
 * https://www.npmjs.com/package/quick.db#example-with-jsondriver
 *
 * For JSON Driver:
 * const { QuickDB, JSONDriver } = require("quick.db");
 * const jsonDriver = new JSONDriver();
 * const db = new QuickDB({ driver: jsonDriver });
 *
 *
 *
 * https://www.npmjs.com/package/quick.db#example-with-mongodriver
 *
 * For Mongo Driver:
 * const { QuickDB, MongoDriver } = require("quick.db");
 * (async () => {
 *     const mongoDriver = new MongoDriver("mongodb://localhost/quickdb");
 *
 *     await mongoDriver.connect();
 *
 *     const db = new QuickDB({ driver: mongoDriver });
 *     // Now you can use quick.db as normal
 *
 *     await db.set("userInfo", { difficulty: "Easy" });
 *     // -> { difficulty: 'Easy' }
 *
 *     await driver.close();
 *     // disconnect from the database
 * })();
 *
 */

// Create a collection (map) to store commands
client.i8 = process.env.I8PHPSESSID;
client.commands = new Collection();

const i18n = {};
const languageFiles = fs.readdirSync(path.join(__dirname, "languages"));
languageFiles.forEach((file) => {
  const lang = path.parse(file).name;
  i18n[lang] = require(path.join(__dirname, "languages", file));
});

client.i18n = i18n;

// Function to get the language for a user
client.getLanguage = async (guildId) => {
  // Retrieve the language setting from the database
  const lang = await client.db.get(`guild_${guildId}_language`);
  return lang || "en"; // Default to 'en' if no language is set
};

/**
 * To Get Language Message:
 * interaction.client.i18n[await interaction.client.getLanguage(interaction.guild.id)].text;
 * returns text object from language file
 */

// Read command files
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Load event files
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

eventFiles.forEach((file) => {
  const filePath = path.join(__dirname, "events", file);
  const event = require(filePath);
  const eventName = path.parse(file).name;

  if (event.once) {
    client.once(eventName, (...args) => event.execute(...args, client));
  } else {
    client.on(eventName, (...args) => event.execute(...args, client));
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
