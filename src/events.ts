import { init, kv } from "./globals";
import { fmt } from "./tools/utils";
import { CronEvent } from "./types";

export const cronEvents: Record<string, CronEvent> = {
  load: { run: init },
  reminders: {
    async run() {
      const guildId = discord.getGuildId();
      const items = await kv.reminders.items();

      for (const { key, value } of items) {
        // clean out empty items just in case

        if (value.length === 0) {
          await kv.reminders.delete(key);
          continue;
        }

        for (let i = 0; i < value.length; i++) {
          const reminder = value[i];

          if (reminder.expiry <= Date.now()) {
            const [channelId, messageId] = reminder.location.split("/");

            const channel = await discord.getGuildTextChannel(channelId);

            if (channel === null) {
              value.splice(i);
              continue;
            }

            await channel.sendMessage(
              fmt(
                `<@{user.id}> \`{content}\`\nhttps://discord.com/channels/{guild.id}/{channel.id}/{message.id}`,
                {
                  "guild.id": guildId,
                  "channel.id": channelId,
                  "message.id": messageId,
                  "user.id": key,
                  content: reminder.content || "...",
                }
              )
            );

            value.splice(i);
          }
        }

        if (value.length === 0) {
          kv.reminders.delete(key);
          continue;
        }

        kv.reminders.put(key, value);
      }
    },
  },
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
