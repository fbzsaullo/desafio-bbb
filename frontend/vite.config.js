import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

dotenv.config();

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 3001,
    strictPort: true,
  },
  server: {
    port: 3001,
    strictPort: true,
    host: true,
  },
});