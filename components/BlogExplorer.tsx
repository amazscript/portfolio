"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock } from "@/components/icons";
import { blogCategories, type Post } from "@/lib/blog";

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<(typeof blogCategories)[number]>("Tous");
  const filtered = active === "Tous" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Filtres — onglets éditoriaux, l'actif est un bloc d'accent */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par catégorie">
        {blogCategories.map((cat) => {
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

      {/* Sommaire de revue : une ligne par article */}
      <div className="mt-10 border-t border-[var(--border-strong)]">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-3 border-b border-[var(--border-strong)] py-7 transition-all hover:bg-[var(--surface-2)] hover:pl-3 md:grid-cols-12 md:items-baseline"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--accent)] md:col-span-2">
                  {post.category}
                </span>
                <div className="md:col-span-8">
                  <h2 className="font-display text-xl font-bold leading-snug transition-colors group-hover:text-[var(--accent)] sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">{post.excerpt}</p>
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)] md:col-span-2 md:justify-end">
                  <span>{post.dateLabel}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {post.readMin} min
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 font-mono text-sm uppercase tracking-[0.14em] text-[var(--muted)]">
          Aucun article dans cette catégorie.
        </p>
      )}
    </div>
  );
}
