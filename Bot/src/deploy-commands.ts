import { config } from "dotenv";
import { REST } from "discord.js";
import fs from "fs";
import path from "path";

// Load environment variables from .env file
config();

// Define types for command data
interface CommandData {
  name: string;
  description: string;
  options?: any[]; // Replace with actual type for options if needed
}

// Function to load commands from files
const loadCommands = () => {
  const commands: CommandData[] = [];
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "commands"))
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`); // TypeScript may give a warning here due to dynamic import
    commands.push(command.data);
  }

  return commands;
};

// Initialize REST client for Discord API
const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_BOT_TOKEN!
);

// Main function to refresh application commands
const refreshCommands = async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    const commands =
      loadCommands().length !== 0
        ? loadCommands()
        : require("./commands/!commands.json");

    console.log(commands);

    await rest.put(`/applications/${process.env.CLIENT_ID}/commands`, {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error("Error refreshing application (/) commands:", error);
  }
};

// Call the main function
refreshCommands();
