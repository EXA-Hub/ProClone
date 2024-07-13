// commands/credits.js

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
    name: "credits",
    type: 1,
    description:
      "Shows your or someone's balance or transfer credits for someone",
    options: [
      {
        type: 6,
        name: "user",
        description: "User to show/transfer credits of/to.",
      },
      {
        type: 4,
        name: "amount",
        description: "Amount of credits to transfer.",
      },
      {
        type: 3,
        name: "comment",
        description: "An additional comment to the credits transaction.",
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
    args: string[] // Changed from String[] to string[]
  ) => {
    let targetUser: User | null = null;
    let amount: number | null = null;
    let reason: string | null = null;

    if (interaction) {
      targetUser = interaction.options.get("user")?.user || user;
      amount =
        parseInt(`${interaction.options.get("amount")?.value?.toString()}`) ||
        null;
      reason = interaction.options.get("reason")?.value?.toString() || null;
    } else if (message) {
      const mention = message.mentions.users.first();
      targetUser =
        mention ||
        client.users.cache.get(args[1]) ||
        client.users.cache.find((u) => u.username === args[1]) ||
        null;
      amount = args[2] ? parseInt(args[2], 10) : null;
      reason = args.slice(3).join(" ") || null;
    }

    // await client.db.add(`credits_${user.id}`, 570000);

    const i18n = client.i18n[await client.getLanguage(guild.id)].credits;
    const userBalance = (await client.db.get(`credits_${user.id}`)) || 0;

    if (!targetUser || targetUser.id === user.id)
      return i18n.balance
        .replace("{balance}", userBalance)
        .replace("{username}", user.username);

    if (targetUser.bot) return i18n.noBots.replace("{username}", user.username);

    const userCredits = (await client.db.get(`credits_${targetUser.id}`)) || 0;

    if (amount === null) {
      // Show balance
      return i18n.otherBalance
        .replace("{username}", user.username)
        .replace("{balance}", userCredits);
    } else {
      // Transfer credits
      if (userBalance < amount) return i18n.lessMoney;

      const afterTax = amount - (amount * 5) / 100;

      await client.db.add(`credits_${targetUser.id}`, afterTax);
      await client.db.sub(`credits_${user.id}`, amount);

      await targetUser
        .send(
          i18n.transfer
            .replace("{senderName}", user.username)
            .replace("{credits}", afterTax.toString())
            .replace("{senderId}", user.id)
            .replace("{reason}", reason || "No reason provided")
        )
        .catch((err) => console.error(err));

      return i18n.transferSuccess
        .replace("{senderName}", user.username)
        .replace("{credits}", afterTax.toString())
        .replace("{ID}", targetUser.id);
    }
  },
};
