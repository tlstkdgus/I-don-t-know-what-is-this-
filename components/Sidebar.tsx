"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PARTS, chapters } from "@/lib/chapters";
import { PROGRESS_EVENT, readProgress } from "@/lib/progress";

export default function Sidebar() {
  const path = usePathname();
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setDone(readProgress());
    sync();
    window.addEventListener(PROGRESS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PROGRESS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const pct = Math.round((done.length / chapters.length) * 100);

  return (
    <aside className="side">
      <div className="progress-wrap">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="progress-txt">
          <span>학습 진도</span>
          <span>
            {done.length} / {chapters.length} · {pct}%
          </span>
        </div>
      </div>

      {PARTS.map((p) => (
        <div key={p.key}>
          <div className="side-grp">
            {p.key} · {p.name}
          </div>
          {chapters
            .filter((c) => c.partKey === p.key)
            .map((c) => {
              const href = `/chapters/${c.slug}`;
              return (
                <Link key={c.slug} href={href} className={path === href ? "on" : ""}>
                  <span className="num">{String(c.num).padStart(2, "0")}</span>
                  <span>{c.title}</span>
                  {done.includes(c.slug) && <span className="dot">✓</span>}
                </Link>
              );
            })}
        </div>
      ))}

      <div className="side-grp">부록</div>
      <Link href="/quiz" className={path === "/quiz" ? "on" : ""}>
        <span className="num">Q</span>
        <span>셀프 체크 퀴즈</span>
      </Link>
      <Link href="/glossary" className={path === "/glossary" ? "on" : ""}>
        <span className="num">G</span>
        <span>용어집</span>
      </Link>
    </aside>
  );
}
