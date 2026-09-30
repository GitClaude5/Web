import { imagery } from "@/data/imagery";
import { BrandSeal } from "@/components/brand/BrandSeal";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * Fotografía real del rótulo circular (cuando exista en imagery.sign).
 * Mientras tanto, representación del sello retroiluminado sobre muro oscuro.
 */
export function SignVisual({ className }: { className?: string }) {
  const photo = imagery.sign;
  return (
    <ImageReveal className={className}>
      <figure className="relative aspect-square overflow-hidden rounded-xl bg-deep">
        {photo.src ? (
          <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(232,190,120,0.42) 0%, rgba(232,190,120,0.12) 38%, transparent 62%), linear-gradient(160deg, #141b26 0%, #07090d 100%)",
              }}
            />
            {/* Textura de muro */}
            <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.07]">
              <filter id="sign-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#sign-noise)" />
            </svg>
            <div className="absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2">
              <BrandSeal
                decorative
                className="w-full drop-shadow-[0_0_60px_rgba(232,190,120,0.35)]"
              />
            </div>
          </div>
        )}
        <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
          <span className="micro text-ivory/60">Asesoría Sefoz</span>
          <span className="micro text-gold">Madrid</span>
        </figcaption>
      </figure>
    </ImageReveal>
  );
}
