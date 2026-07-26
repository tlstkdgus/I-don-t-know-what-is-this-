"use client";

import { DEMOS } from "./Demos";

/**
 * 본문에 인터랙티브 실습을 끼워 넣습니다.
 *
 *   <Demo name="hash" />
 *
 * 새 데모는 components/Demos.tsx 의 DEMOS 레지스트리에 등록하면 바로 쓸 수 있습니다.
 */
export default function Demo({ name }: { name: string }) {
  const Cmp = DEMOS[name];
  if (!Cmp) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <div className="my-6 rounded-lg border border-dashed border-bad p-4 text-sm text-bad">
          등록되지 않은 데모: <code>{name}</code> — components/Demos.tsx 의 DEMOS를
          확인하세요.
        </div>
      );
    }
    return null;
  }
  return <Cmp />;
}
