import Link from "next/link";
import { Container, Button, SectionHeading } from "@/components/ui";
import { HomeHero } from "@/components/HomeHero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import {
  Icon,
  ArrowRight,
  ArrowUpRight,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
} from "@/components/icons";
import { getFeatured } from "@/lib/projects";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { homeFaqs } from "@/lib/faq";
import { faqSchema } from "@/lib/schema";

const stats = [
  { value: "325+", label: "endpoints livrés sur une seule API" },
  { value: "5", label: "domaines : web, app, API, e-commerce, migration" },
  { value: "0", label: "démo hors ligne — tout est cliquable" },
];

export default function HomePage() {
  /** La grille d'accueil fait trois colonnes : on s'arrête à trois pour éviter une carte orpheline. */
  const featured = getFeatured().slice(0, 3);

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
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
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 60} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/projets" variant="secondary">
              Toutes les réalisations
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Preuve & indicateurs — trois cartes de verre */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-subtle)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 110} className="h-full">
                <div className="glass-card h-full rounded-[var(--radius-card)] p-8">
                  <p className="font-display text-5xl font-bold tracking-[-0.02em] text-[var(--accent)]">
                    <Counter value={stat.value} />
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{stat.label}</p>
                </div>
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
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((s, i) => (
              <Reveal key={s.slug} delay={i * 60} className="h-full">
                <Link
                  href={`/services/${s.slug}`}
                  className="glass-card group flex h-full flex-col rounded-[var(--radius-card)] p-8"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="mt-6 block font-display text-xl font-semibold transition-colors group-hover:text-[var(--accent)]">
                    {s.title}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-[var(--muted)]">
                    {s.summary}
                  </span>
                  <span className="mt-auto flex items-center gap-1.5 pt-6 font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent)]">
                    En savoir plus
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <Link href="/services" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline">
              Voir tous les services <ArrowRight size={15} />
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQ — réponses directes aux objections d'un prospect (et passages citables par les IA) */}
      <section id="faq" className="pb-16 sm:pb-24">
        <Container>
          <Reveal>
            <SectionHeading num="03" eyebrow="FAQ" title="Les questions qu'on me pose avant de démarrer" />
          </Reveal>
          <FaqList faqs={homeFaqs} />
          <Link
            href="/services#faq"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
          >
            Toutes les questions fréquentes <ArrowRight size={15} />
          </Link>
        </Container>
      </section>

      {/* CTA final — grande carte de verre centrée */}
      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="glass-card rounded-[var(--radius-card)] px-6 py-16 text-center sm:px-16 sm:py-20">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.15] tracking-[-0.02em] sm:text-5xl">
                Prêt à lancer votre prochain projet&nbsp;?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
                Discutons de vos objectifs — refonte complète, nouvelle application ou renfort
                technique ponctuel.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Button href="/contact" size="lg" data-umami-event="Contact-CTA">
                  <MessageSquare size={18} />
                  Me contacter
                </Button>
                <Button href={`mailto:${site.email}`} size="lg" variant="secondary" external>
                  <Mail size={18} />
                  M&apos;écrire directement
                </Button>
              </div>
              <p className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-[0.1em] text-[var(--muted)]">
                <span className="inline-flex items-center gap-2">
                  <Clock size={14} /> {site.responseTime}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle size={14} /> Accompagnement de bout en bout
                </span>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
