/**
 * Create a debouncer that wait for `ms` milliseconds to execute the last call
 */
export class Debouncer<T> {
  protected promise?: Promise<T>;
  protected resolve!: (value: T) => void;
  protected lastFunc!: () => T;
  protected timeoutRef?: number;

  constructor(
    protected setTimeoutFunc: typeof setTimeout,
    protected clearTimeoutFunc: typeof clearTimeout,
    protected ms: number,
  ) {}

  debounce = (fn: () => T) => {
    this.lastFunc = fn;
    if (this.promise === undefined) {
      this.promise = new Promise((r) => this.resolve = r);
    }

    this.clearTimeoutFunc(this.timeoutRef);
    this.timeoutRef = this.setTimeoutFunc.call(null, () => {
      this.resolve(this.lastFunc());
      this.promise = undefined;
    }, this.ms);

    return this.promise;
  };
}
