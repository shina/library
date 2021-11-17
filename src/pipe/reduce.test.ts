import { assertEquals, test } from "../../deps.ts";
import { reduceObjectsInOne, reduceUsing } from "./reduce.ts";
import { describe } from "../test-utils/deno-behaviour-test.ts";

test("reduceUsing", () => {
  const sum = reduceUsing<number>((prev: number, curr: number) => prev + curr);
  const dataSum = (data: number[]) => sum(data)(0);
  assertEquals(dataSum([1, 1, 1]), 3);
  assertEquals(dataSum([1, 2, 3]), 6);
});

describe("reduceObjectsInOne", (it) => {
  it("should merge the array of objects into one merged object", () => {
    const obj = reduceObjectsInOne([
      { foo: "bar" },
      { lorem: "ipsum" },
    ]);

    assertEquals(obj, { foo: "bar", lorem: "ipsum" });
  });
});
