import { publishedServices, type Service } from "@/data/services";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ServiceRow } from "./ServiceCard";

export function RelatedServices({ current }: { current: Service }) {
  const others = publishedServices.filter((s) => s.id !== current.id);
  const half = Math.ceil(others.length / 2);
  return (
    <section aria-labelledby="otros-servicios" className="section-y">
      <div className="container-x">
        <Eyebrow>Otros servicios</Eyebrow>
        <h2 id="otros-servicios" className="display-3 mt-6 text-navy">
          Más procedimientos de extranjería
        </h2>
        <div className="mt-10 grid gap-x-14 border-t border-navy/12 md:grid-cols-2">
          <ul>{others.slice(0, half).map((s) => <ServiceRow key={s.id} service={s} />)}</ul>
          <ul>{others.slice(half).map((s) => <ServiceRow key={s.id} service={s} />)}</ul>
        </div>
      </div>
    </section>
  );
}
