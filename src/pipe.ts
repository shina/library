/**
 * Eric Elliott's pipe function
 * @see https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea
 */
export const pipe = (...fns: CallableFunction[]) =>
  (x?: unknown) => fns.reduce((v: unknown, f: CallableFunction) => f(v), x);
