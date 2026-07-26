import Link from "next/link";

import { docsOf, minutesOf, topics } from "@/lib/content";
import { SITE } from "@/lib/site";

export default function Home() {
  const [featured, ...rest] = topics;
  const written = topics.filter((t) => t.status === "active");
  const chapters = written.reduce((a, t) => a + docsOf(t.slug).length, 0);
  const minutes = written.reduce((a, t) => a + minutesOf(t.slug), 0);

  return (
    <main className="mx-auto max-w-[75rem] px-5 sm:px-8">
      {/* ---------- 히어로 ---------- */}
      <section className="py-24 sm:py-32">
        <p className="inline-flex rounded-pill bg-surface-1 px-3.5 py-1.5 text-caption font-medium text-ink-muted">
          {SITE.tagline}
        </p>

        <h1 className="mt-8 max-w-[16ch] text-[3rem] font-medium leading-[0.98] tracking-[-0.05em] text-ink sm:text-display-lg lg:text-display-xl">
          모르는 것을
          <br />
          하나씩 채웁니다
        </h1>

        <p className="mt-8 max-w-[44ch] text-body-lg text-ink-muted">
          동작하니까 넘어갔던 것들을 주제별로 다시 열어봅니다. 이해한 만큼만
          쓰고, 모르는 건 모른다고 씁니다.
        </p>

        <div className="mt-10 flex flex-wrap gap-2.5">
          <Link
            href={`/${featured.slug}`}
            className="rounded-pill bg-ink px-5 py-3 text-button font-medium text-canvas transition-transform hover:scale-[0.98]"
          >
            {featured.name}부터 읽기
          </Link>
          <Link
            href="/glossary"
            className="rounded-pill bg-surface-1 px-5 py-3 text-button font-medium text-ink transition-colors hover:bg-surface-2"
          >
            용어집
          </Link>
        </div>

        <dl className="tnum mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-hairline-soft pt-7 text-caption">
          <Metric k="쓴 글" v={`${chapters}장`} />
          <Metric k="분량" v={`약 ${minutes}분`} />
          <Metric k="주제" v={`${topics.length}개`} />
        </dl>
      </section>

      {/* ---------- 주제 ---------- */}
      <section className="pb-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-display-md text-ink">주제</h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* 스포트라이트 카드는 페이지당 하나. 스펙상 셋 이상은 무드보드가 됩니다. */}
          <SpotlightCard slug={featured.slug} />
          {rest.map((t) => (
            <TopicCard key={t.slug} slug={t.slug} />
          ))}
        </div>
      </section>

      {/* ---------- 쓰는 방식 ---------- */}
      <section className="border-t border-hairline-soft py-16">
        <h2 className="text-headline text-ink">쓰는 방식</h2>
        <div className="mt-7 grid gap-x-10 gap-y-7 sm:grid-cols-3">
          <Rule
            k="출처를 확인한 것만"
            v="수치·날짜·버전은 원문을 찾아 확인하고 씁니다. 확인 못 한 건 안 씁니다."
          />
          <Rule
            k="한계도 같은 비중으로"
            v="잘 되는 것만 적으면 정리가 아니라 홍보가 됩니다. 실패 사례와 못 하는 것을 같이 적습니다."
          />
          <Rule
            k="아는 것에 붙여서"
            v="새 개념을 공중에 띄우지 않고 이미 쓰던 도구·패턴에 매핑해 설명합니다."
          />
        </div>
      </section>
    </main>
  );
}

function Metric({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-micro text-ink-dim">{k}</dt>
      <dd className="mt-1 text-body font-medium text-ink">{v}</dd>
    </div>
  );
}

function Rule({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <h3 className="text-body font-medium text-ink">{k}</h3>
      <p className="mt-2 text-body-sm text-ink-dim">{v}</p>
    </div>
  );
}

/* 브랜드 시그니처 — 검은 그리드 위에 놓이는 그라디언트 스포트라이트 타일 */
function SpotlightCard({ slug }: { slug: string }) {
  const t = topics.find((x) => x.slug === slug)!;
  const count = docsOf(slug).length;

  return (
    <Link
      href={`/${slug}`}
      className="group relative flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-xxl p-8 sm:row-span-2"
      style={{
        background:
          "linear-gradient(150deg, var(--grad-violet) 0%, var(--grad-magenta) 55%, var(--grad-orange) 100%)",
      }}
    >
      <div>
        <p className="tnum text-caption font-medium text-white/70">
          {count}장 · 약 {minutesOf(slug)}분
        </p>
        <h3 className="mt-4 text-display-md text-white">{t.name}</h3>
        <p className="mt-3 max-w-[28ch] text-body text-white/80">{t.tagline}</p>
      </div>
      <span className="mt-8 inline-flex w-fit rounded-pill bg-white/15 px-4 py-2 text-button font-medium text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-black">
        읽기 시작
      </span>
    </Link>
  );
}

function TopicCard({ slug }: { slug: string }) {
  const t = topics.find((x) => x.slug === slug)!;
  const planned = t.status === "planned";
  const count = docsOf(slug).length;

  return (
    <Link
      href={`/${slug}`}
      className="group flex flex-col justify-between rounded-xl border border-hairline bg-surface-1 p-6 transition-colors hover:bg-surface-2"
    >
      <div>
        <div className="flex items-baseline gap-2.5">
          <h3 className="text-headline text-ink">{t.name}</h3>
          {planned && (
            <span className="rounded-sm bg-surface-2 px-1.5 py-0.5 text-micro font-medium text-ink-dim">
              예정
            </span>
          )}
        </div>
        <p className="mt-2.5 max-w-[34ch] text-body-sm text-ink-muted">
          {t.tagline}
        </p>
      </div>
      <p className="tnum mt-6 text-caption text-ink-dim">
        {planned
          ? `목차 ${t.outline?.length ?? 0}편`
          : `${count}장 · 약 ${minutesOf(slug)}분`}
      </p>
    </Link>
  );
}
