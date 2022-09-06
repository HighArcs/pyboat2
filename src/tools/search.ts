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

    throw new Err(404, "Cannot find any members by that name");
  }

  export async function role(
    payload: discord.GuildMemberMessage,
    text?: string | null
  ) {
    const guild = await payload.getGuild();

    if (typeof text !== "string") {
      return (await guild.getRole(guild.id))!;
    }

    text = text.toLowerCase();

    const roles = await guild.getRoles();

    for (const role of roles) {
      if (text.replace(/\D/g, "") === role.id) {
        return role;
      }

      if (role.name.toLowerCase().includes(text)) {
        return role;
      }
    }

    throw new Err(404, "Cannot find any roles by that name");
  }

  export async function self() {
    const guild = await discord.getGuild();
    const id = discord.getBotId();
    return (await guild.getMember(id))!;
  }
}
