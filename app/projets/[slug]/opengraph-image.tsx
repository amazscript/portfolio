import { ImageResponse } from "next/og";
import { getProject } from "@/lib/projects";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Projet";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  const title = p?.title ?? "Projet";
  const tagline = p?.tagline ?? "";
  const category = p?.category ?? "Réalisation";

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
          padding: "72px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            fontSize: 26,
            fontWeight: 700,
            background: "rgba(255,255,255,0.18)",
            padding: "10px 22px",
            borderRadius: 999,
          }}
        >
          {category}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 800, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 20, opacity: 0.95, lineHeight: 1.25 }}>
            {tagline}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, opacity: 0.92 }}>
          <span>{site.name}</span>
          <span>decilapdenis.fr</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
