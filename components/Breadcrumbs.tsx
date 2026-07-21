import Link from "next/link";

/** Fil d'Ariane visible (le schema BreadcrumbList est ajouté séparément par page). */
export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-[var(--muted)]">
      {items.map((it, i) => (
        <span key={it.name} className="inline-flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true" className="text-[var(--border-strong)]">/</span>}
          {it.href ? (
            <Link href={it.href} className="transition-colors hover:text-[var(--fg)]">
              {it.name}
            </Link>
          ) : (
            <span className="font-medium text-[var(--fg-soft)]">{it.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
