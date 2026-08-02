import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Badge, Button } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import {
  Icon,
  ArrowRight,
  ArrowUpRight,
  Target,
  Bolt,
  Code,
  CheckCircle,
  Sparkles,
} from "@/components/icons";
import { projects, getProject, getAllSorted } from "@/lib/projects";
import { breadcrumbSchema, projectSchema } from "@/lib/schema";

/** SSG : une page pré-rendue par projet. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.tagline}. ${p.result}`,
    alternates: { canonical: `/projets/${p.slug}` },
    openGraph: { title: p.title, description: p.tagline, type: "article" },
  };
}

export default async function ProjetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const all = getAllSorted();
  const idx = all.findIndex((x) => x.slug === p.slug);
  const next = all[(idx + 1) % all.length];

  const sections = [
    { icon: Target, title: "Le besoin", body: <p className="mt-3 text-[var(--muted)]">{p.problem}</p> },
    {
      icon: Bolt,
      title: "La solution",
      body: (
        <ul className="mt-3 space-y-2.5">
          {p.solution.map((s, i) => (
            <li key={i} className="flex gap-3 text-[var(--muted)]">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                <CheckCircle size={13} />
              </span>
              {s}
            </li>
          ))}
        </ul>
      ),
    },
    { icon: Code, title: "Décisions techniques", body: <p className="mt-3 text-[var(--muted)]">{p.decisions}</p> },
    { icon: CheckCircle, title: "Résultat", body: <p className="mt-3 text-lg font-medium text-[var(--fg-soft)]">{p.result}</p> },
    { icon: Sparkles, title: "Ce que j'en retiens", body: <p className="mt-3 text-[var(--muted)]">{p.learned}</p> },
  ];

  return (
    <>
      <JsonLd
        data={[
          projectSchema(p),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Réalisations", path: "/projets" },
            { name: p.title, path: `/projets/${p.slug}` },
          ]),
        ]}
      />

      {/* Héro de cas d'étude — filigrane d'icône sur papier */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-6 top-6 text-[var(--accent)] opacity-[0.07]">
            <Icon name={p.category} size={220} strokeWidth={1} />
          </div>
        </div>

        <Container className="py-14 sm:py-16">
          <nav className="mb-6 flex items-center gap-1.5 text-sm text-[var(--muted)]" aria-label="Fil d'Ariane">
            <Link href="/projets" className="inline-flex items-center gap-1 hover:text-[var(--fg)]">
              <ArrowRight size={14} className="rotate-180" /> Toutes les réalisations
            </Link>
          </nav>

          <Reveal className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-[2px] bg-[var(--fg)] text-[var(--bg)]">
                <Icon name={p.category} size={24} />
              </span>
              <Badge>{p.category}</Badge>
            </div>
            <h1 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
              {p.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">{p.tagline}</p>

            {/* CTA au-dessus de la ligne de flottaison */}
            <div className="mt-6 flex flex-wrap gap-3">
              {p.demoUrl && (
                <Button href={p.demoUrl} external data-umami-event="Demo-Click" aria-label={`Voir ${p.title} en ligne`}>
                  Voir le site <ArrowUpRight size={16} />
                </Button>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="py-14">
        {/* Image du projet (si fournie) */}
        {p.image && (
          <Reveal>
            <div className="mb-12 overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] shadow-[var(--shadow-card)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt={`Aperçu de ${p.title}`}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </Reveal>
        )}

        {/* Métriques animées */}
        <Reveal>
          <div className="grid gap-4 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] sm:grid-cols-3">
            {p.metrics.map((m) => (
              <div key={m.label} className="text-center sm:text-left">
                <p className="text-2xl font-extrabold tracking-tight text-[var(--accent)]">
                  <Counter value={m.value} />
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Cas d'étude */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_300px]">
          <article className="max-w-2xl space-y-10">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <section>
                  <h2 className="flex items-center gap-2.5 text-xl font-bold">
                    <span className="grid h-9 w-9 place-items-center rounded-[2px] bg-[var(--accent-soft)] text-[var(--accent)]">
                      <s.icon size={18} />
                    </span>
                    {s.title}
                  </h2>
                  {s.body}
                </section>
              </Reveal>
            ))}
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={100}>
              <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
                <p className="text-sm font-semibold">Stack technique</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((tech) => (
                    <span key={tech} className="rounded-[2px] bg-[var(--surface-2)] px-2 py-1 font-mono text-[11px] text-[var(--muted)]">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 border-t border-[var(--border)] pt-6">
                  <p className="text-sm text-[var(--muted)]">Un projet similaire en tête&nbsp;?</p>
                  <Button href="/contact" className="mt-3 w-full" data-umami-event="Contact-CTA">
                    Me contacter <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        {/* Projet suivant */}
        <Reveal>
          <Link
            href={`/projets/${next.slug}`}
            className="group mt-16 flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[2px] bg-[var(--accent-soft)] text-[var(--accent)]">
                <Icon name={next.category} size={22} />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Projet suivant</p>
                <p className="font-bold group-hover:text-[var(--accent)]">{next.title}</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-[var(--muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]" />
          </Link>
        </Reveal>
      </Container>
    </>
  );
}
