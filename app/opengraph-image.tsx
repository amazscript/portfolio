import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Image de partage social par défaut (LinkedIn, WhatsApp, Twitter…).
 * Générée automatiquement — Next l'expose et ajoute les balises og:image / twitter:image.
 */
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1326",
          padding: "80px",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 600, letterSpacing: "0.08em" }}>
            decilapdenis.fr
          </div>
          <div style={{ display: "flex", width: 120, height: 8, background: "#adc6ff" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 44, marginTop: 18, color: "#adc6ff" }}>
            {site.role} — Freelance
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#94a3b8",
            borderTop: "2px solid rgba(255, 255, 255, 0.18)",
            paddingTop: 24,
          }}
        >
          Sites · Applications · E-commerce · Mobile · IA
        </div>
      </div>
    ),
    { ...size }
  );
}
