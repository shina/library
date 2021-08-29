
/**
 * Return the value if it's not null or undefined, otherwise throw an error
 */
export function valueOrThrow<T>(value: T, errorFactory: (value: T) => Error): NonNullable<T> {
    return value ?? (() => { throw errorFactory(value); })();
}

/**
 * Execute a function, if it fails, ignore returning `null`
 */
export function executeOrIgnore<T extends (...params: any[]) => any>(fn: T): (...params: Parameters<T>) => ReturnType<T> | null {
    return (...params) => {
        try {
            return fn(...params);
        } catch {
            return null;
        }
    }
}
