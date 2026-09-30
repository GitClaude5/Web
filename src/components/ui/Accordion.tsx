import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = { question: string; answer: string };

export function Accordion({
  items,
  tone = "dark",
  headingLevel = 3,
}: {
  items: AccordionItem[];
  tone?: "dark" | "light";
  headingLevel?: 2 | 3 | 4;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const H = `h${headingLevel}` as const;

  return (
    <div className={cn("border-t", tone === "dark" ? "border-navy/12" : "border-ivory/15")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `acc-btn-${uid}-${i}`;
        const panelId = `acc-panel-${uid}-${i}`;
        return (
          <div
            key={item.question}
            className={cn("border-b", tone === "dark" ? "border-navy/12" : "border-ivory/15")}
          >
            <H className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  "group flex min-h-[64px] w-full items-center justify-between gap-6 py-6 text-left transition-colors",
                  tone === "dark" ? "text-navy hover:text-bronze" : "text-ivory hover:text-gold",
                )}
              >
                <span className="font-serif text-[1.45rem] leading-tight font-semibold md:text-[1.7rem]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-300",
                    tone === "dark" ? "border-navy/15" : "border-ivory/20",
                    isOpen && "rotate-45 border-gold bg-gold text-navy",
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={1.6} />
                </span>
              </button>
            </H>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-[var(--ease-out)]",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p
                  className={cn(
                    "max-w-3xl pb-7 pr-14 text-[1.02rem] leading-relaxed",
                    tone === "dark" ? "text-ink-muted" : "text-ivory/75",
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
