"use client";

import type { ReactNode } from "react";
import { MaskLine, FadeIn } from "@/components/motion";

/**
 * En-tête de page interne — même langage que le hero de l'accueil :
 * numéro de rubrique, titre géant révélé depuis un masque, intro décalée.
 * Le titre est découpé en lignes par l'appelant via `lines`.
 */
export function PageHeader({
  eyebrow,
  num,
  lines,
  intro,
  aside,
}: {
  eyebrow: string;
  num?: string;
  lines: string[];
  intro?: string;
  aside?: ReactNode;
}) {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <FadeIn>
          <p className="flex items-baseline gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            {num && <span aria-hidden="true">{num}</span>}
            <span aria-hidden="true" className="h-px w-8 self-center bg-[var(--fg)]" />
            {eyebrow}
          </p>
        </FadeIn>

        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
          {lines.map((line, i) => (
            <MaskLine key={line} delay={0.1 + i * 0.11}>
              {i === lines.length - 1 ? (
                <span className="text-[var(--muted)]">{line}</span>
              ) : (
                line
              )}
            </MaskLine>
          ))}
        </h1>

        {(intro || aside) && (
          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            {intro && (
              <FadeIn delay={0.45}>
                <p className="max-w-xl text-lg leading-relaxed text-[var(--muted)]">{intro}</p>
              </FadeIn>
            )}
            {aside && <FadeIn delay={0.55}>{aside}</FadeIn>}
          </div>
        )}
      </div>
    </section>
  );
}
