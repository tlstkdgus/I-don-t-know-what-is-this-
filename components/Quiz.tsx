"use client";

import Link from "next/link";
import { useState } from "react";
import { bySlug } from "@/lib/chapters";
import { questions } from "@/lib/quiz";

export default function Quiz() {
  const [picked, setPicked] = useState<(number | null)[]>(questions.map(() => null));

  const answered = picked.filter((p) => p !== null).length;
  const correct = picked.filter((p, i) => p === questions[i].answer).length;

  function pick(qi: number, oi: number) {
    if (picked[qi] !== null) return;
    setPicked((prev) => prev.map((v, i) => (i === qi ? oi : v)));
  }

  return (
    <>
      <div className="card tip" style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 30, fontWeight: 800, color: "var(--accent)", lineHeight: 1.1 }}>
            {correct} / {questions.length}
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>정답 · {answered}문항 응답</div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(answered / questions.length) * 100}%` }} />
          </div>
        </div>
        {answered > 0 && (
          <button className="btn ghost" onClick={() => setPicked(questions.map(() => null))}>
            다시 풀기
          </button>
        )}
      </div>

      {questions.map((q, qi) => {
        const p = picked[qi];
        const ch = bySlug(q.chapter);
        return (
          <div className="quiz-card" key={qi}>
            <p className="quiz-q">
              Q{qi + 1}. {q.q}
            </p>
            {q.opts.map((o, oi) => {
              let cls = "quiz-opt";
              if (p !== null) {
                if (oi === q.answer) cls += " right";
                else if (oi === p) cls += " wrong";
              }
              return (
                <button key={oi} className={cls} onClick={() => pick(qi, oi)} disabled={p !== null}>
                  {o}
                </button>
              );
            })}
            {p !== null && (
              <div className="quiz-exp">
                <b style={{ color: p === q.answer ? "var(--accent)" : "var(--rose)" }}>
                  {p === q.answer ? "정답입니다." : `오답 — 정답은 ${q.answer + 1}번입니다.`}
                </b>{" "}
                {q.exp}
                {ch && (
                  <>
                    {" "}
                    <Link href={`/chapters/${ch.slug}`}>→ {ch.num}장 «{ch.title}»에서 복습</Link>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
