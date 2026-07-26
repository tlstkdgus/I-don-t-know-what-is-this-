# CLAUDE.md

이 저장소에서 작업할 때 참고할 규칙입니다.
**UI를 만지기 전에 `DESIGN.md`를 먼저 읽으세요.** 색·타이포·컴포넌트 스펙의 출처입니다.

## 프로젝트 성격

한국어 개발 학습 노트이자 **저자 본인의 포트폴리오**입니다.
독자는 "동작하니까 넘어갔던 것을 다시 확인하려는 개발자"이고, 저자도 같은 사람입니다.
특정 직군(프론트엔드 등)을 전제하지 않습니다 — 사이트 카피에 직군을 박지 마세요.

채용 담당자가 볼 수 있다는 점이 문체에 영향을 줍니다. 다만 "취업", "포트폴리오" 같은
단어를 페이지에 쓰지는 않습니다. 대신 **출처 확인, 한계 서술, 일관된 분량**으로 드러냅니다.

사이트 이름은 `lib/site.ts` 한 곳에서만 관리합니다.

주제(Topic) → 챕터(Doc) 2단계 구조이고, 주제는 계속 늘어납니다.
현재: `web3`(13장 완료), `data`(파트 1~3인 1~10장 완료, 파트 4는 미작성),
`backend`·`cs`·`ai`(목차만 있음).

주제 간 경계가 겹치지 않게 유지하세요.
`backend`는 데이터를 *빠르고 안전하게 다루는 법*(인덱스·트랜잭션·커넥션 풀·캐시),
`data`는 데이터를 *어떻게 표현하고 의미를 붙일지*(모델링·그래프·검색·계보),
`ai`는 *모델이 데이터를 다루는 법*(토크나이저·어텐션·RAG 파이프라인)입니다.
임베딩은 「어떻게 만들어지는가」가 `ai`, 「저장소로 어떻게 운영하는가」가 `data`입니다.

## 작업 방식

사용자가 정리할 내용을 던져주면, 그걸 `content/{topic}/{slug}.ts`의 `Block[]` 데이터로
옮기고 `lib/content.ts`에 항목을 등록하는 식입니다. 사용자가 마크업을 직접 쓰지 않습니다.

## 절대 규칙

1. **의존성을 함부로 추가하지 마세요.** 현재 스택은 아래가 전부입니다.
   여기서 더 늘리려면 사용자에게 먼저 확인하세요.

   - `next` `react` `react-dom`
   - `tailwindcss@4` + `@tailwindcss/postcss` — 스타일
   - `pretendard` — 본문 폰트 (npm에서 self-host, 외부 요청 없음)
   - `shiki` — 빌드 타임 코드 하이라이팅

   **MDX는 걷어냈습니다.** 다시 넣지 마세요.

2. **본문은 데이터입니다.** `content/{topic}/{slug}.ts`가 `Block[]`을 default export 합니다.
   타입은 `lib/blocks.ts`에 있습니다. JSX가 아니라 데이터이므로 코드 예제에
   `{`, `${`, `<`를 넣어도 이스케이프가 필요 없습니다.

3. **사실을 지어내지 마세요.** 수치·날짜·버전은 전부 출처를 확인한 값입니다 (web3는 2026년 7월 기준).
   새로 추가하거나 갱신할 때는 반드시 웹에서 확인하고, 출처를 `legend` 블록이나 참고자료 절에 남기세요.

4. **`lib/content.ts`가 단일 출처입니다.** 주제·챕터의 순서·제목·slug는 여기서만 바꿉니다.
   헤더, 사이드바, 검색, 이전/다음 네비게이션, `generateStaticParams`가 전부 이 파일을 읽습니다.

5. **색은 `DESIGN.md`가 정합니다.** 액센트 블루(`--accent`)는 링크·포커스·선택에만 쓰고
   배경이나 버튼 채움으로 쓰지 않습니다. 의미색(`tip`/`warn`/`bad`/`fe`)은 새 색조를 만들지 않고
   스펙의 gradient 계열에서 빌려 씁니다. 그라디언트 스포트라이트 카드는 **페이지당 1–2개**까지입니다.

## 아키텍처 메모

- **서버/클라이언트 경계**: 페이지와 `Blocks` 렌더러는 서버 컴포넌트(SSG)입니다.
  상호작용이 필요한 조각(`CodeBlock` 복사 버튼, `Tabs`, `Demo`, `Search`, `Sidebar`,
  `ThemeToggle`, `ReadMark`, `Quiz`)만 `"use client"`입니다.

- **코드 하이라이팅**: `lib/highlight.ts`가 Shiki 하이라이터를 모듈 단위로 캐시합니다.
  페이지가 전부 SSG라서 이 작업은 빌드 타임에만 돌고, 하이라이팅 JS는 클라이언트로 나가지 않습니다.
  `defaultColor: false`라 색이 CSS 변수로 나오고 `globals.css`가 테마별로 전환합니다.

- **디자인 토큰**: `app/globals.css` 상단의 CSS 변수가 원본이고, `@theme inline`이 그걸 Tailwind
  유틸리티로 노출합니다(`bg-canvas`, `text-ink-muted`, `border-hairline`, `text-body`,
  `rounded-pill` …). 색·크기를 바꾸려면 CSS 변수만 고치세요.

- **타이포**: Pretendard Variable 동적 서브셋을 npm 패키지에서 self-host 합니다.
  크기·자간은 `DESIGN.md`를 따르되 **line-height만 본문 계열에서 늘렸습니다.**
  Framer의 1.30은 마케팅 카피 기준이고 여기는 한글 장문을 읽는 곳입니다.
  음수 트래킹은 브랜드 시그니처라 그대로 둡니다.

- **테마**: 다크가 기본이자 정체성입니다. 라이트는 Framer 스펙 밖의 '읽기 모드'로,
  구조·계층은 같고 대비만 뒤집습니다. `layout.tsx`의 인라인 스크립트가 hydration 전에
  적용해 깜빡임을 막습니다. 이 스크립트를 건드리면 FOUC가 생깁니다.

- **진도 저장**: `localStorage` + 커스텀 이벤트(`kirok-progress-change`)로 사이드바와 동기화.
  키는 `"topic/slug"` 형식입니다. 서버 상태 없음. 로그인을 넣는다면 `lib/progress.ts`를 교체합니다.

- **라우팅**: `/[topic]`과 `/[topic]/[slug]` 둘 다 `dynamicParams = false`입니다.
  `/glossary`·`/quiz`는 정적 세그먼트라 `[topic]`보다 우선합니다.

## 콘텐츠 작성

`content/{topic}/{slug}.ts` 가 `Block[]` 을 default export 합니다. 블록 종류:

| `t` | 필드 | 용도 |
| --- | --- | --- |
| `p` `h2` `h3` `h4` `legend` | `md` | 문단 · 제목 · 각주 |
| `ul` `ol` | `items` | 목록 |
| `table` | `head` `rows` | 표 (`head: []` 면 헤더 없음) |
| `code` | `lang` `src` `caption?` | 코드 블록 (복사 버튼 자동) |
| `callout` | `tone?` `title?` `body` | 강조 박스. tone이 곧 의미 |
| `grid` | `cols?` `items` | 나란히 배치 |
| `card` | `title?` `tone?` `body` | grid 안의 칸 |
| `stat` | `n` `l` | 큰 수치 하나 (출처 필수) |
| `flow` | `items` | 흐름도. `"본문\|보조설명"` |
| `tabs` | `tabs[{label, body}]` | 코드 예제 여러 벌 |
| `demo` | `name` | `components/Demos.tsx`의 DEMOS 키 |
| `figure` | `svg` `caption?` | SVG 도식 (원본 마크업 문자열) |
| `hr` | — | 구분선 |

`md` 필드의 인라인 문법 — `**굵게**` `*기울임*` `` `코드` `` `[링크](/경로)` `~~취소선~~`.
파서는 `lib/blocks.ts`의 `parseInline`, 렌더러는 `components/Inline.tsx`입니다.

`tone`: `tip`(잘 되는 것) · `warn`(주의) · `bad`(안 되는 것) · `fe`(프론트엔드 매핑) · `note`.

## 문체 가이드

- 존댓말, 담백하게. 과장·감탄사·이모지 남발 금지.
- 낯선 개념은 **이미 아는 것에 매핑**해서 설명 (`tone: "fe"` 활용).
  예: ABI ↔ OpenAPI, 인덱서 ↔ read replica, 서명 로그인 ↔ JWT.
- 장점만 쓰지 않습니다. 한계와 실패 사례를 같은 비중으로 씁니다.
- 코드 주석은 한국어. `⚠️`로 실무 함정을 표시.
- **직군을 전제하지 않습니다.** "프론트엔드 개발자라면", "우리 같은 백엔드는" 같은 표현 대신
  구체적인 도구·패턴을 직접 부릅니다 ("React를 써봤다면", "REST에 익숙하다면").
  기존 web3 챕터 본문의 프론트엔드 언급은 wagmi/viem을 다루는 실제 주제라 그대로 둡니다.

## 자주 하는 작업

**챕터 추가**
```
1. content/{topic}/{slug}.ts 작성 (Block[] default export)
2. lib/content.ts 의 docs 배열에 항목 추가 (topic·slug가 경로와 일치해야 함)
3. npm run build 로 정적 경로 생성 확인
```

**주제 추가**
```
1. lib/content.ts 의 topics 배열에 항목 추가
2. status: "planned" 면 outline만 있으면 됩니다 (주제 페이지가 목차를 렌더)
3. 첫 글을 쓰면 status를 "active"로 바꾸고 docs에 등록
```

**데모 추가**
```
1. components/Demos.tsx 에 컴포넌트 작성 + DEMOS 레지스트리에 등록
2. 본문에 { t: "demo", name: "이름" } 블록 삽입
```

**검증**
```
npm run build   # 타입 체크 + 정적 생성이 전부 통과해야 함
```

## 남은 작업 아이디어

- [ ] OG 이미지 생성 (`app/opengraph-image.tsx`) — 그라디언트 스포트라이트 스타일로
- [ ] 챕터 내 목차(TOC) — `h2`/`h3` 블록을 훑어 우측 고정 네비 (데이터라서 쉬움)
- [ ] 검색을 본문 전문 검색으로 확장 (현재는 제목·설명·태그만) — `plain()` 활용
- [ ] `sitemap.ts`, `robots.ts`
- [ ] 실습 4번: 실제 퍼블릭 RPC로 최신 블록·가스 조회 (`viem` 추가 필요 — 의존성 확인받을 것)
- [ ] `backend`·`cs`·`ai` 주제의 첫 챕터 작성
- [ ] `data` 파트 4 「운영과 신뢰」 — 11 데이터 계보 · 12 데이터 계약 · 13 개인정보와 데이터 최소화.
      `lib/content.ts`에 `p4` 파트만 등록돼 있고 `docs`에는 아직 없습니다 (빈 파트는 렌더되지 않음).
      13장은 개인정보보호법·가명정보 조항 개정이 잦으니 반드시 최신 확인 후 인용하고,
      「법률 자문이 아님」을 본문에 명시할 것.
- [ ] `data` 3장 테이블 포맷 현황(Iceberg/Delta/Hudi) 재확인 — 2026년 7월 기준으로 적었습니다
