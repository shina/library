import { assertEquals } from "../../deps.ts";
import { mergeArrays, mergeObjects, reduceUsing } from "./reduce.ts";
import { describe } from "../test-utils/deno-behaviour-test.ts";

describe("reduceUsing", (it) => {
  it("should create a reduce function", () => {
    const sum = reduceUsing<number>((prev: number, curr: number) =>
      prev + curr
    );
    const dataSum = (data: number[]) => sum(data)(0);
    assertEquals(dataSum([1, 1, 1]), 3);
    assertEquals(dataSum([1, 2, 3]), 6);
  });
});

describe("mergeObjects", (it) => {
  it("should merge the array of objects into one merged object", () => {
    const obj = mergeObjects([
      { foo: "bar" },
      { lorem: "ipsum" },
    ]);

    assertEquals(obj, { foo: "bar", lorem: "ipsum" });
  });
});

describe("mergeArrays", (it) => {
  it("should merge the array of arrays into one array", () => {
    const arr = mergeArrays([
      [1, 2, 3],
      [3, 4, 5],
      [99],
    ]);

    assertEquals(arr, [1, 2, 3, 3, 4, 5, 99]);
  });
});
