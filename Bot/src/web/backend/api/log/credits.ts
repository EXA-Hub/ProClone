import { Router, Request, Response } from "express";
import { CustomClient } from "../../../../types";

const creditsLogsRouter = (client: CustomClient) => {
  const router = Router();

  interface User {
    Date: number;
    Amount: number;
    Balance: number;
    User: string;
    Reason?: string;
  }

  router.get("/", async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page?.toString() || "0");

      const data: User[] =
        (await client.db.get(`creditsLogs.${client.apiUser.id}`)) || [];

      // Use Promise.all to handle asynchronous operations inside map
      const enrichedLogs = await Promise.all(
        data.slice(page * 20, (page + 1) * 20).map(async (user) => {
          const userData =
            client.users.cache.get(user.User) ||
            (await client.users.fetch(user.User));
          return {
            ...user,
            User: {
              username: userData.username,
              avatar: userData.displayAvatarURL(),
            },
          };
        })
      );

      res.json({ enrichedLogs, pages: Math.ceil(data.length / 20) });
    } catch (error) {
      console.error("api error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving credit logs" });
    }
  });

  return router;
};

export default creditsLogsRouter;
