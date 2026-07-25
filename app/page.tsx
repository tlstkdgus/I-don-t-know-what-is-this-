import Link from "next/link";
import { PARTS, chapters, totalMinutes } from "@/lib/chapters";

export default function Home() {
  return (
    <div className="content" style={{ maxWidth: 1080, margin: "0 auto" }}>
      <section className="hero">
        <div className="hero-eyebrow">● 2026년 7월 기준 · 모든 수치 출처 검증</div>
        <h1>
          블록체인을 아예 모르는
          <br />
          <span className="hl">프론트엔드 개발자</span>를 위한
          <br />
          Web3 완전 정복
        </h1>
        <p>
          추상적인 &ldquo;탈중앙화된 미래&rdquo; 이야기도, 갑작스러운 타원곡선 암호학도 아닙니다. 이미 아는 React·REST·JWT 지식에
          하나씩 연결해가며, 해시부터 실제로 돌아가는 wagmi 코드까지 갑니다.
        </p>
        <div className="hero-cta">
          <Link href="/chapters/what-is-web3" className="cta primary">
            1장부터 시작하기 →
          </Link>
          <Link href="/chapters/code" className="cta sec">
            바로 코드부터 보기
          </Link>
        </div>
      </section>

      <div className="grid g4">
        <div className="stat">
          <div className="n">{chapters.length}개</div>
          <div className="l">챕터 · 총 {Math.round(totalMinutes / 60 * 10) / 10}시간 분량</div>
        </div>
        <div className="stat">
          <div className="n">3개</div>
          <div className="l">인터랙티브 실습 (해시 · 블록체인 변조 · 가스 계산)</div>
        </div>
        <div className="stat">
          <div className="n">8종</div>
          <div className="l">복사해서 바로 쓰는 wagmi/viem 실전 코드</div>
        </div>
        <div className="stat">
          <div className="n">8문항</div>
          <div className="l">이해도 확인용 셀프 체크 퀴즈</div>
        </div>
      </div>

      <div className="grid g3" style={{ marginTop: 26 }}>
        <div className="card fe">
          <h4>💜 기존 지식과 연결</h4>
          <p style={{ fontSize: 14.5, margin: 0 }}>
            ABI는 OpenAPI, 인덱서는 read replica, 서명 로그인은 JWT의 대체. 낯선 개념마다 익숙한 대응물을 붙여 설명합니다.
          </p>
        </div>
        <div className="card tip">
          <h4>✅ 최신 사실만</h4>
          <p style={{ fontSize: 14.5, margin: 0 }}>
            Dencun·Pectra·Fusaka 이후 달라진 가스 비용, GENIUS Act 규제, 2026년 L2 지형까지 반영했습니다.
          </p>
        </div>
        <div className="card bad">
          <h4>⚠️ 비판도 함께</h4>
          <p style={{ fontSize: 14.5, margin: 0 }}>
            해킹 통계와 &ldquo;탈중앙화 극장&rdquo; 비판을 마지막 장에 그대로 담았습니다. 균형 없이는 판단할 수 없으니까요.
          </p>
        </div>
      </div>

      {PARTS.map((p) => (
        <section key={p.key}>
          <div className="part-head">
            <span className="k">{p.key}</span>
            <span className="n">{p.name}</span>
            <span className="line" />
          </div>
          <div className="grid g2">
            {chapters
              .filter((c) => c.partKey === p.key)
              .map((c) => (
                <Link key={c.slug} href={`/chapters/${c.slug}`} className="ch-card">
                  <div className="top">
                    <span className="idx">{c.num}</span>
                    <span className="t">{c.title}</span>
                  </div>
                  <p className="d">{c.desc}</p>
                  <div className="tags">
                    {c.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                    <span className="tag">약 {c.minutes}분</span>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      ))}

      <section>
        <div className="part-head">
          <span className="k">부록</span>
          <span className="n">복습 도구</span>
          <span className="line" />
        </div>
        <div className="grid g2">
          <Link href="/quiz" className="ch-card">
            <div className="top">
              <span className="idx">Q</span>
              <span className="t">셀프 체크 퀴즈</span>
            </div>
            <p className="d">8문항으로 실제 이해도를 확인합니다. 틀린 문제는 해당 챕터로 바로 연결됩니다.</p>
          </Link>
          <Link href="/glossary" className="ch-card">
            <div className="top">
              <span className="idx">G</span>
              <span className="t">용어집</span>
            </div>
            <p className="d">gas, nonce, MEV, TVL, 슬리피지… 자주 나오는 25개 용어를 한 곳에.</p>
          </Link>
        </div>
      </section>

      <footer className="foot">
        <p style={{ margin: 0 }}>
          Web3 완전 정복 · 2026년 7월 작성 · 주요 출처:{" "}
          <a href="https://ethereum.org/latest/building-on-ethereum-in-2026/" target="_blank" rel="noopener noreferrer">
            ethereum.org
          </a>
          ,{" "}
          <a href="https://wagmi.sh" target="_blank" rel="noopener noreferrer">
            wagmi
          </a>
          ,{" "}
          <a href="https://defillama.com" target="_blank" rel="noopener noreferrer">
            DeFiLlama
          </a>
          ,{" "}
          <a href="https://l2beat.com" target="_blank" rel="noopener noreferrer">
            L2BEAT
          </a>
        </p>
        <p style={{ margin: "8px 0 0", fontSize: 12.5 }}>
          이 사이트는 학습 자료이며 투자 조언이 아닙니다. 암호자산은 원금 손실 위험이 있습니다.
        </p>
      </footer>
    </div>
  );
}
