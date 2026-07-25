"use client";

import { useCallback, useEffect, useState } from "react";

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/* ---------------- 1. Hash ---------------- */
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
    <div className="demo">
      <div className="demo-title">▶ 실습 1 — SHA-256 해시 계산기</div>
      <p className="demo-desc">
        아무 문장이나 입력해 보세요. 마침표 하나만 추가해도 결과가 완전히 달라집니다. 이것이 <b>눈사태 효과</b>입니다.
      </p>
      <label htmlFor="hash-in">입력값</label>
      <input id="hash-in" type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <div className="out">{hash || "…"}</div>
      <p className="legend">브라우저의 Web Crypto API로 실제 SHA-256을 계산합니다.</p>
    </div>
  );
}

/* ---------------- 2. Blockchain tamper ---------------- */
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
    <div className="demo">
      <div className="demo-title">▶ 실습 2 — 블록체인 변조 시뮬레이터</div>
      <p className="demo-desc">
        Block #1의 데이터를 아무렇게나 바꿔보세요. 그 뒤 블록들이 전부 <b>무효</b>로 변합니다. 이것이 과거를 조작할 수 없는 이유입니다.
      </p>
      <div className="chainrow">
        {blocks.map((b, k) => {
          const valid = b.h.startsWith("0000") && (k === 0 || b.p === blocks[k - 1].h);
          return (
            <div key={b.i} className={`blk ${valid ? "ok" : "no"}`}>
              <div style={{ color: valid ? "var(--mint)" : "var(--rose)", fontWeight: 700 }}>
                Block #{b.i} {valid ? "✔ 유효" : "✘ 무효"}
              </div>
              <div className="lb">data</div>
              <input value={b.d} onChange={(e) => edit(k, e.target.value)} />
              <div className="lb">nonce</div>
              <div className="vv">{b.n}</div>
              <div className="lb">prev</div>
              <div className="vv">{b.p.slice(0, 20)}…</div>
              <div className="lb">hash</div>
              <div className="vv" style={{ color: valid ? "var(--mint)" : "var(--rose)" }}>
                {b.h.slice(0, 20)}…
              </div>
            </div>
          );
        })}
      </div>
      <button className="btn ghost" onClick={remine} disabled={mining}>
        {mining ? "⛏️ 채굴 중…" : "🔨 전체 다시 채굴 (조작 은폐 시도)"}
      </button>
      <p className="legend">
        &quot;채굴&quot;은 해시가 <code>0000</code>으로 시작할 때까지 nonce를 바꿔가며 반복 계산하는 것 — 이것이 작업증명(PoW)의 실체입니다. 실제
        비트코인은 난이도가 훨씬 높아 전 세계 전용 장비가 동원됩니다.
      </p>
    </div>
  );
}

/* ---------------- 3. Gas calculator ---------------- */
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
    <div className="demo">
      <div className="demo-title">▶ 실습 3 — 가스 비용 계산기</div>
      <p className="demo-desc">
        2026년 4월 이더리움 메인넷 일평균 가스는 약 <b>0.5 gwei</b>였습니다. 2021년 혼잡기와 비교해 보세요.
      </p>
      <div className="grid g2" style={{ margin: 0 }}>
        <div>
          <label htmlFor="gwei">가스 가격 (gwei)</label>
          <input id="gwei" type="number" step="0.1" min="0" value={gwei} onChange={(e) => setGwei(+e.target.value)} />
          <label htmlFor="ethp">ETH 가격 (USD)</label>
          <input id="ethp" type="number" step="50" min="0" value={ethPrice} onChange={(e) => setEthPrice(+e.target.value)} />
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
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn ghost"
              onClick={() => {
                setGwei(0.5);
                setEthPrice(2350);
              }}
            >
              2026년
            </button>
            <button
              className="btn ghost"
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
      <div className="out">
        {gas.toLocaleString()} gas × {gwei} gwei = <b>{feeEth.toFixed(8)} ETH</b>
        <br />≈{" "}
        <b style={{ color: "var(--amber)", fontSize: 17 }}>
          ${usd < 0.01 ? usd.toFixed(4) : usd.toFixed(2)}
        </b>{" "}
        (약 {krw < 10 ? krw.toFixed(2) : Math.round(krw).toLocaleString()}원, 1,380원/USD 가정)
      </div>
      <p className="legend">
        출처: ethereum.org &quot;Building on Ethereum in 2026&quot;. 실제 비용은 ETH 가격·혼잡도·컨트랙트 복잡도에 따라 변동합니다.
      </p>
    </div>
  );
}

export const DEMOS: Record<string, () => React.JSX.Element> = {
  hash: HashDemo,
  chain: ChainDemo,
  gas: GasDemo,
};
