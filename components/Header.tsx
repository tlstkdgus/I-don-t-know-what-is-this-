"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Search from "./Search";

export default function Header() {
  const [dark, setDark] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    setDark(t !== "light");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function toggleTheme() {
    const next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("w3-theme", next);
    } catch {}
    setDark(!dark);
  }

  function toggleMenu() {
    document.querySelector(".side")?.classList.toggle("open");
  }

  return (
    <>
      <header className="hdr">
        <div className="hdr-in">
          <Link href="/" className="logo">
            <span className="logo-mark">W3</span>
            <span>
              Web3 완전 정복
              <span style={{ color: "var(--muted-2)", fontWeight: 500, marginLeft: 7, fontSize: 12.5 }} className="hide-sm">
                프론트엔드 개발자를 위한 가이드
              </span>
            </span>
          </Link>
          <nav className="hdr-nav">
            <button onClick={() => setSearchOpen(true)} title="검색 (Ctrl+K)">
              🔍 <span className="hide-sm">검색</span> <span className="kbd hide-sm">⌘K</span>
            </button>
            <Link href="/quiz" className="hide-sm">
              퀴즈
            </Link>
            <Link href="/glossary" className="hide-sm">
              용어집
            </Link>
            <button onClick={toggleTheme} title="테마 전환" aria-label="테마 전환">
              {dark ? "☀️" : "🌙"}
            </button>
            <button className="menu-btn" onClick={toggleMenu} aria-label="목차">
              ☰
            </button>
          </nav>
        </div>
      </header>
      {searchOpen && <Search onClose={() => setSearchOpen(false)} />}
    </>
  );
}
