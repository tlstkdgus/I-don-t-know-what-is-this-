const KEY = "w3-progress";
export const PROGRESS_EVENT = "w3-progress-change";

export function readProgress(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleProgress(slug: string): string[] {
  const cur = readProgress();
  const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
  return next;
}

export function resetProgress() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
}
