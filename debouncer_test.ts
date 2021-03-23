import {assert, assertEquals} from "./build/deps.ts";
import {delay} from "./async.ts";
import {debouncer} from "./debouncer.ts";

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

    /**
     * Although it is not the normal use case, for testing purpose, the requests are different
     * It is simulating 3 different callers, from different places
     */
    const responses = await Promise.all([
        debounce(() => "response 1"),
        debounce(() => "response 2"),
        debounce(() => "response 3")
    ]);

    // Every caller must receive the same response
    assertEquals(responses[0], "response 3");
    assertEquals(responses[1], "response 3");
    assertEquals(responses[2], "response 3");
});

/**
 * That is a tricky test because it has to test how long the debounce is taking to execute
 */
Deno.test("debouncer must restart the timer whenever a new call is made", async () => {
    const debounce = debouncer(15);
    const startTime = Date.now();
    let counter = 0;

    // first execution, don't wait
    debounce(() => counter++);

    // wait 10ms, not enough to finish the debouncer delay
    await delay(10);

    // call debounce again, it should restart the delay
    await debounce(() => counter++);

    const timeDiff = Date.now() - startTime;
    assert(timeDiff >= 25); // it should take at least 25ms / 10ms (delay) + 15ms (debouncer)
    assertEquals(counter, 1); // make sure the function was executed only once
});
