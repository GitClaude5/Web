/**
 * Genera public/og-image.png (1200x630) y public/apple-touch-icon.png con Playwright.
 * Uso: npm run build && node scripts/og-image.mjs   (requiere playwright instalado)
 * Regenerar cuando se coloque el logotipo oficial.
 */
import { chromium } from "playwright";
import fs from "node:fs";

const seal = fs.readFileSync(new URL("../public/favicon.svg", import.meta.url), "utf8");
const html = `<!doctype html><html><head><style>
body{margin:0;width:1200px;height:630px;background:#101A29;font-family:Georgia,serif;display:flex;align-items:center;overflow:hidden;position:relative}
.glow{position:absolute;right:-80px;top:50%;transform:translateY(-50%);width:640px;height:640px;border-radius:50%;background:radial-gradient(circle,rgba(214,178,118,.28),transparent 65%)}
.seal{position:absolute;right:110px;top:50%;transform:translateY(-50%);width:340px;height:340px}
.c{padding-left:90px;max-width:660px;position:relative}
.m{font:600 18px/1 Helvetica,Arial,sans-serif;letter-spacing:.18em;color:#C5A873}
.l{width:120px;height:2px;background:#C5A873;margin:28px 0}
h1{margin:0;color:#F4F1EA;font-size:68px;line-height:1;font-weight:600}
.n{margin-top:36px;font:600 16px/1 Helvetica,Arial,sans-serif;letter-spacing:.16em;color:rgba(244,241,234,.7)}
</style></head><body><div class="glow"></div><div class="seal">${seal}</div>
<div class="c"><div class="m">EXTRANJERÍA · MADRID</div><div class="l"></div>
<h1>Tu situación merece una respuesta clara.</h1><div class="n">ASESORÍA SEFOZ</div></div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.screenshot({ path: new URL("../public/og-image.png", import.meta.url).pathname });
const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
await icon.setContent(`<body style="margin:0;background:#101A29">${seal.replace("<svg", '<svg width="180" height="180"')}</body>`);
await icon.screenshot({ path: new URL("../public/apple-touch-icon.png", import.meta.url).pathname });
await browser.close();
console.log("og-image.png y apple-touch-icon.png generados");
