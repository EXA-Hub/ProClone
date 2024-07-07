import { CustomClient } from "../types";

module.exports = {
  once: true, // Indicates this event should be registered with client.once
  execute(client: CustomClient) {
    console.log(`Logged in as ${client.user?.tag}!`);
    // client.db.set("utility" + "1153834735102070855", true);
  },
};
