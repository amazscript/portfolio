import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Base>
);
export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}><path d="M7 17 17 7M8 7h9v9" /></Base>
);
export const ExternalLink = (p: IconProps) => (
  <Base {...p}><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></Base>
);
export const Code = (p: IconProps) => (
  <Base {...p}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></Base>
);
export const Server = (p: IconProps) => (
  <Base {...p}><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></Base>
);
export const Layers = (p: IconProps) => (
  <Base {...p}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5M3 8l9 5 9-5" opacity="0.5" /></Base>
);
export const Globe = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" /></Base>
);
export const Refresh = (p: IconProps) => (
  <Base {...p}><path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 4v4h-4" /></Base>
);
export const Handshake = (p: IconProps) => (
  <Base {...p}><path d="m11 17 2 2a1 1 0 0 0 1.4 0l3.6-3.6M14 14l2 2M2 12l4-4 5 5M22 12l-4-4-5 5" /></Base>
);
export const Puzzle = (p: IconProps) => (
  <Base {...p}><path d="M15.5 3.5a2 2 0 0 0-4 0V6H8a2 2 0 0 0-2 2v3.5H3.5a2 2 0 1 0 0 4H6V19a2 2 0 0 0 2 2h3.5v-2.5a2 2 0 1 1 4 0V21H19a2 2 0 0 0 2-2v-3.5a2 2 0 1 0 0-4V8a2 2 0 0 0-2-2h-3.5V3.5Z" /></Base>
);
export const Cpu = (p: IconProps) => (
  <Base {...p}><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" /></Base>
);
export const Smartphone = (p: IconProps) => (
  <Base {...p}><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M11 18h2" /></Base>
);
export const Cart = (p: IconProps) => (
  <Base {...p}><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2 3h2.2l2.1 12.2a1.5 1.5 0 0 0 1.5 1.3h9.1a1.5 1.5 0 0 0 1.5-1.2L21 7H5.3" /></Base>
);
export const Sparkles = (p: IconProps) => (
  <Base {...p}><path d="M12 3v4M12 17v4M5 12H1M23 12h-4M6.3 6.3 4 4M20 20l-2.3-2.3M6.3 17.7 4 20M20 4l-2.3 2.3" opacity="0.6" /><path d="M12 8.5 13.2 11 15.7 12l-2.5 1L12 15.5 10.8 13 8.3 12l2.5-1L12 8.5Z" fill="currentColor" stroke="none" /></Base>
);
export const Bolt = (p: IconProps) => (
  <Base {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></Base>
);
export const Check = (p: IconProps) => (
  <Base {...p}><path d="m4 12 5 5L20 6" /></Base>
);
export const CheckCircle = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.5 2.5 4.5-5" /></Base>
);
export const Database = (p: IconProps) => (
  <Base {...p}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></Base>
);
export const Rocket = (p: IconProps) => (
  <Base {...p}><path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2M9 12a12 12 0 0 1 8-8c2.5 0 4 2 4 4a12 12 0 0 1-8 8l-4-4Z" /><circle cx="15" cy="9" r="1.5" /></Base>
);
export const Target = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></Base>
);
export const MapPin = (p: IconProps) => (
  <Base {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></Base>
);
export const Mail = (p: IconProps) => (
  <Base {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Base>
);
export const Github = (p: IconProps) => (
  <Base {...p}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6 0C6.2 2.3 5.1 2.6 5.1 2.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.7 9c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></Base>
);
export const Linkedin = (p: IconProps) => (
  <Base {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 17v-7" /></Base>
);
export const User = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Base>
);
export const MessageSquare = (p: IconProps) => (
  <Base {...p}><path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2Z" /></Base>
);
export const Tag = (p: IconProps) => (
  <Base {...p}><path d="M3 3h7l11 11-7 7L3 10V3Z" /><circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" /></Base>
);
export const Send = (p: IconProps) => (
  <Base {...p}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></Base>
);
export const Clock = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Base>
);
export const ShieldCheck = (p: IconProps) => (
  <Base {...p}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></Base>
);
export const Menu = (p: IconProps) => (
  <Base {...p}><path d="M3 12h18M3 6h18M3 18h18" /></Base>
);
export const Close = (p: IconProps) => (
  <Base {...p}><path d="M18 6 6 18M6 6l12 12" /></Base>
);
export const Sun = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4" /></Base>
);
export const Moon = (p: IconProps) => (
  <Base {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" /></Base>
);

// Correspondance slug → composant (services & catégories projets)
export const iconMap = {
  globe: Globe,
  layers: Layers,
  server: Server,
  refresh: Refresh,
  handshake: Handshake,
  cpu: Cpu,
  ia: Cpu,
  ai: Cpu,
  smartphone: Smartphone,
  mobile: Smartphone,
  cart: Cart,
  commerce: Cart,
  api: Server,
  application: Layers,
  "e-commerce": Cart,
  extension: Puzzle,
  migration: Refresh,
} as const;

export type IconName = keyof typeof iconMap;

export function Icon({ name, ...props }: { name: string } & IconProps) {
  const Cmp = iconMap[name.toLowerCase() as IconName] ?? Sparkles;
  return <Cmp {...props} />;
}
