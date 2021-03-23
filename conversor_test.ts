import { assertEquals } from "./build/deps.ts";
import {recordToTuple, reduceTupleToObject, tuplesToObject} from "./conversor.ts";


Deno.test("recordToTuple basic", () => {
    const obj = {
        foo: "abc",
        bar: "xyz"
    };

    assertEquals(recordToTuple(obj), [["foo", "abc"], ["bar", "xyz"]]);
});


Deno.test("tuplesToObject basic", () => {
    const tuples = [['foo', 1], ['bar', 2]];

    assertEquals(tuplesToObject(tuples), { foo: 1, bar: 2 });
});
Deno.test("reduceTupleToObject basic", () => {
    const tuples = [["foo", "abc"], ["bar", "xyz"]];

    assertEquals(tuples.reduce(reduceTupleToObject, {}), { foo: "abc", bar: "xyz" });
});
