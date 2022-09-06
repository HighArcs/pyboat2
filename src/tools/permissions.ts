import { config } from "../globals";
import { botLevel, fmt } from "./utils";

export async function canTarget(
  context: discord.GuildMemberMessage,

  target: discord.GuildMember
) {
  const { member: source } = context;
  const reasons: Array<string> = [];

  if (
    source.user.id === target.user.id &&
    !config.modules.infractions.targeting?.allowSelf
  ) {
    reasons.push("You cannot target yourself");
  }

  const sl = botLevel(config, source);
  const tl = botLevel(config, target);

  if (config.modules.infractions.targeting?.checkLevels && sl < tl) {
    reasons.push(
      fmt("Your level {sl} does not surpass the target's level of {tl}", {
        sl,
        tl,
      })
    );
  }

  const sr = await highestRole(source);
  const tr = await highestRole(target);

  if (
    config.modules.infractions.targeting?.checkRoles &&
    sr.position < tr.position
  ) {
    reasons.push(
      fmt(
        "Your highest role of {sr} does not surpass the target's highest role of {tr}",
        {
          sr: sr.toMention(),
          tr: tr.toMention(),
        }
      )
    );
  }

  if (reasons.length) {
  }
}

export async function highestRole(
  member: discord.GuildMember
): Promise<discord.Role> {
  const guild = await member.getGuild();
  const roles = await guild.getRoles();

  let role: discord.Role = null as never;

  for (const target of roles) {
    if (member.roles.includes(target.id)) {
      if (role === null || target.position > role.position) {
        role = target;
      }
    }
  }

  return role;
}
