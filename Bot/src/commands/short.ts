const { URL } = require("url");
const https = require("https");
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
    channel: Channel
  ) => {
    const url = interaction.options.get("url")?.value as String;

    if (!isValidURL(url) || url.includes("i8.ae")) return;

    try {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("url", url);

        const options = {
          method: "POST",
          headers: {
            ...formData.getHeaders(),
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-language": "ar,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
            "sec-ch-ua":
              '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            cookie: "PHPSESSID=" + client.i8,
            Referer: "https://i8.ae/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
        };

        const req = https.request(
          "https://i8.ae/shorten",
          options,
          (res: any) => {
            let data = "";

            res.on("data", (chunk: any) => {
              data += chunk;
            });

            res.on("end", () => {
              if (res.statusCode !== 200) {
                return reject(
                  new Error(`HTTP error! status: ${res.statusCode}`)
                );
              }

              try {
                const json = JSON.parse(data);
                if (json.error) {
                  return reject(new Error(`API error! message: ${json.error}`));
                }
                return `${json.data.shorturl}`;
                resolve(json);
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
