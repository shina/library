import { valueOrThrow } from "./type-checking.ts";

/**
 * Creates a provider of strategies. It look for the right strategy by a pre specified key.
 */
export const strategyGetter = (getter: (key: any) => (...args: any[]) => any) =>
  (key: any) =>
    valueOrThrow(getter(key), () => new Error("Strategy not found"));

/**
 * Creates a provider of strategies. It look for the right strategy by a predicate function.
 *
 * ```ts
 * const provider = strategyFinder([
 *  (val) => val === 1 ? fn : false,
 *  ...
 * ]);
 * ```
 */
export const strategyFinder = (
  strategies: Array<(value: any) => ((...args: any[]) => any) | false>,
) =>
  (value: any) =>
    valueOrThrow(
      strategies.find((strategy) => strategy(value)),
      () => new Error("Strategy not found"),
    )(value) as (...args: any[]) => any;
