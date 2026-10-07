import type { Metadata } from "next";
import Link from "next/link";
import { Container, Badge } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { BlogCover } from "@/components/BlogCover";
import { BlogExplorer } from "@/components/BlogExplorer";
import { ArrowRight, Clock } from "@/components/icons";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Blog : conseils pour vos projets web",
  description:
    "Articles concrets sur le développement web, le SEO, l'e-commerce et l'IA : budget d'un projet, migration sans perte de référencement, choix de stack. Retours d'expérience d'un développeur full-stack freelance.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const featured = getFeaturedPost();
  const rest = getAllPosts().filter((p) => p.slug !== featured.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHeader
        num="04"
        eyebrow="Blog"
        lines={["Le web", "sans jargon"]}
        intro="Des retours d'expérience concrets pour décideurs et curieux : combien coûte un projet, comment migrer sans casse, quand miser sur l'IA. Utile avant de lancer votre projet."
      />

      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Blog" }]} />

        {/* Article à la une — pleine largeur, image et texte côte à côte */}
        <Reveal>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid items-center gap-8 border-y border-[var(--border-strong)] py-10 md:grid-cols-2"
          >
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)]">
              <BlogCover
                icon={featured.icon}
                category={featured.category}
                image={featured.image}
                alt={featured.title}
                size="hero"
              />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <Badge>À la une</Badge>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                  <Clock size={12} /> {featured.readMin} min · {featured.dateLabel}
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.05] transition-colors group-hover:text-[var(--accent)] sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-[var(--muted)]">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                Lire l&apos;article
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Tous les articles, filtrables par catégorie */}
        <div className="mt-14">
          <BlogExplorer posts={rest} />
        </div>
      </Container>
    </>
  );
}
