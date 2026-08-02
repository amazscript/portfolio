import { Icon } from "@/components/icons";

/**
 * Visuel de couverture d'article.
 * - Si `image` est fourni (URL externe ou /fichier dans public/), on l'affiche.
 * - Sinon, on génère un visuel de marque (dégradé + filigrane d'icône), comme ProjectVisual.
 */
export function BlogCover({
  icon,
  category,
  image,
  alt,
  size = "card",
}: {
  icon: string;
  category: string;
  image?: string;
  alt?: string;
  size?: "card" | "hero";
}) {
  const iconSize = size === "hero" ? 260 : 132;
  /**
   * Même ratio (16/9) pour la carte et le hero → l'image s'affiche en entier,
   * sans rognage vertical (les covers SVG sont en 16/9).
   */
  const aspect = "aspect-[16/9]";
  const radius = size === "card" ? "rounded-t-[var(--radius-card)]" : "rounded-[var(--radius-card)]";

  return (
    <div className={`relative w-full overflow-hidden ${aspect} ${radius}`}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={alt ?? category}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-[var(--surface-2)]">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute -right-8 -top-10 text-[var(--accent)] opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-30">
            <Icon name={icon} size={iconSize} strokeWidth={1} />
          </div>
        </div>
      )}

      {/* Pastille catégorie, lisible sur image comme sur visuel généré */}
      <div className="absolute inset-x-5 bottom-4 flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--accent)] text-[var(--accent-fg)]">
          <Icon name={icon} size={18} />
        </span>
        <span className="rounded-lg bg-[var(--surface)]/90 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--fg)] backdrop-blur-sm">
          {category}
        </span>
      </div>
    </div>
  );
}
