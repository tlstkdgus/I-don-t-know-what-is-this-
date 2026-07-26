/**
 * 사이트 정체성. 헤더·브라우저 탭·메타데이터·푸터가 전부 여기를 읽습니다.
 * 이름을 바꾸려면 이 파일만 고치면 됩니다.
 */
export const SITE = {
  /** 헤더 워드마크 · 브라우저 탭 */
  name: "sanghyeon.dev",

  /** 히어로 아이브로우 · 탭 제목 보조 */
  tagline: "개발 공부 기록",

  /** 메타 description (검색 결과에 노출) */
  description:
    "대충 알고 넘어갔던 것들을 주제별로 다시 정리합니다. Web3, 백엔드·인프라, CS 기초, AI·ML.",

  /** 푸터 링크. 비우면 표시되지 않습니다. */
  github: "https://github.com/tlstkdgus",
} as const;
