import { rotateMatrix90 } from "./rotate.ts";
import { assertEquals, test } from "../../deps.ts";

test("rotateMatrix90 square", () => {
    const rotated = rotateMatrix90([
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3]
    ]);
    assertEquals(
        rotated,
        [
            [3, 2, 1],
            [3, 2, 1],
            [3, 2, 1]
        ]
    );
});

test("rotateMatrix90 rectangle", () => {
    const rotated = rotateMatrix90([
        [1, 1],
        [2, 2],
        [3, 3]
    ]);
    assertEquals(
        rotated,
        [
            [3, 2, 1],
            [3, 2, 1]
        ]
    );
});

test("rotateMatrix90 rectangle 2", () => {
    const rotated = rotateMatrix90([
        [1, 1, 1],
        [2, 2, 2]
    ]);
    assertEquals(
        rotated,
        [
            [2, 1],
            [2, 1],
            [2, 1]
        ]
    );
});
