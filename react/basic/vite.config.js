import nodePath from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: nodePath.resolve(__dirname, "../../react/basic"),
  base:
    process.env.BUILD_FOR === "prod" ? "/js-randomness-predictor-demos/" : "/",
  build: {
    outDir: "../../docs",
    rollupOptions: {
      input: {
        main: nodePath.resolve(__dirname, "./basic-react.html"),
      },
    },
  },
  plugins: [
    react(),
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          next();
        });
      },
    },
  ],
  preview: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    open: "basic-react.html",
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    open: "basic-react.html",
  },
  define: {
    global: "globalThis",
  },
});
