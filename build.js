const fs = require("fs");
const path = require("path");

const indexhtmlSrc = path.resolve(__dirname, "./index.html");
const destDir = path.resolve(__dirname, "./docs");
const indexhtmlDest = path.resolve(destDir, "index.html");

// JUST TESTING THIS
const jsrpSrc = path.resolve(__dirname, "./js-randomness-predictor.js");
const jsrpDest = path.resolve(destDir, "./js-randomness-predictor.js");

try {
  fs.mkdirSync(destDir);
  fs.copyFileSync(indexhtmlSrc, indexhtmlDest);
  fs.copyFileSync(jsrpSrc, jsrpDest);
} catch (e) {
  console.error(e);
  process.exit(1);
}
