import fs from "node:fs";
import path from "node:path";

const destDir = path.resolve(import.meta.dirname, "../docs/vanilla-js/");
// srcs
const vanillajshtmlsrc = path.resolve(import.meta.dirname, "./index.html");
const vanillajssrc = path.resolve(import.meta.dirname, "./vanilla-js.js");
const coiSrc = path.resolve(import.meta.dirname, "./coi.serviceworker.js");
// dests
const vanillajshtmldest = path.resolve(destDir, "index.html");
const vanillajsdest = path.resolve(destDir, "vanilla-js.js");
const coiDest = path.resolve(destDir, "coi.serviceworker.js");

try {
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(vanillajshtmlsrc, vanillajshtmldest);
  fs.copyFileSync(vanillajssrc, vanillajsdest);
  fs.copyFileSync(coiSrc, coiDest);
} catch (e) {
  console.error(e);
  process.exit(1);
}
