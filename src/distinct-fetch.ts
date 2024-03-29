import { executeOrIgnore } from "./type-checking.ts";

/**
 * DistinctFetch has a method `fetch` which is intended to be like the regular `fetch`
 * but it never do another request while some other request is being made (by this particular instance)
 *
 * When the `fetch` is called while another request is in progress, it cancels that and start the
 * new one, throwing an Exception to the cancelled request.
 */
export class DistinctFetch {
  private abortController?: AbortController;

  constructor(
    private fetchFn: typeof fetch,
    ignoreError = false,
  ) {
    if (ignoreError) {
      this.fetchFn = executeOrIgnore(
        this.fetchFn,
        (e: Error) => e.name === "AbortError",
      ) as typeof fetch;
    }
  }

  fetch: typeof fetch = (
    request,
    fetchOptions?,
  ) => {
    this.abortController?.abort();
    this.abortController = new AbortController();

    fetchOptions = {
      ...fetchOptions ?? {},
      signal: this.abortController.signal,
    };
    return this.fetchFn(request, fetchOptions);
  };
}
