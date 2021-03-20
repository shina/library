import {assert, assertEquals} from "./deps.ts";
import {delay} from "./async.ts";

export function debouncer<T>(ms: number) {
    let promise: Promise<T> | undefined;
    let lastFunc: () => T;

    return function(func: () => T): Promise<T> {
        lastFunc = func;
        if (promise === undefined) {
            promise = new Promise<T>((resolve) => {
                setTimeout(() => {
                    resolve(lastFunc());
                    promise = undefined;
                }, ms);
            });
        }

        return promise;
    }
}

Deno.test("debouncer basic", async () => {
    // create debounce function with 5 ms of delay
    const debounce = debouncer(5);

    // execute the same function 3 times
    let counter = 0;
    debounce(() => counter++);
    debounce(() => counter++);
    debounce(() => counter++);

    // after 5ms the function is expected to be executed only once
    await delay(5);
    assertEquals(counter, 1);
});

Deno.test("debouncer shared", async () => {
    const debounce = debouncer(5);

    const responses = await Promise.all([
        debounce(() => "response 1"),
        debounce(() => "response 2"),
        debounce(() => "response 3")
    ]);

    assertEquals(responses[0], "response 3");
    assertEquals(responses[1], "response 3");
    assertEquals(responses[2], "response 3");
});

// Deno.test("debouncer must restart the timer whenever a new call is made", async () => {
//     const debounce = debouncer(15);
//     const startTime = Date.now();
//     let counter = 0;
//
//     debounce(() => counter++);
//     await delay(10);
//     await debounce(() => counter++);
//
//     const timeDiff = Date.now() - startTime;
//     console.log(timeDiff);
//     assert(timeDiff > 23 && timeDiff < 27);
//     assertEquals(counter, 1);
// });
