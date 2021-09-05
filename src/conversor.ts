/**
 * Converts an indexed object to key-value tuples
 * { foo: "bar", lorem: "ipsum" } -> [["foo", "bar], ["lorem", "ipsum"]]
 */
export function recordToTuples(
  record: Record<string, unknown>,
): [string, unknown][] {
  return Object.keys(record).map((key) => ([key, record[key]]));
}

/**
 * Converts key-value tuples into an object
 * [["foo", "bar], ["lorem", "ipsum"]] -> { foo: "bar", lorem: "ipsum" }
 */
export function tuplesToObject(tuples: unknown[][]): Record<string, unknown> {
  return tuples.reduce<Record<string, unknown>>(reduceTuplesToObject, {});
}

/**
 * The same as `tuplesToObject` but to be used with `Array.reduce` function
 * ```
 * const myObj = {
 *     foo: 1,
 *     bar: 1
 * }
 * const processedObj = recordToTuples(myObj)
 *   .map(...) // process your data
 *   .reduce(reduceTuplesToObject, {});
 * ```
 */
export function reduceTuplesToObject(
  result: Record<string, unknown>,
  [key, value]: any[],
) {
  result[key] = value;
  return result;
}
