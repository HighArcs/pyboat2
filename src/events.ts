import { init } from "./globals";
import { CronEvent } from "./types";

export const cronEvents: Record<string, CronEvent> = {
  load: { run: init },
};
export function cron() {
  pylon.tasks.cron("intervals-5", "0 0/5 * * * * *", async () => {
    const now = new Date();
    const min = now.getMinutes();
    for (const key in cronEvents) {
      const value = cronEvents[key];

      const i = Math.floor((value.interval || 5) / 5) * 5;

      if (min % i === 0) {
        try {
          await value.run();
          console.debug(`@tasks/${key} went ok!`);
        } catch (error) {
          if (value.onError) {
            await value.onError(error);
          }
        }
      }
    }
  });
}
