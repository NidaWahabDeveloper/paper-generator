import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite ki basic config — React plugin enable karta hai
export default defineConfig({
  plugins: [react()],
});
