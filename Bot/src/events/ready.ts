import { CustomClient } from "../types";

module.exports = {
  once: true, // Indicates this event should be registered with client.once
  execute(client: CustomClient) {
    console.log(`Logged in as ${client.user?.tag}!`);

    setInterval(async () => {
      const now = Date.now();
      const guilds = client.guilds.cache.map((guild) => guild.id);

      for (const guildId of guilds) {
        // bans
        const bans = await client.db.get(`bans.${guildId}`);
        if (!bans) continue;

        for (const [index, banInfo] of bans.entries()) {
          if (banInfo.timeEnd <= now) {
            // Remove the expired ban entry from the database
            await client.db.set(
              `bans.${guildId}`,
              bans.filter((_: any, i: any) => i !== index)
            );

            try {
              const guild = client.guilds.cache.get(guildId);
              if (!guild) continue;

              for (const userId of banInfo.ids) {
                await guild.members.unban(userId, "TIME ENDED.");
              }
            } catch (error) {
              console.error(
                `Failed to unban members for guild ${guildId}:`,
                error
              );
            }
          }
        }

        // mutes
        const mutes = await client.db.get(`mutes.${guildId}`);
        if (!mutes) continue;

        for (const [index, muteInfo] of mutes.entries()) {
          if (muteInfo.timeEnd <= now) {
            // Remove the expired ban entry from the database
            await client.db.set(
              `mutes.${guildId}`,
              mutes.filter((_: any, i: any) => i !== index)
            );

            try {
              const guild = client.guilds.cache.get(guildId);
              if (!guild) continue;

              for (const userId of muteInfo.ids) {
                const member = await guild.members.fetch(userId);
                if (muteInfo.text) {
                  const muteRole = guild.roles.cache.find(
                    (role) => role.name.toLowerCase() === "muted"
                  );
                  if (muteRole)
                    await member.roles.remove(muteRole, "Mute expired");
                } else member.voice.setMute(false, "TIME ENDED.");
              }
            } catch (error) {
              console.error(
                `Failed to unmute members for guild ${guildId}:`,
                error
              );
            }
          }
        }
      }
    }, 60 * 1000); // Check every minute

    // client.db.set("utility" + "1153834735102070855", true);

    // for (let x = 0; x < 10; x++) {
    //   client.guilds.cache
    //     .get("1153834735102070855")
    //     ?.roles.create({ name: x.toString() });
    // }

    // client.guilds.cache
    //   .get("1153834735102070855")
    //   ?.roles.cache.filter((r) => r.name === "22")
    //   .forEach((r) => r.delete());
  },
};
