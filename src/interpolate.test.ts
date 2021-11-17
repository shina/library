import { describe } from "./test-utils/deno-behaviour-test.ts";
import { assertEquals } from "../deps.ts";
import { interpolate } from "./interpolate.ts";

describe("interpolate", (it) => {
  it("should replace the mustache placeholders with another value", () => {
    assertEquals(interpolate("replace {{foo}}", { foo: "me" }), "replace me");
  });

  it("should work with space between the mustache", () => {
    assertEquals(interpolate("replace {{ foo }}", { foo: "me" }), "replace me");
  });
});
