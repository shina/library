import { describe } from "./deno-behaviour-test.ts";
import { assert } from "../../deps.ts";

describe("Deno BDD", (it) => {
    it("should be used to just describe");
    it("should work", () => {
        assert(true);
    });
});
