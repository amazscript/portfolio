import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading, Badge } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { BlogCover } from "@/components/BlogCover";
import { BlogExplorer } from "@/components/BlogExplorer";
import { ArrowRight, Clock } from "@/components/icons";
import { getAllPosts, getFeaturedPost } from "@/lib/blog";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles concrets sur le développement web, le SEO, l'e-commerce et l'IA : budget d'un projet, migration sans perte de référencement, choix de stack. Retours d'expérience d'un développeur full-stack freelance.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const featured = getFeaturedPost();
  const rest = getAllPosts().filter((p) => p.slug !== featured.slug);

  return (
    <Container className="py-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Reveal>
        <SectionHeading
          eyebrow="Blog"
          title="Le web expliqué simplement, sans jargon inutile"
          intro="Des retours d'expérience concrets pour décideurs et curieux : combien coûte un projet, comment migrer sans casse, quand miser sur l'IA. Utile avant de lancer votre projet."
        />
      </Reveal>

      {/* Article à la une — image à gauche (centrée verticalement), texte à droite */}
      <Reveal>
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-10 grid items-center gap-6 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[var(--shadow-card-hover)] md:grid-cols-2"
        >
          <BlogCover icon={featured.icon} category={featured.category} image={featured.image} alt={featured.title} size="hero" />
          <div className="flex flex-col justify-center p-6 md:pr-10">
            <div className="flex items-center gap-2">
              <Badge>À la une</Badge>
              <span className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                <Clock size={12} /> {featured.readMin} min · {featured.dateLabel}
              </span>
            </div>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight group-hover:text-[var(--accent)] sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-[var(--muted)]">{featured.excerpt}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] group-hover:gap-2">
              Lire l&apos;article
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </Reveal>

      {/* Tous les articles, filtrables par catégorie */}
      <div className="mt-14">
        <Reveal>
          <BlogExplorer posts={rest} />
        </Reveal>
      </div>
    </Container>
  );
}
