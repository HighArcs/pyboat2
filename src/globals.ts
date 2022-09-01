export const kv = {
  config: new pylon.KVNamespace("@internals/config"),
};

export const encoding = {
  to: new TextEncoder(),
  from: new TextDecoder(),
};

import { forceCast, isModuleEnabled, ValidationError } from "./tools/utils";
import { Command, Config } from "./types";

export const DefaultConfig: Config = {
  guild_id: discord.getGuildId(),
  levels: {},
  loaded: false,
  modules: {
    commands: { enabled: false },
    utility: { enabled: false },
  },
};

export const commandList: Array<
  Command<discord.command.CommandArgumentsContainer>
> = [];

export let config: Config = DefaultConfig;
export let commands: discord.command.CommandGroup =
  new discord.command.CommandGroup({});
export async function init() {
  if (config.loaded === true) {
    return;
  }
  // load config;
  const data = await kv.config.get<any>("data");

  if (data) {
    config = Object.assign({}, DefaultConfig, data);
  }

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

    for (const l of commandList) {
      commands.on(l.options, l.args, l.handler);
    }
  }
}

export function validateConfig(config: Config) {
  const errors: Array<ValidationError> = [];
  if (config.guild_id !== discord.getGuildId()) {
    errors.push(new ValidationError("config.guildId", "not in this guild"));
  }

  if (config.loaded === false) {
    errors.push(
      new ValidationError(
        "config.loaded",
        "config is not yet loaded, send a message to activate"
      )
    );

    return errors;
  }

  if (!("modules" in config) || config.modules === undefined) {
    errors.push(
      new ValidationError("config.modules", "no modules were defined")
    );
    return errors;
  }

  for (const key in DefaultConfig.modules) {
    if (!(key in config.modules) || !("enabled" in config.modules[key])) {
      errors.push(
        new ValidationError(
          `config.modules.${key}`,
          "module was missing, use { enabled: false } to disable a module"
        )
      );
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
