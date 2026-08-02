import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui";
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

        {/* Liste éditoriale : une rangée numérotée par service, dépliée en deux colonnes */}
        <div className="border-t border-[var(--border-strong)]">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 50}>
              <Link
                href={`/services/${s.slug}`}
                className="group grid gap-6 border-b border-[var(--border-strong)] py-10 transition-all hover:bg-[var(--surface-2)] hover:pl-3 md:grid-cols-12"
              >
                <span className="index-num md:col-span-1" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="md:col-span-5">
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                      <Icon name={s.icon} size={22} />
                    </span>
                    <h2 className="font-display text-2xl font-bold transition-colors group-hover:text-[var(--accent)] sm:text-3xl">
                      {s.title}
                    </h2>
                  </div>
                  <p className="mt-3 max-w-md text-[var(--muted)]">{s.summary}</p>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--muted)]">
                    {s.tags.join(" · ")}
                  </p>
                </div>

                <ul className="space-y-2 md:col-span-5">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-[var(--fg-soft)]">
                      <span className="mt-0.5 shrink-0 text-[var(--accent)]">
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>

                <span className="flex items-start justify-end md:col-span-1">
                  <ArrowUpRight
                    size={22}
                    className="text-[var(--muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
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
          <div className="mt-10 max-w-3xl border-t border-[var(--border-strong)]">
            {faqs.map((f) => (
              <details key={f.question} className="group border-b border-[var(--border-strong)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-bold marker:hidden">
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
          <div className="mt-16 flex flex-col items-start gap-6 rounded-[var(--radius-card)] bg-[var(--fg)] p-10 text-[var(--bg)] sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Un besoin qui ne rentre pas dans une case&nbsp;?
              </h2>
              <p className="mt-2 opacity-80">Décrivez-moi votre projet, je vous réponds sous 24 h.</p>
            </div>
            <Link
              href="/contact"
              data-umami-event="Contact-CTA"
              className="group/cta inline-flex shrink-0 items-center gap-3 rounded-[2px] bg-[var(--accent)] px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-fg)] transition-transform hover:scale-[1.03]"
            >
              Discuter de mon projet
              <ArrowUpRight size={17} className="transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
