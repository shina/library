import { assertEquals, test } from "../deps.ts";
import { EntityPool } from "./entity-pool.ts";
import { MapStrict } from "./map-strict.ts";
import { Entity } from "./types/entity.ts";

test("ObjectPool get", () => {
  const storage = new MapStrict<string, Entity>();
  const { get } = new EntityPool(storage);

  storage.set("1", { id: "1" });

  assertEquals(get("1"), { id: "1" });
});

test("ObjectPool set", () => {
  const storage = new MapStrict<string, Entity>();
  const { set } = new EntityPool(storage);

  set({ id: "1" });

  assertEquals(storage.get("1"), { id: "1" });
});
