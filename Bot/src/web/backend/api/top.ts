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
      interface UserType {
        [userId: string]: number;
      }
      const usersData: UserType = (await client.db.get(type.toString())) || {};
      res.json(
        Object.entries(usersData)
          .filter(([key]) => /^\d{17,19}$/.test(key))
          .sort((a, b) => b[1] - a[1]) // Sort in descending order
          .slice(0, 100) // Get top 100 users
          .map(([userId, amount]) => {
            const user = client.users.cache.get(userId);
            // || (await client.users.fetch(userId));
            console.log({
              userName: user?.displayName,
              avatar: user?.displayAvatarURL(),
              member: false,
              amount,
            });
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
      res
        .status(500)
        .json({ error: "An error occurred while retrieving status" });
    }
  });

  return router;
};

export default createStatusRouter;
