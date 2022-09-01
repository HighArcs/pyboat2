import { commands, config } from "../globals";
import { OverrideString } from "../types";
import { Err } from "./err";
import { canRunCommand, respond } from "./utils";

export function on<T extends discord.command.CommandArgumentsContainer>(
  tree: Array<OverrideString>,
  options: string | discord.command.ICommandOptions,
  args: discord.command.ArgumentsParser<T>,
  handler: discord.command.CommandHandler<discord.command.ResolvedArgs<T>>,
  group: discord.command.CommandGroup = commands
) {
  if (typeof options === "string") {
    options = { name: options };
  }
  const name = options.name;
  if (!tree.includes(`command.${name}`)) {
    tree.push(`command.${name}`);
  }

  if ("tree" in group && group["tree" as never]) {
    tree = [...group["tree" as never], ...tree];
  }

  group.on(
    {
      onError(ctx, e) {
        if (e instanceof Err) {
          respond.fmt(ctx.message, ":x: `{e}`", { e });
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
    async (payload, args, ctx) => {
      const value = await canRunCommand(config, tree, payload);
      if (typeof value === "string") {
        return await respond(payload, {
          content: value,
        });
      }

      return await handler(payload, args as never, ctx);
    }
  );
}

export function raw(
  tree: Array<OverrideString>,
  options: string | discord.command.ICommandOptions,
  handler: discord.command.CommandHandler<
    discord.command.ResolvedArgs<{ text: string | null }>
  >,
  group: discord.command.CommandGroup = commands
) {
  return on(tree, options, (args) => ({ text: args.textOptional() }), handler);
}

export function sub(
  tree: Array<OverrideString>,
  options:
    | string
    | discord.command.Named<
        Omit<discord.command.ICommandGroupOptions, "register">
      >,
  group: discord.command.CommandGroup = commands
) {
  const p = group.subcommandGroup(options);
  p["tree"] = tree;
  return p;
}
