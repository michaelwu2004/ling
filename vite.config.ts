import { defineConfig } from "vite";
import path from "node:path";
import vue from "@vitejs/plugin-vue";

import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    vue(),
    Components({
      dts: true,
      dirs: ["./src/app", "./src/pages", "./src/shared", "./src/widgets"],
    }),
    AutoImport({
      dts: true,
      dirs: [],
      imports: ["vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    target: "es2022",
  },
  server: {
    proxy: {
      "/auth": {
        target: "http://127.0.0.1:54323",
        changeOrigin: true,
        secure: false,
        // Rewrite the path if necessary
        rewrite: (path) => path.replace(/^\/auth/, ""),
      },
    },
  },
});
