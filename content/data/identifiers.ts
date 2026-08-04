import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "p",
    md: "\"식별자(ID)\"란 표의 각 줄을 서로 구별하기 위해 붙이는 고유 번호입니다. 이 번호는 한 번 정하면 사실상 못 바꿉니다. 주소창에 뜨는 URL, 다른 프로그램에 정보를 전달할 때, 외부 서비스와 연동할 때, 기록에, 심지어 고객이 캡처해둔 화면 속에까지 그대로 박제되기 때문입니다. 그래서 처음에 30분 더 고민할 값어치가 있는 몇 안 되는 설계 결정입니다.",
  },

  { t: "h3", md: "이미 있는 값을 그대로 대표 번호로 쓰지 않기" },
  {
    t: "p",
    md: "이메일 주소, 사업자번호, 학번, 사번처럼 **현실에 이미 있는 값을 그대로 대표 번호(기본키)로 쓰고 싶은 유혹**이 있습니다. 하지만 \"이건 절대 안 바뀔 것 같다\"는 값은 결국 바뀝니다.",
  },
  {
    t: "ul",
    items: [
      "**이메일** — 사용자가 직접 바꿀 수 있고, 계정을 합치는 일도 생깁니다",
      "**사업자번호** — 법인 전환이나 사업장 분리로 바뀝니다",
      "**주민등록번호** — 애초에 저장 자체를 안 하는 게 맞습니다",
      "**\"이 조합은 겹칠 리 없다\"** — 거의 예외 없이, 나중에 겹치는 경우가 나옵니다",
    ],
  },
  {
    t: "p",
    md: "이런 값을 대표 번호로 쓰면, 값이 바뀌는 순간 그 값을 참조하고 있던 **다른 모든 표를 다 같이 고쳐야 합니다.** 그래서 실무에서는 컴퓨터가 임의로 붙여주는 전용 번호(대리키)를 대표 번호로 쓰고, 이메일 같은 값은 \"겹치면 안 된다\"는 제약만 걸어둡니다. 겹치지 않는다는 건 보장하되, 다른 표가 그 값을 직접 가리키게는 하지 않는다는 뜻입니다.",
  },

  { t: "h3", md: "자동 증가 번호의 두 가지 문제" },
  {
    t: "p",
    md: "가장 흔한 방식은 새 줄이 추가될 때마다 1, 2, 3처럼 순서대로 번호를 자동으로 붙이는 것입니다. 간단하지만 두 가지 문제가 있습니다.",
  },
  { t: "h4", md: "1. 여러 컴퓨터가 나눠 처리할 때" },
  {
    t: "p",
    md: "여러 컴퓨터가 동시에 번호를 매기려고 하면 순서가 꼬입니다. 여러 매표소에서 동시에 대기표를 뽑는데 번호가 겹치지 않게 하려면 결국 한 곳에서 번호표를 관리해야 하는 것과 같은 상황이라, 그 한 곳이 병목이 되거나, 나눠서 관리하려면 운영이 번거로워집니다.",
  },
  { t: "h4", md: "2. 정보가 새어 나감 — 이쪽이 더 자주 간과됩니다" },
  { t: "p", md: "번호가 순서대로 붙는다는 것 자체가 정보입니다." },
  {
    t: "code",
    lang: "text",
    src: `
/orders/1047   ← 이 서비스의 누적 주문이 1047건이라는 뜻
/users/23      ← 23번째로 가입한 사람이라는 뜻`,
  },
  {
    t: "p",
    md: "경쟁 회사가 일주일 간격으로 두 번 가입해보고 그 번호 차이를 보면, **일주일간의 가입자 수가 그대로 드러납니다.** 번호가 순서대로라는 건, 1번부터 하나씩 올려가며 접근해보는 방식으로 전체 자료를 긁어가기도 쉽다는 뜻입니다. 접근 권한 확인이 허술한 곳이 하나라도 있으면, 그걸 통해 전체 데이터를 다 가져갈 수 있습니다.",
  },

  { t: "h3", md: "무작위 번호(UUID)의 함정과 해법" },
  {
    t: "p",
    md: "UUID라는, 완전히 무작위로 생성되는 긴 번호를 쓰면 위 두 문제는 사라집니다. 대신 **찾아보기 성능을 망가뜨립니다.**",
  },
  {
    t: "p",
    md: "데이터베이스의 \"인덱스\"(색인)는 책 뒤에 붙은 찾아보기 페이지와 같습니다 — 처음부터 끝까지 다 뒤지지 않고도 원하는 항목을 빨리 찾게 해주는데, 이 색인은 항상 정렬된 상태로 유지됩니다. 번호가 순서대로 붙는 방식이면 새 항목은 항상 맨 끝에만 추가되니 간단합니다. 하지만 완전히 무작위인 번호는 매번 색인의 아무 위치에나 끼어듭니다 — 사전에 새 단어를 알파벳 순서에 맞춰 끼워 넣을 때마다 뒷부분 전체를 밀어서 다시 정리해야 하는 것과 비슷한 부담이 매번 생깁니다. 게다가 최근에 추가된 데이터끼리 가까이 모여있지 않게 되어, \"자주 쓰는 걸 손 닿는 곳에 모아두는\" 효율(캐시 활용)도 떨어집니다. 데이터를 대량으로 밀어 넣을 때 이 차이가 체감될 정도로 큽니다.",
  },
  {
    t: "figure",
    caption: "색인은 항상 정렬된 상태로 유지됩니다. 새 항목이 어디에 끼어드느냐가 성능을 가릅니다.",
    svg: `<svg viewBox="0 0 660 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="순차 번호와 무작위 번호의 색인 삽입 차이">
  <g font-family="ui-sans-serif, system-ui">
    <text x="16" y="24" font-size="12.5" font-weight="600" fill="var(--tip)">순서대로 붙는 번호</text>

    <rect x="16" y="36" width="62" height="34" rx="8" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="47" y="58" text-anchor="middle" font-family="ui-monospace, monospace" font-size="12" fill="var(--ink)">101</text>
    <rect x="84" y="36" width="62" height="34" rx="8" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="115" y="58" text-anchor="middle" font-family="ui-monospace, monospace" font-size="12" fill="var(--ink)">102</text>
    <rect x="152" y="36" width="62" height="34" rx="8" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="183" y="58" text-anchor="middle" font-family="ui-monospace, monospace" font-size="12" fill="var(--ink)">103</text>
    <rect x="220" y="36" width="62" height="34" rx="8" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="251" y="58" text-anchor="middle" font-family="ui-monospace, monospace" font-size="12" fill="var(--ink)">104</text>
    <rect x="288" y="36" width="62" height="34" rx="8" fill="var(--surface-2)" stroke="var(--tip)" stroke-width="2.5"/>
    <text x="319" y="58" text-anchor="middle" font-family="ui-monospace, monospace" font-size="12" font-weight="600" fill="var(--ink)">105</text>

    <path d="M319 88 L319 74" stroke="var(--tip)" stroke-width="2" fill="none"/>
    <polygon points="319,70 314,80 324,80" fill="var(--tip)"/>
    <text x="374" y="52" font-size="12.5" font-weight="600" fill="var(--ink)">새 항목은 항상 맨 끝에만 추가</text>
    <text x="374" y="72" font-size="11.5" fill="var(--ink-muted)">건드리는 부분이 늘 한 곳 — 빠릅니다</text>

    <line x1="16" y1="118" x2="644" y2="118" stroke="var(--hairline)" stroke-width="1.5"/>

    <text x="16" y="152" font-size="12.5" font-weight="600" fill="var(--bad)">완전 무작위 번호</text>

    <rect x="16" y="164" width="62" height="34" rx="8" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="47" y="186" text-anchor="middle" font-family="ui-monospace, monospace" font-size="12" fill="var(--ink)">1a3f</text>
    <rect x="84" y="164" width="62" height="34" rx="8" fill="var(--surface-2)" stroke="var(--bad)" stroke-width="2.5"/>
    <text x="115" y="186" text-anchor="middle" font-family="ui-monospace, monospace" font-size="12" font-weight="600" fill="var(--ink)">4b2c</text>
    <rect x="152" y="164" width="62" height="34" rx="8" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="183" y="186" text-anchor="middle" font-family="ui-monospace, monospace" font-size="12" fill="var(--ink)">7d81</text>
    <rect x="220" y="164" width="62" height="34" rx="8" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="251" y="186" text-anchor="middle" font-family="ui-monospace, monospace" font-size="12" fill="var(--ink)">9e04</text>
    <rect x="288" y="164" width="62" height="34" rx="8" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="319" y="186" text-anchor="middle" font-family="ui-monospace, monospace" font-size="12" fill="var(--ink)">c5f7</text>

    <path d="M115 216 L115 202" stroke="var(--bad)" stroke-width="2" fill="none"/>
    <polygon points="115,198 110,208 120,208" fill="var(--bad)"/>
    <text x="374" y="180" font-size="12.5" font-weight="600" fill="var(--ink)">새 항목이 매번 한가운데 끼어듦</text>
    <text x="374" y="200" font-size="11.5" fill="var(--ink-muted)">뒤쪽을 밀어 정리해야 하고, 최근 데이터가 흩어짐</text>

    <text x="16" y="262" font-size="11.5" fill="var(--ink-dim)">사전에 새 단어를 알파벳 순서에 맞춰 끼워 넣을 때마다 뒷장을 다시 정리해야 하는 상황과 같습니다.</text>
  </g>
</svg>`,
  },
  {
    t: "p",
    md: "해법은 **시간 순서대로 정렬되는 무작위 번호**를 쓰는 것입니다. 앞부분에 시각 정보가 들어가 있으면, 최근에 만들어진 번호일수록 뒤쪽에 정렬되므로 위 그림의 첫 번째 경우처럼 동작합니다.",
  },
  {
    t: "table",
    head: ["", "시간순 정렬", "표준 여부", "비고"],
    rows: [
      ["**UUIDv4**", "✗", "국제 표준(RFC 9562)", "완전 무작위라 색인 효율이 떨어짐"],
      ["**UUIDv7**", "✓", "국제 표준(RFC 9562)", "번호 앞부분에 생성 시각 정보가 들어있음"],
      ["**ULID**", "✓", "비공식 표준", "26자로 짧고 사람이 읽기 편함"],
      ["**Snowflake ID**", "✓", "비공식 표준", "어느 컴퓨터가 발급했는지까지 번호에 포함"],
    ],
  },
  {
    t: "p",
    md: "UUID의 공식 규격은 2024년 5월 **RFC 9562**로 새로 갱신되면서 예전 규격을 대체했고, 이때 시간순 정렬이 가능한 **UUIDv7**이 표준에 새로 들어갔습니다. 새로 시작한다면 UUIDv7이 무난한 선택입니다. 표준이고, 정렬도 되고, 여러 프로그래밍 언어에서 충분히 지원됩니다.",
  },
  {
    t: "legend",
    md: "출처: [RFC 9562 — Universally Unique IDentifiers (UUIDs)](https://www.rfc-editor.org/info/rfc9562/)(2024년 5월 7일 발행) · [PostgreSQL 18 릴리스 노트](https://www.postgresql.org/docs/current/release-18.html)(`uuidv7()` 내장 함수 추가). 2026년 7월 확인.",
  },
  {
    t: "callout",
    tone: "warn",
    title: "시간순 정렬이 공짜는 아닙니다",
    body: [
      {
        t: "p",
        md: "번호 앞부분에 생성 시각이 들어있다는 건, **그 번호만 봐도 생성 시각을 알 수 있다**는 뜻입니다. 자동 증가 번호만큼 심하지는 않지만, 여전히 정보가 조금 새어 나갑니다. 가입 시점을 숨겨야 하는 서비스라면, 겉으로 노출되는 값은 완전 무작위(UUIDv4)를 쓰고 내부 관리용 대표 번호만 시간순 정렬 방식을 쓰는 조합도 가능합니다.",
      },
    ],
  },

  { t: "h3", md: "내부용 번호와 외부에 보여주는 번호를 분리하는 방법" },
  { t: "p", md: "실무에서 자주 쓰는 패턴을 SQL 문법을 몰라도 이해되게 풀면 이렇습니다 — \"내부 관리용 번호\"와 \"외부에 보여줄 번호\"를 아예 따로 둡니다." },
  {
    t: "code",
    lang: "sql",
    src: `
CREATE TABLE orders (
  id         BIGSERIAL PRIMARY KEY,   -- 내부에서 표끼리 연결할 때만 씀. 절대 밖으로 노출 안 함
  public_id  UUID NOT NULL UNIQUE     -- 화면 주소·외부 연동에 노출되는 값
             DEFAULT uuidv7(),
  ...
);

-- 표끼리 연결(조인)은 짧은 정수로 (색인이 작고 빠름)
-- 외부 노출은 추측 불가능한 값으로`,
    caption: "PostgreSQL 18부터는 uuidv7()이 내장 함수로 제공됩니다. 그 이전 버전은 별도 확장이나 프로그램에서 직접 만들어야 합니다.",
  },
  {
    t: "p",
    md: "장점은 명확합니다. 내부 색인은 작고 빠르게 유지되면서, 외부에는 아무 정보도 새어나가지 않습니다. 대가는 **조회할 때 변환이 한 단계 더 필요하다**는 것입니다. 외부용 번호로 요청이 들어오면 내부용 번호로 바꾸는 과정이 매번 필요하므로, 외부용 번호에도 별도의 색인이 반드시 있어야 하고, 자주 조회되는 값은 따로 임시 저장(캐시)해두는 경우도 많습니다.",
  },
  {
    t: "callout",
    tone: "fe",
    title: "일상 비유로 한 문장",
    body: [
      {
        t: "p",
        md: "우편함에 적힌 번지수만 보고 그 동네에 집이 몇 채 있는지, 최근에 몇 번째로 지어진 집인지까지 알 수 있다면 조금 이상하겠죠. 겉으로 드러나는 주소(웹사이트 URL 등)에 어떤 값을 쓸지 정하는 건, 사실 그 뒤에서 데이터를 어떻게 관리할지와 직결된 결정입니다. 그 값의 수명은 곧 서비스 전체의 수명만큼 길어집니다.",
      },
    ],
  },

  { t: "h3", md: "이 내용의 한계" },
  {
    t: "p",
    md: "지금까지는 **데이터가 한 대의 컴퓨터에 다 들어가는 경우** 기준입니다. 데이터가 너무 커져서 여러 대의 컴퓨터에 나눠 저장하게 되면(샤딩), 오히려 시간순으로 정렬되는 번호가 문제를 일으킵니다. 최근 데이터가 전부 같은 한 대의 컴퓨터로만 몰리기 때문입니다(핫스팟). 그럴 땐 번호 앞자리에 \"어느 컴퓨터에 저장할지\"를 나타내는 값을 섞어 넣는 설계가 필요합니다. 규모에 따라 정답이 뒤집히는 영역입니다.",
  },
];

export default blocks;
