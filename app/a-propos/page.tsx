import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import {
  Server,
  Code,
  Bolt,
  Target,
  Rocket,
  ShieldCheck,
  MapPin,
  Sparkles,
  Github,
  ArrowUpRight,
  ArrowRight,
} from "@/components/icons";
import { site } from "@/lib/site";
import { breadcrumbSchema, personSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Denis Decilap, développeur full-stack freelance en Île-de-France. Parcours, compétences, méthode de travail et stack technique : PHP (Laravel, Symfony), JavaScript/TypeScript (Vue, React, Next.js) et Python.",
  alternates: { canonical: "/a-propos" },
};

const highlights = [
  { icon: Sparkles, label: "Projets réels en production" },
  { icon: MapPin, label: site.area },
  { icon: ShieldCheck, label: site.availability },
];

const method = [
  { icon: Target, title: "Comprendre le besoin", text: "Cadrer l'objectif métier avant d'écrire une ligne de code." },
  { icon: Rocket, title: "Livrer par itérations", text: "Une première version solide en ligne vite, puis on améliore." },
  { icon: ShieldCheck, title: "Soigner la qualité", text: "Code propre, testé, documenté — et des démos qui tournent." },
];

const skills = [
  { icon: Server, group: "Back-end", items: ["Laravel / PHP", "Node.js / Express", "PostgreSQL / MySQL", "API REST / OpenAPI"] },
  { icon: Code, group: "Front-end", items: ["Vue 3", "Next.js / React", "TypeScript", "Tailwind CSS"] },
  { icon: Bolt, group: "Outils & méthode", items: ["Docker", "Git", "Tests automatisés", "SEO technique"] },
];

export default function AProposPage() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "À propos", path: "/a-propos" },
          ]),
        ]}
      />

      <PageHeader
        num="06"
        eyebrow="À propos"
        lines={["Un besoin,", "un produit", "qui tourne"]}
        intro={`Développeur full-stack freelance en ${site.area}. Je résous des problèmes concrets, en autonomie et en allant au fond des choses — du besoin à la mise en production.`}
      />

      <Container className="py-14">
        <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "À propos" }]} />

        {/* Portrait & repères — deux colonnes séparées par un filet */}
        <Reveal>
          <div className="grid gap-8 border-b border-[var(--border-strong)] pb-12 md:grid-cols-[220px_1fr] md:items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/apropos/denis.webp"
              alt={`Photo de ${site.name}, ${site.role} freelance en ${site.area}`}
              width={220}
              height={260}
              className="h-[260px] w-full max-w-[220px] rounded-[var(--radius-card)] border border-[var(--border-strong)] object-cover grayscale transition-all duration-500 hover:grayscale-0"
            />
            <div>
              <p className="font-display text-2xl font-bold">{site.name}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                {site.role}
              </p>
              <ul className="mt-6 space-y-3">
                {highlights.map((h) => (
                  <li key={h.label} className="flex items-center gap-3 text-[var(--fg-soft)]">
                    <span className="text-[var(--accent)]">
                      <h.icon size={16} />
                    </span>
                    {h.label}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Button href="/contact" data-umami-event="Contact-CTA">
                  Me contacter <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
                </Button>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  <Github size={16} /> Voir mon code <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bio complémentaire */}
        <Reveal>
          <div className="mt-12 max-w-2xl space-y-4 text-lg leading-relaxed text-[var(--muted)]">
            <p>
              Je conçois des applications de bout en bout — de la base de données à l&apos;interface — avec une
              préférence pour les architectures claires et les outils éprouvés :{" "}
              <strong className="text-[var(--fg)]">{site.stack.join(", ")}</strong>.
            </p>
            <p>
              Ce qui me motive : livrer des choses qui fonctionnent vraiment, rapides, fiables et faciles à
              maintenir. Un bon projet n&apos;est pas celui qui affiche le plus de technologies, mais celui qui
              résout le problème du client.
            </p>
          </div>
        </Reveal>

        {/* Méthode — rangées numérotées */}
        <div className="mt-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Ma méthode</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Comment je travaille
            </h2>
          </Reveal>
          <div className="mt-10 border-t border-[var(--border-strong)]">
            {method.map((m, i) => (
              <Reveal key={m.title} delay={i * 60}>
                <div className="group flex items-baseline gap-6 border-b border-[var(--border-strong)] py-7 sm:gap-10">
                  <span className="font-display text-4xl font-bold text-[var(--border-strong)] transition-colors group-hover:text-[var(--accent)] sm:text-5xl">
                    0{i + 1}
                  </span>
                  <span className="hidden shrink-0 self-center text-[var(--accent)] sm:block">
                    <m.icon size={22} />
                  </span>
                  <div>
                    <p className="font-display text-xl font-bold sm:text-2xl">{m.title}</p>
                    <p className="mt-1 max-w-xl text-[var(--muted)]">{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Compétences — trois colonnes séparées par des filets */}
        <div className="mt-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Compétences</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ce que je maîtrise
            </h2>
          </Reveal>
          <div className="mt-10 grid divide-y divide-[var(--border-strong)] border-y border-[var(--border-strong)] md:grid-cols-3 md:divide-x md:divide-y-0">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 80} className="py-8 md:px-8 md:first:pl-0 md:last:pr-0">
                <div className="flex items-center gap-2.5 text-[var(--accent)]">
                  <s.icon size={20} />
                  <p className="font-display text-lg font-bold text-[var(--fg)]">{s.group}</p>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="font-mono text-[13px] uppercase tracking-[0.08em] text-[var(--fg-soft)]"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <Reveal>
          <div className="mt-16 rounded-[var(--radius-card)] bg-[var(--fg)] p-10 text-[var(--bg)] sm:p-14">
            <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-3xl font-bold sm:text-4xl">Travaillons ensemble</h2>
                <p className="mt-3 max-w-md opacity-80">{site.responseTime}. Parlons de votre projet, sans engagement.</p>
              </div>
              <a
                href="/contact"
                data-umami-event="Contact-CTA"
                className="group/cta inline-flex shrink-0 items-center gap-2 rounded-[2px] bg-[var(--accent)] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-fg)] transition-transform hover:scale-[1.02]"
              >
                Me contacter
                <ArrowUpRight size={17} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
