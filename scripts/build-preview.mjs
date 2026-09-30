/** Genera preview/asesoria-sefoz-preview.html (un único archivo, sin servidor). */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

execSync("npx vite build --config vite.preview.config.ts", { stdio: "inherit" });
const dir = "dist-preview";
let html = fs.readFileSync(path.join(dir, "preview.html"), "utf8");

html = html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, (_, src) => {
  const js = fs.readFileSync(path.join(dir, src), "utf8").replace(/<\/script/g, "<\\/script");
  return `<script type="module">${js}</script>`;
});
html = html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/g, (_, href) => {
  return `<style>${fs.readFileSync(path.join(dir, href), "utf8")}</style>`;
});
const favicon = fs.readFileSync("public/favicon.svg", "utf8");
html = html
  .replace('href="/favicon.svg"', `href="data:image/svg+xml,${encodeURIComponent(favicon)}"`)
  .replace(/<link rel="apple-touch-icon"[^>]*>\n?/, "");

fs.mkdirSync("preview", { recursive: true });
const out = "preview/asesoria-sefoz-preview.html";
fs.writeFileSync(out, html);
fs.rmSync(dir, { recursive: true, force: true });
console.log(`\n✓ ${out} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);
