// Suivi d'événements de conversion. Fonctionne avec Google Analytics 4 (gtag) ;
// no-op silencieux si l'analytics n'est pas chargé (dev, ou script non présent).
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, props?: Props) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, props);
  }
}

// Événements normalisés — un seul endroit pour éviter les fautes de frappe.
export const events = {
  lead: "Lead", // conversion principale : formulaire de contact envoyé
  contactCtaClick: "Contact CTA",
  demoClick: "Demo Click",
  codeClick: "Code Click",
} as const;
