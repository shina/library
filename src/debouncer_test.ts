import { assertEquals, test } from "../deps.ts";
import { Debouncer as PureDebouncer } from "./debouncer.ts";
import { FakeTimeout } from './test-utils/fake-timeout.ts';

const {setTimeout, clearTimeout, setTime} = new FakeTimeout();

class Debouncer<T> extends PureDebouncer<T> {
    constructor(ms: number) {
        super(setTimeout, clearTimeout, ms);
    }
}

test("debouncer basic", async () => {
    // create debounce function with 5 ms of delay
    const {debounce} = new Debouncer(5);

    // execute the same function 3 times
    let counter = 0;
    debounce(() => counter++);
    debounce(() => counter++);
    debounce(() => counter++);

    // after 5ms the function is expected to be executed only once
    setTime(5);

    assertEquals(counter, 1);
});

test("debouncer shared", async () => {
    const {debounce} = new Debouncer(5);

    /**
     * Although it is not the normal use case, for testing purpose, the requests are different
     * It is simulating 3 different callers, from different places
     */
    const responses = await Promise.all([
        debounce(() => "response 1"),
        debounce(() => "response 2"),
        debounce(() => "response 3"),
        async () => setTime(5)
    ]);

    // Every caller must receive the same response
    assertEquals(responses[0], "response 3");
    assertEquals(responses[1], "response 3");
    assertEquals(responses[2], "response 3");
});

/**
 * That is a tricky test because it has to test how long the debounce is taking to execute
 */
test("debouncer must restart the timer whenever a new call is made", async () => {
    const {debounce} = new Debouncer(15);
    let counter = 0;

    // first execution, don't wait
    debounce(() => counter++);

    // wait 10ms, not enough to finish the debouncer delay
    setTime(10)

    // call debounce again, it should restart the delay
    await Promise.all([
        debounce(() => counter++),
        async () => setTime(15)
    ])

    assertEquals(counter, 1); // make sure the function was executed only once
});
