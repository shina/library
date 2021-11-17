/**
 * This file is not suppose to be here.
 * TODO: move it to its own project
 */

import { walkSync } from "https://deno.land/std@0.114.0/fs/mod.ts";
import { Command } from "https://deno.land/x/cliffy/command/mod.ts";
import { pipe, pipeFrom } from "./src/pipe/pipe.ts";
import { filter, join, map } from "./src/pipe/array.ts";
import { interpolate } from "./src/interpolate.ts";

/**
 * Return type of `walkSync`
 */
interface DirEntry {
  path: string;
  name: string;
  isFile: boolean;
  isDirectory: boolean;
  isSymlink: boolean;
}

/**
 * The same as `walkSync` but return as an array
 */
function readDirectory(path: string): DirEntry[] {
  const result = [];
  for (const entry of walkSync(path)) {
    result.push(entry);
  }

  return result;
}

/**
 * Recursively read a folder and return the Typescripts to include in the barrel file
 * It excludes test and benchmark files.
 */
const readFilesForBarrel: (path: string) => string[] = pipe(
  readDirectory,
  filter<DirEntry>((entry) => entry.isFile),
  filter<DirEntry>((entry) => entry.name.includes(".ts")),
  filter<DirEntry>((entry) => !entry.name.includes(".test.ts")),
  filter<DirEntry>((entry) => !entry.name.includes(".benchmark.ts")),
  map<DirEntry, string>((entry) => entry.path),
);

/**
 * Write the list of `filePaths` in the barrel file
 */
function writePublicApi(
  filePaths: string[],
  outputFile = "./public-api.ts",
  tmpl = `export * from "./{{ path }}";\n`,
) {
  const encoder = new TextEncoder();
  const data = pipeFrom<string>(filePaths)(
    map((path: string) => interpolate(tmpl, { path })),
    join(""),
  );

  Deno.writeFile(outputFile, encoder.encode(data));
}

const { options, args } = await new Command()
  .name("create-public-api")
  .version("0.1.0")
  .description(
    "Automatically reads the TS files inside a folder (recursively) and write it in a barrel file",
  )
  .arguments("<sourceFolder>")
  .option("--output [string]", "Set the output file", {
    default: "./public-api.ts",
  })
  .option(
    "--template [string]",
    "Set the template to be used in the export line",
    { default: `export * from "./{{path}}";\n` },
  )
  .parse(Deno.args);

writePublicApi(
  readFilesForBarrel(args[0]),
  options.output,
  options.template,
);
