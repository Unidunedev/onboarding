import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// SPA estática: o build gera a pasta dist/, publicada pelo Cloudflare Pages.
export default defineConfig({
  plugins: [
    // Precisa vir antes do plugin do React: gera src/routeTree.gen.ts a partir de src/routes/
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
