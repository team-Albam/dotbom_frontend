import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // vite.config.ts
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        // 👇 rewrite 제거하거나, 이렇게
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
