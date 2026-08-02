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
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
  className?: string;
  "aria-label"?: string;
};

/**
 * Boutons éditoriaux : rectangles nets, libellés en capitales espacées.
 * Primaire = bloc d'encre qui passe à l'accent au survol.
 */
export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "group/btn inline-flex cursor-pointer items-center justify-center gap-2 rounded-[2px] px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 focus-visible:outline-none active:translate-y-px";
  const styles = {
    primary:
      "bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)] hover:text-[var(--accent-fg)]",
    secondary:
      "border border-[var(--border-strong)] text-[var(--fg)] hover:border-[var(--fg)]",
    ghost: "text-[var(--muted)] hover:text-[var(--fg)]",
  }[variant];

  const cls = `${base} ${styles} ${className}`;

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

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--border-strong)] px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--muted)]">
      {children}
    </span>
  );
}

export function Eyebrow({ children, num }: { children: ReactNode; num?: string }) {
  return (
    <span className="inline-flex items-baseline gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
      {num && <span aria-hidden="true">{num}</span>}
      <span className="h-px w-8 self-center bg-[var(--fg)]" aria-hidden="true" />
      {children}
    </span>
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
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">{title}</h2>
      {intro && <p className="mt-4 text-[var(--muted)]">{intro}</p>}
    </div>
  );
}
