"use client";

import { useEffect, useState } from "react";

import { PROGRESS_EVENT, docKey, readProgress, toggleProgress } from "@/lib/progress";

export default function ReadMark({ topic, slug }: { topic: string; slug: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const sync = () => setDone(readProgress().includes(docKey(topic, slug)));
    sync();
    window.addEventListener(PROGRESS_EVENT, sync);
    return () => window.removeEventListener(PROGRESS_EVENT, sync);
  }, [topic, slug]);

  return (
    <button
      type="button"
      onClick={() => toggleProgress(topic, slug)}
      aria-pressed={done}
      className={`no-print inline-flex items-center gap-2 rounded-pill px-4 py-2.5 text-button font-medium transition-colors ${
        done
          ? "bg-ink text-canvas"
          : "bg-surface-1 text-ink-muted hover:text-ink"
      }`}
    >
      {done ? "읽음 ✓" : "읽음으로 표시"}
    </button>
  );
}
