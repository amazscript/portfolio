import Link from "next/link";
import type { Project } from "@/lib/projects";
import { Badge } from "@/components/ui";
import { Icon, ArrowUpRight, ArrowRight } from "@/components/icons";

// Visuel généré (dégradé de marque + filigrane d'icône de catégorie).
// À remplacer par next/image + capture optimisée quand disponible (CDC §3.3).
function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-t-[var(--radius-card)]" aria-hidden="true">
      <div className="absolute inset-0" style={{ backgroundImage: "var(--brand-gradient)", opacity: 0.14 }} />
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div
        className="absolute -right-6 -top-8 text-[var(--accent)] opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-30"
      >
        <Icon name={project.category} size={150} strokeWidth={1} />
      </div>
      <div className="absolute inset-x-5 bottom-4 flex items-center gap-2">
        <span
          className="grid h-10 w-10 place-items-center rounded-xl text-white shadow-[var(--glow)]"
          style={{ backgroundImage: "var(--brand-gradient)" }}
        >
          <Icon name={project.category} size={20} />
        </span>
        <span className="text-base font-bold text-[var(--fg)]">{project.title}</span>
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-card-hover)]">
      <Link href={`/projets/${project.slug}`} aria-label={`Voir le cas d'étude : ${project.title}`}>
        <ProjectVisual project={project} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <Badge>
            <Icon name={project.category} size={13} />
            {project.category}
          </Badge>
        </div>
        <h3 className="text-lg font-bold">
          <Link href={`/projets/${project.slug}`} className="hover:text-[var(--accent)]">
            {project.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-[var(--muted)]">{project.tagline}</p>
        <p className="mt-3 text-sm font-medium text-[var(--fg-soft)]">{project.result}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-md bg-[var(--surface-2)] px-2 py-0.5 font-mono text-[11px] text-[var(--muted)]">
              {tech}
            </span>
          ))}
        </div>

        {/* CTA visibles au-dessus de la ligne de flottaison de la carte (CDC §2.3) */}
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="plausible-event-name=Demo-Click inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              Voir le site <ArrowUpRight size={14} />
            </a>
          )}
          <Link
            href={`/projets/${project.slug}`}
            className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-[var(--fg)] group-hover:text-[var(--accent)]"
            aria-label={`Cas d'étude ${project.title}`}
          >
            Cas d&apos;étude
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
