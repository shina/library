import { executeOrIgnore, valueOrThrow } from "./type-checking.ts";
import {
  assert,
  assertEquals,
  assertThrows,
  assertThrowsAsync,
  test,
} from "../deps.ts";

test("valueOrThrow", () => {
  const errorFactory = () => new Error();

  assertEquals(valueOrThrow("random value", errorFactory), "random value");
  assertEquals(valueOrThrow(0, errorFactory), 0);
  assertEquals(valueOrThrow(true, errorFactory), true);
  assertEquals(valueOrThrow(false, errorFactory), false);
  assertThrows(() => valueOrThrow(null, errorFactory));
  assertThrows(() => valueOrThrow(undefined, errorFactory));
});

test("executeOrIgnore", () => {
  const fnThrows = executeOrIgnore(() => {
    throw new Error();
  });
  const fnFoo = executeOrIgnore(() => "foo");

  assert(fnThrows() === null);
  assert(fnFoo() === "foo");
});

test("executeOrIgnore with params", () => {
  const fnWithParams = executeOrIgnore((firstname: string, lastname: string) =>
    `${firstname} ${lastname}`
  );

  assert(fnWithParams("foo", "bar") === "foo bar");
});

test("executeOrIgnore with promise", async () => {
  const fnThrows = executeOrIgnore(async () => {
    throw new Error();
  });

  assert(await fnThrows() === null);
});

test("executeOrIgnore ignores only one type of error", async () => {
  class TestError extends Error {}
  const ignoreError = (e: Error) => e instanceof TestError;

  const fnIgnore = executeOrIgnore(() => {
    throw new TestError();
  }, ignoreError);
  const fnAsyncIgnore = executeOrIgnore(async () => {
    throw new TestError();
  }, ignoreError);
  const fnThrows = executeOrIgnore(() => {
    throw new Error();
  }, ignoreError);
  const fnAsyncThrows = executeOrIgnore(async () => {
    throw new Error();
  }, ignoreError);

  assert(fnIgnore() === null);
  assert(await fnAsyncIgnore() === null);
  assertThrows(() => {
    fnThrows();
  });
  assertThrowsAsync(async () => {
    await fnAsyncThrows();
  });
});
