#!/usr/bin/env node

/**
 *
 * What is this?
 *  Instead of having an npm command that is 4,000 characters long, just run this script.
 *
 * Details?
 *  If you run this script with an env var "DEV" with **any value** we will prepend all
 *  `devEnv` variables specified (the `devEnv` array in `build_commands.json`). If no
 *  "DEV" env var is found, we run in "production" mode. Meaning, all "env" variables
 *  specified will be prepended to the command.
 *
 *  Assume your build command is being called relative to project root.
 *
 * Examples?
 *  $ DEV=1 ./npm.build.js // -> runs builds in dev mode (if you specified devEnv vars, it isn't magic...)
 *  $ ./npm.build.js // -> runs builds in "prod" (more like non-dev) mode..
 *
 */

import { execSync } from "node:child_process";
import commands from "./build_commands.json" with { type: "json" };

let command = "";

for (let i = 0; i < commands.length; i++) {
  const c = commands[i];
  const current = [c.command];

  if (process.env.DEV !== undefined) {
    if (c.devEnv.length > 0) {
      current.unshift(...c.devEnv);
    }
  } else if (c.env.length > 0) {
    current.unshift(...c.env);
  }

  const currentCommand = current.join(" ");
  logFoundBuildCommand(currentCommand, c.description);
  command += currentCommand;

  if (i < commands.length - 1) {
    command += " && ";
  }
}

try {
  logFullCommand(command);
  execSync(command, { stdio: "inherit" });
  logSuccess();
  process.exit(0);
} catch (e) {
  console.log(red(`Something went wrong!`, e.message));
  process.exit(1);
}

/************************** Random functions ****************************/

function logFoundBuildCommand(command, description) {
  console.log(green("Found build command:"));
  console.log("\tCommand\t\t", blue(command), "\n\tDescription\t", cyan(description ?? "-"), "\n");
}

function logFullCommand(fullCommand) {
  console.log(hashtags(75));
  console.log(yellow("BUILDING FOR :", process.env.DEV === undefined ? "prod" : "dev"));
  console.log(hashtags(75));
  console.log(cyan("Full build command:"));
  console.log(
    magenta(
      fullCommand
        .split("&&")
        .map((e) => `\t${e}`)
        .join("&& \\\n")
        .trimEnd("&& \\n"),
    ),
  );
  console.log(hashtags(75));
}

function logSuccess() {
  console.log(`\n\n${blue(hashtags(75))}` + green("\n\tSuccess! All builds ran without error!\n") + `${blue(hashtags(75))}\n\n`);
}

function hashtags(n = 10) {
  return "#".repeat(n);
}

function red(...text) {
  return `\x1b[31m${text.join(" ")}\x1b[0m`;
}

function green(...text) {
  return `\x1b[32m${text.join(" ")}\x1b[0m`;
}

function yellow(...text) {
  return `\x1b[33m${text.join(" ")}\x1b[0m`;
}

function blue(...text) {
  return `\x1b[94m${text.join(" ")}\x1b[0m`;
}

function magenta(...text) {
  return `\x1b[35m${text.join(" ")}\x1b[0m`;
}

function cyan(...text) {
  return `\x1b[36m${text.join(" ")}\x1b[0m`;
}
