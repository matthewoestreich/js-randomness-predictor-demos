const fs = require("fs");
const path = require("path");

const indexhtmlSrc = path.resolve(__dirname, "./index.html");
const destDir = path.resolve(__dirname, "./docs");
const indexhtmlDest = path.resolve(destDir, "index.html");

// JUST TESTING THIS
const emscSrc = path.resolve(__dirname, "./emscripten.html");
const emscDest = path.resolve(destDir, "./emscripten.html");
const emscriptenLoaderSrc = path.resolve(__dirname, "./emscripten-poc-loader.js");
const emscriptenLoaderDest = path.resolve(destDir, "./emscripten-poc-loader.js");
const jsrpLoaderSrc = path.resolve(__dirname, "./js-randomness-predictor-loader.js");
const jsrpLoaderDest = path.resolve(destDir, "./js-randomness-predictor-loader.js");
const jsrpSrc = path.resolve(__dirname, "./js-randomness-predictor.js");
const jsrpDest = path.resolve(destDir, "./js-randomness-predictor.js");

try {
  fs.mkdirSync(destDir);
  fs.copyFileSync(indexhtmlSrc, indexhtmlDest);
  fs.copyFileSync(emscSrc, emscDest);
  fs.copyFileSync(emscriptenLoaderSrc, emscriptenLoaderDest);
  fs.copyFileSync(jsrpSrc, jsrpDest);
  fs.copyFileSync(jsrpLoaderSrc, jsrpLoaderDest);
} catch (e) {
  console.error(e);
  process.exit(1);
}
