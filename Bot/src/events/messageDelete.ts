import { Message } from "discord.js";
import { CustomClient } from "../types";

module.exports = {
  async execute(message: Message, client: CustomClient) {
    const originalMsgId = client.deletedMessages.get(message.id);
    if (originalMsgId) {
      client.deletedMessages.delete(message.id);
      const originalMsg = await message.channel.messages
        .fetch(originalMsgId)
        .catch(() => null);
      if (originalMsg && originalMsg.deletable) {
        await originalMsg.delete().catch(console.error);
      }
    }
  },
};
