import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionHeading, Button } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Icon, Check, ArrowRight } from "@/components/icons";
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
    <Container className="py-16">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          faqSchema(faqs),
        ]}
      />
      <Reveal>
        <SectionHeading
          eyebrow="Services"
          title="Je conçois, code et déploie vos produits — de A à Z"
          intro="Développeur full-stack indépendant : un seul interlocuteur du premier écran à la mise en production. Site vitrine, application métier, e-commerce, mobile, API ou IA — avec une exigence constante de performance, de fiabilité et de référencement."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 80}>
            <div className="group h-full rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-7 transition-all hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[var(--shadow-card)]">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] transition-transform group-hover:scale-105">
                <Icon name={s.icon} size={24} />
              </span>
              <h2 className="mt-4 text-xl font-bold">{s.title}</h2>
              <p className="mt-2 text-[var(--muted)]">{s.summary}</p>
              <ul className="mt-4 space-y-2">
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--border)] pt-4">
                {s.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-[var(--surface-2)] px-2 py-1 font-mono text-[11px] text-[var(--muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* FAQ — accordéon natif (SEO : schema FAQPage, contenu dans le HTML) */}
      <section className="mt-20">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Questions fréquentes" />
        </Reveal>
        <div className="mt-8 max-w-3xl divide-y divide-[var(--border)] overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)]">
          {faqs.map((f) => (
            <details key={f.question} className="group px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold marker:hidden">
                {f.question}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)] transition-transform group-open:rotate-45">
                  <ArrowRight size={15} className="rotate-[-45deg]" />
                </span>
              </summary>
              <p className="pb-5 text-[var(--muted)]">{f.answer}</p>
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
        <div className="mt-14 flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-2)] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Un besoin qui ne rentre pas dans une case&nbsp;?</h2>
            <p className="mt-1 text-[var(--muted)]">Décrivez-moi votre projet, je vous réponds sous 24 h.</p>
          </div>
          <Button href="/contact" className="plausible-event-name=Contact-CTA">
            Discuter de mon projet
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </Reveal>
    </Container>
  );
}
