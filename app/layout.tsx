import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Web3 완전 정복 — 프론트엔드 개발자를 위한 가이드",
    template: "%s | Web3 완전 정복",
  },
  description:
    "블록체인을 아예 모르는 프론트엔드 개발자를 위한 Web3 종합 가이드. 해시부터 wagmi/viem 실전 코드, 2026년 생태계 현황과 비판론까지 13개 챕터.",
  keywords: ["Web3", "블록체인", "이더리움", "wagmi", "viem", "Solidity", "스마트 컨트랙트", "프론트엔드"],
  openGraph: {
    title: "Web3 완전 정복 — 프론트엔드 개발자를 위한 가이드",
    description: "해시부터 wagmi/viem 실전 코드까지. 인터랙티브 실습이 포함된 13개 챕터.",
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  themeColor: "#4cc9a0",
  width: "device-width",
  initialScale: 1,
};

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('w3-theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
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
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
