/**
 * Creates a reducer that provides the right strategy for the value being visited
 */
export const visitorReducer = <T>(
  getVisitor: (decider: T) => CallableFunction,
) => (previous: T, current: T) => getVisitor(current)(previous);

/**
 * Creates a mapper that provides the right strategy for the value being visited
 */
export const visitorMap = <T>(getVisitor: (decider: T) => CallableFunction) =>
  (value: T) => getVisitor(value)(value);
