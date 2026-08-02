"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectRow } from "@/components/ProjectRow";
import { categories, type Project } from "@/lib/projects";

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof categories)[number]>("Tous");
  const filtered = active === "Tous" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filtres — onglets éditoriaux, l'actif est un bloc d'encre */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par catégorie">
        {categories.map((cat) => {
          const on = cat === active;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(cat)}
              className={`cursor-pointer rounded-[2px] px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                on
                  ? "bg-[var(--accent)] text-[var(--accent-fg)]"
                  : "border border-[var(--border-strong)] text-[var(--muted)] hover:border-[var(--fg)] hover:text-[var(--fg)]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="mt-10 border-b border-[var(--border-strong)]">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
            >
              <ProjectRow project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 font-mono text-sm uppercase tracking-[0.14em] text-[var(--muted)]">
          Aucun projet dans cette catégorie.
        </p>
      )}
    </div>
  );
}
