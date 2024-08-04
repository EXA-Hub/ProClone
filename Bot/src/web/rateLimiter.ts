import { Request, Response, NextFunction, Router } from "express";
import { CustomClient } from "../types"; // Ensure this import points to the correct location
import crypto from "crypto";
import rateLimit from "express-rate-limit";
import NodeCache from "node-cache";
import chalk from "chalk";

const cache = new NodeCache({ stdTTL: 600 }); // Cache TTL is 600 seconds

const rateLimiter = (client: CustomClient, app: Router) => {
  // Rate limiter configuration
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15 * 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    handler: async (req, res, next) => {
      const userId = client.apiUser?.id;
      if (userId) {
        await client.db.set(`bannedUsers.${userId}`, "API RATE LIMIT");
        return res.sendStatus(429); // Too Many Requests
      }
      next();
    },
  });

  app.use(limiter);

  app.use(async (req: Request, res: Response, next: NextFunction) => {
    const userId = client.apiUser?.id;

    if (await client.db.get(`bannedUsers.${userId}`))
      return res.sendStatus(403);

    const { method, path, query, body } = req;

    if (path.includes("cdn")) return next();

    const keyData = {
      method,
      path,
      query,
      body,
      userId: userId || "guest",
    };

    // Create a unique hash for the key
    const key = crypto
      .createHash("sha256")
      .update(JSON.stringify(keyData))
      .digest("hex");

    // Check if response is cached
    const cachedResponse = cache.get(key) as any;
    if (cachedResponse) {
      console.log(
        chalk.green(
          `[ CACHE RESPONSE ]: ${cachedResponse.method} ${keyData.method} ${keyData.path}`
        )
      );

      // Use the appropriate method to send the cached response
      switch (cachedResponse.method) {
        case "json":
          return res
            .status(cachedResponse.statusCode)
            .json(cachedResponse.body);
        case "jsonp":
          return res
            .status(cachedResponse.statusCode)
            .jsonp(cachedResponse.body);
        case "sendStatus":
          return res.sendStatus(cachedResponse.statusCode);
        default:
          return res
            .status(cachedResponse.statusCode)
            .send(cachedResponse.body);
      }
    }

    // Override res.send to cache the response
    const originalSend = res.send.bind(res);
    res.send = (body) => {
      if (!res.headersSent && res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(key, {
          method: "send",
          statusCode: res.statusCode,
          body,
        });
      }
      return originalSend(body);
    };

    // Override res.json to cache the response
    const originalJson = res.json.bind(res);
    res.json = (body) => {
      if (!res.headersSent && res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(key, {
          method: "json",
          statusCode: res.statusCode,
          body,
        });
      }
      return originalJson(body);
    };

    // Override res.jsonp to cache the response
    const originalJsonp = res.jsonp.bind(res);
    res.jsonp = (body) => {
      if (!res.headersSent && res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(key, {
          method: "jsonp",
          statusCode: res.statusCode,
          body,
        });
      }
      return originalJsonp(body);
    };

    // Override res.sendStatus to cache the response
    const originalSendStatus = res.sendStatus.bind(res);
    res.sendStatus = (statusCode) => {
      if (!res.headersSent && statusCode >= 200 && statusCode < 300) {
        cache.set(key, {
          method: "sendStatus",
          statusCode,
          body: null,
        });
      }
      return originalSendStatus(statusCode);
    };

    next();
  });
};

export default rateLimiter;
