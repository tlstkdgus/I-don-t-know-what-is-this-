import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";
import { OG_CONTENT_TYPE, OG_SIZE, gradientFor, hexToRgba, loadOgFonts } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const fonts = await loadOgFonts();
  const accent = gradientFor(0);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#090909",
          padding: 80,
          fontFamily: "Pretendard",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: OG_SIZE.width,
            height: OG_SIZE.height,
            display: "flex",
            backgroundImage: `radial-gradient(circle at 80% 15%, ${hexToRgba(accent, 0.45)} 0%, rgba(9,9,9,0) 55%)`,
          }}
        />
        <div style={{ display: "flex", fontSize: 28, color: "#999999", letterSpacing: -0.5 }}>
          {SITE.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -3,
              lineHeight: 1.15,
            }}
          >
            {SITE.tagline}
          </div>
          <div style={{ display: "flex", fontSize: 27, color: "#999999", maxWidth: 840 }}>
            {SITE.description}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Pretendard", data: fonts.regular, weight: 400, style: "normal" },
        { name: "Pretendard", data: fonts.bold, weight: 700, style: "normal" },
      ],
    },
  );
}
