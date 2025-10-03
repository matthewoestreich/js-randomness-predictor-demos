const fs = require("fs");
const path = require("path");

const indexhtmlSrc = path.resolve(__dirname, "./index.html");
const destDir = path.resolve(__dirname, "./docs");
const indexhtmlDest = path.resolve(destDir, "index.html");

try {
  fs.mkdirSync(destDir);
  fs.copyFileSync(indexhtmlSrc, indexhtmlDest);
} catch (e) {
  console.error(e);
  process.exit(1);
}
