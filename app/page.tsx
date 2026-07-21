import Link from "next/link";
import { Container, Button, SectionHeading } from "@/components/ui";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { Icon, ArrowRight, ArrowUpRight, Sparkles, Bolt, Rocket, CheckCircle } from "@/components/icons";
import { getFeatured } from "@/lib/projects";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const stats = [
  { value: "325+", label: "endpoints livrés sur une seule API", icon: Bolt },
  { value: "5", label: "domaines : web, app, API, e-commerce, migration", icon: Rocket },
  { value: "0", label: "démo hors ligne — tout est cliquable", icon: CheckCircle },
];

export default function HomePage() {
  const featured = getFeatured();

  return (
    <>
      {/* Hero — fond animé (orbes + grille), sans image lourde */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid" />
          <div
            className="animate-float absolute -left-24 -top-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
            style={{ backgroundImage: "var(--brand-gradient)" }}
          />
          <div
            className="animate-aurora absolute -right-24 top-10 h-80 w-80 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--accent-3), transparent 65%)" }}
          />
        </div>

        <Container className="py-20 sm:py-28">
          <Reveal className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--fg-soft)] shadow-sm">
              <span className="pulse-dot h-2 w-2 rounded-full bg-green-500" />
              {site.availability} — {site.area}
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Développeur full-stack freelance qui livre des{" "}
              <span className="text-gradient">produits qui tournent</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[var(--muted)]">
              Sites rapides, applications métier et API robustes —{" "}
              <span className="font-medium text-[var(--fg-soft)]">PHP, JavaScript/TypeScript ou Python</span>, selon ce
              qui sert votre projet. Du besoin au déploiement, avec un souci constant de performance et de référencement — en {site.area}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/projets">
                Voir mes réalisations
                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
              </Button>
              <Button href="/contact" variant="secondary" data-umami-event="Contact-CTA">
                <Sparkles size={16} />
                Me contacter
              </Button>
            </div>
          </Reveal>

          {/* Ruban de technologies défilant */}
          <Reveal delay={120} className="marquee-mask mt-14 flex gap-3 overflow-hidden">
            <div className="marquee-track gap-3">
              {[...site.stack, ...site.stack, ...site.stack].map((tech, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 font-mono text-sm text-[var(--fg-soft)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Projets phares — portent 80 % de la conviction */}
      <section className="py-8">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Réalisations"
              title="Des projets en ligne, pas des promesses"
              intro="Chaque projet est un cas d'étude : le problème, les décisions techniques et le résultat obtenu."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 90} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/projets" variant="secondary">
              Toutes les réalisations
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Preuve & indicateurs animés */}
      <section className="py-16">
        <Container>
          <div className="grid gap-6 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)] sm:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 110} className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <stat.icon size={22} />
                </span>
                <div>
                  <p className="text-3xl font-extrabold tracking-tight">
                    <Counter value={stat.value} />
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Aperçu services avec icônes */}
      <section className="py-8">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Services" title="Ce que je peux construire pour vous" />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((s, i) => (
              <Reveal key={s.slug} delay={i * 90}>
                <div className="group h-full rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[var(--shadow-card)]">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] transition-transform group-hover:scale-105">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <h3 className="mt-4 font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{s.summary}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline">
              Voir tous les services <ArrowRight size={15} />
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA final en dégradé de marque */}
      <section className="py-16">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl p-10 text-white shadow-[var(--glow)]" style={{ backgroundImage: "var(--brand-gradient)" }}>
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">Un projet en tête&nbsp;?</h2>
                  <p className="mt-2 text-white/90">{site.responseTime}. Parlons de votre besoin, sans engagement.</p>
                </div>
                <Link
                  href="/contact"
                  data-umami-event="Contact-CTA"
                  className="group/cta inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[var(--accent)] shadow-lg transition-transform hover:scale-[1.03]"
                >
                  Me contacter
                  <ArrowUpRight size={17} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
