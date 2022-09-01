import { Err } from "./err";

export module Parameters {
  export async function member(
    payload: discord.GuildMemberMessage,
    text?: string | null
  ) {
    if (typeof text !== "string") {
      return payload.member;
    }

    const guild = await payload.getGuild();

    for await (const member of guild.iterMembers()) {
      if (text.replace(/\D/g, "") === member.user.id) {
        return member;
      }

      if (member.user.getTag().toLowerCase().includes(text)) {
        return member;
      }

      if (member.nick) {
        if (member.nick.toLowerCase().includes(text)) {
          return member;
        }
      }
    }

    throw new Err(400, "Cannot find any members by that name");
  }
}
