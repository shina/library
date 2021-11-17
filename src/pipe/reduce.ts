// deno-lint-ignore-file no-explicit-any

/**
 * Reducer in FP style
 *
 * ```ts
 * // argument #1: reducer
 * const sum = reduceUsing((prev, curr) => prev + curr);
 *
 * // argument #2: array
 * const dataSum = sum([1, 2, 3]);
 *
 * // argument #3: initial data
 * dataSum(0);
 *
 * // output: 6
 * ```
 */
export const reduceUsing = <
  Result,
  Reducer extends (prev: Result, curr: T) => Result = any,
  T = Parameters<Reducer>[1],
>(reducer: Reducer) =>
  (data: T[]) => (value: Result) => data.reduce<Result>(reducer, value);

export function reduceObjectsInOne<
  R extends Record<string | number | symbol, unknown>,
>(objs: R[], startsWith = {}): R {
  const objectMerger = reduceUsing<R>(
    (prev: R, curr: R) => ({ ...prev, ...curr }),
  );

  return objectMerger(objs)(startsWith as R);
}

export function mergeArrays<
  R extends any[],
  >(objs: R[], startsWith = []): R {
  const arrayMerger = reduceUsing<R>((prev: R, curr: R) => ([ ...prev, ...curr ]));

  return arrayMerger(objs)(startsWith as any);
}
