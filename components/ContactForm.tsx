"use client";

import { useState } from "react";
import { track, events } from "@/lib/analytics";
import { User, Mail, Tag, MessageSquare, Send, CheckCircle } from "@/components/icons";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

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
      // Conversion principale du site (CDC §4.5)
      track(events.lead);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  if (status === "ok") {
    return (
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-card)]">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="relative">
          <span
            className="mx-auto grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[var(--glow)]"
            style={{ backgroundImage: "var(--brand-gradient)" }}
          >
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
    "w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-3 pl-11 pr-3.5 text-sm outline-none transition-all placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-soft)]";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      {/* Honeypot anti-spam : invisible pour l'humain, rempli par les bots (CDC §4.4) */}
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

      {status === "error" && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-shine group/btn inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-[var(--accent-fg)] shadow-[var(--glow)] transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:translate-y-0 disabled:opacity-60"
          style={{ backgroundImage: "var(--brand-gradient)" }}
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
