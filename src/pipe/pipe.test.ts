import { describe } from "../test-utils/deno-behaviour-test.ts";
import { pipe, pipeFrom } from "./pipe.ts";
import { assertEquals } from "../../deps.ts";

describe("pipe", (it) => {
  it("should pipe the functions", () => {
    const result = pipe(
      (v: number) => v + 1,
      (v: number) => v * 2,
    );

    assertEquals(result(1), 4);
  });
});

describe("pipeFrom", (it) => {
  it("should pipe the functions", () => {
    const result = pipeFrom(1)(
      (v: number) => v + 1,
      (v: number) => v * 2,
    );

    assertEquals(result, 4);
  });
});
