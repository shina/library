
export function recordToTuple(record: Record<string, unknown>): [string, unknown][] {
    return Object.keys(record).map(key => ([key, record[key]]));
}

export function tuplesToObject(tuples: unknown[][]): Record<string, unknown> {
    return tuples.reduce<Record<string, unknown>>(reduceTupleToObject, {});
}

export function reduceTupleToObject(result: Record<string, unknown>, [key, value]: any[]) {
    result[key] = value;
    return result;
}
