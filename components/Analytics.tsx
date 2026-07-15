import Script from "next/script";

// Analytics sans cookie, respectueux de la vie privée (CDC §4.5).
// Activé uniquement si NEXT_PUBLIC_PLAUSIBLE_DOMAIN est défini → aucun script mort en dev,
// pas de bannière RGPD. Variante "tagged-events" pour tracker des clics en déclaratif
// (classe CSS "plausible-event-name=...") en plus des événements manuels via track().
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  const src =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.tagged-events.js";

  return <Script defer data-domain={domain} src={src} strategy="afterInteractive" />;
}
