import { ANALYTICS_ID } from "@/data/site";

export type AnalyticsEvent =
  | "click_consult_case"
  | "click_phone"
  | "view_service"
  | "select_situation"
  | "start_form"
  | "submit_form"
  | "click_facebook"
  | "view_hours"
  | "click_booking";

const CONSENT_KEY = "sefoz-analytics-consent";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export const analyticsEnabled = () => ANALYTICS_ID !== "";

export function getConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* almacenamiento no disponible */
  }
  if (value === "granted") loadAnalytics();
}

let loaded = false;

/** Carga gtag solo si hay ID configurado y consentimiento explícito. */
export function loadAnalytics() {
  if (loaded || !analyticsEnabled() || getConsent() !== "granted") return;
  loaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", ANALYTICS_ID, { anonymize_ip: true });
}

export function trackEvent(name: AnalyticsEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  if (import.meta.env.DEV) console.debug("[analytics]", name, params);
  if (!analyticsEnabled() || getConsent() !== "granted" || !window.gtag) return;
  window.gtag("event", name, params);
}
