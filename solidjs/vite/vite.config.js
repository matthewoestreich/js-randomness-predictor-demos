import nodepath from "node:path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  base: process.env.DEV !== undefined ? "/solidjs-vite/" : "/js-randomness-predictor-demos/solidjs-vite/",
  build: {
    outDir: nodepath.resolve(__dirname, "../../docs/solidjs-vite"),
    target: "esnext",
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  define: {
    gobal: "globalThis",
  },
  plugins: [solidPlugin()],
});
