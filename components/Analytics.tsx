import Script from "next/script";

// Google Analytics 4 (gtag.js).
// ⚠️ GA dépose des cookies et collecte des données personnelles → une bannière de
// consentement RGPD est nécessaire pour être conforme en France.
// Chargé uniquement en production ET si l'ID de mesure est renseigné ci-dessous.
const GA_MEASUREMENT_ID = ""; // ← colle ton ID GA4 (format "G-XXXXXXXXXX")

export function Analytics() {
  if (process.env.NODE_ENV !== "production" || !GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
