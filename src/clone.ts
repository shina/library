// @ts-nocheck

/**
 * Not the fastest (might be faster than serialize/parse) but the most safe way to clone an object
 * It considers primitive types, simple objects and classes
 */
export function clone<T>(obj: T): T {
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return obj;
  } else if (
    (obj.constructor === Date || obj.constructor === RegExp ||
      obj.constructor === Function ||
      obj.constructor === String || obj.constructor === Number ||
      obj.constructor === Boolean)
  ) {
    return new obj.constructor(obj);
  } else {
    const newObj = new obj.constructor();

    Object.keys(obj)
      .map((k) => {
        if (typeof obj[k] !== "object") {
          newObj[k] = obj[k];
        } else {
          newObj[k] = clone(obj[k] as {});
        }
      });

    return newObj;
  }
}

/**
 * cloneWith make a copy of the obj and merge with newObj
 */
export function cloneWith(
  obj: { [key: string]: unknown },
  newObj: { [key: string]: unknown },
) {
  return {
    ...clone(obj),
    ...newObj,
  };
}
