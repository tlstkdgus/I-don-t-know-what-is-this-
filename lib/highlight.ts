import { createHighlighter, type Highlighter } from "shiki";

/**
 * 코드 하이라이팅. 페이지가 전부 SSG라서 이 작업은 빌드 타임에만 돕니다.
 * (런타임 하이라이팅 JS는 클라이언트로 나가지 않습니다.)
 *
 * 하이라이터 생성은 무거워서 모듈 단위로 한 번만 만들고 재사용합니다.
 */
const LANGS = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "json",
  "bash",
  "solidity",
  "html",
  "css",
  "sql",
  "python",
  "yaml",
  "cypher",
] as const;

export type Lang = (typeof LANGS)[number];

/**
 * 하이라이팅 없이 그대로 두는 언어들. 다이어그램·의사코드·출력 예시가 여기 해당합니다.
 * shiki가 특수 처리하므로 LANGS에 넣어 문법을 불러올 필요가 없습니다.
 */
const PLAIN = new Set(["text", "txt", "plaintext"]);

let cached: Promise<Highlighter> | null = null;

function highlighter() {
  cached ??= createHighlighter({
    // defaultColor:false 로 CSS 변수만 내보내고 테마 전환은 globals.css가 합니다.
    themes: ["github-light", "github-dark-default"],
    langs: [...LANGS],
  });
  return cached;
}

const isLang = (l: string): l is Lang => (LANGS as readonly string[]).includes(l);

export async function highlight(src: string, lang: string): Promise<string> {
  const hl = await highlighter();
  // 콘텐츠 파일에서 템플릿 리터럴로 쓰다 보면 앞뒤 개행이 붙습니다.
  return hl.codeToHtml(src.replace(/^\n+/, "").replace(/\s+$/, ""), {
    // 모르는 언어를 ts로 칠하면 다이어그램·출력 예시가 엉뚱하게 색칠됩니다.
    // 등록되지 않은 언어는 전부 text로 떨어뜨립니다.
    lang: isLang(lang) && !PLAIN.has(lang) ? lang : "text",
    themes: { light: "github-light", dark: "github-dark-default" },
    defaultColor: false,
  });
}
