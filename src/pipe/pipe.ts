// deno-lint-ignore-file no-explicit-any

/**
 * Eric Elliott's pipe function
 * @see https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea
 */
export const pipe = <U>(...fns: CallableFunction[]) =>
  (x?: any) => fns.reduce<U>((v: any, f: CallableFunction) => f(v), x);

export const pipeFrom = <U>(x?: any) =>
  (...fns: CallableFunction[]) =>
    fns.reduce<U>((v: any, f: CallableFunction) => f(v), x);
