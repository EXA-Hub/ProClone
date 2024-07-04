import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";

const data = {
  name: "colors",
  type: 1,
  description: "Lists you all the available colors.",
  options: [],
};

const execute = async (interaction: CommandInteraction): Promise<void> => {
  const client = interaction.client as CustomClient; // Cast client to CustomClient
  await interaction.reply("Working on that command!");
};

export { data, execute };
