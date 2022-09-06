import { Config } from "./types";

export const t: Config = {
  guild_id: "938498570598895676",
  levels: {},
  loaded: false,
  modules: {
    commands: {
      enabled: true,
      prefix: ".",
    },
    utility: {
      enabled: true,
      custom_user_roles: { enabled: true },
    },
    infractions: { enabled: true },
  },
};
