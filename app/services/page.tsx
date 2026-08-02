import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading, CtaBanner } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/Reveal";
import { Icon, Check, ArrowRight, ArrowUpRight } from "@/components/icons";
import { services } from "@/lib/services";
import { faqs } from "@/lib/faq";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Sites web, applications métier, e-commerce, apps mobiles, API back-end, intelligence artificielle, refonte & renfort pour agences. Développement full-stack Laravel, Vue, Node.js, Next.js et IA.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          faqSchema(faqs),
        ]}
      />
      <PageHeader
        num="02"
        eyebrow="Services"
        lines={["Je conçois,", "code", "et déploie"]}
        intro="Développeur full-stack indépendant : un seul interlocuteur du premier écran à la mise en production. Site vitrine, application métier, e-commerce, mobile, API ou IA — avec une exigence constante de performance, de fiabilité et de référencement."
      />

      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Services" }]} />

        {/* Grille de cartes : une carte de verre par service */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 50} className="h-full">
              <Link
                href={`/services/${s.slug}`}
                className="glass-card group flex h-full flex-col rounded-[var(--radius-card)] p-8 sm:p-10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon name={s.icon} size={22} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent)]">
                  {s.title}
                </h2>
                <p className="mt-3 text-[var(--muted)]">{s.summary}</p>

                <ul className="mt-6 space-y-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-[var(--fg-soft)]">
                      <span className="mt-0.5 shrink-0 text-[var(--accent)]">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>

                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                  {s.tags.join(" · ")}
                </p>

                <span className="mt-auto flex items-center gap-1.5 pt-8 font-mono text-xs uppercase tracking-[0.1em] text-[var(--accent)]">
                  Détail du service
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* FAQ — accordéon natif (SEO : schema FAQPage, contenu dans le HTML) */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading num="03" eyebrow="FAQ" title="Questions fréquentes" />
          </Reveal>
          <div className="mt-10 max-w-3xl space-y-3">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 transition-colors hover:border-[var(--accent)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold marker:hidden">
                  {f.question}
                  <span className="shrink-0 text-[var(--accent)] transition-transform duration-300 group-open:rotate-45">
                    <ArrowRight size={18} className="rotate-[-45deg]" />
                  </span>
                </summary>
                <p className="pb-6 text-[var(--muted)]">{f.answer}</p>
              </details>
            ))}
          </div>
          {/* Maillage interne : renvoi vers le blog */}
          <Reveal>
            <p className="mt-6 text-sm text-[var(--muted)]">
              Envie d&apos;aller plus loin&nbsp;? Je détaille prix, délais et choix techniques dans{" "}
              <Link href="/blog" className="font-semibold text-[var(--accent)] hover:underline">
                mes articles de blog
              </Link>
              .
            </p>
          </Reveal>
        </section>

        <Reveal>
          <CtaBanner
            className="mt-16"
            title="Un besoin qui ne rentre pas dans une case ?"
            intro="Décrivez-moi votre projet, je vous réponds sous 24 h."
            cta="Discuter de mon projet"
          />
        </Reveal>
      </Container>
    </>
  );
}
