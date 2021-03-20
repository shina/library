import {assert, assertEquals} from "./build/deps.ts";

/**
 * filterAsync is an alternative to Array.filter to use asynchronous conditions
 * e.g. make a http request on each test or consult the IndexedDB
 */
export async function filterAsync<T = any>(arr: T[], test: (item?: T) => Promise<boolean>) {
    arr = arr.reverse();
    const result = [];
    while (arr.length > 0) {
        const item = arr.pop();
        if (await test(item)) {
            result.push(item);
        }
    }

    return result;
}

Deno.test("filterAsync basic", async () => {
    const result = await filterAsync([1, 2, 3, 4, 5], async (item) => (item || 0) > 3);
    assertEquals(result, [4, 5]);
});


/**
 * delay delays your code =)
 * Be careful where/how you will use this
 */
export async function delay(ms: number): Promise<void> {
    return new Promise((resolve: () => void) => {
        setTimeout(resolve, ms);
    });
}

Deno.test("delay basic", async () => {
    const timestamp = Date.now();
    await delay(10);
    assert(Date.now() >= timestamp+10);
});
