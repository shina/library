// deno-lint-ignore-file no-explicit-any

/**
 * Array.filter for pipe
 */
export const filter = <T>(
  predicate: (value: T, index: number, array: T[]) => boolean,
) => (data: T[]): T[] => data.filter(predicate);

/**
 * Array.join for pipe
 */
export const join = (separator?: string) =>
  (data: string[]) => data.join(separator);

/**
 * Array.flat for pipe
 */
export const flat = (data: any[]) => data.flat();

/**
 * Array.map for pipe
 */
export const map = <T, U>(fn: (value: T, index: number, array: T[]) => U) =>
  (data: T[]) => data.map<U>(fn);
