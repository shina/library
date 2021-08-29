import { assert, test } from "../../deps.ts";
import { AssertCalled } from "./assert-called.ts";

test("assert a function was called", () => {
    const { assertCalled, stubFn } = new AssertCalled(assert);

    stubFn();

    assertCalled();
});

test("function was not called", () => {
    const { assertNotCalled } = new AssertCalled(assert);

    assertNotCalled();
});

test("can wrap a function", () => {
    const { stubFn, assertCalled } = new AssertCalled(assert);

    const {stubFn: callWrappedStubFn} = new AssertCalled(assert, stubFn);

    callWrappedStubFn();

    assertCalled();
});

test("wrapped function must be able to return", () => {
    const {stubFn} = new AssertCalled(assert, () => "foo");
    assert(stubFn() === "foo");
});
