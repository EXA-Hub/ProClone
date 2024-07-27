// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../types";

const createStatusRouter = (client: CustomClient) => {
  const router = Router();

  // Helper function to generate random credits between 2000 and 3000
  const getRandomCredits = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // This function calculates the time difference between now and the given date, in seconds
  const getTimeDifferenceInSeconds = (endTime: Date): number => {
    const now = new Date();
    const timeDiffInSeconds = Math.floor(
      (endTime.getTime() - now.getTime()) / 1000
    );
    return timeDiffInSeconds;
  };

  router.get("/", async (req: Request, res: Response) => {
    try {
      const userId = client.apiUser.id;
      const currentDate = new Date();

      // Retrieve the last claimed timestamp from the database
      const lastClaimTimestampKey = `credits.lastClaim.${userId}`;
      const lastClaimTimestamp: string | null = await client.db.get(
        lastClaimTimestampKey
      );

      if (lastClaimTimestamp) {
        const lastClaimDate = new Date(lastClaimTimestamp);

        // Calculate the next claim date by adding 24 hours to the last claim
        const nextClaimDate = new Date(
          lastClaimDate.getTime() + 24 * 60 * 60 * 1000
        );

        if (currentDate < nextClaimDate) {
          const secondsUntilNextClaim =
            getTimeDifferenceInSeconds(nextClaimDate);
          return res.status(400).json({
            error: "You have already claimed your daily credits today.",
            nextClaimInSeconds: secondsUntilNextClaim,
          });
        }
      }

      // Generate random credits between 2000 and 3000
      const randomCredits = getRandomCredits(2000, 3000);

      // Update the user's credits in the database
      const creditsKey = `credits.${userId}`;
      const currentCredits = (await client.db.get(creditsKey)) || 0;
      const newCredits = currentCredits + randomCredits;
      await client.db.set(creditsKey, newCredits);

      // Update the last claimed timestamp to the current time
      await client.db.set(lastClaimTimestampKey, currentDate.toISOString());

      res.json({
        daily: randomCredits,
        db: newCredits,
      });
    } catch (error) {
      console.error("api error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving status" });
    }
  });

  return router;
};

export default createStatusRouter;
