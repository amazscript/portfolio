/** Injecte du JSON-LD dans le HTML rendu côté serveur (GEO). */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      /* Contenu contrôlé par nous (pas d'entrée utilisateur) — sérialisation sûre. */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
