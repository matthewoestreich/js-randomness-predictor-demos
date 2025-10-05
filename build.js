import fs from "fs";
import path from "path";

const indexhtmlSrc = path.resolve(import.meta.dirname, "./index.html");
const destDir = path.resolve(import.meta.dirname, "./docs");
const indexhtmlDest = path.resolve(destDir, "index.html");

try {
  fs.mkdirSync(destDir);
  fs.copyFileSync(indexhtmlSrc, indexhtmlDest);
} catch (e) {
  console.error(e);
  process.exit(1);
}
