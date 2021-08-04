import { valueOrThrow } from './type-checking.ts';
import { assertEquals, assertThrows } from '../deps.ts';

Deno.test("valueOrThrow", () => {
    const errorFactory = () => new Error();

    assertEquals(valueOrThrow("random value", errorFactory), "random value");
    assertEquals(valueOrThrow(0, errorFactory), 0);
    assertEquals(valueOrThrow(true, errorFactory), true);
    assertEquals(valueOrThrow(false, errorFactory), false);
    assertThrows(() => valueOrThrow(null, errorFactory));
    assertThrows(() => valueOrThrow(undefined, errorFactory));
});
