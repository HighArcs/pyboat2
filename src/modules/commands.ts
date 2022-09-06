import { invisible } from "../constants";
import { config } from "../globals";
import { on, raw } from "../tools/commands";
import { Embed } from "../tools/embed";
import { Err } from "../tools/err";
import { Markdown } from "../tools/markdown";
import { Parameters } from "../tools/search";
import { botLevel, fmt, respond } from "../tools/utils";

raw(["module.commands"], "ping", async (payload) => {
  respond(payload, "pong");
});

raw(["module.commands"], "help", async (payload) => {
  const embed = Embed.user(payload);

  embed.setDescription(
    fmt(
      `PyBoat is a rowboat clone built on top of {pylon}
        
        It features several utility, moderation, and general automation features.

        {documentation}
        {homepage}
        {support}`,
      {
        documentation: Markdown.Format.link(
          "Documentation",
          "https://docs.pyboat.i0.tf/"
        ),
        homepage: Markdown.Format.link("Homepage", "https://pyboat.i0.tf/"),
        pylon: Markdown.Format.link("Pylon", "https://pylon.bot"),
        support: Markdown.Format.link(
          "Support",
          "https://discord.gg/gQnFerx2tv"
        ),
      }
    )
  );

  respond(payload, {
    embeds: [embed],
  });
});

on(
  ["module.commands"],
  "level",
  (args) => ({ member: args.textOptional() }),
  async (payload, args) => {
    const member = await Parameters.member(payload, args.member);

    const level = await botLevel(config, member);

    if (
      args.member !== null &&
      level < (config.modules.commands.level_allow_view_others || 0)
    ) {
      throw new Err(403, "You are not allowed to see other member's levels");
    }

    return await respond.fmt(
      payload,
      args.member === null
        ? "Your bot level is **{level}**"
        : "<@{user.id}>'s bot level is **{level}**",
      { "user.id": member.user.id, level }
    );
  }
);

on(
  ["module.commands"],
  "nickme",
  (args) => ({ text: args.textOptional() }),
  async (payload, args) => {
    const guild = await payload.getGuild();
    const me = await guild.getMember(discord.getBotId());

    try {
      await me!.edit({
        nick: args.text === "invisible" ? invisible : args.text || undefined,
      });
      return await respond(payload, "ok!");
    } catch (e) {
      throw new Err(500, e);
    }
  }
);
