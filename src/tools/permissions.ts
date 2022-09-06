import { config } from "../globals";
import { RequiredPermissions } from "../types";
import { botLevel, fmt } from "./utils";

export async function canTarget(
  source: discord.GuildMember,
  target: discord.GuildMember,
  request: Array<keyof RequiredPermissions> = [],
  bot: boolean = false
) {
  const reasons: Array<string> = [];
  const noun = bot ? "My" : "Your";

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
      fmt("{noun} level {sl} does not surpass the target's level of {tl}", {
        sl,
        tl,
        noun,
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
        "{noun} highest role of {sr} does not surpass the target's highest role of {tr}",
        {
          sr: sr.toMention(),
          tr: tr.toMention(),
          noun,
        }
      )
    );
  }

  return reasons;
}

export async function highestRole(
  member: discord.GuildMember
): Promise<discord.Role> {
  const guild = await member.getGuild();
  const roles = await guild.getRoles();

  let role: discord.Role = (await guild.getRole(guild.id))!;

  for (const target of roles) {
    if (member.roles.includes(target.id)) {
      if (target.position > role.position) {
        role = target;
      }
    }
  }

  return role;
}
