// web/api/login/callback.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../types";
import * as crypto from "crypto";
import axios from "axios";

// In-memory store for user data (test only)
const userDataStore: Record<string, any> = {};

const createCallbackRouter = (client: CustomClient) => {
  const router = Router();

  // Handle the callback from Discord after user authorizes
  router.get("/", async (req: Request, res: Response) => {
    const { code } = req.query;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Invalid code" });
    }

    try {
      if (
        !client.config ||
        !client.config.clientId ||
        !client.config.redirectUri
      ) {
        throw new Error("Client configuration is missing.");
      }

      const { CLIENT_SECRET } = process.env;
      if (!CLIENT_SECRET) {
        throw new Error("Client secret is missing.");
      }

      // Exchange the authorization code for an access token
      const tokenResponse = await axios.post(
        "https://discord.com/api/oauth2/token",
        new URLSearchParams({
          client_id: client.config.clientId,
          client_secret: CLIENT_SECRET,
          grant_type: "authorization_code",
          code,
          redirect_uri: client.config.redirectUri,
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      let tokenData = {
        ...tokenResponse.data,
        expires_at:
          Date.now() + tokenResponse.data.expires_in * 1000 - 30 * 60 * 1000, // Set the new expiry time
      };

      // Use a short-lived session ID or other secure means
      const sessionId = crypto.randomBytes(16).toString("hex");

      res.cookie("userId", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true if in production
        sameSite: "lax", // Adjust based on your requirements
      });

      await client.db.set("sessions." + sessionId, tokenData);

      res.redirect("/backend/api");
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "An error occurred while logging in" });
    }
  });

  return router;
};

export default createCallbackRouter;
