export const kv = {
  config: new KV<SingleKey<Config>>("@internals/config"),
  reminders: new KV<Reminders>("@reminders"),
  cur: new KV<Record<string, string>>("@cur"),
};

type SingleKey<T> = { data: T };

export const encoding = {
  to: new TextEncoder(),
  from: new TextDecoder(),
};

import { DefaultOverrides } from "./overrides";
import inspect from "./tools/inspect";
import { KV } from "./tools/kv";
import {
  deepAssign,
  forceCast,
  isModuleEnabled,
  ValidationError,
} from "./tools/utils";
import { Command, Config, DeepRequired, Reminders } from "./types";

export const DefaultConfig: DeepRequired<Config> = {
  guild_id: discord.getGuildId(),
  levels: {},
  loaded: false,
  modules: {
    commands: {
      enabled: true,
      level_allow_view_others: 0,
      mention: true,
      overrides: DefaultOverrides as never,
      prefix: ["!"],
    },
    utility: {
      enabled: true,
      custom_user_roles: {
        clearOnBan: false,
        clearOnKick: false,
        clearOnLeave: false,
        enabled: true,
      },
    },
    infractions: {
      enabled: true,
      checkLogs: true,
      confirmation: {
        deleteOriginal: false,
        expiry: 0,
        message: true,
        reaction: false,
      },
      defaultDeleteDays: 0,
      integrate: true,
      muteRole: null,
      targeting: {
        allowSelf: true,
        checkLevels: true,
        checkRoles: true,
        othersEditLevel: 100,
        requiredPermissions: true,
      },
    },
  },
};

export let config: Config = DefaultConfig;
export let commands: discord.command.CommandGroup =
  new discord.command.CommandGroup({});
export const list: Record<string, Array<Command<any>>> = {
  "@global": [],
};
export async function init() {
  if (config.loaded === true) {
    return;
  }
  // load config;
  const data = await kv.config.get<any>("data");

  if (data) {
    config = deepAssign({}, DefaultConfig, data);
  }

  console.log([inspect(config.modules.commands)]);

  config.loaded = true;

  cmd: if (isModuleEnabled(config, "commands")) {
    const allPrefixes = Array.isArray(config.modules.commands?.prefix)
      ? config.modules.commands?.prefix!
      : [config.modules.commands?.prefix!];

    if (allPrefixes.length === 0) {
      break cmd;
    }

    commands = new discord.command.CommandGroup({
      defaultPrefix: allPrefixes[0],
      additionalPrefixes: allPrefixes,
      label: "@global",
      mentionPrefix: config.modules.commands?.mention,
    });

    // load commands;

    // load the raw ones before sub commands !

    for (const [k, v] of Object.entries(list)) {
      let i = commands;
      if (k !== "@global") {
        i = commands.subcommandGroup({ name: k });
      }

      for (const c of v) {
        if (c.options.name === "@default") {
          i.default(c.args, c.handler, c.options);
          continue;
        }

        i.on(c.options, c.args, c.handler);
      }
    }
  }
}

export function validateConfig(config: Config) {
  const errors: Array<ValidationError> = [];
  if (config.guild_id !== discord.getGuildId()) {
    errors.push(new ValidationError("config.guildId", "not in this guild"));
  }

  if (!("modules" in config) || config.modules === undefined) {
    errors.push(
      new ValidationError("config.modules", "no modules were defined")
    );
    return errors;
  }

  for (const key in DefaultConfig.modules) {
    if (!(key in config.modules) || !("enabled" in config.modules[key])) {
      continue;
    }

    // module specific
    const module = config.modules[key];

    switch (key as keyof Config["modules"]) {
      case "commands": {
        forceCast<Config["modules"]["commands"]>(module);

        if (!module.prefix || !module.prefix.length) {
          errors.push(
            new ValidationError(
              "config.modules.commands.prefix",
              "need at least 1 prefix"
            )
          );
        }
      }
    }
  }

  return errors;
}
