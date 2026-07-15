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

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "group/btn inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none active:scale-[0.98]";
  const styles = {
    primary:
      "btn-shine text-[var(--accent-fg)] shadow-[var(--glow)] hover:-translate-y-0.5",
    secondary:
      "border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--fg)] hover:border-[var(--accent)] hover:-translate-y-0.5",
    ghost: "text-[var(--muted)] hover:text-[var(--fg)]",
  }[variant];

  const primaryBg =
    variant === "primary"
      ? ({ backgroundImage: "var(--brand-gradient)" } as const)
      : undefined;

  const cls = `${base} ${styles} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={primaryBg} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} style={primaryBg} {...rest}>
      {children}
    </Link>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-xs font-medium text-[var(--muted)]">
      {children}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">
      <span className="h-px w-6 bg-[var(--accent)]" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={center ? "flex justify-center" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-[var(--muted)]">{intro}</p>}
    </div>
  );
}
