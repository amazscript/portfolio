import Link from "next/link";
import type { Project } from "@/lib/projects";
import { Badge } from "@/components/ui";
import { Icon, ArrowUpRight, ArrowRight } from "@/components/icons";

/**
 * Visuel de projet : image si `project.image` est fourni (URL ou /fichier dans public/),
 * sinon visuel généré (aplat d'accent + filigrane d'icône de catégorie).
 */
function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-[var(--border)]">
      {project.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-[var(--surface-2)]">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute -right-6 -top-8 text-[var(--accent)] opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-30">
            <Icon name={project.category} size={150} strokeWidth={1} />
          </div>
        </div>
      )}
      <div className="absolute inset-x-4 bottom-3 flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--accent)] text-[var(--accent-fg)]">
          <Icon name={project.category} size={18} />
        </span>
        <span className="rounded-lg bg-[var(--surface)]/90 px-2.5 py-1 font-display text-base font-bold text-[var(--fg)] backdrop-blur-sm">
          {project.title}
        </span>
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass-card group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)]">
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
            <span key={tech} className="rounded-lg bg-[var(--surface-2)] px-2 py-0.5 font-mono text-[11px] text-[var(--muted)]">
              {tech}
            </span>
          ))}
        </div>

        {/* CTA visibles au-dessus de la ligne de flottaison de la carte */}
        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-4">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="Demo-Click"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
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
