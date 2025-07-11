import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/SVWBrinocalc/", // GitHub Pagesのリポジトリ名に合わせて変更
  build: {
    outDir: "dist",
  },
});
