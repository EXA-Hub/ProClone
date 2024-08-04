// commands/rank.js

import { CanvasRenderingContext2D, createCanvas, loadImage } from "canvas";
import { calculateLevelXP } from "../methods/lvlxp";
import { CustomClient } from "../types"; // Import CustomClient interface

import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  User,
  TextChannel,
} from "discord.js";
import path from "path";
module.exports = {
  data: {
    name: "rank",
    type: 1,
    description: "View your rank card or someone else's in the server.",
    options: [
      {
        type: 6,
        name: "user",
        description: "User to get rank of.",
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

    await interaction.deferReply();

    // Fetch user data and all users' XP data from the database
    const xpData = (await client.db.get(`xp_${guild.id}`)) || {};
    const userData: {
      textXP: number;
      voiceXP: number;
    } = xpData[targetUser.id] || {
      textXP: 0,
      voiceXP: 0,
    };

    // Calculate levels and XP for both voice and text categories
    const textLevelData = calculateLevelXP(userData.textXP);
    const voiceLevelData = calculateLevelXP(userData.voiceXP);

    // Sort users by textXP and find the text rank
    const textRank =
      Object.entries(xpData)
        .sort((a: any, b: any) => b[1].textXP - a[1].textXP)
        .findIndex((u: any) => u[0] === targetUser.id) + 1;

    // Sort users by voiceXP and find the voice rank
    const voiceRank =
      Object.entries(xpData)
        .sort((a: any, b: any) => b[1].voiceXP - a[1].voiceXP)
        .findIndex((u: any) => u[0] === targetUser.id) + 1;

    const { rank } = (await client.db.get(`profile.${targetUser.id}`)) || {
      rank: null,
    };

    const backgroundFile = rank || "17.png";

    // Prepare rank card canvas
    const canvas = createCanvas(500, 210);
    const ctx = canvas.getContext("2d");

    ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Shadow color
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 3;

    // Load background image
    const background = await loadImage(
      path.join(__dirname, "..", "..", "..", "Images", "bg", backgroundFile)
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = "rgba(35, 39, 42, 0.4)";
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Load and draw user avatar
    const avatar = await loadImage(
      targetUser.displayAvatarURL({ extension: "png" })
    );
    ctx.drawImage(avatar, 20, 20, 64, 64);

    // Load and draw guild icon
    const guildIcon = await loadImage(
      guild.iconURL({ extension: "png" }) || require("../methods/avatar")
    );
    ctx.drawImage(guildIcon, canvas.width - 84, 20, 64, 64);

    // Draw username
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `bold 30px Arial`;
    const usernameText = `${targetUser.username}`;
    const usernameMetrics = ctx.measureText(usernameText);
    const usernameX = (canvas.width - usernameMetrics.width) / 2;
    ctx.fillText(usernameText, usernameX, 50);

    ctx.font = "16px Arial";
    // Draw Text XP Progress Bar
    const textBarY = 100;
    drawProgressBar(
      ctx,
      20,
      textBarY,
      canvas.width - 40,
      20,
      textLevelData.xpOnLevel,
      textLevelData.totalXPForLevel,
      `Text XP: ${userData.textXP}`,
      `Level: ${textLevelData.level}`,
      `Rank: #${textRank}`
    );

    // Draw Voice XP Progress Bar
    const voiceBarY = 150;
    drawProgressBar(
      ctx,
      20,
      voiceBarY,
      canvas.width - 40,
      20,
      voiceLevelData.xpOnLevel,
      voiceLevelData.totalXPForLevel,
      `Voice XP: ${userData.voiceXP}`,
      `Level: ${voiceLevelData.level}`,
      `Rank: #${voiceRank}`
    );

    // Convert canvas to buffer and send as an attachment
    const buffer = canvas.toBuffer();

    // Function to draw progress bar
    function drawProgressBar(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      xpOnLevel: number,
      totalXPForLevel: number,
      xpText: string,
      levelText: string,
      rankText: string
    ) {
      const progress = xpOnLevel / totalXPForLevel;

      ctx.fillStyle = "#d2cbf4";
      ctx.fillRect(x, y, width, height);
      ctx.fillStyle = "#37393d";
      ctx.fillRect(x, y, width * progress, height);
      ctx.strokeStyle = "#d2cbf4";
      ctx.strokeRect(x, y, width, height);

      // Calculate text dimensions
      const text = `${xpOnLevel}/${totalXPForLevel}`;
      const textMetrics = ctx.measureText(text);
      const textWidth = textMetrics.width;

      // Center text horizontally and vertically
      const textX = x + (width - textWidth) / 2;
      const textY = y + (height + textMetrics.actualBoundingBoxAscent) / 2;

      const color = Math.floor(255 * progress);
      ctx.fillStyle = `rgb(${color}, ${color}, ${color})`;
      ctx.fillText(text, textX, textY);

      // Draw XP, level, and rank info under the bar
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(xpText, x, y + height + 20);
      ctx.fillText(
        levelText,
        x + width / 2 - ctx.measureText(levelText).width / 2,
        y + height + 20
      );
      ctx.fillText(
        rankText,
        x + width - ctx.measureText(rankText).width,
        y + height + 20
      );
    }

    return await interaction.editReply({
      files: [
        {
          attachment: buffer,
          name: "profile.png",
        },
      ],
    });
  },
};
