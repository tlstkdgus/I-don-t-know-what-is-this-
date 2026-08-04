/**
 * 본문 콘텐츠의 데이터 모델.
 *
 * 본문은 MDX가 아니라 이 타입의 배열입니다. `content/{topic}/{slug}.ts` 가
 * `Block[]` 를 default export 하면 페이지가 그대로 렌더합니다.
 *
 * 왜 데이터인가:
 *   - MDX 툴체인(로더·remark·rehype)이 없어 빌드가 단순하고 Turbopack 이슈가 없습니다.
 *   - 코드 예제에 `{`, `${`, `<` 를 넣어도 이스케이프가 필요 없습니다 (전부 문자열).
 *   - 타입 체크가 됩니다. 오타 난 tone, 빠진 필드는 빌드가 잡습니다.
 *   - 목차·검색 같은 자동화를 나중에 붙이기 쉽습니다.
 *
 * 문장 안의 강조는 아래 인라인 문법을 씁니다 (parseInline 참고):
 *   **굵게**   *기울임*   `코드`   [링크](/경로)   ~~취소선~~
 */

/**
 * tone은 곧 의미입니다. 장식으로 색을 쓰지 않습니다.
 *   tip  잘 되는 것 · 권장          warn 주의 · 실무 함정
 *   bad  안 되는 것 · 실패 사례      fe   이미 아는 개념에 매핑
 *   note 그 외 보충
 */
export type Tone = "tip" | "warn" | "bad" | "fe" | "note";

export type Block =
  /** 문단. md 는 인라인 문법을 지원합니다. */
  | { t: "p"; md: string }
  | { t: "h2"; md: string }
  | { t: "h3"; md: string }
  | { t: "h4"; md: string }
  /** 글머리 목록 / 번호 목록 */
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  /** 표. head 가 빈 배열이면 헤더 행을 그리지 않습니다. */
  | { t: "table"; head: string[]; rows: string[][] }
  /** 코드 블록. 하이라이팅은 빌드 타임에 Shiki가 처리합니다. */
  | { t: "code"; lang: string; src: string; caption?: string }
  /** 강조 박스. tone 이 곧 의미입니다. */
  | { t: "callout"; tone?: Tone; title?: string; body: Block[] }
  /** 나란히 배치. items 에는 보통 card / stat 이 들어갑니다. */
  | { t: "grid"; cols?: 2 | 3 | 4; items: Block[] }
  /** grid 안의 제목 있는 칸 */
  | { t: "card"; title?: string; tone?: Tone; body: Block[] }
  /** grid 안의 큰 수치 하나. 출처 없는 숫자는 쓰지 않습니다. */
  | { t: "stat"; n: string; l: string }
  /** 단계 흐름도. 각 항목은 "본문" 또는 "본문|보조설명". */
  | { t: "flow"; items: string[] }
  /** 코드 예제 여러 벌 */
  | { t: "tabs"; tabs: { label: string; body: Block[] }[] }
  /** components/Demos.tsx 의 DEMOS 레지스트리 키 */
  | { t: "demo"; name: string }
  /**
   * SVG 도식. `components/figures/index.tsx`의 FIGURES 레지스트리 키를 가리킵니다.
   * 도식은 좌표 계산이 많아 문자열로 두면 실수가 잦으므로 JSX 컴포넌트로 그립니다
   * (부품은 `components/figures/primitives.tsx`).
   */
  | { t: "diagram"; name: string; caption?: string }
  /** 표·그림 아래 각주 */
  | { t: "legend"; md: string }
  | { t: "hr" };

/* ============================================================
   인라인 문법 파서
   문단 안의 **굵게** *기울임* `코드` [링크](url) ~~취소선~~ 을
   토큰 배열로 쪼갭니다. 렌더링은 components/Blocks.tsx 가 합니다.
   ============================================================ */

export type Token =
  | { k: "text"; v: string }
  | { k: "strong"; v: string }
  | { k: "em"; v: string }
  | { k: "code"; v: string }
  | { k: "del"; v: string }
  | { k: "link"; v: string; href: string };

const PATTERN =
  /(\[[^\]]+\]\([^)\s]+\))|(`[^`]+`)|(\*\*[^*]+\*\*)|(~~[^~]+~~)|(\*[^*\n]+\*)/g;

export function parseInline(md: string): Token[] {
  const out: Token[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  PATTERN.lastIndex = 0;
  while ((m = PATTERN.exec(md))) {
    if (m.index > last) out.push({ k: "text", v: md.slice(last, m.index) });
    const s = m[0];

    if (s.startsWith("[")) {
      const cut = s.indexOf("](");
      out.push({ k: "link", v: s.slice(1, cut), href: s.slice(cut + 2, -1) });
    } else if (s.startsWith("`")) {
      out.push({ k: "code", v: s.slice(1, -1) });
    } else if (s.startsWith("**")) {
      out.push({ k: "strong", v: s.slice(2, -2) });
    } else if (s.startsWith("~~")) {
      out.push({ k: "del", v: s.slice(2, -2) });
    } else {
      out.push({ k: "em", v: s.slice(1, -1) });
    }
    last = m.index + s.length;
  }

  if (last < md.length) out.push({ k: "text", v: md.slice(last) });
  return out;
}

/** 검색·요약용 평문 추출 (인라인 기호 제거) */
export const plain = (md: string) =>
  parseInline(md)
    .map((t) => t.v)
    .join("");
