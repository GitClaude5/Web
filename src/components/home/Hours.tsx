import { useEffect, useRef } from "react";
import { business, telHref } from "@/data/business";
import { trackEvent } from "@/lib/analytics";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { OpeningStatusBadge } from "@/components/ui/OpeningStatusBadge";
import { HoursTable } from "@/components/ui/HoursTable";
import { TextLink } from "@/components/ui/Button";

export function Hours() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackEvent("view_hours");
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="horario" aria-labelledby="hours-title" className="section-y">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="hours-title" eyebrow="Horario de atención" lines={["Cuándo", "hablamos."]}>
            <p className="lead mt-8 max-w-sm text-ink-muted">
              Consulta nuestro horario y contacta para valorar tu caso.
            </p>
          </SectionHeading>
          <TextReveal delay={200} className="mt-8">
            <OpeningStatusBadge />
          </TextReveal>
        </div>
        <TextReveal className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-lg border border-navy/10 bg-paper p-2 md:p-4">
            <HoursTable />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[0.88rem] text-ink-muted">Horario peninsular (Madrid).</p>
            <TextLink to={telHref} onClick={() => trackEvent("click_phone", { location: "hours" })}>
              Llamar al {business.phoneDisplay}
            </TextLink>
          </div>
        </TextReveal>
      </div>
    </section>
  );
}
