import { URL } from "url";
import https from "https";
const FormData = require("form-data");

function isValidURL(str: String) {
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
}

import { CustomClient } from "../types"; // Import CustomClient interface

import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
module.exports = {
  data: {
    name: "short",
    type: 1,
    description: "Shortens a URL.",
    options: [
      {
        type: 3,
        name: "url",
        description: "Please enter a URL",
        required: true,
      },
    ],
  },
  execute: async (
    client: CustomClient,
    interaction: CommandInteraction,
    message: Message,
    guild: Guild,
    member: GuildMember,
    user: User,
    channel: Channel,
    args: string[]
  ) => {
    const myurl = interaction
      ? (interaction.options.get("url")?.value?.toString() as String)
      : args.filter((str, ind) => ind !== 0).join(" ");

    if (!isValidURL(myurl) || myurl.includes("i8.ae")) return;
    try {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("url", myurl);

        const req = https.request(
          "https://i8.ae/shorten",
          {
            method: "POST",
            headers: {
              ...formData.getHeaders(),
              cookie: "PHPSESSID=" + client.i8,
              Referer: "https://i8.ae/",
            },
          },
          (res: any) => {
            let data = "";

            res.on("data", (chunk: any) => {
              data += chunk;
            });
            res.on("end", () => {
              if (res.statusCode !== 200)
                return reject(
                  new Error(`HTTP error! status: ${res.statusCode}`)
                );
              try {
                const json = JSON.parse(data);
                if (json.error)
                  return reject(new Error(`API error! message: ${json.error}`));
                resolve(json.data.shorturl);
              } catch (error) {
                reject(new Error("Failed to parse response JSON"));
              }
            });
          }
        );
        req.on("error", (error: any) => {
          reject(error);
        });
        formData.pipe(req);
      });
    } catch (error) {
      console.error("Error shortening URL:", error);
      return "There was an error shortening the URL.";
    }
  },
};
