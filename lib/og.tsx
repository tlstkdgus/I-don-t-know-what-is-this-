/**
 * OG(오픈그래프) 이미지 생성 공용 헬퍼.
 * Pretendard는 npm 패키지(node_modules/pretendard)에서 정적 웨이트를 직접 읽습니다 —
 * 폰트 파일을 따로 public에 복제하지 않고, 이미 설치된 의존성만 재사용합니다.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

/** DESIGN.md의 그라디언트 스포트라이트 4색. 주제 순서대로 순환 배정합니다. */
const GRADIENTS = ["#6a4cf5", "#d44df0", "#ff7a3d", "#ff5577"] as const;

export function gradientFor(index: number) {
  return GRADIENTS[index % GRADIENTS.length];
}

export function hexToRgba(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const PRETENDARD_DIR = path.join(
  process.cwd(),
  "node_modules/pretendard/dist/public/static",
);

let fontsPromise: Promise<{ regular: Buffer; bold: Buffer }> | null = null;

export function loadOgFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      readFile(path.join(PRETENDARD_DIR, "Pretendard-Regular.otf")),
      readFile(path.join(PRETENDARD_DIR, "Pretendard-Bold.otf")),
    ]).then(([regular, bold]) => ({ regular, bold }));
  }
  return fontsPromise;
}

const svgCache = new Map<string, Promise<string>>();

/**
 * public/og의 SVG를 data URI로 읽습니다. 위키미디어 원본은 밝은 배경 기준 색이라
 * 다크 캔버스에서 보이도록 recolor로 stroke/fill을 치환할 수 있습니다.
 */
export function loadOgSvgDataUri(filename: string, recolor?: [string, string][]) {
  const key = filename + JSON.stringify(recolor ?? []);
  let cached = svgCache.get(key);
  if (!cached) {
    cached = readFile(path.join(process.cwd(), "public/og", filename), "utf-8").then(
      (src) => {
        const recolored = (recolor ?? []).reduce(
          (acc, [from, to]) => acc.split(from).join(to),
          src,
        );
        return `data:image/svg+xml;base64,${Buffer.from(recolored).toString("base64")}`;
      },
    );
    svgCache.set(key, cached);
  }
  return cached;
}
