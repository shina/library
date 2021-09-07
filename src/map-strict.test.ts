import { describe } from "./test-utils/deno-behaviour-test.ts";
import { MapStrict, ValueNotFound } from "./map-strict.ts";
import { assert, assertEquals, assertThrows } from "../deps.ts";

describe("MapStrict", (it) => {
  it("should throw `ValueNotFound` when an invalid get is called", () => {
    const map = new MapStrict();
    assertThrows(() => {
      map.get("foo");
    }, ValueNotFound);
  });

  it("should implement the same Map methods (get, set and has)", () => {
    const map = new MapStrict();
    map.set("foo", "bar");

    assertEquals(map.get("foo"), "bar");
    assert(map.has("foo"));
    assert(!map.has("false"));
  });
});
