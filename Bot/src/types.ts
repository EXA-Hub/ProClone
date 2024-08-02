import {
  APIInteractionGuildMember,
  Client,
  ClientEvents,
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

// Extend ClientEvents to include custom events
interface CustomClientEvents extends ClientEvents {
  xpUpdate: [
    guildId: Snowflake,
    userId: Snowflake,
    xp: number,
    type: "textXP" | "voiceXP"
  ];
  credits: [
    userId: Snowflake,
    amount: number,
    balance: number,
    user: Snowflake,
    reason?: string | null
  ];
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

  on<Event extends keyof CustomClientEvents>(
    event: Event,
    listener: (...args: CustomClientEvents[Event]) => void
  ): this;
  on<Event extends string | symbol>(
    event: Exclude<Event, keyof CustomClientEvents>,
    listener: (...args: any[]) => void
  ): this;

  once<Event extends keyof CustomClientEvents>(
    event: Event,
    listener: (...args: CustomClientEvents[Event]) => void
  ): this;
  once<Event extends string | symbol>(
    event: Exclude<Event, keyof CustomClientEvents>,
    listener: (...args: any[]) => void
  ): this;

  emit<Event extends keyof CustomClientEvents>(
    event: Event,
    ...args: CustomClientEvents[Event]
  ): boolean;
  emit<Event extends string | symbol>(
    event: Exclude<Event, keyof CustomClientEvents>,
    ...args: unknown[]
  ): boolean;

  off<Event extends keyof CustomClientEvents>(
    event: Event,
    listener: (...args: CustomClientEvents[Event]) => void
  ): this;
  off<Event extends string | symbol>(
    event: Exclude<Event, keyof CustomClientEvents>,
    listener: (...args: any[]) => void
  ): this;

  removeAllListeners<Event extends keyof CustomClientEvents>(
    event?: Event
  ): this;
  removeAllListeners<Event extends string | symbol>(
    event?: Exclude<Event, keyof CustomClientEvents>
  ): this;
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
