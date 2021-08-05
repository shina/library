
/**
 * Create a debouncer that wait for `ms` milliseconds to execute the last call
 */
export function createDebouncer<T>(setTimeoutFunc: typeof setTimeout, clearTimeoutFunc: typeof clearTimeout, ms: number) {

    let promise: Promise<T> | undefined;
    let resolve: (value: T) => void | undefined;
    let lastFunc: () => T;
    let timeoutRef: number | undefined;

    return function(func: () => T): Promise<T> {
        lastFunc = func;
        if (promise === undefined) {
            promise = new Promise((r) => resolve = r);
        }

        clearTimeoutFunc(timeoutRef);
        timeoutRef = setTimeoutFunc(() => {
            resolve(lastFunc());
            promise = undefined;
        }, ms);

        return promise;
    };
}
