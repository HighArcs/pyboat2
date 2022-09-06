import { encoding, init, kv, validateConfig } from "../globals";
import { respond } from "../tools/utils";
import { Config } from "../types";

// these always need to be available
export const configContainer = new discord.command.CommandGroup({
  defaultPrefix: "!!",
});

export const key = "data";

configContainer.on(
  "config",
  (args) => ({ flag: args.stringOptional() }),
  async (payload, args) => {
    if (args.flag) {
      switch (args.flag) {
        case "-d": {
          const has = await kv.config.get(key);

          if (has) {
            await kv.config.delete(key);
            return await respond(payload, {
              content: "ok! deleted the stored config",
            });
          }

          return await respond(payload, {
            content: "there's no config to delete",
          });
        }

        case "-v": {
          const has: Config = await kv.config.get<any>(key);

          if (has) {
            await respond(payload, {
              attachments: [
                {
                  name: "config.json",
                  data: encoding.to.encode(JSON.stringify(has, null, 2)).buffer,
                },
              ],
            });
            return;
          }

          return await respond(payload, {
            content: "you have no config!",
          });
        }

        default: {
          return await respond.fmt(
            payload,
            `unknown flag '{flag}', valid flags are \`-d\`, \`-v\``,
            { flag: args.flag }
          );
        }
      }
    }

    const attachment = payload.attachments.at(0);

    if (attachment === undefined) {
      return await respond(payload, "you need to upload a file");
    }

    const res = await fetch(attachment.url);
    const text = await res.text();

    let json: Config | null = null;
    try {
      json = JSON.parse(text);
    } catch (e) {
      return await respond.fmt(
        payload,
        `error while parsing your config: {error}`,
        { error: e }
      );
    }

    if (json === null) {
      return await respond.fmt(
        payload,
        "unknown error while parsing your config"
      );
    }

    const checks = validateConfig(json);

    if (checks.length) {
      return await respond.fmt(
        payload,
        "your config contains errors:\n{errors}",
        {
          errors: checks.map((x) => `[${x.label}]: \`${x.reason}\``).join("\n"),
        }
      );
    }

    await kv.config.put(key, json as never);

    await respond.fmt(payload, "ok! uploaded your config");

    init();
  }
);
