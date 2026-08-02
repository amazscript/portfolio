/**
 * Logo de marque — monogramme « DD » vectoriel (net à toute taille).
 * Bloc d'encre et lettres papier : suit automatiquement le thème via les
 * variables CSS. Le favicon partage le même dessin (app/icon.svg).
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Denis Decilap">
      <rect width="64" height="64" rx="4" fill="var(--fg)" />
      <g fill="var(--bg)">
        <path fillRule="evenodd" d="M9 17 H17 A15 15 0 0 1 17 47 H9 Z M17 25 A7 7 0 0 1 17 39 Z" />
        <path fillRule="evenodd" d="M32 17 H40 A15 15 0 0 1 40 47 H32 Z M40 25 A7 7 0 0 1 40 39 Z" />
      </g>
    </svg>
  );
}
