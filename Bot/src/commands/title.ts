// commands/title.js

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
    name: "title",
    type: 1,
    description: "Changes your title in `/profile` command.",
    options: [
      {
        type: 3,
        name: "new_title",
        description: "The new title to set.",
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
    args: string[]
  ) => {
    const title = interaction
      ? interaction.options.get("new_title")?.value?.toString()
      : args.slice(1).join(" ").replace("\n", "");
    if (!title || title.length > 140)
      return client.i18n[await client.getLanguage(guild.id)].title.long;
    client.db.set("title_" + user.id, title);
    return client.i18n[await client.getLanguage(guild.id)].title.true;
  },
};
