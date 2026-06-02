import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  envPrefix: ["PUBLIC_", "VITE_"],
  plugins: [tanstackStart(), react()],
  server: {
    port: Number(process.env.DEV_WEB_PORT ?? 5173),
  },
});
