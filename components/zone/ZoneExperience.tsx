"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ZoneBuilding, ZoneCard, ZoneLink } from "@/lib/zone";
import type { ZoneScene } from "@/components/zone/scene";
import { openConsent } from "@/lib/consent";
import { track } from "@/lib/analytics";
import styles from "./zone.module.css";

/**
 * Accueil « zone industrielle » : le défilement fait rouler le chariot d'un bâtiment à
 * l'autre, une fiche s'ouvre à chaque arrêt. Toutes les fiches sont dans le HTML serveur
 * (référencement, lecteurs d'écran) ; la scène 3D est chargée ensuite, à la demande.
 * Vue classique : fiches empilées sans 3D, au choix ou automatiquement sans WebGL.
 */

const VH_PER_BUILDING = 150;

/** Progression 0 → 1 convertie en position sur la route, avec un temps d'arrêt devant chaque bâtiment. */
function routeU(p: number, n: number) {
  const u = p * (n - 1);
  const i = Math.min(n - 2, Math.floor(u));
  const f = u - i;
  // Arrêt sur les 12 % de part et d'autre de chaque bâtiment, trajet en cosinus entre les deux :
  // pic de vitesse ~2,1× la moyenne (contre ~2,7× avant), sans à-coup.
  const k = Math.min(1, Math.max(0, (f - 0.12) / 0.76));
  return i + (1 - Math.cos(Math.PI * k)) / 2;
}

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function ZoneExperience({ buildings }: { buildings: ZoneBuilding[] }) {
  const N = buildings.length;
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<ZoneScene | null>(null);
  const [classic, setClassic] = useState(false);
  const [active, setActive] = useState(0);
  const [heading, setHeading] = useState<number | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Préférences et capacités du navigateur
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (!hasWebGL()) setClassic(true);
  }, []);

  // Scène 3D : chargée seulement hors vue classique, détruite en y revenant
  useEffect(() => {
    if (classic || !canvasRef.current) return;
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const signFont =
      getComputedStyle(document.documentElement).getPropertyValue("--font-big-shoulders").trim() || "sans-serif";

    // La scène est montée quand le navigateur est libre : la page et sa première fiche
    // s'affichent et répondent d'abord, la construction 3D (lourde) vient juste après.
    const whenIdle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(cb, { timeout: 1500 });
      else setTimeout(cb, 300); // Safari : pas de requestIdleCallback
    };
    const loadScene = () => import("@/components/zone/scene");

    new Promise<Awaited<ReturnType<typeof loadScene>>>((resolve, reject) =>
      whenIdle(() => loadScene().then(resolve, reject))
    )
      .then(({ createZoneScene }) => {
        if (cancelled || !canvasRef.current) return;
        sceneRef.current = createZoneScene({
          canvas: canvasRef.current,
          buildings,
          reduceMotion: reduce,
          signFont,
          start: routeU(scrollProgress(), N),
          debug: new URLSearchParams(window.location.search).get("debug") === "zone",
          onStop: (index, next) => {
            if (index >= 0) {
              setActive(index);
              setHeading(null);
            } else {
              setActive(-1);
              setHeading(next);
            }
          },
          onExit: () => {
            // Page remise sur l'arrêt précédent : au retour arrière, on ne repart pas aussitôt
            const max = document.documentElement.scrollHeight - window.innerHeight;
            window.scrollTo({ top: (max * (N - 2)) / (N - 1), behavior: "instant" });
            router.push("/projets");
          },
        });
        sceneRef.current.setTarget(routeU(scrollProgress(), N));
        setSceneReady(true);
      })
      .catch(() => setClassic(true)); // WebGL refusé au dernier moment : on se replie sur la vue classique

    // Un défilement sans geste de l'utilisateur juste avant vient du navigateur, qui restaure la
    // position au retour arrière (en douceur, sur une seconde) : le chariot y est posé directement.
    // Limité aux premières secondes : ensuite, l'inertie d'un geste tactile ne doit pas téléporter.
    const mountedAt = performance.now();
    let lastInput = -Infinity;
    const onInput = () => (lastInput = performance.now());
    const inputEvents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    inputEvents.forEach((e) => window.addEventListener(e, onInput, { passive: true }));
    const onScroll = () => {
      const now = performance.now();
      const fromBrowser = now - mountedAt < 3000 && now - lastInput > 1500;
      sceneRef.current?.setTarget(routeU(scrollProgress(), N), fromBrowser);
    };
    const onVisibility = () => sceneRef.current?.setPaused(document.hidden);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      inputEvents.forEach((e) => window.removeEventListener(e, onInput));
      document.removeEventListener("visibilitychange", onVisibility);
      sceneRef.current?.dispose();
      sceneRef.current = null;
      setSceneReady(false);
    };
  }, [classic, buildings, N, router]);

  const toggleClassic = () => {
    setClassic((c) => !c);
    setActive(0);
    window.scrollTo(0, 0);
  };

  const exiting = active >= 0 && buildings[active]?.shape.exit === true;
  const statusText = exiting
    ? "Entrée sur le site…"
    : heading === null
      ? "Faites défiler pour conduire"
      : `En route vers : ${buildings[heading].name}`;
  const showStatus = !classic && (active === 0 || heading !== null || exiting);

  return (
    <div className={`${styles.root} ${classic ? styles.classic : ""}`}>
      <canvas ref={canvasRef} className={styles.scene} aria-hidden="true" />
      {!classic && !sceneReady && <div className={styles.loading}>Mise en route de la zone…</div>}

      <header className={styles.topbar}>
        <span className={styles.brand}>
          Zone <span>Decilap</span>
        </span>
        <button type="button" className={styles.mode} aria-pressed={classic} onClick={toggleClassic}>
          {classic ? "Visite 3D" : "Vue classique"}
        </button>
      </header>

      {!classic && <div className={styles.spacer} style={{ height: `${N * VH_PER_BUILDING}vh` }} />}

      {showStatus && (
        <div className={styles.status} aria-live="polite">
          <i aria-hidden="true" />
          <span>{statusText}</span>
        </div>
      )}

      <main id="main" className={styles.panels}>
        {buildings.map((b, i) => (
          <section
            key={b.id}
            id={b.id}
            className={styles.card}
            aria-label={b.name}
            hidden={!classic && (active !== i || b.shape.exit === true)}
          >
            <div className={styles.sign}>{b.sign}</div>
            <Title building={b} level={i === 0 ? 1 : 2} />
            <CardBody card={b.card} countUp={!classic && !reduceMotion && active === i} />
          </section>
        ))}
      </main>
    </div>
  );
}

function Title({ building, level }: { building: ZoneBuilding; level: 1 | 2 }) {
  const { title, highlight } = building;
  const Tag = level === 1 ? "h1" : "h2";
  if (!highlight || !title.includes(highlight)) return <Tag className={styles.title}>{title}</Tag>;
  const [before, after] = title.split(highlight);
  return (
    <Tag className={styles.title}>
      {before}
      <em>{highlight}</em>
      {after}
    </Tag>
  );
}

function ZLink({ link }: { link: ZoneLink }) {
  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer">
      {link.label}
    </a>
  ) : (
    <Link href={link.href} data-track={link.href === "/contact" ? "contact_cta_click" : undefined}>
      {link.label}
    </Link>
  );
}

function CardBody({ card, countUp }: { card: ZoneCard; countUp: boolean }) {
  switch (card.kind) {
    case "about":
      return (
        <>
          <p>{card.text}</p>
          <div className={styles.counts}>
            {card.chiffres.map((c) => (
              <div key={c.label}>
                <Counter to={c.value} suffix={c.suffix} animate={countUp} />
                <div className={styles.ticker}>{c.label}</div>
              </div>
            ))}
          </div>
          <span className={styles.badge}>{card.availability}</span>
          <div className={styles.links}>
            <ZLink link={card.link} />
          </div>
        </>
      );
    case "etapes":
      return (
        <div className={styles.items}>
          {card.items.map((e) => (
            <div key={e.title} className={styles.item}>
              <span className={styles.tag}>{e.tag}</span>
              <h3>{e.title}</h3>
              <p>{e.text}</p>
            </div>
          ))}
        </div>
      );
    case "project":
      return (
        <>
          <p>{card.text}</p>
          <div className={styles.stack}>
            {card.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <div className={styles.links}>
            {card.links.map((l) => (
              <ZLink key={l.href} link={l} />
            ))}
          </div>
        </>
      );
    case "skills":
      return (
        <div className={styles.items}>
          {card.groups.map((g) => (
            <div key={g.group} className={styles.item}>
              <span className={styles.tag}>{g.group}</span>
              <ul className={styles.tools}>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "services":
    case "blog":
      return (
        <>
          <div className={styles.items}>
            {card.items.map((it) => (
              <div key={it.href} className={styles.item}>
                {"date" in it && <span className={styles.tag}>{it.date}</span>}
                <h3>
                  <Link href={it.href}>{it.title}</Link>
                </h3>
                {"text" in it && <p>{it.text}</p>}
              </div>
            ))}
          </div>
          <div className={styles.links}>
            <ZLink link={card.link} />
          </div>
        </>
      );
    case "site":
      return (
        <>
          <p>{card.text}</p>
          <div className={styles.items}>
            {card.items.map((it) => (
              <div key={it.href} className={styles.item}>
                <h3>
                  <Link href={it.href}>{it.title}</Link>
                </h3>
                <p>{it.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.links}>
            <ZLink link={card.link} />
          </div>
        </>
      );
    case "contact":
      return (
        <>
          <p>{card.text}</p>
          <div className={styles.contact}>
            <CopyLine value={card.email} href={`mailto:${card.email}`} />
            <CopyLine value={card.phone} href={`tel:${card.phone.replace(/\s/g, "")}`} trackEvent="phone_click" />
          </div>
          <div className={styles.links}>
            {card.links.map((l) => (
              <ZLink key={l.href} link={l} />
            ))}
          </div>
          <p className={styles.legal}>
            <Link href="/mentions-legales">Mentions légales</Link> ·{" "}
            <button type="button" onClick={openConsent} className={styles.legalButton}>
              Gérer les cookies
            </button>
          </p>
        </>
      );
  }
}

/** Compteur qui monte de 0 à sa valeur à la première arrivée devant le bâtiment. */
function Counter({ to, suffix = "", animate }: { to: number; suffix?: string; animate: boolean }) {
  const [value, setValue] = useState(to);
  const done = useRef(false);
  useEffect(() => {
    if (!animate || done.current || to === 0) return;
    done.current = true;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / 1100);
      setValue(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    setValue(0);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [animate, to]);
  return (
    <div className={styles.count}>
      {value}
      {suffix}
    </div>
  );
}

/** Coordonnée sélectionnable + bouton Copier (repli : sélection du texte si le presse-papier est refusé). */
function CopyLine({ value, href, trackEvent }: { value: string; href: string; trackEvent?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [label, setLabel] = useState("Copier");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setLabel("Copié");
    } catch {
      if (ref.current) {
        const range = document.createRange();
        range.selectNodeContents(ref.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setLabel("Sélectionné");
    }
    window.setTimeout(() => setLabel("Copier"), 1600);
  };
  return (
    <div>
      <a href={href} onClick={() => trackEvent && track(trackEvent)}>
        <code ref={ref}>{value}</code>
      </a>
      <button type="button" className={styles.copy} onClick={copy}>
        {label}
      </button>
    </div>
  );
}
