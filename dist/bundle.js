'use strict';

var Ranks;
(function (Ranks) {
    Ranks[Ranks["Blacklisted"] = -1] = "Blacklisted";
    Ranks[Ranks["User"] = 0] = "User";
    Ranks[Ranks["Trusted"] = 10] = "Trusted";
    Ranks[Ranks["Helper"] = 30] = "Helper";
    Ranks[Ranks["Moderator"] = 50] = "Moderator";
    Ranks[Ranks["Administrator"] = 100] = "Administrator";
    Ranks[Ranks["ServerOwner"] = 200] = "ServerOwner";
})(Ranks || (Ranks = {}));
var Colours;
(function (Colours) {
    Colours[Colours["Default"] = 0] = "Default";
    Colours[Colours["Aqua"] = 1752220] = "Aqua";
    Colours[Colours["DarkAqua"] = 1146986] = "DarkAqua";
    Colours[Colours["Green"] = 3066993] = "Green";
    Colours[Colours["DarkGreen"] = 2067276] = "DarkGreen";
    Colours[Colours["Blue"] = 3447003] = "Blue";
    Colours[Colours["DarkBlue"] = 2123412] = "DarkBlue";
    Colours[Colours["Purple"] = 10181046] = "Purple";
    Colours[Colours["DarkPurple"] = 7419530] = "DarkPurple";
    Colours[Colours["LuminousVividPink"] = 15277667] = "LuminousVividPink";
    Colours[Colours["DarkVividPink"] = 11342935] = "DarkVividPink";
    Colours[Colours["Gold"] = 15844367] = "Gold";
    Colours[Colours["DarkGold"] = 12745742] = "DarkGold";
    Colours[Colours["Orange"] = 15105570] = "Orange";
    Colours[Colours["DankOrange"] = 11027200] = "DankOrange";
    Colours[Colours["Red"] = 15158332] = "Red";
    Colours[Colours["DarkRed"] = 10038562] = "DarkRed";
    Colours[Colours["Grey"] = 9807270] = "Grey";
    Colours[Colours["DarkGrey"] = 7109249] = "DarkGrey";
    Colours[Colours["DarkerGrey"] = 7506394] = "DarkerGrey";
    Colours[Colours["LighterGrey"] = 12436423] = "LighterGrey";
    Colours[Colours["Navy"] = 3426654] = "Navy";
    Colours[Colours["DarkNavy"] = 2899536] = "DarkNavy";
    Colours[Colours["Yellow"] = 15844367] = "Yellow";
    Colours[Colours["Silver"] = 6323595] = "Silver";
    Colours[Colours["DarkSilver"] = 5533306] = "DarkSilver";
    Colours[Colours["White"] = 16777215] = "White";
    Colours[Colours["Blurple"] = 5793266] = "Blurple";
    Colours[Colours["Greyple"] = 10070709] = "Greyple";
    Colours[Colours["DarkButNotBlack"] = 2895667] = "DarkButNotBlack";
    Colours[Colours["BrandGreen"] = 5763719] = "BrandGreen";
    Colours[Colours["BrandYellow"] = 16705372] = "BrandYellow";
    Colours[Colours["BrandFuchsia"] = 15418782] = "BrandFuchsia";
    Colours[Colours["BrandRed"] = 15548997] = "BrandRed";
    Colours[Colours["BrandBlack"] = 2303786] = "BrandBlack";
    Colours[Colours["Background"] = 3553599] = "Background";
    Colours[Colours["Embed"] = 3092790] = "Embed";
})(Colours || (Colours = {}));
const invisible = "឵឵";

const DefaultOverride = {
    level: 0,
    bypassLevel: 200,
    disabled: false,
    channels_blacklist: [],
    roles_blacklist: [],
};
const DefaultOverrides = {
    "module.commands": { level: 0 },
    "module.utility": { level: 0 },
    "command.ping": { level: 0 },
    "command.help": { level: 0 },
    "command.level": { level: 0 },
    "command.nickme": { level: 200 },
};

const DefaultResponseOptions = {
    ephemeral: false,
    mention: false,
    mentionEveryone: false,
    mentionRoles: [],
    mentionUsers: [],
    reply: true,
};
const respond = Object.assign(async (context, options = DefaultResponseOptions) => {
    if (typeof options === "string") {
        options = { content: options };
    }
    options = Object.assign({}, DefaultResponseOptions, options);
    if (context instanceof discord.interactions.commands.SlashCommandInteraction) {
        const data = {
            allowedMentions: { reply: options.mention },
            content: options.content,
            embeds: options.embeds,
        };
        if (options.ephemeral) {
            if (options.content === undefined) {
                throw new discord.ApiError("Cannot send an ephemeral message without content");
            }
            return context.respondEphemeral(options.content);
        }
        return context.respond(data);
    }
    const data = {
        allowedMentions: {
            reply: options.mention,
            everyone: options.mentionEveryone,
            roles: options.mentionRoles,
            users: options.mentionUsers,
        },
        reply: options.reply ? context.id : undefined,
        attachments: options.attachments,
        content: options.content,
        embed: options.embeds?.[0],
    };
    return await context.reply(data);
}, {
    fmt: async (payload, value, inject = {}, other = DefaultResponseOptions) => {
        return await respond(payload, Object.assign({}, other, {
            content: fmt(value, inject),
        }));
    },
});
function isModuleEnabled(config, key) {
    if (config &&
        config.loaded &&
        config.modules &&
        config.modules[key] &&
        config.modules[key].enabled) {
        return true;
    }
    return false;
}
class ValidationError extends Error {
    constructor(label, reason) {
        super(`Validation error on '${label}': ${reason}`);
        this.label = label;
        this.reason = reason;
    }
}
function fmt(value, inject) {
    let b = value;
    for (const [k, v] of Object.entries(inject)) {
        b = b.split(`{${k}}`).join(String(v));
    }
    return b;
}
async function canRunCommand(config, tree, payload) {
    if (payload.member === null) {
        return "[fail silently]";
    }
    const level = await botLevel(config, payload.member);
    if (level === Ranks.Blacklisted) {
        return "You are not allowed to use commands.";
    }
    if (level >= Ranks.ServerOwner) {
        return true;
    }
    const list = config.modules.commands.overrides || DefaultOverrides;
    for (const branch of tree) {
        // handle criteria.* first
        t: if (branch.startsWith("criteria.")) {
            const s = branch.slice(0, "criteria.".length).split(".");
            let qualifier = config.modules;
            for (const id of s) {
                if (id in qualifier) {
                    qualifier = qualifier[id];
                    continue;
                }
                console.error("unknown criteria in config!");
            }
            if (!!qualifier) {
                break t;
            }
            return fmt("This command cannot be ran due to unmet criteria: {branch}", {
                branch,
            });
        }
        // order:
        // bypass -> global disable -> level -> channel -> role
        const override = Object.assign(DefaultOverride, DefaultOverrides[branch], list[branch]);
        if (override === undefined) {
            continue;
        }
        if (override.bypassLevel) {
            if (level > override.bypassLevel) {
                return true;
            }
        }
        if (override.disabled) {
            return fmt("This command is disabled via the {id} override", {
                id: branch,
            });
        }
        l: if (override.level) {
            if (level > override.level) {
                break l;
            }
            return fmt("You do not meet the required level of **{level}** to use this command.", { level: override.level });
        }
        c: if (override.channels_whitelist && override.channels_whitelist.length) {
            if (override.channels_whitelist.includes(payload.channelId)) {
                break c;
            }
            return fmt("This command is only usable in {channels}", {
                channels: override.channels_whitelist.map((x) => `<#${x}>`).join(", "),
            });
        }
        cb: if (override.channels_blacklist) {
            if (override.channels_blacklist.includes(payload.channelId)) {
                return fmt("This command is not usable in {channels}", {
                    channels: override.channels_blacklist
                        .map((x) => `<#${x}>`)
                        .join(", "),
                });
            }
            break cb;
        }
        r: if (override.roles_whitelist && override.roles_whitelist.length) {
            if (payload.member.roles.some((x) => override.roles_whitelist?.includes(x))) {
                break r;
            }
            return fmt("This command is only usable by {roles}", {
                roles: override.roles_whitelist.map((x) => `<@&${x}>`),
            });
        }
        rb: if (override.roles_blacklist) {
            if (override.roles_blacklist.includes(payload.channelId)) {
                return fmt("This command is not usable by {roles}", {
                    roles: override.roles_blacklist.map((x) => `<#${x}>`).join(", "),
                });
            }
            break rb;
        }
    }
    return true;
}
async function botLevel(config, payload) {
    const levels = [];
    const prefer = config.levels[payload.user.id];
    if (prefer) {
        levels.push(prefer);
    }
    for (const role of payload.roles) {
        const prefer = config.levels[role];
        if (prefer) {
            levels.push(prefer);
        }
    }
    const guild = await payload.getGuild();
    if (payload.user.id === guild.ownerId) {
        levels.push(Ranks.ServerOwner);
    }
    if (payload.can(8 /* ADMINISTRATOR */)) {
        levels.push(Ranks.Administrator);
    }
    if (levels.includes(Ranks.Blacklisted)) {
        return Ranks.Blacklisted;
    }
    return Math.max(...levels);
}

const kv = {
    config: new pylon.KVNamespace("@internals/config"),
};
const encoding = {
    to: new TextEncoder(),
    from: new TextDecoder(),
};
const DefaultConfig = {
    guild_id: discord.getGuildId(),
    levels: {},
    loaded: false,
    modules: {
        commands: { enabled: false },
        utility: { enabled: false },
    },
};
const commandList = [];
let config = DefaultConfig;
let commands = new discord.command.CommandGroup({});
async function init() {
    if (config.loaded === true) {
        return;
    }
    // load config;
    const data = await kv.config.get("data");
    if (data) {
        config = Object.assign({}, DefaultConfig, data);
    }
    config.loaded = true;
    cmd: if (isModuleEnabled(config, "commands")) {
        const allPrefixes = Array.isArray(config.modules.commands?.prefix)
            ? config.modules.commands?.prefix
            : [config.modules.commands?.prefix];
        if (allPrefixes.length === 0) {
            break cmd;
        }
        commands = new discord.command.CommandGroup({
            defaultPrefix: allPrefixes[0],
            additionalPrefixes: allPrefixes,
            label: "@global",
            mentionPrefix: config.modules.commands?.mention,
        });
        for (const l of commandList) {
            commands.on(l.options, l.args, l.handler);
        }
    }
}
function validateConfig(config) {
    const errors = [];
    if (config.guild_id !== discord.getGuildId()) {
        errors.push(new ValidationError("config.guildId", "not in this guild"));
    }
    if (config.loaded === false) {
        errors.push(new ValidationError("config.loaded", "config is not yet loaded, send a message to activate"));
        return errors;
    }
    if (!("modules" in config) || config.modules === undefined) {
        errors.push(new ValidationError("config.modules", "no modules were defined"));
        return errors;
    }
    for (const key in DefaultConfig.modules) {
        if (!(key in config.modules) || !("enabled" in config.modules[key])) {
            errors.push(new ValidationError(`config.modules.${key}`, "module was missing, use { enabled: false } to disable a module"));
        }
        // module specific
        const module = config.modules[key];
        switch (key) {
            case "commands": {
                if (!module.prefix || !module.prefix.length) {
                    errors.push(new ValidationError("config.modules.commands.prefix", "need at least 1 prefix"));
                }
            }
        }
    }
    return errors;
}

class Err extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
    toString() {
        return fmt("Err({status}): {message}", {
            message: this.message,
            status: this.status,
        });
    }
}
class NotImplementedError extends Error {
    constructor(name) {
        super(fmt("{name} is not implemented.", { name }));
        this.name = name;
    }
}

function on(tree, options, args, handler, group = commands) {
    if (typeof options === "string") {
        options = { name: options };
    }
    const name = options.name;
    if (!tree.includes(`command.${name}`)) {
        tree.push(`command.${name}`);
    }
    if ("tree" in group && group["tree"]) {
        tree = [...group["tree"], ...tree];
    }
    group.on({
        onError(ctx, e) {
            if (e instanceof Err) {
                respond.fmt(ctx.message, ":x: `{e}`", { e });
            }
            respond.fmt(ctx.message, ":x: Error happened while running command: ```js\n{e}\n```", { e: e.stack });
        },
        ...options,
    }, args, async (payload, args, ctx) => {
        const value = await canRunCommand(config, tree, payload);
        if (typeof value === "string") {
            return await respond(payload, {
                content: value,
            });
        }
        return await handler(payload, args, ctx);
    });
}
function raw(tree, options, handler, group = commands) {
    return on(tree, options, (args) => ({ text: args.textOptional() }), handler);
}
function sub(tree, options, group = commands) {
    const p = group.subcommandGroup(options);
    p["tree"] = tree;
    return p;
}

var Embed;
(function (Embed) {
    function user(payload, embed = new discord.Embed()) {
        if (payload.member === null) {
            return embed;
        }
        embed.setAuthor({
            name: payload.member.user.getTag(),
            url: fmt("https://discord.com/users/{id}", {
                id: payload.member.user.id,
            }),
            iconUrl: payload.member.user.getAvatarUrl(),
        });
        embed.setColor(Colours.Embed);
        return embed;
    }
    Embed.user = user;
})(Embed || (Embed = {}));

var Markdown;
(function (Markdown) {
    /**
     * An enumeration of all the valid Discord timestamp styles.
     */
    let TimestampStyles;
    (function (TimestampStyles) {
        TimestampStyles["BOTH_LONG"] = "F";
        TimestampStyles["BOTH_SHORT"] = "f";
        TimestampStyles["DATE_LONG"] = "D";
        TimestampStyles["DATE_SHORT"] = "d";
        TimestampStyles["RELATIVE"] = "R";
        TimestampStyles["TIME_LONG"] = "T";
        TimestampStyles["TIME_SHORT"] = "t";
    })(TimestampStyles = Markdown.TimestampStyles || (Markdown.TimestampStyles = {}));
    /**
     * Utility to cut messages by bytes and not characters
     */
    function trueSlice(text, limit) {
        if (limit) {
            return new TextDecoder().decode(new TextEncoder().encode(text).slice(0, limit));
        }
        return text;
    }
    Markdown.trueSlice = trueSlice;
    /**
     * Object that holds all the Discord Markup identifiers.
     */
    Markdown.Strings = {
        BOLD: "**",
        CODEBLOCK: "```",
        CODESTRING: "`",
        CODESTRING_DOUBLE: "``",
        ESCAPE: "\\",
        ITALICS: "_",
        SPOILER: "||",
        STRIKE: "~~",
        UNDERLINE: "__",
    };
    /**
     * Object that maps all the Discord Markup identifiers to their respective RegExp matchers.
     */
    const Regexes = {
        [Markdown.Strings.BOLD]: /\*\*/g,
        [Markdown.Strings.CODEBLOCK]: new RegExp(Markdown.Strings.CODEBLOCK, "g"),
        [Markdown.Strings.CODESTRING]: new RegExp(Markdown.Strings.CODESTRING, "g"),
        [Markdown.Strings.ESCAPE]: /\\/g,
        [Markdown.Strings.ITALICS]: /(_|\*)/g,
        [Markdown.Strings.SPOILER]: /\|\|/g,
        [Markdown.Strings.STRIKE]: new RegExp(Markdown.Strings.STRIKE, "g"),
        [Markdown.Strings.UNDERLINE]: new RegExp(Markdown.Strings.UNDERLINE, "g"),
        EVERYONE: /@(everyone|here)/g,
        LINK: /\]\(/g,
        MENTION: /<@([!&]?[0-9]{16,21})>/g,
        MENTION_HARDCORE: /@/g,
        URL: /\)/g,
    };
    /**
     * Object to replace Discord Markup identifiers with when escaping strings.
     */
    const Replacements = {
        [Markdown.Strings.BOLD]: "\\*\\*",
        [Markdown.Strings.CODEBLOCK]: "``\u200b`",
        [Markdown.Strings.CODESTRING]: "\\`",
        [Markdown.Strings.ESCAPE]: "\\\\",
        [Markdown.Strings.ITALICS]: "\\$1",
        [Markdown.Strings.SPOILER]: "\\|\\|",
        [Markdown.Strings.STRIKE]: "\\~\\~",
        [Markdown.Strings.UNDERLINE]: "\\_\\_",
        MENTION: "\u200b",
    };
    /**
     * Utility to escape some Discord Markup Identifier
     */
    function EscapeBasic(raw, key) {
        return raw.replace(Regexes[key], Replacements[key]);
    }
    Markdown.EscapeBasic = EscapeBasic;
    /**
     * Object of all the Escape functions used to apply mixed markup
     */
    Markdown.Escape = Object.keys(Markdown.Strings).reduce((p, v) => Object.assign(p, { [v]: (raw) => EscapeBasic(raw, v) }), {});
    /**
     * String formatting for freezing Discord timestamps that have the Relative (R) flag
     */
    const FrozenTimestampStyles = {
        [TimestampStyles.BOTH_LONG]: "{day}, {month} {date}, {year} {hour}:{minute} {meridian}",
        [TimestampStyles.BOTH_SHORT]: "{month} {date}, {year} {hour}:{minute} {meridian}",
        [TimestampStyles.DATE_LONG]: "{month} {date}, {year}",
        [TimestampStyles.DATE_SHORT]: "{month_short}/{date}/{year}",
        [TimestampStyles.RELATIVE]: "{relative}",
        [TimestampStyles.TIME_LONG]: "{hour}:{minute}:{second} {meridian}",
        [TimestampStyles.TIME_SHORT]: "{hour}:{minute} {meridian}",
    };
    /**
     * Converter for number to Days of the Week
     */
    const Days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
    };
    /**
     * Converter for number to Months of the Year
     */
    const Months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December",
    };
    /**
     * Converts a Date object to a Timestamp object
     */
    function formatDate(date) {
        return {
            relative: toTimeString(date.getTime(), TimestampUnits),
            raw: date.getTime(),
            date: date.getDate().toString().padStart(2, "0"),
            day: Days[date.getDay()],
            hour: date.getHours().toString().padStart(2, "0"),
            meridian: date.getHours() > 12 ? "PM" : "AM",
            minute: date.getMinutes().toString().padStart(2, "0"),
            month: Months[date.getMonth()],
            month_short: (date.getMonth() + 1).toString().padStart(2, "0"),
            second: date.getSeconds().toString().padStart(2, "0"),
            year: date.getFullYear().toString(),
        };
    }
    Markdown.formatDate = formatDate;
    /**
     * Collectively multiplies bigints together
     */
    function multiplyLarge(...nums) {
        return nums.map(BigInt).reduce((p, v) => (p *= v), 1n);
    }
    Markdown.multiplyLarge = multiplyLarge;
    /**
     * Get the absolute value of a bigint
     */
    function bigintAbs(int) {
        if (int < 0)
            return -int;
        return int;
    }
    Markdown.bigintAbs = bigintAbs;
    /**
     * Object of Units matched with their string representations.
     */
    const TimestampUnits = {
        myriad: multiplyLarge(10, 10, 10, 10, 12, 4, 7, 24, 60, 1000),
        millenium: multiplyLarge(10, 10, 10, 12, 4, 7, 24, 60, 1000),
        century: multiplyLarge(10, 10, 12, 4, 7, 24, 60, 1000),
        decade: multiplyLarge(10, 12, 4, 7, 24, 60, 60, 1000),
        year: multiplyLarge(12, 4, 7, 24, 60, 60, 1000),
        month: multiplyLarge(4, 7, 24, 60, 60, 1000),
        week: multiplyLarge(7, 24, 60, 60, 1000),
        day: multiplyLarge(24, 60, 60, 1000),
        hour: multiplyLarge(60, 60, 1000),
        minute: multiplyLarge(60, 1000),
        second: multiplyLarge(1000),
        millisecond: multiplyLarge(1),
    };
    /**
     * Converts a UNIX timestamp to a Relative String
     */
    function toTimeString(unix, units = TimestampUnits, isFromNow = false, limit) {
        if (typeof unix === "number")
            unix = BigInt(unix);
        if (isFromNow)
            unix = bigintAbs(unix - BigInt(Date.now()));
        if (unix === 0n)
            return "0 milliseconds";
        const formatted = new Map();
        const unitList = Object.entries(units);
        let run = unix;
        for (const [unit, value] of unitList) {
            if (run < value)
                continue;
            const runs = run / value + 1n;
            for (let loop = 0; loop <= runs; loop++) {
                if (run < value)
                    break;
                const item = formatted.get(unit);
                if (item)
                    formatted.set(unit, item + 1);
                else
                    formatted.set(unit, 1);
                run -= value;
            }
        }
        let returned = [];
        for (const [key, value] of formatted) {
            const unit = String(key) + (value === 1 ? "" : "s");
            returned.push(`${value} ${unit}`);
        }
        if (limit !== undefined) {
            returned = returned.slice(0, limit);
        }
        return returned.join(", ");
    }
    Markdown.toTimeString = toTimeString;
    /**
     * Freezes a UNIX timestamp into some time string based on the Timestamp Style
     */
    function freezeUnix(unix, style) {
        const date = new Date(unix);
        const timestamp = formatDate(date);
        let ret = FrozenTimestampStyles[style];
        for (const [key, value] of Object.entries(timestamp)) {
            ret = ret.split(`{${key}}`).join(value);
        }
        return ret;
    }
    Markdown.freezeUnix = freezeUnix;
    /**
     * Instanced Class for formatting strings into their Markup variants
     */
    class FormatInner {
        constructor(raw) {
            this.static = FormatInner;
            if (raw instanceof FormatInner) {
                raw = raw.raw;
            }
            this.raw = raw;
        }
        toString() {
            return this.raw;
        }
        valueOf() {
            return this.raw;
        }
        italics() {
            return this.build("ITALICS", this.raw);
        }
        bold() {
            return this.build("BOLD", this.raw);
        }
        codestring() {
            const useDouble = this.raw.includes(Markdown.Strings.CODESTRING);
            if (useDouble) {
                return this.codestringDouble();
            }
            return this.codestringSingle();
        }
        codestringDouble() {
            return this.build("CODESTRING_DOUBLE", this.raw);
        }
        codestringSingle() {
            return this.build("CODESTRING", this.raw);
        }
        codeblock(language) {
            let full = "";
            if (language) {
                full += language + "\n";
            }
            full += this.raw;
            return this.build("CODEBLOCK", full);
        }
        spoiler() {
            return this.build("SPOILER", this.raw);
        }
        strike() {
            return this.build("STRIKE", this.raw);
        }
        underline() {
            return this.build("UNDERLINE", this.raw);
        }
        build(key, w) {
            const escaped = Markdown.Escape[key](w, key);
            const ret = this.static.wrap(escaped, Markdown.Strings[key]);
            return new this.static(ret);
        }
        static wrap(raw, what) {
            return `${what}${raw}${what}`;
        }
        [Symbol.toStringTag]() {
            return this.toString();
        }
    }
    /**
     * Formats strings into their Markup Variants
     */
    class Format extends FormatInner {
        static bold(text) {
            return new this(text).bold();
        }
        static build(text, key) {
            return new this(text).build(key, text);
        }
        static codeblock(text, language) {
            return new this(text).codeblock(language);
        }
        static codestring(text) {
            return new this(text).codestring();
        }
        static codestringSingle(text) {
            return new this(text).codestringSingle();
        }
        static codestringDouble(text) {
            return new this(text).codestringDouble();
        }
        static italics(text) {
            return new this(text).italics();
        }
        static spoiler(text) {
            return new this(text).spoiler();
        }
        static strike(text) {
            return new this(text).strike();
        }
        static underline(text) {
            return new this(text).underline();
        }
        static timestamp(unix, format = TimestampStyles.BOTH_SHORT, isSeconds = false) {
            if (typeof unix === "string")
                unix = Number(unix);
            if (unix instanceof Date)
                unix = unix.getTime();
            if (!isSeconds) {
                unix /= 1000;
            }
            unix = Math.floor(unix);
            return new this(`<t:${unix}:${format}>`);
        }
        static date(unix, format = TimestampStyles.BOTH_SHORT, isSeconds = false) {
            if (typeof unix === "string")
                unix = Number(unix);
            if (unix instanceof Date)
                unix = unix.getTime();
            if (isSeconds) {
                unix *= 1000;
            }
            return new this(freezeUnix(unix, format));
        }
        static link(text, url) {
            if (url instanceof URL)
                url = url.href;
            return new this(`[${text}](${url})`);
        }
    }
    Markdown.Format = Format;
    /**
     * Enumeration of names used in the Matching process
     */
    let DiscordRegexNames;
    (function (DiscordRegexNames) {
        DiscordRegexNames["EMOJI"] = "EMOJI";
        DiscordRegexNames["JUMP_CHANNEL"] = "JUMP_CHANNEL";
        DiscordRegexNames["JUMP_CHANNEL_MESSAGE"] = "JUMP_CHANNEL_MESSAGE";
        DiscordRegexNames["MENTION_CHANNEL"] = "MENTION_CHANNEL";
        DiscordRegexNames["MENTION_ROLE"] = "MENTION_ROLE";
        DiscordRegexNames["MENTION_USER"] = "MENTION_USER";
        DiscordRegexNames["TEXT_BOLD"] = "TEXT_BOLD";
        DiscordRegexNames["TEXT_CODEBLOCK"] = "TEXT_CODEBLOCK";
        DiscordRegexNames["TEXT_CODESTRING"] = "TEXT_CODESTRING";
        DiscordRegexNames["TEXT_ITALICS"] = "TEXT_ITALICS";
        DiscordRegexNames["TEXT_SNOWFLAKE"] = "TEXT_SNOWFLAKE";
        DiscordRegexNames["TEXT_SPOILER"] = "TEXT_SPOILER";
        DiscordRegexNames["TEXT_STRIKE"] = "TEXT_STRIKE";
        DiscordRegexNames["TEXT_UNDERLINE"] = "TEXT_UNDERLINE";
        DiscordRegexNames["TEXT_URL"] = "TEXT_URL";
    })(DiscordRegexNames = Markdown.DiscordRegexNames || (Markdown.DiscordRegexNames = {}));
    /**
     * Mapping of Matching Names to their respective Regular Expressions
     */
    Markdown.DiscordRegex = {
        [DiscordRegexNames.EMOJI]: /<a?:(\w+):(\d+)>/g,
        [DiscordRegexNames.JUMP_CHANNEL]: /^(?:https?):\/\/(?:(?:(?:canary|ptb)\.)?(?:discord|discordapp)\.com\/channels\/)(@me|\d+)\/(\d+)$/g,
        [DiscordRegexNames.JUMP_CHANNEL_MESSAGE]: /^(?:https?):\/\/(?:(?:(?:canary|ptb)\.)?(?:discord|discordapp)\.com\/channels\/)(@me|\d+)\/(\d+)\/(\d+)$/g,
        [DiscordRegexNames.MENTION_CHANNEL]: /<#(\d+)>/g,
        [DiscordRegexNames.MENTION_ROLE]: /<@&(\d+)>/g,
        [DiscordRegexNames.MENTION_USER]: /<@(!?)(\d+)>/g,
        [DiscordRegexNames.TEXT_BOLD]: /\*\*([\s\S]+?)\*\*/g,
        [DiscordRegexNames.TEXT_CODEBLOCK]: /```(([a-z0-9-]+?)\n+)?\n*([^]+?)\n*```/gi,
        [DiscordRegexNames.TEXT_CODESTRING]: /`([\s\S]+?)`/g,
        [DiscordRegexNames.TEXT_ITALICS]: /_([\s\S]+?)_|\*([\s\S]+?)\*/g,
        [DiscordRegexNames.TEXT_SNOWFLAKE]: /(\d+)/g,
        [DiscordRegexNames.TEXT_SPOILER]: /\|\|([\s\S]+?)\|\|/g,
        [DiscordRegexNames.TEXT_STRIKE]: /~~([\s\S]+?)~~(?!_)/g,
        [DiscordRegexNames.TEXT_UNDERLINE]: /__([\s\S]+?)__/g,
        [DiscordRegexNames.TEXT_URL]: /((?:https?):\/\/[^\s<]+[^<.,:;"'\]\s])/g,
    };
    class MatchInner {
        constructor(raw) {
            this.static = MatchInner;
            this.raw = raw;
        }
        emoji() {
            return this.match(DiscordRegexNames.EMOJI);
        }
        jumpChannel() {
            return this.match(DiscordRegexNames.JUMP_CHANNEL);
        }
        jumpChannelMessage() {
            return this.match(DiscordRegexNames.JUMP_CHANNEL_MESSAGE);
        }
        mentionChannel() {
            return this.match(DiscordRegexNames.MENTION_CHANNEL);
        }
        mentionRole() {
            return this.match(DiscordRegexNames.MENTION_ROLE);
        }
        mentionUser() {
            return this.match(DiscordRegexNames.MENTION_USER);
        }
        codeblock() {
            return this.match(DiscordRegexNames.TEXT_CODEBLOCK);
        }
        bold() {
            return this.match(DiscordRegexNames.TEXT_BOLD);
        }
        codestring() {
            return this.match(DiscordRegexNames.TEXT_CODESTRING);
        }
        italics() {
            return this.match(DiscordRegexNames.TEXT_ITALICS);
        }
        snowflake() {
            return this.match(DiscordRegexNames.TEXT_SNOWFLAKE);
        }
        spoiler() {
            return this.match(DiscordRegexNames.TEXT_SPOILER);
        }
        strike() {
            return this.match(DiscordRegexNames.TEXT_STRIKE);
        }
        underline() {
            return this.match(DiscordRegexNames.TEXT_UNDERLINE);
        }
        url() {
            return this.match(DiscordRegexNames.TEXT_URL);
        }
        match(type, onlyFirst = false) {
            const regex = Markdown.DiscordRegex[type];
            if (regex === undefined) {
                throw new global.Error(`Unknown regex type: ${type}`);
            }
            regex.lastIndex = 0;
            const payload = {
                match: { regex, type },
                matches: [],
            };
            let match = null;
            while ((match = regex.exec(this.raw))) {
                const result = { matched: match[0], species: type };
                switch (type) {
                    case DiscordRegexNames.EMOJI:
                        {
                            result.name = match[1];
                            result.id = match[2];
                            result.animated = this.raw.startsWith("<a:");
                        }
                        break;
                    case DiscordRegexNames.JUMP_CHANNEL:
                        {
                            result.guildId = match[1];
                            result.channelId = match[2];
                        }
                        break;
                    case DiscordRegexNames.JUMP_CHANNEL_MESSAGE:
                        {
                            result.guildId = match[1];
                            result.channelId = match[2];
                            result.messageId = match[3];
                        }
                        break;
                    case DiscordRegexNames.MENTION_CHANNEL:
                    case DiscordRegexNames.MENTION_ROLE:
                        {
                            result.id = match[1];
                        }
                        break;
                    case DiscordRegexNames.MENTION_USER:
                        {
                            result.id = match[2];
                            result.mentionType = match[1];
                        }
                        break;
                    case DiscordRegexNames.TEXT_CODEBLOCK:
                        {
                            result.language = match[2];
                            result.text = match[3];
                        }
                        break;
                    case DiscordRegexNames.TEXT_BOLD:
                    case DiscordRegexNames.TEXT_CODESTRING:
                    case DiscordRegexNames.TEXT_ITALICS:
                    case DiscordRegexNames.TEXT_SNOWFLAKE:
                    case DiscordRegexNames.TEXT_SPOILER:
                    case DiscordRegexNames.TEXT_STRIKE:
                    case DiscordRegexNames.TEXT_UNDERLINE:
                    case DiscordRegexNames.TEXT_URL:
                        {
                            result.text = match[1];
                        }
                        break;
                    default: {
                        throw new global.Error(`Unknown regex type: ${type}`);
                    }
                }
                payload.matches.push(result);
                if (onlyFirst) {
                    break;
                }
            }
            regex.lastIndex = 0;
            return payload;
        }
    }
    class Match extends MatchInner {
        static bold(raw) {
            return new this(raw).bold();
        }
        static codeblock(raw) {
            return new this(raw).codeblock();
        }
        static codestring(raw) {
            return new this(raw).codestring();
        }
        static emoji(raw) {
            return new this(raw).emoji();
        }
        static italics(raw) {
            return new this(raw).italics();
        }
        static jumpChannel(raw) {
            return new this(raw).jumpChannel();
        }
        static jumpChannelMessage(raw) {
            return new this(raw).jumpChannelMessage();
        }
        static match(raw, what, onlyFirst = false) {
            return new this(raw).match(what, onlyFirst);
        }
        static mentionChannel(raw) {
            return new this(raw).mentionChannel();
        }
        static mentionRole(raw) {
            return new this(raw).mentionRole();
        }
        static mentionUser(raw) {
            return new this(raw).mentionUser();
        }
        static snowflake(raw) {
            return new this(raw).snowflake();
        }
        static spoiler(raw) {
            return new this(raw).spoiler();
        }
        static strike(raw) {
            return new this(raw).strike();
        }
        static underline(raw) {
            return new this(raw).underline();
        }
        static url(raw) {
            return new this(raw).url();
        }
    }
    Markdown.Match = Match;
})(Markdown || (Markdown = {}));

var Parameters;
(function (Parameters) {
    async function member(payload, text) {
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
    Parameters.member = member;
})(Parameters || (Parameters = {}));

raw(["module.commands"], "ping", async (payload) => {
    respond(payload, "pong");
});
raw(["module.commands"], "help", async (payload) => {
    const embed = Embed.user(payload);
    embed.setDescription(fmt(`PyBoat is a rowboat clone built on top of {pylon}
        
        It features several utility, moderation, and general automation features.

        {documentation}
        {homepage}
        {support}`, {
        documentation: Markdown.Format.link("Documentation", "https://docs.pyboat.i0.tf/"),
        homepage: Markdown.Format.link("Homepage", "https://pyboat.i0.tf/"),
        pylon: Markdown.Format.link("Pylon", "https://pylon.bot"),
        support: Markdown.Format.link("Support", "https://discord.gg/gQnFerx2tv"),
    }));
    respond(payload, {
        embeds: [embed],
    });
});
on(["module.commands"], "level", (args) => ({ member: args.textOptional() }), async (payload, args) => {
    const member = await Parameters.member(payload, args.member);
    const level = await botLevel(config, member);
    if (args.member !== null &&
        level < (config.modules.commands.level_allow_view_others || 0)) {
        throw new Err(403, "You are not allowed to see other member's levels");
    }
    return await respond.fmt(payload, args.member === null
        ? "Your bot level is **{level}**"
        : "<@{user.id}>'s bot level is **{level}**", { "user.id": member.user.id, level });
});
on(["module.commands"], "nickme", (args) => ({ text: args.textOptional() }), async (payload, args) => {
    const guild = await payload.getGuild();
    const me = await guild.getMember(discord.getBotId());
    try {
        await me.edit({
            nick: args.text === "invisible" ? invisible : args.text || undefined,
        });
        return await respond(payload, "ok!");
    }
    catch (e) {
        throw new Err(500, e);
    }
});
sub(["module.utility", "group.random"], "random");

// these always need to be available
const configContainer = new discord.command.CommandGroup({
    defaultPrefix: "!!",
});
const key = "data";
configContainer.on("config", (args) => ({ flag: args.stringOptional() }), async (payload, args) => {
    if (args.flag) {
        switch (args.flag) {
            case "-d": {
                const has = await kv.config.get(key);
                if (has) {
                    await kv.config.delete(key);
                    return await respond(payload, {
                        content: "ok! deleted the stored config",
                    });
                }
                return await respond(payload, {
                    content: "there's no config to delete",
                });
            }
            case "-v": {
                const has = await kv.config.get(key);
                if (has) {
                    await respond(payload, {
                        attachments: [
                            {
                                name: "config.json",
                                data: encoding.to.encode(JSON.stringify(has, null, 2)).buffer,
                            },
                        ],
                    });
                    return;
                }
                return await respond(payload, {
                    content: "you have no config!",
                });
            }
            default: {
                return await respond.fmt(payload, `unknown flag '{flag}', valid flags are \`-d\`, \`-v\``, { flag: args.flag });
            }
        }
    }
    const attachment = payload.attachments.at(0);
    if (attachment === undefined) {
        return await respond(payload, "you need to upload a file");
    }
    const res = await fetch(attachment.url);
    const text = await res.text();
    let json = null;
    try {
        json = JSON.parse(text);
    }
    catch (e) {
        return await respond.fmt(payload, `error while parsing your config: {error}`, { error: e });
    }
    if (json === null) {
        return await respond.fmt(payload, "unknown error while parsing your config");
    }
    const checks = validateConfig(json);
    json["loaded"] = undefined;
    if (checks.length) {
        return await respond.fmt(payload, "your config contains errors:\n{errors}", {
            errors: checks.map((x) => `[${x.label}]: \`${x.reason}\``).join("\n"),
        });
    }
    await kv.config.put(key, json);
    await respond.fmt(payload, "ok! uploaded your config");
    init();
});

const devContainer = new discord.command.CommandGroup({
    defaultPrefix: "p/",
});
devContainer.raw("modules", async (payload) => {
    const modules = Object.entries(config.modules);
    const enabled = modules.filter((x) => x[1].enabled).map((x) => x[0]);
    const disabled = modules.filter((x) => !x[1].enabled).map((x) => x[0]);
    return await respond(payload, `**enabled**: ${enabled.toLocaleString()}\n**disabled**: ${disabled.toLocaleString()}`);
});
devContainer.raw("check", async (payload) => {
    const checks = validateConfig(config);
    if (checks.length) {
        return await respond.fmt(payload, "your config contains errors:\n{errors}", {
            errors: checks.map((x) => `[${x.label}]: \`${x.reason}\``).join("\n"),
        });
    }
});

raw(["module.utility"], "server", async (payload) => {
    throw new NotImplementedError("utilities.info.guild");
});
raw(["module.utility"], "info", async (payload) => {
    throw new NotImplementedError("utilities.info.user");
});
on(["module.utility"], "avatar", (args) => ({ member: args.textOptional() }), async (payload, args) => {
    const member = await Parameters.member(payload, args.member);
    const embed = Embed.user(payload);
    embed.setTitle(fmt("Avatar of {user.tag}", { "user.tag": member.user.getTag() }));
    embed.setImage({
        url: member.user.getAvatarUrl(),
    });
    return await respond(payload, { embeds: [embed] });
});

const cronEvents = {
    load: { run: init },
};
function cron() {
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
                }
                catch (error) {
                    if (value.onError) {
                        await value.onError(error);
                    }
                }
            }
        }
    });
}

/// <reference types="@pylonbot/runtime" />
init();
cron();
discord.on("MESSAGE_CREATE" /* MESSAGE_CREATE */, init);
discord.on("TYPING_START" /* TYPING_START */, init);
