import { on, raw } from "../tools/commands";
import { Embed } from "../tools/embed";
import { NotImplementedError } from "../tools/err";
import { Parameters } from "../tools/search";
import { fmt, respond } from "../tools/utils";

raw(["module.utility"], "server", async (payload) => {
  throw new NotImplementedError("utilities.info.guild");
});

raw(["module.utility"], "info", async (payload) => {
  throw new NotImplementedError("utilities.info.user");
});

on(
  ["module.utility"],
  "avatar",
  (args) => ({ member: args.textOptional() }),
  async (payload, args) => {
    const member = await Parameters.member(payload, args.member);

    const embed = Embed.user(payload);

    embed.setTitle(
      fmt("Avatar of {user.tag}", { "user.tag": member.user.getTag() })
    );

    embed.setImage({
      url: member.user.getAvatarUrl(),
    });

    return await respond(payload, { embeds: [embed] });
  }
);
