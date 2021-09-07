import { valueOrThrow } from "./type-checking.ts";

export class ValueNotFound<K, V> extends Error {
  constructor(obj: MapStrict<K, V>, value: unknown) {
    super(`Value ${value} doesn't exist in MapStrict ${obj}`);
  }
}

/**
 * A Map but it doesn't return `null`, it throws `ValueNotFound` instead
 */
export class MapStrict<K, V> extends Map<K, V> {
  get = (key: K): V =>
    valueOrThrow<V | undefined>(
      super.get(key),
      () => new ValueNotFound(this, key),
    );
  set = (key: K, value: V): this => super.set(key, value);
  has = (key: K): boolean => super.has(key);
}
