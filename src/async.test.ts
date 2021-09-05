import { assert, assertEquals, test } from "../deps.ts";
import { delay, filterAsync } from "./async.ts";
import { FakeTimeout } from "./test-utils/fake-timeout.ts";

test("filterAsync basic", async () => {
  const result = await filterAsync(
    [1, 2, 3, 4, 5],
    async (item) => (item || 0) > 3,
  );
  assertEquals(result, [4, 5]);
});

test("delay basic", async () => {
  const { setTimeout, setTime } = new FakeTimeout();

  await Promise.all([
    delay(setTimeout, 10),
    setTime(10),
  ]);

  assert(true);
});
