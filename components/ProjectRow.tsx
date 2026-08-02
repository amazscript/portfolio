import Link from "next/link";
import type { Project } from "@/lib/projects";
import { Icon, ArrowRight } from "@/components/icons";

/**
 * Rangée de projet éditoriale : numéro, grande image (zoom au survol),
 * texte en colonne. Utilisée sur l'accueil et sur la page Réalisations,
 * à la place d'une grille de cartes.
 */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projets/${project.slug}`}
      aria-label={`Voir le cas d'étude : ${project.title}`}
      className="group grid gap-5 border-t border-[var(--border-strong)] py-10 md:grid-cols-12 md:items-center"
    >
      <span
        className="font-mono text-sm tracking-[0.18em] text-[var(--accent)] md:col-span-1"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] md:col-span-6">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div aria-hidden="true" className="relative aspect-[16/9] w-full bg-[var(--surface-2)]">
            <div className="absolute inset-0 bg-grid" />
            <div className="absolute -right-6 -top-8 text-[var(--accent)] opacity-20 transition-transform duration-700 group-hover:scale-110">
              <Icon name={project.category} size={180} strokeWidth={1} />
            </div>
          </div>
        )}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-[2px] bg-[var(--surface)]/95 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--fg)]">
          <Icon name={project.category} size={13} />
          {project.category}
        </span>
      </div>

      <div className="md:col-span-5 md:pl-10">
        <h3 className="font-display text-2xl font-bold transition-colors group-hover:text-[var(--accent)] sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{project.tagline}</p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
          {project.stack.slice(0, 4).join(" · ")}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
          Voir le cas d&apos;étude
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
