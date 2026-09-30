import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { m } from "motion/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileActionBar } from "./MobileActionBar";
import { ConsentBanner } from "./ConsentBanner";

/** Scroll al inicio en cada navegación, o al ancla si la URL la incluye. */
function useScrollManager() {
  const { pathname, hash, search } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current && !hash) {
      first.current = false;
      return;
    }
    first.current = false;
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Esperar al render de la nueva página.
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname, hash, search]);
}

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);
  useScrollManager();

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-navy focus:px-5 focus:py-3 focus:text-ivory"
      >
        Saltar al contenido
      </a>
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {/* Transición de página: fade + 6px, 200ms. Sin animación en la carga inicial. */}
      <m.main
        key={pathname}
        id="contenido"
        tabIndex={-1}
        initial={isFirstRender.current ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="outline-none"
      >
        <Outlet />
      </m.main>
      <Footer />
      {/* Espacio para la barra de acciones móvil */}
      <div
        aria-hidden="true"
        className="bg-deep lg:hidden"
        style={{ height: "calc(72px + env(safe-area-inset-bottom))" }}
      />
      {!mobileOpen && <MobileActionBar />}
      <ConsentBanner />
    </>
  );
}
