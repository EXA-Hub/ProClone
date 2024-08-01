// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../types";

const createStatusRouter = (client: CustomClient) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const { type } = req.query;
      if (!type || !["xp", "credits"].includes(type.toString()))
        return res.status(404).send("Invalid Top Type");
      res.json(
        Object.entries(
          ((await client.db.get(type.toString())) || {}) as {
            [userId: string]: number;
          }
        )
          .filter(([key]) => /^\d{17,19}$/.test(key))
          .sort((a, b) => b[1] - a[1]) // Sort in descending order
          .slice(0, 100) // Get top 100 users
          .map(async ([userId, amount]) => {
            let user = client.users.cache.get(userId);
            if (!user) user = await client.users.fetch(userId);
            return {
              userName: user?.displayName,
              avatar: user?.displayAvatarURL(),
              member: false,
              amount,
            };
          })
      );
    } catch (error) {
      console.error("api error:", error);
      res.status(500).json({ error: "An error occurred while retrieving top" });
    }
  });

  return router;
};

export default createStatusRouter;
