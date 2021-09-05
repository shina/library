import { FakeTimeout } from './fake-timeout.ts';
import { assert } from '../../deps.ts';
import { describe } from "./deno-behaviour-test.ts";

describe("FakeTimout", it => {
    it("should execute if the time is less than the time set", () => {
        const { setTimeout, setTime } = new FakeTimeout();
        let changeMe = "foo";
        setTimeout(() => changeMe = 'bar', 1000);

        setTime(1000);
        assert(changeMe === "bar");
    });

    it("should not execute if the time is less than the time set", () => {
        const { setTimeout, setTime } = new FakeTimeout();
        let changeMe = "foo";
        setTimeout(() => changeMe = 'bar', 1000);

        assert(changeMe === "foo");
        setTime(500);
        assert(changeMe === "foo");
    });

    it("should be possible to `setTime` without call `setTimeout` before", () => {
        const { setTime } = new FakeTimeout();
        setTime(10);
        assert(true);
    })

    it("should clear the timeout when `clearTimeout` is called", () => {
        const { setTimeout, clearTimeout, setTime } = new FakeTimeout();

        let changeMe = "foo";
        const timeoutHandler = setTimeout(() => changeMe = "bar", 1000);
        clearTimeout(timeoutHandler);
        setTime(1000);
        assert(changeMe === "foo");
    });

    it("should be able to set multiple timeouts", () => {
        const { setTimeout, clearTimeout, setTime } = new FakeTimeout();

        let changeMe = "foo";
        setTimeout(() => changeMe = "bar", 500);
        const timeoutHandler = setTimeout(() => changeMe = "asdf", 1000);
        setTimeout(() => changeMe = "asdf", 1500);

        clearTimeout(timeoutHandler);

        setTime(500);
        assert(changeMe === "bar");

        setTime(1000);
        assert(changeMe === "bar");

        setTime(1500);
        // @ts-ignore
        assert(changeMe === "asdf");
    })
});
