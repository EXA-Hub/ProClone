import { Typing } from "discord.js";
import { CustomClient } from "../types";
import { calculateLevelXP } from "../methods/lvlxp";

module.exports = {
  async execute(type: Typing, client: CustomClient) {
    if (!type.inGuild() || type.user.bot) return;

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
        `🥳 **Congratulations**, ${type.user}!\nYou climbed from level **${oldLevel}** to **${level}**. Keep it up!`
      );
  },
};
