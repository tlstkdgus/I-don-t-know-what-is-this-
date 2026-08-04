import type { Block, Tone } from "@/lib/blocks";
import { highlight } from "@/lib/highlight";

import CodeBlock from "./CodeBlock";
import Demo from "./Demo";
import { FIGURES } from "./figures";
import Inline from "./Inline";
import Tabs from "./Tabs";

/**
 * Block[] 렌더러. 서버 컴포넌트라서 Shiki 하이라이팅이 빌드 타임에 끝납니다.
 * 상호작용이 필요한 조각(CodeBlock 복사 버튼, Tabs, Demo)만 클라이언트입니다.
 */
export default async function Blocks({ blocks }: { blocks: Block[] }) {
  const out = await Promise.all(blocks.map((b, i) => renderBlock(b, i)));
  return <>{out}</>;
}

const TONE: Record<Tone, { label: string; v: string }> = {
  tip: { label: "잘 되는 것", v: "var(--tip)" },
  warn: { label: "주의", v: "var(--warn)" },
  bad: { label: "안 되는 것", v: "var(--bad)" },
  fe: { label: "이미 아는 것에 붙이면", v: "var(--fe)" },
  note: { label: "메모", v: "var(--ink-muted)" },
};

async function renderBlock(b: Block, key: number): Promise<React.ReactNode> {
  switch (b.t) {
    /* ---------------- 텍스트 ---------------- */
    case "p":
      return (
        <p key={key} className="mt-5 text-body leading-[1.78] text-ink-muted">
          <Inline md={b.md} />
        </p>
      );

    case "h2":
      return (
        <h2
          key={key}
          className="mt-16 border-t border-hairline pt-8 text-[1.75rem] font-medium leading-[1.15] tracking-[-0.045em] text-ink"
        >
          <Inline md={b.md} />
        </h2>
      );

    case "h3":
      return (
        <h3
          key={key}
          className="mt-11 text-[1.25rem] font-medium leading-[1.25] tracking-[-0.03em] text-ink"
        >
          <Inline md={b.md} />
        </h3>
      );

    case "h4":
      return (
        <h4 key={key} className="mt-8 text-[1rem] font-medium tracking-[-0.02em] text-ink">
          <Inline md={b.md} />
        </h4>
      );

    case "legend":
      return (
        <p key={key} className="mt-3 text-caption leading-[1.6] text-ink-dim">
          <Inline md={b.md} />
        </p>
      );

    case "hr":
      return <hr key={key} className="my-12 border-t border-hairline-soft" />;

    /* ---------------- 목록 ---------------- */
    case "ul":
      return (
        <ul key={key} className="mt-5 space-y-2">
          {b.items.map((it) => (
            <li
              key={it}
              className="relative pl-5 text-body leading-[1.75] text-ink-muted"
            >
              <span className="absolute left-0 top-[0.72em] h-[3px] w-[3px] rounded-full bg-ink-dim" />
              <Inline md={it} />
            </li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol key={key} className="mt-5 space-y-2">
          {b.items.map((it, i) => (
            <li
              key={it}
              className="relative pl-7 text-body leading-[1.75] text-ink-muted"
            >
              <span className="tnum absolute left-0 top-0 text-caption leading-[1.9] text-ink-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Inline md={it} />
            </li>
          ))}
        </ol>
      );

    /* ---------------- 표 ---------------- */
    case "table":
      return (
        <div key={key} className="-mx-1 mt-7 overflow-x-auto px-1">
          <table className="w-full border-collapse text-left">
            {b.head.length > 0 && (
              <thead>
                <tr>
                  {b.head.map((h, i) => (
                    <th
                      key={i}
                      className="whitespace-nowrap border-b border-hairline px-3 pb-2.5 text-caption font-medium tracking-[-0.01em] text-ink first:pl-0 last:pr-0"
                    >
                      <Inline md={h} />
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {b.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border-b border-hairline-soft px-3 py-3 align-top text-body-sm leading-[1.6] text-ink-muted first:pl-0 last:pr-0"
                    >
                      <Inline md={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    /* ---------------- 코드 ---------------- */
    case "code": {
      const html = await highlight(b.src, b.lang);
      return (
        <CodeBlock key={key} code={b.src} caption={b.caption}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </CodeBlock>
      );
    }

    /* ---------------- 강조 박스 ---------------- */
    case "callout": {
      const tone = TONE[b.tone ?? "note"];
      const body = await Promise.all((b.body ?? []).map((c, i) => renderBlock(c, i)));
      return (
        <aside
          key={key}
          className="mt-8 rounded-[15px] border border-hairline bg-surface-1 p-5 sm:p-6"
        >
          <p
            className="text-caption font-medium tracking-[-0.01em]"
            style={{ color: tone.v }}
          >
            {b.title ?? tone.label}
          </p>
          <div className="[&>*:first-child]:mt-2.5">{body}</div>
        </aside>
      );
    }

    /* ---------------- 그리드 ---------------- */
    case "grid": {
      const min = { 2: "17rem", 3: "13rem", 4: "10rem" }[b.cols ?? 2];
      const items = await Promise.all(b.items.map((c, i) => renderBlock(c, i)));
      return (
        <div
          key={key}
          className="mt-8 grid gap-4"
          style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${min}, 1fr))` }}
        >
          {items}
        </div>
      );
    }

    case "card": {
      const tone = b.tone ? TONE[b.tone] : null;
      const body = await Promise.all((b.body ?? []).map((c, i) => renderBlock(c, i)));
      return (
        <div
          key={key}
          className="rounded-[15px] border border-hairline bg-surface-1 p-5"
        >
          {b.title && (
            <p
              className="text-body-sm font-medium tracking-[-0.015em]"
              style={{ color: tone?.v ?? "var(--ink)" }}
            >
              {b.title}
            </p>
          )}
          <div className="[&>*:first-child]:mt-2.5 [&_li]:text-body-sm [&_p]:text-body-sm">
            {body}
          </div>
        </div>
      );
    }

    case "stat": {
      const long = b.n.length > 10;
      return (
        <div
          key={key}
          className="rounded-[15px] border border-hairline bg-surface-1 p-5"
        >
          <div
            className={
              long
                ? "text-[1rem] font-medium leading-[1.3] tracking-[-0.02em] text-ink"
                : "tnum text-[2.25rem] font-medium leading-[1] tracking-[-0.045em] text-ink"
            }
          >
            {b.n}
          </div>
          <p className="mt-3 text-caption leading-[1.5] text-ink-dim">{b.l}</p>
        </div>
      );
    }

    /* ---------------- 흐름도 ---------------- */
    case "flow":
      return (
        <div key={key} className="mt-8 flex flex-wrap items-stretch gap-2">
          {b.items.map((raw, i) => {
            const [main, sub] = raw.split("|");
            return (
              <div key={raw} className="flex items-stretch gap-2">
                {i > 0 && (
                  <span aria-hidden className="select-none self-center text-ink-dim">
                    →
                  </span>
                )}
                <div className="rounded-[100px] border border-hairline bg-surface-1 px-4 py-2 text-caption leading-snug">
                  <span className="text-ink">{main}</span>
                  {sub && <span className="ml-2 text-ink-dim">{sub}</span>}
                </div>
              </div>
            );
          })}
        </div>
      );

    /* ---------------- 탭 ---------------- */
    case "tabs": {
      const panes = await Promise.all(
        b.tabs.map(async (t, i) => {
          const body = await Promise.all(t.body.map((c, j) => renderBlock(c, j)));
          return <div key={i}>{body}</div>;
        })
      );
      return (
        <Tabs key={key} labels={b.tabs.map((t) => t.label)}>
          {panes}
        </Tabs>
      );
    }

    /* ---------------- 그 외 ---------------- */
    case "demo":
      return <Demo key={key} name={b.name} />;

    case "diagram": {
      const Fig = FIGURES[b.name];
      return (
        <figure key={key} className="mt-8 overflow-hidden rounded-[20px] border border-hairline bg-surface-1">
          <div className="overflow-x-auto p-6 [&_svg]:h-auto [&_svg]:max-w-full">
            {Fig ? (
              <Fig />
            ) : (
              <p className="text-body-sm text-bad">
                등록되지 않은 도식: <code>{b.name}</code> — components/figures/index.tsx 의 FIGURES를 확인하세요.
              </p>
            )}
          </div>
          {b.caption && (
            <figcaption className="flex gap-2.5 border-t border-hairline px-6 py-3.5 text-caption leading-[1.6] text-ink-muted">
              <span className="shrink-0 font-medium text-ink-dim">그림</span>
              <span>{b.caption}</span>
            </figcaption>
          )}
        </figure>
      );
    }

    default:
      return null;
  }
}
