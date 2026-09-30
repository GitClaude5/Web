import { useId } from "react";
import { business } from "@/data/business";
import { cn } from "@/lib/cn";

/**
 * Sello circular de Asesoría Sefoz.
 *
 * Si existe el logotipo oficial (`business.logo.src`), se usa tal cual.
 * Mientras tanto se muestra una REPRODUCCIÓN DIGITAL PROVISIONAL basada en el
 * rótulo físico (círculo, aro negro, disco navy, monograma SZ, descriptores y
 * estrellas). No es un rediseño: debe sustituirse por el archivo oficial.
 */
export function BrandSeal({
  className,
  title = `${business.name} · ${business.descriptor}`,
  decorative = false,
}: {
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");

  if (business.logo.src) {
    return (
      <img
        src={business.logo.src}
        alt={decorative ? "" : title}
        className={cn("aspect-square object-contain", className)}
        width={200}
        height={200}
      />
    );
  }

  const top = `seal-top-${uid}`;
  const bottom = `seal-bottom-${uid}`;
  const disc = `seal-disc-${uid}`;
  const metal = `seal-metal-${uid}`;

  const rivets = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI * 2) / 12 + Math.PI / 12;
    return { x: 100 + Math.cos(a) * 93, y: 100 + Math.sin(a) * 93 };
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("aspect-square", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
    >
      <defs>
        <radialGradient id={disc} cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#223752" />
          <stop offset="55%" stopColor="#15223A" />
          <stop offset="100%" stopColor="#0C1422" />
        </radialGradient>
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2F1EE" />
          <stop offset="50%" stopColor="#C9CDD3" />
          <stop offset="100%" stopColor="#E7E6E2" />
        </linearGradient>
        <path id={top} d="M 34,100 A 66,66 0 0 1 166,100" />
        <path id={bottom} d="M 22,100 A 78,78 0 0 0 178,100" />
      </defs>

      {/* Aro exterior negro */}
      <circle cx="100" cy="100" r="99" fill="#07090D" />
      <circle cx="100" cy="100" r="98" fill="none" stroke="#2A2D33" strokeWidth="0.8" />
      {rivets.map((r, i) => (
        <circle key={i} cx={r.x} cy={r.y} r="1.5" fill={`url(#${metal})`} opacity="0.85" />
      ))}

      {/* Disco navy */}
      <circle cx="100" cy="100" r="87" fill={`url(#${disc})`} />
      <circle cx="100" cy="100" r="86" fill="none" stroke={`url(#${metal})`} strokeWidth="0.9" opacity="0.7" />
      <circle cx="100" cy="100" r="58" fill="none" stroke={`url(#${metal})`} strokeWidth="0.6" opacity="0.45" />

      {/* Descriptores */}
      <text
        fill={`url(#${metal})`}
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontWeight="700"
        fontSize="13"
        letterSpacing="3.2"
      >
        <textPath href={`#${top}`} startOffset="50%" textAnchor="middle">
          ASESORÍA SEFOZ
        </textPath>
      </text>
      <text
        fill={`url(#${metal})`}
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontWeight="700"
        fontSize="9.2"
        letterSpacing="1.6"
      >
        <textPath href={`#${bottom}`} startOffset="50%" textAnchor="middle">
          EXTRANJERÍA &amp; LEGALIZACIÓN
        </textPath>
      </text>

      {/* Estrellas laterales */}
      {[27, 173].map((x) => (
        <path
          key={x}
          transform={`translate(${x} 100) scale(0.9)`}
          d="M0,-5 L1.18,-1.62 L4.76,-1.55 L1.9,0.62 L2.94,4.05 L0,2 L-2.94,4.05 L-1.9,0.62 L-4.76,-1.55 L-1.18,-1.62 Z"
          fill={`url(#${metal})`}
        />
      ))}

      {/* Monograma SZ: S dominante, Z inferior */}
      <text
        x="93"
        y="128"
        textAnchor="middle"
        fill={`url(#${metal})`}
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontWeight="700"
        fontSize="88"
      >
        S
      </text>
      <text
        x="121"
        y="141"
        textAnchor="middle"
        fill={`url(#${metal})`}
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontWeight="700"
        fontSize="40"
      >
        Z
      </text>
    </svg>
  );
}
