"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { categories, type Project } from "@/lib/projects";

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof categories)[number]>("Tous");
  const filtered = active === "Tous" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par catégorie">
        {categories.map((cat) => {
          const on = cat === active;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                on
                  ? "bg-[var(--accent)] text-white"
                  : "border border-[var(--border)] text-[var(--muted)] hover:text-[var(--fg)]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
