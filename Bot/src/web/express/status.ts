// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../types";

const createStatusRouter = (client: CustomClient) => {
  const router = Router();

  router.get("*", (req: Request, res: Response) => {
    // Use the `client` object as needed
    res.json({ status: "API is running", clientInfo: client.user?.username });
  });

  return router;
};

export default createStatusRouter;
