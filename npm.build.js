/*
 * Instead of having an npm command that is 4,000 characters long, just run this script.
 */
import { execSync } from "node:child_process";
import commands from "./build_commands.json" with { type: "json" };

let command = "";

for (let i = 0; i < commands.length; i++) {
  const c = commands[i];
  const current = [c.command];

  if (process.env.DEV === "1") {
    if (c.devEnv.length > 0) {
      current.unshift(...c.devEnv);
    }
  } else if (c.env.length > 0) {
    current.unshift(...c.env);
  }

  command += current.join(" ");
  if (i < commands.length - 1) {
    command += " && ";
  }
}

console.log(`Running command : ${command}\n`);

execSync(command, { stdio: "inherit" });

console.log(`\n${"*".repeat(50)}\nDone.\n${"*".repeat(50)}`);
