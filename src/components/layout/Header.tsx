import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { business, telHref } from "@/data/business";
import { mainNav } from "@/data/navigation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { useConsultHref } from "@/hooks/useConsultHref";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { ServicesMegaMenu } from "./ServicesMegaMenu";
import { MobileMenu } from "./MobileMenu";

const MEGA_ID = "megamenu-servicios";
const navLinkClass =
  "nav-underline inline-flex min-h-[44px] items-center text-[0.86rem] font-medium text-navy transition-colors hover:text-bronze";

export function Header({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  /** Momento en que el hover abrió el menú: evita que el clic inmediato lo cierre. */
  const hoverOpenedAt = useRef(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const consultHref = useConsultHref();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar menús al navegar.
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.hash, setMobileOpen]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("[data-megamenu-root]")) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const openMega = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen((open) => {
      if (!open) hoverOpenedAt.current = Date.now();
      return true;
    });
  }, []);
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  }, []);

  const hoverCapable = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const solid = scrolled || megaOpen;

  return (
    <>
      <header
        data-megamenu-root
        className={cn(
          "on-light fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          solid
            ? "border-b border-navy/8 bg-[rgba(244,241,234,0.92)] backdrop-blur-[14px]"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between gap-6 transition-[height] duration-300 ease-[var(--ease-out)]",
            scrolled ? "h-[70px]" : "h-[70px] lg:h-[84px]",
          )}
        >
          <Logo compact={scrolled} />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {mainNav.map((item) =>
                item.kind === "services" ? (
                  <li
                    key={item.to}
                    onPointerEnter={() => hoverCapable() && openMega()}
                    onPointerLeave={() => hoverCapable() && scheduleClose()}
                  >
                    <button
                      ref={triggerRef}
                      type="button"
                      aria-expanded={megaOpen}
                      aria-controls={MEGA_ID}
                      onClick={() => {
                        if (Date.now() - hoverOpenedAt.current < 600) return;
                        setMegaOpen((v) => !v);
                      }}
                      className={cn(
                        "nav-underline flex min-h-[44px] items-center gap-1.5 text-[0.86rem] font-medium text-navy transition-colors hover:text-bronze",
                        location.pathname === "/servicios" && "text-bronze",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn("h-3.5 w-3.5 transition-transform duration-300", megaOpen && "rotate-180")}
                        strokeWidth={1.8}
                      />
                    </button>
                  </li>
                ) : (
                  <li key={item.to}>
                    {item.to.includes("#") ? (
                      <Link to={item.to} className={navLinkClass}>
                        {item.label}
                      </Link>
                    ) : (
                      <NavLink to={item.to} end className={navLinkClass}>
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telHref}
              onClick={() => trackEvent("click_phone", { location: "header" })}
              className="hidden min-h-[44px] items-center gap-2 px-3 text-[0.86rem] font-semibold tabular-nums text-navy transition-colors hover:text-bronze xl:inline-flex"
            >
              <Phone aria-hidden="true" className="h-4 w-4 text-gold-dark" strokeWidth={1.6} />
              {business.phoneDisplay}
            </a>
            <div className="hidden lg:block">
              <ButtonLink
                to={consultHref}
                className="min-h-[46px] px-6"
                onClick={() => trackEvent("click_consult_case", { location: "header" })}
              >
                Consultar mi caso
              </ButtonLink>
            </div>

            <a
              href={telHref}
              aria-label={`Llamar al ${business.phoneDisplay}`}
              onClick={() => trackEvent("click_phone", { location: "header_mobile" })}
              className="hidden h-12 w-12 items-center justify-center rounded-md text-navy sm:flex lg:hidden"
            >
              <Phone className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              className="-mr-2 flex h-12 w-12 items-center justify-center rounded-md text-navy lg:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {megaOpen && (
            <ServicesMegaMenu
              id={MEGA_ID}
              onNavigate={() => setMegaOpen(false)}
              onPointerEnter={() => hoverCapable() && openMega()}
              onPointerLeave={() => hoverCapable() && scheduleClose()}
            />
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>

      {/* Reserva del espacio del header fijo */}
      <div aria-hidden="true" className="h-[70px] lg:h-[84px]" />
    </>
  );
}
