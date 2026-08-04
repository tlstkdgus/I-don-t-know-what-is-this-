import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "p",
    md: "**데이터베이스**란, 컴퓨터가 정보를 정리해서 저장해두고 나중에 빠르게 찾아 쓸 수 있게 만든 시스템입니다. 은행 앱을 열면 내 잔고가 곧바로 뜨는 것도, 쇼핑몰에서 상품을 검색하면 결과가 나오는 것도 전부 뒤에서 데이터베이스가 일하고 있는 겁니다. 이번 장부터 다룰 \"데이터 모델\"이란, **그 정보를 어떤 모양으로 정리해서 저장할지에 대한 방식**을 말합니다.",
  },
  {
    t: "p",
    md: "이 방식들의 역사는 성능 경쟁이 아니라 **무엇을 포기하고 무엇을 얻을 것인가**를 반복해서 고민해온 과정입니다. 지금 가장 널리 쓰이는 방식(관계형 데이터베이스)이 왜 기본값이 됐는지 알면, 그 기본값을 벗어나야 할 때가 언제인지도 함께 보입니다.",
  },

  { t: "h3", md: "지금 방식이 실제로 해결한 문제" },
  {
    t: "p",
    md: "1970년 에드거 코드가 지금 흔히 쓰는 \"관계형\" 방식을 제안하기 전에는, 저장된 정보를 다시 꺼내려면 **그 정보가 실제로 어떻게 저장돼 있는지부터 알아야 했습니다.** \"부서 서류를 찾고, 거기 달린 참조 표시를 따라 직원 서류로 넘어간다\"는 식이었죠 — 종이 서류철에서 \"이 서류 뒤에 저 서류가 물리적으로 붙어있다\"는 순서를 외워야만 찾을 수 있는 것과 비슷합니다. 저장 방식이 조금만 바뀌어도, 그 방식을 전제로 짜둔 모든 프로그램이 한꺼번에 망가졌습니다.",
  },
  {
    t: "p",
    md: "관계형 방식은 \"**무엇을 원하는가**\"와 \"**어떻게 찾는가**\"를 분리했습니다. 원하는 조건만 말하면(\"이름이 김철수인 사람의 잔고\"), 실제로 그걸 어떤 순서로 찾아갈지는 데이터베이스가 알아서 최적의 방법을 정합니다. 나중에 검색을 더 빠르게 하는 장치(색인, [다음 장](/data/normalization) 이후에서 다룸)를 새로 추가해도, 조건을 묻는 방식 자체는 그대로 씁니다.",
  },
  {
    t: "callout",
    tone: "fe",
    title: "일상 비유로 한 문장",
    body: [
      {
        t: "p",
        md: "식당에서 \"이거 주세요\"라고 메뉴만 말하면, 실제로 어떤 순서로 조리할지는 주방이 알아서 정합니다. 손님이 조리 순서까지 일일이 지시할 필요가 없죠. 관계형 방식이 하는 일도 같습니다 — \"원하는 결과\"만 조건으로 말하면, \"어떻게 찾을지\"는 데이터베이스가 맡습니다. 그래서 \"내가 직접 순서를 짜면 더 빠를 텐데\"라는 아쉬움이 가끔 있지만, 대신 저장 방식이 바뀌어도 요청하는 쪽 코드는 안 깨진다는 큰 이점을 얻습니다.",
      },
    ],
  },

  { t: "h3", md: "\"다른 방식\"들이 던진 도전(NoSQL)" },
  {
    t: "p",
    md: "2000년대 후반, 관계형이 아닌 여러 방식(통틀어 **NoSQL**이라 부릅니다)이 등장해 세 가지를 내세웠습니다: 컴퓨터 한 대를 더 강력하게 만드는 대신 여러 대로 나눠 부담을 분산하기 쉬움(수평 확장), 저장할 데이터의 모양을 미리 엄격하게 정해두지 않아도 됨(스키마 유연성), 그리고 빠른 개발 속도. 그 대가로 내놓은 것은 **여러 표에 나뉜 정보를 하나로 합쳐 보는 기능(조인)**과, **여러 단계의 작업을 \"전부 성공하거나 전부 취소되거나\"로 묶는 기능(트랜잭션)**이었습니다.",
  },
  { t: "p", md: "시간이 지나며 많은 팀이 다시 관계형으로 돌아왔습니다. 자주 언급되는 이유는 세 가지입니다." },
  {
    t: "ul",
    items: [
      "**\"합쳐 보는 기능\"을 포기하면, 그 일을 결국 프로그램 코드가 떠맡게 됩니다.** 데이터베이스가 하던 일을 사람이 짠 코드가 대신하는 셈인데, 대개 더 느리고 더 자주 틀립니다",
      "**\"전부 성공하거나 전부 취소\" 기능을 포기하면, 중간에 실패했을 때의 뒷정리를 직접 처리해야 합니다.** 이게 생각보다 훨씬 까다롭습니다",
      "**여러 대로 나눠야 할 만큼 큰 규모에 실제로 도달하는 서비스는 생각보다 드뭅니다.** 그 규모에 도달하기도 전에, 이미 그 선택 때문에 치르는 비용부터 떠안게 됩니다",
    ],
  },
  {
    t: "p",
    md: "게다가 요즘은 관계형 데이터베이스도 모양이 자유로운 데이터를 상당 부분 함께 저장할 수 있게 됐습니다(PostgreSQL의 `JSONB` 등). \"모양이 자유로워야 하니까 NoSQL을 써야 한다\"는 이유가 예전보다 훨씬 좁아진 것입니다.",
  },
  {
    t: "legend",
    md: "다만 \"대부분 돌아왔다\"는 건 정식으로 집계된 통계가 아니라, 업계에서 반복적으로 관찰되는 흐름입니다. 정확한 수치처럼 인용하지 마세요.",
  },

  { t: "h3", md: "그래도 저마다 확실히 이기는 좁은 영역이 있습니다" },
  {
    t: "figure",
    caption: "같은 정보라도 담는 모양이 다릅니다. 모양이 곧 \"무엇을 빨리 할 수 있는가\"를 결정합니다.",
    svg: `<svg viewBox="0 0 660 254" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="다섯 가지 데이터 모델의 구조 비교">
  <g font-family="ui-sans-serif, system-ui">
    <text x="70" y="24" text-anchor="middle" font-size="13.5" font-weight="600" fill="var(--ink)">관계형</text>
    <rect x="18" y="36" width="104" height="76" rx="8" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <line x1="18" y1="56" x2="122" y2="56" stroke="var(--ink-dim)" stroke-width="1.5"/>
    <line x1="18" y1="75" x2="122" y2="75" stroke="var(--hairline)" stroke-width="1.2"/>
    <line x1="18" y1="94" x2="122" y2="94" stroke="var(--hairline)" stroke-width="1.2"/>
    <line x1="53" y1="36" x2="53" y2="112" stroke="var(--hairline)" stroke-width="1.2"/>
    <line x1="88" y1="36" x2="88" y2="112" stroke="var(--hairline)" stroke-width="1.2"/>
    <text x="70" y="134" text-anchor="middle" font-size="11.5" fill="var(--ink-muted)">줄과 칸이 있는 표</text>

    <text x="205" y="24" text-anchor="middle" font-size="13.5" font-weight="600" fill="var(--ink)">문서형</text>
    <rect x="153" y="36" width="104" height="76" rx="8" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="166" y="58" font-family="ui-monospace, monospace" font-size="10.5" fill="var(--ink)">{ 이름: …</text>
    <text x="175" y="77" font-family="ui-monospace, monospace" font-size="10.5" fill="var(--ink)">주소: {…}</text>
    <text x="175" y="96" font-family="ui-monospace, monospace" font-size="10.5" fill="var(--ink)">주문: [ … ]</text>
    <text x="205" y="134" text-anchor="middle" font-size="11.5" fill="var(--ink-muted)">한 덩어리로 통째</text>

    <text x="340" y="24" text-anchor="middle" font-size="13.5" font-weight="600" fill="var(--ink)">컬럼형</text>
    <rect x="296" y="36" width="24" height="76" rx="5" fill="var(--fe)" fill-opacity="0.25"/>
    <rect x="328" y="36" width="24" height="76" rx="5" fill="var(--fe)" fill-opacity="0.6"/>
    <rect x="360" y="36" width="24" height="76" rx="5" fill="var(--fe)" fill-opacity="0.25"/>
    <text x="340" y="134" text-anchor="middle" font-size="11.5" fill="var(--ink-muted)">칸 단위로 모아둠</text>

    <text x="475" y="24" text-anchor="middle" font-size="13.5" font-weight="600" fill="var(--ink)">그래프</text>
    <line x1="450" y1="52" x2="500" y2="52" stroke="var(--ink-dim)" stroke-width="1.8"/>
    <line x1="450" y1="52" x2="450" y2="96" stroke="var(--ink-dim)" stroke-width="1.8"/>
    <line x1="450" y1="52" x2="500" y2="96" stroke="var(--ink-dim)" stroke-width="1.8"/>
    <line x1="500" y1="52" x2="500" y2="96" stroke="var(--ink-dim)" stroke-width="1.8"/>
    <circle cx="450" cy="52" r="10" fill="var(--surface-2)" stroke="var(--fe)" stroke-width="2.2"/>
    <circle cx="500" cy="52" r="10" fill="var(--surface-2)" stroke="var(--fe)" stroke-width="2.2"/>
    <circle cx="450" cy="96" r="10" fill="var(--surface-2)" stroke="var(--fe)" stroke-width="2.2"/>
    <circle cx="500" cy="96" r="10" fill="var(--surface-2)" stroke="var(--fe)" stroke-width="2.2"/>
    <text x="475" y="134" text-anchor="middle" font-size="11.5" fill="var(--ink-muted)">점과 선의 연결</text>

    <text x="590" y="24" text-anchor="middle" font-size="13.5" font-weight="600" fill="var(--ink)">키-값</text>
    <rect x="534" y="42" width="50" height="26" rx="6" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="559" y="59" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="var(--ink)">key</text>
    <line x1="584" y1="55" x2="598" y2="55" stroke="var(--ink-dim)" stroke-width="1.8"/>
    <rect x="598" y="42" width="44" height="26" rx="6" fill="var(--fe)" fill-opacity="0.35"/>
    <rect x="534" y="80" width="50" height="26" rx="6" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="559" y="97" text-anchor="middle" font-family="ui-monospace, monospace" font-size="10" fill="var(--ink)">key</text>
    <line x1="584" y1="93" x2="598" y2="93" stroke="var(--ink-dim)" stroke-width="1.8"/>
    <rect x="598" y="80" width="44" height="26" rx="6" fill="var(--fe)" fill-opacity="0.35"/>
    <text x="590" y="134" text-anchor="middle" font-size="11.5" fill="var(--ink-muted)">이름표 하나로 꺼냄</text>

    <line x1="16" y1="166" x2="644" y2="166" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="16" y="196" font-size="13" font-weight="600" fill="var(--ink)">모양이 다르면 잘하는 일도 달라집니다.</text>
    <text x="16" y="220" font-size="12" fill="var(--ink-muted)">표는 조건 검색에, 문서는 통째로 읽기에, 컬럼형은 한 칸만 전부 훑는 통계에,</text>
    <text x="16" y="240" font-size="12" fill="var(--ink-muted)">그래프는 연결을 따라가기에, 키-값은 정해진 이름표 하나로 즉시 꺼내는 데 강합니다.</text>
  </g>
</svg>`,
  },
  {
    t: "table",
    head: ["방식", "잘하는 것", "못하는 것"],
    rows: [
      ["**관계형**", "정확함이 중요한 거래 처리, 미리 정해두지 않은 다양한 조건 검색", "여러 단계로 이어지는 관계 탐색, 초대형 쓰기 작업"],
      ["**문서형**", "한 덩어리로 통째로 읽고 쓰는 정보", "여러 문서를 넘나드는 검색"],
      ["**컬럼형**", "대량의 데이터를 한꺼번에 훑어 통계 내기", "하나씩 자주 수정하는 작업"],
      ["**그래프**", "관계를 여러 단계 따라가며 탐색하기([5장](/data/graph-model))", "전체를 다 훑는 집계, 대량 쓰기"],
      ["**키-값**", "정해진 키 하나로 아주 빠르게 찾기", "조건을 걸어 검색하기"],
    ],
  },
  {
    t: "p",
    md: "이 표에서 봐야 할 건 \"뭐가 제일 좋은가\"가 아니라, **각 방식이 무엇을 포기했길래 그 자리에서 이기는가**입니다. 키-값 방식이 빠른 이유는 조건 검색 기능을 포기했기 때문이고, 컬럼형이 통계 집계에 강한 이유는 하나씩 자주 고치는 걸 포기했기 때문입니다.",
  },

  { t: "h3", md: "자주 나오는 오해 하나" },
  {
    t: "callout",
    tone: "bad",
    title: "\"NoSQL은 저장 규칙(스키마)이 없다\"",
    body: [
      {
        t: "p",
        md: "규칙 자체가 사라진 게 아니라 **데이터베이스에서 프로그램 코드 쪽으로 옮겨간 것**뿐입니다. 강제되는 규칙이 없으면, 시간이 지나면서 여러 버전의 데이터 모양이 한 저장소 안에 뒤섞이고, 그걸 전부 구분해서 처리하는 분기 코드가 쌓입니다. \"규칙을 미리 안 정했다\"가 아니라, \"불러올 때마다 매번 그 자리에서 규칙을 다시 맞추는\" 셈입니다.",
      },
      {
        t: "p",
        md: "\"우리는 데이터 모양이 자주 바뀌니까 이런 방식을 쓴다\"는 판단은, 사실 **제대로 설계를 안 한 상태를 \"유연함\"이라고 부른 경우**가 많습니다. 정말로 모양이 계속 열려 있어야 하는 부분(외부에서 받아온 원본 데이터, 사용자가 마음대로 추가하는 항목)만 관계형 방식 안에서 자유로운 칸(`JSONB` 같은 것) 하나로 따로 격리해두는 편이 대개 더 낫습니다.",
      },
    ],
  },
  {
    t: "p",
    md: "다음 장에서는 관계형 방식 안에서의 첫 번째 중요한 판단, 즉 [정보를 얼마나 잘게 나눠 정리할지, 그리고 어디서 그 규칙을 깰지](/data/normalization)를 봅니다.",
  },
];

export default blocks;
