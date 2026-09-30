import { business } from "@/data/business";
import { trackEvent } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/Button";

/** Enlace ligero a Facebook (sin embed pesado). */
export function FacebookBand() {
  return (
    <section aria-label="Redes sociales" className="border-b border-ivory/10 bg-deep text-ivory">
      <div className="container-x flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 font-serif text-2xl font-bold text-gold"
          >
            f
          </span>
          <p className="font-serif text-[1.6rem] leading-tight font-semibold">
            Sigue a {business.name} en Facebook
          </p>
        </div>
        <ButtonLink
          to={business.facebook}
          variant="ghost-light"
          arrow
          onClick={() => trackEvent("click_facebook", { location: "facebook_band" })}
          ariaLabel="Seguir en Facebook (se abre en una pestaña nueva)"
        >
          Seguir en Facebook
        </ButtonLink>
      </div>
    </section>
  );
}
