
/**
 * Return the value if it's not null or undefined, otherwise throw an error
 */
export function valueOrThrow<T>(value: T, errorFactory: (value: T) => Error): NonNullable<T> {
    return value ?? (() => { throw errorFactory(value); })();
}
