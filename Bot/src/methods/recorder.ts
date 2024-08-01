import { Guild, Snowflake } from "discord.js";
import { v4 as uuidv4 } from "uuid";
import { CustomClient } from "../types";

export default function record(client: CustomClient) {
  // Function to load data for a guild
  async function loadGuildData(guildId: string) {
    return (await client.db.get(`logs.${guildId}`)) || [];
  }

  // Function to save data for a guild
  async function saveGuildData(guildId: string, data: any) {
    await client.db.set(`logs.${guildId}`, data);
  }

  // Function to get today's date in YYYY-MM-DD format
  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  // Initialize today's record if it doesn't exist
  async function initializeTodayRecord(guild: Guild) {
    const today = getTodayDate();
    const guildId = guild.id;
    let guildData = await loadGuildData(guildId);
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

  client.on("messageCreate", async (message) => {
    if (message.guild) {
      const today = getTodayDate();
      const guildId = message.guild.id;
      let guildData = await loadGuildData(guildId);
      const todayRecord = guildData.find(
        (record: any) => record.date === today
      );

      if (todayRecord) {
        todayRecord.messages += 1;
        saveGuildData(guildId, guildData);
      }
    }
  });

  client.on("guildMemberAdd", async (member) => {
    const today = getTodayDate();
    const guildId = member.guild.id;
    let guildData = await loadGuildData(guildId);
    const todayRecord = guildData.find((record: any) => record.date === today);

    if (todayRecord) {
      todayRecord.joined += 1;
      todayRecord.members = member.guild.memberCount;
      saveGuildData(guildId, guildData);
    }
  });

  client.on("guildMemberRemove", async (member) => {
    const today = getTodayDate();
    const guildId = member.guild.id;
    let guildData = await loadGuildData(guildId);
    const todayRecord = guildData.find((record: any) => record.date === today);

    if (todayRecord) {
      todayRecord.left += 1;
      todayRecord.members = member.guild.memberCount;
      saveGuildData(guildId, guildData);
    }
  });

  client.on(
    "xpUpdate",
    async (
      guildId: Snowflake,
      userId: Snowflake,
      xp: number,
      type: "textXP" | "voiceXP"
    ) => {
      const today = getTodayDate();
      let guildData = await loadGuildData(guildId);
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

  client.on(
    "credits",
    async (
      userId: Snowflake,
      Amount: number,
      Balance: number,
      User: Snowflake,
      Reason
    ) => {
      await client.db.push(`creditsLogs.${userId}`, {
        Date: Date.now(),
        Amount,
        Balance,
        User,
        Reason,
      });
    }
  );
}

// Function to retrieve data for the last number of days
export async function getGuildDataForDays(
  guildId: string,
  days: number,
  client: CustomClient
): Promise<[{}]> {
  const guildData = await client.db.get(`logs.${guildId}`);

  // Get the last number of days' data by slicing the array
  const startIndex = Math.max(0, guildData.length - days);
  return days ? guildData.slice(startIndex) : guildData;
}
