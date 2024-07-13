import { Message } from "discord.js";
import { CustomClient } from "../types";

module.exports = {
  async execute(message: Message, client: CustomClient) {
    const originalMsgIds = client.deletedMessages.get(message.id);
    if (originalMsgIds) {
      client.deletedMessages.delete(message.id);
      originalMsgIds.forEach(async (originalMsgId) => {
        const originalMsg = await message.channel.messages
          .fetch(originalMsgId)
          .catch(() => null);
        if (originalMsg && originalMsg.deletable) {
          await originalMsg.delete().catch(console.error);
        }
      });
    }
  },
};
