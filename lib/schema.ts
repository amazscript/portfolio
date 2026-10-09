import { site } from "@/lib/site";
import type { Project } from "@/lib/projects";
import type { Post } from "@/lib/blog";
import type { Faq } from "@/lib/faq";
import { services, type Service } from "@/lib/services";

/** Adresse publique : ville et code postal, cohérents avec la fiche Google Business. */
const postalAddress = {
  "@type": "PostalAddress",
  addressLocality: site.city,
  postalCode: site.postalCode,
  addressRegion: site.region,
  addressCountry: "FR",
};

/** Données structurées Schema.org — présentes dans le HTML initial. */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    telephone: site.phone.international,
    url: site.url,
    image: `${site.url}/apropos/denis.webp`,
    knowsAbout: site.stack,
    sameAs: [site.social.github, site.social.linkedin],
    address: postalAddress,
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.name}, ${site.role}`,
    description: site.description,
    url: site.url,
    email: `mailto:${site.email}`,
    telephone: site.phone.international,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Île-de-France" },
      { "@type": "Country", name: "France" },
    ],
    address: postalAddress,
    knowsAbout: site.stack,
    priceRange: "€€",
    provider: { "@type": "Person", name: site.name },
    /** Catalogue des prestations proposées (aide Google à comprendre l'offre). */
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
        url: `${site.url}/services/${s.slug}`,
      },
    })),
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.metaDescription,
    url: `${site.url}/services/${s.slug}`,
    provider: { "@type": "Person", name: site.name, url: site.url },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Île-de-France" },
      { "@type": "Country", name: "France" },
    ],
  };
}

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "fr-FR",
    publisher: { "@type": "Person", name: site.name },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function articleSchema(p: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    url: `${site.url}/blog/${p.slug}`,
    datePublished: p.date,
    dateModified: p.date,
    keywords: p.tags.join(", "),
    articleSection: p.category,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${p.slug}` },
  };
}

export function projectSchema(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": p.category === "API" || p.category === "Extension" ? "SoftwareApplication" : "CreativeWork",
    name: p.title,
    description: p.tagline,
    url: `${site.url}/projets/${p.slug}`,
    author: { "@type": "Person", name: site.name },
    keywords: p.stack.join(", "),
    ...(p.demoUrl ? { sameAs: p.demoUrl } : {}),
  };
}
