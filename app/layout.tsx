import type { Metadata, Viewport } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://web3-site-xi.vercel.app"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#090909" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

/* 다크가 기본값입니다. hydration 전에 테마를 확정해 FOUC를 막습니다.
   이 스크립트를 건드리면 깜빡임이 생깁니다. */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('kirok-theme');
    if (t !== 'light' && t !== 'dark') t = 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-canvas text-ink-muted">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-ink focus:px-4 focus:py-2 focus:text-button focus:font-medium focus:text-canvas"
        >
          본문으로 건너뛰기
        </a>
        <Header />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="mt-32 border-t border-hairline-soft">
      <div className="mx-auto flex max-w-[75rem] flex-wrap items-center gap-x-7 gap-y-3 px-5 py-16 text-caption text-ink-dim sm:px-8">
        <span className="font-medium text-ink-muted">{SITE.name}</span>
        <Link href="/glossary" className="transition-colors hover:text-ink">
          용어집
        </Link>
        <Link href="/quiz" className="transition-colors hover:text-ink">
          퀴즈
        </Link>
        {SITE.github && (
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
        )}
        <span className="ml-auto">
          수치·날짜는 2026년 7월 기준으로 확인한 값입니다.
        </span>
      </div>
    </footer>
  );
}
