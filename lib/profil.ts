/**
 * Chiffres clés et compétences — partagés par la zone 3D (accueil) et la page À propos.
 */
export type Chiffre = { value: number; suffix?: string; label: string };

export const chiffres: Chiffre[] = [
  { value: 325, suffix: "+", label: "endpoints sur une seule API" },
  { value: 5, label: "domaines : web, app, API, e-commerce, migration" },
  { value: 0, label: "démo hors ligne : tout est cliquable" },
];

export type GroupeCompetences = { group: string; icon: "server" | "code" | "bolt"; items: string[] };

export const competences: GroupeCompetences[] = [
  { group: "Back-end", icon: "server", items: ["Laravel / PHP", "Node.js / Express", "PostgreSQL / MySQL", "API REST / OpenAPI"] },
  { group: "Front-end", icon: "code", items: ["Vue 3", "Next.js / React", "TypeScript", "Tailwind CSS"] },
  { group: "Outils & méthode", icon: "bolt", items: ["Docker", "Git", "Tests automatisés", "SEO technique"] },
];
