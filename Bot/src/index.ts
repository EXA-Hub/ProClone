import dotenv from "dotenv";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import path from "path";
import fs from "fs";
import { QuickDB, JSONDriver } from "quick.db";

dotenv.config();

// Define CustomClient interface extending Client
// interface CustomClient extends Client {
//   cmdsec: any;
//   i8: string;
//   db: QuickDB;
//   commands: Collection<any, any>;
//   i18n: Record<string, any>;
//   getLanguage(guildId: string): Promise<string>;
// }

import { CustomClient } from "./types";

// Create a new instance of CustomClient
const client: CustomClient = new Client({
  intents: [
    Object.values(GatewayIntentBits).reduce(
      (acc, intent) => acc | (intent as number),
      0
    ),
  ],
}) as CustomClient; // Assert to CustomClient type

client.i8 = `${process.env.I8PHPSESSID}`;

client.db = new QuickDB({ driver: new JSONDriver("./src/database/data.json") });

client.deletedMessages = new Collection();
client.commands = new Collection();

const i18n: Record<string, any> = {};
const languageFiles = fs.readdirSync(path.join(__dirname, "languages"));
languageFiles.forEach((file) => {
  i18n[path.parse(file).name] = require(path.join(
    __dirname,
    "languages",
    file
  )).default;
});
client.i18n = i18n;

client.getLanguage = async (guildId: string) => {
  const lang = await client.db.get(`guild_${guildId}_language`);
  return lang || "en";
};

const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands"))
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, "commands", `${file}`));
  client.commands.set(command.data.name, command);
}

client.cmdsec = require("./database/sections.json");

const eventFiles = fs
  .readdirSync(path.join(__dirname, "events"))
  .filter((file) => file.endsWith(".ts"));

eventFiles.forEach((file) => {
  const event = require(path.join(__dirname, "events", file));
  const eventName = path.parse(file).name;

  if (event.once) {
    client.once(eventName, (...args: any[]) => event.execute(...args, client));
  } else {
    client.on(eventName, (...args: any[]) => event.execute(...args, client));
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);

// Handle unhandled promise rejections globally
process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
  // Optionally, you can notify developers or take other actions as necessary
});

// Handle uncaught exceptions globally
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception occurred:", error);
  // Optionally, you can handle or log the error, perform cleanup, and gracefully exit
  // process.exit(1); // Exit the process with a non-zero status code (1 indicates an error)
});

// Handle warnings globally (optional)
process.on("warning", (warning) => {
  console.warn("Warning occurred:", warning);
  // Optionally, you can log the warning or take other actions as necessary
});
