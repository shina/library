// deno-lint-ignore-file no-explicit-any

/**
 * Creates a reducer that provides the right strategy for the value being visited
 */
export const visitorReducer = <
  Result,
  Decider extends (decider: T) => CallableFunction = any,
  T = Parameters<Decider>[0],
>(getVisitor: Decider) =>
  (previous: T, current: T): Result => getVisitor(current)(previous);

/**
 * Creates a mapper that provides the right strategy for the value being visited
 */
export const visitorMap = <T>(getVisitor: (decider: T) => CallableFunction) =>
  (value: T) => getVisitor(value)(value);
