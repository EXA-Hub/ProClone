// commands/vote.js

import { CustomClient } from "../types"; // Import CustomClient interface

import {
  ButtonBuilder,
  ActionRowBuilder,
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
} from "discord.js";
module.exports = {
  data: {
    name: "vote",
    type: 1,
    description: "Get the vote link and see when you can vote again",
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
    // Get the user's language content
    const { vote } = client.i18n[await client.getLanguage(guild.id)];

    // Create a button
    const button = new ButtonBuilder()
      .setStyle(5)
      .setURL(
        "https://discordbotlist.com/auth?r=/bots/probot/upvote?utm_campaign=probot%26utm_medium=vote-command%26utm_source=probot"
      )
      .setEmoji(vote.em)
      .setLabel(vote.btn);

    // Create an action row to hold the button
    const row = new ActionRowBuilder().addComponents(button);

    // Send the reply with the button
    return {
      content: vote.msg,
      components: [row],
      ephemeral: true, // Make the message ephemeral
    };
  },
};
