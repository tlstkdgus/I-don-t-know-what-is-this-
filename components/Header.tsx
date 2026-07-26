"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { topics } from "@/lib/content";
import { SITE } from "@/lib/site";
import Search from "./Search";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const current = pathname.split("/")[1];

  return (
    <header className="sticky top-0 z-40 border-b border-hairline-soft bg-canvas/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[75rem] items-center gap-5 px-5 sm:px-8">
        <Link
          href="/"
          className="shrink-0 text-[0.95rem] font-medium tracking-[-0.03em] text-ink"
        >
          {SITE.name}
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {topics.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className={`rounded-pill px-3 py-1.5 text-body-sm font-medium transition-colors ${
                current === t.slug
                  ? "bg-surface-2 text-ink"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              {t.name}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Search />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
