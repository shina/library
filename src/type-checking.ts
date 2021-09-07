/**
 * Return the value if it's not null or undefined, otherwise throw an error
 */
export function valueOrThrow<T>(
  value: T,
  errorFactory: (value: T) => Error,
): NonNullable<T> {
  return value ?? (() => {
    throw errorFactory(value);
  })();
}

/**
 * Creates a function, when executed: if it fails, ignore returning `null`
 * Or set `ignoreError` predicate to choose when the error has to be ignored
 */
export function executeOrIgnore<
  T extends CallableFunction,
>(
  fn: T,
  ignoreError: (e: Error) => boolean = () => true,
): CallableFunction {
  return (...params: unknown[]) => {
    try {
      const result = fn(...params);
      if (result instanceof Promise) {
        return result.catch((e: Error) => {
          if (ignoreError(e)) {
            return null;
          } else {
            throw e;
          }
        });
      } else {
        return result;
      }
    } catch (e) {
      if (ignoreError(e)) {
        return null;
      } else {
        throw e;
      }
    }
  };
}
