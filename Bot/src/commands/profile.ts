// commands/profile.js

import { createCanvas, loadImage } from "canvas";
import { calculateLevelXP } from "../methods/lvlxp";
import { CustomClient } from "../types"; // Import CustomClient interface

import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
  TextChannel,
} from "discord.js";
import path from "path";
module.exports = {
  data: {
    name: "profile",
    type: 1,
    description:
      "View your or someone else's customizable personal global profile card.",
    options: [
      {
        type: 6,
        name: "user",
        description: "User to get profile of.",
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
    channel: TextChannel,
    args: string[]
  ) => {
    // Determine if the command is a slash command or message command
    const targetUser =
      (interaction
        ? interaction.options.get("user")?.user
        : message.mentions.users.first() || client.users.cache.get(args[1])) ||
      user;

    if (targetUser.bot)
      return client.i18n[await client.getLanguage(guild.id)].botRanks.replace(
        "{user}",
        user.username
      );

    interaction.deferReply();

    // Fetch user data and all users' XP data from the database
    const xpData = (await client.db.get("xp")) || {};
    const userId = targetUser.id;
    const userXp = xpData[userId] || 0;

    // Calculate the user's level and XP on that level
    const { level, xpOnLevel, totalXPForLevel } = calculateLevelXP(userXp);

    // Convert the XP data object to an array for sorting and ranking
    const userXpArray: { id: string; xp: number }[] = Object.entries(
      xpData
    ).map(([id, xp]) => ({ id, xp: xp as number }));

    // Sort users by XP in descending order
    userXpArray.sort((a, b) => (b.xp as number) - (a.xp as number));

    // Find the rank of the target user
    const rank = userXpArray.findIndex((user) => user.id === userId) + 1;

    const title =
      (await client.db.get("title_" + userId)) || "@zampx made that bot";
    const userBalance = (await client.db.get(`credits.${targetUser.id}`)) || 0;
    const { image, badges } = (await client.db.get(
      `profile.${targetUser.id}`
    )) || {
      image: null,
      badges: null,
    };

    const backgroundFile = image || "490.png";
    // Array of badge filenames
    const badgeFiles: string | any[] = badges || [];

    // Create canvas
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext("2d");

    ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Shadow color
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 3;

    // Approximate text height for vertical centering
    const textHeight = 20; // Adjust as needed based on font metrics

    // Load background image
    const background = await loadImage(
      path.join(
        __dirname,
        "..",
        "..",
        "..",
        "Images",
        "profile",
        backgroundFile
      )
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Draw dark background
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Dark background color
    ctx.fillRect(5, 5, canvas.width - 10, canvas.height - 10);

    // Load background image
    const avatar = await loadImage(
      targetUser.displayAvatarURL({ extension: "png", size: 128 })
    );
    ctx.drawImage(avatar, 10, 10);

    // Load background image
    const icon = await loadImage(
      guild.iconURL({ extension: "png", size: 32 }) ||
        require("../methods/avatar")
    );
    ctx.drawImage(icon, canvas.width - 42, 10, 32, 32);

    // Set up text properties
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.font = "bold " + textHeight + "px Arial";

    // Draw user data
    ctx.fillText(targetUser.username, 150, 40);
    ctx.fillText(`LVL: ${level}`, 150, 70);
    ctx.fillText(`XP: ${userXp}`, 150, 90);
    ctx.fillText(`Rank: #${rank}`, 150, 110);
    ctx.fillText(`Credits: $${userBalance}`, 150, 130);

    // Draw progress bar
    const barWidth = canvas.width - 20;
    const barHeight = 20;
    const barX = 10;
    const barY = 150;
    const progress = xpOnLevel / totalXPForLevel;

    ctx.fillStyle = "#d2cbf4";
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle = "#37393d";
    ctx.fillRect(barX, barY, barWidth * progress, barHeight);
    ctx.strokeStyle = "#d2cbf4";
    ctx.strokeRect(barX, barY, barWidth, barHeight);

    // Calculate text dimensions
    const text = `${xpOnLevel}/${totalXPForLevel}`;
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;

    // Center text horizontally and vertically
    const textX = barX + (barWidth - textWidth) / 2;
    const textY = barY + (barHeight + textMetrics.actualBoundingBoxAscent) / 2;

    const color = Math.floor(255 * progress);
    ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
    ctx.fillText(text, textX, textY);

    // Split title into lines if it's too long
    const maxWidth = canvas.width - 20; // Maximum width for each line of title
    const lines = splitTextIntoLines(ctx, title, maxWidth);

    // Draw each line of the title centered
    const lineHeight = textHeight + 5; // Adjust for line spacing
    const titleX = canvas.width / 2; // X position for the center of the title
    let titleY = 200; // Initial Y position for the first line
    ctx.fillStyle = "#ffffff";

    lines.forEach((line) => {
      const lineMetrics = ctx.measureText(line);
      const lineX = titleX - lineMetrics.width / 2;
      ctx.fillText(line, lineX, titleY);
      titleY += lineHeight; // Move Y position down for the next line
    });

    const badgeBox = {
      x: 10,
      y: titleY - lineHeight + 20,
      w: canvas.width - 20,
      h: canvas.height - 10 - (titleY - lineHeight + 20),
    };

    // Clip everything outside of badgeBox
    ctx.save(); // Save the current state of the context
    ctx.beginPath();
    ctx.rect(badgeBox.x, badgeBox.y, badgeBox.w, badgeBox.h);
    ctx.clip();

    // Calculate total width required for badges
    const totalBadgeWidth = 70 * badgeFiles.length - 10;

    // Calculate initial x position to center badges
    const initialX = (canvas.width - totalBadgeWidth) / 2;

    // Ensure we only load and draw up to 5 badges, adjust positioning and size
    for (let i = 0; i < Math.min(badgeFiles.length, 5); i++) {
      const badge = await loadImage(
        path.join(
          __dirname,
          "..",
          "..",
          "..",
          "Images",
          "badges",
          badgeFiles[i]
        )
      );
      ctx.drawImage(
        badge,
        initialX + i * 70, // Adjust horizontal positioning with 80px spacing
        badgeBox.y + badgeBox.h / 2 - 32.5, // Center vertically with 32.5px offset
        60, // Width
        60 // Height
      );
    }

    // Restore the previous context state to remove the clipping
    ctx.restore();

    // Convert canvas to buffer and send as an attachment
    const buffer = canvas.toBuffer();

    return interaction.followUp({
      files: [
        {
          attachment: buffer,
          name: "profile.png",
        },
      ],
    });
  },
};

// Function to split text into lines based on maximum width
function splitTextIntoLines(
  ctx: { measureText: (arg0: string) => { width: any } },
  text: string,
  maxWidth: number
) {
  const words = text.split("");
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + "" + word).width;
    if (width < maxWidth) {
      currentLine += "" + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  return lines;
}
