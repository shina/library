import { assertEquals, test } from "../deps.ts";
import { EntityPool } from "./entity-pool.ts";

test("ObjectPool get", () => {
    const storage: Map<any, any> = new Map();
    const {get} = new EntityPool(storage);

    storage.set("1", {id: "1"});

    assertEquals(get("1"), {id: "1"});
});

test("ObjectPool set", () => {
    const storage: Map<any, any> = new Map();
    const {set} = new EntityPool(storage);

    set({id: "1"});

    assertEquals(storage.get("1"), {id: "1"});
});
