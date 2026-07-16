import Script from "next/script";

// Analytics Umami auto-hébergé — sans cookie, respectueux de la vie privée (RGPD),
// pas de bannière de consentement. Chargé uniquement en production (pas en dev/local).
// Événements déclaratifs via l'attribut data-umami-event="...", + événements manuels via track().
const UMAMI_SRC = "https://stats.decilapdenis.fr/script.js";
const UMAMI_WEBSITE_ID = "3bd432be-caa9-48e5-bfae-0093f9c1bb90";

export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script
      defer
      src={UMAMI_SRC}
      data-website-id={UMAMI_WEBSITE_ID}
      data-domains="decilapdenis.fr"
      strategy="afterInteractive"
    />
  );
}
