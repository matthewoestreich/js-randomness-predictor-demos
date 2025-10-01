const fs = require("fs");
const path = require("path");

const indexhtmlSrc = path.resolve(__dirname, "./index.html");
const destDir = path.resolve(__dirname, "./docs");
const indexhtmlDest = path.resolve(destDir, "index.html");

// JUST TESTING THIS
const emscSrc = path.resolve(__dirname, "./emscripten.html");
const emscDest = path.resolve(destDir, "./emscripten.html");
const emscriptenLoaderSrc = path.resolve(__dirname, "./js-randomness-predictor-loader.js");
const emscriptenLoaderDest = path.resolve(destDir, "./js-randomness-predictor-loader.js");

try {
  fs.mkdirSync(destDir);
  fs.copyFileSync(indexhtmlSrc, indexhtmlDest);
  fs.copyFileSync(emscSrc, emscDest);
  fs.copyFileSync(emscriptenLoaderSrc, emscriptenLoaderDest);
} catch (e) {
  console.error(e);
  process.exit(1);
}
