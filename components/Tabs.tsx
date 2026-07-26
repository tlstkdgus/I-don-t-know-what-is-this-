"use client";

import { Children, useId, useState, type ReactNode } from "react";

/**
 * 코드 예제 여러 벌을 겹쳐 보여줍니다.
 * 패널은 서버에서 이미 렌더된 노드를 children으로 받습니다 (하이라이팅이 빌드 타임에 끝남).
 */
export default function Tabs({
  labels,
  children,
}: {
  labels: string[];
  children: ReactNode;
}) {
  const id = useId();
  const [active, setActive] = useState(0);
  const panes = Children.toArray(children);
  if (!panes.length) return null;

  return (
    <div className="mt-8">
      <div role="tablist" className="flex flex-wrap gap-1.5">
        {labels.map((label, i) => (
          <button
            key={label}
            role="tab"
            type="button"
            id={`${id}-t${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-p${i}`}
            onClick={() => setActive(i)}
            className={`rounded-[100px] px-3.5 py-2 text-button font-medium transition-colors ${
              i === active
                ? "bg-surface-2 text-ink"
                : "text-ink-dim hover:text-ink-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {panes.map((pane, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`${id}-p${i}`}
          aria-labelledby={`${id}-t${i}`}
          hidden={i !== active}
        >
          {pane}
        </div>
      ))}
    </div>
  );
}
