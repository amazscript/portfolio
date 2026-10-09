/**
 * Questions fréquentes — servent au visiteur ET au SEO (schema FAQPage,
 * résultats enrichis Google). Rédigées pour capter les recherches de prospects.
 */
export type Faq = {
  question: string;
  answer: string;
  /** Reprise aussi sur l'accueil (4 max, questions d'un prospect qui découvre le site). */
  onHome?: boolean;
};

export const faqs: Faq[] = [
  {
    question: "Combien coûte un site ou une application sur mesure ?",
    onHome: true,
    answer:
      "Cela dépend du projet. À titre indicatif : un site vitrine sur mesure démarre autour de 2 000–4 000 €, une boutique e-commerce 4 000–8 000 €, une application métier 6 000–15 000 €+. Je fournis toujours un devis détaillé et ferme après un premier échange gratuit.",
  },
  {
    question: "Combien de temps faut-il pour livrer un projet ?",
    onHome: true,
    answer:
      "Comptez environ 2 à 4 semaines pour un site vitrine, 4 à 8 semaines pour une boutique, et 8 semaines ou plus pour une application métier. Le délai dépend surtout de la disponibilité du contenu et de la rapidité des validations de votre côté.",
  },
  {
    question: "Travaillez-vous avec des agences en sous-traitance ?",
    answer:
      "Oui. J'interviens régulièrement en renfort pour des agences web, en régie ou au forfait, sous NDA et en marque blanche. Vous gardez la relation client, je livre du code propre, testé et documenté.",
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer:
      "Je suis développeur full-stack polyvalent : PHP (Laravel, Symfony), JavaScript/TypeScript (Vue, React, Next.js, Node.js) et Python, avec PostgreSQL/MySQL et Docker. Je choisis la stack la plus adaptée à votre projet, pas l'inverse.",
  },
  {
    question: "Intervenez-vous uniquement en Île-de-France ?",
    onHome: true,
    answer:
      "Je suis basé en Île-de-France (93) et j'y interviens volontiers, mais je travaille aussi à distance partout en France et à l'international. La plupart des projets se mènent très bien en remote.",
  },
  {
    question: "Proposez-vous de la maintenance après la livraison ?",
    answer:
      "Oui. Au-delà de la livraison, je peux assurer la maintenance, les mises à jour de sécurité et les évolutions de votre site ou application, au forfait ou à la demande.",
  },
  {
    question: "À qui appartient le code une fois le projet livré ?",
    onHome: true,
    answer:
      "À vous. Vous repartez avec l'intégralité du code source et un projet que vous maîtrisez, sans dépendance ni boîte noire. Vos données restent les vôtres.",
  },
];

export const homeFaqs = faqs.filter((f) => f.onHome);
