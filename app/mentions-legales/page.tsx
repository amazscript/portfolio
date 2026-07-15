import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales et informations RGPD du site.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <Container className="py-16">
      <div className="prose max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight">Mentions légales</h1>

        <div className="mt-8 space-y-8 text-[var(--muted)]">
          <section>
            <h2 className="text-lg font-bold text-[var(--fg)]">Éditeur du site</h2>
            <p className="mt-2">
              {site.name} — {site.role} freelance.<br />
              {site.area}.<br />
              Contact : <a href={`mailto:${site.email}`} className="text-[var(--accent)]">{site.email}</a>
              <br />
              <span className="text-sm">[SIRET à compléter]</span>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--fg)]">Hébergement</h2>
            <p className="mt-2">
              Site hébergé par [hébergeur à compléter — ex. Vercel Inc.]. <br />
              <span className="text-sm">Adresse de l&apos;hébergeur à préciser.</span>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--fg)]">Données personnelles (RGPD)</h2>
            <p className="mt-2">
              Les informations transmises via le formulaire de contact (nom, e-mail, message) sont utilisées
              uniquement pour répondre à votre demande et ne sont ni cédées ni revendues. Conformément au
              RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos
              données en écrivant à {site.email}.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--fg)]">Cookies & mesure d&apos;audience</h2>
            <p className="mt-2">
              Ce site privilégie une mesure d&apos;audience respectueuse de la vie privée, sans cookie de
              suivi. Aucune donnée personnelle n&apos;est collectée à des fins publicitaires.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--fg)]">Propriété intellectuelle</h2>
            <p className="mt-2">
              L&apos;ensemble du contenu de ce site (textes, code, visuels) est la propriété de {site.name},
              sauf mention contraire.
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
