import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/floating-card/",
  plugins: [react()],
  server: {
    allowedHosts: ["a1ff-220-129-11-100.ngrok-free.app"],
  },
});
