import dotenv from "dotenv";
import { Client, GatewayIntentBits, Collection, Guild } from "discord.js";
import path from "path";
import fs from "fs";
import { QuickDB, JSONDriver } from "quick.db";

dotenv.config();

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
client.voiceTimes = new Collection();
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

/**
 *
 * TEST ZONE
 *
 *  * TEST ZONE
 *
 *  * TEST ZONE
 *
 *  * TEST ZONE
 *
 *  * TEST ZONE
 *
 *  * TEST ZONE
 *
 *  * TEST ZONE
 *
 * TEST ZONE!!
 *
 */

import { v4 as uuidv4 } from "uuid";
const GUILD_ID = "1153834735102070855";
const DATA_FILE_PATH = path.join(__dirname, "serverData.json");

let serverData: {
  id: any;
  guild: string;
  date: string;
  messages: number;
  members: any;
  joined: number;
  left: number;
}[] = [];

// Load existing data
if (fs.existsSync(DATA_FILE_PATH)) {
  serverData = JSON.parse(fs.readFileSync(DATA_FILE_PATH, "utf-8"));
}

// Function to save data to file
function saveData() {
  fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(serverData, null, 2));
}

// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

// Initialize today's record if it doesn't exist
function initializeTodayRecord(guild: Guild) {
  const today = getTodayDate();
  const todayRecord = serverData.find(
    (record) => record.date === today && record.guild === GUILD_ID
  );

  if (!todayRecord) {
    const newRecord = {
      id: uuidv4(),
      guild: GUILD_ID,
      date: today,
      messages: 0,
      members: guild.memberCount,
      joined: 0,
      left: 0,
    };
    serverData.push(newRecord);
    saveData();
  }
}

client.on("ready", async () => {
  const guild = client.guilds.cache.get(GUILD_ID);
  if (guild) {
    initializeTodayRecord(guild);
  }

  // Reset the record at midnight
  setInterval(() => {
    const guild = client.guilds.cache.get(GUILD_ID);
    if (guild) {
      initializeTodayRecord(guild);
    }
  }, 24 * 60 * 60 * 1000); // 24 hours
});

client.on("messageCreate", (message) => {
  if (message.guild && message.guild.id === GUILD_ID) {
    const today = getTodayDate();
    const todayRecord = serverData.find(
      (record) => record.date === today && record.guild === GUILD_ID
    );

    if (todayRecord) {
      todayRecord.messages += 1;
      saveData();
    }
  }
});

client.on("guildMemberAdd", (member) => {
  if (member.guild.id === GUILD_ID) {
    const today = getTodayDate();
    const todayRecord = serverData.find(
      (record) => record.date === today && record.guild === GUILD_ID
    );

    if (todayRecord) {
      todayRecord.joined += 1;
      todayRecord.members = member.guild.memberCount;
      saveData();
    }
  }
});

client.on("guildMemberRemove", (member) => {
  if (member.guild.id === GUILD_ID) {
    const today = getTodayDate();
    const todayRecord = serverData.find(
      (record) => record.date === today && record.guild === GUILD_ID
    );

    if (todayRecord) {
      todayRecord.left += 1;
      todayRecord.members = member.guild.memberCount;
      saveData();
    }
  }
});
