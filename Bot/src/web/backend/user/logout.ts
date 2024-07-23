// web/api/login.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../types";

const createLoginRouter = (client: CustomClient) => {
  const router = Router();

  // Define the login route
  router.get("/", async (req: Request, res: Response) => {
    const cookie = req.cookies.userId;

    if (cookie) {
      try {
        await client.db.delete(`sessions.${cookie}`);
        res.clearCookie("userId"); // Clear the cookie
        res.status(200).json({ message: "Session successfully deleted." });
      } catch (error) {
        console.error("Error deleting session:", error);
        res.status(500).json({ error: "Failed to delete session." });
      }
    } else {
      res.status(400).json({ error: "No session found to delete." });
    }
  });

  return router;
};

export default createLoginRouter;
