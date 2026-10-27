import * as THREE from "three";
import type { BuildingShape } from "@/lib/zone";

/**
 * Scène 3D de la zone industrielle (port du prototype docs « prototype-usine-3d.html »).
 * Module impératif, sans React : chargé à la demande par ZoneExperience, il ne pèse
 * que sur l'accueil. Le composant lui transmet la progression ; la scène lui signale
 * l'arrêt devant un bâtiment ou le départ vers le suivant.
 */

export type ZoneSceneOptions = {
  canvas: HTMLCanvasElement;
  buildings: { name: string; shape: BuildingShape }[];
  reduceMotion: boolean;
  /** Famille CSS de la police d'enseigne (police chargée par next/font). */
  signFont: string;
  /** Arrêt devant le bâtiment `index`, ou départ (`index` = -1) vers `next`. */
  onStop: (index: number, next: number) => void;
  /** Le chariot est entré dans le bâtiment de sortie (dernier bâtiment, `shape.exit`). */
  onExit?: () => void;
  /** Position de départ sur la route (page rechargée ou retour arrière en milieu de visite). */
  start?: number;
  /** Mode diagnostic (?debug=zone) : expose la vitesse du chariot sur le canvas. */
  debug?: boolean;
};

export type ZoneScene = {
  /** `snap` : saut sans trajet (position restaurée par le navigateur, ancre). */
  setTarget: (u: number, snap?: boolean) => void;
  setPaused: (paused: boolean) => void;
  dispose: () => void;
};

const SPACING = 28;
/** Vitesse maximale du chariot, en bâtiments par seconde. */
const MAX_SPEED = 0.8;

/** Amortisseur critique avec vitesse plafonnée (même principe que SmoothDamp d'Unity). */
function smoothDamp(current: number, target: number, velocity: number, smoothTime: number, maxSpeed: number, dt: number): [number, number] {
  const omega = 2 / smoothTime;
  const x = omega * dt;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const maxChange = maxSpeed * smoothTime;
  const change = Math.max(-maxChange, Math.min(maxChange, current - target));
  const clampedTarget = current - change;
  const temp = (velocity + omega * change) * dt;
  let nextVelocity = (velocity - omega * temp) * exp;
  let next = clampedTarget + (change + temp) * exp;
  // Pas de dépassement de la cible
  if (target - current > 0 === next > target) {
    next = target;
    nextVelocity = (next - target) / dt;
  }
  return [next, nextVelocity];
}

export function createZoneScene(opts: ZoneSceneOptions): ZoneScene {
  const { canvas, buildings: specs, reduceMotion, signFont, onStop, onExit, start = 0, debug = false } = opts;
  const N = specs.length;

  // Rendu identique au prototype (Three r128) : couleurs hex prises telles quelles, sans
  // la conversion sRGB → linéaire apparue en r152, qui assombrit toute la scène.
  THREE.ColorManagement.enabled = false;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  const mobile = window.matchMedia("(max-width: 760px)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1326);
  scene.fog = new THREE.Fog(0x0b1326, 38, 115);
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 300);

  // Depuis r155, les lumières sont en unités physiques : intensités du prototype (r128) × π.
  scene.add(new THREE.HemisphereLight(0x3a4f88, 0x0b1326, 0.75 * Math.PI));
  const moon = new THREE.DirectionalLight(0xa9bbff, 0.55 * Math.PI);
  moon.position.set(-30, 50, 20);
  scene.add(moon);

  // Matériaux et géométries partagés : créés une fois, réutilisés partout
  const materials = new Map<string, THREE.Material>();
  const M = (color: number, o: THREE.MeshStandardMaterialParameters = {}) => {
    const key = color + JSON.stringify(o);
    let m = materials.get(key);
    if (!m) {
      m = new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.1, flatShading: true, ...o });
      materials.set(key, m);
    }
    return m;
  };
  const basic = (color: number) => {
    const key = "basic" + color;
    let m = materials.get(key);
    if (!m) {
      m = new THREE.MeshBasicMaterial({ color });
      materials.set(key, m);
    }
    return m;
  };
  const glow = (color: number) => {
    const key = "glow" + color;
    let m = materials.get(key);
    if (!m) {
      m = new THREE.MeshBasicMaterial({ color, toneMapped: false });
      materials.set(key, m);
    }
    return m;
  };
  const box = (w: number, h: number, d: number, mat: THREE.Material) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);

  // ---------- sol ----------
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(800, 800), M(0x101a30, { roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
  const grid = new THREE.GridHelper(800, 160, 0x1a2644, 0x152038);
  grid.position.y = 0.01;
  scene.add(grid);

  // ---------- route : un arrêt tous les 28 m, décalage latéral alterné ----------
  const stops = specs.map((_, i) => {
    const z = i === 0 ? 0 : (i % 2 ? -1 : 1) * (5 + ((i * 37) % 6));
    return new THREE.Vector3(i * SPACING, 0, z);
  });
  // Avec un bâtiment de sortie, la route s'arrête juste après le dernier arrêt, devant sa porte
  const exitIndex = specs[N - 1]?.shape.exit ? N - 1 : -1;
  const roadEnd =
    exitIndex >= 0
      ? new THREE.Vector3((N - 1) * SPACING + 7, 0, stops[N - 1].z)
      : new THREE.Vector3((N - 1) * SPACING + 28, 0, 6);
  const pts = [new THREE.Vector3(-26, 0, 8), ...stops, roadEnd];
  const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
  const uToT = (u: number) => (u + 1) / (pts.length - 1);
  // Abscisse curviligne (0 → 1) de chaque arrêt : le chariot avance en mètres réels.
  // Le paramètre natif de la courbe, lui, va plus vite dans les longs tronçons et les virages.
  const ARC_DIVISIONS = 200 * pts.length;
  const lengths = curve.getLengths(ARC_DIVISIONS);
  const total = lengths[lengths.length - 1];
  const stopArc = specs.map((_, i) => lengths[Math.round(uToT(i) * ARC_DIVISIONS)] / total);
  const uToArc = (u: number) => {
    const i = Math.max(0, Math.min(N - 2, Math.floor(u)));
    const f = Math.max(0, Math.min(1, u - i));
    return stopArc[i] + (stopArc[i + 1] - stopArc[i]) * f;
  };
  const sideOf = (t: number) => {
    const tg = curve.getTangent(t);
    return new THREE.Vector3(-tg.z, 0, tg.x).normalize();
  };
  const dummy = new THREE.Object3D();

  const ROAD_HALF_WIDTH = 3.4;
  /** Emprise au sol d'un bâtiment, avec ce qui est posé devant sa façade. */
  type Footprint = { pos: THREE.Vector3; dir: THREE.Vector3; halfW: number; back: number; front: number };
  const footprints: Footprint[] = [];
  const distanceToFootprint = (q: THREE.Vector3, f: Footprint) => {
    const vx = q.x - f.pos.x;
    const vz = q.z - f.pos.z;
    const along = Math.abs(vx * -f.dir.z + vz * f.dir.x); // axe de la façade
    const across = -(vx * f.dir.x + vz * f.dir.z); // vers la route
    const dx = Math.max(along - f.halfW, 0);
    const dz = Math.max(-f.back - across, across - f.front, 0);
    return Math.hypot(dx, dz);
  };
  const roadSamples = Array.from({ length: 40 * N + 1 }, (_, i) => curve.getPoint(i / (40 * N)));

  (function road() {
    const S = 60 * N;
    const pos: number[] = [];
    const idx: number[] = [];
    for (let i = 0; i <= S; i++) {
      const t = i / S;
      const p = curve.getPoint(t);
      const n = sideOf(t);
      const a = p.clone().addScaledVector(n, ROAD_HALF_WIDTH);
      const b = p.clone().addScaledVector(n, -ROAD_HALF_WIDTH);
      pos.push(a.x, 0.02, a.z, b.x, 0.02, b.z);
      if (i < S) {
        const k = i * 2;
        idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    scene.add(new THREE.Mesh(g, M(0x1a2236, { roughness: 0.95, side: THREE.DoubleSide })));

    // Tirets jaunes : une seule géométrie instanciée
    const dashCount = 24 * N;
    const dashes = new THREE.InstancedMesh(new THREE.BoxGeometry(1.4, 0.04, 0.18), basic(0xf4b51f), dashCount);
    for (let i = 0; i < dashCount; i++) {
      const t = i / dashCount;
      const p = curve.getPoint(t);
      const tg = curve.getTangent(t);
      dummy.position.set(p.x, 0.05, p.z);
      dummy.rotation.set(0, Math.atan2(-tg.z, tg.x), 0);
      dummy.updateMatrix();
      dashes.setMatrixAt(i, dummy.matrix);
    }
    scene.add(dashes);

  })();

  // ---------- texte peint sur canvas (enseignes, caisse « DD ») ----------
  const textures: THREE.Texture[] = [];
  function labelTexture(text: string, w = 512, h = 128, bg = "#f4b51f", fg = "#1a1405", size = 78) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    const draw = () => {
      const g = c.getContext("2d");
      if (!g) return;
      g.fillStyle = bg;
      g.fillRect(0, 0, w, h);
      g.fillStyle = fg;
      let fs = size;
      do {
        g.font = `900 ${fs}px ${signFont}, Impact, sans-serif`;
        fs -= 4;
      } while (g.measureText(text).width > w * 0.9 && fs > 20);
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(text, w / 2, h / 2 + 4);
      tex.needsUpdate = true;
    };
    draw();
    document.fonts?.ready.then(draw);
    textures.push(tex);
    return tex;
  }

  // ---------- bâtiments ----------
  const palette = [0x2a3a62, 0x334670, 0x2b3e5e, 0x3a3f5c, 0x24395c, 0x30405f, 0x283a60, 0x353f5e, 0x2c3d63];
  const winM = glow(0xc98a2e);
  const coolWinM = glow(0x3f6fb8);
  const smoke: THREE.Mesh[] = [];
  const blinkers: THREE.Object3D[] = [];
  const screens: THREE.MeshBasicMaterial[] = [];
  const placed: { pos: THREE.Vector3; dir: THREE.Vector3; h: number; exit: boolean }[] = [];
  let exitDoor: THREE.Group | null = null;
  let exitDoorHeight = 0;

  stops.forEach((p, i) => {
    const s = specs[i].shape;
    const t = uToT(i);
    const side = i % 2 ? 1 : -1;
    // Bâtiment de sortie : en travers du bout de la route, façade face au chariot
    const dir = s.exit ? curve.getTangent(1) : sideOf(t).multiplyScalar(side);
    const pos = s.exit ? curve.getPoint(1).addScaledVector(dir, s.d / 2 + 0.3) : p.clone().addScaledVector(dir, 8 + s.d / 2);
    // Recul jusqu'à ce que l'emprise (camion compris) dégage la route sur tout son tracé :
    // dans un virage, les coins d'un bâtiment large mordraient sinon sur la chaussée.
    // Devant la façade : caisses (jusqu'à 1,9) ou camion (4,7)
    const footprint: Footprint = { pos, dir, halfW: s.w / 2, back: s.d / 2, front: s.d / 2 + (s.truck ? 4.7 : 1.9) };
    const footprintToRoad = () => Math.min(...roadSamples.map((q) => distanceToFootprint(q, footprint)));
    for (let guard = 0; !s.exit && guard < 40 && footprintToRoad() < ROAD_HALF_WIDTH + 1.5; guard++) {
      pos.addScaledVector(dir, 0.5);
    }
    footprints.push(footprint);
    const g = new THREE.Group();
    g.position.copy(pos);
    g.rotation.y = Math.atan2(-dir.x, -dir.z); // la façade (+z local) regarde la route
    const body = box(s.w, s.h, s.d, M(palette[i % palette.length]));
    body.position.y = s.h / 2;
    g.add(body);
    const band = box(s.w + 0.05, 0.5, s.d + 0.05, M(0x1b2540));
    band.position.y = 0.25;
    g.add(band);
    const fz = s.d / 2 + 0.02;

    if (s.roof !== "tower") {
      // Porte sectionnelle à lames, lampe chaude au-dessus, hublots éclairés
      // Sortie : grande porte centrée, dans l'axe de la route, qui se lève à l'arrivée du chariot
      const dw = s.exit ? 7 : Math.min(6, s.w * 0.4);
      const dh = Math.min(4.6, s.h * 0.5);
      const doorX = s.exit ? 0 : -s.w * 0.18;
      const doorGroup = new THREE.Group();
      doorGroup.position.set(doorX, 0, fz);
      const door = box(dw, dh, 0.1, M(0x8b96ad, { metalness: 0.4 }));
      door.position.y = dh / 2;
      doorGroup.add(door);
      for (let k = 1; k < 7; k++) {
        const r = box(dw, 0.05, 0.12, M(0x5e6884));
        r.position.set(0, (dh * k) / 7, 0.02);
        doorGroup.add(r);
      }
      g.add(doorGroup);
      if (s.exit) {
        // Intérieur sombre derrière la porte, visible quand elle se lève
        const inside = box(dw, dh, 0.04, basic(0x05080f));
        inside.position.set(0, dh / 2, fz + 0.01);
        g.add(inside);
        exitDoor = doorGroup;
        exitDoorHeight = dh;
      }
      const lamp = new THREE.PointLight(0xffb347, 1.6 * Math.PI, 18, 2);
      lamp.position.set(-s.w * 0.18, dh + 1, fz + 2);
      g.add(lamp);
      const lb = box(0.8, 0.2, 0.4, winM);
      lb.position.set(-s.w * 0.18, dh + 0.6, fz + 0.2);
      g.add(lb);
      if (s.screen) {
        // Panneau lumineux du blog : écran froid qui « défile » doucement
        const mat = new THREE.MeshBasicMaterial({ color: 0x2f5fa8, toneMapped: false });
        screens.push(mat);
        const screen = box(s.w * 0.36, s.h * 0.34, 0.1, mat);
        screen.position.set(s.w * 0.2, s.h * 0.32, fz);
        g.add(screen);
      } else if (!s.exit) {
        for (let k = 0; k < 3; k++) {
          const w = box(1.4, 0.8, 0.1, winM);
          w.position.set(s.w * 0.12 + k * 2, s.h * 0.55, fz);
          g.add(w);
        }
      }
    } else {
      // Tour de contrôle : cabine vitrée, antenne et balise rouge
      for (let y = 3.6; y < s.h - 2; y += 2.4) {
        const w = box(s.w - 1.6, 1, 0.1, coolWinM);
        w.position.set(0, y, fz);
        g.add(w);
      }
      const cab = box(
        s.w + 2,
        2.4,
        s.d + 2,
        new THREE.MeshStandardMaterial({ color: 0x7fb4ff, emissive: 0x2d5fb0, emissiveIntensity: 0.6, roughness: 0.2 })
      );
      cab.position.y = s.h + 1.2;
      g.add(cab);
      const roof = box(s.w + 2.6, 0.4, s.d + 2.6, M(0x1b2540));
      roof.position.y = s.h + 2.6;
      g.add(roof);
      const ant = box(0.12, 4, 0.12, M(0x9aa6bf));
      ant.position.y = s.h + 4.8;
      g.add(ant);
      const red = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), basic(0xff3b3b));
      red.position.y = s.h + 6.9;
      blinkers.push(red);
      g.add(red);
      const lamp = new THREE.PointLight(0x7fb4ff, 1.4 * Math.PI, 20, 2);
      lamp.position.set(0, 3, fz + 3);
      g.add(lamp);
    }

    if (s.roof === "flat") {
      const r = box(s.w + 0.6, 0.5, s.d + 0.6, M(0x1b2540));
      r.position.y = s.h + 0.25;
      g.add(r);
    }
    if (s.roof === "saw") {
      const tooth = 4;
      const count = Math.floor(s.w / tooth);
      const sh = new THREE.Shape();
      sh.moveTo(0, 0);
      sh.lineTo(tooth, 0);
      sh.lineTo(tooth, 2.6);
      sh.lineTo(0, 0);
      const geo = new THREE.ExtrudeGeometry(sh, { depth: s.d, bevelEnabled: false });
      for (let k = 0; k < count; k++) {
        const m = new THREE.Mesh(geo, M(0x1f2b48));
        m.position.set(-s.w / 2 + k * tooth, s.h, -s.d / 2);
        g.add(m);
        const glass = box(0.08, 2.4, s.d - 0.4, coolWinM);
        glass.position.set(-s.w / 2 + (k + 1) * tooth - 0.05, s.h + 1.25, 0);
        g.add(glass);
      }
    }
    if (s.roof === "gable") {
      const sh = new THREE.Shape();
      sh.moveTo(-s.d / 2 - 0.3, 0);
      sh.lineTo(s.d / 2 + 0.3, 0);
      sh.lineTo(0, 3);
      sh.lineTo(-s.d / 2 - 0.3, 0);
      const m = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: s.w + 0.6, bevelEnabled: false }), M(0x7a3b2e));
      m.rotation.y = Math.PI / 2;
      m.position.set(-s.w / 2 - 0.3, s.h, 0);
      g.add(m);
    }
    if (s.chimneys) {
      const puffGeo = new THREE.SphereGeometry(1, 8, 6);
      (
        [
          [s.w * 0.3, 6],
          [s.w * 0.42, 8],
        ] as const
      ).forEach(([x, hh], k) => {
        const c = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, hh, 12), M(0x5a4a44));
        c.position.set(x, s.h + hh / 2, -s.d * 0.2);
        g.add(c);
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.4, 12), M(0xf4b51f));
        ring.position.set(x, s.h + hh - 1, -s.d * 0.2);
        g.add(ring);
        if (reduceMotion) return; // pas de fumée animée quand l'utilisateur réduit les animations
        for (let j = 0; j < 7; j++) {
          const puff = new THREE.Mesh(
            puffGeo,
            new THREE.MeshStandardMaterial({ color: 0x8e99b3, transparent: true, opacity: 0.5, roughness: 1 })
          );
          puff.userData = { base: new THREE.Vector3(x, s.h + hh, -s.d * 0.2), phase: j / 7 + k * 0.5 };
          g.add(puff);
          smoke.push(puff);
        }
      });
    }
    if (s.truck) {
      const tr = new THREE.Group();
      const trailer = box(9, 3.4, 2.6, M(0xd9dee8));
      trailer.position.set(0, 2.3, 0);
      const stripe = box(9.02, 0.4, 2.62, M(0xf4b51f));
      stripe.position.set(0, 1.2, 0);
      const cabT = box(2.6, 2.8, 2.5, M(0x2f6fd6));
      cabT.position.set(5.9, 1.9, 0);
      const ws = box(0.05, 1.1, 2.1, coolWinM);
      ws.position.set(7.21, 2.5, 0);
      tr.add(trailer, stripe, cabT, ws);
      const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.4, 14);
      [-3, -1.8, 5.6].forEach((x) =>
        [-1.2, 1.2].forEach((z) => {
          const wh = new THREE.Mesh(wheelGeo, M(0x111522));
          wh.rotation.x = Math.PI / 2;
          wh.position.set(x, 0.55, z);
          tr.add(wh);
        })
      );
      // Centré sur la façade (remorque + cabine = 11,7 de long) : la cabine ne dépasse pas
      // le coin du bâtiment, là où la route tourne
      tr.position.set(-1.35, 0, fz + 3.4);
      g.add(tr);
    }

    // Enseigne jaune : « 01 · À PROPOS ». Placée entre la lampe de porte et le toit, et
    // légèrement en avant de la façade : sans chevauchement ni scintillement (z-fighting).
    let signW = Math.min(s.w - 1, 11);
    let signY = s.h - 1.1;
    if (s.roof !== "tower") {
      const bottom = Math.min(4.6, s.h * 0.5) + 0.95; // haut de la lampe de porte + marge
      const top = s.h - 0.15;
      const signH = Math.min(signW / 4, top - bottom);
      signW = signH * 4;
      signY = top - signH / 2;
    }
    const label = specs[i].name.toUpperCase();
    const sign = new THREE.Mesh(
      new THREE.PlaneGeometry(signW, signW / 4),
      new THREE.MeshBasicMaterial({ map: labelTexture(label) })
    );
    sign.position.set(0, s.roof === "tower" ? 1.6 : signY, fz + 0.12);
    if (s.roof === "tower") sign.scale.set(0.9, 0.9, 1);
    g.add(sign);

    // Palettes et caisses devant la façade (pas devant la sortie : le chariot y entre)
    for (let k = 0; k < (s.exit ? 0 : 3); k++) {
      const pal = box(1.3, 0.25, 1.1, M(0x8a6a3e));
      pal.position.set(s.w / 2 - 1 - k * 1.6, 0.13, fz + 1.4);
      g.add(pal);
      if (k !== 1) {
        const cr = box(1.1, 0.9, 0.95, M(0xb08850));
        cr.position.set(s.w / 2 - 1 - k * 1.6, 0.7, fz + 1.4);
        g.add(cr);
      }
    }
    scene.add(g);
    placed.push({ pos, dir, h: s.roof === "tower" ? s.h + 3 : s.h, exit: !!s.exit });
  });

  // ---------- lampadaires, posés après les bâtiments pour les éviter ----------
  // Lampadaires alternés : mâts et ampoules instanciés
  const lampCount = 4 * N + 4;
  const poles = new THREE.InstancedMesh(new THREE.BoxGeometry(0.15, 5, 0.15), M(0x2a3656), lampCount);
  const heads = new THREE.InstancedMesh(new THREE.BoxGeometry(0.7, 0.16, 0.36), M(0x1f2a46), lampCount);
  const diffuserGeo = new THREE.PlaneGeometry(0.56, 0.26);
  diffuserGeo.rotateX(Math.PI / 2); // face vers le bas
  const bulbs = new THREE.InstancedMesh(diffuserGeo, glow(0xd99a3e), lampCount);
  for (let i = 0; i < lampCount; i++) {
    // Pas de lampadaire devant un bâtiment : il masquerait ses caisses, sa porte éclaire déjà
    const offset = i % 2 ? 4.6 : -4.6;
    const t = (i + 0.5) / lampCount;
    const base = curve.getPoint(t).addScaledVector(sideOf(t), offset);
    const clear = footprints.every((f) => distanceToFootprint(base, f) > 9);
    const p = curve.getPoint(t);
    const n = sideOf(t).multiplyScalar(offset);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(clear ? 1 : 0);
    dummy.position.set(p.x + n.x, 2.5, p.z + n.z);
    dummy.updateMatrix();
    poles.setMatrixAt(i, dummy.matrix);
    dummy.position.set(p.x + n.x * 0.8, 5, p.z + n.z * 0.8);
    dummy.updateMatrix();
    heads.setMatrixAt(i, dummy.matrix);
    dummy.position.y = 4.91;
    dummy.updateMatrix();
    bulbs.setMatrixAt(i, dummy.matrix);
  }
  dummy.scale.setScalar(1);
  scene.add(poles, heads, bulbs);

  // ---------- chariot élévateur (le cariste, c'est Denis) ----------
  const fork = new THREE.Group();
  // Châssis suspendu : tout sauf les roues et l'ombre, pour le tangage et les vibrations
  const chassis = new THREE.Group();
  fork.add(chassis);
  const yel = M(0xf4b51f, { roughness: 0.5 });
  const dark = M(0x1d2640);
  const grey = M(0x9aa6bf, { metalness: 0.6, roughness: 0.4 });
  const add = <T extends THREE.Object3D>(m: T, x: number, y: number, z: number) => {
    m.position.set(x, y, z);
    chassis.add(m);
    return m;
  };
  add(box(2.6, 0.95, 1.5, yel), 0, 0.78, 0);
  add(box(0.7, 1.1, 1.52, M(0xd99a12)), -1.35, 0.9, 0);
  add(box(1.2, 0.2, 1.1, dark), -0.3, 1.35, 0);
  (
    [
      [-0.75, 0.65],
      [-0.75, -0.65],
      [0.65, 0.65],
      [0.65, -0.65],
    ] as const
  ).forEach(([x, z]) => add(box(0.08, 1.5, 0.08, dark), x, 2, z));
  add(box(1.6, 0.08, 1.5, dark), -0.05, 2.78, 0);
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff8a1f });
  add(new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.18, 10), beaconMat), -0.1, 2.91, 0);
  add(box(0.42, 0.58, 0.5, M(0x2f6fd6)), -0.25, 1.72, 0);
  add(box(0.44, 0.1, 0.52, yel), -0.25, 1.76, 0);
  add(new THREE.Mesh(new THREE.SphereGeometry(0.21, 14, 12), M(0x6b4a33)), -0.22, 2.2, 0);
  add(new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), yel), -0.22, 2.24, 0);
  add(box(0.1, 2.7, 0.1, grey), 1.38, 1.5, 0.42);
  add(box(0.1, 2.7, 0.1, grey), 1.38, 1.5, -0.42);
  // Mât télescopique : le montant intérieur sort quand la caisse monte
  const innerMast = new THREE.Group();
  innerMast.add(box(0.07, 2.3, 0.07, grey).translateZ(0.3), box(0.07, 2.3, 0.07, grey).translateZ(-0.3));
  innerMast.position.set(1.43, 1.35, 0);
  chassis.add(innerMast);
  // Feux stop : s'allument au freinage
  const brakeMat = new THREE.MeshBasicMaterial({ color: 0x4a0d0d, toneMapped: false });
  add(box(0.06, 0.16, 0.24, brakeMat), -1.71, 0.95, 0.5);
  add(box(0.06, 0.16, 0.24, brakeMat), -1.71, 0.95, -0.5);
  const carriage = new THREE.Group();
  carriage.position.set(1.48, 0.2, 0);
  chassis.add(carriage);
  const cm = (m: THREE.Object3D, x: number, y: number, z: number) => {
    m.position.set(x, y, z);
    carriage.add(m);
  };
  cm(box(0.08, 0.7, 1.05, grey), 0, 0.35, 0);
  cm(box(1.25, 0.06, 0.16, grey), 0.62, 0.03, 0.3);
  cm(box(1.25, 0.06, 0.16, grey), 0.62, 0.03, -0.3);
  const crateFace = new THREE.MeshStandardMaterial({ map: labelTexture("DD", 256, 256, "#b08850", "#1a1405", 140), roughness: 0.9 });
  const crateM = M(0xb08850);
  cm(new THREE.Mesh(new THREE.BoxGeometry(1, 0.85, 0.95), [crateM, crateM, crateM, crateM, crateFace, crateFace]), 0.68, 0.5, 0);
  const wheels: THREE.Group[] = [];
  const steerers: THREE.Group[] = [];
  const tyreGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 16);
  const hubGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.34, 8);
  (
    [
      [-0.85, 0.78],
      [-0.85, -0.78],
      [0.85, 0.78],
      [0.85, -0.78],
    ] as const
  ).forEach(([x, z]) => {
    const w = new THREE.Mesh(tyreGeo, M(0x111522));
    w.rotation.x = Math.PI / 2;
    const hub = new THREE.Mesh(hubGeo, grey);
    hub.rotation.x = Math.PI / 2;
    // Roulement (rotation z) dans un pivot de direction (rotation y) : les roues arrière
    // braquent, comme sur un vrai chariot élévateur
    const roll = new THREE.Group();
    roll.add(w, hub);
    const pivot = new THREE.Group();
    pivot.add(roll);
    pivot.position.set(x, 0.42, z);
    fork.add(pivot);
    wheels.push(roll);
    if (x < 0) steerers.push(pivot);
  });
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(2, 24),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.03;
  fork.add(shadow);
  const head = new THREE.SpotLight(0xfff1c8, 2.2 * Math.PI, 22, 0.5, 0.6, 1.5);
  head.position.set(1.4, 1.6, 0);
  chassis.add(head);
  const headTarget = new THREE.Object3D();
  headTarget.position.set(8, 0, 0);
  fork.add(headTarget);
  head.target = headTarget;
  scene.add(fork);

  // ---------- boucle de rendu ----------
  let u = Math.max(0, Math.min(N - 1, start));
  let uTarget = u;
  let lastShown = -2;
  let uVel = 0;
  let liftY = 0.2;
  let liftV = 0;
  let pitch = 0;
  let pitchV = 0;
  let steer = 0;
  let speed = 0;
  let accel = 0;
  let prevYaw = 0;
  /** Ressort amorti (sous-amorti = petit rebond) : renvoie [position, vitesse]. */
  const spring = (x: number, v: number, target: number, k: number, c: number, dt: number): [number, number] => {
    const nv = v + ((target - x) * k - v * c) * dt;
    return [x + nv * dt, nv];
  };
  let paused = false;
  let first = true;
  // Entrée dans le bâtiment de sortie : armée seulement si l'on n'est pas déjà au bout de la route au
  // chargement (retour arrière depuis /projets), sinon on y serait renvoyé aussitôt
  let exitArmed = false;
  let entering = -1; // secondes écoulées depuis le début de l'entrée, -1 hors entrée
  let exited = false;
  let frameId = 0;
  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const look = new THREE.Vector3();
  const timer = new THREE.Clock();

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Écran en portrait : champ de vision élargi pour garder le bâtiment et le chariot dans le cadre
    camera.fov = camera.aspect < 1 ? 64 : 45;
    // Décale le cadrage pour laisser la place à la fiche : à droite sur desktop, en bas sur mobile
    if (w > 760) camera.setViewOffset(w, h, 200, 0, w, h);
    else camera.setViewOffset(w, h, 0, h * 0.2, w, h);
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  // Trajet d'entrée : fin de la route, puis tout droit jusqu'au fond de la sortie
  const ENTRY_DOOR = 0.6; // la porte se lève avant que le chariot ne reparte
  const ENTRY_DRIVE = 2;
  const exitArcStart = exitIndex >= 0 ? stopArc[exitIndex] : 1;
  const roadLeft = (1 - exitArcStart) * total;
  const entryLength = roadLeft + 0.3 + (exitIndex >= 0 ? specs[exitIndex].shape.d : 0) * 0.6;
  function entryDistance(elapsed: number) {
    const k = Math.max(0, Math.min(1, (elapsed - ENTRY_DOOR) / ENTRY_DRIVE));
    return entryLength * k * k * (3 - 2 * k); // démarrage et arrivée en douceur
  }
  function entryPoint(travelled: number, outP: THREE.Vector3, outTg: THREE.Vector3) {
    if (travelled <= roadLeft) {
      const a = exitArcStart + travelled / total;
      outP.copy(curve.getPointAt(a));
      outTg.copy(curve.getTangentAt(a));
      return;
    }
    outTg.copy(curve.getTangentAt(1));
    outP.copy(curve.getPointAt(1)).addScaledVector(outTg, travelled - roadLeft);
  }

  function frame() {
    frameId = requestAnimationFrame(frame);
    if (paused) return;
    const dt = Math.min(0.05, timer.getDelta());
    const time = timer.elapsedTime;
    const prev = u;
    if (reduceMotion) u = uTarget;
    else [u, uVel] = smoothDamp(u, uTarget, uVel, 0.6, MAX_SPEED, dt);
    if (Math.abs(uTarget - u) < 1e-4 && Math.abs(uVel) < 1e-3) {
      u = uTarget;
      uVel = 0;
    }
    const arc = uToArc(u);
    const t = curve.getUtoTmapping(arc, 0); // paramètre natif correspondant, pour sideOf()
    const p = curve.getPointAt(arc);
    const tg = curve.getTangentAt(arc);
    let dist = (uToArc(u) - uToArc(prev)) * total; // en mètres réels

    // Bout de la route : la porte se lève, le chariot entre, puis on rejoint le site
    if (exitIndex >= 0) {
      if (uTarget < exitIndex - 0.5) exitArmed = true;
      if (exitArmed && entering < 0 && uTarget >= exitIndex && exitIndex - u < 0.02) entering = 0;
    }
    const forkP = p.clone();
    const forkTg = tg.clone();
    if (entering >= 0) {
      const before = entryDistance(entering);
      entering += dt;
      const travelled = entryDistance(entering);
      dist = travelled - before;
      entryPoint(travelled, forkP, forkTg);
      if (exitDoor) exitDoor.position.y = exitDoorHeight * Math.min(1, entering / 0.7);
      if (!exited && (reduceMotion || entering > ENTRY_DOOR + ENTRY_DRIVE + 0.25)) {
        exited = true;
        onExit?.();
      }
    }
    fork.position.set(forkP.x, 0, forkP.z);
    const yaw = Math.atan2(-forkTg.z, forkTg.x);
    fork.rotation.y = yaw;
    wheels.forEach((w) => (w.rotation.z -= dist / 0.42));

    // Vitesse et accélération lissées (unités par seconde)
    const newSpeed = dt > 0 ? dist / dt : 0;
    accel += ((dt > 0 ? (newSpeed - speed) / dt : 0) - accel) * Math.min(1, dt * 8);
    speed = newSpeed;
    const moving = Math.abs(speed) > 0.08;

    if (reduceMotion) {
      liftY = moving ? 0.2 : 1.05;
      pitch = 0;
      steer = 0;
    } else {
      // Caisse : levée à l'arrêt, avec un léger rebond en haut
      [liftY, liftV] = spring(liftY, liftV, moving ? 0.2 : 1.05, 38, 7, dt);
      // Tangage : le nez plonge au freinage, se lève à l'accélération
      const pitchTarget = Math.max(-0.07, Math.min(0.07, accel * 0.006));
      [pitch, pitchV] = spring(pitch, pitchV, pitchTarget, 70, 9, dt);
      // Direction : les roues arrière braquent dans les virages
      let dYaw = yaw - prevYaw;
      if (dYaw > Math.PI) dYaw -= 2 * Math.PI;
      if (dYaw < -Math.PI) dYaw += 2 * Math.PI;
      const steerTarget = dt > 0 ? Math.max(-0.5, Math.min(0.5, (-dYaw / dt) * 0.45)) : 0;
      steer += (steerTarget - steer) * Math.min(1, dt * 6);
    }
    prevYaw = yaw;
    if (debug) canvas.dataset.speed = speed.toFixed(2);
    carriage.position.y = liftY;
    innerMast.position.y = 1.35 + (liftY - 0.2) * 0.55; // le mât sort en deux temps
    chassis.rotation.z = pitch;
    // Vibration du moteur en roulant
    chassis.position.y = reduceMotion ? 0 : 0.012 * Math.sin(time * 34) * Math.min(1, Math.abs(speed) / 4);
    steerers.forEach((s) => (s.rotation.y = steer));
    brakeMat.color.setHex(!reduceMotion && accel < -3 && moving ? 0xff2a2a : 0x4a0d0d);
    beaconMat.color.setHex(Math.floor(time * 2.4) % 2 ? 0xff8a1f : 0x5a2a05);

    // Fiche active : arrêt si le chariot est assez près d'un bâtiment
    const near = Math.round(u);
    const gap = Math.abs(u - near);
    const shown = lastShown === near ? (gap < 0.16 ? near : -1) : gap < 0.1 ? near : -1;
    if (shown !== lastShown) {
      lastShown = shown;
      onStop(shown, Math.min(N - 1, uTarget > u ? Math.ceil(u) : Math.floor(u)));
    }

    // Caméra : du côté opposé au bâtiment à l'arrêt, en poursuite pendant le trajet
    const i0 = Math.max(0, Math.min(N - 2, Math.floor(u)));
    const f = u - i0;
    const bA = placed[i0];
    const bB = placed[Math.min(N - 1, i0 + 1)];
    const w0 = Math.max(0, 1 - f * 3);
    const w1 = Math.max(0, (f - 2 / 3) * 3);
    const n = sideOf(t);
    // Bâtiment de sortie dans l'axe de la route : caméra derrière le chariot, pas sur le côté
    const sideA = bA.exit ? 0 : bA.dir.dot(n) > 0 ? 1 : -1;
    const sideB = bB.exit ? 0 : bB.dir.dot(n) > 0 ? 1 : -1;
    const sideMix = -(sideA * w0 + sideB * w1);
    // Devant la sortie, recul supplémentaire pour cadrer toute la façade et son enseigne
    const exitPull = (bA.exit ? w0 : 0) + (bB.exit ? w1 : 0);
    const behind = 6 + 9 * (1 - (w0 + w1)) + 9 * exitPull;
    camPos.copy(p).addScaledVector(n, sideMix * 15).addScaledVector(tg, -behind);
    camPos.y = 7.5 + 2.5 * (1 - (w0 + w1)) + 1.5 * exitPull;
    // À l'arrêt, la caméra « respire » : lente dérive latérale, comme tenue à l'épaule
    if (!reduceMotion) {
      const still = Math.max(w0, w1);
      camPos.addScaledVector(tg, Math.sin(time * 0.3) * 0.9 * still);
      camPos.y += Math.sin(time * 0.23) * 0.25 * still;
    }
    look.copy(p).addScaledVector(tg, 4);
    look.y = 1.5;
    if (w0 > 0) {
      tmp.copy(bA.pos);
      tmp.y = bA.h * 0.45;
      look.lerp(tmp, 0.5 * w0);
    }
    if (w1 > 0) {
      tmp.copy(bB.pos);
      tmp.y = bB.h * 0.45;
      look.lerp(tmp, 0.5 * w1);
    }
    const k = first || reduceMotion ? 1 : 1 - Math.pow(0.05, dt);
    camera.position.lerp(camPos, k);
    camLook.lerp(look, k);
    first = false;
    camera.lookAt(camLook);

    smoke.forEach((s) => {
      const ph = (time * 0.18 + s.userData.phase) % 1;
      s.position.copy(s.userData.base);
      s.position.y += ph * 9;
      s.position.x += ph * 3;
      s.scale.setScalar(0.6 + ph * 2.2);
      (s.material as THREE.MeshStandardMaterial).opacity = 0.45 * (1 - ph);
    });
    const blinkOn = Math.floor(time * 1.5) % 2 === 0;
    blinkers.forEach((o) => (o.visible = blinkOn));
    screens.forEach((m) => m.color.setHSL(0.6, 0.75, 0.16 + 0.03 * Math.sin(time * 2)));
    renderer.render(scene, camera);
  }
  frame();

  return {
    setTarget(next, snap = false) {
      if (entering >= 0) return; // l'entrée dans la sortie va jusqu'au bout
      uTarget = Math.max(0, Math.min(N - 1, next));
      if (snap) {
        u = uTarget;
        uVel = 0;
        first = true; // caméra placée directement, sans travelling
        exitArmed = uTarget < exitIndex - 0.5;
      }
    },
    setPaused(next) {
      paused = next;
      if (!next) timer.getDelta(); // évite un saut après une pause
    },
    dispose() {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.InstancedMesh) o.geometry.dispose();
      });
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
    },
  };
}
