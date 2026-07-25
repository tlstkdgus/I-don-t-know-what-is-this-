import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChapterBody from "@/components/ChapterBody";
import ReadMark from "@/components/ReadMark";
import Sidebar from "@/components/Sidebar";
import { bySlug, chapters, neighbors } from "@/lib/chapters";

export function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ch = bySlug(slug);
  if (!ch) return {};
  return { title: `${ch.num}. ${ch.title}`, description: ch.desc };
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ch = bySlug(slug);
  if (!ch) notFound();

  const file = path.join(process.cwd(), "content", `${slug}.html`);
  let html = "";
  try {
    html = fs.readFileSync(file, "utf-8");
  } catch {
    notFound();
  }

  const { prev, next } = neighbors(slug);

  return (
    <div className="shell">
      <Sidebar />
      <div className="content narrow">
        <div className="crumb">
          {ch.partKey} · {ch.part} — Chapter {ch.num} · 약 {ch.minutes}분
        </div>
        <h1>{ch.title}</h1>
        <p className="lead">{ch.desc}</p>

        <ChapterBody html={html} />

        <ReadMark slug={ch.slug} />

        <nav className="ch-nav">
          {prev ? (
            <Link href={`/chapters/${prev.slug}`}>
              <div className="k">← 이전</div>
              <div className="t">
                {prev.num}. {prev.title}
              </div>
            </Link>
          ) : (
            <Link href="/">
              <div className="k">← 목차</div>
              <div className="t">전체 챕터 보기</div>
            </Link>
          )}
          {next ? (
            <Link href={`/chapters/${next.slug}`} className="next">
              <div className="k">다음 →</div>
              <div className="t">
                {next.num}. {next.title}
              </div>
            </Link>
          ) : (
            <Link href="/quiz" className="next">
              <div className="k">다음 →</div>
              <div className="t">셀프 체크 퀴즈</div>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
