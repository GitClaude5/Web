import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { serviceNumber, servicePath, type Service } from "@/data/services";
import { cn } from "@/lib/cn";

/** Tarjeta destacada. Hover: superficie ivory → navy, número gold, flecha +4px (300ms). */
export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  return (
    <Link
      to={servicePath(service)}
      className={cn(
        "group relative flex min-h-[280px] flex-col justify-between rounded-lg border border-navy/12 bg-paper p-7 transition-colors duration-300 ease-[var(--ease-out)] hover:border-navy hover:bg-navy md:min-h-[340px] md:p-10",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="micro text-bronze transition-colors duration-300 group-hover:text-gold">
          {serviceNumber(service)}
        </span>
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-300 group-hover:border-gold/50 group-hover:text-gold"
        >
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.6} />
        </span>
      </div>
      <div>
        <h3 className="display-3 text-navy transition-colors duration-300 group-hover:text-ivory">
          {service.title}
        </h3>
        <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-ink-muted transition-colors duration-300 group-hover:text-ivory/75">
          {service.shortDescription}
        </p>
      </div>
    </Link>
  );
}

/** Fila de la lista premium de servicios. */
export function ServiceRow({ service }: { service: Service }) {
  return (
    <li className="border-b border-navy/12">
      <Link
        to={servicePath(service)}
        className="group grid min-h-[72px] grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 py-6 transition-colors duration-300 md:grid-cols-[3rem_1fr_auto] md:py-7"
      >
        <span className="micro text-bronze">{serviceNumber(service)}</span>
        <span>
          <span className="block font-serif text-[1.55rem] leading-tight font-semibold text-navy transition-colors duration-300 group-hover:text-bronze md:text-[1.85rem]">
            {service.title}
          </span>
          <span className="mt-2 hidden max-w-lg text-[0.95rem] leading-relaxed text-ink-muted md:block">
            {service.shortDescription}
          </span>
        </span>
        <ArrowRight
          aria-hidden="true"
          className="h-5 w-5 text-navy transition-transform duration-300 group-hover:translate-x-1 group-hover:text-bronze"
          strokeWidth={1.5}
        />
      </Link>
    </li>
  );
}
