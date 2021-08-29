import { assertEquals, assertThrowsAsync, test } from "../deps.ts";
import { DistinctFetch } from "./distinct-fetch.ts";
import { FakeTimeout } from "./test-utils/fake-timeout.ts";

const { setTimeout, setTime, clearTimeout } = new FakeTimeout();

const fakeFetch = (url: any, fetchOptions?: RequestInit): Promise<any> => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => resolve(url), 100);
        fetchOptions?.signal?.addEventListener('abort', () => {
            clearTimeout(timeout);
            const error = new Error();
            error.name = "AbortError";
            reject(error);
        });
    });
}

const fakeFetchThatThrow = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        reject(new Error());
    });
}

test("DistinctFetch should send a signal to cancel the previous request if a new one is made", async () => {
    const { fetch } = new DistinctFetch(fakeFetch, true);

    const request1 = fetch("foo");
    const request2 = fetch("bar");

    setTime(100);

    assertEquals(await request1, null);
    assertEquals(await request2, "bar");
});

test("DistinctFetch should throw the AbortError when `ignoreError` is set to false", async () => {
    const { fetch } = new DistinctFetch(fakeFetch, false);

    assertThrowsAsync(async () => {
        const promise1 = fetch('foo');
        fetch('foo');

        setTime(100);

        await promise1;
    });
});

test("DistinctFetch should throw any other exception which is not AbortError (`ignoreError` on)", () => {
    const { fetch } = new DistinctFetch(fakeFetchThatThrow, true);

    assertThrowsAsync(async () => {
        await fetch("foo");
    });
});

test("DistinctFetch should throw any other exception which is not AbortError (`ignoreError` off)", () => {
    const { fetch } = new DistinctFetch(fakeFetchThatThrow, false);

    assertThrowsAsync(async () => {
        await fetch("foo");
    });
});
