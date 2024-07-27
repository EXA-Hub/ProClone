// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../types";
import { PermissionFlagsBits } from "discord.js";
import { getGuildDataForDays } from "../../../methods/recorder";

const createRouter = (client: CustomClient) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const guildId = req.query.guildId as string;

      if (!guildId) {
        return res.status(400).json({ error: "Missing guildId parameter" });
      }

      // Fetch the guild from the client cache
      const guild = client.guilds.cache.get(guildId);

      if (!guild) {
        return res.status(404).json({ error: "Guild not found" });
      }

      // Fetch member from the guild
      const member = guild.members.cache.get(client.user?.id ?? "");

      if (!member) {
        return res.status(404).json({ error: "Member not found in the guild" });
      }

      // Check if the member has Administrator permissions
      if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
        return res.status(403).json({
          error: "You do not have the required permissions for this guild",
        });
      }

      res.json({
        guild: {
          name: guild.name,
          icon: guild.iconURL(),
          lang: await client.getLanguage(guild.id),
        },
        logs: await getGuildDataForDays(guild.id, 7, client),
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  return router;
};

export default createRouter;
