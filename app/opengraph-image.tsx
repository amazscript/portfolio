import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Image de partage social par défaut (LinkedIn, WhatsApp, Twitter…).
// Générée automatiquement — Next l'expose et ajoute les balises og:image / twitter:image.
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
          background: "linear-gradient(120deg, #6366f1 0%, #3b82f6 45%, #06b6d4 100%)",
          padding: "80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 32, fontWeight: 600, opacity: 0.9 }}>
          decilapdenis.fr
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 44, marginTop: 18, opacity: 0.95 }}>
            {site.role} — Freelance
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, opacity: 0.9 }}>
          Sites · Applications · E-commerce · Mobile · IA
        </div>
      </div>
    ),
    { ...size }
  );
}
