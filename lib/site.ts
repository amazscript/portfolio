export const site = {
  name: "Denis Decilap",
  role: "Développeur Full-Stack",
  // URL de production — à ajuster lors du déploiement (utilisée pour canoniques, OG, sitemap)
  url: "https://decilapdenis.fr",
  locale: "fr_FR",
  email: "decilapdenis@gmail.com",
  area: "Île-de-France (93)",
  availability: "Disponible pour missions freelance",
  responseTime: "Réponse sous 24 h",
  stack: ["Laravel", "Vue", "Node.js", "Next.js", "PostgreSQL", "Docker"],
  title: "Développeur full-stack freelance — sites & applications sur mesure en Île-de-France",
  description:
    "Denis Decilap, développeur full-stack freelance en Île-de-France (93). Je conçois des sites, applications métier et API robustes en Laravel, Vue, Node.js et Next.js.",
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
