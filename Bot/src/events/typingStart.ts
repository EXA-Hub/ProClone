import { Typing } from "discord.js";
import { CustomClient } from "../types";
import { calculateLevelXP } from "../methods/lvlxp";

module.exports = {
  async execute(type: Typing, client: CustomClient) {
    if (!type.inGuild() || type.user.bot) return;
    if (await client.db.get(`bannedUsers.${type.user.id}`)) return;

    const collected = await type.channel.awaitMessages({
      filter: (m) => m.author.id === type.user.id,
      /**
       * time makes a limit to the collector not xp
       * maxProcessed handles first message only
       *
       * يعني اذا شخص ارسل بعد انتهاء الوقت
       * مش هيحصل نقاط خبرة
       * وبكدا اقصى نقاط خبرة هي 10 ثوان
       *
       * اذا فعلت حد اقصى للرسائل
       * البوت بيستقبل فقط اول رسالة
       * يعني اذا شخصين او اكثر يتكلموا
       * ولا واحد يحصل نقاط
       *
       * تفعيله لتجارب السبام فقط
       *
       * خلي الخيارات زي ما هي لافضل حل
       *
       */
      // --------------------+
      //   maxProcessed: 1,  |
      //   time: 10000,      |
      // --------------------+
      max: 1,
    });

    const time = collected.first()?.createdTimestamp;
    if (!time) return;

    const xp = Math.floor((time - type.startedTimestamp) / 1000);
    if (!xp) return;

    // Fetch user data from the database
    const userId = type.user.id;
    const xpData = (await client.db.get(`xp`)) || {};
    const oldUserXp = xpData[userId] || 0;

    // Calculate level and XP on that level based on current XP
    const { level: oldLevel } = calculateLevelXP(oldUserXp);

    const newUserXp = xp + oldUserXp;

    // Save updated user data to the database
    await client.db.set(`xp.${userId}`, newUserXp);

    // Calculate level and XP on that level based on updated XP
    const { level } = calculateLevelXP(newUserXp);

    // Check if the user leveled up
    if (level !== oldLevel)
      // Send congratulatory message
      type.user.send(
        client.i18n["en"].congrats
          .replace("{type.user}", `${type.user}`)
          .replace("{oldLevel}", oldLevel.toString())
          .replace("{level}", level.toString())
      );

    // Fetch user data from the database
    const guildId = type.guild.id;
    const xpData_guild = (await client.db.get(`xp_${guildId}`)) || {};
    const oldUserXp_guild = xpData_guild[userId]?.textXP || 0;

    // Calculate level and XP on that level based on current XP
    const { level: oldLevel_guild } = calculateLevelXP(oldUserXp_guild);

    const newUserXp_guild = xp + oldUserXp_guild;

    // Update user data
    xpData_guild[userId] = { ...xpData_guild[userId], textXP: newUserXp_guild };
    await client.db.set(`xp_${guildId}`, xpData_guild);

    // Calculate level and XP on that level based on updated XP
    const { level: level_guild } = calculateLevelXP(newUserXp_guild);

    // Emit event for recorder
    client.emit("xpUpdate", guildId, userId, xp, "textXP");

    // Check if the user leveled up
    if (level_guild !== oldLevel_guild)
      // Send congratulatory message
      type.user.send(
        client.i18n["en"].congrats
          .replace("{type.user}", `${type.user}`)
          .replace("{oldLevel}", oldLevel_guild.toString())
          .replace("{level}", level_guild.toString())
      );
  },
};
