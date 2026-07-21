export const site = {
  name: "Denis Decilap",
  role: "Développeur Full-Stack",
  /** URL de production — utilisée pour les canoniques, l'Open Graph et le sitemap. */
  url: "https://decilapdenis.fr",
  locale: "fr_FR",
  email: "contact@decilapdenis.fr",
  area: "Île-de-France (93)",
  availability: "Disponible pour missions freelance",
  responseTime: "Réponse sous 24 h",
  stack: ["Laravel", "Symfony", "Vue", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Docker"],
  title: "Développeur full-stack freelance — sites & applications sur mesure en Île-de-France",
  description:
    "Denis Decilap, développeur full-stack freelance en Île-de-France (93). Je conçois sites, applications métier et API robustes — en PHP (Laravel, Symfony), JavaScript/TypeScript (Vue, React, Next.js, Node) ou Python, selon votre projet.",
  social: {
    github: "https://github.com/amazscript",
    linkedin: "https://www.linkedin.com/in/denis-decilap",
  },
} as const;

export const nav = [
  { href: "/projets", label: "Réalisations" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
