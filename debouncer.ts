
export function debouncer<T>(ms: number) {
    let promise: Promise<T> | undefined;
    let resolve: (value: T) => void | undefined;
    let lastFunc: () => T;
    let timeout: number | undefined;

    return function(func: () => T): Promise<T> {
        lastFunc = func;
        if (promise === undefined) {
            promise = new Promise((r) => resolve = r);
        }

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            resolve(lastFunc());
            promise = undefined;
        }, ms);

        return promise;
    };
}
