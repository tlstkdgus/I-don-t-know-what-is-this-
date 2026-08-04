/**
 * 도식을 그릴 때 쓰는 최소 부품들.
 *
 * 서버 컴포넌트입니다 — 도식은 정적이라 클라이언트로 나가는 JS가 없습니다.
 * (상호작용이 필요한 `Demos.tsx`와 달리 `"use client"`를 붙이지 않습니다.)
 *
 * 색은 전부 `DESIGN.md`의 CSS 변수를 참조합니다. 하드코딩된 hex를 쓰지 마세요 —
 * 다크/라이트 전환이 깨집니다.
 *
 * 좌표를 손으로 계산하지 말고 `row()` / `stack()`을 쓰세요. 라벨 겹침과
 * viewBox 이탈은 빌드가 잡아주지 않으므로, 좌표 계산을 사람이 하는 만큼 버그가 납니다.
 */
import type { ReactNode } from "react";

/* ---------------- 색 ---------------- */

/** 강조의 "의미". `DESIGN.md`의 의미색과 1:1로 대응합니다. */
export type Tone = "tip" | "warn" | "bad" | "fe";

export const C = {
  ink: "var(--ink)",
  muted: "var(--ink-muted)",
  dim: "var(--ink-dim)",
  hair: "var(--hairline)",
  surface: "var(--surface-2)",
  /** 도식이 얹히는 카드 배경. 도형을 뚫어 보이게 할 때 씁니다. */
  canvas: "var(--surface-1)",
} as const;

export const toneColor = (t?: Tone) => (t ? `var(--${t})` : C.hair);

/* ---------------- 레이아웃 ---------------- */

/**
 * 주어진 폭 안에 n개를 균등 배치한 x 좌표들.
 * 좌표를 손으로 세지 않게 해서 겹침 버그를 막는 것이 목적입니다.
 */
export function row(
  n: number,
  { start = 16, end = 644, gap = 16 }: { start?: number; end?: number; gap?: number } = {},
) {
  const w = (end - start - gap * (n - 1)) / n;
  return {
    w,
    x: (i: number) => start + i * (w + gap),
    /** i번째 칸의 가운데 */
    cx: (i: number) => start + i * (w + gap) + w / 2,
  };
}

/** 세로로 쌓을 때의 y 좌표들. */
export function stack(n: number, { start = 16, h = 52, gap = 8 }: { start?: number; h?: number; gap?: number } = {}) {
  return {
    h,
    y: (i: number) => start + i * (h + gap),
    cy: (i: number) => start + i * (h + gap) + h / 2,
    /** 전체가 차지하는 높이 — viewBox 높이를 정할 때 씁니다. */
    total: start + n * h + (n - 1) * gap,
  };
}

/* ---------------- 부품 ---------------- */

/**
 * 도식 한 장의 껍데기. viewBox만 정하면 폭에 맞춰 자동으로 늘어납니다.
 * 카드 프레임과 캡션은 `Blocks.tsx`의 `diagram` 렌더러가 붙입니다.
 */
export function Diagram({
  w = 660,
  h,
  label,
  children,
}: {
  w?: number;
  h: number;
  /** 스크린리더용 설명. 도식이 말하려는 결론을 한 문장으로. */
  label: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={label}
      className="w-full"
      fontFamily="ui-sans-serif, system-ui"
    >
      {children}
    </svg>
  );
}

/**
 * 라벨이 든 상자. `tone`을 주면 테두리와 배경이 함께 강조됩니다
 * (테두리만 바꾸면 눈에 잘 안 들어옵니다).
 */
export function Box({
  x,
  y,
  w,
  h = 48,
  label,
  sub,
  tone,
  mono,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  sub?: string;
  tone?: Tone;
  /** 주소·해시처럼 고정폭이 자연스러운 값 */
  mono?: boolean;
}) {
  const cx = x + w / 2;
  const accent = toneColor(tone);
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={11}
        fill={tone ? accent : C.surface}
        fillOpacity={tone ? 0.1 : 1}
        stroke={accent}
        strokeWidth={tone ? 2.5 : 1.5}
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 5}
        textAnchor="middle"
        fontSize={mono ? 11.5 : 13.5}
        fontWeight={tone ? 600 : 400}
        fontFamily={mono ? "ui-monospace, monospace" : undefined}
        fill={C.ink}
      >
        {label}
      </text>
      {sub && (
        <text x={cx} y={y + h / 2 + 14} textAnchor="middle" fontSize={10.5} fill={tone ? accent : C.muted}>
          {sub}
        </text>
      )}
    </g>
  );
}

/** 화살촉 정의. 도식마다 `id`가 겹치지 않게 접두사를 넘기세요. */
export function ArrowHeads({ id, tones = [] }: { id: string; tones?: (Tone | undefined)[] }) {
  const uniq = Array.from(new Set(tones));
  return (
    <defs>
      {uniq.map((t) => (
        <marker
          key={t ?? "plain"}
          id={`${id}-${t ?? "plain"}`}
          markerWidth={10}
          markerHeight={10}
          refX={9}
          refY={3.5}
          orient="auto"
        >
          <path d="M0,0 L0,7 L9,3.5 z" fill={t ? toneColor(t) : C.dim} />
        </marker>
      ))}
    </defs>
  );
}

/**
 * 화살표. `heads`에 쓴 `id`와 같은 값을 넘겨야 화살촉이 붙습니다.
 * `dashed`는 "돌아오는 경로"나 "논리적 연결"에 씁니다.
 */
export function Arrow({
  heads,
  from,
  to,
  tone,
  dashed,
  label,
  labelSide = "above",
}: {
  heads: string;
  from: [number, number];
  to: [number, number];
  tone?: Tone;
  dashed?: boolean;
  label?: string;
  labelSide?: "above" | "below";
}) {
  const color = tone ? toneColor(tone) : C.dim;
  const mx = (from[0] + to[0]) / 2;
  const my = (from[1] + to[1]) / 2;
  return (
    <g>
      <line
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        stroke={color}
        strokeWidth={tone ? 2.2 : 1.8}
        strokeDasharray={dashed ? "5 4" : undefined}
        markerEnd={`url(#${heads}-${tone ?? "plain"})`}
      />
      {label && (
        <text
          x={mx}
          y={labelSide === "above" ? my - 9 : my + 18}
          textAnchor="middle"
          fontSize={11}
          fill={tone ? color : C.ink}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/** 도식 안의 설명 문구. `role="section"`은 소제목, `"note"`는 보조 설명입니다. */
export function Text({
  x,
  y,
  children,
  role = "body",
  tone,
  anchor = "start",
  mono,
}: {
  x: number;
  y: number;
  children: string;
  role?: "section" | "body" | "note";
  tone?: Tone;
  anchor?: "start" | "middle" | "end";
  mono?: boolean;
}) {
  const size = role === "section" ? 12.5 : role === "note" ? 11.5 : 12;
  const fill = tone ? toneColor(tone) : role === "note" ? C.dim : role === "section" ? C.muted : C.ink;
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={mono ? 11.5 : size}
      fontWeight={role === "section" ? 600 : 400}
      fontFamily={mono ? "ui-monospace, monospace" : undefined}
      fill={fill}
    >
      {children}
    </text>
  );
}

/** 세로 구분선 — 좌우 비교 도식에서 두 영역을 나눕니다. */
export function Divider({
  x,
  y1,
  y2,
  horizontal,
}: {
  x: number;
  y1: number;
  y2: number;
  /** 가로선이면 x를 y로, y1·y2를 x1·x2로 해석합니다. */
  horizontal?: boolean;
}) {
  return horizontal ? (
    <line x1={y1} y1={x} x2={y2} y2={x} stroke={C.hair} strokeWidth={1.5} />
  ) : (
    <line x1={x} y1={y1} x2={x} y2={y2} stroke={C.hair} strokeWidth={1.5} />
  );
}

/** 채워진 막대 — 크기 비교에 씁니다. */
export function Bar({
  x,
  y,
  w,
  tone,
  h = 12,
}: {
  x: number;
  y: number;
  w: number;
  tone?: Tone;
  h?: number;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={toneColor(tone)} fillOpacity={tone ? 0.75 : 0.4} />;
}
