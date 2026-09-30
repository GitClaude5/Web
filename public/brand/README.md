# Assets de marca

Coloca aquí el logotipo OFICIAL de Asesoría Sefoz (preferencia SVG; alternativa PNG transparente
en alta resolución) y actualiza `src/data/business.ts`:

```ts
logo: { official: true, src: "/brand/logo-sefoz.svg" }
```

Mientras `src` esté vacío, la web usa una reproducción digital PROVISIONAL del sello
(`src/components/brand/BrandSeal.tsx`). No es un rediseño: debe sustituirse.

Sustituir también:
- `public/favicon.svg` y `public/apple-touch-icon.png` (símbolo oficial SZ)
- `public/og-image.png` (regenerar con `node scripts/og-image.mjs` tras colocar el logo)
