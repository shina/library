import { FakeTimeout } from './fake-timeout.ts';
import { assert, test } from '../../deps.ts';

{
    const { setTimeout, setTime } = new FakeTimeout();
    let changeMe = "foo";
    setTimeout(() => changeMe = 'bar', 1000);

    test("FakeTimeout before timeout", () => {
        assert(changeMe === "foo");
        setTime(500);
        assert(changeMe === "foo");
    });

    test("FakeTimeout after timeout", () => {
        setTime(1000);
        assert(changeMe === "bar");
    });
}

test("setTime can set time without setTimeout being called before", () => {
    const { setTime } = new FakeTimeout();
    setTime(10);
    assert(true);
});

test("clearTimeout", () => {
    const { setTimeout, clearTimeout, setTime } = new FakeTimeout();

    let changeMe = "foo";
    const timeoutHandler = setTimeout(() => changeMe = "bar", 1000);
    clearTimeout(timeoutHandler);
    setTime(1000);
    assert(changeMe === "foo");
});

test("Multiple timeouts", () => {
    const { setTimeout, clearTimeout, setTime } = new FakeTimeout();

    let changeMe = "foo";
    setTimeout(() => changeMe = "bar", 500);
    const timeoutHandler = setTimeout(() => changeMe = "asdf", 1000);
    setTimeout(() => changeMe = "asdf", 1500);

    clearTimeout(timeoutHandler);

    setTime(500);
    assert(changeMe === "bar");

    setTime(1000);
    // @ts-ignore
    assert(changeMe === "bar");

    setTime(1500);
    // @ts-ignore
    assert(changeMe === "asdf");
});
