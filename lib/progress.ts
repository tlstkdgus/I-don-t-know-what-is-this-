/**
 * 읽음 표시. localStorage + 커스텀 이벤트로 사이드바와 동기화합니다.
 * 서버 상태는 없습니다. 로그인 기능을 넣는다면 이 파일을 교체하게 됩니다.
 *
 * 키는 "topic/slug" 형식입니다 (주제별로 진도가 따로 집계되도록).
 */
const KEY = "kirok-progress";
export const PROGRESS_EVENT = "kirok-progress-change";

export const docKey = (topic: string, slug: string) => `${topic}/${slug}`;

export function readProgress(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

function write(next: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* 사파리 프라이빗 모드 등에서 실패할 수 있습니다 */
  }
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
}

export function toggleProgress(topic: string, slug: string): string[] {
  const k = docKey(topic, slug);
  const cur = readProgress();
  const next = cur.includes(k) ? cur.filter((s) => s !== k) : [...cur, k];
  write(next);
  return next;
}

/** 특정 주제의 읽은 챕터만 */
export const readIn = (all: string[], topic: string) =>
  all.filter((k) => k.startsWith(`${topic}/`));

export function resetProgress() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
}
