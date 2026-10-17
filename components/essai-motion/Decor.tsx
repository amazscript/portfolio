import type { ReactNode, Ref } from "react";

/**
 * Décor de la zone industrielle de nuit, en couches de parallaxe :
 * étoiles (quasi fixes), silhouettes lointaines, conteneurs et pylônes, puis la rue
 * avec le bâtiment « À propos » au même plan que le chariot, et enfin un premier plan
 * qui défile plus vite que la caméra.
 */

export type DecorPart = "stars" | "far" | "mid" | "main" | "fore" | "signLight";
type Bind = (part: DecorPart) => Ref<SVGGElement>;

const GROUND_Y = 690;
const SCENE_BOTTOM = 900;

/** Générateur pseudo-aléatoire déterministe : même décor côté serveur et côté client. */
function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const STARS = (() => {
  const random = seededRandom(7);
  return Array.from({ length: 70 }, () => ({
    x: Math.round(random() * 2200 - 100),
    y: Math.round(random() * 420 + 20),
    r: random() < 0.15 ? 1.6 : 0.9 + random() * 0.5,
    twinkle: random() < 0.25,
    delay: Math.round(random() * 40) / 10,
  }));
})();

/** Silhouettes lointaines : usines, cheminées, grues. */
const FAR_BLOCKS = (() => {
  const random = seededRandom(21);
  const blocks: { x: number; w: number; h: number; chimney: boolean; windows: number[] }[] = [];
  let x = -500;
  while (x < 2600) {
    const w = 90 + Math.round(random() * 160);
    const h = 70 + Math.round(random() * 130);
    const windows = Array.from({ length: Math.round(random() * 4) }, () => Math.round(random() * 1000) / 1000);
    blocks.push({ x, w, h, chimney: random() < 0.35, windows });
    x += w + Math.round(random() * 60);
  }
  return blocks;
})();

function Lamppost({ x }: { x: number }) {
  const headY = 372;
  return (
    <g>
      <ellipse cx={x + 44} cy={772} rx={150} ry={26} fill="url(#em-pool-warm)" />
      <circle cx={x + 44} cy={headY + 8} r={90} fill="url(#em-halo)" />
      <rect x={x - 4} y={headY} width={8} height={GROUND_Y + 34 - headY} rx={3} fill="#1f2a44" />
      <rect x={x - 3} y={headY} width={2} height={GROUND_Y + 34 - headY} fill="#33426a" />
      <path d={`M${x} ${headY + 6} Q${x} ${headY - 6} ${x + 14} ${headY - 6} L${x + 44} ${headY - 6}`} fill="none" stroke="#1f2a44" strokeWidth={6} strokeLinecap="round" />
      <path d={`M${x + 26} ${headY - 8} L${x + 62} ${headY - 8} Q${x + 62} ${headY + 4} ${x + 52} ${headY + 4} L${x + 36} ${headY + 4} Q${x + 26} ${headY + 4} ${x + 26} ${headY - 8} Z`} fill="#2a3656" />
      <ellipse cx={x + 44} cy={headY + 4} rx={14} ry={3.5} fill="#ffe3a3" />
      <rect x={x - 10} y={GROUND_Y + 30} width={20} height={6} rx={2} fill="#1a2440" />
    </g>
  );
}

function Building() {
  const left = 1000;
  const right = 1420;
  const top = 366;
  return (
    <g>
      {/* Enseigne lumineuse sur le toit */}
      <rect x={1060} y={318} width={6} height={50} fill="#1c2643" />
      <rect x={1294} y={318} width={6} height={50} fill="#1c2643" />
      <rect x={left} y={top} width={right - left} height={GROUND_Y - top} fill="#1b2747" />
      {Array.from({ length: 21 }, (_, i) => (
        <rect key={i} x={left + 10 + i * 20} y={top + 16} width={2} height={GROUND_Y - top - 56} fill="#22305a" />
      ))}
      <rect x={left - 8} y={top - 16} width={right - left + 16} height={18} rx={2} fill="#141d36" />
      <rect x={left - 8} y={top - 16} width={right - left + 16} height={2} fill="#2c3b5e" />
      <rect x={left} y={GROUND_Y - 40} width={right - left} height={40} fill="#141d36" />

      {/* Quai en hauteur, ouvert : c'est là que la caisse est levée */}
      <rect x={1010} y={420} width={124} height={100} fill="url(#em-bay)" />
      <rect x={1010} y={420} width={124} height={100} fill="none" stroke="#0e1530" strokeWidth={4} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path key={i} d={`M${1006 + i * 16} 520 l10 0 l-8 10 l-10 0 Z`} fill={i % 2 ? "#1a1405" : "#f4b51f"} />
      ))}
      <rect x={1050} y={404} width={44} height={8} rx={3} fill="#2a3656" />
      <path d="M1056 412 L1088 412 L1120 520 L1024 520 Z" fill="url(#em-cone)" />

      {/* Bandeau de fenêtres éclairées */}
      <rect x={1160} y={404} width={240} height={34} rx={2} fill="#0e1530" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={1164 + i * 39.3} y={408} width={35} height={26} rx={1} fill={i === 2 ? "#2a3a63" : "url(#em-window)"} />
      ))}

      {/* Porte sectionnelle fermée */}
      <rect x={1180} y={530} width={170} height={160} fill="#26345a" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={1180} y={530 + i * 18} width={170} height={2} fill="#1b2747" />
      ))}
      <rect x={1172} y={522} width={186} height={8} rx={2} fill="#141d36" />
      <rect x={1172} y={530} width={8} height={160} fill="#f4b51f" />
      <rect x={1350} y={530} width={8} height={160} fill="#f4b51f" />
      <text x={1265} y={600} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={14} fill="#5b6c95" letterSpacing={2}>
        QUAI 01
      </text>
    </g>
  );
}

function Sign({ bindRef }: { bindRef: Ref<SVGGElement> }) {
  return (
    <g>
      <g ref={bindRef}>
        <ellipse cx={1180} cy={300} rx={230} ry={70} fill="url(#em-sign-glow)" />
        <rect x={1030} y={276} width={300} height={48} rx={4} fill="#f4b51f" />
        <rect x={1030} y={276} width={300} height={4} rx={2} fill="#ffd666" />
        <text
          x={1180}
          y={312}
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontWeight={900}
          fontSize={32}
          letterSpacing={2}
          fill="#1a1405"
        >
          01 · À PROPOS
        </text>
      </g>
    </g>
  );
}

export function Decor({ bind, children }: { bind: Bind; children: ReactNode }) {
  return (
    <>
      <g ref={bind("stars")}>
        {STARS.map((star, i) => (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#dfe7ff"
            opacity={star.twinkle ? undefined : 0.55}
            className={star.twinkle ? "em-twinkle" : undefined}
            style={star.twinkle ? { animationDelay: `${star.delay}s` } : undefined}
          />
        ))}
        <circle cx={1500} cy={130} r={46} fill="url(#em-moon-glow)" />
        <circle cx={1500} cy={130} r={20} fill="#e9e4d2" />
        <circle cx={1508} cy={124} r={17} fill="#0b1326" opacity={0.9} />
      </g>

      {/* Lueur de la ville à l'horizon */}
      <rect x={-100} y={460} width={2400} height={240} fill="url(#em-horizon)" />

      <g ref={bind("far")}>
        {FAR_BLOCKS.map((block) => (
          <g key={block.x}>
            <rect x={block.x} y={GROUND_Y - block.h} width={block.w} height={block.h} fill="#111b34" />
            {block.chimney && (
              <>
                <rect x={block.x + block.w * 0.7} y={GROUND_Y - block.h - 90} width={14} height={90} fill="#111b34" />
                <circle cx={block.x + block.w * 0.7 + 7} cy={GROUND_Y - block.h - 94} r={3} fill="#ff4d3d" className="em-aviation" />
              </>
            )}
            {block.windows.map((ratio, i) => (
              <rect
                key={i}
                x={block.x + 10 + ratio * (block.w - 30)}
                y={GROUND_Y - block.h + 18 + i * 22}
                width={10}
                height={6}
                fill="#f4b51f"
                opacity={0.35}
              />
            ))}
          </g>
        ))}
        {/* Grue portuaire */}
        <path d="M640 690 L640 420 L652 420 L652 690 Z M600 430 L860 430 L860 442 L600 442 Z M652 420 L760 430" fill="#111b34" stroke="#111b34" strokeWidth={3} />
      </g>

      <g ref={bind("mid")}>
        {[
          { x: 120, color: "#1a2747", stack: 2 },
          { x: 560, color: "#172241", stack: 1 },
          { x: 1500, color: "#1a2747", stack: 2 },
          { x: 1900, color: "#172241", stack: 3 },
        ].map((container) => (
          <g key={container.x}>
            {Array.from({ length: container.stack }, (_, level) => (
              <g key={level}>
                <rect x={container.x + level * 14} y={GROUND_Y - 52 * (level + 1)} width={170} height={50} rx={2} fill={container.color} />
                <rect x={container.x + level * 14} y={GROUND_Y - 52 * (level + 1)} width={170} height={2} fill="#26355c" />
                {Array.from({ length: 9 }, (_, i) => (
                  <rect key={i} x={container.x + level * 14 + 10 + i * 18} y={GROUND_Y - 52 * (level + 1) + 8} width={2} height={34} fill="#13203e" />
                ))}
              </g>
            ))}
          </g>
        ))}
        {[-200, 380, 960, 1540, 2120].map((x) => (
          <g key={x}>
            <rect x={x} y={470} width={5} height={220} fill="#16213f" />
            <rect x={x - 18} y={480} width={41} height={4} fill="#16213f" />
          </g>
        ))}
        <path d="M-200 484 Q90 520 380 484 Q670 520 960 484 Q1250 520 1540 484 Q1830 520 2120 484" fill="none" stroke="#16213f" strokeWidth={1.5} />
      </g>

      <g ref={bind("main")}>
        {/* Trottoir et route */}
        <rect x={-900} y={GROUND_Y} width={3800} height={26} fill="#1a2440" />
        <rect x={-900} y={GROUND_Y} width={3800} height={2} fill="#2c3b5e" />
        <rect x={-900} y={GROUND_Y + 26} width={3800} height={SCENE_BOTTOM - GROUND_Y - 26} fill="#111827" />
        <rect x={-900} y={GROUND_Y + 26} width={3800} height={3} fill="#0a0f1c" />
        {Array.from({ length: 30 }, (_, i) => (
          <rect key={i} x={-880 + i * 130} y={856} width={64} height={6} rx={2} fill="#c9a43a" opacity={0.5} />
        ))}

        <Building />
        <Sign bindRef={bind("signLight")} />
        {[-160, 500, 1560, 2200].map((x) => (
          <Lamppost key={x} x={x} />
        ))}
        {children}
      </g>

      <g ref={bind("fore")}>
        {[300, 1150, 2050].map((x) => (
          <g key={x}>
            <ellipse cx={x + 20} cy={898} rx={44} ry={6} fill="#000" opacity={0.35} />
            <path d={`M${x} 896 L${x + 14} 838 L${x + 26} 838 L${x + 40} 896 Z`} fill="#e8661f" />
            <rect x={x + 8} y={860} width={24} height={9} fill="#f3f1ea" opacity={0.9} />
            <rect x={x - 6} y={892} width={52} height={8} rx={2} fill="#1a1d24" />
          </g>
        ))}
        {[760, 1700].map((x) => (
          <g key={x}>
            <rect x={x} y={830} width={22} height={74} rx={6} fill="#20283b" />
            <rect x={x} y={846} width={22} height={10} fill="#f4b51f" />
          </g>
        ))}
      </g>
    </>
  );
}

/** Dégradés du décor. */
export function DecorDefs() {
  return (
    <>
      <radialGradient id="em-halo">
        <stop offset="0%" stopColor="#ffd98a" stopOpacity={0.5} />
        <stop offset="35%" stopColor="#ffc861" stopOpacity={0.14} />
        <stop offset="100%" stopColor="#ffc861" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="em-pool-warm">
        <stop offset="0%" stopColor="#ffd27a" stopOpacity={0.26} />
        <stop offset="100%" stopColor="#ffd27a" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="em-sign-glow">
        <stop offset="0%" stopColor="#f4b51f" stopOpacity={0.45} />
        <stop offset="100%" stopColor="#f4b51f" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="em-moon-glow">
        <stop offset="0%" stopColor="#e9e4d2" stopOpacity={0.25} />
        <stop offset="100%" stopColor="#e9e4d2" stopOpacity={0} />
      </radialGradient>
      <linearGradient id="em-horizon" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a2f4f" stopOpacity={0} />
        <stop offset="100%" stopColor="#3a2f4f" stopOpacity={0.55} />
      </linearGradient>
      <linearGradient id="em-bay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffcf73" />
        <stop offset="100%" stopColor="#c27a1a" />
      </linearGradient>
      <linearGradient id="em-window" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffe39b" />
        <stop offset="100%" stopColor="#e7a634" />
      </linearGradient>
      <linearGradient id="em-cone" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffe3a3" stopOpacity={0.35} />
        <stop offset="100%" stopColor="#ffe3a3" stopOpacity={0} />
      </linearGradient>
    </>
  );
}
