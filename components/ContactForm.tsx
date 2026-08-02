"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { track, events } from "@/lib/analytics";
import { User, Mail, Tag, MessageSquare, Send, CheckCircle } from "@/components/icons";

type Status = "idle" | "sending" | "ok" | "error";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: { sitekey: string; theme?: string }) => string;
      getResponse: (id?: string) => string | undefined;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

export function ContactForm({ turnstileSiteKey }: { turnstileSiteKey?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [tsReady, setTsReady] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  /** Le script est peut-être déjà chargé (navigation interne). */
  useEffect(() => {
    if (window.turnstile) setTsReady(true);
  }, []);

  /** Rend le widget Turnstile quand le script est prêt et que le formulaire est visible. */
  useEffect(() => {
    if (!turnstileSiteKey || !tsReady || status === "ok") return;
    const el = widgetRef.current;
    const ts = window.turnstile;
    if (!el || !ts) return;
    widgetId.current = ts.render(el, { sitekey: turnstileSiteKey, theme: "auto" });
    return () => {
      try {
        if (widgetId.current) ts.remove(widgetId.current);
      } catch {}
      widgetId.current = null;
    };
  }, [turnstileSiteKey, tsReady, status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    /** Anti-robot : on récupère le jeton Turnstile avant d'envoyer. */
    if (turnstileSiteKey) {
      const token = window.turnstile?.getResponse(widgetId.current ?? undefined);
      if (!token) {
        setStatus("error");
        setError("Merci de confirmer que vous n'êtes pas un robot.");
        return;
      }
      data["cf-turnstile-response"] = token;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Une erreur est survenue.");
      }
      setStatus("ok");
      form.reset();
      /** Conversion principale du site. */
      track(events.lead);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      /** Le jeton Turnstile est à usage unique : on le régénère pour un nouvel essai. */
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }

  if (status === "ok") {
    return (
      <div className="relative overflow-hidden glass-card rounded-[var(--radius-card)] p-8 text-center">
        <div className="relative">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-[var(--accent)] text-[var(--accent-fg)]">
            <CheckCircle size={28} />
          </span>
          <p className="mt-4 text-lg font-bold">Message envoyé, merci&nbsp;!</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-[var(--muted)]">
            Je vous réponds sous 24 h. Pensez à vérifier vos spams si besoin.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-5 text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  const wrap = "group relative";
  const iconCls =
    "pointer-events-none absolute left-3.5 top-3.5 text-[var(--muted)] transition-colors group-focus-within:text-[var(--accent)]";
  const field =
    "w-full rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] py-3 pl-11 pr-3.5 text-sm outline-none transition-all placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass-card rounded-[var(--radius-card)] p-6 hover:translate-y-0 hover:border-[var(--glass-border)] hover:shadow-[var(--shadow-card)] sm:p-8"
    >
      {/* Honeypot anti-spam : invisible pour l'humain, rempli par les bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Ne pas remplir</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Nom <span className="text-[var(--accent)]">*</span>
          </label>
          <div className={wrap}>
            <User size={18} className={iconCls} />
            <input id="name" name="name" type="text" required className={field} autoComplete="name" placeholder="Votre nom" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            E-mail <span className="text-[var(--accent)]">*</span>
          </label>
          <div className={wrap}>
            <Mail size={18} className={iconCls} />
            <input id="email" name="email" type="email" required className={field} autoComplete="email" placeholder="vous@exemple.com" />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
          Sujet
        </label>
        <div className={wrap}>
          <Tag size={18} className={iconCls} />
          <input id="subject" name="subject" type="text" className={field} placeholder="Ex. Refonte de mon site" />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Votre message <span className="text-[var(--accent)]">*</span>
        </label>
        <div className={wrap}>
          <MessageSquare size={18} className={`${iconCls} top-3.5`} />
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            className={`${field} resize-y`}
            placeholder="Décrivez votre besoin, votre échéance, votre budget indicatif…"
          />
        </div>
      </div>

      {/* Anti-robot Cloudflare Turnstile (invisible/discret, RGPD-friendly).
          Affiché uniquement si la clé publique est configurée. */}
      {turnstileSiteKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            onLoad={() => setTsReady(true)}
          />
          <div ref={widgetRef} className="mt-5" />
        </>
      )}

      {status === "error" && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group/btn inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-bold text-[var(--accent-fg)] shadow-[var(--shadow-card)] transition-all duration-200 hover:brightness-105 motion-safe:hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "sending" ? (
            "Envoi…"
          ) : (
            <>
              Envoyer le message
              <Send size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </>
          )}
        </button>
        <p className="text-xs text-[var(--muted)]">
          Vos données servent uniquement à vous répondre (RGPD).
        </p>
      </div>
    </form>
  );
}
