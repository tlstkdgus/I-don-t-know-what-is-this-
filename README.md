# Web3 완전 정복

블록체인을 아예 모르는 **프론트엔드 개발자**를 위한 Web3 학습 사이트.
해시 함수부터 wagmi/viem 실전 코드, 2026년 생태계 현황과 비판론까지 13개 챕터.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 정적 생성 19페이지
```

Node 18.18+ 필요. 의존성은 `next`, `react`, `react-dom`뿐이며 CSS 프레임워크를 쓰지 않습니다.

## 구조

```
app/
  layout.tsx              루트 레이아웃 · 테마 부트스트랩 스크립트 · 메타데이터
  page.tsx                랜딩 (히어로 + 파트별 챕터 카드)
  globals.css             전체 스타일. CSS 변수로 다크/라이트 테마 관리
  chapters/[slug]/page.tsx  챕터 페이지 (SSG)
  quiz/page.tsx           셀프 체크 퀴즈
  glossary/page.tsx       용어집
components/
  Header.tsx              상단바 · 테마 토글 · 검색 트리거 (client)
  Sidebar.tsx             좌측 목차 · 진도율 바 (client)
  Search.tsx              ⌘K 검색 모달 (client)
  ChapterBody.tsx         HTML 렌더 + 데모 주입 + 코드 복사 버튼 (client)
  Demos.tsx               인터랙티브 실습 3종 (client)
  Quiz.tsx                퀴즈 채점 UI (client)
  ReadMark.tsx            학습 완료 토글 (client)
content/
  *.html                  챕터 본문 (HTML 조각)
lib/
  chapters.ts             챕터 메타데이터 — 순서·제목·태그의 단일 출처
  quiz.ts                 퀴즈 문항
  progress.ts             localStorage 진도 관리
```

## 콘텐츠 작성 방식

챕터 본문은 TSX가 아니라 `content/{slug}.html`의 **순수 HTML 조각**입니다.
JSX 이스케이프 문제(`{`, `class`, 자기닫힘 태그) 없이 코드 예제를 그대로 쓸 수 있어서 이렇게 했습니다.

빌드 시 서버 컴포넌트가 `fs.readFileSync`로 읽어 정적 생성합니다.

### 인터랙티브 데모 삽입

본문 중간에 아래 마커를 넣으면 그 자리에 React 컴포넌트가 렌더링됩니다.

```html
<div data-demo="hash"></div>
```

사용 가능한 이름: `hash`, `chain`, `gas` — `components/Demos.tsx`의 `DEMOS` 레지스트리에 정의돼 있습니다.

### 사용 가능한 CSS 클래스

| 클래스 | 용도 |
| --- | --- |
| `.card` / `.card.tip` / `.card.warn` / `.card.bad` / `.card.fe` | 강조 박스 (기본/팁/주의/위험/프론트엔드 연결) |
| `.grid.g2` `.g3` `.g4` | 반응형 그리드 |
| `.stat` + `.n` `.l` | 숫자 지표 카드 |
| `.flow` + `.n` `.a` | 가로 흐름 다이어그램 |
| `.lead` | 도입 문단 |
| `.legend` | 그림·표 아래 각주 |
| `.badge` `.badge.y` `.badge.r` | 인라인 라벨 |
| `.kw` `.st` `.cm` `.fn` `.nu` `.ty` | 코드 하이라이트 (`<pre>` 안에서 `<span>`으로) |

표는 `<table>`만 쓰면 클라이언트에서 자동으로 가로 스크롤 래퍼가 씌워집니다.
`<pre>`에는 복사 버튼이 자동으로 붙습니다.

## 챕터 추가하기

1. `content/새슬러그.html` 생성
2. `lib/chapters.ts`의 `chapters` 배열에 항목 추가 (`slug`가 파일명과 일치해야 함)
3. 끝 — 사이드바·검색·이전/다음 네비게이션·정적 경로가 자동 반영됩니다

## 테마

`html[data-theme="dark"|"light"]` 속성으로 전환합니다.
`app/layout.tsx`의 인라인 스크립트가 렌더 전에 `localStorage` → OS 설정 순으로 읽어 적용하므로 깜빡임이 없습니다.

메인 컬러는 민트 그린 `--mint: #4cc9a0`.

## 콘텐츠 출처

2026년 7월 기준으로 검증했습니다. 주요 출처는 13장 말미에 정리돼 있습니다.

- [Building on Ethereum in 2026 — ethereum.org](https://ethereum.org/latest/building-on-ethereum-in-2026/)
- [wagmi 공식 문서](https://wagmi.sh)
- [L2BEAT](https://l2beat.com) · [DeFiLlama](https://defillama.com)

## 라이선스

학습 목적 자료입니다. 투자 조언이 아닙니다.
