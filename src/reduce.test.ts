import { assertEquals, test } from "../deps.ts";
import { reduceUsing } from "./reduce.ts";

test("reduceUsing", () => {
  const sum = reduceUsing<number>((prev: number, curr: number) => prev + curr);
  const dataSum = (data: number[]) => sum(data)(0);
  assertEquals(dataSum([1, 1, 1]), 3);
  assertEquals(dataSum([1, 2, 3]), 6);
});
