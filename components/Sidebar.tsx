"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { docsOf, groupedDocs, type Topic } from "@/lib/content";
import { PROGRESS_EVENT, docKey, readProgress } from "@/lib/progress";

export default function Sidebar({ topic }: { topic: Topic }) {
  const pathname = usePathname();
  const [done, setDone] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

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

  // 라우트가 바뀌면 모바일 목차는 닫습니다.
  useEffect(() => setOpen(false), [pathname]);

  const all = docsOf(topic.slug);
  const readCount = all.filter((d) => done.includes(docKey(d.topic, d.slug))).length;
  const pct = all.length ? Math.round((readCount / all.length) * 100) : 0;

  const nav = (
    <nav>
      <div className="mb-7">
        <div className="flex items-baseline justify-between text-micro font-medium">
          <span className="text-ink-muted">{topic.name}</span>
          <span className="tnum text-ink-dim">
            {readCount}/{all.length}
          </span>
        </div>
        <div className="mt-2.5 h-px w-full bg-hairline">
          <div
            className="h-px bg-ink transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {groupedDocs(topic).map(({ part, items }) => (
        <div key={part.key} className="mb-6">
          <p className="mb-2 px-3 text-micro font-medium text-ink-dim">
            {part.name}
          </p>
          <ul className="space-y-0.5">
            {items.map((d) => {
              const href = `/${d.topic}/${d.slug}`;
              const active = pathname === href;
              const read = done.includes(docKey(d.topic, d.slug));
              return (
                <li key={d.slug}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-baseline gap-2.5 rounded-md px-3 py-2 text-body-sm leading-snug transition-colors ${
                      active
                        ? "bg-surface-2 text-ink"
                        : "text-ink-dim hover:text-ink"
                    }`}
                  >
                    <span className="tnum w-4 shrink-0 text-micro">
                      {String(d.num).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">{d.title}</span>
                    {read && (
                      <span
                        aria-label="읽음"
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* 데스크톱: 고정 사이드바 */}
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto py-10 pr-8 lg:block">
        {nav}
      </aside>

      {/* 모바일: 헤더 아래 접이식 목차 */}
      <div className="sticky top-14 z-30 -mx-5 border-b border-hairline-soft bg-canvas/90 px-5 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center gap-2 py-3.5 text-body-sm font-medium text-ink-muted"
        >
          <span className="text-ink-dim">{open ? "▾" : "▸"}</span>
          {topic.name} 목차
          <span className="tnum ml-auto text-caption text-ink-dim">
            {readCount}/{all.length}
          </span>
        </button>
        {open && <div className="pb-7">{nav}</div>}
      </div>
    </>
  );
}
