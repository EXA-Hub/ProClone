import { Router, Request, Response } from "express";
import { CustomClient } from "../../../../types";

const creditsLogsRouter = (client: CustomClient) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page?.toString() || "0");
      res.json(
        ((await client.db.get(`creditsLogs.${client.apiUser.id}`)) as []).slice(
          page * 20,
          20 + page * 20
        )
      );
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
