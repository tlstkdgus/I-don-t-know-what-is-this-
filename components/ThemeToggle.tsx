"use client";

import { useEffect, useState } from "react";

/**
 * html[data-theme] 를 뒤집습니다. 기본값은 다크입니다.
 * 초기값은 layout.tsx의 인라인 스크립트가 hydration 전에 이미 넣어둡니다.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark"
    );
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("kirok-theme", next);
    } catch {
      /* noop */
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "읽기 모드(라이트)로" : "다크로"}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-1 text-ink-muted transition-colors hover:text-ink"
    >
      {/* hydration 전에는 아무것도 그리지 않아 깜빡임을 막습니다 */}
      {theme === null ? null : theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}
