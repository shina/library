import { test } from "../../deps.ts";

interface TestFn {
  (...params: any[]): any;
}

interface It {
  (description: string, fn?: TestFn): any;
}

export function describe(what: string, fn: (it: It) => any) {
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
