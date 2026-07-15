export type Service = {
  slug: string;
  title: string;
  summary: string;
  points: string[];
  tags: string[];
  icon: string;
};

export const services: Service[] = [
  {
    slug: "sites-vitrine",
    title: "Sites web & vitrines",
    summary:
      "Un site rapide, bien référencé et facile à mettre à jour, pensé pour transformer vos visiteurs en clients — pas seulement pour faire joli.",
    points: [
      "Design sur mesure, 100% responsive",
      "SEO technique & Core Web Vitals au vert",
      "Chargement quasi instantané (< 1 s)",
      "Vous restez autonome pour le contenu",
    ],
    tags: ["Next.js", "React", "Tailwind", "WordPress"],
    icon: "globe",
  },
  {
    slug: "applications-metier",
    title: "Applications web métier",
    summary:
      "Vos processus (réservation, gestion, tableaux de bord) transformés en un outil sur mesure qui fait gagner du temps à toute l'équipe.",
    points: [
      "Réservation, CRM, back-office, dashboards",
      "Temps réel & interfaces réactives",
      "Rôles, droits et données sécurisés",
      "Base de données robuste et évolutive",
    ],
    tags: ["Vue 3", "Next.js", "Angular", "PostgreSQL", "MySQL", "MongoDB"],
    icon: "layers",
  },
  {
    slug: "e-commerce",
    title: "E-commerce sur mesure",
    summary:
      "Une boutique ou un back-end e-commerce taillé pour votre catalogue et vos marges — sans les limites ni les commissions des plateformes fermées.",
    points: [
      "Catalogue, panier, paiement Stripe",
      "Headless (API) ou WooCommerce",
      "Devis, stocks, multi-devise, multi-langue",
      "Prêt à monter en charge (API testée)",
    ],
    tags: ["Laravel", "WooCommerce", "Stripe", "Next.js"],
    icon: "e-commerce",
  },
  {
    slug: "applications-mobiles",
    title: "Applications mobiles",
    summary:
      "Une app dans la poche de vos clients : fluide, connectée à vos services et pensée pour l'usage réel, publiée sur les deux stores.",
    points: [
      "iOS & Android en une base de code",
      "Connectée à vos API / back-office",
      "UX native, rapide et hors-ligne",
      "Publication App Store & Google Play",
    ],
    tags: ["React Native", "PWA", "API REST"],
    icon: "smartphone",
  },
  {
    slug: "api-backend",
    title: "API & back-end",
    summary:
      "Le moteur invisible de vos produits : une API REST robuste, documentée et testée, capable d'alimenter un site, une app mobile ou un partenaire.",
    points: [
      "REST documentée (OpenAPI)",
      "Authentification & rôles sécurisés",
      "Tests automatisés & intégration continue",
      "Conçue pour la montée en charge",
    ],
    tags: ["Laravel", "Symfony", "Django", "Node.js", "PostgreSQL"],
    icon: "server",
  },
  {
    slug: "intelligence-artificielle",
    title: "Intelligence artificielle",
    summary:
      "L'IA branchée sur votre métier : assistants, recherche intelligente, automatisation — avec le choix entre cloud et 100% local pour vos données sensibles.",
    points: [
      "Assistants & chatbots métier",
      "Recherche sémantique (RAG)",
      "Automatisation de contenu & de tâches",
      "Cloud ou local (Ollama), privacy-first",
    ],
    tags: ["Claude", "GPT", "Mistral", "Ollama"],
    icon: "cpu",
  },
  {
    slug: "refonte-migration",
    title: "Refonte & migration",
    summary:
      "Moderniser un site ou changer de plateforme sans perdre votre référencement, vos données ni vos clients en cours de route.",
    points: [
      "Redirections 301 maîtrisées",
      "Zéro perte de référencement",
      "Audit et reprise de l'existant",
      "Migration de données fiable",
    ],
    tags: ["SEO", "301", "PHP", "MySQL"],
    icon: "refresh",
  },
  {
    slug: "renfort-agence",
    title: "Renfort pour agences",
    summary:
      "Un développeur full-stack fiable et autonome en sous-traitance, pour absorber vos pics de charge et livrer proprement — sans management à rajouter.",
    points: [
      "Autonome & bon communicant",
      "Stack Laravel / Vue / Node / Next",
      "Code propre, testé, documenté",
      "Sous NDA / marque blanche",
    ],
    tags: ["Laravel", "Vue", "Node", "Next.js"],
    icon: "handshake",
  },
];
