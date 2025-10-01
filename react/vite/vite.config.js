import nodepath from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = nodepath.resolve(__dirname, "../../react/vite");

// Server under folder /js-randomness-predictor-demos/ while on github pages.
const base = process.env.BUILD_FOR === "prod" ? "/js-randomness-predictor-demos/" : "";

// So we can go to "http://localhost:5173/docs/vanilla-js.html", etc...
// As the 'nodepath.resolve' suggest, this path is relative to the "root" option.
const publicDir = nodepath.resolve(root, "../../");

console.log({ base, root, publicDir });

export default defineConfig({
  root,
  base,
  publicDir,
  build: {
    outDir: "../../docs",
    rollupOptions: {
      input: {
        main: nodepath.resolve(__dirname, "./react-vite.html"),
      },
    },
  },
  plugins: [react()],
  preview: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    open: "react-vite.html",
  },
  server: {
    open: "react-vite.html",
  },
  define: {
    global: "globalThis",
  },
});
