// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../types";
import { calculateLevelXP } from "../../../methods/lvlxp";

const createStatusRouter = (client: CustomClient) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      // Fetch user data and all users' XP data from the database
      const xpData = (await client.db.get("xp")) || {};
      const userId = client.apiUser.id;
      const userXp = xpData[userId] || 0;

      // Calculate the user's level and XP on that level
      const { level } = calculateLevelXP(userXp);

      // Convert the XP data object to an array for sorting and ranking
      const userXpArray: { id: string; xp: number }[] = Object.entries(
        xpData
      ).map(([id, xp]) => ({ id, xp: xp as number }));

      // Sort users by XP in descending order
      userXpArray.sort((a, b) => (b.xp as number) - (a.xp as number));

      // Find the rank of the target user
      const rank = userXpArray.findIndex((user) => user.id === userId) + 1;

      res.json({
        Credits: (await client.db.get(`credits.${client.apiUser.id}`)) || 0,
        level,
        rank,
        rep: 0,
      });
    } catch (error) {
      console.error("api error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving user" });
    }
  });

  return router;
};

export default createStatusRouter;
