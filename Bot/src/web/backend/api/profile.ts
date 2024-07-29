// web/api/status.ts
import { Router, Request, Response } from "express";
import { CustomClient } from "../../../types";
import fs from "fs";
import path from "path";

const createStatusRouter = (client: CustomClient) => {
  const router = Router();

  const imageOwnershipCheck = async (
    image: string | Array<string>,
    folder: string
  ): Promise<boolean> => {
    // Retrieve owned images for the user from the database
    const ownedImages: Array<string> =
      (await client.db.get(`ownedImages.${client.apiUser.id}.${folder}`)) || [];

    // Check if the input is an array or a single string
    if (Array.isArray(image)) {
      // Check if the array length is less than 6 and if all images are owned
      return (
        image.length < 6 && image.every((img) => ownedImages.includes(img))
      );
    } else {
      // Check if the single image is owned
      return ownedImages.includes(image);
    }
  };

  router.get("/", async (req: Request, res: Response) => {
    try {
      const { type } = req.query;
      if (!type)
        return res.json(
          (await client.db.get(`profile.${client.apiUser.id}`)) || {
            image: null,
            badges: [],
            rank: null,
          }
        );
      else {
        type OwnedImages = {
          image?: string[];
          badges?: string[];
          rank?: string[];
        };

        interface Image {
          id: number;
          hidden: boolean;
          price: number;
          name: string;
          store: string;
          ownerid: null | boolean; // Adjusted to include boolean for owned images
          filename: string;
          category: string;
        }

        type Images = {
          image: Image[];
          badges: Image[];
          rank: Image[];
        };

        const ownedImages: OwnedImages = (await client.db.get(
          `ownedImages.${client.apiUser.id}`
        )) || { image: [], badges: [], rank: [] };

        const data: Images = require("../../../../../Images/imgs.json");

        // Ensure the type is a valid key of Images
        if (type.toString() in data) {
          const imageType = type as keyof Images;

          data[imageType].forEach((img) => {
            if (
              ownedImages[imageType] &&
              ownedImages[imageType].includes(img.filename)
            )
              img.ownerid = true;
            else img.ownerid = false;
          });

          res.send(data[imageType]);
        } else res.send(data);
      }
    } catch (error) {
      console.error("api error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving status" });
    }
  });

  // Handle PUT requests to update user profile
  router.put("/set", async (req: Request, res: Response) => {
    try {
      if (Object.entries(req.body).length === 0)
        return res.status(400).json({ error: "Request body cannot be empty" });

      const { image, badges, rank } = req.body;

      const validations = [
        { key: "image", value: image, type: "string", folder: "profile" },
        { key: "badges", value: badges, type: "array", folder: "badges" },
        { key: "rank", value: rank, type: "string", folder: "bg" },
      ] as const; // Use `as const` to infer literal types for the `type` property

      // Define type-specific handlers
      const handlers = {
        string: (value: string, folder: string) => {
          const filePath = path.join(
            __dirname,
            `../../../../../Images/${folder}`,
            value
          );
          return fs.existsSync(filePath);
        },
        array: (value: string[], folder: string) => {
          if (value.length > 5) return res.status(400).send("max badges is 5");
          return [...value].every((v) => {
            const filePath = path.join(
              __dirname,
              `../../../../../Images/${folder}`,
              v
            );
            return fs.existsSync(filePath);
          });
        },
      };

      // Validate data types
      for (const { key, value, type } of validations) {
        if (value !== undefined) {
          if (type === "string" && typeof value !== "string") {
            return res
              .status(400)
              .json({ error: `Invalid data type for ${key}` });
          } else if (type === "array" && !Array.isArray(value)) {
            return res
              .status(400)
              .json({ error: `Invalid data type for ${key}` });
          }
        }
      }

      // Create update promises with dynamic file existence check
      const updatePromises = validations
        .filter(({ value }) => value !== undefined)
        .map(async ({ key, value, folder, type }) => {
          const handler = handlers[type as keyof typeof handlers];
          if (handler) {
            const isValid = handler(value, folder);
            if (!isValid) {
              return Promise.reject(new Error(`Invalid ${key}`));
            }
          }

          if (await imageOwnershipCheck(value, folder))
            return await client.db.set(
              `profile.${client.apiUser.id}.${key}`,
              value
            );
          else
            return Promise.reject(
              new Error(`User does not own the image ${value}`)
            );
        });

      await Promise.all(updatePromises);
      res.sendStatus(200);
    } catch (error) {
      console.error("API error:", error);
      const errorMessage = (error as Error).message.includes(
        "User does not own the image"
      )
        ? { error: (error as Error).message }
        : { error: "An error occurred while updating the profile" };
      res.status(400).json(errorMessage);
    }
  });

  router.post("/buy", async (req: Request, res: Response) => {
    try {
      if (Object.keys(req.body).length === 0)
        return res.status(400).json({ error: "Request body cannot be empty" });

      const { imageKey, folder } = req.body;

      if (!imageKey || !folder)
        return res.status(400).json({ error: "Missing required parameters" });

      const images = require("../../../../../Images/imgs.json")[folder];

      if (!images) return res.status(400).json({ error: "Invalid folder" });

      // Normalize imageKey to an array
      const imageKeys = Array.isArray(imageKey) ? imageKey : [imageKey];

      // Find images and user credits in parallel
      const userId = client.apiUser.id; // Assuming client.apiUser.id is the logged-in user ID
      const userCredits = (await client.db.get(`credits.${userId}`)) || 0;

      // Check if all images exist and the user has enough credits
      const imageDetails = imageKeys.map((imgKey) =>
        images.find((img: any) => img.filename === imgKey)
      );
      const missingImages = imageDetails.filter((img) => !img);
      if (missingImages.length > 0)
        return res.status(400).json({ error: "Some images not found" });

      const totalPrice = imageDetails.reduce(
        (total, img) => total + img.price,
        0
      );
      if (totalPrice > userCredits)
        return res.status(402).json({ error: "Insufficient credits" });

      // Deduct the price in one call
      await client.db.sub(`credits.${userId}`, totalPrice);

      // Prepare images to push
      const imagesToPush = imageDetails.map((img) => img.filename);

      // Fetch existing images and merge with new images
      const existingImages =
        (await client.db.get(`ownedImages.${userId}.${folder}`)) || [];
      const updatedImages = [...new Set([...existingImages, ...imagesToPush])]; // Use Set to avoid duplicates

      // Save updated images
      await client.db.set(`ownedImages.${userId}.${folder}`, updatedImages);

      res.json({ success: "Images purchased successfully" });
    } catch (error) {
      console.error("API error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the purchase" });
    }
  });

  return router;
};

export default createStatusRouter;
