import type { ReactNode } from "react";

/**
 * En-tête de page interne — même langage que le hero de l'accueil :
 * numéro de rubrique, grand titre, intro.
 *
 * Desktop : titre à gauche (7 colonnes), intro alignée en bas à droite (5 colonnes),
 * pour ne pas laisser la moitié droite vide. Mobile : les blocs s'empilent.
 * `lines` donne le texte du titre ; le dernier segment passe en couleur d'accent.
 * Les coupures de ligne sont laissées au navigateur (`text-balance`) plutôt que
 * forcées, ce qui évitait des lignes d'un seul mot.
 * Le H1 n'est pas animé : c'est l'élément LCP, il doit être visible dès le HTML serveur.
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
  const lead = lines.slice(0, -1).join(" ");
  const accent = lines[lines.length - 1];

  return (
    <section className="hero-gradient border-b border-[var(--border)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-5 py-16 sm:px-6 sm:py-24">
        <p className="hero-enter flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
          {num && <span aria-hidden="true">{num}</span>}
          <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)] opacity-50" />
          {eyebrow}
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h1 className="text-balance font-display text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-[-0.02em] lg:col-span-7">
            {lead && <>{lead} </>}
            <span className="text-[var(--accent)]">{accent}</span>
          </h1>

          {(intro || aside) && (
            <div className="hero-enter space-y-5 [animation-delay:150ms] lg:col-span-5 lg:pb-2">
              {intro && <p className="max-w-xl text-lg leading-relaxed text-[var(--muted)]">{intro}</p>}
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
