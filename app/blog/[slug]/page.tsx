import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Badge, Button } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { BlogCover } from "@/components/BlogCover";
import { ArticleContent } from "@/components/ArticleContent";
import { ArrowRight, Clock, User } from "@/components/icons";
import { posts, getPost, getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";

// SSG : une page pré-rendue par article.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { title: p.title, description: p.excerpt, type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const all = getAllPosts();
  const idx = all.findIndex((x) => x.slug === p.slug);
  const next = all[(idx + 1) % all.length];

  return (
    <>
      <JsonLd
        data={[
          articleSchema(p),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: p.title, path: `/blog/${p.slug}` },
          ]),
        ]}
      />

      <Container className="py-14">
        <nav className="mb-6 flex items-center gap-1.5 text-sm text-[var(--muted)]" aria-label="Fil d'Ariane">
          <Link href="/blog" className="inline-flex items-center gap-1 hover:text-[var(--fg)]">
            <ArrowRight size={14} className="rotate-180" /> Tous les articles
          </Link>
        </nav>

        <article className="mx-auto max-w-3xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{p.category}</Badge>
              <span className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)]">
                <Clock size={14} /> {p.readMin} min de lecture
              </span>
              <span className="text-sm text-[var(--muted)]">{p.dateLabel}</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {p.title}
            </h1>
            <p className="mt-4 text-lg text-[var(--muted)]">{p.excerpt}</p>
            <div className="mt-5 flex items-center gap-2 text-sm text-[var(--fg-soft)]">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                <User size={16} />
              </span>
              Par {site.name} · {site.role}
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-8">
              <BlogCover icon={p.icon} category={p.category} image={p.image} alt={p.title} size="hero" />
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10">
              <ArticleContent blocks={p.content} />
            </div>
          </Reveal>

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-6">
            {p.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-[var(--surface-2)] px-2 py-1 font-mono text-[11px] text-[var(--muted)]">
                {tag}
              </span>
            ))}
          </div>

          {/* Maillage interne : liens contextuels vers services & réalisations */}
          <p className="mt-6 text-sm text-[var(--muted)]">
            À découvrir aussi :{" "}
            <Link href="/services" className="font-semibold text-[var(--accent)] hover:underline">
              mes services
            </Link>{" "}
            et{" "}
            <Link href="/projets" className="font-semibold text-[var(--accent)] hover:underline">
              mes réalisations
            </Link>
            .
          </p>

          {/* CTA contact */}
          <Reveal>
            <div className="mt-6 flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-7 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold">Un projet en tête&nbsp;?</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{site.responseTime}, sans engagement.</p>
              </div>
              <Button href="/contact" className="plausible-event-name=Contact-CTA shrink-0">
                Discuter de mon projet <ArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
        </article>

        {/* Article suivant */}
        <Reveal>
          <Link
            href={`/blog/${next.slug}`}
            className="group mx-auto mt-14 flex max-w-3xl items-center justify-between gap-4 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-card)]"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Article suivant</p>
              <p className="mt-1 font-bold group-hover:text-[var(--accent)]">{next.title}</p>
            </div>
            <ArrowRight size={20} className="shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
          </Link>
        </Reveal>
      </Container>
    </>
  );
}
