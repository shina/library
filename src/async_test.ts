import {assert, assertEquals} from "../deps.ts";
import {delay, filterAsync} from "./async.ts";

Deno.test("filterAsync basic", async () => {
    const result = await filterAsync([1, 2, 3, 4, 5], async (item) => (item || 0) > 3);
    assertEquals(result, [4, 5]);
});

Deno.test("delay basic", async () => {
    const timestamp = Date.now();
    await delay(10);
    assert(Date.now() >= timestamp+10);
});
