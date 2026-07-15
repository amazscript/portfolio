// Contenu du blog piloté par les données (comme lib/projects.ts).
// Chaque article = métadonnées + un tableau de blocs typés rendus par
// <ArticleContent> (components/ArticleContent.tsx).

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang?: string; code: string }
  | { type: "callout"; text: string }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  icon: string; // clé iconMap pour le cover généré (repli si pas d'image)
  image?: string; // lien de l'image de couverture (URL externe ou /fichier dans public/) — optionnel
  date: string; // ISO — sert au tri et au schema
  dateLabel: string; // affichage humain (FR)
  readMin: number;
  featured?: boolean;
  content: Block[];
};

export const posts: Post[] = [
  {
    slug: "migrer-woocommerce-sans-perdre-seo",
    title: "Migrer une boutique WooCommerce sans perdre son référencement",
    excerpt:
      "Changer de plateforme ou refondre un site peut faire fondre votre trafic Google du jour au lendemain. Voici la méthode que j'applique pour que la migration soit invisible — pour vos clients comme pour Google.",
    category: "SEO & Migration",
    tags: ["SEO", "WooCommerce", "Redirections 301", "Migration"],
    icon: "refresh",
    image: "/blog/migration-seo.svg",
    date: "2026-06-18",
    dateLabel: "18 juin 2026",
    readMin: 7,
    featured: true,
    content: [
      {
        type: "p",
        text: "Une refonte réussie ne se voit pas. Le nouveau site est plus beau, plus rapide, mieux organisé — et pourtant, dans Google, rien ne bouge : les positions sont conservées, le trafic reste stable, les clients arrivent toujours. C'est exactement l'inverse du scénario catastrophe que beaucoup de commerçants vivent après un changement de plateforme, quand le trafic chute de 40 % en une semaine.",
      },
      {
        type: "p",
        text: "La différence entre les deux tient rarement au design. Elle tient à la préparation SEO de la migration. Voici comment je la mène.",
      },
      { type: "h2", text: "1. Cartographier l'existant avant de toucher à quoi que ce soit" },
      {
        type: "p",
        text: "Avant la moindre modification, on fige une photographie du site actuel : la liste complète des URL, leur trafic, leurs positions et les pages qui reçoivent des liens externes. C'est ce qui permettra de vérifier, après coup, qu'on n'a rien perdu.",
      },
      {
        type: "ul",
        items: [
          "Export complet des URL indexées (Search Console + crawl du site).",
          "Repérage des pages à fort trafic ou à forte valeur commerciale.",
          "Inventaire des backlinks : quelles pages externes pointent vers vous, et vers quelles URL exactes.",
        ],
      },
      {
        type: "callout",
        text: "La règle d'or : chaque ancienne URL doit atterrir sur son équivalent le plus proche sur le nouveau site. Une URL orpheline, c'est du capital SEO qui fuit.",
      },
      { type: "h2", text: "2. Construire un plan de redirections 301 exhaustif" },
      {
        type: "p",
        text: "La redirection 301 (permanente) indique à Google : « cette page a définitivement déménagé ici ». Elle transmet l'essentiel de l'autorité de l'ancienne URL vers la nouvelle. Sur une boutique, cela concerne les fiches produits, les catégories, les pages de contenu — parfois plusieurs milliers d'URL.",
      },
      {
        type: "code",
        lang: "nginx",
        code: "# Exemple de redirections au niveau serveur (nginx)\nlocation = /produit/ancien-slug {\n    return 301 /boutique/nouveau-slug;\n}\n\n# Redirection d'une catégorie entière\nrewrite ^/categorie/chaussures/(.*)$ /c/chaussures/$1 permanent;",
      },
      {
        type: "p",
        text: "Sur WooCommerce, je génère ce plan à partir d'un tableau de correspondance ancien → nouveau, puis je l'applique au niveau serveur (plus rapide) ou via un plugin de redirection quand l'hébergement l'impose.",
      },
      { type: "h2", text: "3. Préserver les signaux SEO on-page" },
      {
        type: "ul",
        items: [
          "Balises title et meta description reprises ou améliorées, jamais perdues.",
          "Structure des titres (H1/H2) et contenu conservés sur les pages qui performent.",
          "Données structurées produit (prix, stock, avis) reconduites.",
          "Sitemap XML régénéré et resoumis à Google.",
        ],
      },
      { type: "h2", text: "4. La recette post-migration : la partie que tout le monde oublie" },
      {
        type: "p",
        text: "Le jour de la mise en ligne, le travail n'est pas fini — il commence. On vérifie, URL par URL sur les pages critiques, que chaque redirection tombe juste, qu'aucune page ne renvoie une erreur 404, et que Google réindexe bien le nouveau site.",
      },
      {
        type: "ol",
        items: [
          "Contrôle des redirections sur les 50 à 100 URL les plus stratégiques.",
          "Chasse aux 404 et aux chaînes de redirection (301 qui pointe vers une 301).",
          "Suivi de l'indexation dans la Search Console pendant 2 à 4 semaines.",
          "Comparaison trafic/positions avant vs après pour valider l'opération.",
        ],
      },
      {
        type: "quote",
        text: "Une migration se mesure à ce qui ne se passe pas : pas de chute de trafic, pas de lien cassé, pas de client perdu.",
      },
      {
        type: "p",
        text: "C'est précisément cette rigueur qui distingue une migration menée par un développeur qui pense SEO d'un simple copier-coller de contenu. Si vous envisagez de changer de plateforme ou de refondre votre boutique, parlons-en avant que le trafic ne parte.",
      },
    ],
  },
  {
    slug: "combien-coute-site-application-sur-mesure",
    title: "Combien coûte un site ou une application sur mesure (et pourquoi)",
    excerpt:
      "« C'est quoi le prix d'un site ? » La réponse honnête : ça dépend — mais pas de façon floue. Voici les vrais facteurs qui font le budget, avec des fourchettes concrètes pour vous situer avant même de me contacter.",
    category: "Business & Freelance",
    tags: ["Budget", "Freelance", "Devis", "Projet"],
    icon: "handshake",
    image: "/blog/prix-projet.svg",
    date: "2026-07-02",
    dateLabel: "2 juillet 2026",
    readMin: 6,
    featured: false,
    content: [
      {
        type: "p",
        text: "Demander le prix d'un site web, c'est un peu comme demander le prix d'une maison : entre un studio et une villa, le mot « maison » recouvre des réalités très différentes. Mais cela ne veut pas dire qu'on ne peut rien vous dire. Voici, en transparence, ce qui compose réellement un budget.",
      },
      { type: "h2", text: "Ce qui fait vraiment varier le prix" },
      {
        type: "ul",
        items: [
          "Le type de projet : un site vitrine, une boutique, ou une application métier n'ont pas la même complexité.",
          "Le sur-mesure : partir d'un thème existant coûte moins cher que concevoir chaque écran pour votre besoin.",
          "Les fonctionnalités : paiement en ligne, espace client, réservation, tableau de bord, connexion à d'autres outils.",
          "Le contenu et le design : avez-vous déjà textes, photos et charte, ou faut-il les produire ?",
          "La reprise de l'existant : migrer des données ou brancher une API tierce ajoute du travail.",
        ],
      },
      { type: "h2", text: "Des fourchettes pour vous situer" },
      {
        type: "p",
        text: "Ces ordres de grandeur correspondent à un travail sur mesure, soigné, performant et bien référencé — pas à un template monté en une après-midi. Ils servent à cadrer une conversation, pas à remplacer un devis.",
      },
      {
        type: "ul",
        items: [
          "Site vitrine sur mesure (5 à 10 pages, SEO, responsive) : à partir de 2 000 – 4 000 €.",
          "Boutique e-commerce : à partir de 4 000 – 8 000 € selon le catalogue et les paiements.",
          "Application métier (réservation, gestion, dashboard) : à partir de 6 000 – 15 000 €+.",
          "Renfort en sous-traitance pour agences : au forfait projet ou en régie (TJM).",
        ],
      },
      {
        type: "callout",
        text: "Un prix bas cache souvent un coût caché : lenteur, absence de SEO, code impossible à faire évoluer. Le vrai sujet n'est pas « combien ça coûte » mais « combien ça rapporte ».",
      },
      { type: "h2", text: "Pourquoi le sur-mesure se rentabilise" },
      {
        type: "p",
        text: "Un site générique vous met en concurrence avec des milliers de sites identiques. Un site pensé pour votre activité charge plus vite, convertit mieux, remonte plus haut dans Google et reste modifiable dans le temps. Sur la durée, c'est ce qui fait la différence entre un site qui coûte et un site qui rapporte.",
      },
      { type: "h2", text: "Comment je travaille pour éviter les mauvaises surprises" },
      {
        type: "ol",
        items: [
          "Cadrage : on clarifie votre besoin, vos objectifs et vos priorités.",
          "Devis détaillé : un prix ferme, poste par poste, sans zone grise.",
          "Développement par étapes : vous voyez le projet avancer, vous validez au fur et à mesure.",
          "Livraison et autonomie : vous repartez avec un site que vous maîtrisez, pas une boîte noire.",
        ],
      },
      {
        type: "quote",
        text: "Un bon devis, c'est un devis où le client sait exactement ce qu'il paie — et ce qu'il obtient.",
      },
      {
        type: "p",
        text: "Vous avez un projet en tête ? Décrivez-le moi en quelques lignes : je vous réponds sous 24 h avec une première estimation honnête, sans engagement.",
      },
    ],
  },
  {
    slug: "integrer-ia-produit-sans-exploser-budget",
    title: "Intégrer l'IA dans votre produit sans exploser votre budget",
    excerpt:
      "L'IA n'est pas réservée aux géants de la tech. Bien cadrée, elle s'ajoute à un produit existant pour un coût maîtrisé — et parfois même sans qu'aucune donnée ne quitte vos serveurs. Le point pragmatique.",
    category: "Intelligence artificielle",
    tags: ["IA", "RAG", "Ollama", "Automatisation"],
    icon: "cpu",
    image: "/blog/ia-budget.svg",
    date: "2026-05-27",
    dateLabel: "27 mai 2026",
    readMin: 8,
    featured: false,
    content: [
      {
        type: "p",
        text: "Depuis deux ans, « ajouter de l'IA » est devenu une demande courante. Le piège, c'est de vouloir en mettre partout, avec le modèle le plus puissant, sans se demander ce qui apporte réellement de la valeur. Résultat : une facture d'API qui s'envole pour un gadget que personne n'utilise. L'IA utile, c'est l'inverse : ciblée, mesurée, branchée sur un vrai problème.",
      },
      { type: "h2", text: "Commencer par le problème, pas par la technologie" },
      {
        type: "p",
        text: "Avant de choisir un modèle, la bonne question est : quelle tâche répétitive, chronophage ou frustrante l'IA peut-elle prendre en charge ? Quelques exemples concrets qui rentabilisent leur mise en place :",
      },
      {
        type: "ul",
        items: [
          "Un assistant qui répond aux questions de vos clients à partir de votre documentation.",
          "Une recherche intelligente qui comprend l'intention, pas seulement les mots-clés.",
          "La classification ou le résumé automatique de messages, tickets, avis.",
          "La génération de brouillons (fiches produits, e-mails, descriptions) que vous validez.",
        ],
      },
      { type: "h2", text: "Le RAG : donner vos connaissances à l'IA sans la réentraîner" },
      {
        type: "p",
        text: "La plupart des cas d'usage métier ne nécessitent pas d'entraîner un modèle — une opération coûteuse. La technique du RAG (Retrieval-Augmented Generation) consiste à retrouver les bons extraits de vos documents, puis à les fournir au modèle au moment de répondre. L'IA s'appuie alors sur VOS contenus, à jour, sans halluciner.",
      },
      {
        type: "callout",
        text: "Le RAG, c'est la différence entre une IA qui « invente » et une IA qui cite votre catalogue, vos CGV ou votre base de connaissances — celle qu'un client peut réellement utiliser.",
      },
      { type: "h2", text: "Cloud ou local : un choix de coût ET de confidentialité" },
      {
        type: "p",
        text: "Tous les projets n'ont pas besoin du modèle le plus cher. Selon vos contraintes, je branche l'un ou l'autre — voire je combine les deux.",
      },
      {
        type: "ul",
        items: [
          "Cloud (Claude, GPT, Mistral) : la meilleure qualité, facturé à l'usage, idéal pour démarrer vite.",
          "Local (Ollama) : le modèle tourne sur votre serveur, aucune donnée ne sort, zéro coût par requête — parfait pour les données sensibles.",
          "Approche hybride : local pour le volume et le confidentiel, cloud pour les tâches les plus fines.",
        ],
      },
      { type: "h2", text: "Maîtriser la facture" },
      {
        type: "ol",
        items: [
          "Choisir le plus petit modèle qui fait le travail — pas le plus impressionnant.",
          "Mettre en cache les réponses fréquentes pour ne pas payer deux fois la même question.",
          "Fixer des garde-fous (limites de longueur, quotas) pour éviter les dérapages.",
          "Mesurer l'usage réel avant de passer à l'échelle.",
        ],
      },
      {
        type: "quote",
        text: "L'IA la plus rentable n'est pas la plus puissante : c'est la mieux ciblée.",
      },
      {
        type: "p",
        text: "Une architecture « fournisseur-agnostique » — comme celle que j'ai construite pour une extension multi-moteurs — permet en plus de changer de modèle sans réécrire l'application, et de ne jamais être enfermé chez un seul acteur. Vous avez une idée d'usage IA ? Parlons de ce qui apporterait vraiment de la valeur chez vous.",
      },
    ],
  },
  {
    slug: "vue-3-ou-nextjs-quel-choix-projet-client",
    title: "Vue 3 ou Next.js : lequel choisir pour votre projet ?",
    excerpt:
      "Deux excellents choix, deux logiques différentes. Plutôt que de trancher par préférence, voici les critères concrets — SEO, équipe, type de produit — qui font pencher la balance dans un sens ou dans l'autre.",
    category: "Front-end",
    tags: ["Vue 3", "Next.js", "React", "Architecture"],
    icon: "layers",
    image: "/blog/vue-nextjs.svg",
    date: "2026-04-14",
    dateLabel: "14 avril 2026",
    readMin: 6,
    featured: false,
    content: [
      {
        type: "p",
        text: "« Vous faites plutôt Vue ou React ? » Derrière cette question se cache souvent une vraie interrogation : lequel est le bon pour MON projet ? La réponse honnête, c'est que les deux sont d'excellents outils — et que le choix se joue sur le contexte, pas sur la mode.",
      },
      { type: "h2", text: "Ce qu'ils ont en commun" },
      {
        type: "p",
        text: "Vue 3 et Next.js (basé sur React) permettent tous deux de construire des interfaces modernes, rapides et réactives. Composants réutilisables, gestion d'état propre, excellent outillage : sur le fond, on obtient d'excellents résultats avec l'un comme avec l'autre.",
      },
      { type: "h2", text: "Quand Next.js prend l'avantage" },
      {
        type: "ul",
        items: [
          "Le SEO est critique : Next.js excelle au rendu côté serveur et au pré-rendu, donc Google voit un HTML complet.",
          "Site à fort contenu public : blog, e-commerce, site marketing où chaque page doit être indexée.",
          "Écosystème React : plus grand vivier de développeurs et de bibliothèques, utile pour pérenniser un projet.",
          "Besoin full-stack unifié : Next.js gère le front ET des routes back-end dans un même projet.",
        ],
      },
      { type: "h2", text: "Quand Vue 3 brille" },
      {
        type: "ul",
        items: [
          "Application interne ou tableau de bord : interface riche derrière un login, où le SEO n'entre pas en jeu.",
          "Courbe d'apprentissage douce : idéal si une équipe doit reprendre la main ensuite.",
          "Intégration progressive : ajouter de l'interactivité à un site existant sans tout réécrire.",
          "Lisibilité : une structure de composant très claire, agréable à maintenir.",
        ],
      },
      {
        type: "callout",
        text: "Raccourci utile : site public où le référencement compte → Next.js. Application métier derrière un login → Vue 3 fait merveille. Mais ce n'est qu'un point de départ.",
      },
      { type: "h2", text: "Le vrai critère : votre contexte" },
      {
        type: "p",
        text: "Le meilleur framework, c'est celui qui sert votre objectif et que votre équipe pourra faire vivre. Un choix technique n'est jamais neutre : il engage la maintenance, le recrutement et l'évolution du produit pour des années.",
      },
      {
        type: "quote",
        text: "Un bon choix d'architecture, c'est celui qu'on ne regrette pas dans deux ans.",
      },
      {
        type: "p",
        text: "Je travaille au quotidien avec les deux, ce qui me permet de recommander l'outil adapté à votre situation — et non celui que je préfère. Vous hésitez sur la stack de votre prochain projet ? Décrivez-le moi, je vous oriente.",
      },
    ],
  },
  {
    slug: "freelance-ou-agence-web-lequel-choisir",
    title: "Freelance ou agence web : lequel choisir pour votre projet ?",
    excerpt:
      "Deux options, deux logiques de coût et de relation. Voici les vrais critères pour décider — sans le discours commercial de l'un ou de l'autre.",
    category: "Business & Freelance",
    tags: ["Freelance", "Agence", "Budget", "Projet"],
    icon: "handshake",
    image: "/blog/freelance-agence.svg",
    date: "2026-07-10",
    dateLabel: "10 juillet 2026",
    readMin: 6,
    featured: false,
    content: [
      {
        type: "p",
        text: "« Je prends une agence ou un freelance ? » C'est souvent la première question quand on lance un projet web. Les deux peuvent livrer un excellent résultat — le bon choix dépend surtout de la taille du projet, de votre budget et de la relation que vous voulez.",
      },
      { type: "h2", text: "La vraie différence n'est pas le prix" },
      {
        type: "p",
        text: "On imagine souvent le freelance « moins cher » et l'agence « plus chère ». C'est réducteur. La vraie différence, c'est la structure : une agence, c'est une équipe et des frais de fonctionnement ; un freelance, c'est un interlocuteur unique et peu de frais de structure.",
      },
      {
        type: "ul",
        items: [
          "Freelance : contact direct avec la personne qui code, décisions rapides, coûts maîtrisés, forte implication.",
          "Agence : plusieurs métiers réunis (design, dev, marketing), capacité à absorber de gros volumes, process formalisés.",
        ],
      },
      { type: "h2", text: "Quand un freelance est le bon choix" },
      {
        type: "ul",
        items: [
          "Vous voulez un interlocuteur unique qui comprend votre projet de bout en bout.",
          "Votre projet est un site, une application ou une API sur mesure — pas une campagne multi-services.",
          "Vous cherchez de la réactivité et une relation directe, sans intermédiaire.",
          "Votre budget doit aller dans le produit, pas dans une structure.",
        ],
      },
      { type: "h2", text: "Quand une agence a du sens" },
      {
        type: "ul",
        items: [
          "Vous avez besoin de plusieurs métiers en même temps (branding, pub, rédaction, dev) sous un même toit.",
          "Le projet est très volumineux et doit avancer sur plusieurs fronts en parallèle.",
          "Vous voulez une garantie de continuité assurée par une équipe entière.",
        ],
      },
      {
        type: "callout",
        text: "Bon à savoir : beaucoup d'agences sous-traitent justement le développement à des freelances. En passant en direct, vous supprimez cet intermédiaire — et sa marge.",
      },
      { type: "h2", text: "Le compromis que j'observe le plus souvent" },
      {
        type: "p",
        text: "Pour la majorité des projets de PME et de porteurs de projet, un développeur full-stack indépendant et senior couvre l'essentiel : conception, développement, mise en ligne et suivi. Vous gardez la simplicité d'un seul interlocuteur, avec la maîtrise technique d'un profil complet — et je m'entoure ponctuellement (design, rédaction) quand le projet le demande.",
      },
      {
        type: "quote",
        text: "Le bon prestataire n'est pas « freelance » ou « agence » : c'est celui qui comprend votre besoin et le livre vraiment.",
      },
      {
        type: "p",
        text: "Vous hésitez encore pour votre projet ? Décrivez-le moi en quelques lignes : je vous dis honnêtement si c'est un projet pour moi ou si une agence serait plus adaptée.",
      },
    ],
  },
  {
    slug: "combien-de-temps-creer-site-application",
    title: "Combien de temps faut-il pour créer un site ou une application ?",
    excerpt:
      "Un site vitrine, une boutique, une application métier : les délais n'ont rien à voir. Voici des fourchettes réalistes et ce qui les fait vraiment varier.",
    category: "Business & Freelance",
    tags: ["Délais", "Planning", "Projet"],
    icon: "clock",
    image: "/blog/delais.svg",
    date: "2026-06-05",
    dateLabel: "5 juin 2026",
    readMin: 5,
    featured: false,
    content: [
      {
        type: "p",
        text: "« C'est faisable pour quand ? » Question légitime, mais la réponse dépend énormément de ce qu'on construit. Voici des ordres de grandeur réalistes pour un travail sur mesure et soigné — pas un template monté en un après-midi.",
      },
      { type: "h2", text: "Des fourchettes réalistes" },
      {
        type: "ul",
        items: [
          "Site vitrine sur mesure (5 à 10 pages) : 2 à 4 semaines.",
          "Boutique e-commerce : 4 à 8 semaines selon le catalogue et les paiements.",
          "Application métier (réservation, gestion, tableau de bord) : 8 à 16 semaines, voire plus.",
          "Application mobile : à partir de 8 à 12 semaines.",
        ],
      },
      { type: "h2", text: "Ce qui allonge (ou raccourcit) les délais" },
      {
        type: "ul",
        items: [
          "Le contenu : textes, photos et logos prêts font gagner des semaines ; à produire, ils ralentissent tout.",
          "La rapidité de validation : chaque aller-retour de décision compte.",
          "Le périmètre : un besoin clair et stable avance vite ; un cahier des charges qui bouge, non.",
          "Les intégrations tierces (paiement, CRM, API externes) ajoutent du temps de branchement et de test.",
        ],
      },
      {
        type: "callout",
        text: "Le retard n°1 sur un projet web n'est presque jamais technique : c'est l'attente du contenu et des validations côté client. Préparer ça en amont, c'est livrer plus tôt.",
      },
      { type: "h2", text: "Comment je tiens les délais" },
      {
        type: "ol",
        items: [
          "Cadrage précis au départ : on fige le périmètre et les priorités.",
          "Planning par jalons : vous savez ce qui est livré et quand.",
          "Livraisons par étapes : vous voyez le projet avancer, vous validez au fil de l'eau.",
          "Un seul interlocuteur : pas de temps perdu en coordination.",
        ],
      },
      {
        type: "quote",
        text: "Un délai tenu se prépare au cadrage, pas à la dernière semaine.",
      },
      {
        type: "p",
        text: "Vous avez une échéance en tête (un lancement, un salon, une saison) ? Dites-la moi : je vous dis franchement si c'est tenable et comment on s'organise pour y arriver.",
      },
    ],
  },
  {
    slug: "pourquoi-votre-site-est-lent",
    title: "Pourquoi votre site est lent (et ce que ça vous coûte)",
    excerpt:
      "Un site lent fait fuir les visiteurs ET vous fait perdre des places sur Google. Voici les causes les plus fréquentes — et comment savoir où vous en êtes.",
    category: "SEO & Migration",
    tags: ["Performance", "SEO", "Core Web Vitals", "Conversion"],
    icon: "bolt",
    image: "/blog/site-lent.svg",
    date: "2026-05-08",
    dateLabel: "8 mai 2026",
    readMin: 6,
    featured: false,
    content: [
      {
        type: "p",
        text: "La vitesse d'un site n'est pas un détail de développeur : c'est un enjeu business. Au-delà de 3 secondes de chargement, une grande partie des visiteurs abandonne — avant même d'avoir vu votre offre. Et Google, lui, le remarque.",
      },
      { type: "h2", text: "Ce que la lenteur vous coûte vraiment" },
      {
        type: "ul",
        items: [
          "Des visiteurs perdus : chaque seconde de chargement en plus fait chuter le taux de conversion.",
          "Du référencement en moins : la vitesse (Core Web Vitals) est un critère de classement Google.",
          "Une image de marque écornée : un site lent renvoie l'idée d'une entreprise peu soignée.",
        ],
      },
      { type: "h2", text: "Les causes les plus fréquentes" },
      {
        type: "ul",
        items: [
          "Des images non optimisées (photos de plusieurs Mo servies telles quelles).",
          "Trop de scripts et de plugins qui s'accumulent, surtout sur WordPress.",
          "Un hébergement mutualisé bas de gamme, saturé aux heures de pointe.",
          "L'absence de cache et de compression côté serveur.",
          "Un code lourd qui charge tout, tout le temps, même l'inutile.",
        ],
      },
      {
        type: "callout",
        text: "Google mesure la vitesse réelle vécue par vos visiteurs (les Core Web Vitals), pas une valeur théorique. Optimiser, c'est donc améliorer à la fois l'expérience ET le référencement.",
      },
      { type: "h2", text: "Comment savoir où vous en êtes" },
      {
        type: "ol",
        items: [
          "Testez votre page sur PageSpeed Insights (gratuit, par Google).",
          "Regardez surtout la version mobile : c'est celle que Google privilégie.",
          "Surveillez le LCP (temps d'affichage du contenu principal) et le CLS (stabilité visuelle).",
          "Comparez avant / après chaque optimisation pour mesurer le gain réel.",
        ],
      },
      {
        type: "quote",
        text: "La performance n'est pas une option technique : c'est la première impression que votre site donne.",
      },
      {
        type: "p",
        text: "Votre site vous semble lent, ou PageSpeed vous met au rouge ? Envoyez-moi l'adresse : je vous dis ce qui coince et ce qu'on peut gagner, concrètement.",
      },
    ],
  },
];

export const blogCategories = [
  "Tous",
  ...Array.from(new Set(posts.map((p) => p.category))),
] as const;

export const getAllPosts = () =>
  [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const getFeaturedPost = () =>
  posts.find((p) => p.featured) ?? getAllPosts()[0];
