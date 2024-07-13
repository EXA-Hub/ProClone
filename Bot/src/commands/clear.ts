// commands/clear.js

import { CustomClient } from "../types"; // Import CustomClient interface
import {
  Guild,
  GuildMember,
  User,
  CommandInteraction,
  Message,
  PermissionFlagsBits,
  TextChannel,
} from "discord.js";
module.exports = {
  data: {
    name: "clear",
    type: 1,
    description: "Cleans messages from a channel.",
    default_member_permissions: PermissionFlagsBits.ManageMessages.toString(),
    options: [
      {
        type: 4,
        name: "number_of_messages",
        description: "Number of messages to delete.",
        required: true,
        min_value: 1,
      },
      {
        type: 6,
        name: "filter_by_user",
        description: "Filter by user messages.",
      },
      {
        type: 8,
        name: "filter_by_role",
        description: "Filter by role messages.",
      },
      {
        type: 5,
        name: "filter_by_bots",
        description: "Filter by bots messages.",
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
    const i18n = client.i18n[await client.getLanguage(guild.id)].clear;

    // Parse arguments based on command type
    let numberOfMessages: number;
    let filterByUser = null;
    let filterByRole = null;
    let filterByBots = false;

    if (interaction) {
      numberOfMessages = interaction.options.get("number_of_messages")
        ?.value as number;
      filterByUser = interaction.options.get("filter_by_user")?.user?.id;
      filterByRole = interaction.options.get("filter_by_role")?.role?.id;
      filterByBots = interaction.options.get("filter_by_bots")
        ?.value as boolean;
    } else {
      numberOfMessages = parseInt(args[1]);
      if (args[1] === "bots") filterByBots = true;
      else if (args[1] && !numberOfMessages)
        filterByUser = args[1].replace(/<@!?(.*?)>/, "$1");
    }

    try {
      // Fetch messages from the channel
      let messages = await channel.messages.fetch({
        limit: numberOfMessages || 100,
      });

      // Apply filters if specified
      if (filterByUser)
        messages = messages.filter((msg) => msg.author.id === filterByUser);
      else if (filterByRole) {
        const role = guild.roles.cache.get(filterByRole);
        if (role)
          messages = messages.filter(
            (msg) => msg.member && msg.member.roles.cache.has(role.id)
          );
      } else if (filterByBots)
        messages = messages.filter((msg) => msg.author.bot);

      // Check if there are messages to delete
      if (messages.size > 0) {
        // Delete messages in bulk
        await channel.bulkDelete(messages.first(numberOfMessages), true);
        return message
          ? channel.send(
              i18n.success.replace("{number}", numberOfMessages.toString())
            )
          : i18n.success.replace("{number}", numberOfMessages.toString());
      } else return message ? channel.send(i18n.noMessages) : i18n.noMessages;
    } catch (error) {
      console.error(error);
      return message ? channel.send(i18n.failure) : i18n.failure;
    }
  },
};
