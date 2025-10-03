const fs = require("fs");
const path = require("path");

const destDir = path.resolve(__dirname, "../docs/vanilla-js/");
// srcs
const vanillajshtmlsrc = path.resolve(__dirname, "./index.html");
const vanillajssrc = path.resolve(__dirname, "./vanilla-js.js");
const coiSrc = path.resolve(__dirname, "./coi.serviceworker.js");
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
