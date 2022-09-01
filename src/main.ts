/// <reference types="@pylonbot/runtime" />
/// <reference types="@pylonbot/runtime-discord" />

import "./modules";

import { cron } from "./events";
import { init } from "./globals";

init();
cron();

discord.on(discord.Event.MESSAGE_CREATE, init);
discord.on(discord.Event.TYPING_START, init);
