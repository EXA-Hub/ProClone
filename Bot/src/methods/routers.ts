// utils/loadRoutes.ts
import fs from "fs-extra";
import path from "path";
import { Router } from "express";
import { CustomClient } from "../types";
export const loadRoutes = async (
  baseDir: string,
  router: Router,
  basePath: string = "/",
  client: CustomClient
) => {
  const items = fs.readdirSync(baseDir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      await loadRoutes(
        path.join(baseDir, item.name),
        router,
        basePath + `${item.name}/`,
        client
      );
    } else if (item.isFile() && item.name.endsWith(".ts")) {
      const route =
        basePath + item.name.replace(".ts", "").replace("index", "");
      try {
        router.use(
          route,
          await require(path.join(baseDir, item.name)).default(client)
        );
        console.log(`✅ Routes - ${route}`);
      } catch (error) {
        console.log(`❌ Routes - ${route}`);
        console.error(error);
      }
    }
  }
};
