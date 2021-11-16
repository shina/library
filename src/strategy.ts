// deno-lint-ignore-file no-explicit-any

import { valueOrThrow } from "./type-checking.ts";

/**
 * Creates a provider of strategies. It look for the right strategy by a pre specified key.
 */
export const strategyGetter = <
  Result,
  Getter extends (key: T) => (...args: any[]) => Result = any,
  T = Parameters<Getter>[0],
>(getter: Getter) =>
  (key: T) => valueOrThrow(getter(key), () => new Error("Strategy not found"));

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
export const strategyFinder = <T, F>(
  strategies: Array<(value: T) => F | false>,
) =>
  (value: T) =>
    valueOrThrow(
      strategies.find((strategy) => strategy(value)),
      () => new Error("Strategy not found"),
    )(value) as F;
