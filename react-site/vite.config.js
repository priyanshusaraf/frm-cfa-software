import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" so the built site works from file:// or any static subpath,
// matching the original site's no-server constraint.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
