// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../types";
import { hasPermission } from "../../../methods/permission";
import axios from "axios";
import { PermissionFlagsBits } from "discord.js";

const getUserGuilds = async (accessToken: string): Promise<any[]> => {
  try {
    const response = await axios.get(
      "https://discord.com/api/v10/users/@me/guilds",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data; // This will contain the list of guilds
  } catch (error) {
    console.error("Error fetching user guilds:", error);
    throw new Error("Failed to fetch user guilds");
  }
};

const createRouter = (client: CustomClient) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      res.json({
        guilds: await getUserGuilds(client.apiUser.access_token),
        //   .filter(
        //   (guild: any) =>
        //     hasPermission(guild.permissions, PermissionFlagsBits.Administrator)
        // ),
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  return router;
};

export default createRouter;
