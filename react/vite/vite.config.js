import nodepath from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/js-randomness-predictor-demos/react-vite/",
  build: {
    outDir: nodepath.resolve(__dirname, "../../docs/react-vite"),
  },
	server: {
		headers: {
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp",
		},
	},
	plugins: [react()],
	define: {
		gobal: "globalThis",
	}
});
