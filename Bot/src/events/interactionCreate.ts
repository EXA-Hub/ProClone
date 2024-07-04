import { Interaction } from "discord.js";
import { CustomClient } from "../types"; // Make sure to define and import CustomClient type

module.exports = {
  async execute(interaction: Interaction, client: CustomClient) {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
