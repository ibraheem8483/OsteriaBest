import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: './',               // relative paths for assets
  root: "client",           // points to the folder containing index.html
  plugins: [react()],
  build: {
    outDir: "../dist/public",  // output folder relative to repo root
    emptyOutDir: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
});
