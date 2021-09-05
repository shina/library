import { assert } from "../../deps.ts";
import { AssertCalled } from "./assert-called.ts";
import { describe } from "./deno-behaviour-test.ts";

describe("assertCalled", (it) => {
  it("should assert a function was called", () => {
    const { assertCalled, stubFn } = new AssertCalled(assert);

    stubFn();

    assertCalled();
  });

  it("should assert a function was not called", () => {
    const { assertNotCalled } = new AssertCalled(assert);

    assertNotCalled();
  });

  it("should be able to wrap a function", () => {
    const { stubFn, assertCalled } = new AssertCalled(assert);

    const { stubFn: callWrappedStubFn } = new AssertCalled(assert, stubFn);

    callWrappedStubFn();

    assertCalled();
  });

  it("wrapped function should be able to return", () => {
    const { stubFn } = new AssertCalled(assert, () => "foo");
    assert(stubFn() === "foo");
  });
});
