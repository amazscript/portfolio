import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[var(--container-max)] px-5 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
  "aria-label"?: string;
};

/**
 * Boutons « Architect » : coins arrondis 0.75rem, libellés en gras casse normale.
 * Primaire = aplat d'accent plein. Secondaire = verre dépoli dont la bordure
 * s'allume à l'accent au survol. Le mouvement se limite à une mise à l'échelle
 * de 2 % — un signal, pas une animation décorative.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "group/btn inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 focus-visible:outline-none motion-safe:hover:scale-[1.02] active:scale-100";
  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }[size];
  const styles = {
    primary:
      "bg-[var(--accent)] text-[var(--accent-fg)] shadow-[var(--shadow-card)] hover:brightness-105",
    secondary:
      "glass border border-[var(--border-strong)] text-[var(--fg)] hover:border-[var(--accent)]",
    ghost: "text-[var(--muted)] hover:text-[var(--accent)]",
  }[variant];

  const cls = `${base} ${sizes} ${styles} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/** Puce de métadonnée : monospace, capitales, fond de surface basse. */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--surface-2)] px-2 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
      {children}
    </span>
  );
}

/** Puce d'état positif : pastille émeraude + libellé monospace (« disponible »). */
export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-3)] px-3 py-1.5">
      <span className="pulse-dot h-2 w-2 rounded-full bg-[var(--success)]" />
      <span className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--success)]">
        {children}
      </span>
    </span>
  );
}

/** Surtitre de section — 12px, gras, capitales très espacées (style `label-caps`). */
export function Eyebrow({ children, num }: { children: ReactNode; num?: string }) {
  return (
    <span className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
      {num && <span aria-hidden="true">{num}</span>}
      <span className="h-px w-8 bg-[var(--accent)] opacity-50" aria-hidden="true" />
      {children}
    </span>
  );
}

/**
 * Bandeau d'appel à l'action de bas de page — carte de verre, titre, phrase
 * de rassurance et bouton. Mutualisé entre les pages Services et À propos,
 * qui répétaient jusqu'ici le même bloc.
 */
export function CtaBanner({
  title,
  intro,
  cta = "Me contacter",
  href = "/contact",
  className = "",
}: {
  title: string;
  intro: string;
  cta?: string;
  href?: string;
  className?: string;
}) {
  return (
    <div
      className={`glass-card flex flex-col items-start gap-8 rounded-[var(--radius-card)] p-10 sm:flex-row sm:items-center sm:justify-between sm:p-14 ${className}`}
    >
      <div>
        <h2 className="font-display text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{title}</h2>
        <p className="mt-3 max-w-md text-[var(--muted)]">{intro}</p>
      </div>
      <Button href={href} size="lg" className="shrink-0" data-umami-event="Contact-CTA">
        {cta}
      </Button>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
  num,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  num?: string;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={center ? "flex justify-center" : ""}>
          <Eyebrow num={num}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="mt-4 text-3xl font-semibold leading-[1.2] tracking-[-0.02em] sm:text-4xl md:text-[2.5rem]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">{intro}</p>}
    </div>
  );
}
