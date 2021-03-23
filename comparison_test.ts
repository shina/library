import {assert} from "./build/deps.ts";
import {hasDiff} from "./comparison.ts";

Deno.test('hasDiff true', () => assert(hasDiff([1, 1, 1, 2, 1])));
Deno.test('hasDiff false', () => assert(hasDiff([1, 1, 1, 1, 1]) === false));
