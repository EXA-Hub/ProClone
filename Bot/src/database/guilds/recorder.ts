import fs from "fs";
import path from "path";
import { Guild, Snowflake } from "discord.js";
import { v4 as uuidv4 } from "uuid";
import { CustomClient } from "../../types";

export default function record(client: CustomClient) {
  const DATA_DIR_PATH = path.join(__dirname, "guildData");

  // Ensure the data directory exists
  if (!fs.existsSync(DATA_DIR_PATH)) {
    fs.mkdirSync(DATA_DIR_PATH);
  }

  // Function to get the data file path for a guild
  function getDataFilePath(guildId: string) {
    return path.join(DATA_DIR_PATH, `${guildId}.json`);
  }

  // Function to load data for a guild
  function loadGuildData(guildId: string) {
    const filePath = getDataFilePath(guildId);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    return [];
  }

  // Function to save data for a guild
  function saveGuildData(guildId: string, data: any) {
    const filePath = getDataFilePath(guildId);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  // Function to get today's date in YYYY-MM-DD format
  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  // Initialize today's record if it doesn't exist
  function initializeTodayRecord(guild: Guild) {
    const today = getTodayDate();
    const guildId = guild.id;
    let guildData = loadGuildData(guildId);
    const todayRecord = guildData.find((record: any) => record.date === today);

    if (!todayRecord) {
      const newRecord = {
        id: uuidv4(),
        guild: guildId,
        date: today,
        messages: 0,
        members: guild.memberCount,
        joined: 0,
        left: 0,
        xp: {},
      };
      guildData.push(newRecord);
      saveGuildData(guildId, guildData);
    }
  }

  client.on("ready", async () => {
    client.guilds.cache.forEach((guild) => {
      //   console.log(guild.name);
      initializeTodayRecord(guild);
    });

    // Reset the record at midnight
    setInterval(() => {
      client.guilds.cache.forEach((guild) => {
        initializeTodayRecord(guild);
      });
    }, 24 * 60 * 60 * 1000); // 24 hours
  });

  client.on("messageCreate", (message) => {
    if (message.guild) {
      const today = getTodayDate();
      const guildId = message.guild.id;
      let guildData = loadGuildData(guildId);
      const todayRecord = guildData.find(
        (record: any) => record.date === today
      );

      if (todayRecord) {
        todayRecord.messages += 1;
        saveGuildData(guildId, guildData);
      }
    }
  });

  client.on("guildMemberAdd", (member) => {
    const today = getTodayDate();
    const guildId = member.guild.id;
    let guildData = loadGuildData(guildId);
    const todayRecord = guildData.find((record: any) => record.date === today);

    if (todayRecord) {
      todayRecord.joined += 1;
      todayRecord.members = member.guild.memberCount;
      saveGuildData(guildId, guildData);
    }
  });

  client.on("guildMemberRemove", (member) => {
    const today = getTodayDate();
    const guildId = member.guild.id;
    let guildData = loadGuildData(guildId);
    const todayRecord = guildData.find((record: any) => record.date === today);

    if (todayRecord) {
      todayRecord.left += 1;
      todayRecord.members = member.guild.memberCount;
      saveGuildData(guildId, guildData);
    }
  });

  client.on(
    "xpUpdate",
    (
      guildId: Snowflake,
      userId: Snowflake,
      xp: number,
      type: "textXP" | "voiceXP"
    ) => {
      const today = getTodayDate();
      let guildData = loadGuildData(guildId);
      const todayRecord = guildData.find(
        (record: any) => record.date === today
      );

      if (todayRecord) {
        if (!todayRecord.xp[userId]) {
          todayRecord.xp[userId] = {
            textXP: 0,
            voiceXP: 0,
          };
        }
        todayRecord.xp[userId][type] += xp;
        saveGuildData(guildId, guildData);
      }
    }
  );
}

// Function to retrieve data for the last number of days
export function getGuildDataForDays(guildId: string, days: number): [{}] {
  const DATA_DIR_PATH = path.join(__dirname, "guildData");
  const getDataFilePath = (guildId: string) =>
    path.join(DATA_DIR_PATH, `${guildId}.json`);

  // Load data for the guild
  function loadGuildData(guildId: string) {
    const filePath = getDataFilePath(guildId);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    return [];
  }

  const guildData = loadGuildData(guildId);

  // Get the last number of days' data by slicing the array
  const startIndex = Math.max(0, guildData.length - days);
  return days ? guildData.slice(startIndex) : guildData;
}
