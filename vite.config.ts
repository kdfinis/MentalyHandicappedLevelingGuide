import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.PAGES_BASE ?? "/",
  plugins: [tailwindcss(), react()],
  server: {
    host: "0.0.0.0",
    port: 47291,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 47291,
    strictPort: true,
  },
});
