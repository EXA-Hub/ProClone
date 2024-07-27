// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../types";
import axios from "axios";
import NodeCache from "node-cache";
import { hasPermission } from "../../../methods/permission";
import { PermissionFlagsBits } from "discord.js";

const cache = new NodeCache({ stdTTL: 5 * 60 }); // Cache expires in 5 minutes

const getUserGuilds = async (accessToken: string): Promise<any[]> => {
  try {
    // Check if the guilds data is in the cache
    const cachedGuilds = cache.get<any[]>(accessToken);
    if (cachedGuilds) return cachedGuilds;

    const response = await axios.get(
      "https://discord.com/api/v10/users/@me/guilds",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // const guilds = response.data.filter((g: any) => g.owner); // This will contain the list of guilds
    const guilds = response.data.filter((g: any) =>
      hasPermission(g.permissions, PermissionFlagsBits.Administrator)
    );
    cache.set(accessToken, guilds);
    return guilds;
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
        username: client.apiUser.username,
        id: client.apiUser.id,
        avatar: client.apiUser.avatar,
        guilds: (await getUserGuilds(client.apiUser.access_token)).map(
          ({ id, name, icon }: any) => {
            return { id, name, icon };
          }
        ),
      });
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).json({ error: "Failed to process request" });
    }
  });

  return router;
};

export default createRouter;
