// commands/roles.js

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
    name: "roles",
    type: 1,
    description: "Get a list of server roles and member counts.",
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
    args: String[]
  ) => {
    await interaction.deferReply();

    let msg = "```";
    for (const line of interaction
      .guild!.roles.cache.sort((a, b) => b.position - a.position)
      .map((role) => {
        let roleName = role.name.padEnd(20, " "); // Pad if shorter
        const memberCount = role.members.size;
        return `${roleName} ${memberCount} members`;
      })
      .join("\n")
      .split("\n")) {
      if ((msg + line).length > 2000 - 3) {
        // 3 for the closing ```
        await interaction.followUp(msg + "```");
        msg = "```";
      }
      msg += line + "\n";
    }
    msg += "```";

    await interaction.followUp(msg);
  },
};
