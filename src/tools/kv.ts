import { fmt } from "./utils";

export class KV<T = Struct> {
  public namespace: string;
  constructor(namespace: string) {
    this.namespace = namespace;
  }

  get guildId() {
    return discord.getGuildId();
  }

  public async read(): Promise<Partial<T>> {
    const req = await fetch(
      fmt("https://api.clancy.lol/kv/{guildId}/read", { guildId: this.guildId })
    );

    return (await req.json())[this.namespace] || {};
  }
  public async write(data: Partial<T>) {
    const existing = await this.read();

    existing[this.namespace] = data;

    await fetch(
      fmt("https://api.clancy.lol/kv/{guildId}/write?data={data}", {
        guildId: this.guildId,
        data: encodeURIComponent(JSON.stringify(data)),
      })
    );

    return this;
  }

  public async exec(io: IO<Partial<T>>) {
    const data = await this.read();
    this.write(io(data));
    return this;
  }
  public async get<U extends keyof T>(key: U): Promise<V<T[U]> | undefined> {
    const data = await this.read();
    return data[key] as unknown as V<T[U]>;
  }
  public async put<U extends keyof T>(
    key: U,
    value: T[U],
    options: PutOptions = {}
  ): Promise<this> {
    const item = await this.get(key);
    if (item) {
      if (item === value) {
        return this;
      }
      if (options.ifNotExists) {
        throw new Error(`${String(key)} already exists`);
      }
    }

    return await this.exec((data) => {
      data[key] = value;
      return data;
    });
  }

  public async cas<U extends keyof T>(
    key: U,
    compare: V<T[U]> | undefined,
    set: V<T[U]> | undefined
  ): Promise<this> {
    const item = await this.get(key);

    if (item && item === compare) {
      throw new Error(`${String(key)} is already ${compare}`);
    }

    await this.exec((data) => {
      data[key] = set;
      return data;
    });

    return this;
  }

  public async casMulti<U extends keyof T>(
    operations: Array<CasOperation<T, U>>
  ): Promise<this> {
    for (const operation of operations) {
      await this.cas(operation.key, operation.compare!, operation.set!);
    }
    return this;
  }

  public async delete<U extends keyof T>(key: U): Promise<this> {
    return await this.exec((data) => {
      delete data[key];
      return data;
    });
  }

  public async clear(): Promise<Partial<T>> {
    const data = this.read();
    await this.write({});
    return data;
  }

  public async has<U extends keyof T>(key: U): Promise<boolean> {
    const data = await this.read();
    return data.hasOwnProperty(key);
  }

  public async count(): Promise<number> {
    return (await this.list()).length;
  }

  public async list(): Promise<Array<keyof T>> {
    return Object.keys(await this.read()) as Array<keyof T>;
  }

  public async items(): Promise<Array<Item<T, keyof T>>> {
    const entries = Object.entries(await this.read());
    return entries.map(([key, value]) => ({
      key: key as keyof T,
      value: value as V<T[keyof T]>,
    }));
  }

  public async transact<U extends keyof T>(key: U, io: IO<V<T[U]>>) {
    const item = await this.get(key);
    if (item) {
      let o = io(item);
      return await this.cas(key, undefined, o);
    }
  }

  public async transactMulti<U extends Array<keyof T>>(
    keys: U,
    io: IO<V<T[U[number]]>>
  ) {
    for (const key of keys) {
      await this.transact(key, io);
    }
    return this;
  }

  public async *keys(): AsyncIterableIterator<keyof T> {
    for (const key of await this.list()) {
      yield key;
    }
  }

  public async *values(): AsyncIterableIterator<V<T[keyof T]>> {
    for (const item of await this.items()) {
      yield item.value;
    }
  }

  public async *entries(): AsyncIterableIterator<[keyof T, V<T[keyof T]>]> {
    for (const [key, value] of Object.entries(await this.read())) {
      yield [key as keyof T, value as V<T[keyof T]>];
    }
  }

  public async *[Symbol.asyncIterator](): AsyncIterableIterator<
    [keyof T, V<T[keyof T]>]
  > {
    for await (const [key, value] of this.entries()) {
      yield [key, value];
    }
  }
}
export type Value =
  | string
  | number
  | boolean
  | null
  | ValueObject
  | ValueArray
  | undefined;
export type Typeof =
  | "bigint"
  | "boolean"
  | "function"
  | "number"
  | "object"
  | "string"
  | "symbol"
  | "undefined";
export interface ValueObject {
  [property: string]: Value;
}
export interface ValueArray extends Array<Value> {}
export type IO<T> = (input: T) => T;
export type Entries = Record<string, Value>;
export interface PutOptions {
  ifNotExists?: boolean;
}

export interface CasCompareAndSwap<T, U extends keyof T> {
  compare: V<T[U]>;
  key: U;
  set: V<T[U]>;
}

export interface CasDeleteIfEquals<T, U extends keyof T> {
  compare: V<T[U]>;
  key: U;
  set: undefined;
}

export interface CasSetIfNotExists<T, U extends keyof T> {
  compare: undefined;
  key: U;
  set: V<T[U]>;
}
export type CasOperation<T, U extends keyof T> =
  | CasDeleteIfEquals<T, U>
  | CasSetIfNotExists<T, U>
  | CasCompareAndSwap<T, U>;
export interface Item<T, U extends keyof T> {
  key: U;
  value: V<T[U]>;
}

export type Struct = Partial<Entries>;

export type V<T> = T extends Value ? T : never;
