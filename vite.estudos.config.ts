import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";

// Site de estudos (estudos.unidunedev.workers.dev).
// Mora no mesmo repositório do onboarding para reaproveitar a logo e o visual,
// mas é um app separado: código em estudos/, build em dist-estudos/.
export default defineConfig({
  root: fileURLToPath(new URL("./estudos", import.meta.url)),
  publicDir: fileURLToPath(new URL("./estudos/public", import.meta.url)),
  plugins: [
    // As aulas são arquivos .mdx (Markdown + componentes React) em estudos/conteudo/.
    // remark-gfm habilita tabelas e ~~riscado~~ do GitHub.
    { enforce: "pre", ...mdx({ remarkPlugins: [remarkGfm] }) },
    react({ include: /\.(mdx|tsx?)$/ }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL("./estudos/src", import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL("./dist-estudos", import.meta.url)),
    emptyOutDir: true,
  },
});
