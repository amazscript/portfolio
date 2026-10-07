import type { Metadata } from "next";
import { Container, Button, CtaBanner } from "@/components/ui";
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
  title: "À propos : développeur full-stack freelance",
  description:
    "Denis Decilap, développeur full-stack freelance en Île-de-France : parcours, méthode de travail et stack (Laravel, Symfony, Vue, React, Next.js, Python).",
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
                <Button href="/contact" data-track="contact_cta_click">
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

        {/* Méthode — une carte numérotée par étape */}
        <div className="mt-20">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">Ma méthode</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
              Comment je travaille
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {method.map((m, i) => (
              <Reveal key={m.title} delay={i * 60} className="h-full">
                <div className="glass-card h-full rounded-[var(--radius-card)] p-8">
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <m.icon size={22} />
                    </span>
                    <span className="font-mono text-sm font-medium tracking-[0.1em] text-[var(--muted)]">
                      0{i + 1}
                    </span>
                  </div>
                  <p className="mt-6 font-display text-xl font-semibold">{m.title}</p>
                  <p className="mt-2 leading-relaxed text-[var(--muted)]">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Compétences — une carte par famille technique */}
        <div className="mt-20">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent)]">Compétences</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
              Ce que je maîtrise
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 80} className="h-full">
                <div className="glass-card h-full rounded-[var(--radius-card)] p-8">
                  <div className="flex items-center gap-3 text-[var(--accent)]">
                    <s.icon size={20} />
                    <p className="font-display text-lg font-semibold text-[var(--fg)]">{s.group}</p>
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
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <Reveal>
          <CtaBanner
            className="mt-16"
            title="Travaillons ensemble"
            intro={`${site.responseTime}. Parlons de votre projet, sans engagement.`}
          />
        </Reveal>
      </Container>
    </>
  );
}
