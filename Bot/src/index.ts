import dotenv from "dotenv";

import { Client, GatewayIntentBits, Collection } from "discord.js";
import { QuickDB, JSONDriver, MongoDriver, MemoryDriver } from "quick.db";
import path from "path";
import fs from "fs";

import record from "./methods/recorder";
import api from "./web/server";

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

(async () => {
  client.i8 = `${process.env.I8PHPSESSID}`;
  client.config = require("../config.json");
  client.db = new QuickDB({
    driver:
      client.config.db === "json"
        ? new JSONDriver("./src/database/data.json")
        : client.config.db === "mongo"
        ? await new MongoDriver("mongodb://localhost:27017/zampx").connect()
        : client.config.db === "memory"
        ? new MemoryDriver()
        : undefined,
    filePath: "./src/database/data.sqlite",
  });
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

  const commandFiles: string[] =
    [] || // test api
    fs
      .readdirSync(path.join(__dirname, "commands"))
      .filter((file) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    try {
      const command = require(path.join(__dirname, "commands", `${file}`));
      client.commands.set(command.data.name, command);
      console.log(`🔧 Commands - /${command.data.name}`);
    } catch (error) {
      console.log(`❌ Commands - ${file}`);
      console.error(error);
    }
  }

  client.cmdsec = require("./database/sections.json");

  const eventFiles: string[] =
    [] || // test api
    fs
      .readdirSync(path.join(__dirname, "events"))
      .filter((file) => file.endsWith(".ts"));

  eventFiles.forEach((file) => {
    try {
      const event = require(path.join(__dirname, "events", file));
      const eventName = path.parse(file).name;

      if (event.once) {
        client.once(eventName, (...args: any[]) =>
          event.execute(...args, client)
        );
      } else {
        client.on(eventName, (...args: any[]) =>
          event.execute(...args, client)
        );
      }

      console.log(`📂 Events - ${file.split(".")[0]}`);
    } catch (error) {
      console.log(`❌ Events - ${file}`);
      console.error(error);
    }
  });

  try {
    record(client);
    console.log(`👁 Recorder Started`);
  } catch (error) {
    console.log(`❌ Recorder Failed`);
    console.error(error);
  }

  try {
    api(client);
    console.log(`🌐 WEB Started`);
  } catch (error) {
    console.log(`❌ WEB Failed`);
    console.error(error);
  }

  client.login(process.env.DISCORD_BOT_TOKEN);
})();

//! Handle Errors -------------------------------
client.on("error", async (error) => {
  console.error(`[Index] `.padEnd(100, "-"));
  console.error(error.name + ` : ` + error.message);
  console.error(error.stack);
});

process.on("uncaughtException", async (error, origin) => {
  console.error(`[Index] uncaughtException `.padEnd(100, "-"));
  console.error(error.name);
  console.error(error.message);
});

process.on("uncaughtExceptionMonitor", async (error, origin) => {
  console.error(`[Index] uncaughtExceptionMonitor `.padEnd(100, "-"));
  console.error(error.name);
  console.error(error.message);
});

process.on("unhandledRejection", async (reason, promise) => {
  console.error(`[Index] unhandledRejection `.padEnd(100, "-"));
  console.error(reason);
});

process.on("warning", async (warn) => {
  console.error(`[Index] warning `.padEnd(100, "-"));
  console.error(warn.name);
  console.error(warn.message);
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
