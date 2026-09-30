import { pillars } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/motion/TextReveal";
import { LineReveal } from "@/components/motion/LineReveal";

export function TrustSection() {
  return (
    <section aria-labelledby="trust-title" className="grid-lines grid-lines-dark section-y relative bg-navy text-ivory">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="trust-title"
            tone="light"
            eyebrow="Asesoramiento personalizado"
            lines={["Tu expediente", "no es solo", "un número."]}
            className="lg:col-span-7"
          />
          <TextReveal className="lg:col-span-4 lg:col-start-9">
            <p className="lead text-ivory/75">
              Cada situación tiene circunstancias propias. La prioridad es entender el caso antes de
              proponer el siguiente paso.
            </p>
          </TextReveal>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li key={p.title}>
              <LineReveal delay={i * 100} className="w-full bg-gold/60" />
              <TextReveal delay={i * 100 + 80}>
                <p className="micro mt-6 text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-serif text-[1.75rem] leading-tight font-semibold">{p.title}</h3>
                <p className="mt-3 max-w-xs text-[0.98rem] leading-relaxed text-ivory/70">{p.text}</p>
              </TextReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
