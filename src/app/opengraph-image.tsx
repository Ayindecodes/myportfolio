import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, site } from "@/content/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Synchronous reads keep this route prerendered at build time under Cache Components.
const fontDir = join(process.cwd(), "src/assets/fonts");

export default function OpengraphImage() {
  const semiBold = readFileSync(join(fontDir, "Geist-SemiBold.ttf"));
  const bold = readFileSync(join(fontDir, "Geist-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101014",
          color: "#f5f5f7",
          fontFamily: "Geist",
          padding: "64px 72px 0",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, fontWeight: 600, color: "#a1a1aa", letterSpacing: 3 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#8055f5" }} />
          {`${site.role.toUpperCase()} · ${site.locationShort.toUpperCase()}`}
        </div>
        <div style={{ display: "flex", fontSize: 66, fontWeight: 600, lineHeight: 1, letterSpacing: -3.4, maxWidth: 1000 }}>
          {hero.statement}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 178,
            fontWeight: 700,
            letterSpacing: -10,
            lineHeight: 1,
            marginLeft: -6,
            marginBottom: -22,
            whiteSpace: "nowrap",
          }}
        >
          {site.wordmark}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semiBold, weight: 600, style: "normal" },
        { name: "Geist", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
