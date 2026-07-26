"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/* ---------------- 공통 껍데기 ---------------- */
function DemoShell({
  n,
  title,
  desc,
  note,
  children,
}: {
  n: number;
  title: string;
  desc: ReactNode;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="demo my-8 rounded-lg border border-hairline bg-surface-1 p-5 sm:p-6">
      <p className="text-[0.68rem] uppercase tracking-[0.12em] text-accent">
        실습 {n}
      </p>
      <h4 className="mt-1.5 text-[1.02rem] font-semibold tracking-tight text-ink">
        {title}
      </h4>
      <p className="mt-1.5 text-[0.85rem] leading-relaxed text-ink-muted">{desc}</p>
      <div className="mt-4">{children}</div>
      {note && (
        <p className="mt-4 border-t border-hairline-soft pt-3 text-[0.75rem] leading-relaxed text-ink-dim">
          {note}
        </p>
      )}
    </section>
  );
}

const btn =
  "rounded-md border border-hairline px-3 py-1.5 text-[0.78rem] text-ink-muted transition-colors hover:text-ink disabled:opacity-50";

function Output({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 break-all rounded-md border border-hairline bg-surface-2 p-3 font-mono text-[0.75rem] leading-relaxed text-ink">
      {children}
    </div>
  );
}

/* ---------------- 1. 해시 ---------------- */
export function HashDemo() {
  const [text, setText] = useState("안녕하세요 Web3");
  const [hash, setHash] = useState("");

  useEffect(() => {
    let alive = true;
    sha256(text).then((h) => alive && setHash(h));
    return () => {
      alive = false;
    };
  }, [text]);

  return (
    <DemoShell
      n={1}
      title="SHA-256 해시 계산기"
      desc={
        <>
          아무 문장이나 입력해 보세요. 마침표 하나만 추가해도 결과가 완전히
          달라집니다. 이것이 <strong className="text-ink">눈사태 효과</strong>입니다.
        </>
      }
      note="브라우저의 Web Crypto API로 실제 SHA-256을 계산합니다."
    >
      <label htmlFor="hash-in">입력값</label>
      <input
        id="hash-in"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Output>{hash || "…"}</Output>
    </DemoShell>
  );
}

/* ---------------- 2. 블록체인 변조 ---------------- */
type Blk = { i: number; d: string; n: number; h: string; p: string };

export function ChainDemo() {
  const [blocks, setBlocks] = useState<Blk[]>([
    { i: 1, d: "앨리스 → 밥: 10 ETH", n: 0, h: "", p: "0".repeat(64) },
    { i: 2, d: "밥 → 캐롤: 4 ETH", n: 0, h: "", p: "" },
    { i: 3, d: "캐롤 → 데이브: 2 ETH", n: 0, h: "", p: "" },
  ]);
  const [mining, setMining] = useState(false);

  const hashOf = (b: Blk) => sha256(`${b.i}${b.d}${b.n}${b.p}`);

  const recompute = useCallback(async (list: Blk[]) => {
    const out = list.map((b) => ({ ...b }));
    for (let k = 0; k < out.length; k++) {
      if (k > 0) out[k].p = out[k - 1].h;
      out[k].h = await hashOf(out[k]);
    }
    return out;
  }, []);

  const mineAll = useCallback(async (list: Blk[]) => {
    const out = list.map((b) => ({ ...b }));
    for (let k = 0; k < out.length; k++) {
      if (k > 0) out[k].p = out[k - 1].h;
      let n = 0;
      let h = "";
      do {
        n++;
        out[k].n = n;
        h = await hashOf(out[k]);
      } while (!h.startsWith("0000"));
      out[k].h = h;
    }
    return out;
  }, []);

  useEffect(() => {
    setMining(true);
    mineAll(blocks).then((b) => {
      setBlocks(b);
      setMining(false);
    });
    // 최초 1회만 채굴합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function edit(idx: number, value: string) {
    const next = blocks.map((b, k) => (k === idx ? { ...b, d: value } : b));
    setBlocks(await recompute(next));
  }

  async function remine() {
    setMining(true);
    setBlocks(await mineAll(blocks));
    setMining(false);
  }

  return (
    <DemoShell
      n={2}
      title="블록체인 변조 시뮬레이터"
      desc={
        <>
          Block #1의 데이터를 아무렇게나 바꿔보세요. 그 뒤 블록들이 전부{" "}
          <strong className="text-ink">무효</strong>로 변합니다. 이것이 과거를
          조작할 수 없는 이유입니다.
        </>
      }
      note={
        <>
          “채굴”은 해시가 <code className="font-mono">0000</code>으로 시작할 때까지
          nonce를 바꿔가며 반복 계산하는 것 — 이것이 작업증명(PoW)의 실체입니다.
          실제 비트코인은 난이도가 훨씬 높아 전 세계 전용 장비가 동원됩니다.
        </>
      }
    >
      <div className="flex gap-3 overflow-x-auto pb-2">
        {blocks.map((b, k) => {
          const valid = b.h.startsWith("0000") && (k === 0 || b.p === blocks[k - 1].h);
          return (
            <div
              key={b.i}
              className="w-48 shrink-0 rounded-md border p-3 font-mono text-[0.68rem]"
              style={{ borderColor: valid ? "var(--tip)" : "var(--bad)" }}
            >
              <div
                className="font-semibold"
                style={{ color: valid ? "var(--tip)" : "var(--bad)" }}
              >
                Block #{b.i} {valid ? "유효" : "무효"}
              </div>
              <Field label="data">
                <input value={b.d} onChange={(e) => edit(k, e.target.value)} />
              </Field>
              <Field label="nonce">{b.n}</Field>
              <Field label="prev">{b.p.slice(0, 18)}…</Field>
              <Field label="hash">
                <span style={{ color: valid ? "var(--tip)" : "var(--bad)" }}>
                  {b.h.slice(0, 18)}…
                </span>
              </Field>
            </div>
          );
        })}
      </div>
      <button className={`${btn} mt-3`} onClick={remine} disabled={mining}>
        {mining ? "채굴 중…" : "전체 다시 채굴 (조작 은폐 시도)"}
      </button>
    </DemoShell>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-2">
      <div className="text-[0.6rem] uppercase tracking-wider text-ink-dim">
        {label}
      </div>
      <div className="break-all">{children}</div>
    </div>
  );
}

/* ---------------- 3. 가스 계산기 ---------------- */
const OPS = [
  { label: "ETH 전송", gas: 21000 },
  { label: "ERC-20 토큰 전송", gas: 65000 },
  { label: "ERC-20 approve", gas: 46000 },
  { label: "DEX 스왑", gas: 180000 },
  { label: "ERC-20 컨트랙트 배포", gas: 1200000 },
];

export function GasDemo() {
  const [gwei, setGwei] = useState(0.5);
  const [ethPrice, setEthPrice] = useState(2350);
  const [opIdx, setOpIdx] = useState(0);

  const gas = OPS[opIdx].gas;
  const feeEth = gas * gwei * 1e-9;
  const usd = feeEth * ethPrice;
  const krw = usd * 1380;

  return (
    <DemoShell
      n={3}
      title="가스 비용 계산기"
      desc={
        <>
          2026년 4월 이더리움 메인넷 일평균 가스는 약{" "}
          <strong className="text-ink">0.5 gwei</strong>였습니다. 2021년 혼잡기와
          비교해 보세요.
        </>
      }
      note="출처: ethereum.org “Building on Ethereum in 2026”. 실제 비용은 ETH 가격·혼잡도·컨트랙트 복잡도에 따라 변동합니다."
    >
      <div className="grid gap-x-6 sm:grid-cols-2">
        <div>
          <label htmlFor="gwei">가스 가격 (gwei)</label>
          <input
            id="gwei"
            type="number"
            step="0.1"
            min="0"
            value={gwei}
            onChange={(e) => setGwei(+e.target.value)}
          />
          <label htmlFor="ethp">ETH 가격 (USD)</label>
          <input
            id="ethp"
            type="number"
            step="50"
            min="0"
            value={ethPrice}
            onChange={(e) => setEthPrice(+e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="op">작업 종류</label>
          <select id="op" value={opIdx} onChange={(e) => setOpIdx(+e.target.value)}>
            {OPS.map((o, i) => (
              <option key={o.label} value={i}>
                {o.label} — {o.gas.toLocaleString()} gas
              </option>
            ))}
          </select>
          <label>프리셋</label>
          <div className="flex gap-2">
            <button
              className={btn}
              onClick={() => {
                setGwei(0.5);
                setEthPrice(2350);
              }}
            >
              2026년
            </button>
            <button
              className={btn}
              onClick={() => {
                setGwei(60);
                setEthPrice(4000);
              }}
            >
              2021년 혼잡기
            </button>
          </div>
        </div>
      </div>
      <Output>
        {gas.toLocaleString()} gas × {gwei} gwei ={" "}
        <strong className="text-ink">{feeEth.toFixed(8)} ETH</strong>
        <br />≈{" "}
        <strong className="text-[0.95rem]" style={{ color: "var(--accent)" }}>
          ${usd < 0.01 ? usd.toFixed(4) : usd.toFixed(2)}
        </strong>{" "}
        (약 {krw < 10 ? krw.toFixed(2) : Math.round(krw).toLocaleString()}원,
        1,380원/USD 가정)
      </Output>
    </DemoShell>
  );
}

/** 새 데모를 만들면 여기에 등록하세요. 본문에서는 <Demo name="키" /> 로 부릅니다. */
export const DEMOS: Record<string, () => React.JSX.Element> = {
  hash: HashDemo,
  chain: ChainDemo,
  gas: GasDemo,
};
