// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../../types";
import { PermissionFlagsBits } from "discord.js";
import path from "path";
import fs from "fs";
const createRouter = (client: CustomClient) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const guildId = req.query.guildId?.toString();

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
        langs: fs
          .readdirSync(
            path.join(__dirname, "..", "..", "..", "..", "languages")
          )
          .map((lang) => lang.split(".").shift()),
        lang: await client.getLanguage(guild.id),
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    try {
      const guildId = req.query.guildId?.toString();
      const lang = req.query.lang?.toString();

      if (
        !fs
          .readdirSync(
            path.join(__dirname, "..", "..", "..", "..", "languages")
          )
          .map((lang) => lang.split(".").shift())
          .includes(lang)
      ) {
        return res.status(400).json({ error: "Missing lang parameter" });
      }

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

      await client.db.set(`guild_${guildId}_language`, lang);
      res.sendStatus(200);
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  return router;
};

export default createRouter;
