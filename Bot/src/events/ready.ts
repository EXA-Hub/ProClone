import { CustomClient } from "../types";

module.exports = {
  once: true, // Indicates this event should be registered with client.once
  execute(client: CustomClient) {
    console.log(`Logged in as ${client.user?.tag}!`);

    // client.db.set("utility" + "1153834735102070855", true);

    // for (let x = 0; x < 10; x++) {
    //   client.guilds.cache
    //     .get("1153834735102070855")
    //     ?.roles.create({ name: x.toString() });
    // }

    // client.guilds.cache
    //   .get("1153834735102070855")
    //   ?.roles.cache.filter((r) => r.name === "22")
    //   .forEach((r) => r.delete());
  },
};
