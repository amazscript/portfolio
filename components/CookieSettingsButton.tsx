"use client";

import { openConsent } from "@/lib/consent";

// Lien "Gérer les cookies" (footer) — rouvre la bannière pour changer d'avis
// (droit de retrait du consentement, RGPD).
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openConsent} className={className}>
      Gérer les cookies
    </button>
  );
}
