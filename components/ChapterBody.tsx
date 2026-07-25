"use client";

import { useEffect, useRef } from "react";
import { DEMOS } from "./Demos";

/**
 * 챕터 HTML에 <div data-demo="hash"></div> 형태의 마커를 넣으면
 * 해당 위치에 인터랙티브 React 데모가 렌더링됩니다.
 */
export default function ChapterBody({ html }: { html: string }) {
  const segments = html.split(/<div data-demo="([a-z]+)"><\/div>/);

  return (
    <>
      {segments.map((seg, i) =>
        i % 2 === 1 ? (
          <DemoSlot key={`d-${i}`} name={seg} />
        ) : (
          <HtmlSlot key={`h-${i}`} html={seg} />
        )
      )}
    </>
  );
}

function DemoSlot({ name }: { name: string }) {
  const Cmp = DEMOS[name];
  if (!Cmp) return null;
  return <Cmp />;
}

function HtmlSlot({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // 코드 블록에 복사 버튼 추가
    root.querySelectorAll("pre").forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "복사";
      btn.onclick = () => {
        const code = pre.querySelector("code")?.textContent ?? pre.textContent ?? "";
        navigator.clipboard.writeText(code).then(() => {
          btn.textContent = "복사됨 ✓";
          setTimeout(() => (btn.textContent = "복사"), 1600);
        });
      };
      pre.appendChild(btn);
    });

    // 테이블 가로 스크롤 래퍼
    root.querySelectorAll("table").forEach((t) => {
      if (t.parentElement?.classList.contains("tbl-wrap")) return;
      const w = document.createElement("div");
      w.className = "tbl-wrap";
      t.parentNode?.insertBefore(w, t);
      w.appendChild(t);
    });

    // 외부 링크는 새 탭
    root.querySelectorAll("a[href^='http']").forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
  }, [html]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
