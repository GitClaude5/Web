import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { imagery } from "@/data/imagery";
import { BrandSeal } from "@/components/brand/BrandSeal";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Visual del hero. Si existe fotografía (imagery.hero.src) se muestra con el
 * sello real superpuesto. Si no, composición editorial: panel navy,
 * geometría de sello, luz cálida (retroiluminación del rótulo) y tarjeta
 * "paso a paso". Sin personas de stock.
 */
export function HeroVisual() {
  const photo = imagery.hero;

  return (
    <div className="relative">
      <div
        className="hero-fade relative aspect-[4/3] overflow-hidden rounded-xl bg-navy sm:aspect-[5/4] lg:aspect-[4/5]"
        style={d(100)}
      >
        <div className="hero-settle absolute inset-0" style={d(100)}>
          {photo.src ? (
            <img
              src={photo.src}
              srcSet={"srcSet" in photo ? (photo.srcSet as string) : undefined}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          ) : (
            <EditorialComposition />
          )}
        </div>

        {/* Pie del panel */}
        <div className="absolute inset-x-0 bottom-0 hidden items-end justify-between gap-4 p-6 sm:flex md:p-8">
          <p className="micro text-ivory/60">Extranjería &amp; Legalización</p>
          {photo.src && <BrandSeal decorative className="hero-fade h-16 w-16 drop-shadow-xl" />}
          {!photo.src && <p className="micro text-gold">Madrid</p>}
        </div>
      </div>

      {/* Tarjeta flotante: claridad paso a paso */}
      <div
        className="hero-in relative z-10 mx-5 -mt-12 rounded-lg border border-navy/8 bg-paper p-5 shadow-[0_30px_60px_-30px_rgba(16,26,41,0.45)] sm:absolute sm:-bottom-8 sm:left-4 sm:mx-0 sm:mt-0 sm:w-[300px] lg:-left-12 lg:bottom-14 lg:p-6"
        style={d(800)}
      >
        <p className="micro text-steel">Tu caso, paso a paso</p>
        <ol className="mt-4 space-y-3">
          {[
            { n: "01", t: "Tu situación", done: true },
            { n: "02", t: "Opciones a valorar", done: true },
            { n: "03", t: "Siguiente paso", done: false },
          ].map((row) => (
            <li key={row.n} className="flex items-center gap-3 text-[0.92rem] text-navy">
              <span className="micro w-6 text-bronze">{row.n}</span>
              <span className="flex-1 font-medium">{row.t}</span>
              <span
                aria-hidden="true"
                className={
                  row.done
                    ? "flex h-5 w-5 items-center justify-center rounded-full bg-navy text-gold"
                    : "h-5 w-5 rounded-full border border-navy/20"
                }
              >
                {row.done && <Check className="h-3 w-3" strokeWidth={2.4} />}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function EditorialComposition() {
  return (
    <div className="absolute inset-0">
      {/* Luz cálida (retroiluminación del rótulo) */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 40%, rgba(214,178,118,0.28) 0%, rgba(214,178,118,0.08) 45%, transparent 70%), linear-gradient(180deg, #132036 0%, #0d1626 100%)",
        }}
      />
      {/* Geometría: rejilla y anillos concéntricos */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="rgba(244,241,234,0.05)" />
        ))}
        <line x1="0" y1="200" x2="400" y2="200" stroke="rgba(244,241,234,0.05)" />
        {[92, 128, 170, 220].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke={i === 1 ? "rgba(197,168,115,0.35)" : "rgba(244,241,234,0.07)"}
            strokeWidth={i === 1 ? 0.8 : 0.6}
          />
        ))}
        <line x1="60" y1="420" x2="340" y2="420" stroke="rgba(197,168,115,0.45)" strokeWidth="0.8" />
      </svg>
      {/* Sello con halo */}
      <div className="absolute left-1/2 top-[40%] w-[44%] max-w-[260px] -translate-x-1/2 -translate-y-1/2">
        <div
          aria-hidden="true"
          className="absolute inset-[-18%] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(226,190,128,0.35) 0%, transparent 65%)" }}
        />
        <BrandSeal decorative className="relative w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]" />
      </div>
    </div>
  );
}
