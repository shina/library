/**
 * Checks an array if there are duplicate values
 */
export function hasDiff(arr: unknown[]): boolean {
  return (new Set(arr)).size > 1;
}
