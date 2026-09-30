import { useEffect, type RefObject } from "react";

/** Un único IntersectionObserver compartido para todos los revelados. */
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer || typeof IntersectionObserver === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  return observer;
}

export function useReveal(ref: RefObject<Element | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    if (!io) {
      el.classList.add("is-visible");
      return;
    }
    io.observe(el);
    return () => io.unobserve(el);
  }, [ref]);
}
