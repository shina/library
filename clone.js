/**
 * Not the fastest (might be faster than serialize/parse) but the most safe way to clone an object
 * It considers primitive types, simple objects and classes
 */
export function clone(obj) {
    if (obj === null || typeof obj !== "object") return obj;

    if (obj) {
        if (obj.constructor !== Object && obj.constructor !== Array) return obj;
        if ((obj.constructor === Date || obj.constructor === RegExp || obj.constructor === Function ||
            obj.constructor === String || obj.constructor === Number || obj.constructor === Boolean)) {
            return new obj.constructor(obj);
        }

        const newObj = new obj.constructor();

        Object.keys(obj)
            .map((k) => {
                if (typeof obj[k] !== 'object') {
                    newObj[k] = obj[k];
                } else {
                    newObj[k] = clone(obj[k]);
                }
            });

        return newObj;
    }
}
