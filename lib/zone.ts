import { site } from "@/lib/site";
import { getAllSorted, type Project } from "@/lib/projects";
import { services } from "@/lib/services";
import { getAllPosts } from "@/lib/blog";
import { experiences, formations, type Etape } from "@/lib/parcours";
import { chiffres, competences, type Chiffre, type GroupeCompetences } from "@/lib/profil";

/**
 * Zone industrielle de l'accueil : un bâtiment par rubrique réelle du site, généré depuis
 * les mêmes données que les pages. Ajouter un projet dans lib/projects.ts ajoute un
 * bâtiment, et la route s'allonge d'autant.
 */

export type Roof = "flat" | "saw" | "gable" | "tower";

/** Forme du bâtiment 3D (dimensions en unités de scène). */
export type BuildingShape = {
  w: number;
  d: number;
  h: number;
  roof: Roof;
  chimneys?: boolean;
  truck?: boolean;
  /** Panneau lumineux sur la façade (bâtiment du blog). */
  screen?: boolean;
};

export type ZoneLink = { label: string; href: string; external?: boolean };

/** Contenu de la fiche, selon le type de rubrique. */
export type ZoneCard =
  | { kind: "about"; text: string; chiffres: Chiffre[]; availability: string }
  | { kind: "etapes"; items: Etape[] }
  | { kind: "project"; text: string; stack: string[]; links: ZoneLink[] }
  | { kind: "skills"; groups: GroupeCompetences[] }
  | { kind: "services"; items: { title: string; text: string; href: string }[]; link: ZoneLink }
  | { kind: "blog"; items: { title: string; date: string; href: string }[]; link: ZoneLink }
  | { kind: "contact"; text: string; email: string; phone: string; links: ZoneLink[] };

export type ZoneBuilding = {
  id: string;
  /** Nom court, pour le plan de la zone et la pastille d'état. */
  name: string;
  /** Plaque d'enseigne : « À propos », « Réalisations · API »… */
  sign: string;
  /** Titre de la fiche (vrai titre de la rubrique). */
  title: string;
  /** Partie du titre mise en jaune, si présente dans `title`. */
  highlight?: string;
  shape: BuildingShape;
  card: ZoneCard;
};

/** Archétype de bâtiment selon la catégorie du projet. */
function projectShape(p: Project, index: number): BuildingShape {
  // Petites variations de taille pour éviter la répétition d'un bâtiment à l'autre
  const v = (index % 3) * 1.5;
  switch (p.category) {
    case "Marketplace":
    case "E-commerce":
      return { w: 17 + v, d: 12, h: 8.5, roof: "flat", chimneys: true };
    case "API":
      return { w: 20 + v, d: 12, h: 8, roof: "saw" };
    default:
      return { w: 15 + v, d: 10, h: 7, roof: "flat" };
  }
}

export function getZoneBuildings(): ZoneBuilding[] {
  const buildings: ZoneBuilding[] = [];

  buildings.push({
    id: "a-propos",
    name: "À propos",
    sign: "À propos",
    title: `${site.name}, développeur web freelance`,
    highlight: "développeur web",
    shape: { w: 16, d: 10, h: 7, roof: "flat" },
    card: {
      kind: "about",
      text: `Quatorze ans en logistique au volant d'un chariot, puis la reconversion. Je conçois des sites, des applications métier et des API, du besoin jusqu'à la mise en production, depuis l'${site.area}.`,
      chiffres,
      availability: site.availability,
    },
  });

  buildings.push({
    id: "experience",
    name: "Expérience",
    sign: "Expérience",
    title: "Expérience",
    shape: { w: 22, d: 12, h: 8, roof: "saw" },
    card: { kind: "etapes", items: experiences },
  });

  buildings.push({
    id: "formation",
    name: "Formation",
    sign: "Formation",
    title: "Formation",
    shape: { w: 14, d: 10, h: 7, roof: "gable" },
    card: { kind: "etapes", items: formations },
  });

  getAllSorted().forEach((p, i) => {
    const links: ZoneLink[] = [{ label: "Cas d'étude", href: `/projets/${p.slug}` }];
    if (p.demoUrl) links.push({ label: "Voir le site", href: p.demoUrl, external: true });
    buildings.push({
      id: `projet-${p.slug}`,
      name: p.shortTitle ?? p.title,
      sign: `Réalisations · ${p.category}`,
      title: p.title,
      shape: projectShape(p, i),
      card: { kind: "project", text: p.result, stack: p.stack.slice(0, 6), links },
    });
  });

  buildings.push({
    id: "competences",
    name: "Compétences",
    sign: "Compétences",
    title: "Compétences",
    shape: { w: 7, d: 7, h: 16, roof: "tower" },
    card: { kind: "skills", groups: competences },
  });

  buildings.push({
    id: "services",
    name: "Services",
    sign: "Services",
    title: "Services",
    shape: { w: 15, d: 10, h: 6.5, roof: "gable" },
    card: {
      kind: "services",
      items: services.map((s) => ({ title: s.title, text: s.summary, href: `/services/${s.slug}` })),
      link: { label: "Tous les services", href: "/services" },
    },
  });

  const posts = getAllPosts().slice(0, 3);
  if (posts.length > 0) {
    buildings.push({
      id: "blog",
      name: "Blog",
      sign: "Blog",
      title: "Blog",
      shape: { w: 14, d: 9, h: 5.5, roof: "flat", screen: true },
      card: {
        kind: "blog",
        items: posts.map((p) => ({ title: p.title, date: p.dateLabel, href: `/blog/${p.slug}` })),
        link: { label: "Tous les articles", href: "/blog" },
      },
    });
  }

  buildings.push({
    id: "contact",
    name: "Contact",
    sign: "Contact",
    title: "Contact",
    shape: { w: 16, d: 11, h: 7, roof: "flat", truck: true },
    card: {
      kind: "contact",
      text: `${site.responseTime}, sans engagement.`,
      email: site.email,
      phone: site.phone.display,
      links: [
        { label: "Démarrer un projet", href: "/contact" },
        { label: "GitHub", href: site.social.github, external: true },
        { label: "LinkedIn", href: site.social.linkedin, external: true },
      ],
    },
  });

  return buildings;
}
