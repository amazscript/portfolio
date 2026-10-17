"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Decor, DecorDefs, type DecorPart } from "./Decor";
import { Forklift, ForkliftDefs, type ForkliftPart } from "./Forklift";
import { ROAD_Y, SCENE_HEIGHT, isNarrowFrame, poseAt, type Pose } from "./timeline";
import type { Chiffre } from "@/lib/profil";
import styles from "./essai.module.css";

type Part = DecorPart | ForkliftPart;

export type AboutContent = {
  sign: string;
  title: string;
  highlight?: string;
  text: string;
  chiffres: Chiffre[];
  availability: string;
};

/** useLayoutEffect côté client seulement (évite l'avertissement au rendu serveur). */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Largeur du cadre SVG (hauteur fixe de 900) selon la taille de l'écran. */
function frameWidth(width: number, height: number): number {
  // Téléphone : la scène occupe une bande en haut, au format 840 × 900
  if (width < 720) return 840;
  return Math.max(1000, Math.round((SCENE_HEIGHT * width) / height));
}

function TitleWithHighlight({ title, highlight }: { title: string; highlight?: string }) {
  if (!highlight || !title.includes(highlight)) return <>{title}</>;
  const [before, after] = title.split(highlight);
  return (
    <>
      {before}
      <em>{highlight}</em>
      {after}
    </>
  );
}

export function ChariotMotion({ about }: { about: AboutContent }) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const parts = useRef<Partial<Record<Part, SVGGElement | null>>>({});
  const chainRef = useRef<SVGLineElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [viewWidth, setViewWidth] = useState(1600);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  // Le ressort donne de l'inertie : la scène rattrape le défilement au lieu de le suivre au pixel
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.6, restDelta: 0.0002 });

  const bind = useCallback(
    (part: Part) => (element: SVGGElement | null) => {
      parts.current[part] = element;
    },
    [],
  );

  const apply = useCallback(
    (p: number) => {
      const pose: Pose = poseAt(reduceMotion ? 1 : p, viewWidth);
      const g = parts.current;
      const set = (part: Part, transform: string) => g[part]?.setAttribute("transform", transform);

      set("stars", `translate(${pose.layers.stars} 0)`);
      set("far", `translate(${pose.layers.far} 0)`);
      set("mid", `translate(${pose.layers.mid} 0)`);
      set("main", `translate(${pose.layers.main} 0)`);
      set("fore", `translate(${pose.layers.fore} 0)`);
      set("forklift", `translate(${pose.forkliftX} ${ROAD_Y})`);
      set("body", `translate(0 ${pose.bounce}) rotate(${pose.pitch} 130 -32)`);
      set("driver", `rotate(${pose.driverLean - pose.pitch} 92 -134)`);
      set("mast", `rotate(${-pose.mastTilt} 246 -24)`);
      set("inner", `translate(0 ${-pose.innerLift})`);
      set("carriage", `translate(0 ${-pose.carriageLift})`);
      set("crate", `translate(0 ${-pose.crateHop}) rotate(${pose.crateTilt} 301 -16)`);
      set("wheelRear", `rotate(${pose.wheelRear} 62 -30)`);
      set("wheelFront", `rotate(${pose.wheelFront} 196 -34)`);
      chainRef.current?.setAttribute("y2", String(-72 - pose.carriageLift));
      g.signLight?.setAttribute("opacity", String(pose.signLight));

      if (introRef.current) {
        introRef.current.style.opacity = String(pose.intro);
        introRef.current.style.transform = `translateY(${(1 - pose.intro) * -12}px)`;
      }
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${reduceMotion ? 1 : p})`;
      if (sceneRef.current) sceneRef.current.style.transform = `translateY(${pose.sceneShift}px)`;

      const card = cardRef.current;
      if (card) {
        card.style.opacity = String(pose.card);
        card.style.transform = `translateY(${(1 - pose.card) * 28}px) scale(${0.97 + pose.card * 0.03})`;
        card.style.pointerEvents = pose.card > 0.6 ? "auto" : "none";
        card.inert = pose.card < 0.6;
      }
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const value = pose.cardItems[index] ?? 1;
        item.style.opacity = String(value);
        item.style.transform = `translateY(${(1 - value) * 14}px)`;
      });
      counterRefs.current.forEach((counter, index) => {
        const chiffre = about.chiffres[index];
        if (counter && chiffre) counter.textContent = String(Math.round(chiffre.value * pose.counter));
      });
    },
    [about.chiffres, reduceMotion, viewWidth],
  );

  useMotionValueEvent(progress, "change", apply);

  // Pose initiale et recadrage au redimensionnement
  useIsomorphicLayoutEffect(() => {
    const update = () => setViewWidth(frameWidth(window.innerWidth, window.innerHeight));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  useIsomorphicLayoutEffect(() => {
    apply(progress.get());
    // La scène reste masquée tant que la première pose n'est pas appliquée
    stageRef.current?.setAttribute("data-ready", "");
  }, [apply, progress]);

  const narrow = isNarrowFrame(viewWidth);
  const itemRef = (index: number) => (element: HTMLElement | null) => {
    itemRefs.current[index] = element;
  };

  return (
    <div ref={trackRef} className={reduceMotion ? styles.trackStill : styles.track}>
      <div ref={stageRef} className={styles.stage}>
        <div ref={sceneRef} className={styles.scene}>
          <svg
            className={styles.svg}
            viewBox={`0 0 ${viewWidth} ${SCENE_HEIGHT}`}
            preserveAspectRatio={narrow ? "xMidYMid meet" : "xMidYMax slice"}
            role="img"
            aria-label="Illustration : de nuit, un chariot élévateur jaune conduit par Denis s'arrête devant le bâtiment « À propos » et lève une caisse marquée DD."
          >
            <defs>
              <DecorDefs />
              <ForkliftDefs />
            </defs>
            <Decor bind={bind}>
              <Forklift bind={bind} chainRef={chainRef} />
            </Decor>
          </svg>
        </div>

        <div ref={introRef} className={styles.intro}>
          <p className={styles.eyebrow}>Essai motion design · 2D</p>
          <h1 className={styles.introTitle}>
            Quatorze ans <em>au volant</em>, puis le code.
          </h1>
          <p className={styles.hint}>Faites défiler pour avancer</p>
        </div>

        <div className={styles.cardSlot}>
        <section ref={cardRef} className={styles.card} aria-label="À propos">
          <p ref={itemRef(0)} className={styles.cardEyebrow}>
            01 · {about.sign}
          </p>
          <h2 ref={itemRef(1)} className={styles.cardTitle}>
            <TitleWithHighlight title={about.title} highlight={about.highlight} />
          </h2>
          <p ref={itemRef(2)} className={styles.cardText}>
            {about.text}
          </p>
          <div ref={itemRef(3)} className={styles.counts}>
            {about.chiffres.map((chiffre, index) => (
              <div key={chiffre.label}>
                <div className={styles.count}>
                  <span
                    ref={(element) => {
                      counterRefs.current[index] = element;
                    }}
                  >
                    {chiffre.value}
                  </span>
                  {chiffre.suffix}
                </div>
                <div className={styles.ticker}>{chiffre.label}</div>
              </div>
            ))}
          </div>
          <div ref={itemRef(4)} className={styles.cardFooter}>
            <span className={styles.badge}>{about.availability}</span>
            <Link href="/a-propos" className={styles.cardLink}>
              Lire la suite
            </Link>
          </div>
        </section>
        </div>

        <Link href="/" className={styles.back}>
          Retour à l&apos;accueil
        </Link>
        <div className={styles.progressTrack} aria-hidden="true">
          <div ref={progressRef} className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
}
