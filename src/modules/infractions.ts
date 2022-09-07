import { Snowflake } from "../tools/snowflake";

export enum InfractionTypes {}
export interface InfractionOptions {
  type: InfractionTypes;
  actor: discord.User;
  target: discord.User;
  id: string;
  duration?: number;
  reason?: string;
}
export class Infraction implements InfractionOptions {
  public readonly id: string;
  public readonly type: InfractionTypes;
  public readonly actor: discord.User;
  public readonly target: discord.User;
  public readonly duration: number | undefined;
  public readonly reason: string | undefined;
  constructor(options: InfractionOptions) {
    for (const key in options) {
      this[key] = options[key];
    }
  }

  get active() {
    return (
      Date.now() > Snowflake.timestamp(this.id) + (this.duration || Infinity)!
    );
  }
}
