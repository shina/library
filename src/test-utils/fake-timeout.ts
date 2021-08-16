/**
 * FakeTimeout is intended to simulate the `setTimeout` in test cases
 * It mocks the time so you can travel forward instantly. (or even backwards but it is useless)
 */
export class FakeTimeout {
    private fakeTimeouts: FakeTimeoutUnit[] = [];

    setTimeout: typeof setTimeout = (...params) => {
        const count = this.fakeTimeouts.push(new FakeTimeoutUnit());
        const index = count - 1;
        this.fakeTimeouts[index].setTimeout(...params);
        return index;
    }

    clearTimeout: typeof clearTimeout = (handle) => {
        if (handle !== undefined) {
            this.fakeTimeouts[handle].clearTimeout();
        }
    }

    setTime = (ms: number) => {
        this.fakeTimeouts.forEach(ft => ft.setTime(ms));
    }
}

/**
 * Handles one single timeout, helper class to make build the `FakeTimeout`
 */
class FakeTimeoutUnit {

    private handler?: () => void;
    private timeout!: number;

    setTimeout: typeof setTimeout = (handler, timeout) => {
        this.handler = handler;
        this.timeout = timeout ?? 0;
        this.setTime(0);

        return 0;
    }

    clearTimeout: typeof clearTimeout = () => {
        this.handler = undefined;
    }

    setTime = (ms: number) => {
        if (ms >= this.timeout && this.handler) {
            this.handler();
        }
    }
}
