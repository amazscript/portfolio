import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Badge, Button } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectCard } from "@/components/ProjectCard";
import { Icon, ArrowRight, ArrowUpRight, Target, Bolt, CheckCircle } from "@/components/icons";
import { services, getService } from "@/lib/services";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

/** SSG : une page pré-rendue par prestation (cocon SEO). */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: { absolute: s.metaTitle },
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, type: "website" },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = s.relatedCategory ? projects.filter((p) => p.category === s.relatedCategory) : [];
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema(s),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/services" },
            { name: s.title, path: `/services/${s.slug}` },
          ]),
        ]}
      />

      {/* Héro */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <Container className="py-14 sm:py-16">
          <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Services", href: "/services" }, { name: s.title }]} />
          <Reveal className="max-w-3xl">
            <span className="grid h-12 w-12 place-items-center rounded-[2px] bg-[var(--fg)] text-[var(--bg)]">
              <Icon name={s.icon} size={24} />
            </span>
            <h1 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              {s.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">{s.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/contact" className="plausible-event-name=Contact-CTA" data-umami-event="Contact-CTA">
                Discuter de mon projet <ArrowRight size={16} />
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {s.tags.map((tag) => (
                <span key={tag} className="rounded-[2px] bg-[var(--surface-2)] px-2 py-1 font-mono text-[11px] text-[var(--muted)]">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <article className="max-w-2xl space-y-10">
            {/* Le besoin */}
            <Reveal>
              <section>
                <h2 className="flex items-center gap-2.5 text-xl font-bold">
                  <span className="grid h-9 w-9 place-items-center rounded-[2px] bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Target size={18} />
                  </span>
                  Le besoin
                </h2>
                <p className="mt-3 text-[var(--muted)]">{s.problem}</p>
              </section>
            </Reveal>

            {/* Ce que ça vous apporte */}
            <Reveal>
              <section>
                <h2 className="flex items-center gap-2.5 text-xl font-bold">
                  <span className="grid h-9 w-9 place-items-center rounded-[2px] bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Bolt size={18} />
                  </span>
                  Ce que ça vous apporte
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-[var(--muted)]">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                        <CheckCircle size={13} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            {/* Ce qui est livré */}
            <Reveal>
              <section>
                <h2 className="flex items-center gap-2.5 text-xl font-bold">
                  <span className="grid h-9 w-9 place-items-center rounded-[2px] bg-[var(--accent-soft)] text-[var(--accent)]">
                    <CheckCircle size={18} />
                  </span>
                  Ce qui est livré
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-[var(--muted)]">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                        <CheckCircle size={13} />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </article>

          {/* Colonne latérale */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={100}>
              <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
                <p className="text-sm font-semibold">Un projet de ce type&nbsp;?</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{site.responseTime}, sans engagement.</p>
                <Button href="/contact" className="mt-4 w-full" data-umami-event="Contact-CTA">
                  Me contacter <ArrowRight size={16} />
                </Button>
                {/* Maillage interne : autres prestations */}
                <div className="mt-6 border-t border-[var(--border)] pt-5">
                  <p className="text-sm font-semibold">Autres prestations</p>
                  <ul className="mt-3 space-y-2">
                    {others.slice(0, 5).map((o) => (
                      <li key={o.slug}>
                        <Link
                          href={`/services/${o.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                        >
                          <Icon name={o.icon} size={14} /> {o.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Réalisations liées (maillage vers les cas d'étude) */}
        {related.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight">Réalisations liées</h2>
              <p className="mt-2 text-[var(--muted)]">Des exemples concrets de ce type de prestation, en production.</p>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Reveal key={p.slug} className="h-full">
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* CTA final */}
        <Reveal>
          <div className="mt-16 flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">Parlons de votre projet</h2>
              <p className="mt-1 text-[var(--muted)]">Décrivez votre besoin, je vous réponds sous 24 h.</p>
            </div>
            <Button href="/contact" className="shrink-0" data-umami-event="Contact-CTA">
              Discuter de mon projet <ArrowUpRight size={16} />
            </Button>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
