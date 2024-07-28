import { Request, Response, NextFunction, Router } from "express";
import { CustomClient } from "../types"; // Ensure this import points to the correct location
import rateLimit from "express-rate-limit";
import apicache from "apicache";

// Initialize the cache
const cache = apicache.middleware;

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

    if (userId) {
      if (await client.db.get(`bannedUsers.${userId}`))
        return res.sendStatus(403);

      // Apply the apicache middleware for response caching
      cache("5 minutes")(req, res, next);
    } else next();
  });
};

export default rateLimiter;
