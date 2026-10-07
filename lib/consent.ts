/**
 * Gestion du consentement cookies (RGPD). Le choix est stocké localement ;
 * Google Analytics n'est chargé que si le consentement est « granted ».
 */
/**
 * Versionnée : changer la finalité des cookies (ici l'ajout de la mesure Google Ads)
 * invalide les accords donnés pour l'ancien texte, la bannière s'affiche de nouveau.
 */
export const CONSENT_KEY = "cookie-consent-v2";
/** Émis quand le choix de consentement change. */
export const CONSENT_EVENT = "cookie-consent-changed";
/** Rouvre la bannière de consentement (lien « Gérer les cookies »). */
export const OPEN_EVENT = "open-cookie-settings";

export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function writeConsent(value: Consent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function openConsent() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}
