import Link from "next/link";
import { Container, Button, SectionHeading } from "@/components/ui";
import { HomeHero } from "@/components/HomeHero";
import { ProjectRow } from "@/components/ProjectRow";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { Icon, ArrowRight, ArrowUpRight } from "@/components/icons";
import { getFeatured } from "@/lib/projects";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const stats = [
  { value: "325+", label: "endpoints livrés sur une seule API" },
  { value: "5", label: "domaines : web, app, API, e-commerce, migration" },
  { value: "0", label: "démo hors ligne — tout est cliquable" },
];

export default function HomePage() {
  const featured = getFeatured();

  return (
    <>
      <HomeHero />

      {/* Projets phares — portent 80 % de la conviction */}
      <section id="realisations" className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              num="01"
              eyebrow="Réalisations"
              title="Des projets en ligne, pas des promesses"
              intro="Chaque projet est un cas d'étude : le problème, les décisions techniques et le résultat obtenu."
            />
          </Reveal>
          <div className="mt-12 border-b border-[var(--border-strong)]">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 60}>
                <ProjectRow project={project} index={i} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/projets" variant="secondary">
              Toutes les réalisations
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Preuve & indicateurs — colonnes séparées par des filets */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-subtle)] py-14">
        <Container>
          <div className="grid divide-y divide-[var(--border)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 110} className="py-6 sm:px-8 sm:py-2 sm:first:pl-0 sm:last:pr-0">
                <p className="font-display text-6xl font-bold tracking-tight text-[var(--fg)]">
                  <Counter value={stat.value} />
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Aperçu services — liste éditoriale numérotée */}
      <section id="services" className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading num="02" eyebrow="Services" title="Ce que je peux construire pour vous" />
          </Reveal>
          <div className="mt-12 border-t border-[var(--border-strong)]">
            {services.slice(0, 3).map((s, i) => (
              <Reveal key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-baseline gap-6 border-b border-[var(--border-strong)] py-7 transition-all hover:bg-[var(--surface-2)] hover:pl-3 sm:gap-10"
                >
                  <span className="index-num shrink-0" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="hidden shrink-0 self-center text-[var(--muted)] transition-colors group-hover:text-[var(--accent)] sm:block">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-xl font-bold transition-colors group-hover:text-[var(--accent)] sm:text-2xl">
                      {s.title}
                    </span>
                    <span className="mt-1 block max-w-xl text-sm text-[var(--muted)]">{s.summary}</span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 self-center text-[var(--muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline">
              Voir tous les services <ArrowRight size={15} />
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA final — bloc d'encre pleine largeur, typographie géante */}
      <section className="pb-20">
        <Container>
          <Reveal>
            <div className="rounded-[var(--radius-card)] bg-[var(--fg)] p-10 text-[var(--bg)] sm:p-16">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                03 — Contact
              </p>
              <h2 className="mt-6 max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
                Un projet en tête&nbsp;?
              </h2>
              <div className="mt-10 flex flex-col items-start justify-between gap-8 border-t border-[color-mix(in_srgb,var(--bg)_25%,transparent)] pt-8 sm:flex-row sm:items-center">
                <p className="max-w-md opacity-80">
                  {site.responseTime}. Parlons de votre besoin, sans engagement.
                </p>
                <Link
                  href="/contact"
                  data-umami-event="Contact-CTA"
                  className="group/cta inline-flex shrink-0 items-center gap-3 rounded-[2px] bg-[var(--accent)] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-fg)] transition-transform hover:scale-[1.03]"
                >
                  Me contacter
                  <ArrowUpRight size={18} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
