import { business, telHref } from "@/data/business";
import { trackEvent } from "@/lib/analytics";
import { useConsultHref } from "@/hooks/useConsultHref";
import { TextReveal } from "@/components/motion/TextReveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { BrandSeal } from "@/components/brand/BrandSeal";

export function ConversionCTA({ subject }: { subject?: string }) {
  const consultHref = useConsultHref(subject);

  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-gold-soft">
      <BrandSeal
        decorative
        className="pointer-events-none absolute -right-28 top-1/2 hidden w-[460px] -translate-y-1/2 opacity-[0.07] grayscale lg:block xl:right-[4%]"
      />
      <div className="container-x relative py-20 md:py-28 lg:py-32">
        <div className="relative max-w-3xl">
          <TextReveal>
            <Eyebrow>Da el primer paso</Eyebrow>
          </TextReveal>
          <TextReveal delay={80}>
            <h2 id="cta-title" className="display-2 mt-6 text-navy">
              <span className="block">Tu caso empieza </span>
              <span className="block">por contarlo.</span>
            </h2>
          </TextReveal>
          <TextReveal delay={140}>
            <p className="lead mt-7 max-w-xl text-graphite">
              Explícanos brevemente tu situación y contactaremos contigo para valorar cómo podemos
              ayudarte.
            </p>
          </TextReveal>
          <TextReveal delay={200} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              to={consultHref}
              arrow
              onClick={() => trackEvent("click_consult_case", { location: "cta_final" })}
            >
              Consultar mi caso
            </ButtonLink>
            <ButtonLink
              to={telHref}
              variant="secondary"
              onClick={() => trackEvent("click_phone", { location: "cta_final" })}
            >
              Llamar al {business.phoneDisplay}
            </ButtonLink>
          </TextReveal>
        </div>
      </div>
    </section>
  );
}
