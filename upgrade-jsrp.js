import * as nodepath from "node:path";
import * as nodefs from "node:fs";
import { execSync } from "node:child_process";

/**
 * This script is meant to update js-randomness-predictor in each demo.
 * It looks for directories that contain a package.json file and runs `npm install js-randomness-predictor@latest`
 *
 * @argv --dry-run
 * You can use `node upgrade-jsrp.js --dry-run` to just print the paths we found where we would have
 * attempted to upgrade js-randomness-predictor.
 */

const argv = process.argv.slice(2);
const isDryRun = argv.includes("--dry-run");

// Ignore any directory (in any path) that ends with one of..
const dirsToExclude = [".git", ".vscode", "_archives", "node_modules", "docs", "public", "bun", "deno"];

for (const path of findDemoDirs(".", dirsToExclude)) {
  isDryRun ? console.log(green(path)) : runCommand("npm install js-randomness-predictor@latest", path);
}

// Need to upgrade bun and deno separetly
runCommand("bun add js-randomness-predictor@latest", nodepath.resolve("./bun"));
runCommand("deno add npm:js-randomness-predictor@latest", nodepath.resolve("./deno"));

// ======================== Helper functions ==========================================================

function runCommand(command, workingDir) {
  try {
    console.log(green(`Running command : '${command}' in directory : '${workingDir}'`));
    execSync(command, {
      cwd: workingDir,
      stdio: "inherit",
    });
    console.log(green(`Successfully ran command : '${command}' in directory : '${workingDir}'`));
  } catch (e) {
    logErrorAndExit(command, { cwd: workingDir, error: e });
  }
}

// Doesn't throw if file doesn't exist, just returns false. All other errors are thrown, though!
function isFile(path) {
  try {
    return nodefs.statSync(path).isFile();
  } catch (e) {
    if (e.code === "ENOENT") {
      return false;
    }
    throw e;
  }
}

// Recursively walks all dirs starting from `path`.
// Ignores any directory included in `excludedDirs`.
function* findDemoDirs(path, excludeDirs = []) {
  try {
    for (const x of nodefs.readdirSync(path)) {
      const xpath = nodepath.resolve(path, x);
      // Ignore files and excluded dirs.
      if (isFile(xpath) || excludeDirs.some((ed) => xpath.endsWith(ed))) {
        continue;
      }
      // If directory has a package.json file, we have found a target.
      if (isFile(nodepath.resolve(xpath, "package.json"))) {
        yield xpath;
      }
      yield* findDemoDirs(xpath, excludeDirs);
    }
  } catch (e) {
    logErrorAndExit("findDemoDirs", { path, excludeDirs, error: e });
  }
}

function logErrorAndExit(functionName, otherData = {}) {
  console.log(red("ERROR : SOMETHING WENT WRONG!"));
  console.error({ from: functionName, ...otherData });
  process.exit(1);
}

function green(text) {
  return `\x1b[32m${text}\x1b[0m`;
}

function red(text) {
  return `\x1b[31m${text}\x1b[0m`;
}
