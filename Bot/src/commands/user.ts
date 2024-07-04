// commands/user.js
const { EmbedBuilder } = require("discord.js");
import { CustomClient } from "../types"; // Import CustomClient interface
import { CommandInteraction } from "discord.js";
module.exports = {
  data: {
    name: "user",
    type: 1,
    description:
      "Displays information about yourself or another user, such as ID and join date.",
    options: [
      {
        type: 6,
        name: "user",
        description: "User to get information about.",
      },
    ],
  },
  execute: async (interaction: CommandInteraction): Promise<void> => {
    const client = interaction.client as CustomClient; // Cast client to CustomClient
    const user = interaction.options.get("user")?.user || interaction.user;
    const member = await interaction.guild!.members.fetch(user.id);

    const embed = new EmbedBuilder()
      .setColor(8974168)
      .addFields(
        {
          name: client.i18n[await client.getLanguage(interaction.guild!.id)]
            .user[0],
          value: `**<t:${Math.floor(user.createdTimestamp / 1000)}:R>**`,
          inline: true,
        },
        {
          name: client.i18n[await client.getLanguage(interaction.guild!.id)]
            .user[1],
          value: `**<t:${Math.floor(member.joinedTimestamp! / 1000)}:R>**`,
          inline: true,
        }
      )
      .setThumbnail(user.displayAvatarURL({ size: 1024 }))
      .setFooter({
        text: user.username,
        iconURL: user.displayAvatarURL({ size: 1024 }),
      });

    await interaction.reply({ embeds: [embed] });
  },
};
