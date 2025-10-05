import nodepath from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: process.env.DEV !== undefined ? "/vue-vite/" : "/js-randomness-predictor-demos/vue-vite/",
  build: {
    outDir: nodepath.resolve(__dirname, "../../docs/vue-vite"),
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
  plugins: [vue()],
});
