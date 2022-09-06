import { config, list } from "../globals";
import { OverrideString, RawCommand } from "../types";
import { Err, Ok } from "./err";
import { canRunCommand, respond } from "./utils";

export function on<T extends discord.command.CommandArgumentsContainer>(
  tree: Array<OverrideString>,
  options: string | discord.command.ICommandOptions,
  args: discord.command.ArgumentsParser<T>,
  handler: discord.command.CommandHandler<discord.command.ResolvedArgs<T>>,
  group: string = "@global"
) {
  if (typeof options === "string") {
    options = { name: options };
  }
  let name = options.name;
  if (!tree.includes(`command.${name}`)) {
    if (name === "@default") {
      name = ``;
    }
    if (group !== "@global") {
      name = `${group} ${name}`.trim();
    }

    tree.push(`command.${name}`);
  }

  const g = list[group] || [];

  // throw new Error(name);

  g.push({
    tree,
    options: {
      onError(ctx, e) {
        if (e === null) {
          return;
        }

        if (e instanceof Ok) {
          respond.fmt(ctx.message, ":white_check_mark: {message}", {
            message: e.message,
          });
          return;
        }

        if (e instanceof discord.command.ArgumentError || e instanceof Err) {
          const command = ctx.command as RawCommand;

          let i = [name];

          for (const [k, v] of command.argumentConfigList) {
            let q = v.type.endsWith("Optional") ? "?" : "";

            i.push(`${q}<${k}: ${v.type.replace("Optional", "")}>`);
          }

          respond.fmt(
            ctx.message,
            e instanceof Err && !e.showUsage
              ? ":warning: {message}"
              : ":warning: `{message}`\n```lua\n{usage}\n```",
            {
              message: e.message,
              usage: i.join(" "),
            }
          );

          return;
        }

        respond.fmt(
          ctx.message,
          ":x: Error happened while running command: ```js\n{e}\n```",
          { e: e.stack }
        );
      },
      ...options,
    },
    args,
    async handler(payload, args, ctx) {
      const value = await canRunCommand(config, tree, payload);
      if (typeof value === "string") {
        return await respond(payload, {
          content: value,
        });
      }

      return await handler(payload, args as never, ctx);
    },
  });

  list[group] = g;
}

export function raw(
  tree: Array<OverrideString>,
  options: string | discord.command.ICommandOptions,
  handler: discord.command.CommandHandler<
    discord.command.ResolvedArgs<{ text: string | null }>
  >,
  group: string = "@global"
) {
  return on(
    tree,
    options,
    (args) => ({ text: args.textOptional() }),
    handler,
    group
  );
}

export function sub(
  parentTree: Array<OverrideString>,
  name: string
): SubcommandGroup {
  const f = <T extends discord.command.CommandArgumentsContainer>(
    tree: Array<OverrideString>,
    options: string | discord.command.ICommandOptions,
    args: discord.command.ArgumentsParser<T>,
    handler: discord.command.CommandHandler<discord.command.ResolvedArgs<T>>
  ) => {
    return on([...parentTree, ...tree], options, args, handler, name);
  };

  return {
    raw(tree, options, handler) {
      return f(
        tree,
        options,
        (args) => ({ text: args.textOptional() }),
        handler
      );
    },

    on: f,
    default: (tree, args, handler, options?) => {
      return f(
        tree,
        Object.assign(options || {}, { name: "@default" }),
        args,
        handler
      );
    },
    defaultRaw: (tree, handler, options?) => {
      return f(
        tree,
        Object.assign(options || {}, { name: "@default" }),
        (args) => ({ text: args.textOptional() }),
        handler
      );
    },
  };
}

export type SubcommandGroup = {
  on: <T extends discord.command.CommandArgumentsContainer>(
    tree: Array<OverrideString>,
    options: string | discord.command.ICommandOptions,
    args: discord.command.ArgumentsParser<T>,
    handler: discord.command.CommandHandler<discord.command.ResolvedArgs<T>>
  ) => void;
  raw: (
    tree: Array<OverrideString>,
    options: string | discord.command.ICommandOptions,
    handler: discord.command.CommandHandler<
      discord.command.ResolvedArgs<{ text: string | null }>
    >
  ) => void;
  default: <T extends discord.command.CommandArgumentsContainer>(
    tree: Array<OverrideString>,
    args: discord.command.ArgumentsParser<T>,
    handler: discord.command.CommandHandler<discord.command.ResolvedArgs<T>>,
    options?: discord.command.ICommandOptions
  ) => void;
  defaultRaw: (
    tree: Array<OverrideString>,
    handler: discord.command.CommandHandler<
      discord.command.ResolvedArgs<{ text: string | null }>
    >,
    options?: discord.command.ICommandOptions
  ) => void;
};
