import {assert, assertEquals} from "./build/deps.ts";

/**
 * Not the fastest (might be faster than serialize/parse) but the most safe way to clone an object
 * It considers primitive types, simple objects and classes
 */
export function clone(obj) {
    if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) return obj;

    if (obj) {
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

Deno.test("clone: simple objects", () => {
    const obj = {};

    assertEquals(clone(obj), obj);
    assert(clone(obj) !== obj);
});
Deno.test("clone: array", () => {
    const array = [1, 2, 3];

    assertEquals(clone(array), array);
    assert(clone(array) !== array);
});
Deno.test("clone: date", () => {
    const date = new Date();

    assertEquals(clone(date), new Date(date.getTime()));
    assert(clone(date) !== date);
});
Deno.test("clone: regexp", () => {
    const regexp = /abc/;

    assertEquals(clone(regexp), /abc/);
    assert(clone(regexp) !== regexp);
});
Deno.test("clone: function", () => {
    const func = () => { return null; };

    assert(clone(func) !== func);
});
Deno.test("clone: string", () => {
    const str = new String("string");

    assertEquals(clone(str), new String("string"));
    assert(clone(str) !== str);
});
Deno.test("clone: number", () => {
    const number = new Number(123);

    assertEquals(clone(number), new Number(123));
    assert(clone(number) !== number);
});
Deno.test("clone: boolean", () => {
    const bool = new Boolean(true);

    assertEquals(clone(bool), new Boolean(true));
    assert(clone(bool) !== bool);
});
Deno.test("clone: class", () => {
    class MyClass {
        constructor() {
            this.a = "foo";
        }
        bar() {
            return "bar";
        }
    }

    const myclass = new MyClass();

    assertEquals(clone(myclass).a, "foo");
    assertEquals(clone(myclass).bar(), "bar");
    assert(clone(myclass) !== new MyClass());
});
Deno.test("clone: nested object", () => {
    class MyClass {}

    const myClass = new MyClass();
    const obj = {
        foo: "foo",
        bar: {
            foo: "foo",
            baz: myClass
        }
    };

    assertEquals(clone(obj), obj);
    assert(clone(obj) !== obj);
    assert(clone(obj).bar.baz !== myClass)
});


/**
 * cloneWith make a copy of the obj and merge with newObj
 */
export function cloneWith(obj, newObj) {
    return {
        ...clone(obj),
        ...newObj
    }
}

Deno.test("cloneWith: basic", () => {
    const obj = { foo: "bar" };
    const cloned = cloneWith(obj, { bar: "baz" });

    assertEquals(cloned, { foo: "bar", bar: "baz" });
});
Deno.test("cloneWith: overwrite property", () => {
    const obj = { foo: "foo", bar: "bar" };
    const cloned = cloneWith(obj, { bar: "baz" });

    assertEquals(cloned, { foo: "foo", bar: "baz" });
});
