import { Config, Override } from "./types";

export const DefaultOverride: Override = {
  level: 0,
  bypassLevel: 200,
  disabled: false,
  channels_blacklist: [],
  roles_blacklist: [],
};

export const DefaultOverrides: NonNullable<
  Config["modules"]["commands"]["overrides"]
> = {
  "module.commands": { level: 0 },
  "module.utility": { level: 0 },
  "command.ping": { level: 0 },
  "command.help": { level: 0 },
  "command.level": { level: 0 },
  "command.nickme": { level: 200 },
};
