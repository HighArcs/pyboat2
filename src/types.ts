export interface Config {
  guild_id: string;
  levels: Record<string, number>;
  loaded: boolean;
  modules: Modules;
}

export interface Modules {
  commands: Module<Commands>;
  utility: Module<Utility>;
  infractions: Module<Infractions>;
}

export type Module<T> = { enabled: boolean } & Partial<{
  [P in keyof T]: T[P];
}>;

export interface Commands {
  prefix?: string | Array<string>;
  mention?: boolean;
  overrides?: Record<OverrideString, Override>;
  level_allow_view_others?: number;
}

export type OverrideString =
  | `module.${keyof Modules}`
  | `group.${string}`
  | `command.${string}`
  | `criteria.${string}`;

export interface Override {
  level?: number;
  disabled?: boolean;

  channels_blacklist?: Array<string>;
  channels_whitelist?: Array<string>;

  roles_blacklist?: Array<string>;
  roles_whitelist?: Array<string>;

  bypassLevel?: number;
}

export interface Utility {
  custom_user_roles?: Module<CustomUserRoles>;
}

export interface CustomUserRoles {
  clearOnKick?: boolean;
  clearOnBan?: boolean;
  clearOnLeave?: boolean;
}

export interface Infractions {
  checkLogs?: boolean;
  integrate?: boolean;
  muteRole?: boolean;
  defaultDeleteDays?: number;
  targeting?: Targeting;
  confirmation?: Confirmation;
}

export interface Targeting {
  requiredPermissions?: boolean | RequiredPermissions;
  checkLevels?: boolean;
  checkRoles?: boolean;
  allowSelf?: boolean;
  othersEditLevel?: number;
}

export interface RequiredPermissions {
  kick?: boolean;
  ban?: boolean;
  roles?: boolean;
  messages?: boolean;
  nicknames?: boolean;
}

export interface Confirmation {
  reaction?: boolean;
  message?: boolean;
  expiry?: number;
  deleteOriginal?: boolean;
}

export interface CronEvent {
  interval?: number;
  onError?: (error: Error) => unknown;
  run: () => unknown;
}

export type ParsePlaceholders<
  T extends string,
  U extends string = never
> = T extends `${infer F}{${infer Q}}${infer R}`
  ? ParsePlaceholders<F | R, Q | U>
  : U;

export type Placeholders<T extends string> = {
  [P in ParsePlaceholders<T>]: any;
};

export interface Command<T extends discord.command.CommandArgumentsContainer> {
  options: discord.command.ICommandOptions;
  args: discord.command.ArgumentsParser<T>;
  handler: discord.command.CommandHandler<discord.command.ResolvedArgs<T>>;
  tree: Array<OverrideString>;
}

export interface Reminder extends pylon.JsonObject {
  content: string | null;
  expiry: number;
  location: `${string}/${string}`;
}

export type DeepRecord<V> = { [i: string]: DeepRecord<V> | V };

export type RawCommand = {
  options: discord.command.ICommandOptions;
  argumentConfigList: Array<[string, discord.command.IArgumentConfig<unknown>]>;
  filter: discord.command.filters.ICommandFilter;
  aliases: Set<string>;
};
export interface Reminders extends Record<discord.Snowflake, Array<Reminder>> {}

export type UnionToIntersection<T> = (
  T extends any ? (x: T) => any : never
) extends (x: infer R) => any
  ? R
  : never;
