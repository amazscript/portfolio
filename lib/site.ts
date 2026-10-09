export const site = {
  name: "Denis Decilap",
  role: "Développeur Full-Stack",
  /** URL de production — utilisée pour les canoniques, l'Open Graph et le sitemap. */
  url: "https://decilapdenis.fr",
  locale: "fr_FR",
  email: "contact@decilapdenis.fr",
  /** Même numéro que la fiche Google Business (cohérence nom / ville / téléphone). */
  phone: { display: "07 49 49 59 16", international: "+33749495916" },
  area: "Île-de-France (93)",
  /** Version courte de la zone, pour les titres où « (93) » alourdit la phrase. */
  region: "Île-de-France",
  /** Ville et code postal publics (déjà affichés sur la fiche Google Business) — pas de numéro de rue. */
  city: "Épinay-sur-Seine",
  postalCode: "93800",
  availability: "Disponible pour missions freelance",
  responseTime: "Réponse sous 24 h",
  stack: ["Laravel", "Symfony", "Vue", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Docker"],
  /** Raccourci mis en avant dans le hero — 4 technologies maximum. */
  coreStack: ["Laravel", "Next.js", "PostgreSQL", "Docker"],
  /**
   * Portrait affiché dans le hero. Mettre `null` pour afficher le visuel de
   * repli (monogramme) tant qu'aucune photo n'est disponible.
   */
  portrait: "/apropos/denis.webp" as string | null,
  /** Balise <title> de l'accueil — 60 caractères max, sinon Google la tronque. */
  title: "Création de site internet & applications en Île-de-France",
  /** Méta-description — 120 à 160 caractères pour ne pas être coupée dans les résultats. */
  description:
    "Denis Decilap, développeur freelance en Île-de-France : création de site internet, applications métier et agents IA sur mesure. Devis gratuit sous 24 h.",
  social: {
    github: "https://github.com/amazscript",
    linkedin: "https://www.linkedin.com/in/denisdecilap/",
  },
} as const;

export const nav = [
  { href: "/projets", label: "Réalisations" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
