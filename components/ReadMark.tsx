"use client";

import { useEffect, useState } from "react";
import { PROGRESS_EVENT, readProgress, toggleProgress } from "@/lib/progress";

export default function ReadMark({ slug }: { slug: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const sync = () => setDone(readProgress().includes(slug));
    sync();
    window.addEventListener(PROGRESS_EVENT, sync);
    return () => window.removeEventListener(PROGRESS_EVENT, sync);
  }, [slug]);

  return (
    <button className={`readmark ${done ? "done" : ""}`} onClick={() => toggleProgress(slug)}>
      {done ? "✓ 학습 완료" : "○ 이 챕터를 학습 완료로 표시"}
    </button>
  );
}
