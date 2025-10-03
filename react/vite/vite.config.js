import nodepath from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = nodepath.resolve(__dirname, "../../react/vite");

// Server under folder /js-randomness-predictor-demos/ while on github pages.
const base = process.env.BUILD_FOR === "prod" ? "/js-randomness-predictor-demos/" : "";

console.log({ base, root });

export default defineConfig({
  root,
  base,
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
    watch: {
      ignored: ["./node_modules/js-randomness-predictor/**"],
    },
    open: "react-vite.html",
  },
  define: {
    global: "globalThis",
  },
});
