// web/api/login.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../types";

const createLoginRouter = (client: CustomClient) => {
  const router = Router();

  // Define the login route
  router.get("*", (req: Request, res: Response) => {
    if (client.apiUser) res.redirect("/backend/api");
    else
      res.redirect(
        `https://discord.com/oauth2/authorize?client_id=${
          client.config.clientId
        }&redirect_uri=${encodeURIComponent(
          client.config.redirectUri
        )}&response_type=code&scope=identify+guilds+email`
      );
  });

  return router;
};

export default createLoginRouter;
