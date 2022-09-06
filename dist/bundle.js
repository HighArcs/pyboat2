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
const HtmlColours = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dodgerblue: 0x1e90ff,
    feldspar: 0xd19275,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgrey: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslateblue: 0x8470ff,
    lightslategray: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370d8,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xd87093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    violetred: 0xd02090,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32,
};
const invisible = "឵឵";
const Units = {
    ms: 1,
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    w: 7 * 60 * 60 * 1000,
    mo: 30 * 7 * 60 * 60 * 1000,
    y: 12 * 30 * 7 * 60 * 60 * 1000,
    d: 10 * 12 * 30 * 7 * 60 * 60 * 1000,
    c: 10 * 10 * 12 * 30 * 7 * 60 * 60 * 1000,
    mil: 10 * 10 * 10 * 12 * 30 * 7 * 60 * 60 * 1000,
};

const UMP = {};
function inspect(value, { depth = 2, hidden = false } = {}) {
    if (is.number(value))
        return `${value}`;
    if (is.regexp(value))
        return `${value}`;
    if (is.bigint(value))
        return `${value}n`;
    if (is.nullish(value))
        return `${value}`;
    if (is.boolean(value))
        return `${value}`;
    if (is.function(value))
        return `${value}`;
    if (is.error(value))
        return `${value.stack}`;
    if (is.date(value))
        return value.toISOString();
    if (is.string(value))
        return JSON.stringify(value)
            .replace(/'/g, "\\'")
            .replace(/\\"/g, '"')
            .replace(/^"(.*)"$/g, "'$1'");
    if (is.promise(value))
        return Promise.race([value, UMP]).then((v) => `Promise { <${v === UMP ? "pending" : "fulfilled"}> }`, () => "Promise { <rejected> }");
    return oldInspect(value, { depth, hidden });
}
const is = {
    // typeof
    string: (v) => typeof v === "string",
    number: (v) => typeof v === "number",
    bigint: (v) => typeof v === "bigint",
    boolean: (v) => typeof v === "boolean",
    function: (v) => typeof v === "function",
    undefined: (v) => typeof v === "undefined",
    object: (v) => typeof v === "object" && !is.null(v),
    // instanceof
    date: (v) => v instanceof Date,
    error: (v) => v instanceof Error,
    regexp: (v) => v instanceof RegExp,
    promise: (v) => v instanceof Promise,
    null: (v) => v === null,
    array: (v) => Array.isArray(v),
    multi: (m, v) => m.some((k) => is[k](v)),
    digit: (v) => is.number(v) || is.bigint(v),
    nullish: (v) => is.null(v) || is.undefined(v),
};
function oldInspect(obj, { depth = 2, hidden = false } = {}) {
    const ctx = {
        depth,
        hidden,
        seen: [],
        stylize: (v) => v,
        showHidden: hidden,
    };
    return formatValue(ctx, obj, ctx.depth);
}
function hasOwn(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
function arrayToHash(array) {
    var hash = {};
    array.forEach(function (val, idx) {
        hash[val] = true;
    });
    return hash;
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
        if (hasOwn(value, String(i))) {
            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
        }
        else {
            output.push("");
        }
    }
    keys.forEach(function (key) {
        if (!key.match(/^\d+$/)) {
            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
        }
    });
    return output;
}
function formatError(value) {
    return "[" + Error.prototype.toString.call(value) + "]";
}
function formatValue(ctx, value, recurseTimes) {
    if (is.multi(["digit", "string", "boolean", "nullish"], value))
        return inspect(value);
    // Look up the keys of the object.
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);
    try {
        if (ctx.showHidden && Object.getOwnPropertyNames) {
            keys = Object.getOwnPropertyNames(value);
        }
    }
    catch (e) {
        // ignore
    }
    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (is.error(value) &&
        (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
        return formatError(value);
    }
    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
        if (is.function(value)) {
            var name = value.name ? ": " + value.name : "";
            return ctx.stylize("[Function" + name + "]", "special");
        }
        if (is.regexp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        if (is.date(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), "date");
        }
        if (is.error(value)) {
            return formatError(value);
        }
    }
    var base = "", array = false, braces = ["{", "}"];
    // Make Array say that they are Array
    if (Array.isArray(value)) {
        array = true;
        braces = ["[", "]"];
    }
    // Make functions say that they are functions
    if (is.function(value)) {
        var n = value.name ? ": " + value.name : "";
        base = " [Function" + n + "]";
    }
    // Make RegExps say that they are RegExps
    if (is.regexp(value)) {
        base = " " + RegExp.prototype.toString.call(value);
    }
    // Make dates with properties first say the date
    if (is.date(value)) {
        base = " " + Date.prototype.toUTCString.call(value);
    }
    // Make error with message first say the error
    if (is.error(value)) {
        base = " " + formatError(value);
    }
    if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
    }
    if (recurseTimes < 0) {
        if (is.regexp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
        }
        else {
            return ctx.stylize("[Object]", "special");
        }
    }
    ctx.seen.push(value);
    var output;
    if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    }
    else {
        output = keys.map(function (key) {
            return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
    }
    ctx.seen.pop();
    return reduceToSingleString(output, base, braces);
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = { value: void 0 };
    try {
        // ie6 › navigator.toString
        // throws Error: Object doesn't support this property or method
        desc.value = value[key];
    }
    catch (e) {
        // ignore
    }
    try {
        // ie10 › Object.getOwnPropertyDescriptor(window.location, 'hash')
        // throws TypeError: Object doesn't support this action
        if (Object.getOwnPropertyDescriptor) {
            desc = Object.getOwnPropertyDescriptor(value, key) || desc;
        }
    }
    catch (e) {
        // ignore
    }
    if (desc.get) {
        if (desc.set) {
            str = ctx.stylize("[Getter/Setter]", "special");
        }
        else {
            str = ctx.stylize("[Getter]", "special");
        }
    }
    else {
        if (desc.set) {
            str = ctx.stylize("[Setter]", "special");
        }
    }
    if (!hasOwn(visibleKeys, key)) {
        name = "[" + key + "]";
    }
    if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
            if (is.null(recurseTimes)) {
                str = formatValue(ctx, desc.value, null);
            }
            else {
                str = formatValue(ctx, desc.value, recurseTimes - 1);
            }
            if (str.indexOf("\n") > -1) {
                if (array) {
                    str = str
                        .split("\n")
                        .map(function (line) {
                        return "  " + line;
                    })
                        .join("\n")
                        .substr(2);
                }
                else {
                    str =
                        "\n" +
                            str
                                .split("\n")
                                .map(function (line) {
                                return "   " + line;
                            })
                                .join("\n");
                }
            }
        }
        else {
            str = ctx.stylize("[Circular]", "special");
        }
    }
    if (is.undefined(name)) {
        if (array && key.match(/^\d+$/)) {
            return str;
        }
        name = JSON.stringify("" + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.substr(1, name.length - 2);
            name = ctx.stylize(name, "name");
        }
        else {
            name = name
                .replace(/'/g, "\\'")
                .replace(/\\"/g, '"')
                .replace(/(^"|"$)/g, "'");
            name = ctx.stylize(name, "string");
        }
    }
    return name + ": " + str;
}
function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function (prev, cur) {
        if (cur.indexOf("\n") >= 0)
            ;
        return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    if (length > 60) {
        return (braces[0] +
            (base === "" ? "" : base + "\n ") +
            " " +
            output.join(",\n  ") +
            " " +
            braces[1]);
    }
    return braces[0] + base + " " + output.join(", ") + " " + braces[1];
}

class KV {
    constructor(namespace) {
        this.kv = new pylon.KVNamespace(namespace);
    }
    get namespace() {
        return this.kv.namespace;
    }
    async get(key) {
        return this.kv.get(key);
    }
    async put(key, value, options = {}) {
        this.kv.put(key, value, options);
        return this;
    }
    async has(key) {
        return (await this.get(key)) !== undefined;
    }
    async cas(key, compare, set, ttl) {
        return this.kv.cas(key, compare, set, ttl);
    }
    async casMulti(operations) {
        return this.kv.casMulti(operations);
    }
    async delete(key, options) {
        return this.kv.delete(key, options);
    }
    async clear() {
        return this.kv.clear();
    }
    async list() {
        const keys = [];
        let from = "";
        while (true) {
            const page = await this.kv.list({ from, limit: 1000 });
            keys.push(...page);
            if (page.length < 1000)
                break;
            from = page[page.length - 1];
        }
        return keys;
    }
    async items() {
        const items = [];
        let from = "";
        while (true) {
            const page = await this.kv.items({ from, limit: 100 });
            items.push(...page);
            if (page.length < 100)
                break;
            from = page[page.length - 1].key;
        }
        return items;
    }
    async read() {
        const out = {};
        const items = await this.items();
        for (const { key, value } of items) {
            out[key] = value;
        }
        return out;
    }
    async toJSON() {
        return this.read();
    }
    async write(value) {
        this.clear();
        for (const [k, v] of Object.entries(value)) {
            this.kv.put(k, v);
        }
    }
    async exec(io) {
        const data = await this.read();
        this.write(io(data));
    }
    async transact(key, io) {
        return this.kv.transact(key, io);
    }
    async transactMulti(keys, io) {
        return this.kv.transactMulti(keys, io);
    }
    async transactWithResult(key, io) {
        return this.kv.transactWithResult(key, io);
    }
    async transactMultiWithResult(keys, io) {
        return this.kv.transactMultiWithResult(keys, io);
    }
    async *[Symbol.asyncIterator]() {
        for (const { key, value } of await this.items()) {
            yield [key, value];
        }
    }
    toString() {
        return `KV(${this.namespace})`;
    }
}
pylon.kv.transactWithResult;

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
    "module.infractions": { level: 50 },
    "command.ping": { level: 0 },
    "command.help": { level: 0 },
    "command.level": { level: 0 },
    "command.nickme": { level: 200 },
    "command.server": { level: 0 },
    "command.info": { level: 0 },
    "command.avatar": { level: 0 },
    "command.snowflake": { level: 0 },
    "group.random": { level: 0 },
    "command.random coin": { level: 0 },
    "command.random number": { level: 0 },
    "command.random cat": { level: 0 },
    "command.random dog": { level: 0 },
    "command.random fox": { level: 0 },
    "command.random panda": { level: 0 },
    "command.random koala": { level: 0 },
    "command.random birb": { level: 0 },
    "command.pikachu": { level: 0 },
    "command.hug": { level: 0 },
    "command.pat": { level: 0 },
    "group.remind": { level: 0 },
    "command.remind clear": { level: 0 },
    "command.remind add": { level: 0 },
    "command.remind list": { level: 0 },
    "group.cur": { level: 0 },
    "command.cur": { level: 0 },
    "command.cur name": { level: 0 },
    "command.cur color": { level: 0 },
    "command.cur set": { level: 100 },
    "command.cur clear": { level: 100 },
    "command.cur delete": { level: 100 },
};

class Err extends Error {
    constructor(status, message, showUsage = false) {
        super(message);
        this.status = status;
        this.message = message;
        this.showUsage = showUsage;
    }
    toString() {
        return fmt("Err({status}): {message}", {
            message: this.message,
            status: this.status,
        });
    }
}
class Ok extends Err {
    constructor(message) {
        super(200, message, false);
        this.message = message;
    }
    toString() {
        return fmt("Ok('{message}')", { message: this.message });
    }
}
class NotImplementedError extends Error {
    constructor(name) {
        super(fmt("{name} is not implemented.", { name }));
        this.name = name;
    }
}

async function canTarget(source, target, request = [], bot = false) {
    const reasons = [];
    const noun = bot ? "My" : "Your";
    if (source.user.id === target.user.id &&
        !config.modules.infractions.targeting?.allowSelf) {
        reasons.push("You cannot target yourself");
    }
    const sl = botLevel(config, source);
    const tl = botLevel(config, target);
    if (config.modules.infractions.targeting?.checkLevels && sl < tl) {
        reasons.push(fmt("{noun} level {sl} does not surpass the target's level of {tl}", {
            sl,
            tl,
            noun,
        }));
    }
    const sr = await highestRole(source);
    const tr = await highestRole(target);
    if (config.modules.infractions.targeting?.checkRoles &&
        sr.position < tr.position) {
        reasons.push(fmt("{noun} highest role of {sr} does not surpass the target's highest role of {tr}", {
            sr: sr.toMention(),
            tr: tr.toMention(),
            noun,
        }));
    }
    return reasons;
}
async function highestRole(member) {
    const guild = await member.getGuild();
    const roles = await guild.getRoles();
    let role = (await guild.getRole(guild.id));
    for (const target of roles) {
        if (member.roles.includes(target.id)) {
            if (target.position > role.position) {
                role = target;
            }
        }
    }
    return role;
}

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
function parseTimeString(value, units = Units) {
    const ids = value.match(/\d+\w+/gi);
    if (ids === null) {
        throw new Err(400, fmt("Invalid time string '{value}'", { value }));
    }
    let i = 0;
    for (const p of ids) {
        const m = /(\d+)([a-z]+)/gi.exec(p);
        if (m === null) {
            continue;
        }
        const [, v, k] = m;
        if (k.toLowerCase() in units) {
            const z = Number.parseFloat(v);
            if (Number.isNaN(z)) {
                throw new Err(400, fmt("Invalid time increment: '{value}'", { value: v }));
            }
            i += units[k] * z;
            continue;
        }
        throw new Err(404, fmt("Unknown time symbol '{symbol}'", { symbol: k }));
    }
    return i;
}
function deepAssign(target, ...sources) {
    // iter
    for (const source of sources) {
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (source[key]) {
                    if (typeof source[key] === "object") {
                        target[key] = deepAssign(target[key] || {}, source[key]);
                    }
                    else {
                        target[key] = source[key];
                    }
                }
                else {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
}
function parseColor(text) {
    text = text.toLowerCase().trim().normalize();
    if (text in HtmlColours) {
        return HtmlColours[text];
    }
    if (!/(?:(?:0x|#)?)[0-9a-f]/gi.test(text)) {
        throw new Err(400, fmt("Invalid Colour '{text}'", { text }));
    }
    if (text.startsWith("#")) {
        text = text.slice(1);
    }
    if (text.startsWith("0x")) {
        text = text.slice(2);
    }
    switch (text.length) {
        case 3: {
            const [r, g, b] = text.split("");
            text = r + r + g + g + b + b;
            break;
        }
        case 6: {
            break;
        }
        default: {
            throw new Err(400, fmt("Invalid Colour '{text}'", { text }));
        }
    }
    return Number.parseInt(text, 0x10);
}
async function canManageRole(role, source) {
    const guild = await discord.getGuild();
    if (source === undefined) {
        const id = discord.getBotId();
        const me = await guild.getMember(id);
        if (me === null) {
            throw new Err(0, "I am not in this guild.");
        }
        source = me;
    }
    if (guild.ownerId === source.user.id) {
        return true;
    }
    const highest = await highestRole(source);
    return (source.can(268435456 /* MANAGE_ROLES */) &&
        highest.position > role.position);
}

const kv = {
    config: new KV("@internals/config"),
    reminders: new KV("@reminders"),
    cur: new KV("@cur"),
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
        infractions: {
            enabled: true,
            checkLogs: true,
            confirmation: {
                deleteOriginal: false,
                expiry: 0,
                message: true,
                reaction: false,
            },
            defaultDeleteDays: 0,
            integrate: true,
            muteRole: undefined,
            targeting: {
                allowSelf: true,
                checkLevels: true,
                checkRoles: true,
                othersEditLevel: 100,
                requiredPermissions: true,
            },
        },
    },
};
let config = DefaultConfig;
let commands = new discord.command.CommandGroup({});
const list = {
    "@global": [],
};
async function init() {
    if (config.loaded === true) {
        return;
    }
    // load config;
    const data = await kv.config.get("data");
    if (data) {
        config = deepAssign({}, DefaultConfig, data);
    }
    console.log([inspect(config.modules.commands)]);
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
        // load commands;
        // load the raw ones before sub commands !
        for (const [k, v] of Object.entries(list)) {
            let i = commands;
            if (k !== "@global") {
                i = commands.subcommandGroup({ name: k });
            }
            for (const c of v) {
                if (c.options.name === "@default") {
                    i.default(c.args, c.handler, c.options);
                    continue;
                }
                i.on(c.options, c.args, c.handler);
            }
        }
    }
}
function validateConfig(config) {
    const errors = [];
    if (config.guild_id !== discord.getGuildId()) {
        errors.push(new ValidationError("config.guildId", "not in this guild"));
    }
    if (!("modules" in config) || config.modules === undefined) {
        errors.push(new ValidationError("config.modules", "no modules were defined"));
        return errors;
    }
    for (const key in DefaultConfig.modules) {
        if (!(key in config.modules) || !("enabled" in config.modules[key])) {
            continue;
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

function on(tree, options, args, handler, group = "@global") {
    if (typeof options === "string") {
        options = { name: options };
    }
    let name = options.name;
    if (!tree.includes(`command.${name}`)) {
        if (name === "@default") {
            name = ``;
        }
        if (group !== "@global") {
            name = `${group} ${name}`.trim();
        }
        tree.push(`command.${name}`);
    }
    const g = list[group] || [];
    // throw new Error(name);
    g.push({
        tree,
        options: {
            onError(ctx, e) {
                if (e === null) {
                    return;
                }
                if (e instanceof Ok) {
                    respond.fmt(ctx.message, ":white_check_mark: {message}", {
                        message: e.message,
                    });
                    return;
                }
                if (e instanceof discord.command.ArgumentError || e instanceof Err) {
                    const command = ctx.command;
                    let i = [name];
                    for (const [k, v] of command.argumentConfigList) {
                        let q = v.type.endsWith("Optional") ? "?" : "";
                        i.push(`${q}<${k}: ${v.type.replace("Optional", "")}>`);
                    }
                    respond.fmt(ctx.message, e instanceof Err && !e.showUsage
                        ? ":warning: {message}"
                        : ":warning: `{message}`\n```lua\n{usage}\n```", {
                        message: e.message,
                        usage: i.join(" "),
                    });
                    return;
                }
                respond.fmt(ctx.message, ":x: Error happened while running command: ```js\n{e}\n```", { e: e.stack });
            },
            ...options,
        },
        args,
        async handler(payload, args, ctx) {
            const value = await canRunCommand(config, tree, payload);
            if (typeof value === "string") {
                return await respond(payload, {
                    content: value,
                });
            }
            return await handler(payload, args, ctx);
        },
    });
    list[group] = g;
}
function raw(tree, options, handler, group = "@global") {
    return on(tree, options, (args) => ({ text: args.textOptional() }), handler, group);
}
function sub(parentTree, name) {
    const f = (tree, options, args, handler) => {
        return on([...parentTree, ...tree], options, args, handler, name);
    };
    return {
        raw(tree, options, handler) {
            return f(tree, options, (args) => ({ text: args.textOptional() }), handler);
        },
        on: f,
        default: (tree, args, handler, options) => {
            return f(tree, Object.assign(options || {}, { name: "@default" }), args, handler);
        },
        defaultRaw: (tree, handler, options) => {
            return f(tree, Object.assign(options || {}, { name: "@default" }), (args) => ({ text: args.textOptional() }), handler);
        },
    };
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
        throw new Err(404, "Cannot find any members by that name");
    }
    Parameters.member = member;
    async function role(payload, text) {
        const guild = await payload.getGuild();
        if (typeof text !== "string") {
            return (await guild.getRole(guild.id));
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
    Parameters.role = role;
    async function self() {
        const guild = await discord.getGuild();
        const id = discord.getBotId();
        return (await guild.getMember(id));
    }
    Parameters.self = self;
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

var Snowflake;
(function (Snowflake) {
    Snowflake.DISCORD_SNOWFLAKE_EPOCH = 1420070400000;
    Snowflake.DISCORD_TOKEN_EPOCH = 1293840000000;
    Snowflake.bits = {
        timestamp: 42n,
        workerId: 5n,
        processId: 5n,
        sequence: 12n,
    };
    Snowflake.shift = {
        timestamp: Snowflake.bits.processId + Snowflake.bits.workerId + Snowflake.bits.sequence,
        workerId: Snowflake.bits.workerId + Snowflake.bits.sequence,
        processId: Snowflake.bits.sequence,
        sequence: 0n,
    };
    Snowflake.max = {
        timestamp: 0x40000000000n,
        processId: -1n ^ (-1n << Snowflake.bits.processId),
        sequence: -1n ^ (-1n << Snowflake.bits.sequence),
        workerId: -1n ^ (-1n << Snowflake.bits.workerId),
    };
    const cache = {
        sequence: 0n,
    };
    function generate(options = {}) {
        options = Object.assign({
            epoch: Snowflake.DISCORD_SNOWFLAKE_EPOCH,
            processId: 0,
            timestamp: Date.now(),
            workerId: 0,
        }, options);
        const epoch = BigInt(options.epoch);
        const processId = BigInt(options.processId) & Snowflake.max.processId;
        const timestamp = (BigInt(options.timestamp) - epoch) % Snowflake.max.timestamp;
        const workerId = BigInt(options.workerId) & Snowflake.max.workerId;
        let sequence;
        if (options.sequence === undefined) {
            sequence = cache.sequence = ++cache.sequence & Snowflake.max.sequence;
        }
        else {
            sequence = BigInt(options.sequence) & Snowflake.max.sequence;
        }
        const snowflake = {
            id: "",
            processId: Number(processId),
            sequence: Number(sequence),
            timestamp: Number(timestamp),
            workerId: Number(workerId),
        };
        snowflake.id = String((timestamp << Snowflake.shift.timestamp) |
            (workerId << Snowflake.shift.workerId) |
            (processId << Snowflake.shift.processId) |
            (sequence << Snowflake.shift.sequence));
        return snowflake;
    }
    Snowflake.generate = generate;
    function deconstruct(id, options = {}) {
        options = Object.assign({
            epoch: Snowflake.DISCORD_SNOWFLAKE_EPOCH,
        }, options);
        const epoch = BigInt(options.epoch);
        const snowflake = BigInt(id);
        return {
            id,
            processId: Number((snowflake & 0x1f000n) >> Snowflake.shift.processId),
            sequence: Number(snowflake & 0xfffn),
            timestamp: Number((snowflake >> Snowflake.shift.timestamp) + epoch),
            workerId: Number((snowflake & 0x3e0000n) >> Snowflake.shift.workerId),
        };
    }
    Snowflake.deconstruct = deconstruct;
    function timestamp(id, options = {}) {
        options = Object.assign({
            epoch: Snowflake.DISCORD_SNOWFLAKE_EPOCH,
        }, options);
        const epoch = BigInt(options.epoch);
        if (id) {
            return Number((BigInt(id) >> Snowflake.shift.timestamp) + epoch);
        }
        return 0;
    }
    Snowflake.timestamp = timestamp;
})(Snowflake || (Snowflake = {}));

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
on(["module.utility"], "snowflake", (args) => ({ snowflake: args.string() }), async (payload, args) => {
    args.snowflake = args.snowflake.replace(/\D/g, "");
    if (/\d+/g.test(args.snowflake) === false) {
        throw new Err(400, "Invalid Snowflake");
    }
    const { id, processId, sequence, timestamp, workerId } = Snowflake.deconstruct(args.snowflake);
    const embed = Embed.user(payload);
    embed.addField({
        name: "❯ Information",
        value: fmt(`**Id**: {id}\n**Process Id**: {processId}\n**Sequence**: {sequence}\n**Worker Id**: {workerId}\n**Timestamp**: {timestamp} ({date})`, {
            id,
            processId,
            sequence,
            timestamp,
            workerId,
            date: Markdown.Format.timestamp(timestamp, Markdown.TimestampStyles.BOTH_SHORT),
        }),
    });
    embed.addField({
        name: "❯ Points to",
        value: fmt(`**User**: <@{id}>\n**Channel**: <#{id}>\n**Role**: <@&{id}>\n**Slash Command**: </{id}:{id}>`, { id }),
    });
    return await respond(payload, { embeds: [embed] });
});
const random = sub(["module.utility", "group.random"], "random");
random.raw([], "coin", async (payload) => {
    const value = Math.random() > 0.5 ? "Heads" : "Tails";
    return await respond.fmt(payload, ":coin: It landed on **{value}**", {
        value,
    });
});
random.on([], "number", (args) => ({
    min: args.integer(),
    max: args.integerOptional(),
}), async (payload, args) => {
    if (args.max === null) {
        args.max = args.min;
        args.min = 0;
    }
    if (args.min >= args.max) {
        throw new Err(400, "Minimum cannot be higher than maximum");
    }
    const value = Math.floor(Math.random() * (args.max - args.min + 1) + args.min);
    return await respond.fmt(payload, "It came out to a **{value}**", {
        value,
    });
});
function createImageCommand(options, path, group) {
    return (group ? group.raw : raw)([], options, async (payload) => {
        const embed = Embed.user(payload);
        const req = await fetch(fmt("https://some-random-api.ml{path}", { path }));
        const { link } = await req.json();
        embed.setUrl(link);
        return await respond(payload, { embeds: [embed] });
    });
}
createImageCommand("cat", "/img/cat", random);
createImageCommand("dog", "/img/dog", random);
createImageCommand("fox", "/img/fox", random);
createImageCommand("panda", "/img/panda", random);
createImageCommand("koala", "/img/koala", random);
createImageCommand({ name: "birb", aliases: ["bird"] }, "/img/birb", random);
createImageCommand("pikachu", "/img/pikachu");
createImageCommand("hug", "/animu/hug");
createImageCommand("pat", "/animu/pat");
const remind = sub(["module.utility", "group.remind"], "remind");
remind.raw([], "clear", async (payload) => {
    const id = await kv.reminders.get(payload.author.id);
    if (id === undefined || id.length === 0) {
        throw new Err(404, "You have no reminders");
    }
    await kv.reminders.delete(payload.author.id);
    return await respond.fmt(payload, "Ok! Deleted {count} reminders", {
        count: id.length,
    });
});
remind.on([], "add", (args) => ({
    time: args.string(),
    content: args.textOptional(),
}), async (payload, args) => {
    const id = (await kv.reminders.get(payload.author.id)) || [];
    const t = parseTimeString(args.time);
    if (t < 5 * Units.m || t >= Units.y) {
        throw new Err(400, "Time must be between 5 minutes and 1 year");
    }
    const expiry = Date.now() + t;
    id.push({
        content: args.content,
        expiry,
        location: `${payload.channelId}/${payload.id}`,
    });
    await kv.reminders.put(payload.author.id, id);
    return await respond.fmt(payload, "Ok! Set reminder for {f} ({r})", {
        f: Markdown.Format.timestamp(expiry, Markdown.TimestampStyles.BOTH_SHORT),
        r: Markdown.Format.timestamp(expiry, Markdown.TimestampStyles.RELATIVE),
    });
});
remind.raw([], "list", async (payload) => {
    const id = await kv.reminders.get(payload.author.id);
    if (id === undefined || id.length === 0) {
        throw new Err(404, "You have no reminders.");
    }
    const text = id
        .map((reminder) => fmt(`{f} ({r}): \`{content}\``, {
        content: reminder.content || "No content",
        f: Markdown.Format.timestamp(reminder.expiry, Markdown.TimestampStyles.BOTH_SHORT),
        r: Markdown.Format.timestamp(reminder.expiry, Markdown.TimestampStyles.RELATIVE),
    }))
        .join("\n");
    return respond(payload, text);
});
const cur = sub([
    "module.utility",
    "group.cur",
    "criteria.utilities.custom_user_roles.enabled",
], "cur");
cur.defaultRaw([], async (payload) => {
    const id = await kv.cur.get(payload.member.user.id);
    if (id === undefined) {
        throw new Err(404, "You have do not have a custom role.");
    }
    return await respond.fmt(payload, "Your custom role is <@&{id}>", { id });
});
cur.on([], "name", (args) => ({ name: args.text() }), async (payload, args) => {
    const id = await kv.cur.get(payload.member.user.id);
    if (id === undefined) {
        throw new Err(404, "You have do not have a custom role");
    }
    const guild = await payload.getGuild();
    const role = await guild.getRole(id);
    if (role === null) {
        await kv.cur.delete(payload.member.user.id); // delete it to save space
        throw new Err(404, "Your custom role has been deleted");
    }
    if (args.name.length > 32) {
        throw new Err(400, "Text cannot be longer than 32 characters");
    }
    const available = await canManageRole(role);
    if (available === false) {
        throw new Err(403, "I cannot manage your custom role");
    }
    await role.edit({ name: args.name });
    throw new Ok(fmt("Set your custom role's name to {name}", { name: args.name }));
});
cur.on([], "color", (args) => ({ color: args.string() }), async (payload, args) => {
    const id = await kv.cur.get(payload.member.user.id);
    if (id === undefined) {
        throw new Err(404, "You have do not have a custom role");
    }
    const guild = await payload.getGuild();
    const role = await guild.getRole(id);
    if (role === null) {
        await kv.cur.delete(payload.member.user.id); // delete it to save space
        throw new Err(404, "Your custom role has been deleted");
    }
    if (args.color.length > 32) {
        throw new Err(400, "Text cannot be longer than 32 characters");
    }
    const available = await canManageRole(role);
    if (available === false) {
        throw new Err(403, "I cannot manage your custom role");
    }
    const color = parseColor(args.color);
    await role.edit({ color });
    throw new Ok(fmt("Set your custom role's color to #{color}", {
        color: color.toString(16).padStart(6, "0"),
    }));
});
async function managementChecks(payload, member, roleText) {
    const self = await Parameters.self();
    const userCanTarget = await canTarget(payload.member, member);
    if (userCanTarget.length) {
        throw new Err(403, userCanTarget[0]);
    }
    const selfCanTarget = await canTarget(self, member, [], true);
    if (selfCanTarget.length) {
        throw new Err(403, selfCanTarget[0]);
    }
    const role = await Parameters.role(payload, roleText);
    const userCanManage = await canManageRole(role, payload.member);
    if (userCanManage === false) {
        throw new Err(403, "You cannot manage this role");
    }
    const selfCanManage = await canManageRole(role, self);
    if (selfCanManage === false) {
        throw new Err(403, "I cannot manage this role");
    }
    return role;
}
cur.on([], "set", (args) => ({ member: args.guildMember(), role: args.text() }), async (payload, args) => {
    const role = (await managementChecks(payload, args.member, args.role));
    const currentId = await kv.cur.get(args.member.user.id);
    if (currentId) {
        await args.member.removeRole(currentId);
    }
    if (role.id === currentId) {
        throw new Err(400, "This user already has that role set");
    }
    await args.member.addRole(role.id);
    await kv.cur.put(args.member.user.id, role.id);
    throw new Ok(fmt("Set <@{userId}>'s custom role to <@&{roleId}>", {
        userId: args.member.user.id,
        roleId: role.id,
    }));
});
cur.on([], "clear", (args) => ({ member: args.guildMember() }), async (payload, args) => {
    const currentId = await kv.cur.get(args.member.user.id);
    if (currentId === undefined) {
        throw new Err(404, "User has no custom role");
    }
    const role = await managementChecks(payload, args.member, currentId);
    if (role) {
        await args.member.removeRole(currentId);
        await kv.cur.delete(args.member.user.id);
    }
    throw new Ok("Cleared their custom role");
});
cur.on([], "delete", (args) => ({ member: args.guildMember() }), async (payload, args) => {
    const currentId = await kv.cur.get(args.member.user.id);
    if (currentId === undefined) {
        throw new Err(404, "User has no custom role");
    }
    const role = await managementChecks(payload, args.member, currentId);
    if (role) {
        await role.delete();
    }
    throw new Ok("Deleted their custom role");
});

const cronEvents = {
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
                        await channel.sendMessage(fmt(`<@{user.id}> \`{content}\`\nhttps://discord.com/channels/{guild.id}/{channel.id}/{message.id}`, {
                            "guild.id": guildId,
                            "channel.id": channelId,
                            "message.id": messageId,
                            "user.id": key,
                            content: reminder.content || "...",
                        }));
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
