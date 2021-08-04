/**
 * Eric Elliott's pipe function
 * @see https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea
 */
export const pipe = <T = any>(...fns: any[]) => (x?: any) => fns.reduce<T>((v: any, f: any) => f(v), x);
