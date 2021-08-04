export function valueOrThrow<T>(value: T, errorFactory: (value: T) => Error): NonNullable<T> {
    return value ?? (() => { throw errorFactory(value); })();
}
