import { config, validateConfig } from "../globals";
import { respond } from "../tools/utils";
import { Module } from "../types";

export const devContainer = new discord.command.CommandGroup({
  defaultPrefix: "p/",
});

devContainer.raw("modules", async (payload) => {
  const modules: Array<[string, Module<{}>]> = Object.entries(config.modules);
  const enabled = modules.filter((x) => x[1].enabled).map((x) => x[0]);
  const disabled = modules.filter((x) => !x[1].enabled).map((x) => x[0]);

  return await respond(
    payload,
    `**enabled**: ${enabled.toLocaleString()}\n**disabled**: ${disabled.toLocaleString()}`
  );
});

devContainer.raw("check", async (payload) => {
  const checks = validateConfig(config);

  if (checks.length) {
    return await respond.fmt(
      payload,
      "your config contains errors:\n{errors}",
      {
        errors: checks.map((x) => `[${x.label}]: \`${x.reason}\``).join("\n"),
      }
    );
  }
});
