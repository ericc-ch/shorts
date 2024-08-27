import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfig from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfig()],
});
