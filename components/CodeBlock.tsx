"use client";

import { useState, type ReactNode } from "react";

/**
 * Shiki가 빌드 타임에 만든 마크업을 감싸고 복사 버튼을 붙입니다.
 * 원본 코드 문자열을 그대로 받으므로 DOM을 다시 읽을 필요가 없습니다.
 */
export default function CodeBlock({
  code,
  caption,
  children,
}: {
  code: string;
  caption?: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* 클립보드 권한이 없으면 조용히 무시 */
    }
  }

  return (
    <figure className="mt-7">
      <div className="code-wrap relative">
        {children}
        <button
          type="button"
          onClick={copy}
          aria-label="코드 복사"
          className="copy-btn no-print absolute right-2.5 top-2.5 rounded-[100px] border border-hairline bg-surface-2 px-3 py-1.5 text-micro font-medium text-ink-muted transition-all hover:bg-ink hover:text-canvas"
        >
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-caption text-ink-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
