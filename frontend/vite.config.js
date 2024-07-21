import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:3000/", // Your HTTPS backend server
        changeOrigin: true,
        secure: false, // Set to true if you have valid certificates
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
