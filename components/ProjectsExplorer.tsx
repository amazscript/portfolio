"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { categories, type Project } from "@/lib/projects";

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof categories)[number]>("Tous");
  const filtered = active === "Tous" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filtres — puces monospace, l'actif est un aplat d'accent */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par catégorie">
        {categories.map((cat) => {
          const on = cat === active;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(cat)}
              className={`cursor-pointer rounded-full px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                on
                  ? "bg-[var(--accent)] text-[var(--accent-fg)]"
                  : "border border-[var(--border-strong)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              className="h-full"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 font-mono text-sm uppercase tracking-[0.1em] text-[var(--muted)]">
          Aucun projet dans cette catégorie.
        </p>
      )}
    </div>
  );
}
