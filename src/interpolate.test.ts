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

  it("should replace all the occurrences in the string", () => {
    assertEquals(
      interpolate("replace {{ foo }} {{ foo }}", { foo: "me" }),
      "replace me me",
    );
  });

  it("should be able to use multiple values in the same obj", () => {
    assertEquals(
      interpolate("{{replace}} {{ foo }}", { replace: "hello", foo: "world" }),
      "hello world",
    );
  });
});
