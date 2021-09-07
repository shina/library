import { Entity } from "./types/entity.ts";

interface Storage<V> {
  set(key: string, value: V): Storage<V>;
  get(key: string): V;
}

/**
 * Pool of `Entity`
 */
export class EntityPool<E extends Entity> {
  constructor(private storage: Storage<E>) {
  }

  set = (entity: E) => {
    this.storage.set(entity.id, entity);
  };

  get = (id: string): E => {
    return this.storage.get(id);
  };
}
