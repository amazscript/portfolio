import { ImageResponse } from "next/og";
import { getPost } from "@/lib/blog";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Article du blog";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  const title = p?.title ?? "Blog";
  const category = p?.category ?? "Blog";

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
          padding: "72px",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            fontSize: 26,
            fontWeight: 700,
            color: "#adc6ff",
            border: "2px solid rgba(255, 255, 255, 0.18)",
            padding: "10px 22px",
          }}
        >
          {category}
        </div>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 800, lineHeight: 1.1 }}>
          {title}
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
