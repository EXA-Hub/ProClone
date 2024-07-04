import { Client, Collection, Interaction, Message } from "discord.js";
import { QuickDB } from "quick.db";

interface Command {
  execute: (interaction: Interaction | Message) => Promise<void>;
  data: {
    description: String;
    name: string;
  };
}

export interface CustomClient extends Client {
  i8: string;
  db: QuickDB;
  commands: Collection<string, Command>;
  i18n: { [key: string]: any };
  getLanguage: (guildId: string) => Promise<string>;
}
