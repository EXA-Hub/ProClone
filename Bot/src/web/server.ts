// api/server.ts
import express, { Request, Response, NextFunction, Router } from "express";
import { CustomClient } from "../types"; // Import your CustomClient type

import { loadRoutes } from "../methods/routers";
import path from "path";

const app = express();
const port = 3000; // Port for your API server

export default async (client: CustomClient) => {
  app.use(express.json()); // Middleware to parse JSON bodies

  const router = Router();
  await loadRoutes(path.join(__dirname, "express"), router, "/", client);
  app.use("/", router);

  // Error handling middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });

  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
};
