import { bench, runBenchmarks } from "../../deps.ts";
import { rotateMatrix90 } from "./rotate.ts";

bench(function rotateBenchmark({ start, stop }) {
  const matrix = Array
    .from({ length: 6000 })
    .map(() => {
      return Array
        .from({ length: 5000 })
        .map(() => 1);
    });

  start();
  rotateMatrix90(matrix);
  stop();
});

runBenchmarks();
