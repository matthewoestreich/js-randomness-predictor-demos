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
  logFoundBuildCommand(currentCommand, c.description, c.env, c.devEnv);
  command += currentCommand;
  if (i < commands.length - 1) {
    command += " && ";
  }
}

try {
  execSync(command, { stdio: "inherit" });
  const n_hashtags = 75;
  console.log(
    `\n\n${lightBlue(hashtags(n_hashtags))}` + green("\n\tSuccess! All builds ran without error!\n") + `${lightBlue(hashtags(n_hashtags))}\n\n`,
  );
  process.exit(0);
} catch (e) {
  console.log(red(`Something went wrong!`, e.message));
  process.exit(1);
}

/************************** Random functions ****************************/

function logFoundBuildCommand(currentCommand, description, env = [], devEnv = []) {
  console.log(green("Found build command:"));
  console.log(
    "\tCommand\t\t",
    lightBlue(currentCommand),
    "\n\tDescription\t",
    cyan(description ?? "-"),
    "\n\tENV\t\t",
    cyan(env.length > 0 ? env.join(" ") : "-"),
    "\n\tDEV_ENV\t\t",
    cyan(devEnv.length > 0 ? devEnv.join(" ") : "-"),
    "\n",
  );
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

function lightBlue(...text) {
  return `\x1b[94m${text.join(" ")}\x1b[0m`;
}

function magenta(...text) {
  return `\x1b[35m${text.join(" ")}\x1b[0m`;
}

function cyan(...text) {
  return `\x1b[36m${text.join(" ")}\x1b[0m`;
}
