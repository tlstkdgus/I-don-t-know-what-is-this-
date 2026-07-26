import { ImageResponse } from "next/og";

import { docs, findDoc, topicBySlug, topics } from "@/lib/content";
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
  return docs.map((d) => ({ topic: d.topic, slug: d.slug }));
}

/** 주제 OG와 같은 다이어그램을 더 옅게 재사용합니다. 출처는 README.md 참고자료 절. */
const DIAGRAMS: Record<string, { file: string; recolor?: [string, string][]; width: number }> = {
  web3: { file: "blockchain.svg", recolor: [['stroke="#000"', 'stroke="#ffffff"']], width: 300 },
  data: { file: "graph-database.svg", width: 460 },
};

export default async function Image({
  params,
}: {
  params: Promise<{ topic: string; slug: string }>;
}) {
  const { topic: topicSlug, slug } = await params;
  const doc = findDoc(topicSlug, slug);
  const topic = topicBySlug(topicSlug);
  if (!doc || !topic) return new ImageResponse(<div />, OG_SIZE);

  const index = topics.findIndex((t) => t.slug === topic.slug);
  const accent = gradientFor(index);
  const fonts = await loadOgFonts();
  const diagram = DIAGRAMS[topic.slug];
  const diagramSrc = diagram ? await loadOgSvgDataUri(diagram.file, diagram.recolor) : null;

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
            backgroundImage: `radial-gradient(circle at 88% 20%, ${hexToRgba(accent, 0.3)} 0%, rgba(9,9,9,0) 50%)`,
          }}
        />
        {diagramSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={diagramSrc}
            width={diagram!.width}
            style={{
              position: "absolute",
              right: 40,
              top: "50%",
              transform: "translateY(-50%)",
              opacity: 0.25,
            }}
          />
        )}
        <div style={{ display: "flex", fontSize: 26, color: "#999999", letterSpacing: -0.5 }}>
          {SITE.name} · {topic.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 760 }}>
          <div style={{ display: "flex", fontSize: 24, color: hexToRgba(accent, 1), fontWeight: 700 }}>
            {String(doc.num).padStart(2, "0")}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 54,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -3,
              lineHeight: 1.2,
            }}
          >
            {doc.title}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#999999" }}>{doc.desc}</div>
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
