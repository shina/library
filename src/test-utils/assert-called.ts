export class AssertCalled {
  private wasCalled = false;

  constructor(
    private assertFn: (result: boolean) => void,
    private wrapFn?: (...params: unknown[]) => unknown,
  ) {
  }

  stubFn = (...params: unknown[]) => {
    this.wasCalled = true;
    if (this.wrapFn) {
      return this.wrapFn(...params);
    }
  };

  assertCalled = () => {
    this.assertFn(this.wasCalled);
  };

  assertNotCalled = () => {
    this.assertFn(!this.wasCalled);
  };
}
