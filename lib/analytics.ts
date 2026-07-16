// Suivi d'événements de conversion. Fonctionne avec Umami ;
// no-op silencieux si l'analytics n'est pas chargé (dev, ou script non présent).
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Props) => void };
  }
}

export function track(event: string, props?: Props) {
  if (typeof window !== "undefined" && window.umami) {
    window.umami.track(event, props);
  }
}

// Événements normalisés — un seul endroit pour éviter les fautes de frappe.
export const events = {
  lead: "Lead", // conversion principale : formulaire de contact envoyé
  contactCtaClick: "Contact CTA",
  demoClick: "Demo Click",
  codeClick: "Code Click",
} as const;
