import type { Faq } from "@/lib/faq";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  points: string[];
  tags: string[];
  icon: string;
  /** Contenu de la page dédiée (architecture en cocon SEO). */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  problem: string;
  benefits: string[];
  deliverables: string[];
  /** Pour afficher les réalisations liées (match sur project.category). */
  relatedCategory?: string;
  /** Variante pour les pages par technologie : match sur une entrée de project.stack (« Laravel » → « Laravel 12 »). */
  relatedStack?: string;
  /** FAQ propre à la page (affichée + schema FAQPage). */
  faqs?: Faq[];
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
    metaTitle: "Création de site web sur mesure — Freelance Île-de-France",
    metaDescription:
      "Création de sites web et vitrines rapides, responsives et bien référencés. Développeur full-stack freelance en Île-de-France, du design à la mise en ligne.",
    h1: "Création de site web sur mesure",
    intro:
      "Votre site est souvent le premier contact avec un client. Je conçois des sites web rapides, soignés et pensés pour convertir — pas de simples vitrines figées, mais de vrais outils d'acquisition.",
    problem:
      "Un site lent, générique ou invisible sur Google fait fuir les visiteurs avant même qu'ils découvrent votre offre. Beaucoup de sites « jolis » ne rapportent rien parce qu'ils n'ont été pensés ni pour la performance ni pour le référencement.",
    benefits: [
      "Un site qui charge en moins d'une seconde — bon pour vos visiteurs comme pour Google.",
      "Un référencement technique soigné dès le départ (SEO, Core Web Vitals).",
      "Un design sur mesure, à votre image, parfaitement responsive.",
      "Vous restez autonome pour modifier vos textes et vos images.",
    ],
    deliverables: [
      "Maquette et design sur mesure validés avec vous",
      "Site responsive, optimisé mobile-first",
      "SEO technique : balises, sitemap, données structurées",
      "Mise en ligne, nom de domaine et hébergement",
    ],
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
    metaTitle: "Application web métier sur mesure — Développeur freelance",
    metaDescription:
      "Applications web métier sur mesure : réservation, gestion, CRM, tableaux de bord. Développeur full-stack freelance en Île-de-France.",
    h1: "Développement d'application web métier sur mesure",
    intro:
      "Quand un tableur Excel ou un logiciel générique ne suit plus, une application métier sur mesure prend le relais : elle épouse exactement vos processus et fait gagner du temps à toute l'équipe.",
    problem:
      "Les outils génériques imposent leur logique à votre métier, multiplient les manipulations manuelles et les erreurs. Vous adaptez votre travail à l'outil, au lieu de l'inverse.",
    benefits: [
      "Un outil qui colle à VOS processus, pas l'inverse.",
      "Du temps gagné grâce à l'automatisation des tâches répétitives.",
      "Des données centralisées, sécurisées et accessibles partout.",
      "Évolutif : l'application grandit avec votre activité.",
    ],
    deliverables: [
      "Cadrage des besoins et des rôles utilisateurs",
      "Interface réactive (Vue, React ou Angular)",
      "Base de données robuste et sécurisée",
      "Gestion des accès, historique et exports",
    ],
    relatedCategory: "Application",
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
    metaTitle: "Création de site e-commerce sur mesure — Freelance",
    metaDescription:
      "Boutiques et back-ends e-commerce sur mesure : paiement Stripe, catalogue, stocks, sans commission de plateforme. Développeur freelance en Île-de-France.",
    h1: "Création de site e-commerce sur mesure",
    intro:
      "Vendre en ligne ne devrait pas vous coûter une commission sur chaque vente ni vous enfermer dans les limites d'une plateforme. Je conçois des boutiques taillées pour votre catalogue et vos marges.",
    problem:
      "Les plateformes fermées prélèvent des commissions qui rognent vos marges et vous contraignent à leurs fonctionnalités. Dès que votre besoin sort du cadre, vous êtes bloqué.",
    benefits: [
      "Zéro commission de plateforme sur vos ventes.",
      "Paiements Stripe sécurisés (CB, 3D Secure, remboursements).",
      "Catalogue, stocks, promotions et devis sur mesure.",
      "Une base technique testée, prête à monter en charge.",
    ],
    deliverables: [
      "Boutique headless (API) ou WooCommerce selon le besoin",
      "Tunnel d'achat et paiement Stripe",
      "Gestion catalogue, stocks et commandes",
      "Multi-devise / multi-langue si nécessaire",
    ],
    relatedCategory: "E-commerce",
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
    metaTitle: "Développement d'application mobile iOS & Android — Freelance",
    metaDescription:
      "Applications mobiles iOS et Android sur mesure, connectées à vos API et publiées sur les stores. Développeur freelance en Île-de-France.",
    h1: "Développement d'application mobile iOS & Android",
    intro:
      "Une application mobile met votre service directement dans la poche de vos clients. Je conçois des apps fluides, connectées à vos outils, publiées sur l'App Store et Google Play.",
    problem:
      "Développer deux applications natives (iOS puis Android) coûte cher et double la maintenance. Beaucoup de projets mobiles s'enlisent faute d'une approche efficace.",
    benefits: [
      "iOS et Android à partir d'une seule base de code.",
      "Connectée à vos API et à votre back-office existant.",
      "Une expérience fluide, rapide, utilisable hors-ligne.",
      "Publication et suivi sur les deux stores.",
    ],
    deliverables: [
      "Application cross-platform (React Native) ou PWA",
      "Connexion à vos services / API",
      "Écrans et parcours pensés pour le mobile",
      "Mise en ligne App Store & Google Play",
    ],
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
    metaTitle: "Développement d'API REST & back-end — Développeur freelance",
    metaDescription:
      "API REST robustes, documentées et testées (Laravel, Symfony, Node, Django). Le moteur de vos sites, apps et intégrations. Freelance en Île-de-France.",
    h1: "Développement d'API REST & back-end sur mesure",
    intro:
      "Derrière chaque application performante se cache un back-end solide. Je conçois des API REST robustes, documentées et testées, capables d'alimenter un site, une app mobile ou vos partenaires.",
    problem:
      "Un back-end bâclé, ce sont des bugs en production, des failles de sécurité et une application impossible à faire évoluer. La partie invisible est pourtant celle qui tient tout.",
    benefits: [
      "Une API fiable, documentée (OpenAPI), facile à intégrer.",
      "La sécurité au cœur : authentification, rôles, protection des données.",
      "Testée automatiquement pour éviter les régressions.",
      "Conçue dès le départ pour la montée en charge.",
    ],
    deliverables: [
      "API REST documentée (OpenAPI / Swagger)",
      "Authentification et gestion des rôles",
      "Tests automatisés et intégration continue",
      "Déploiement Docker et supervision",
    ],
    relatedCategory: "API",
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
    metaTitle: "Intégration d'IA sur mesure — Développeur freelance",
    metaDescription:
      "Intégrez l'IA à votre produit : assistants, recherche sémantique (RAG), automatisation. Cloud ou 100% local. Développeur freelance en Île-de-France.",
    h1: "Intégration d'intelligence artificielle à votre produit",
    intro:
      "L'IA n'est plus réservée aux géants de la tech. Bien ciblée, elle s'ajoute à votre produit pour automatiser des tâches, répondre à vos clients ou chercher intelligemment dans vos données.",
    problem:
      "Vouloir « mettre de l'IA partout » avec le modèle le plus cher, c'est la meilleure façon de faire exploser la facture pour un gadget que personne n'utilise. L'enjeu, c'est de cibler ce qui apporte vraiment de la valeur.",
    benefits: [
      "Des cas d'usage concrets et rentables, pas des gadgets.",
      "Une recherche sémantique (RAG) branchée sur VOS contenus.",
      "Le choix : cloud (Claude, GPT, Mistral) ou 100% local (Ollama).",
      "Privacy-first : vos données sensibles restent chez vous.",
    ],
    deliverables: [
      "Cadrage des cas d'usage à forte valeur",
      "Assistant / chatbot ou moteur de recherche sémantique",
      "Architecture multi-fournisseurs (pas d'enfermement)",
      "Maîtrise des coûts (cache, quotas, bon modèle)",
    ],
    relatedCategory: "Extension",
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
    metaTitle: "Refonte de site & migration sans perte de SEO — Freelance",
    metaDescription:
      "Refonte de site ou changement de plateforme sans perdre votre référencement ni vos données. Redirections 301 maîtrisées. Freelance en Île-de-France.",
    h1: "Refonte de site & migration sans perte de référencement",
    intro:
      "Moderniser votre site ou changer de plateforme est risqué : mal préparé, vous perdez votre trafic Google du jour au lendemain. Je mène ces opérations pour qu'elles soient invisibles — sauf pour vous.",
    problem:
      "Une refonte ou une migration mal gérée casse les liens, fait chuter le référencement et peut effacer des mois de travail SEO en une seule semaine.",
    benefits: [
      "Zéro perte de référencement (redirections 301 maîtrisées).",
      "Aucun lien cassé, aucune page 404 orpheline.",
      "Une reprise propre de votre existant et de vos données.",
      "Un site moderne, rapide et maintenable à l'arrivée.",
    ],
    deliverables: [
      "Audit et cartographie de l'existant",
      "Plan de redirections 301 exhaustif",
      "Migration des données et du contenu",
      "Recette post-migration (indexation, 404, positions)",
    ],
    relatedCategory: "Migration",
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
    metaTitle: "Renfort développeur freelance pour agences web",
    metaDescription:
      "Renfort développement pour agences web : Laravel, Vue, Node, Next. Autonome, marque blanche, sous NDA. Développeur freelance en Île-de-France.",
    h1: "Développeur freelance en renfort pour agences",
    intro:
      "Vous êtes une agence et vos plannings débordent ? J'interviens en renfort, en marque blanche, pour absorber vos pics de charge et livrer proprement — sans vous rajouter de management.",
    problem:
      "Refuser un projet faute de ressources ou livrer en retard, c'est perdre des clients. Recruter prend des mois. Un freelance fiable comble le manque immédiatement.",
    benefits: [
      "Une ressource senior disponible rapidement.",
      "Autonome : je livre, vous gardez la relation client.",
      "Marque blanche et confidentialité garanties (NDA).",
      "Code propre, testé, documenté — repris sans friction.",
    ],
    deliverables: [
      "Intégration à votre process (Git, CI, revues de code)",
      "Développement front et/ou back selon le besoin",
      "Livraison documentée et transférable",
      "En régie (TJM) ou au forfait projet",
    ],
  },
  {
    slug: "developpeur-laravel-freelance",
    title: "Développeur Laravel",
    summary:
      "Votre projet Laravel confié à un développeur qui en a mis plusieurs en production : API, back-office, paiements et tests, du cadrage au déploiement.",
    points: [
      "Laravel 12, PHP 8, Eloquent",
      "Back-offices Filament",
      "Paiements Stripe & webhooks",
      "Tests automatisés & Docker",
    ],
    tags: ["Laravel", "Filament", "Stripe", "Redis", "Docker"],
    icon: "server",
    metaTitle: "Développeur Laravel freelance en Île-de-France",
    metaDescription:
      "Développeur Laravel freelance en Île-de-France : API, back-offices Filament, paiements Stripe, tests automatisés. Projets en production, code propre et livré.",
    h1: "Développeur Laravel freelance en Île-de-France",
    intro:
      "Laravel est mon framework de prédilection pour les back-ends exigeants. Je conçois et je fais évoluer des applications Laravel complètes — API, back-office, paiements, files d'attente — avec la même rigueur que sur mes propres produits en production.",
    problem:
      "Laravel permet d'aller vite, mais un projet mené sans structure devient vite difficile à faire évoluer : contrôleurs surchargés, logique métier dispersée, aucun test, et chaque nouvelle fonctionnalité casse une ancienne. Le framework n'est pas en cause, c'est l'architecture.",
    benefits: [
      "Une architecture modulaire (services, Form Requests, Resources) qui reste lisible à plusieurs centaines d'endpoints.",
      "Des tests automatisés sur les parcours critiques : commande, paiement, stock, droits d'accès.",
      "Un back-office Filament prêt à l'emploi pour vos équipes, sans développement d'interface sur mesure.",
      "Les intégrations qui comptent : Stripe, Meilisearch, Redis, files d'attente Horizon, stockage S3/R2.",
    ],
    deliverables: [
      "Application ou API Laravel documentée",
      "Back-office d'administration Filament",
      "Suite de tests automatisés et intégration continue",
      "Déploiement Docker et passation du code",
    ],
    relatedStack: "Laravel",
    faqs: [
      {
        question: "Pouvez-vous reprendre un projet Laravel existant ?",
        answer:
          "Oui. Je commence par un audit du code (architecture, dépendances, tests, sécurité) pour savoir ce qui peut être conservé, puis je vous propose un plan : corrections urgentes, montée de version, ou refonte progressive des parties fragiles.",
      },
      {
        question: "Laravel seul ou avec un front Vue, React ou Next.js ?",
        answer:
          "Les deux. Laravel peut tout gérer (Blade, Livewire) ou servir d'API à un front séparé : c'est l'architecture d'AmazScript (Laravel + Next.js). Le choix dépend surtout de vos besoins en SEO, en application mobile et de votre équipe.",
      },
      {
        question: "Travaillez-vous en sous-traitance pour des agences Laravel ?",
        answer:
          "Oui, en régie ou au forfait, sous NDA et en marque blanche. Je m'intègre à vos conventions de code et à votre workflow Git, et je livre du code testé et documenté.",
      },
      {
        question: "Combien coûte un développement Laravel sur mesure ?",
        answer:
          "Comme pour tout projet sur mesure, cela dépend du périmètre : une application métier démarre autour de 6 000–15 000 €. Je fournis un devis détaillé et ferme après un premier échange gratuit.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
