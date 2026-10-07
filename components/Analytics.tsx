"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readConsent, CONSENT_EVENT } from "@/lib/consent";
import { track, TRACK_ATTRIBUTE } from "@/lib/analytics";

/**
 * Google Analytics 4 (gtag.js) — chargé UNIQUEMENT après consentement (RGPD),
 * en production, et si l'ID de mesure est renseigné ci-dessous.
 */
const GA_MEASUREMENT_ID = "G-058PWPVQ55";

/**
 * Consent Mode v2 (mode « de base » : gtag n'est jamais chargé sans accord).
 * L'accord couvre la mesure des conversions Google Ads (texte de CookieConsent et
 * des mentions légales), pas le reciblage : ad_personalization reste refusé.
 * Toute nouvelle finalité impose d'adapter ces textes et de versionner CONSENT_KEY.
 */
const CONSENT_DENIED = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;
const CONSENT_GRANTED = {
  ...CONSENT_DENIED,
  analytics_storage: "granted",
  ad_storage: "granted",
  ad_user_data: "granted",
} as const;

export function Analytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    setGranted(readConsent() === "granted");
    const handler = (e: Event) => {
      const isGranted = (e as CustomEvent).detail === "granted";
      setGranted(isGranted);
      // gtag reste en mémoire jusqu'au rechargement : on lui signale chaque changement
      // (le script d'init, lui, ne s'exécute qu'une fois).
      window.gtag?.("consent", "update", isGranted ? CONSENT_GRANTED : CONSENT_DENIED);
    };
    window.addEventListener(CONSENT_EVENT, handler);
    return () => window.removeEventListener(CONSENT_EVENT, handler);
  }, []);

  // Suivi des clics sur les liens marqués `data-track` (un seul écouteur pour tout le site).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest(`[${TRACK_ATTRIBUTE}]`);
      const event = target?.getAttribute(TRACK_ATTRIBUTE);
      if (event) track(event);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
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
window.gtag = gtag;
gtag('consent', 'default', ${JSON.stringify(CONSENT_DENIED)});
gtag('consent', 'update', ${JSON.stringify(CONSENT_GRANTED)});
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
