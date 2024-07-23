import {
  APIInteractionGuildMember,
  Channel,
  Client,
  Collection,
  CommandInteraction,
  Guild,
  GuildMember,
  Interaction,
  Message,
  Options,
  ReplyOptions,
  Snowflake,
  TextBasedChannel,
  TextChannel,
  User,
} from "discord.js";
import { QuickDB } from "quick.db";
import i18nJson from "./languages/en";
import config from "../config.json";

interface Command {
  execute: (
    client?: CustomClient,
    interaction?: Interaction | CommandInteraction,
    message?: Message,
    guild?: Guild,
    member?: GuildMember | APIInteractionGuildMember,
    user?: User,
    channel?: TextChannel | TextBasedChannel,
    arg?: String[]
  ) => Promise<ReplyOptions | String | Message | undefined>;
  data: {
    default_member_permissions?: string;
    description: String;
    name: string;
    options: Options;
  };
}

export interface CustomClient extends Client {
  voiceTimes: Collection<string, number>;
  apiUser: any | undefined;
  i8: string;
  db: QuickDB;
  config: typeof config;
  commands: Collection<string, Command>;
  cmdsec: { [key: string]: string[] }; // Correct type for cmdsec
  i18n: { [key: string]: typeof i18nJson };
  deletedMessages: Collection<Snowflake, Snowflake[]>;
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
  deleteWithInvocation: Boolean;
  enabled: Boolean;
}
