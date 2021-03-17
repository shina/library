import { assertEquals } from "./deps.ts";

export function recordToTuple(record: Record<string, unknown>): [string, unknown][] {
    return Object.keys(record).map(key => ([key, record[key]]));
}

Deno.test("recordToTuple basic", () => {
    const obj = {
        foo: "abc",
        bar: "xyz"
    };

    assertEquals(recordToTuple(obj), [["foo", "abc"], ["bar", "xyz"]]);
});


export function tuplesToObject(tuples: unknown[][]): Record<string, unknown> {
    return tuples.reduce<Record<string, unknown>>(reduceTupleToObject, {});
}

export function reduceTupleToObject(result: Record<string, unknown>, [key, value]: any[]) {
    result[key] = value;
    return result;
}

Deno.test("tuplesToObject basic", () => {
    const tuples = [['foo', 1], ['bar', 2]];

    assertEquals(tuplesToObject(tuples), { foo: 1, bar: 2 });
});
Deno.test("reduceTupleToObject basic", () => {
    const tuples = [["foo", "abc"], ["bar", "xyz"]];

    assertEquals(tuples.reduce(reduceTupleToObject, {}), { foo: "abc", bar: "xyz" });
});
