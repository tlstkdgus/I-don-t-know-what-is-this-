import { ImageResponse } from "next/og";

import { docsOf, minutesOf, topicBySlug, topics } from "@/lib/content";
import { SITE } from "@/lib/site";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  gradientFor,
  hexToRgba,
  loadOgFonts,
  loadOgSvgDataUri,
} from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.slug }));
}

/**
 * 활성 주제 중 위키미디어 커먼즈에서 가져온 다이어그램이 있는 것만 배경 장식으로 씁니다.
 * 원본은 밝은 배경 기준 색이라 다크 캔버스에서 보이도록 recolor로 치환합니다.
 * 출처는 README.md 참고자료 절에 기록했습니다.
 */
const DIAGRAMS: Record<string, { file: string; recolor?: [string, string][]; width: number }> = {
  web3: { file: "blockchain.svg", recolor: [['stroke="#000"', 'stroke="#ffffff"']], width: 340 },
  data: { file: "graph-database.svg", width: 520 },
};

export default async function Image({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params;
  const topic = topicBySlug(slug);
  if (!topic) return new ImageResponse(<div />, OG_SIZE);

  const index = topics.findIndex((t) => t.slug === topic.slug);
  const accent = gradientFor(index);
  const fonts = await loadOgFonts();
  const diagram = DIAGRAMS[topic.slug];
  const diagramSrc = diagram ? await loadOgSvgDataUri(diagram.file, diagram.recolor) : null;
  const count = docsOf(topic.slug).length;

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
          overflow: "hidden",
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
            backgroundImage: `radial-gradient(circle at 85% 30%, ${hexToRgba(accent, 0.4)} 0%, rgba(9,9,9,0) 55%)`,
          }}
        />
        {diagramSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={diagramSrc}
            width={diagram!.width}
            style={{
              position: "absolute",
              right: 60,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.5,
            }}
          />
        )}
        <div style={{ display: "flex", fontSize: 26, color: "#999999", letterSpacing: -0.5 }}>
          {SITE.name} · 주제
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 720 }}>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -3,
              lineHeight: 1.15,
            }}
          >
            {topic.name}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#999999" }}>{topic.tagline}</div>
          {topic.status === "active" && (
            <div style={{ display: "flex", fontSize: 22, color: "#666666", marginTop: 8 }}>
              {count}장 · 약 {minutesOf(topic.slug)}분
            </div>
          )}
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
