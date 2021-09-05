import { rotateMatrix90 } from "./rotate.ts";
import { assertEquals } from "../../deps.ts";
import { describe } from "../test-utils/deno-behaviour-test.ts";

describe("rotateMatrix90", it => {
    it("should rotate a square", () => {
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

    it("should rotate a rectangle in vertical", () => {
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

    it("should rotate a rectangle in horizontal", () => {
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
});
