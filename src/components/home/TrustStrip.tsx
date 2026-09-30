import { Fragment } from "react";
import { trustItems } from "@/data/content";

/** Franja estática (sin marquee). */
export function TrustStrip() {
  return (
    <section aria-label="Áreas de práctica" className="border-y border-navy/10 bg-paper">
      <div className="container-x">
        <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 py-7 md:justify-between md:gap-x-4">
          {trustItems.map((item, i) => (
            <Fragment key={item}>
              {i > 0 && (
                <li aria-hidden="true" className="hidden h-1 w-1 rotate-45 bg-gold md:block" />
              )}
              <li className="micro text-navy md:text-[0.8rem]">{item}</li>
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}
