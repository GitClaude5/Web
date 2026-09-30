import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { m } from "motion/react";
import { Phone, X } from "lucide-react";
import { business, telHref } from "@/data/business";
import { consultPath, mobileNav, mobileSecondaryNav } from "@/data/navigation";
import { trackEvent } from "@/lib/analytics";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";

/** Menú móvil a pantalla completa (navy). Diálogo modal accesible con foco atrapado. */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = ref.current;
    const focusables = () =>
      Array.from(
        root?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <m.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-navy text-ivory"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="container-x flex h-[70px] shrink-0 items-center justify-between border-b border-ivory/10">
        <Logo tone="light" compact />
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar menú"
          className="-mr-2 flex h-12 w-12 items-center justify-center rounded-md text-ivory transition-colors hover:text-gold"
        >
          <X className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      <nav aria-label="Principal" className="container-x flex-1 pt-8">
        <ul>
          {mobileNav.map((item, i) => (
            <m.li
              key={item.to}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="border-b border-ivory/10"
            >
              <Link
                to={item.to}
                onClick={onClose}
                className="flex min-h-[60px] items-center justify-between font-serif text-[2rem] leading-none font-semibold transition-colors hover:text-gold"
              >
                {item.label}
                <span aria-hidden="true" className="micro text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            </m.li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-x-6">
          {mobileSecondaryNav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={onClose}
                className="micro inline-flex min-h-[44px] items-center text-ivory/70 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="container-x shrink-0 space-y-4 pb-8 pt-8">
        <ButtonLink
          to={consultPath()}
          variant="gold"
          arrow
          className="w-full"
          onClick={() => {
            trackEvent("click_consult_case", { location: "mobile_menu" });
            onClose();
          }}
        >
          Consultar mi caso
        </ButtonLink>
        <a
          href={telHref}
          onClick={() => trackEvent("click_phone", { location: "mobile_menu" })}
          className="flex min-h-[52px] items-center justify-center gap-3 text-lg font-medium tracking-wide text-ivory transition-colors hover:text-gold"
        >
          <Phone aria-hidden="true" className="h-4 w-4 text-gold" strokeWidth={1.6} />
          {business.phoneDisplay}
        </a>
      </div>
    </m.div>
  );
}
