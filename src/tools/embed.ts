import { Colours } from "../constants";
import { fmt } from "./utils";

export module Embed {
  export function user(
    payload: discord.Message.AnyMessage,
    embed: discord.Embed = new discord.Embed()
  ) {
    if (payload.member === null) {
      return embed;
    }

    embed.setAuthor({
      name: payload.member.user.getTag(),
      url: fmt("https://discord.com/users/{id}", {
        id: payload.member.user.id,
      }),
      iconUrl: payload.member.user.getAvatarUrl(),
    });

    embed.setColor(Colours.Embed);

    return embed;
  }
}
