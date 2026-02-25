import * as nodepath from "node:path";
import * as nodefs from "node:fs";
import { execSync } from "node:child_process";

/**
 * This script is meant to update js-randomness-predictor in each demo.
 * It looks for directories that contain a package.json file and runs `npm install js-randomness-predictor@latest`
 */

// Any directory with a name that equals any of these values will be ignored.
const dirsToExclude = [".git", ".vscode", "_archives", "node_modules", "docs", "public"];

for (const path of walkDir(".", dirsToExclude)) {
  upgradeJsRandomnessPredictor(path);
}

function dirContainsFile(dirPath, fileName) {
  try {
    return nodefs.readdirSync(dirPath).includes(fileName);
  } catch (e) {
    console.error({ from: "dirContainsFile", path, error: e });
  }
}

function isExcludedDirectory(path, excludeDirs = []) {
  return excludeDirs.some((ed) => path.endsWith(ed));
}

function isDirectory(path) {
  try {
    return nodefs.statSync(path).isDirectory();
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    console.error({ from: "isExcludedDirectory", path, error: e });
  }
}

function upgradeJsRandomnessPredictor(path) {
  try {
    console.log(`Atttempting to upgrade js-randomness-predictor in demo '${path}'`);
    execSync("npm install js-randomness-predictor@latest", {
      cwd: path,
      stdio: "inherit",
    });
    console.log(`\n\t[SUCCESS] Upgrade was successful!\n`);
  } catch (e) {
    console.error({ from: "upgradeJsRandomnessPredictor", path, error: e });
  }
}

function* walkDir(path, excludeDirs = []) {
  try {
    for (const x of nodefs.readdirSync(path)) {
      const xpath = nodepath.resolve(path, x);
      if (!isDirectory(xpath) || isExcludedDirectory(xpath, excludeDirs)) {
        continue;
      }
      if (dirContainsFile(xpath, "package.json")) {
        yield xpath;
      }
      yield* walkDir(xpath, excludeDirs);
    }
  } catch (e) {
    console.error({ from: "walkDir", path, error: e });
  }
}
