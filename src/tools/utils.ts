import { Ranks } from "../constants";
import { DefaultOverride, DefaultOverrides } from "../overrides";
import { Config, Modules, OverrideString, Placeholders } from "../types";

export interface ResponseOptions {
  ephemeral?: boolean;
  mention?: boolean;
  embeds?: Array<discord.Embed>;
  content?: string;
  attachments?: Array<discord.Message.IOutgoingMessageAttachment>;
  reply?: boolean;
  mentionEveryone?: boolean;
  mentionRoles?: Array<string>;
  mentionUsers?: Array<string>;
}

export const DefaultResponseOptions: ResponseOptions = {
  ephemeral: false,
  mention: false,
  mentionEveryone: false,
  mentionRoles: [],
  mentionUsers: [],
  reply: true,
};

export const respond = Object.assign(
  async (
    context:
      | discord.Message
      | discord.interactions.commands.SlashCommandInteraction,
    options: ResponseOptions | string = DefaultResponseOptions
  ) => {
    if (typeof options === "string") {
      options = { content: options };
    }
    options = Object.assign({}, DefaultResponseOptions, options);

    if (
      context instanceof discord.interactions.commands.SlashCommandInteraction
    ) {
      const data: discord.interactions.commands.IResponseMessageOptions = {
        allowedMentions: { reply: options.mention },
        content: options.content,
        embeds: options.embeds,
      };

      if (options.ephemeral) {
        if (options.content === undefined) {
          throw new discord.ApiError(
            "Cannot send an ephemeral message without content"
          );
        }
        return context.respondEphemeral(options.content);
      }

      return context.respond(data);
    }

    const data: discord.Message.OutgoingMessageOptions = {
      allowedMentions: {
        reply: options.mention,
        everyone: options.mentionEveryone,
        roles: options.mentionRoles,
        users: options.mentionUsers,
      },
      reply: options.reply ? context.id : undefined,
      attachments: options.attachments,
      content: options.content!,
      embed: options.embeds?.[0],
    };

    return await context.reply(data);
  },
  {
    fmt: async <T extends string>(
      payload:
        | discord.Message.AnyMessage
        | discord.interactions.commands.SlashCommandInteraction,
      value: T,
      inject: Placeholders<T> = {} as never,
      other: ResponseOptions = DefaultResponseOptions
    ) => {
      return await respond(
        payload,
        Object.assign({}, other, {
          content: fmt(value, inject),
        })
      );
    },
  }
);

export function isModuleEnabled(config: Config, key: keyof Modules): boolean {
  if (
    config &&
    config.loaded &&
    config.modules &&
    config.modules[key] &&
    config.modules[key]!.enabled
  ) {
    return true;
  }

  return false;
}

export class ValidationError extends Error {
  public readonly label: string;
  public readonly reason: string;
  constructor(label: string, reason: string) {
    super(`Validation error on '${label}': ${reason}`);
    this.label = label;
    this.reason = reason;
  }
}

export function cast<T>(v: unknown): T {
  return v as T;
}

export function forceCast<T>(v: unknown): asserts v is T {
  // empty function body lol
}

export function fmt<T extends string>(value: T, inject: Placeholders<T>) {
  let b: string = value;
  for (const [k, v] of Object.entries(inject)) {
    b = b.split(`{${k}}`).join(String(v));
  }

  return b;
}

export async function canRunCommand(
  config: Config,
  tree: Array<OverrideString>,
  payload: discord.Message
) {
  if (payload.member === null) {
    return "[fail silently]";
  }
  const level = await botLevel(config, payload.member);

  if (level === Ranks.Blacklisted) {
    return "You are not allowed to use commands.";
  }

  if (level >= Ranks.ServerOwner) {
    return true;
  }

  const list = config.modules.commands.overrides || DefaultOverrides;

  for (const branch of tree) {
    // handle criteria.* first

    t: if (branch.startsWith("criteria.")) {
      const s = branch.slice(0, "criteria.".length).split(".");

      let qualifier: any = config.modules;

      for (const id of s) {
        if (id in qualifier) {
          qualifier = qualifier[id];
          continue;
        }

        console.error("unknown criteria in config!");
      }

      if (!!qualifier) {
        break t;
      }

      return fmt("This command cannot be ran due to unmet criteria: {branch}", {
        branch,
      });
    }

    // order:
    // bypass -> global disable -> level -> channel -> role

    const override = Object.assign(
      DefaultOverride,
      DefaultOverrides[branch],
      list[branch]
    );

    if (override === undefined) {
      continue;
    }

    if (override.bypassLevel) {
      if (level > override.bypassLevel) {
        return true;
      }
    }

    if (override.disabled) {
      return fmt("This command is disabled via the {id} override", {
        id: branch,
      });
    }

    l: if (override.level) {
      if (level > override.level) {
        break l;
      }

      return fmt(
        "You do not meet the required level of **{level}** to use this command.",
        { level: override.level }
      );
    }

    c: if (override.channels_whitelist && override.channels_whitelist.length) {
      if (override.channels_whitelist.includes(payload.channelId)) {
        break c;
      }

      return fmt("This command is only usable in {channels}", {
        channels: override.channels_whitelist.map((x) => `<#${x}>`).join(", "),
      });
    }

    cb: if (override.channels_blacklist) {
      if (override.channels_blacklist.includes(payload.channelId)) {
        return fmt("This command is not usable in {channels}", {
          channels: override.channels_blacklist
            .map((x) => `<#${x}>`)
            .join(", "),
        });
      }

      break cb;
    }

    r: if (override.roles_whitelist && override.roles_whitelist.length) {
      if (
        payload.member.roles.some((x) => override.roles_whitelist?.includes(x))
      ) {
        break r;
      }

      return fmt("This command is only usable by {roles}", {
        roles: override.roles_whitelist.map((x) => `<@&${x}>`),
      });
    }

    rb: if (override.roles_blacklist) {
      if (override.roles_blacklist.includes(payload.channelId)) {
        return fmt("This command is not usable by {roles}", {
          roles: override.roles_blacklist.map((x) => `<#${x}>`).join(", "),
        });
      }

      break rb;
    }
  }

  return true;
}

export async function botLevel(config: Config, payload: discord.GuildMember) {
  const levels: Array<number> = [];
  const prefer = config.levels[payload.user.id];

  if (prefer) {
    levels.push(prefer);
  }

  for (const role of payload.roles) {
    const prefer = config.levels[role];
    if (prefer) {
      levels.push(prefer);
    }
  }

  const guild = await payload.getGuild();

  if (payload.user.id === guild.ownerId) {
    levels.push(Ranks.ServerOwner);
  }

  if (payload.can(discord.Permissions.ADMINISTRATOR)) {
    levels.push(Ranks.Administrator);
  }

  if (levels.includes(Ranks.Blacklisted)) {
    return Ranks.Blacklisted;
  }

  return Math.max(...levels);
}
