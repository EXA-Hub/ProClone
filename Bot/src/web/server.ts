// api/server.ts
import express, { Request, Response, NextFunction, Router } from "express";
import { CustomClient } from "../types"; // Import your CustomClient type
import { loadRoutes } from "../methods/routers";
import cookieParser from "cookie-parser";
import path from "path";
import axios from "axios";
import fs from "fs-extra";
import cors from "cors";
import NodeCache from "node-cache";

const app = express();

// Initialize the cache with a TTL of 300 seconds (5 minutes)
const cache = new NodeCache({ stdTTL: 300 });

export default async (client: CustomClient) => {
  const port = client.config.port; // Port for your API server
  app.use(express.json()); // Middleware to parse JSON bodies
  app.use(cookieParser()); // Middleware to parse cookies

  if (client.config.CORS) {
    // Use the CORS middleware
    app.use(
      cors({
        origin: [
          "http://127.0.0.1:3000",
          "http://localhost:3000",
          "http://localhost:3001",
          "http://127.0.0.1:3001",
        ], // Allow requests from this origin
        credentials: true, // Allow credentials (cookies)
        // optionsSuccessStatus: 200,
      })
    );
  }

  if (client.config.logTraffic) {
    app.use((req, res, next) => {
      console.log(`🔗 - ${req.path}`);
      next();
    });
  } else console.log(`🔗 - STOPED LOG TRAFFIC ⭕`);

  const router = Router();

  router.use(async (req: Request, res: Response, next: NextFunction) => {
    if (!client.user)
      return res.status(503).json({
        message: "Bot is still caching up. Please try again later.",
      });
    client.apiUser = undefined;

    try {
      const sessionId = req.cookies.userId;
      if (sessionId) {
        // Retrieve session data from quick.db
        let sessionData = await client.db.get("sessions." + sessionId);
        if (sessionData) {
          const currentTime = Date.now();

          // Check if the access token has expired
          if (currentTime >= sessionData.expires_at) {
            console.log("token refresh");
            console.log(sessionData);
            // Access token is expired, attempt to refresh it
            const refreshTokenResponse = await axios.post(
              "https://discord.com/api/v10/oauth2/token",
              new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: sessionData.refresh_token,
                client_id: process.env.CLIENT_ID!, // Your Discord app client ID
                client_secret: process.env.CLIENT_SECRET!, // Your Discord app client secret
              }).toString(),
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );

            const newSessionData = refreshTokenResponse.data;
            sessionData = {
              ...sessionData,
              access_token: newSessionData.access_token,
              refresh_token: newSessionData.refresh_token,
              expires_at:
                currentTime + newSessionData.expires_in * 1000 - 30 * 60 * 1000, // Set the new expiry time
            };

            // Update session data in quick.db
            await client.db.set("sessions." + sessionId, sessionData);
            console.log(sessionData);
          }

          const fetchUserData = async (accessToken: string) => {
            // Check if the data is in the cache
            const cachedUser = cache.get(accessToken);
            if (cachedUser) return cachedUser;

            // Fetch user data from Discord API
            const response = await axios.get(
              "https://discord.com/api/v10/users/@me",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );

            // Cache the user data
            const userData = response.data;
            cache.set(accessToken, userData);
            return userData;
          };

          // Fetch user data from Discord using the access token from sessionData
          const userResponse = await fetchUserData(sessionData.access_token);

          client.apiUser = { ...userResponse, ...sessionData };
        }
      }
    } catch (error) {
      console.error("Error in user middleware:", error);
      res.status(500).json({ error: "Failed to authenticate user" });
    }

    if (!client.apiUser) {
      if (["api"].find((route) => req.path.includes(route)))
        return res.sendStatus(401);
    } else console.log(`᲼↳ From ${client.apiUser.username}`);

    next();
  });

  await loadRoutes(
    path.join(__dirname, "backend"),
    router,
    "/backend/",
    client
  );

  app.use("/", router);

  // Define the path to the images folder
  fs.readdirSync(path.resolve(__dirname, "../../../Images"), {
    withFileTypes: true,
  }).forEach((item) => {
    if (item.isDirectory()) {
      app.use(
        `/cdn/${item.name}`,
        express.static(path.join(item.parentPath, item.name))
      );
      console.log(`🔰 Host - /cdn/${item.name}`);
    }
  });

  // Error handling middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });

  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
};
