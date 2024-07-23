// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../../types";

const createStatusRouter = (client: CustomClient) => {
  const router = Router();

  router.get("*", async (req: Request, res: Response) => {
    res.json(
      (
        await client.guilds.cache
          .first()
          ?.channels.cache.filter((channel) => channel.type === 0)
          .first()
          ?.send(client.apiUser.username + " says hi from api")
      )?.toJSON()
    );
  });

  return router;
};

export default createStatusRouter;
