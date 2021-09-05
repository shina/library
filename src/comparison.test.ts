import { assert, test } from "../deps.ts";
import { hasDiff } from "./comparison.ts";

test("hasDiff true", () => assert(hasDiff([1, 1, 1, 2, 1])));
test("hasDiff false", () => assert(!hasDiff([1, 1, 1, 1, 1])));
