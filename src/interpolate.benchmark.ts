import { bench, runBenchmarks } from "../deps.ts";
import { interpolate } from "./interpolate.ts";

bench(function interpolateBenchmark({ start, stop }) {
  const values = Array
    .from({ length: 99999 })
    .map(() => `{{foo}} {{bar}}`);
  const data = { foo: 'foo', bar: 'bar' };

  start();
  values.map(value => interpolate(value, data));
  stop();
});

runBenchmarks();
