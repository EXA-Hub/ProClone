// commands/roll.js
const { EmbedBuilder } = require("discord.js");

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
    name: "roll",
    type: 1,
    description: "rolling dice.",
    options: [
      {
        type: 3,
        name: "dice",
        description: "Picks a random number",
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
    args: String[]
  ) => {
    let max = 100; // Default max value for a standard dice roll

    const option = interaction
      ? interaction.options.get("dice")?.value
      : args[1];

    // fix args

    if (option) {
      if (isNaN(parseInt(`${option}`)))
        return {
          embeds: [
            new EmbedBuilder()
              .setDescription(
                client.i18n[await client.getLanguage(guild.id)].roll.replace(
                  "{option}",
                  `${option}`
                )
              )
              .setColor(14423100),
          ],
        };
    }

    return Math.floor(Math.random() * (max + 1));
  },
};
