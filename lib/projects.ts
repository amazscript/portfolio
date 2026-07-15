export type Project = {
  slug: string;
  title: string;
  tagline: string;
  featured: boolean;
  order: number;
  category: "API" | "Application" | "E-commerce" | "Extension" | "Migration";
  stack: string[];
  result: string;
  demoUrl?: string;
  codeUrl?: string;
  // Cas d'étude
  problem: string;
  solution: string[];
  decisions: string;
  metrics: { label: string; value: string }[];
  learned: string;
};

// Réalisations réelles — servent de cas d'étude crédibles (cf. CDC §3.4).
// Les liens démo/code sont à renseigner ; NE PAS laisser de lien mort en prod (CDC §2.3).
export const projects: Project[] = [
  {
    slug: "laracommerce-api",
    title: "LaraCommerce API",
    tagline: "API REST e-commerce Laravel 12 — 325+ endpoints, prête pour la production",
    featured: true,
    order: 1,
    category: "API",
    stack: ["Laravel 12", "PHP 8.5+", "MySQL 8.4", "Redis", "Stripe", "Meilisearch", "Filament v3", "Docker"],
    result:
      "Une API e-commerce complète et prête pour la production : 325+ endpoints, paiements Stripe, admin Filament et 100% de couverture de tests.",
    demoUrl: "https://amazscript.com/products/laracommerce-api-complete-e-commerce-backend-laravel-12-x9jkbo",
    problem:
      "Les boutiques qui veulent un front sur mesure (Vue, Next.js, mobile) ont besoin d'un back-end e-commerce fiable et découplé, sans s'enfermer dans un CMS monolithique.",
    solution: [
      "API REST headless de 325+ endpoints répartis sur 25+ modules : catalogue, panier, commandes, paiements, stocks, marketing et fidélité.",
      "Authentification Sanctum (double token) + OAuth social (Google, Facebook, Apple) et contrôle d'accès par rôles (57 permissions).",
      "Paiements Stripe complets : PaymentIntents, 3D Secure/SCA, webhooks, remboursements, portefeuille interne et paiement à la livraison.",
      "Recherche Meilisearch (tolérance aux fautes, facettes, autocomplétion), inventaire multi-entrepôts, multi-langue (EN/FR/AR) et multi-devise (7).",
      "Admin Filament v3 (46 écrans), documentation VitePress et déploiement Docker Compose en une commande (12 services).",
    ],
    decisions:
      "Laravel 12 pour la vélocité et la robustesse de son écosystème ; architecture modulaire (Services + Form Requests + Resources) pour rester lisible à 300+ endpoints ; 2 452 tests automatisés (100% de couverture) pour verrouiller les parcours critiques (commande, paiement, stock).",
    metrics: [
      { label: "Endpoints REST", value: "325+" },
      { label: "Couverture de tests", value: "100% (2 452)" },
      { label: "Modèles Eloquent", value: "88" },
    ],
    learned:
      "Maintenir une API lisible à 325+ endpoints avec 100% de couverture impose une discipline stricte de modularité, de nommage et de tests — un socle qui accélère chaque nouvelle intégration front.",
  },
  {
    slug: "systeme-reservation",
    title: "Système de réservation",
    tagline: "Système de réservation self-hosted — Vue 3, Node/Express, PostgreSQL",
    featured: true,
    order: 2,
    category: "Application",
    stack: ["Vue 3", "Tailwind CSS v4", "Node.js 20", "Express", "Sequelize", "PostgreSQL 16", "MinIO", "Docker"],
    result:
      "Un système de réservation complet et auto-hébergé : calendrier sur mesure (6 vues), formulaires personnalisables et zéro double réservation.",
    demoUrl: "https://amazscript.com/products/booking-system-multi-resource-booking-calendar-vuejs-3-nodejs-7qjqp2",
    problem:
      "Les activités sur rendez-vous (salons, cliniques, studios, coachs) ont besoin d'un outil de réservation qu'elles maîtrisent — sans commission ni abonnement mensuel, et sans dépendre d'un agenda tiers.",
    solution: [
      "Calendrier 100% sur mesure (6 vues : mois, semaine, jour, timeline, ressources) avec glisser-déposer complet : créer, déplacer, redimensionner.",
      "Formulaires de réservation configurables par ressource : 19 types de champs personnalisés, avec durée et prix automatiques.",
      "Page publique de réservation avec détection de conflits (aucune double réservation) et blocs d'indisponibilité respectés.",
      "Tableau de bord admin (filtres, pagination, créneaux), e-mails traduits + rappel automatique J-1, upload de fichiers (MinIO/S3).",
    ],
    decisions:
      "Vue 3 (Composition API, Pinia, Tailwind v4) pour une UI réactive ; Node 20/Express + Sequelize côté API ; PostgreSQL 16 pour garantir l'intégrité des créneaux au niveau base plutôt qu'en applicatif. Sécurité JWT (bcrypt, Helmet, rate limiting) et déploiement Docker en une commande.",
    metrics: [
      { label: "Vues calendrier", value: "6 (sur mesure)" },
      { label: "Champs personnalisés", value: "19 types" },
      { label: "Langues", value: "13" },
    ],
    learned:
      "La prévention des collisions se joue en base, pas dans l'UI : une contrainte PostgreSQL bien posée est plus fiable que dix vérifications côté client — et un calendrier sur mesure évite d'hériter des limites d'une lib tierce.",
  },
  {
    slug: "litequote-woocommerce",
    title: "LiteQuote pour WooCommerce",
    tagline: "Plugin WooCommerce de devis ultra-léger — vanilla JS, moins de 120 KB",
    featured: true,
    order: 3,
    category: "E-commerce",
    stack: ["WordPress", "WooCommerce", "PHP", "JavaScript (vanilla)", "PDF"],
    result:
      "Un plugin de devis ultra-léger qui remplace « Ajouter au panier » par « Demander un devis » — avec e-mails pro, PDF et tableau de bord.",
    demoUrl: "https://amazscript.com/products/litequote-for-woocommerce-request-a-quote-plugin-i7f0cs",
    problem:
      "Beaucoup de boutiques B2B ou d'artisans vendent des produits qui se négocient : le tunnel d'achat classique ne convient pas, il faut demander un devis plutôt que payer immédiatement.",
    solution: [
      "Remplace le bouton d'achat par une modale de devis AJAX pré-remplie (accessible ARIA, responsive), sans recharger la page.",
      "E-mails HTML professionnels avec devis PDF joint (A4, logo, tableau de prix) et réponse au client en un clic.",
      "Tableau de bord des demandes dans WooCommerce : filtres par statut, recherche, actions groupées, export CSV.",
      "Intégration WhatsApp (3 modes), mode catalogue, anti-spam sans reCAPTCHA (honeypot + limitation de débit) et 7 langues.",
    ],
    decisions:
      "JavaScript vanilla ES6+ sans jQuery : moins de 120 KB (≈30× plus léger que les concurrents), zéro impact sur le PageSpeed. Aucune API externe, aucun cookie, aucun service Google — conforme RGPD par conception, toutes les données restent sur le serveur.",
    metrics: [
      { label: "Poids du plugin", value: "< 120 KB" },
      { label: "Dépendances JS", value: "0 (vanilla)" },
      { label: "Langues", value: "7" },
    ],
    learned:
      "Concevoir un plugin riche (PDF, tableau de bord, WhatsApp) tout en restant sous 120 KB force à choisir le vanilla JS et à éliminer chaque dépendance superflue — la performance devient une fonctionnalité vendable.",
  },
  {
    slug: "tab-manager-pro",
    title: "Tab Manager Pro",
    tagline: "Extension Chrome qui range les onglets par l'IA — 5 moteurs au choix",
    featured: false,
    order: 4,
    category: "Extension",
    stack: ["JavaScript", "Chrome Extension API", "Chrome i18n", "LLM (5 fournisseurs)"],
    result:
      "Range des dizaines d'onglets en groupes intelligents et colorés en un clic, avec le moteur IA de son choix — dont Ollama 100% local.",
    demoUrl: "https://amazscript.com/products/tab-manager-pro-ai-tab-organizer-rdalkm",
    problem:
      "Les utilisateurs intensifs accumulent des dizaines d'onglets ; les trier et les retrouver devient un frein. Un assistant IA peut regrouper, nommer et sauvegarder tout ça en un clic.",
    solution: [
      "Regroupement intelligent : l'IA analyse titres et URLs pour créer des groupes d'onglets natifs Chrome, colorés et étiquetés.",
      "5 moteurs IA au choix : Claude, GPT, Gemini, Mistral ou Ollama (100% local et hors-ligne).",
      "Sessions & espaces de travail : sauvegarde fenêtres + groupes + onglets, restauration en un clic, espaces thématiques (Travail, Recherche…).",
      "Panneau IA en langage naturel (« ferme les doublons », « groupe par thème », « enregistre cette session ») avec historique des commandes.",
    ],
    decisions:
      "Architecture multi-fournisseurs pour ne pas enfermer l'utilisateur dans une seule IA et permettre le 100% local via Ollama ; conception privacy-first : seuls les titres et URLs sont envoyés au fournisseur choisi, aucune donnée de navigation collectée, aucun tracking.",
    metrics: [
      { label: "Moteurs IA", value: "5 au choix" },
      { label: "Confidentialité", value: "100% local (Ollama)" },
      { label: "Langues", value: "3" },
    ],
    learned:
      "Concevoir une intégration IA « fournisseur-agnostique » demande d'abstraire proprement l'appel LLM — un pattern réutilisable au-delà de l'extension.",
  },
];

export const getFeatured = () =>
  projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);

export const getAllSorted = () => [...projects].sort((a, b) => a.order - b.order);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const categories = ["Tous", "API", "Application", "E-commerce", "Extension", "Migration"] as const;
