import path from "node:path";
import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dev from "rollup-plugin-dev";
import css from "rollup-plugin-css-only";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "./src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: production ? path.resolve(import.meta.dirname, "../../docs/svelte-rollup/index.js") : "public/index.js",
  },
  plugins: [
    svelte({
      extensions: [".svelte"],
      include: "src/**/*.svelte",
      compilerOptions: {
        dev: !production,
      },
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    css({ output: "index.css" }),
    commonjs(),
    !production &&
      dev({
        dirs: ["public"],
        port: 3004,
        host: "localhost",
      }),
    production && terser(),
    production &&
      copy({
        targets: [{ src: "public/*", dest: "../../docs/svelte-rollup/" }],
        copyOnce: true,
      }),
  ],
};
