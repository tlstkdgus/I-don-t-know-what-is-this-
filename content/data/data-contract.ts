import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "p",
    md: "어느 날 아침 대시보드가 텅 비어 있습니다. 원인을 파보면 대개 이렇습니다. **다른 팀이 칸 이름을 바꿨거나, 값의 형식을 바꿨거나, 아예 표를 옮겼습니다.** 그쪽은 자기 서비스 코드를 정상적으로 고쳤을 뿐이고, 그 데이터를 누가 가져다 쓰는지 몰랐습니다.",
  },
  {
    t: "p",
    md: "이건 실수가 아니라 **구조의 문제**입니다. 데이터를 만드는 쪽과 쓰는 쪽 사이에 아무 약속이 없으면, 만드는 쪽은 자기가 무엇을 약속했는지조차 모릅니다. **데이터 계약**은 이 약속을 문서가 아니라 **기계가 검사할 수 있는 형태로** 못 박아두자는 접근입니다.",
  },
  {
    t: "callout",
    tone: "fe",
    title: "일상 비유로 한 문장",
    body: [
      {
        t: "p",
        md: "부품 납품을 생각해보세요. \"지름 5mm, 오차 ±0.1mm, 매주 월요일 1만 개 납품\"이라는 규격서가 있으면, 납품업체가 마음대로 4mm로 바꿀 수 없습니다. 바꾸려면 먼저 알리고 합의해야 하죠. 규격서가 없으면 어떻게 될까요 — 업체는 자기 사정으로 규격을 바꾸고, 그 부품을 받아 조립하던 공장 라인이 멈춥니다. **데이터 계약은 데이터판 납품 규격서**입니다.",
      },
    ],
  },

  { t: "h3", md: "계약이 없을 때 실제로 벌어지는 일" },
  {
    t: "figure",
    caption: "약속이 없으면 문제를 쓰는 쪽이 먼저 발견합니다 — 그것도 이미 망가진 뒤에.",
    svg: `<svg viewBox="0 0 640 268" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="데이터 계약이 없을 때와 있을 때의 차이">
  <g font-family="ui-sans-serif, system-ui" font-size="11" fill="currentColor">
    <text x="20" y="20" font-size="12" fill-opacity="0.62">계약이 없을 때</text>

    <rect x="20" y="32" width="112" height="34" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="76" y="53" text-anchor="middle">만드는 팀</text>

    <rect x="264" y="32" width="112" height="34" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="320" y="53" text-anchor="middle">데이터</text>

    <rect x="508" y="32" width="112" height="34" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="564" y="53" text-anchor="middle">쓰는 팀</text>

    <line x1="132" y1="49" x2="258" y2="49" stroke="currentColor" stroke-opacity="0.35"/>
    <polygon points="258,49 250,45 250,53" fill="currentColor" fill-opacity="0.35"/>
    <line x1="376" y1="49" x2="502" y2="49" stroke="currentColor" stroke-opacity="0.35"/>
    <polygon points="502,49 494,45 494,53" fill="currentColor" fill-opacity="0.35"/>

    <text x="196" y="88" text-anchor="middle" font-size="10" fill-opacity="0.6">칸 이름을 바꿈</text>
    <text x="196" y="103" text-anchor="middle" font-size="10" fill-opacity="0.45">(악의 없음. 그냥 몰랐음)</text>
    <text x="440" y="88" text-anchor="middle" font-size="10" fill-opacity="0.6">다음 날 아침 화면이 빔</text>
    <text x="440" y="103" text-anchor="middle" font-size="10" fill-opacity="0.45">사용자가 먼저 발견</text>

    <line x1="20" y1="126" x2="620" y2="126" stroke="currentColor" stroke-opacity="0.15"/>

    <text x="20" y="152" font-size="12" fill-opacity="0.62">계약이 있을 때</text>

    <rect x="20" y="164" width="112" height="34" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="76" y="185" text-anchor="middle">만드는 팀</text>

    <rect x="252" y="158" width="136" height="46" rx="8" fill="none" stroke="currentColor" stroke-opacity="0.65"/>
    <text x="320" y="177" text-anchor="middle" font-size="11.5">계약</text>
    <text x="320" y="194" text-anchor="middle" font-size="9.5" fill-opacity="0.6">모양 · 품질 · 주인 · 변경절차</text>

    <rect x="508" y="164" width="112" height="34" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="564" y="185" text-anchor="middle">쓰는 팀</text>

    <line x1="132" y1="181" x2="246" y2="181" stroke="currentColor" stroke-opacity="0.45"/>
    <polygon points="246,181 238,177 238,185" fill="currentColor" fill-opacity="0.45"/>
    <line x1="388" y1="181" x2="502" y2="181" stroke="currentColor" stroke-opacity="0.45"/>
    <polygon points="502,181 494,177 494,185" fill="currentColor" fill-opacity="0.45"/>

    <text x="320" y="230" text-anchor="middle" font-size="10" fill-opacity="0.6">약속을 어기는 변경은 배포 단계에서 자동으로 막힘</text>
    <text x="320" y="248" text-anchor="middle" font-size="10" fill-opacity="0.45">→ 쓰는 쪽이 아니라 만드는 쪽이, 사고 전에 알게 됨</text>
  </g>
</svg>`,
  },
  {
    t: "p",
    md: "핵심은 **누가 언제 문제를 발견하느냐**가 뒤집힌다는 것입니다. 계약이 없으면 데이터를 쓰는 쪽이 이미 망가진 뒤에 발견합니다. 계약이 있으면 만드는 쪽이 배포하기 전에 \"이 변경은 약속 위반\"이라는 경고를 받습니다.",
  },

  { t: "h3", md: "계약서에는 무엇이 들어가나" },
  {
    t: "p",
    md: "\"칸 이름과 자료형\"만 적는 건 계약이 아니라 그냥 [3장에서 본 저장 규칙](/data/schema-on-read)입니다. 계약이 되려면 다섯 가지가 필요합니다.",
  },
  {
    t: "figure",
    caption: "위 세 개만 있으면 저장 규칙이고, 아래 두 개가 붙어야 계약이 됩니다.",
    svg: `<svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="데이터 계약의 다섯 가지 구성 요소">
  <g font-family="ui-sans-serif, system-ui" font-size="12" fill="currentColor">
    <rect x="20" y="14" width="600" height="42" rx="8" fill="none" stroke="currentColor" stroke-opacity="0.28"/>
    <text x="36" y="33" font-size="12">① 구조 — 어떤 칸이 있고 각각 무슨 자료형인가</text>
    <text x="36" y="49" font-size="10" fill-opacity="0.55">주문번호는 정수, 결제금액은 소수점 없는 정수, 국가코드는 2글자 문자열</text>

    <rect x="20" y="64" width="600" height="42" rx="8" fill="none" stroke="currentColor" stroke-opacity="0.28"/>
    <text x="36" y="83" font-size="12">② 의미 — 그 칸이 정확히 무엇을 뜻하는가</text>
    <text x="36" y="99" font-size="10" fill-opacity="0.55">"결제금액"은 할인 후·세금 포함 금액이며 환불은 반영하지 않는다</text>

    <rect x="20" y="114" width="600" height="42" rx="8" fill="none" stroke="currentColor" stroke-opacity="0.28"/>
    <text x="36" y="133" font-size="12">③ 품질 기준 — 어디까지가 정상인가</text>
    <text x="36" y="149" font-size="10" fill-opacity="0.55">주문번호는 비어 있을 수 없고 중복도 없다 · 금액은 0 이상 · 매일 09시까지 갱신</text>

    <rect x="20" y="164" width="600" height="42" rx="8" fill="none" stroke="currentColor" stroke-opacity="0.6"/>
    <text x="36" y="183" font-size="12">④ 책임자 — 문제가 생기면 누구에게 연락하는가</text>
    <text x="36" y="199" font-size="10" fill-opacity="0.62">담당 팀과 연락처. 이게 없으면 나머지 넷이 다 있어도 굴러가지 않습니다</text>

    <rect x="20" y="214" width="600" height="42" rx="8" fill="none" stroke="currentColor" stroke-opacity="0.6"/>
    <text x="36" y="233" font-size="12">⑤ 변경 절차 — 바꿀 때 어떻게 알리는가</text>
    <text x="36" y="249" font-size="10" fill-opacity="0.62">칸 추가는 자유 · 칸 삭제나 의미 변경은 최소 30일 전 공지 후 합의</text>
  </g>
</svg>`,
  },
  {
    t: "p",
    md: "특히 **④와 ⑤가 계약의 본질**입니다. 앞의 셋은 \"지금 이 데이터가 어떻게 생겼는가\"를 적은 것이지만, 뒤의 둘은 \"앞으로 어떻게 할 것인가\"에 대한 약속입니다. 앞의 셋만 있으면 문제가 생겼을 때 여전히 아무도 책임지지 않습니다.",
  },

  { t: "h3", md: "ODCS — 계약서 양식의 공통 규격" },
  {
    t: "p",
    md: "계약서를 팀마다 자기 방식으로 쓰면, 그걸 자동으로 검사하는 도구를 팀마다 새로 만들어야 합니다. 그래서 **ODCS**(Open Data Contract Standard, 공개 데이터 계약 표준)라는 공통 양식이 만들어졌습니다.",
  },
  {
    t: "ul",
    items: [
      "**특정 회사에 종속되지 않는 공개 표준**입니다. 리눅스 재단 AI & Data 산하 **Bitol** 프로젝트가 관리합니다",
      "원래는 PayPal이 사내에서 쓰던 계약서 양식이었는데, 2023년 11월 30일 AIDA 사용자 그룹과 리눅스 재단이 손잡고 공개 표준으로 만들었습니다",
      "계약서 하나가 **YAML 파일 한 장**입니다. 앞서 본 다섯 가지(구조·의미·품질·책임자·변경절차)와 데이터가 실제로 어디 있는지를 한 파일에 적습니다",
      "2026년 8월 기준 최신 버전은 **v3.1.0**입니다",
    ],
  },
  {
    t: "p",
    md: "실제 계약서가 어떻게 생겼는지 감을 잡기 위한 예시입니다 — YAML 문법을 몰라도, 항목 이름만 따라 읽으면 무엇을 약속하고 있는지 그대로 보입니다.",
  },
  {
    t: "code",
    lang: "yaml",
    src: `
# 개념을 보여주기 위해 단순화한 예시입니다 (실제 ODCS 필드명과는 다를 수 있음)
name: 주문_결제완료
version: 2.1.0
owner: payments-team          # ④ 책임자
description: 결제가 최종 승인된 주문. 환불은 별도 데이터에 있음.   # ② 의미

schema:                        # ① 구조
  - name: order_id
    type: bigint
    required: true
    unique: true
  - name: paid_amount
    type: integer
    description: 할인 적용 후·세금 포함 금액 (원 단위, 소수점 없음)
  - name: paid_at
    type: timestamp

quality:                       # ③ 품질 기준
  - rule: paid_amount >= 0
  - rule: order_id 는 비어 있을 수 없음
  - freshness: 매일 09:00 KST 까지 전일자 데이터 적재 완료

changePolicy:                  # ⑤ 변경 절차
  addColumn: 자유롭게 가능
  removeColumn: 30일 전 공지 + 사용처 전체 합의
  changeMeaning: 새 칸을 만들고 기존 칸은 유지 (조용히 뜻만 바꾸지 않음)`,
  },
  {
    t: "legend",
    md: "출처: [Open Data Contract Standard 공식 문서](https://bitol-io.github.io/open-data-contract-standard/) · [Bitol 프로젝트](https://bitol.io/). 버전 정보는 2026년 8월 확인 기준이며, 표준이 갱신될 수 있으니 도입 전 최신 버전을 확인하세요.",
  },

  { t: "h3", md: "계약을 실제로 지키게 만드는 법" },
  {
    t: "p",
    md: "계약서를 써놓기만 하면 아무 일도 일어나지 않습니다. **어긴 변경이 실제로 막혀야** 계약이 됩니다. 보통 두 지점에서 검사합니다.",
  },
  {
    t: "flow",
    items: [
      "코드를 고침|칸 이름 변경 등",
      "배포 전 자동 검사|계약과 대조",
      "위반이면 배포 차단|여기서 막는 게 핵심",
      "통과하면 배포",
      "실제 데이터도 주기적 검사|품질 기준 위반 시 알림",
    ],
  },
  {
    t: "ul",
    items: [
      "**배포 전 검사** — 바꾼 코드가 만들어낼 데이터 모양이 계약과 다르면 배포 자체를 막습니다. 사고를 *예방*하는 지점입니다",
      "**운영 중 검사** — 실제로 쌓이는 데이터가 품질 기준(빈 값, 중복, 갱신 시각)을 지키는지 주기적으로 확인합니다. 사고를 *빨리 발견*하는 지점입니다",
    ],
  },
  {
    t: "callout",
    tone: "tip",
    title: "[11장 계보](/data/lineage)와 짝을 이룹니다",
    body: [
      {
        t: "p",
        md: "계보는 \"이걸 고치면 **누가** 영향받는지\"를 알려주고, 계약은 \"그 사람들에게 **무엇을** 약속했는지\"를 알려줍니다. 계보만 있으면 영향받는 곳은 알아도 그게 약속 위반인지 판단할 수 없고, 계약만 있으면 약속은 알아도 누구에게 알려야 할지 모릅니다. 둘 다 있어야 \"이 변경은 A팀과의 약속을 어기므로 먼저 합의가 필요하다\"까지 자동으로 판정됩니다.",
      },
    ],
  },

  { t: "h3", md: "한계 — 계약이 실패하는 이유" },
  {
    t: "callout",
    tone: "bad",
    title: "계약은 기술이 아니라 권한의 문제입니다",
    body: [
      {
        t: "p",
        md: "\"칸을 지우려면 30일 전에 공지한다\"는 조항은, **그걸 어겼을 때 실제로 배포가 막히거나 누군가 책임을 질 때만** 의미가 있습니다. 데이터를 만드는 팀 입장에서는 계약이 순수한 제약이고 얻는 게 없으므로, 강제할 권한 없이 도입하면 대부분 형식적인 문서만 남습니다. [6장 온톨로지](/data/ontology)와 [7장 시맨틱 레이어](/data/semantic-layer)에서 반복해서 나온 것과 같은 문제입니다.",
      },
    ],
  },
  {
    t: "callout",
    tone: "bad",
    title: "너무 엄격하면 아무도 안 바꾸게 됩니다",
    body: [
      {
        t: "p",
        md: "모든 변경에 전원 합의를 요구하면, 실제로는 변경을 안 하는 게 아니라 **계약 밖에서 몰래 새 표를 만들어 쓰기 시작합니다.** 그러면 계약이 있는 데이터와 없는 데이터가 공존하는 더 나쁜 상태가 됩니다. 그래서 실무에서는 대체로 \"칸 추가는 자유, 삭제와 의미 변경만 합의\"처럼 **깨질 수 있는 변경만 골라서 막습니다.**",
      },
    ],
  },
  {
    t: "callout",
    tone: "warn",
    title: "도입 순서에 대한 제안",
    body: [
      {
        t: "ol",
        items: [
          "**사고가 실제로 났던 데이터 한두 개**부터 시작합니다. 전사 도입을 먼저 선언하면 거의 실패합니다",
          "**책임자와 변경 절차부터** 적습니다. 구조·품질 기준은 나중에 채워도 되지만, 이 둘이 없으면 계약이 아닙니다",
          "**배포 차단을 실제로 켭니다.** 경고만 띄우는 단계에 오래 머물면 아무도 안 봅니다",
          "그 뒤에 대상을 넓힙니다",
        ],
      },
    ],
  },
  {
    t: "p",
    md: "다음 장에서는 이 모든 것이 특히 무겁게 걸리는 데이터, 즉 [개인정보를 다루는 원칙](/data/privacy)을 봅니다.",
  },
];

export default blocks;
