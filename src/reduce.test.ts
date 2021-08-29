import { assertEquals, test } from "../deps.ts";
import { reduceUsing } from "./reduce.ts";

test("reduceUsing", () => {
    const sum = reduceUsing((prev, curr) => prev + curr);
    const dataSum = (data: number[]) => sum(data)(0);
    assertEquals(dataSum([1, 1, 1]), 3);
    assertEquals(dataSum([1, 2, 3]), 6);
});
