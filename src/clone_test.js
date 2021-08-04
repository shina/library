import {assert, assertEquals} from "../deps.ts";
import {clone, cloneWith} from "./clone.js";

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
