/**
 * Prerenderizado estático: genera un index.html por ruta (SEO: title, meta,
 * canonical, Open Graph y JSON-LD en el HTML), además de 404.html,
 * sitemap.xml y robots.txt.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const siteUrl = (process.env.VITE_SITE_URL ?? "").replace(/\/$/, "");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, staticRoutes } = await import(pathToFileURL(ssrEntry).href);

// Precarga de las fuentes del primer pantallazo.
const assets = fs.readdirSync(path.join(dist, "assets"));
const preloadFonts = assets
  .filter((f) => /^(cormorant-garamond-latin-600-normal|manrope-latin-400-normal|manrope-latin-600-normal).*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join("\n    ");

function page(url) {
  const { html, head } = render(url);
  return template
    .replace("<!--app-head-->", `${preloadFonts}\n    ${head}`)
    .replace("<!--app-html-->", html);
}

for (const route of staticRoutes) {
  const out = route.path === "/" ? path.join(dist, "index.html") : path.join(dist, route.path.slice(1), "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(route.path));
  console.log(`  prerender ${route.path}`);
}

fs.writeFileSync(path.join(dist, "404.html"), page("/404-no-encontrada"));
console.log("  prerender 404.html");

// robots.txt
const robots = ["User-agent: *", "Allow: /", ""];
if (siteUrl) robots.push(`Sitemap: ${siteUrl}/sitemap.xml`, "");
fs.writeFileSync(path.join(dist, "robots.txt"), robots.join("\n"));

// sitemap.xml (requiere dominio absoluto)
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = staticRoutes
    .filter((r) => r.sitemap)
    .map(
      (r) =>
        `  <url><loc>${siteUrl}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`,
    )
    .join("\n");
  fs.writeFileSync(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
  console.log("  sitemap.xml");
} else {
  console.warn("\n  ⚠ VITE_SITE_URL no definido: sin sitemap.xml y con canonical/OG relativos. Defínelo antes de publicar.\n");
}

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
