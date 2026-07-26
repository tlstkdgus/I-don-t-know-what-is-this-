import Link from "next/link";

import Quiz from "@/components/Quiz";

export const metadata = {
  title: "셀프 체크 퀴즈",
  description:
    "Web3 이해도를 확인하는 퀴즈. 틀린 문제는 해당 챕터로 연결됩니다.",
};

export default function QuizPage() {
  return (
    <main className="mx-auto max-w-[75rem] px-5 pb-16 sm:px-8">
      <header className="py-16 sm:py-24">
        <p className="text-caption font-medium text-ink-dim">
          부록 ·{" "}
          <Link href="/web3" className="transition-colors hover:text-ink">
            Web3
          </Link>
        </p>
        <h1 className="mt-4 text-[2.5rem] font-medium leading-[1.02] tracking-[-0.05em] text-ink sm:text-display-lg">
          셀프 체크
        </h1>
        <p className="mt-6 max-w-[42ch] text-body-lg text-ink-muted">
          전부 읽었다면 아래 문제들이 풀려야 합니다. 선택지를 고르면 해설과
          복습할 챕터 링크가 나옵니다.
        </p>
      </header>

      <Quiz />
    </main>
  );
}
