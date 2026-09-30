import { defineConfig, mergeConfig } from "vite";
import base from "./vite.config";

/** Build de vista previa: todo en línea (JS, CSS y fuentes) para un único archivo HTML. */
export default mergeConfig(
  base,
  defineConfig({
    build: {
      outDir: "dist-preview",
      assetsInlineLimit: 100_000_000,
      rolldownOptions: {
        input: "preview.html",
        output: { inlineDynamicImports: true },
      },
    },
  }),
);
