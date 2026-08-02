import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { JsonLd } from "@/components/JsonLd";
import { getAllSorted } from "@/lib/projects";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Sélection de réalisations full-stack : API Laravel, applications Vue/Node, plugins WooCommerce, extensions et migrations. Chaque projet est un cas d'étude concret.",
  alternates: { canonical: "/projets" },
};

export default function ProjetsPage() {
  const projects = getAllSorted();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Réalisations", path: "/projets" },
        ])}
      />
      <PageHeader
        num="01"
        eyebrow="Réalisations"
        lines={["Des projets", "qui tournent"]}
        intro="Filtrez par type de projet. Chaque réalisation mène à un cas d'étude détaillé : le problème, les décisions techniques, le résultat obtenu."
        aside={
          <p className="font-mono text-sm uppercase tracking-[0.14em] text-[var(--muted)]">
            {projects.length} projets
          </p>
        }
      />
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={[{ name: "Accueil", href: "/" }, { name: "Réalisations" }]} />
        <ProjectsExplorer projects={projects} />
      </Container>
    </>
  );
}
