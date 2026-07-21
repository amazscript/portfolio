/**
 * Logo de marque — monogramme « DD » vectoriel (net à toute taille),
 * aux couleurs de la marque. Utilisé dans le header ; le favicon partage
 * le même dessin (app/icon.svg).
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Denis Decilap">
      <defs>
        <linearGradient id="logo-dd" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6366f1" />
          <stop offset="0.5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#logo-dd)" />
      <g fill="#ffffff">
        <path fillRule="evenodd" d="M9 17 H17 A15 15 0 0 1 17 47 H9 Z M17 25 A7 7 0 0 1 17 39 Z" />
        <path fillRule="evenodd" d="M32 17 H40 A15 15 0 0 1 40 47 H32 Z M40 25 A7 7 0 0 1 40 39 Z" />
      </g>
    </svg>
  );
}
