const cwd = Deno.cwd();

export default {
  install: `deno cache ${cwd}/deps.ts --lock=${cwd}/lock.json`,
  update: `deno cache ${cwd}/deps.ts --lock=${cwd}/lock.json --lock-write`,
  lint: `deno lint --ignore=deno.d.ts`,
};
