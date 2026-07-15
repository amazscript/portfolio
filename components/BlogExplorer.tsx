"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogCover } from "@/components/BlogCover";
import { ArrowRight, Clock } from "@/components/icons";
import { blogCategories, type Post } from "@/lib/blog";

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<(typeof blogCategories)[number]>("Tous");
  const filtered = active === "Tous" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par catégorie">
        {blogCategories.map((cat) => {
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
        {filtered.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-card-hover)]"
          >
            <Link href={`/blog/${post.slug}`} aria-label={post.title}>
              <BlogCover icon={post.icon} category={post.category} image={post.image} alt={post.title} />
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                <span>{post.dateLabel}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} /> {post.readMin} min
                </span>
              </div>
              <h2 className="mt-2 text-lg font-bold leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:text-[var(--accent)]">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm text-[var(--muted)]">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] group-hover:gap-2"
              >
                Lire l&apos;article
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
