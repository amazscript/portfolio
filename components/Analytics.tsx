"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readConsent, CONSENT_EVENT } from "@/lib/consent";

// Google Analytics 4 (gtag.js) — chargé UNIQUEMENT après consentement (RGPD),
// en production, et si l'ID de mesure est renseigné ci-dessous.
const GA_MEASUREMENT_ID = "G-058PWPVQ55";

export function Analytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    setGranted(readConsent() === "granted");
    const handler = (e: Event) => setGranted((e as CustomEvent).detail === "granted");
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  if (process.env.NODE_ENV !== "production" || !GA_MEASUREMENT_ID || !granted) return null;

  return (
    <>
      {/* preconnect ici (pas globalement) → aucune connexion à Google avant consentement */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
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
