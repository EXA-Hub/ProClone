// commands/roles.js

import { commandData, CustomClient } from "../types"; // Import CustomClient interface

import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
  TextChannel,
  Snowflake,
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
    channel: TextChannel,
    args: string[]
  ) => {
    if (interaction) await interaction.deferReply();

    let repls: Snowflake[] = [];

    let msg = "```";
    for (const line of guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => {
        let roleName = role.name.padEnd(20, " "); // Pad if shorter
        const memberCount = role.members.size;
        return `${roleName} ${memberCount} members`;
      })
      .join("\n")
      .split("\n")) {
      if ((msg + line).length > 2000 - 3) {
        // 3 for the closing ```
        const reply = await (interaction
          ? await interaction.followUp(msg + "```")
          : channel.send(msg + "```"));
        repls.push(reply.id);
        msg = "```";
      }
      msg += line + "\n";
    }
    msg += "```";

    const lastReply = await (interaction
      ? await interaction.followUp(msg)
      : channel.send(msg));

    const cmData = (await client.db.get(
      `commands_${guild.id}.roles`
    )) as commandData;

    repls.push(lastReply.id);

    if (cmData && cmData.deleteReply) {
      const msgs = await Promise.all(
        repls.map(async (repl) => {
          return await channel.messages.fetch(repl);
        })
      );

      setTimeout(() => {
        msgs.forEach((msg) => {
          console.log(msg.id);
          msg.delete().catch(console.error);
        });
      }, 5 * 1000);
    }

    if (message && cmData) {
      if (cmData.deleteWithInvocation)
        client.deletedMessages.set(message.id, repls);
      if (cmData.deleteCommandMsg && message.deletable)
        message.delete().catch(console.error);
    }

    return lastReply;
  },
};
