/**
 * filterAsync is an alternative to Array.filter to use asynchronous conditions
 * e.g. make a http request on each test or consult the IndexedDB
 */
export async function filterAsync<T>(
  arr: T[],
  test: (item?: T) => Promise<boolean>,
) {
  arr = arr.reverse();
  const result = [];
  while (arr.length > 0) {
    const item = arr.pop();
    if (await test(item)) {
      result.push(item);
    }
  }

  return result;
}

/**
 * delay delays your code =)
 * Be careful where/how you will use this
 */
export function delay(
  setTimeoutFunc: typeof setTimeout,
  ms: number,
): Promise<void> {
  return new Promise((resolve: () => void) => {
    setTimeoutFunc(resolve, ms);
  });
}
