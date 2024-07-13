import { CustomClient } from "../types"; // Import CustomClient interface
import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
  Role,
} from "discord.js";
import { createCanvas, loadImage } from "canvas";
import path from "path";

module.exports = {
  data: {
    name: "colors",
    type: 1,
    description: "Lists all available color roles.",
    options: [],
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
    if (interaction) await interaction.deferReply();

    // Fetch all roles from the guild
    const roles = guild.roles.cache;

    // Filter roles that have names consisting only of numbers
    const colorRoles = roles
      .filter((role) => /^\d+$/.test(role.name))
      .sort((a, b) => parseInt(a.name) - parseInt(b.name));

    // Calculate canvas dimensions based on number of roles
    const maxRolesPerRow = 11;
    const roleSize = 40; // Reduced circle size
    const padding = 5; // Reduced padding
    const rows = Math.ceil(colorRoles.size / maxRolesPerRow);
    const canvasWidth = maxRolesPerRow * (roleSize + padding) - padding + 20; // Extra padding
    const canvasHeight = rows * (roleSize + padding) + 50; // Adjusted height for text

    // Create a canvas
    const canvas = createCanvas(canvasWidth + 100, canvasHeight + 100);
    const ctx = canvas.getContext("2d");

    const backgroundImg = 0;

    if (backgroundImg) {
      // Load background image
      const background = await loadImage(
        path.join(__dirname, "..", "..", "..", "Images", "bg", "12.png")
      );
      // Draw background image
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      // Set background transparency with a little black shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Black shadow
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Set font properties
    ctx.font = "bold 20px Arial"; // Increased font size for role names
    ctx.fillStyle = "#ffffff"; // White text color
    ctx.textAlign = "center";

    // Write title
    ctx.fillText("Available Color Roles", canvas.width / 2, 30 + 50);

    // Display color roles in columns and rows
    let x = 10;
    let y = 100;

    for (const role of colorRoles.values()) {
      // Draw role color circle
      ctx.fillStyle = role.hexColor;
      ctx.beginPath();
      const cornerRadius = 10; // Adjust the corner radius as needed
      if (cornerRadius) {
        ctx.moveTo(x + cornerRadius, y);
        ctx.lineTo(x + roleSize - cornerRadius, y);
        ctx.quadraticCurveTo(x + roleSize, y, x + roleSize, y + cornerRadius);
        ctx.lineTo(x + roleSize, y + roleSize - cornerRadius);
        ctx.quadraticCurveTo(
          x + roleSize,
          y + roleSize,
          x + roleSize - cornerRadius,
          y + roleSize
        );
        ctx.lineTo(x + cornerRadius, y + roleSize);
        ctx.quadraticCurveTo(x, y + roleSize, x, y + roleSize - cornerRadius);
        ctx.lineTo(x, y + cornerRadius);
        ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
      } else
        ctx.arc(
          x + roleSize / 2,
          y + roleSize / 2,
          roleSize / 2,
          0,
          Math.PI * 2
        );
      ctx.closePath();
      ctx.fill();

      // Draw role name
      ctx.fillStyle = "#ffffff"; // White text color
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Shadow color
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 3;
      ctx.fillText(role.name, x + roleSize / 2, y + (roleSize + 15) / 2); // Adjust y for vertical position

      // Move to the next position
      x += roleSize + padding;
      if (x + roleSize > canvas.width - 10) {
        x = 10;
        y += roleSize + padding; // Adjust y to include space for text
      }
    }

    // Convert canvas to image buffer
    const buffer = canvas.toBuffer("image/png");

    const reply = {
      files: [
        {
          attachment: buffer,
          name: "color_roles.png",
        },
      ],
    };

    // Send the image as a message attachment
    return interaction ? interaction.followUp(reply) : reply;
  },
};
