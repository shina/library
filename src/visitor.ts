/**
 * Creates a reducer that provides the right strategy for the value being visited
 */
export const visitorReducer = (
  getVisitor: (decider: any) => (data: any) => any,
) => (previous: any, current: any) => getVisitor(current)(previous);

/**
 * Creates a mapper that provides the right strategy for the value being visited
 */
export const visitorMap = (getVisitor: (decider: any) => (val: any) => any) =>
  (value: any) => getVisitor(value)(value);
