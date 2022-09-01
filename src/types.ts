export interface Config {
  guild_id: string;
  levels: Record<string, number>;
  loaded: boolean;
  modules: Modules;
}

export interface Modules {
  commands: Module<Commands>;
  utility: Module<Utility>;
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

export interface Utility {}

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
  options: string | discord.command.ICommandOptions;
  args: discord.command.ArgumentsParser<T>;
  handler: discord.command.CommandHandler<discord.command.ResolvedArgs<T>>;
  tree: Array<OverrideString>;
}
