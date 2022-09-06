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
  "module.infractions": { level: 50 },

  "command.ping": { level: 0 },
  "command.help": { level: 0 },
  "command.level": { level: 0 },
  "command.nickme": { level: 200 },

  "command.server": { level: 0 },
  "command.info": { level: 0 },
  "command.avatar": { level: 0 },
  "command.snowflake": { level: 0 },

  "group.random": { level: 0 },
  "command.random coin": { level: 0 },
  "command.random number": { level: 0 },
  "command.random cat": { level: 0 },
  "command.random dog": { level: 0 },
  "command.random fox": { level: 0 },
  "command.random panda": { level: 0 },
  "command.random koala": { level: 0 },
  "command.random birb": { level: 0 },
  "command.pikachu": { level: 0 },
  "command.hug": { level: 0 },
  "command.pat": { level: 0 },

  "group.remind": { level: 0 },
  "command.remind clear": { level: 0 },
  "command.remind add": { level: 0 },
  "command.remind list": { level: 0 },

  "group.cur": { level: 0 },
  "command.cur": { level: 0 },
  "command.cur name": { level: 0 },
  "command.cur color": { level: 0 },
  "command.cur set": { level: 100 },
  "command.cur clear": { level: 100 },
  "command.cur delete": { level: 100 },
};
