import type { Ref } from "react";

/**
 * Chariot élévateur vu de profil, tourné vers la droite. Origine (0, 0) : le sol sous
 * l'arrière du chariot. Les groupes animés sont exposés par `bind(nom)` ; leurs
 * transformations sont posées à chaque image par ChariotMotion.
 */

export type ForkliftPart =
  | "forklift"
  | "body"
  | "driver"
  | "mast"
  | "inner"
  | "carriage"
  | "crate"
  | "wheelRear"
  | "wheelFront";

type Bind = (part: ForkliftPart) => Ref<SVGGElement>;

const YELLOW = "#f4b51f";
const YELLOW_SHADE = "#cf9312";
const YELLOW_LIGHT = "#ffd666";
const STEEL = "#2a2f3a";
const STEEL_LIGHT = "#4a5264";
const SUIT = "#2f6fd6";
const SUIT_SHADE = "#2558b0";
const SKIN = "#6b4a33";

/** Profil de la caisse jaune : contrepoids arrondi, plancher, capot avant. */
const BODY_PATH =
  "M10 -42 L8 -106 Q8 -126 28 -126 L66 -126 Q74 -126 77 -118 L84 -102 L176 -102 Q186 -102 192 -94 L204 -80 L232 -80 Q238 -80 238 -74 L238 -46 Q238 -40 232 -40 L16 -38 Q10 -38 10 -42 Z";

function Wheel({ cx, cy, r, bindRef }: { cx: number; cy: number; r: number; bindRef: Ref<SVGGElement> }) {
  const lugRadius = r * 0.36;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#14171d" />
      <circle cx={cx} cy={cy} r={r - 4} fill="none" stroke="#242831" strokeWidth={3} />
      <g ref={bindRef}>
        <circle cx={cx} cy={cy} r={r * 0.56} fill="#b9c0cc" />
        <circle cx={cx} cy={cy} r={r * 0.56} fill="none" stroke="#e3e7ee" strokeWidth={1.5} strokeDasharray={`${r * 0.9} ${r * 3}`} />
        <circle cx={cx} cy={cy} r={r * 0.22} fill="#6f7888" />
        {[0, 72, 144, 216, 288].map((angle) => (
          <circle
            key={angle}
            cx={cx + lugRadius * Math.cos((angle * Math.PI) / 180)}
            cy={cy + lugRadius * Math.sin((angle * Math.PI) / 180)}
            r={2.4}
            fill="#4d5566"
          />
        ))}
        {/* Repère jaune sur la jante : c'est lui qui rend la rotation lisible */}
        <rect x={cx - 2} y={cy - r * 0.54} width={4} height={r * 0.2} rx={1} fill={YELLOW} />
      </g>
    </g>
  );
}

export function Forklift({ bind, chainRef }: { bind: Bind; chainRef: Ref<SVGLineElement> }) {
  return (
    <g ref={bind("forklift")}>
      {/* Ombre portée douce, qui reste au sol */}
      <ellipse cx={170} cy={2} rx={190} ry={13} fill="url(#em-shadow)" />

      <g ref={bind("body")}>
        {/* Faisceau du phare sur la route */}
        <path d="M206 -116 L470 -6 Q470 2 440 2 L330 2 Z" fill="url(#em-beam)" />
        <ellipse cx={400} cy={0} rx={90} ry={9} fill="url(#em-pool-cool)" />

        {/* Mât : rails extérieurs fixes, mât intérieur et tablier mobiles */}
        <g ref={bind("mast")}>
          <rect x={236} y={-266} width={18} height={8} rx={2} fill={STEEL} />
          <rect x={238} y={-262} width={14} height={238} rx={2} fill="#363c49" />
          <rect x={240} y={-262} width={2} height={238} fill="#59627a" />
          <rect x={232} y={-150} width={6} height={126} rx={2} fill="#3f4656" />
          <g ref={bind("inner")}>
            <rect x={244} y={-258} width={10} height={236} rx={2} fill={STEEL_LIGHT} />
            <rect x={245} y={-258} width={2} height={236} fill="#727c92" />
            <rect x={242} y={-262} width={14} height={7} rx={2} fill={STEEL} />
            {/* Tige du vérin, chromée */}
            <rect x={233} y={-258} width={4} height={112} rx={2} fill="#d3d9e2" />
            <rect x={233} y={-258} width={1.4} height={112} fill="#ffffff" opacity={0.7} />
            {/* Chaîne de levée : du haut du mât intérieur jusqu'au tablier (longueur mise à jour à chaque image) */}
            <line ref={chainRef} x1={257} y1={-256} x2={257} y2={-72} stroke="#1c2029" strokeWidth={2} strokeDasharray="3 2" />
            <g ref={bind("carriage")}>
              {/* Dosseret et tablier */}
              <rect x={254} y={-122} width={6} height={56} rx={1.5} fill={STEEL} />
              {[-118, -104, -90].map((y) => (
                <rect key={y} x={254} y={y} width={22} height={3} rx={1.5} fill={STEEL} />
              ))}
              <rect x={252} y={-72} width={12} height={64} rx={2} fill={STEEL} />
              {/* Fourche */}
              <path d="M258 -70 L266 -70 L266 -16 L338 -14 Q342 -12 338 -8 L262 -8 Q258 -8 258 -12 Z" fill={STEEL} />
              <rect x={266} y={-16} width={72} height={2} fill="#5a6378" />

              <g ref={bind("crate")}>
                {/* Caisse en bois marquée DD */}
                <rect x={266} y={-80} width={70} height={64} rx={3} fill="#b7793b" />
                <rect x={266} y={-80} width={70} height={6} rx={3} fill="#d69a5a" />
                <rect x={266} y={-80} width={8} height={64} rx={2} fill="#8f5a29" />
                <rect x={328} y={-80} width={8} height={64} rx={2} fill="#8f5a29" />
                <rect x={266} y={-22} width={70} height={6} rx={2} fill="#8f5a29" />
                <line x1={274} y1={-60} x2={328} y2={-60} stroke="#9c6430" strokeWidth={1.5} />
                <line x1={274} y1={-40} x2={328} y2={-40} stroke="#9c6430" strokeWidth={1.5} />
                <text
                  x={301}
                  y={-37}
                  textAnchor="middle"
                  fontFamily="var(--font-display)"
                  fontWeight={900}
                  fontSize={26}
                  letterSpacing={1}
                  fill="#2a1a0b"
                  opacity={0.88}
                >
                  DD
                </text>
              </g>
            </g>
          </g>
        </g>

        {/* Caisse jaune et ombrages */}
        <path d={BODY_PATH} fill={YELLOW} />
        <g clipPath="url(#em-body-clip)">
          <rect x={0} y={-60} width={240} height={24} fill={YELLOW_SHADE} />
          <circle cx={62} cy={-30} r={39} fill="#0e1322" />
          <circle cx={196} cy={-34} r={43} fill="#0e1322" />
          {/* Bandes de signalisation sur le contrepoids */}
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M${8 + i * 12} -78 l10 0 l-12 14 l-10 0 Z`} fill="#1a1405" opacity={0.85} />
          ))}
        </g>
        <path d="M14 -110 Q14 -122 28 -122 L64 -122" fill="none" stroke={YELLOW_LIGHT} strokeWidth={3} strokeLinecap="round" />
        <path d="M90 -100 L174 -100" stroke={YELLOW_LIGHT} strokeWidth={2.5} strokeLinecap="round" />
        {/* Feu arrière et phare */}
        <rect x={6} y={-100} width={5} height={12} rx={2} fill="#ff4d3d" />
        <rect x={198} y={-122} width={10} height={8} rx={2.5} fill="#fff4d0" />

        {/* Siège */}
        <rect x={72} y={-128} width={42} height={26} rx={6} fill="#1f2430" />
        <rect x={64} y={-176} width={16} height={56} rx={7} fill="#262c38" />

        {/* Colonne de direction et volant */}
        <line x1={182} y1={-100} x2={152} y2={-146} stroke="#1b1f28" strokeWidth={6} strokeLinecap="round" />
        <ellipse cx={150} cy={-150} rx={4} ry={15} transform="rotate(-32 150 -150)" fill="none" stroke="#1b1f28" strokeWidth={5} />

        {/* Conducteur : tenue bleue, casque jaune */}
        <g ref={bind("driver")}>
          <line x1={92} y1={-134} x2={140} y2={-128} stroke={SUIT} strokeWidth={17} strokeLinecap="round" />
          <line x1={140} y1={-128} x2={152} y2={-106} stroke={SUIT_SHADE} strokeWidth={14} strokeLinecap="round" />
          <rect x={146} y={-108} width={20} height={9} rx={3} fill="#15181f" />
          <rect x={78} y={-190} width={30} height={62} rx={13} fill={SUIT} />
          <rect x={78} y={-190} width={9} height={62} rx={4.5} fill={SUIT_SHADE} opacity={0.6} />
          <rect x={78} y={-162} width={30} height={5} fill="#e4ebf5" opacity={0.85} />
          <polyline points="100,-180 122,-152 146,-152" fill="none" stroke={SUIT_SHADE} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={148} cy={-152} r={6} fill={SKIN} />
          <rect x={95} y={-200} width={10} height={12} rx={3} fill={SKIN} />
          <circle cx={101} cy={-210} r={14} fill={SKIN} />
          <circle cx={114} cy={-208} r={3} fill={SKIN} />
          <path d="M86 -212 Q87 -232 102 -232 Q116 -232 118 -214 L124 -212 Q124 -208 118 -208 L86 -208 Z" fill={YELLOW} />
          <path d="M92 -224 Q97 -230 104 -230" fill="none" stroke={YELLOW_LIGHT} strokeWidth={2.5} strokeLinecap="round" />
        </g>

        {/* Cadre de protection et gyrophare */}
        <line x1={68} y1={-124} x2={72} y2={-252} stroke={STEEL} strokeWidth={7} strokeLinecap="round" />
        <line x1={198} y1={-90} x2={178} y2={-252} stroke={STEEL} strokeWidth={7} strokeLinecap="round" />
        <rect x={62} y={-258} width={126} height={9} rx={3} fill={STEEL} />
        <rect x={64} y={-258} width={122} height={2} rx={1} fill="#5a6378" />
        <circle cx={126} cy={-270} r={46} fill="url(#em-beacon-glow)" className="em-beacon-glow" />
        <rect x={118} y={-264} width={16} height={6} rx={2} fill="#1b1f28" />
        <path d="M119 -264 Q119 -280 126 -280 Q133 -280 133 -264 Z" fill="#ff8a1f" className="em-beacon" />
        <path d="M122 -268 Q122 -276 126 -277" fill="none" stroke="#ffd2a1" strokeWidth={1.6} strokeLinecap="round" />
      </g>

      <Wheel cx={62} cy={-30} r={30} bindRef={bind("wheelRear")} />
      <Wheel cx={196} cy={-34} r={34} bindRef={bind("wheelFront")} />
    </g>
  );
}

/** Définitions partagées par le chariot (dégradés, découpe de la caisse). */
export function ForkliftDefs() {
  return (
    <>
      <radialGradient id="em-shadow">
        <stop offset="0%" stopColor="#000" stopOpacity={0.55} />
        <stop offset="100%" stopColor="#000" stopOpacity={0} />
      </radialGradient>
      <linearGradient id="em-beam" x1="0" y1="0" x2="1" y2="0.3">
        <stop offset="0%" stopColor="#fff1c4" stopOpacity={0.32} />
        <stop offset="100%" stopColor="#fff1c4" stopOpacity={0} />
      </linearGradient>
      <radialGradient id="em-pool-cool">
        <stop offset="0%" stopColor="#fff1c4" stopOpacity={0.22} />
        <stop offset="100%" stopColor="#fff1c4" stopOpacity={0} />
      </radialGradient>
      <radialGradient id="em-beacon-glow">
        <stop offset="0%" stopColor="#ff8a1f" stopOpacity={0.75} />
        <stop offset="45%" stopColor="#ff8a1f" stopOpacity={0.18} />
        <stop offset="100%" stopColor="#ff8a1f" stopOpacity={0} />
      </radialGradient>
      <clipPath id="em-body-clip">
        <path d={BODY_PATH} />
      </clipPath>
    </>
  );
}
