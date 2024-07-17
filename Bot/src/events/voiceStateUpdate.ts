import { VoiceState } from "discord.js";
import { CustomClient } from "../types";
import { calculateLevelXP } from "../methods/lvlxp";

module.exports = {
  name: "voiceStateUpdate",
  async execute(
    oldState: VoiceState,
    newState: VoiceState,
    client: CustomClient
  ) {
    // Check if the user is a bot
    if (oldState.member?.user.bot || newState.member?.user.bot) return;

    // User joins a voice channel
    if (!oldState.channelId && newState.channelId)
      client.voiceTimes.set(newState.id, Date.now());

    // User leaves a voice channel
    if (oldState.channelId && !newState.channelId) {
      const joinedAt = client.voiceTimes.get(oldState.id);
      if (!joinedAt) return;
      client.voiceTimes.delete(oldState.id);

      const timeSpent = Date.now() - joinedAt; // time in milliseconds
      const xp = Math.floor(timeSpent / 1000); // convert to seconds for XP

      // Fetch user data from the database
      const userId = oldState.id;
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
        oldState.member?.user.send(
          client.i18n["en"].congrats
            .replace("{type.user}", `${oldState.member.user}`)
            .replace("{oldLevel}", oldLevel.toString())
            .replace("{level}", level.toString())
        );

      const guildId = oldState.guild.id;

      // Fetch guild-specific user data from the database
      const xpData_guild = (await client.db.get(`xp_${guildId}`)) || {};
      const oldUserXp_guild = xpData_guild[userId]?.voiceXP || 0;

      // Calculate guild-specific level and XP based on current XP
      const { level: oldLevel_guild } = calculateLevelXP(oldUserXp_guild);

      const newUserXp_guild = xp + oldUserXp_guild;

      // Update guild-specific user data
      xpData_guild[userId] = {
        ...xpData_guild[userId],
        voiceXP: newUserXp_guild,
      };
      await client.db.set(`xp_${guildId}`, xpData_guild);

      // Calculate guild-specific level and XP based on updated XP
      const { level: level_guild } = calculateLevelXP(newUserXp_guild);

      // Emit event for recorder
      client.emit("xpUpdate", guildId, userId, xp, "voiceXP");

      // Check if the user leveled up in the guild
      if (level_guild !== oldLevel_guild)
        // Send guild-specific congratulatory message
        oldState.member?.user.send(
          client.i18n["en"].congrats
            .replace("{type.user}", `${oldState.member?.user}`)
            .replace("{oldLevel}", oldLevel_guild.toString())
            .replace("{level}", level_guild.toString())
        );
    }
  },
};
