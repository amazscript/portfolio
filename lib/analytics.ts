// Suivi d'événements de conversion (CDC §4.5). Fonctionne avec Plausible ;
// no-op silencieux si l'analytics n'est pas chargé (dev, ou domaine non configuré).
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props; callback?: () => void }) => void;
  }
}

export function track(event: string, props?: Props) {
  if (typeof window !== "undefined" && typeof window.plausible === "function") {
    window.plausible(event, props ? { props } : undefined);
  }
}

// Événements normalisés — un seul endroit pour éviter les fautes de frappe.
export const events = {
  lead: "Lead", // conversion principale : formulaire de contact envoyé
  contactCtaClick: "Contact CTA",
  demoClick: "Demo Click",
  codeClick: "Code Click",
} as const;
