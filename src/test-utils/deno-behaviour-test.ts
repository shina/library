import { test } from "../../deps.ts";

interface TestFn {
  (...params: unknown[]): void;
}

interface It {
  (description: string, fn?: TestFn): void;
}

export function describe(what: string, fn: (it: It) => void) {
  fn(createIt(what));
}

const createIt = (what: string) =>
  (description: string, fn?: TestFn) => {
    if (fn) {
      test(`${what} ${description}`, fn);
    } else {
      test(`${what} ${description}`, () => {});
    }
  };
