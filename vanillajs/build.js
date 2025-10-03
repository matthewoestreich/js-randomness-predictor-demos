const fs = require("fs");
const path = require("path");

const destDir = path.resolve(__dirname, "../docs");
// srcs
const vanillajshtmlsrc = path.resolve(__dirname, "./index.html");
const coiserviceworkerSourcePath = path.resolve(__dirname, "./coi.serviceworker.js");
const vanillajssrc = path.resolve(__dirname, "./vanilla-js.js");
// dests
const vanillajshtmldest = path.resolve(destDir, "vanilla-js.html");
const vanillajsdest = path.resolve(destDir, "vanilla-js.js");
const coiserviceworkerDestPath = path.resolve(destDir, "coi.serviceworker.js");

try {
  fs.copyFileSync(vanillajshtmlsrc, vanillajshtmldest);
  fs.copyFileSync(coiserviceworkerSourcePath, coiserviceworkerDestPath);
  fs.copyFileSync(vanillajssrc, vanillajsdest);
} catch (e) {
  console.error(e);
  process.exit(1);
}
