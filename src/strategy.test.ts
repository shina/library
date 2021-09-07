import { assert, assertEquals, test } from "../deps.ts";
import { strategyFinder, strategyGetter } from "./strategy.ts";

const helloWorldFn = (text: string) => "hello " + text;
const reverseStrFn = (text: string) => Array.from(text).reverse().join("");

test("strategy getter", () => {
  const strategies = new Map();
  strategies.set("foo", helloWorldFn);
  strategies.set("bar", reverseStrFn);

  const strategyProvider = strategyGetter(Map.prototype.get.bind(strategies));
  const fooFn = strategyProvider("foo");
  assert(fooFn("world") === "hello world");
});

test("strategy finder", () => {
  const strategies = [
    (val: string) => val === "world" ? helloWorldFn : false,
    (val: string) => val === "reverse" ? reverseStrFn : false,
  ];

  const strategyProvider = strategyFinder(strategies);
  const strategyProvider1 = strategyProvider("world");
  assertEquals(strategyProvider1("world"), "hello world");
});
