/**
 * Timeline de l'essai motion design : une fonction pure qui, pour une progression de
 * défilement p (0 à 1) et une largeur de cadre, renvoie la pose complète de la scène.
 * Tout le mouvement est décrit ici ; le composant ne fait qu'appliquer la pose.
 *
 * Découpage de la séquence :
 *   0,00 → 0,50  le chariot roule puis freine (l'avant plonge, la suspension travaille)
 *   0,50 → 0,58  arrêt : le chariot se rassoit en oscillant, le mât s'incline en arrière
 *   0,55 → 0,65  levée, premier temps : le tablier monte dans le mât intérieur
 *   0,68 → 0,79  levée, second temps : le mât intérieur se déploie
 *   0,79 → 0,88  la caisse, emportée par son élan, rebondit deux fois en haut
 *   0,85 → 0,97  la fiche « À propos » apparaît, ses blocs en cascade
 */

/** Hauteur du cadre de la scène, en unités SVG (la largeur s'adapte à l'écran). */
export const SCENE_HEIGHT = 900;
/** Sol de la route, là où les roues touchent. */
export const ROAD_Y = 800;
/** Position finale de l'arrière du chariot, devant le quai du bâtiment. */
export const STOP_X = 720;
/** Distance parcourue pendant la séquence. */
const TRAVEL = 1100;
const START_X = STOP_X - TRAVEL;

export const DRIVE_END = 0.5;
const REAR_WHEEL_RADIUS = 30;
const FRONT_WHEEL_RADIUS = 34;

/** Cadre étroit (téléphone) : on recadre la caméra pour garder chariot et bâtiment. */
export function isNarrowFrame(viewWidth: number): boolean {
  return viewWidth < 1000;
}

export type Pose = {
  /** Décalage de caméra par couche de parallaxe (en unités SVG). */
  layers: { stars: number; far: number; mid: number; main: number; fore: number };
  forkliftX: number;
  wheelRear: number;
  wheelFront: number;
  /** Tangage de la caisse du chariot, en degrés (positif : l'avant plonge). */
  pitch: number;
  /** Débattement vertical de la suspension. */
  bounce: number;
  /** Inclinaison du mât vers l'arrière, en degrés. */
  mastTilt: number;
  /** Levée du tablier dans le mât intérieur (premier temps). */
  carriageLift: number;
  /** Déploiement du mât intérieur (second temps). */
  innerLift: number;
  /** Rebond de la caisse au sommet. */
  crateHop: number;
  crateTilt: number;
  /** Le conducteur suit l'inertie, avec un léger retard sur la caisse. */
  driverLean: number;
  signLight: number;
  intro: number;
  card: number;
  cardItems: number[];
  counter: number;
  /** Remontée de la scène sur téléphone quand la fiche arrive (en px). */
  sceneShift: number;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
/** Progression locale d'un segment [start, end] de la timeline. */
const segment = (p: number, start: number, end: number) => clamp01((p - start) / (end - start));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Courbe de Bézier cubique façon CSS (x1, y1, x2, y2), résolue par Newton puis dichotomie.
 * Sert à la conduite : démarrage doux, longue décélération.
 */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const a = (p1: number, p2: number) => 1 - 3 * p2 + 3 * p1;
  const b = (p1: number, p2: number) => 3 * p2 - 6 * p1;
  const c = (p1: number) => 3 * p1;
  const curve = (t: number, p1: number, p2: number) => ((a(p1, p2) * t + b(p1, p2)) * t + c(p1)) * t;
  const slope = (t: number, p1: number, p2: number) => 3 * a(p1, p2) * t * t + 2 * b(p1, p2) * t + c(p1);

  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i++) {
      const s = slope(t, x1, x2);
      if (Math.abs(s) < 1e-6) break;
      t -= (curve(t, x1, x2) - x) / s;
    }
    if (t < 0 || t > 1 || Math.abs(curve(t, x1, x2) - x) > 1e-4) {
      let low = 0;
      let high = 1;
      t = x;
      for (let i = 0; i < 30; i++) {
        const value = curve(t, x1, x2);
        if (Math.abs(value - x) < 1e-6) break;
        if (value < x) low = t;
        else high = t;
        t = (low + high) / 2;
      }
    }
    return curve(t, y1, y2);
  };
}

const driveEase = cubicBezier(0.42, 0, 0.18, 1);
/** Avancement de la conduite (0 à 1) pour une progression globale p. */
const drive = (p: number) => driveEase(segment(p, 0, DRIVE_END));

/** Accélération de la conduite (dérivée seconde), normalisée entre -1 et 1. */
const STEP = 0.002;
const rawAcceleration = (p: number) => (drive(p + STEP) - 2 * drive(p) + drive(p - STEP)) / (STEP * STEP);
const rawSpeed = (p: number) => (drive(p + STEP) - drive(p - STEP)) / (2 * STEP);
const { maxAcceleration, maxSpeed } = (() => {
  let acceleration = 0;
  let speed = 0;
  for (let p = STEP; p < DRIVE_END - STEP; p += STEP) {
    acceleration = Math.max(acceleration, Math.abs(rawAcceleration(p)));
    speed = Math.max(speed, rawSpeed(p));
  }
  return { maxAcceleration: acceleration, maxSpeed: speed };
})();

const MAX_PITCH = 3.4;

/** Tangage pendant la conduite : l'avant se cabre à l'accélération et plonge au freinage. */
function drivingPitch(p: number): number {
  if (p <= STEP || p >= DRIVE_END - STEP) return drivingPitch(Math.min(Math.max(p, 2 * STEP), DRIVE_END - 2 * STEP));
  return (-rawAcceleration(p) / maxAcceleration) * MAX_PITCH;
}

/** Oscillation amortie : part de 1, s'éteint vers 0 (u de 0 à 1). */
const dampedCosine = (u: number, cycles: number, damping: number) =>
  Math.exp(-damping * u) * Math.cos(2 * Math.PI * cycles * u);

export function poseAt(p: number, viewWidth: number): Pose {
  const narrow = isNarrowFrame(viewWidth);
  const progress = clamp01(p);
  const driveProgress = drive(progress);

  // Caméra : le chariot glisse dans le cadre pendant que le décor défile, puis la caméra
  // se pose de façon à laisser la place à la fiche (à droite sur grand écran).
  const startScreenX = narrow ? -120 : 80;
  const endScreenX = narrow ? 40 : 250;
  const forkliftX = lerp(START_X, STOP_X, driveProgress);
  const camera = forkliftX - lerp(startScreenX, endScreenX, driveProgress);

  const distance = forkliftX - START_X;
  const speed = progress < DRIVE_END ? clamp01(rawSpeed(progress) / maxSpeed) : 0;

  // Tangage et suspension
  let pitch: number;
  let bounce: number;
  if (progress < DRIVE_END) {
    pitch = drivingPitch(progress);
    // Petites irrégularités de la route, proportionnelles à la vitesse
    bounce = (Math.sin(distance * 0.085) * 0.9 + Math.sin(distance * 0.031 + 1.3) * 0.7) * speed;
  } else {
    const settle = segment(progress, DRIVE_END, DRIVE_END + 0.09);
    // À l'arrêt, le chariot se rassoit : l'avant remonte, dépasse, puis se stabilise
    pitch = drivingPitch(DRIVE_END) * dampedCosine(settle, 1.6, 4.2);
    bounce = -2.2 * Math.exp(-4 * settle) * Math.sin(2 * Math.PI * 1.6 * settle);
  }

  // Mât : inclinaison arrière, puis levée en deux temps avec une pause entre les deux
  const mastTilt = 2.4 * easeInOutCubic(segment(progress, 0.52, 0.57));
  const carriageLift = 130 * easeInOutCubic(segment(progress, 0.55, 0.65));
  const innerLift = 150 * easeInOutCubic(segment(progress, 0.68, 0.79));

  // Rebond de la caisse quand le mât s'arrête net : deux petits sauts qui s'amortissent
  const hop = segment(progress, 0.79, 0.88);
  const crateHop = hop > 0 && hop < 1 ? 11 * Math.exp(-3.2 * hop) * Math.abs(Math.sin(2 * Math.PI * hop)) : 0;
  const crateTilt = -crateHop * 0.35;

  // Le conducteur penche avec un peu plus d'amplitude que la caisse (il n'est pas rigide)
  const driverLean = pitch * 1.8;

  // L'enseigne s'allume en grésillant à l'approche du chariot
  const flicker = segment(progress, 0.4, 0.5);
  const flickerSteps = [0.25, 0.9, 0.3, 1, 0.55, 1];
  const signLight = flicker >= 1 ? 1 : flicker <= 0 ? 0.22 : flickerSteps[Math.floor(flicker * flickerSteps.length)];

  const intro = 1 - easeOutCubic(segment(progress, 0.03, 0.13));
  const card = easeOutCubic(segment(progress, 0.85, 0.93));
  const cardItems = [0, 1, 2, 3, 4].map((index) =>
    easeOutCubic(segment(progress, 0.87 + index * 0.016, 0.93 + index * 0.016)),
  );
  const counter = easeOutCubic(segment(progress, 0.89, 0.97));

  return {
    layers: {
      stars: -camera * 0.03,
      far: -camera * 0.2,
      mid: -camera * 0.5,
      main: -camera,
      fore: -camera * 1.35,
    },
    forkliftX,
    wheelRear: (distance / REAR_WHEEL_RADIUS) * (180 / Math.PI),
    wheelFront: (distance / FRONT_WHEEL_RADIUS) * (180 / Math.PI),
    pitch,
    bounce,
    mastTilt,
    carriageLift,
    innerLift,
    crateHop,
    crateTilt,
    driverLean,
    signLight,
    intro,
    card,
    cardItems,
    counter,
    sceneShift: narrow ? -96 * card : 0,
  };
}
