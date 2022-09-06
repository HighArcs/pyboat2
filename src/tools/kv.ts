export class KV<T = Record<string, pylon.Json>> {
  private kv: pylon.KVNamespace;
  constructor(namespace: string) {
    this.kv = new pylon.KVNamespace(namespace);
  }

  get namespace() {
    return this.kv.namespace;
  }

  public async get<U extends keyof T>(key: K<U>): Promise<V<T[U]> | undefined> {
    return this.kv.get<V<T[U]>>(key);
  }

  public async put<U extends keyof T>(
    key: K<U>,
    value: V<T[U]> | null,
    options: pylon.IKVPutOptions = {}
  ) {
    this.kv.put(key, value, options);
    return this;
  }

  public async has<U extends keyof T>(key: K<U>): Promise<boolean> {
    return (await this.get(key)) !== undefined;
  }

  public async cas<U extends keyof T>(
    key: K<U>,
    compare: V<T[U]>,
    set: V<T[U]>,
    ttl: Date | number | undefined
  ): Promise<void>;
  public async cas<U extends keyof T>(
    key: K<U>,
    compare: undefined,
    set: V<T[U]>,
    ttl: Date | number | undefined
  ): Promise<void>;
  public async cas<U extends keyof T>(
    key: K<U>,
    compare: V<T[U]>,
    set: undefined,
    ttl: undefined
  ): Promise<void>;
  public async cas<U extends keyof T>(
    key: K<U>,
    compare: V<T[U]> | undefined,
    set: V<T[U]> | undefined,
    ttl: number | Date | undefined
  ): Promise<void> {
    return this.kv.cas(key, compare!, set!, ttl);
  }

  public async casMulti<U extends keyof T>(
    operations: Array<CasOperation<T, U>>
  ): Promise<void> {
    return this.kv.casMulti(operations);
  }

  public async delete<U extends keyof T>(
    key: K<U>,
    options?: DeleteOptions<T, U>
  ): Promise<void> {
    return this.kv.delete(key, options);
  }

  public async clear(): Promise<number> {
    return this.kv.clear();
  }

  public async list(): Promise<Array<keyof T>> {
    const keys: Array<keyof T> = [];
    let from = "";
    while (true) {
      const page = await this.kv.list({ from, limit: 1000 });
      keys.push(...(page as Array<keyof T>));
      if (page.length < 1000) break;
      from = page[page.length - 1];
    }
    return keys;
  }

  public async items(): Promise<Array<Item<T, keyof T>>> {
    const items: Array<Item<T, keyof T>> = [];

    let from = "";

    while (true) {
      const page = await this.kv.items({ from, limit: 100 });

      items.push(...(page as Array<Item<T, keyof T>>));

      if (page.length < 100) break;

      from = page[page.length - 1].key;
    }

    return items;
  }

  public async read(): Promise<Partial<Safe<T>>> {
    const out: Partial<Safe<T>> = {};

    const items = await this.items();

    for (const { key, value } of items) {
      out[key as never] = value as never;
    }

    return out;
  }

  public async toJSON(): Promise<Partial<Safe<T>>> {
    return this.read();
  }

  public async write(value: Partial<Safe<T>>): Promise<void> {
    this.clear();
    for (const [k, v] of Object.entries(value)) {
      this.kv.put(k, v as never);
    }
  }

  public async exec(io: IO<Partial<Safe<T>>>): Promise<void> {
    const data = await this.read();
    this.write(io(data));
  }

  public async transact<U extends keyof T>(
    key: K<U>,
    io: IO<V<T[K<U>]> | undefined>
  ): Promise<V<T[K<U>]> | undefined> {
    return this.kv.transact(key, io);
  }

  public async transactMulti<U extends Array<K<keyof T>>>(
    keys: U,
    io: IO<V<T[K<U[number]>] | undefined>>
  ): Promise<Array<V<T[K<U[number]>] | undefined>> & { length: U["length"] }> {
    return this.kv.transactMulti(keys as never, io as never) as never;
  }

  public async transactWithResult<U extends keyof T, R = unknown>(
    key: K<U>,
    io: (p: V<T[K<U>]> | undefined) => TransactWithResult<T, U, R>
  ): Promise<TransactWithResult<T, U, R>> {
    return this.kv.transactWithResult(key, io);
  }

  public async transactMultiWithResult<
    U extends Array<K<keyof T>>,
    R = unknown
  >(
    keys: U,
    io: (p: U) => TransactWithMultiResult<T, U, R>
  ): Promise<TransactWithMultiResult<T, U, R>> {
    return this.kv.transactMultiWithResult(keys as never, io as never);
  }

  public async *[Symbol.asyncIterator](): AsyncIterableIterator<
    [keyof T, V<T[keyof T]>]
  > {
    for (const { key, value } of await this.items()) {
      yield [key, value];
    }
  }

  public toString() {
    return `KV(${this.namespace})`;
  }
}

type V<T> = T extends pylon.Json ? T : never;
type K<T> = T extends string ? T : never;

export interface CasCompareAndSwap<T, U extends keyof T> {
  compare: V<T[K<U>]>;
  key: K<U>;
  set: V<T[K<U>]>;
}

export interface CasDeleteIfEquals<T, U extends keyof T> {
  compare: V<T[K<U>]>;
  key: K<U>;
  set: undefined;
}

export interface CasSetIfNotExists<T, U extends keyof T> {
  compare: undefined;
  key: K<U>;
  set: V<T[K<U>]>;
}
export type CasOperation<T, U extends keyof T> =
  | CasDeleteIfEquals<T, U>
  | CasSetIfNotExists<T, U>
  | CasCompareAndSwap<T, U>;

export interface DeleteOptions<T, U extends keyof T> {
  /**
   * Deletes the value, but only if it equals the provided value.
   */
  prevValue?: V<T[K<U>]>;
}

export interface Item<T, U extends keyof T> {
  key: K<U>;
  value: V<T[K<U>]>;
  expiresAt: Date | null;
}

export type Safe<T> = {
  [P in keyof T as T[P] extends pylon.Json ? P : never]: V<T[P]>;
};
pylon.kv.transactWithResult;
export interface TransactWithResult<T, U extends keyof T, R = unknown> {
  next: V<T[K<U>]> | undefined;
  result: R;
}

export interface TransactWithMultiResult<
  T,
  U extends Array<K<keyof T> | undefined>,
  R = unknown
> {
  next: Array<U[number] | undefined>;
  result: R;
}

export type IO<T> = (input: T) => T;
