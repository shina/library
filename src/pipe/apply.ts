/**
 * Array.map for pipe
 */
export const apply = <U>(fn: (value: any, index: number, array: any[]) => U) => (data: any[]) => data.map<U>(fn);
