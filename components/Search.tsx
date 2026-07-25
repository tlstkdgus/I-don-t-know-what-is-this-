"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { chapters } from "@/lib/chapters";

type Item = { href: string; title: string; desc: string; hay: string };

const items: Item[] = [
  ...chapters.map((c) => ({
    href: `/chapters/${c.slug}`,
    title: `${c.num}. ${c.title}`,
    desc: c.desc,
    hay: `${c.num} ${c.title} ${c.desc} ${c.tags.join(" ")} ${c.slug} ${c.part}`.toLowerCase(),
  })),
  { href: "/quiz", title: "셀프 체크 퀴즈", desc: "7문항으로 이해도 확인", hay: "퀴즈 quiz 문제 테스트 체크" },
  { href: "/glossary", title: "용어집", desc: "gas, nonce, MEV, TVL 등 25개 용어", hay: "용어집 glossary 사전 용어 gas nonce mev tvl slippage oracle" },
];

export default function Search({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const res = q.trim()
    ? items.filter((i) => i.hay.includes(q.trim().toLowerCase())).slice(0, 8)
    : items.slice(0, 6);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, res.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && res[sel]) {
      router.push(res[sel].href);
      onClose();
    }
  }

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-box" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
          onKeyDown={onKey}
          placeholder="챕터, 주제, 용어 검색… (예: 가스, wagmi, 롤업)"
        />
        <div className="search-res">
          {res.length === 0 && <div className="search-empty">검색 결과가 없습니다.</div>}
          {res.map((r, i) => (
            <a
              key={r.href}
              href={r.href}
              className={i === sel ? "sel" : ""}
              onMouseEnter={() => setSel(i)}
              onClick={(e) => {
                e.preventDefault();
                router.push(r.href);
                onClose();
              }}
            >
              <div className="t">{r.title}</div>
              <div className="d">{r.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
