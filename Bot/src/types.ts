import {
  APIInteractionGuildMember,
  Channel,
  Client,
  Collection,
  Guild,
  GuildMember,
  Interaction,
  Message,
  Snowflake,
  TextBasedChannel,
  User,
} from "discord.js";
import { QuickDB } from "quick.db";
import i18nJson from "./languages/en.json";

interface Command {
  execute: (
    client?: CustomClient,
    interaction?: Interaction,
    message?: Message,
    guild?: Guild,
    member?: GuildMember | APIInteractionGuildMember,
    user?: User,
    channel?: Channel | TextBasedChannel,
    arg?: String[]
  ) => Promise<any>;
  data: {
    default_member_permissions?: string;
    description: String;
    name: string;
  };
}

export interface CustomClient extends Client {
  i8: string;
  db: QuickDB;
  commands: Collection<string, Command>;
  cmdsec: { [key: string]: string[] }; // Correct type for cmdsec
  i18n: { [key: string]: typeof i18nJson };
  getLanguage: (guildId: string) => Promise<string>;
}

export interface commandData {
  disabledChannels: Snowflake[];
  enabledChannels: Snowflake[];
  disabledRoles: Snowflake[];
  enabledRoles: Snowflake[];
  // skipRoles: string[];
  deleteCommandMsg: Boolean;
  deleteReply: Boolean;
  deletewithinvocation: Boolean;
  enabled: Boolean;
}
