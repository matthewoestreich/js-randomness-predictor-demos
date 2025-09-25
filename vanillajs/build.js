const fs = require("fs");
const path = require("path");

const vanillajshtmlsrc = path.resolve(__dirname, "./index.html");
const coiserviceworkerSourcePath = path.resolve(__dirname, "./coi.serviceworker.js");
const destDir = path.resolve(__dirname, "../docs");
const vanillajshtmldest = path.resolve(destDir, "vanilla-js.html");
const coiserviceworkerDestPath = path.resolve(destDir, "coi.serviceworker.js");

try {
  fs.copyFileSync(vanillajshtmlsrc, vanillajshtmldest);
  fs.copyFileSync(coiserviceworkerSourcePath, coiserviceworkerDestPath);
} catch (e) {
  console.error(e);
  process.exit(1);
}
