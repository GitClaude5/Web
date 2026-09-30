# Asesoría Sefoz · Web

Web corporativa de **Asesoría Sefoz**: Extranjería & Legalización, Madrid.
React 19 + TypeScript + Vite + Tailwind CSS 4 + Motion + React Router + React Hook Form + Zod + Lucide.
Cada ruta se prerenderiza a HTML estático, con title, meta, canonical, Open Graph y JSON-LD en el HTML.

```bash
npm install
npm run dev        # desarrollo
npm run build      # typecheck + build cliente + SSR + prerender → dist/
```

`dist/` es un sitio estático. Se publica en cualquier hosting (Netlify, Vercel, Cloudflare Pages…)
con **compresión gzip/brotli activada** y `404.html` como página de error.

## Dónde se edita cada cosa

| Qué | Archivo |
| --- | --- |
| Teléfono, Facebook, dirección, flags (mapa, WhatsApp, reseñas, reservas), abogado, logo | `src/data/business.ts` |
| Servicios (textos, SEO, FAQ, `reviewedAt`) | `src/data/services.ts` |
| Horario | `src/data/openingHours.ts` |
| FAQ general | `src/data/faq.ts` |
| Selector "No sé qué trámite necesito" | `src/data/situations.ts` |
| Datos legales (titular, NIF, domicilio, email, colegiación) | `src/data/legal.ts` |
| Fotografías (slots hero / rótulo) | `src/data/imagery.ts` + `public/images/` |
| Guías (SEO) | `src/data/guides.ts` |
| Dominio, analítica, idiomas | `src/data/site.ts` / `.env` |

## Variables de entorno (`.env`, ver `.env.example`)

- `VITE_SITE_URL`: dominio definitivo. Sin él no se genera `sitemap.xml` y canonical/OG quedan relativos.
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`: captación de consultas. Ejecutar
  `supabase/migrations/001_leads.sql`: la tabla `leads` tiene RLS y el rol anon solo puede insertar.
  **Sin backend configurado, el formulario muestra el estado de error con el teléfono.** Nunca simula un envío.

## Pendiente antes de publicar

**Assets**
- [ ] Logotipo oficial (SVG) → `public/brand/` + `business.logo.src`. Ahora se usa una reproducción digital **provisional** del sello.
- [ ] Favicon / apple-touch-icon con el símbolo oficial SZ. Después, regenerar la OG con `node scripts/og-image.mjs`.
- [ ] Fotografía real del rótulo (`imagery.sign`) y de consulta/despacho (`imagery.hero`). Mientras no existan se muestran composiciones gráficas, sin personas de stock.

**Datos del negocio**
- [ ] Dirección confirmada → `business.address`. El mapa y `PostalAddress` se activan solo con ella.
- [ ] Datos legales (`src/data/legal.ts`) y datos del abogado (`business.lawyer`). El perfil profesional no se muestra hasta tenerlos.
- [ ] Confirmar que el negocio ofrece "Seguimiento" (pilar marcado `needsConfirmation` en `src/data/content.ts`).
- [ ] WhatsApp, reservas online y reseñas: desactivados hasta confirmarlos.

**Revisión jurídica** (obligatoria)
- [ ] Denominaciones, textos y FAQ de los 10 servicios. Tras revisarlos, rellenar `reviewedAt` y `reviewedBy`. En `npm run dev` se ve un aviso en cada servicio pendiente.
- [ ] Validar la denominación vigente de "Familiar de ciudadano comunitario" (origen: "Tarjeta de Familiar de Comunitario").
- [ ] Aviso legal, privacidad y cookies (`LEGAL_TEXTS_REVIEWED_AT`).

**Técnico**
- [ ] Definir `VITE_SITE_URL` y conectar Supabase.
- [ ] Analítica: `ANALYTICS_ID` está vacío, así que no se carga nada. Si se rellena, aparece el aviso de consentimiento y los eventos ya están instrumentados (`click_consult_case`, `click_phone`, `view_service`, `select_situation`, `start_form`, `submit_form`, `click_facebook`, `view_hours`, `click_booking`).
- [ ] Rendimiento: el JS inicial pesa unos 158 KB gzip. Pendiente de optimizar para Lighthouse mobile 90+, por ejemplo cargando el formulario de forma diferida.

## Reglas de contenido

Sin promesas de resultado, sin porcentajes ni contadores, sin plazos ni requisitos inventados,
sin reseñas ni valoraciones no verificadas, sin dirección inventada. El formulario no pide documentación
sensible (NIE, pasaporte, expedientes, datos de menores) y no admite subida de archivos.
