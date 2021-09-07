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
export const reduceUsing = <T>(reducer: (prev: T, curr: T) => T) =>
  (data: T[]) => (value: T) => data.reduce(reducer, value);
