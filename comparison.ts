import { assert } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

/**
 * Checks an array if there are duplicate values
 */
export function hasDiff(arr: unknown[]): boolean {
    return (new Set(arr)).size > 1;
}

Deno.test('hasDiff true', () => assert(hasDiff([1, 1, 1, 2, 1])));
Deno.test('hasDiff false', () => assert(hasDiff([1, 1, 1, 1, 1]) === false));
