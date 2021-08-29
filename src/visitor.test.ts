import { assert, assertEquals, test } from "../deps.ts";
import { visitorMap, visitorReducer } from "./visitor.ts";

const subOne = (val: number) => val - 1;
const addOne = (val: number) => val + 1;
const provider = (val: number) => val <= 2 ? subOne : addOne;

test("visitor reducer", () => {
    const reducer = visitorReducer(provider);
    assert([1, 2, 3, 4, 5].reduce(reducer, 0) === 1);
});

test("visitor map", () => {
    const map = visitorMap(provider);
    assertEquals([1, 2, 3, 4, 5].map(map), [0, 1, 4, 5, 6]);
});
