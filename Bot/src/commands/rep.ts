// commands/rep.js

import { CustomClient } from "../types"; // Import CustomClient interface

import {
  CommandInteraction,
  Message,
  Guild,
  GuildMember,
  Channel,
  User,
  ReplyOptions,
  MessageReplyOptions,
} from "discord.js";
module.exports = {
  data: {
    name: "rep",
    type: 1,
    description: "Award someone a reputation point.",
    options: [
      {
        type: 6,
        name: "user",
        description: "rep_user_description",
        required: true,
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
    return {
      content: ":x: Only membership subscribers can rep users!",
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 5,
              label: "More info",
              url: "https://probot.io",
            },
          ],
        },
      ],
    };
  },
};
