import type { Metadata } from "next";
import { Container, Button, Eyebrow } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import {
  Icon,
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
    "Denis Decilap, développeur full-stack freelance formé à l'École 42. Parcours, compétences, méthode de travail et stack technique (Laravel, Vue, Node.js, Next.js).",
  alternates: { canonical: "/a-propos" },
};

const highlights = [
  { icon: Sparkles, label: "Formé à l'École 42" },
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

      {/* Héro */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid" />
          <div
            className="animate-float absolute -left-24 -top-24 h-96 w-96 rounded-full opacity-25 blur-3xl"
            style={{ backgroundImage: "var(--brand-gradient)" }}
          />
        </div>

        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-center">
            <Reveal>
              <Eyebrow>À propos</Eyebrow>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Je transforme un besoin en <span className="text-gradient">produit qui tourne</span>.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-[var(--muted)]">
                Développeur full-stack freelance en {site.area}, formé à l&apos;École 42. J&apos;ai appris à
                apprendre : résoudre des problèmes concrets, en autonomie, en allant au fond des choses.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {highlights.map((h) => (
                  <span key={h.label} className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--fg-soft)]">
                    <span className="text-[var(--accent)]"><h.icon size={15} /></span>
                    {h.label}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Carte profil */}
            <Reveal delay={120}>
              <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-[var(--shadow-card)]">
                <div className="mx-auto w-fit rounded-full p-[3px]" style={{ backgroundImage: "var(--brand-gradient)" }}>
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-[var(--surface)]">
                    <span className="text-gradient text-3xl font-extrabold">DD</span>
                  </div>
                </div>
                <p className="mt-4 font-bold">{site.name}</p>
                <p className="text-sm text-[var(--muted)]">{site.role}</p>
                <div className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
                  <span className="pulse-dot h-2 w-2 rounded-full bg-green-500" />
                  {site.availability}
                </div>
                <Button href="/contact" className="plausible-event-name=Contact-CTA mt-5 w-full">
                  Me contacter <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
                </Button>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--fg)]"
                >
                  <Github size={16} /> Voir mon code <ArrowUpRight size={13} />
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        {/* Bio complémentaire */}
        <Reveal>
          <div className="max-w-2xl space-y-4 text-[var(--muted)]">
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

        {/* Méthode — timeline */}
        <div className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">Ma méthode</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {method.map((m, i) => (
              <Reveal key={m.title} delay={i * 90}>
                <div className="group h-full rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-[var(--accent)]">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] transition-transform group-hover:scale-105">
                      <m.icon size={22} />
                    </span>
                    <span className="font-mono text-2xl font-bold text-[var(--border-strong)]">0{i + 1}</span>
                  </div>
                  <p className="mt-4 font-semibold">{m.title}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Compétences */}
        <div className="mt-16">
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">Compétences</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 90}>
                <div className="h-full rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <s.icon size={20} />
                    </span>
                    <p className="font-semibold">{s.group}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <span key={it} className="rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2.5 py-1 text-sm text-[var(--fg-soft)]">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <Reveal>
          <div className="relative mt-16 overflow-hidden rounded-3xl p-10 text-white shadow-[var(--glow)]" style={{ backgroundImage: "var(--brand-gradient)" }}>
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">Travaillons ensemble</h2>
                <p className="mt-2 text-white/90">{site.responseTime}. Parlons de votre projet, sans engagement.</p>
              </div>
              <a
                href="/contact"
                className="plausible-event-name=Contact-CTA group/cta inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[var(--accent)] shadow-lg transition-transform hover:scale-[1.03]"
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
