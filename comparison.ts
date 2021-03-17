import {assert} from "./deps.ts";

/**
 * Checks an array if there are duplicate values
 */
export function hasDiff(arr: unknown[]): boolean {
    return (new Set(arr)).size > 1;
}

Deno.test('hasDiff true', () => assert(hasDiff([1, 1, 1, 2, 1])));
Deno.test('hasDiff false', () => assert(hasDiff([1, 1, 1, 1, 1]) === false));
