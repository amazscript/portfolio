"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readConsent, writeConsent, OPEN_EVENT, type Consent } from "@/lib/consent";

/**
 * Bannière de consentement cookies (conforme CNIL : « Accepter » et « Refuser »
 * aussi accessibles l'un que l'autre, aucun cookie de mesure avant acceptation).
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /** Affichée si aucun choix n'a encore été fait. */
    if (!readConsent()) setVisible(true);
    /** Rouverte via le lien « Gérer les cookies » du footer. */
    const open = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  function decide(value: Consent) {
    writeConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      className="glass fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-2xl rounded-[var(--radius-card)] border border-[var(--border-strong)] p-6 shadow-[var(--shadow-card-hover)] sm:inset-x-auto sm:left-auto sm:right-4"
    >
      <p className="text-sm font-semibold">Cookies &amp; mesure d&apos;audience</p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        J&apos;utilise Google Analytics pour comprendre l&apos;audience du site et mesurer
        l&apos;efficacité de mes annonces Google Ads. Aucun ciblage publicitaire, aucune mesure sans
        votre accord. Voir les{" "}
        <Link href="/mentions-legales" className="font-medium text-[var(--accent)] hover:underline">
          mentions légales
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="flex-1 cursor-pointer rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-[var(--accent-fg)] transition-all hover:brightness-105"
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="flex-1 cursor-pointer rounded-xl border border-[var(--border-strong)] px-4 py-2.5 text-sm font-bold text-[var(--fg)] transition-colors hover:border-[var(--accent)]"
        >
          Refuser
        </button>
      </div>
    </div>
  );
}
