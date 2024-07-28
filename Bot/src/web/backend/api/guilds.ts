// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../types";
import axios from "axios";
import { hasPermission } from "../../../methods/permission";
import { PermissionFlagsBits } from "discord.js";

const createRouter = (client: CustomClient) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      // const guilds = response.data.filter((g: any) => g.owner); // This will contain the list of guilds
      const guilds = (
        await axios.get("https://discord.com/api/v10/users/@me/guilds", {
          headers: {
            Authorization: `Bearer ${client.apiUser.access_token}`,
          },
        })
      ).data
        .filter((g: any) =>
          hasPermission(g.permissions, PermissionFlagsBits.Administrator)
        )
        .map(({ id, name, icon }: any) => {
          return { id, name, icon };
        });

      res.json({
        username: client.apiUser.username,
        id: client.apiUser.id,
        avatar: client.apiUser.avatar,
        guilds,
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  return router;
};

export default createRouter;
