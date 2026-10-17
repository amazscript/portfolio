/**
 * Parcours professionnel et formations — source unique pour la zone 3D (bâtiments
 * Expérience et Formation) et, à terme, pour le CV (cv/cv.html).
 * Du plus récent au plus ancien.
 */
export type Etape = {
  /** Étiquette courte affichée au-dessus du titre (période, statut ou niveau). */
  tag: string;
  title: string;
  text: string;
};

export const experiences: Etape[] = [
  {
    tag: "2026 → aujourd'hui",
    title: "Développeur freelance · AmazScript",
    text: "Sites, applications métier et API sur mesure. Produits vendus en ligne (LaraCommerce API, LiteQuote, Tab Manager Pro).",
  },
  {
    tag: "2025 → aujourd'hui",
    title: "Développeur bénévole · Association MOT-ZAÏQUE",
    text: "Application Android de communication alternative (CAA) pour les personnes autistes non verbales.",
  },
  {
    tag: "Alternance · 2021 → 2022",
    title: "Développeur web · Louis Vuitton",
    text: "DSI Manufacturing, développement d'outils web internes.",
  },
  {
    tag: "2007 → 2021",
    title: "Magasinier cariste",
    text: "Quatorze ans de logistique : flux, rigueur et délais tenus.",
  },
];

export const formations: Etape[] = [
  {
    tag: "En cours · fin prévue en novembre 2026",
    title: "École 42 Paris",
    text: "Cursus expert en architecture logicielle : C, mémoire, algorithmique, programmation système.",
  },
  {
    tag: "Niveau 6 (bac +3/4)",
    title: "Concepteur-développeur d'applications",
    text: "Titre professionnel, obtenu en alternance chez Louis Vuitton avec Simplon.co.",
  },
  {
    tag: "Simplon.co · 2021",
    title: "Développeur Java / Spring Boot",
    text: "Première formation au développement : Java, Spring Boot, Angular, CI/CD.",
  },
];
