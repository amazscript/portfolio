"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock } from "@/components/icons";
import { BlogCover } from "@/components/BlogCover";
import { blogCategories, type Post } from "@/lib/blog";

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<(typeof blogCategories)[number]>("Tous");
  const filtered = active === "Tous" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Filtres — puces monospace, l'actif est un aplat d'accent */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par catégorie">
        {blogCategories.map((cat) => {
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

      {/* Grille de cartes : couverture, titre, extrait, métadonnées de lecture */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              layout
              className="h-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: i * 0.04 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="glass-card group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)]"
              >
                <BlogCover
                  icon={post.icon}
                  category={post.category}
                  image={post.image}
                  alt={post.title}
                />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] transition-colors group-hover:text-[var(--accent)]">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{post.excerpt}</p>
                  <div className="mt-auto flex items-center gap-3 border-t border-[var(--border)] pt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                    <span>{post.dateLabel}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} /> {post.readMin} min
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="ml-auto text-[var(--accent)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 font-mono text-sm uppercase tracking-[0.1em] text-[var(--muted)]">
          Aucun article dans cette catégorie.
        </p>
      )}
    </div>
  );
}
