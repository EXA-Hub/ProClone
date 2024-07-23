// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../types";

const createStatusRouter = (client: CustomClient) => {
  const router = Router();

  router.get("*", (req: Request, res: Response) => {
    res.json({
      status: "API is running",
      clientInfo: client.user?.username,
      loged: client.apiUser
        ? "you are logged in " + client.apiUser.username
        : "you did not login",
    });
  });

  return router;
};

export default createStatusRouter;
