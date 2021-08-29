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
export const reduceUsing =
    (reducer: (prev: any, curr: any) => any) =>
        (data: any[]) =>
            (value: any) =>
                data.reduce(reducer, value);
