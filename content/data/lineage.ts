import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "p",
    md: "회의에서 이런 질문이 나옵니다. **\"이 숫자, 어디서 나온 거예요?\"** 답하려면 그 화면이 어떤 표를 봤고, 그 표는 어떤 표에서 만들어졌고, 그 표는 또 어디서 왔는지를 거슬러 올라가야 합니다. 이 \"어디서 와서 어디로 흘러갔는지\"의 기록을 **데이터 계보**(lineage, 리니지)라고 부릅니다.",
  },
  {
    t: "callout",
    tone: "fe",
    title: "일상 비유로 한 문장",
    body: [
      {
        t: "p",
        md: "식당에서 식중독 사고가 났다고 해봅시다. 원인을 찾으려면 \"이 요리에 뭐가 들어갔나 → 그 재료는 어느 납품업체에서 왔나 → 그 업체는 어느 농장에서 받았나\"를 거꾸로 따라가야 합니다. 반대로 오염된 농장이 먼저 발견됐다면, 이번엔 \"그 농장 재료가 들어간 요리가 뭐뭐인가\"를 앞으로 따라가서 전부 회수해야 하죠. **데이터 계보는 데이터판 원산지 추적표**입니다.",
      },
    ],
  },

  { t: "h3", md: "계보는 두 방향으로 씁니다" },
  {
    t: "p",
    md: "위 비유의 두 방향이 실제로 계보의 두 가지 용도입니다. 각각 이름이 따로 있습니다.",
  },
  {
    t: "figure",
    caption: "같은 계보 그래프를 거꾸로 보면 원인 추적, 앞으로 보면 영향 범위 파악이 됩니다.",
    svg: `<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="데이터 계보의 상류 추적과 하류 영향 분석">
  <g font-family="ui-sans-serif, system-ui" font-size="11" fill="currentColor">
    <rect x="14" y="70" width="104" height="34" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="66" y="91" text-anchor="middle" font-size="11">결제 원본 로그</text>

    <rect x="14" y="126" width="104" height="34" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="66" y="147" text-anchor="middle" font-size="11">회원 가입 기록</text>

    <rect x="176" y="98" width="104" height="34" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.55"/>
    <text x="228" y="119" text-anchor="middle" font-size="11">일별 매출 집계</text>

    <rect x="338" y="70" width="112" height="34" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="394" y="91" text-anchor="middle" font-size="11">경영 대시보드</text>

    <rect x="338" y="126" width="112" height="34" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="394" y="147" text-anchor="middle" font-size="11">월간 정산 보고서</text>

    <rect x="506" y="98" width="112" height="34" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="562" y="119" text-anchor="middle" font-size="11">외부 제출 자료</text>

    <line x1="118" y1="87" x2="170" y2="110" stroke="currentColor" stroke-opacity="0.4"/>
    <line x1="118" y1="143" x2="170" y2="121" stroke="currentColor" stroke-opacity="0.4"/>
    <line x1="280" y1="110" x2="332" y2="87" stroke="currentColor" stroke-opacity="0.4"/>
    <line x1="280" y1="121" x2="332" y2="143" stroke="currentColor" stroke-opacity="0.4"/>
    <line x1="450" y1="143" x2="500" y2="121" stroke="currentColor" stroke-opacity="0.4"/>

    <polygon points="170,110 162,106 162,114" fill="currentColor" fill-opacity="0.4"/>
    <polygon points="170,121 162,117 162,125" fill="currentColor" fill-opacity="0.4"/>
    <polygon points="332,87 324,83 324,91" fill="currentColor" fill-opacity="0.4"/>
    <polygon points="332,143 324,139 324,147" fill="currentColor" fill-opacity="0.4"/>
    <polygon points="500,121 492,117 492,125" fill="currentColor" fill-opacity="0.4"/>

    <text x="228" y="42" text-anchor="middle" font-size="11" fill-opacity="0.75">← 거꾸로: "이 숫자 어디서 왔지?"</text>
    <text x="228" y="58" text-anchor="middle" font-size="10" fill-opacity="0.5">원인 추적 (상류)</text>

    <text x="450" y="200" text-anchor="middle" font-size="11" fill-opacity="0.75">앞으로: "이거 고치면 뭐가 깨지지?" →</text>
    <text x="450" y="216" text-anchor="middle" font-size="10" fill-opacity="0.5">영향 범위 파악 (하류)</text>

    <text x="20" y="240" font-size="10" fill-opacity="0.5">가운데 표 하나가 잘못되면, 오른쪽 세 곳이 전부 조용히 함께 틀려집니다.</text>
  </g>
</svg>`,
  },
  {
    t: "ul",
    items: [
      "**거꾸로 따라가기(상류 추적)** — \"이 숫자가 어디서 왔지?\" 값이 이상할 때 원인을 찾는 용도입니다",
      "**앞으로 따라가기(하류 영향 분석)** — \"이 표를 고치면 뭐가 깨지지?\" 변경 전에 파급 범위를 확인하는 용도입니다",
    ],
  },
  {
    t: "p",
    md: "두 번째가 특히 중요합니다. 계보가 없으면 **뭘 고쳐도 무엇이 깨질지 모르는 상태**가 됩니다. 그래서 아무도 손을 못 대고, 안 쓰는 표조차 무서워서 못 지우고, 결국 아무도 정리하지 않는 데이터가 계속 쌓입니다.",
  },

  { t: "h3", md: "표 단위냐, 칸 단위냐" },
  {
    t: "p",
    md: "계보를 어느 정도로 잘게 기록하느냐에 따라 쓸모가 크게 달라집니다.",
  },
  {
    t: "table",
    head: ["", "표 단위 계보", "칸(컬럼) 단위 계보"],
    rows: [
      ["기록하는 것", "\"A 표가 B 표를 만들었다\"", "\"A 표의 `가격` 칸이 B 표의 `매출` 칸에 쓰였다\""],
      ["답할 수 있는 질문", "어떤 표들이 엮여 있나", "이 칸 하나를 바꾸면 정확히 어디가 영향받나"],
      ["수집 난이도", "낮음", "높음 — 처리 코드를 실제로 해석해야 함"],
      ["현실", "대부분 여기까지는 확보됨", "여기부터가 진짜 쓸모 있지만 커버리지가 잘 안 나옴"],
    ],
  },
  {
    t: "p",
    md: "표 단위만 있으면 \"이 표가 30개 표에 영향을 준다\"까지는 알 수 있지만, 정작 **내가 바꾸려는 칸 하나가 그중 몇 개와 상관있는지는 모릅니다.** 30개를 전부 확인해야 하니 실질적으로는 없는 것과 크게 다르지 않은 상황이 자주 생깁니다.",
  },

  { t: "h3", md: "계보는 어떻게 모으는가" },
  {
    t: "p",
    md: "누가 이 기록을 만들어 주느냐가 이 분야의 핵심 문제입니다. 방법은 셋인데, 셋 다 약점이 뚜렷합니다.",
  },
  {
    t: "figure",
    caption: "세 가지 수집 방식. 실무에서는 보통 섞어 쓰고, 그래서 계보에 구멍이 생깁니다.",
    svg: `<svg viewBox="0 0 640 246" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="데이터 계보 수집 방식 세 가지 비교">
  <g font-family="ui-sans-serif, system-ui" font-size="12" fill="currentColor">
    <rect x="16" y="16" width="608" height="62" rx="9" fill="none" stroke="currentColor" stroke-opacity="0.3"/>
    <text x="32" y="40" font-size="12.5">① 코드를 읽어서 추론</text>
    <text x="32" y="60" font-size="10.5" fill-opacity="0.62">처리 쿼리문을 파싱해 관계를 뽑아냄 · 실행 안 해도 됨 · 동적으로 만들어지는 쿼리는 놓침</text>

    <rect x="16" y="90" width="608" height="62" rx="9" fill="none" stroke="currentColor" stroke-opacity="0.55"/>
    <text x="32" y="114" font-size="12.5">② 실행될 때 자동으로 보고받기</text>
    <text x="32" y="134" font-size="10.5" fill-opacity="0.62">처리 도구가 작업하며 스스로 기록을 남김 · 실제로 일어난 일이라 정확 · 도구가 지원해야만 가능</text>

    <rect x="16" y="164" width="608" height="62" rx="9" fill="none" stroke="currentColor" stroke-opacity="0.3"/>
    <text x="32" y="188" font-size="12.5">③ 사람이 직접 등록</text>
    <text x="32" y="208" font-size="10.5" fill-opacity="0.62">뭐든 기록 가능 · 그러나 반드시 뒤처짐 — 코드는 바뀌는데 문서는 안 바뀜</text>

    <text x="608" y="121" text-anchor="end" font-size="10" fill-opacity="0.55">← 표준이 생긴 지점</text>
  </g>
</svg>`,
  },
  {
    t: "p",
    md: "두 번째 방식(실행될 때 자동 보고)이 가장 정확한데, 문제는 **처리 도구마다 보고 형식이 제각각**이라는 것이었습니다. 도구를 바꾸면 계보도 처음부터 다시 모아야 했죠.",
  },

  { t: "h3", md: "OpenLineage — 보고 형식을 통일한 표준" },
  {
    t: "p",
    md: "**OpenLineage**는 이 \"보고 형식\"을 통일하자고 만든 공개 표준입니다. 리눅스 재단 산하 LF AI & Data 재단의 정식(Graduate) 프로젝트이고, 특정 회사 제품이 아니라 누구나 따를 수 있는 규격입니다.",
  },
  {
    t: "p",
    md: "구조는 단순합니다. 데이터 처리 작업 하나가 돌 때, 그 작업이 **시작(START) · 완료(COMPLETE) · 실패(FAIL) · 진행 중(RUNNING)** 같은 시점마다 \"나는 이런 작업이고, 이 데이터를 읽어서 저 데이터를 만들었다\"는 기록을 정해진 형식으로 내보냅니다. 이 기록을 받아 모으는 쪽은 어떤 도구가 보냈든 똑같이 처리할 수 있습니다.",
  },
  {
    t: "figure",
    caption: "형식이 통일되면, 보내는 쪽과 받는 쪽을 서로 자유롭게 갈아끼울 수 있습니다.",
    svg: `<svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="OpenLineage 표준의 구조">
  <g font-family="ui-sans-serif, system-ui" font-size="11" fill="currentColor">
    <text x="86" y="26" text-anchor="middle" font-size="11" fill-opacity="0.6">보내는 쪽 (처리 도구)</text>
    <rect x="26" y="38" width="120" height="26" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="86" y="55" text-anchor="middle">Spark</text>
    <rect x="26" y="72" width="120" height="26" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="86" y="89" text-anchor="middle">Airflow</text>
    <rect x="26" y="106" width="120" height="26" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="86" y="123" text-anchor="middle">dbt</text>
    <rect x="26" y="140" width="120" height="26" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="86" y="157" text-anchor="middle">Flink</text>

    <rect x="238" y="60" width="164" height="84" rx="10" fill="none" stroke="currentColor" stroke-opacity="0.6"/>
    <text x="320" y="92" text-anchor="middle" font-size="12.5">OpenLineage</text>
    <text x="320" y="112" text-anchor="middle" font-size="10" fill-opacity="0.6">공통 기록 형식</text>
    <text x="320" y="128" text-anchor="middle" font-size="9.5" fill-opacity="0.5">START · COMPLETE · FAIL</text>

    <text x="546" y="26" text-anchor="middle" font-size="11" fill-opacity="0.6">받는 쪽 (수집·시각화)</text>
    <rect x="486" y="55" width="120" height="26" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="546" y="72" text-anchor="middle">Marquez</text>
    <rect x="486" y="89" width="120" height="26" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="546" y="106" text-anchor="middle">카탈로그 제품들</text>
    <rect x="486" y="123" width="120" height="26" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
    <text x="546" y="140" text-anchor="middle">자체 구축 저장소</text>

    <line x1="150" y1="51" x2="232" y2="95" stroke="currentColor" stroke-opacity="0.3"/>
    <line x1="150" y1="85" x2="232" y2="99" stroke="currentColor" stroke-opacity="0.3"/>
    <line x1="150" y1="119" x2="232" y2="105" stroke="currentColor" stroke-opacity="0.3"/>
    <line x1="150" y1="153" x2="232" y2="110" stroke="currentColor" stroke-opacity="0.3"/>

    <line x1="406" y1="95" x2="482" y2="68" stroke="currentColor" stroke-opacity="0.3"/>
    <line x1="406" y1="102" x2="482" y2="102" stroke="currentColor" stroke-opacity="0.3"/>
    <line x1="406" y1="110" x2="482" y2="136" stroke="currentColor" stroke-opacity="0.3"/>

    <text x="320" y="192" text-anchor="middle" font-size="10" fill-opacity="0.55">한쪽을 바꿔도 반대쪽은 그대로 — 이게 표준을 만드는 이유입니다.</text>
  </g>
</svg>`,
  },
  {
    t: "p",
    md: "규격 자체는 확장 가능하게 설계돼 있어서, 기본 항목 외에 필요한 정보를 **덧붙임(facet)** 형태로 추가할 수 있습니다. 표준을 건드리지 않고도 각자 필요한 걸 실을 수 있다는 뜻입니다. 이 표준을 그대로 구현해둔 참조용 도구로 **Marquez**가 있어서, 표준이 실제로 어떻게 도는지 확인해볼 수 있습니다.",
  },
  {
    t: "legend",
    md: "출처: [OpenLineage 공식 문서](https://openlineage.io/docs/) · [LF AI & Data — OpenLineage](https://lfaidata.foundation/projects/openlineage/) · [OpenLineage GitHub](https://github.com/OpenLineage/OpenLineage). 2026년 8월 확인.",
  },

  { t: "h3", md: "그래서 실제로 무엇이 좋아지는가" },
  {
    t: "grid",
    cols: 2,
    items: [
      {
        t: "card",
        tone: "tip",
        title: "장애 원인 추적이 빨라집니다",
        body: [
          {
            t: "p",
            md: "\"어제부터 이 지표가 이상하다\"에서 시작해 거슬러 올라가면, 어느 단계에서 처리가 실패했거나 원본이 바뀌었는지를 몇 분 만에 좁힐 수 있습니다. 계보가 없으면 이 작업이 사람에게 물어보고 코드를 뒤지는 반나절짜리 일이 됩니다.",
          },
        ],
      },
      {
        t: "card",
        tone: "tip",
        title: "고칠 때 겁이 덜 납니다",
        body: [
          {
            t: "p",
            md: "칸 하나를 지우기 전에 그게 어디에 쓰이는지 확인할 수 있습니다. [2장](/data/normalization)에서 본 \"가격을 올렸더니 작년 매출이 바뀐\" 사고도, 계보가 있으면 배포 전에 영향 범위가 보입니다.",
          },
        ],
      },
      {
        t: "card",
        tone: "tip",
        title: "안 쓰는 데이터를 정리할 수 있습니다",
        body: [
          {
            t: "p",
            md: "아무도 참조하지 않는 표를 찾아낼 수 있습니다. 이건 저장 비용뿐 아니라 [13장](/data/privacy)에서 다룰 개인정보 최소화와도 직결됩니다 — 안 쓰는데 남아있는 개인정보가 가장 위험합니다.",
          },
        ],
      },
      {
        t: "card",
        tone: "tip",
        title: "규제 대응 근거가 됩니다",
        body: [
          {
            t: "p",
            md: "\"이 개인정보가 어디까지 흘러갔는지 증명하라\"는 요구에 답할 수 있습니다. 사람 기억에 의존하면 증명이 안 되고, 증명이 안 되면 안 했다고 간주됩니다.",
          },
        ],
      },
    ],
  },

  { t: "h3", md: "한계 — 계보가 있어도 못 하는 것" },
  {
    t: "callout",
    tone: "bad",
    title: "커버리지에 구멍이 나면 나머지도 못 믿습니다",
    body: [
      {
        t: "p",
        md: "계보 수집은 보통 주요 처리 도구에서만 자동으로 됩니다. 누군가 손으로 돌린 스크립트, 스프레드시트로 내려받아 가공한 뒤 다시 올린 데이터, 외부 업체가 보내준 파일 — 이런 경로는 기록에 안 남습니다. 그런데 **계보는 한 곳만 끊겨도 그 뒤가 전부 무의미해집니다.** \"80% 커버리지\"는 생각보다 훨씬 덜 쓸모 있습니다.",
      },
    ],
  },
  {
    t: "callout",
    tone: "bad",
    title: "\"어디서 왔는지\"는 알려줘도 \"왜 그런지\"는 못 알려줍니다",
    body: [
      {
        t: "p",
        md: "계보는 연결 관계를 보여줄 뿐, 그 계산이 **옳은지는 판단하지 않습니다.** \"이 매출 숫자가 저 표에서 왔다\"는 알려주지만, 그 표가 환불을 빼고 계산한 게 맞는지는 답해주지 않습니다. 그건 [7장 시맨틱 레이어](/data/semantic-layer)의 지표 정의와 [다음 장 데이터 계약](/data/data-contract)의 영역입니다.",
      },
      {
        t: "p",
        md: "그리고 계보 도구를 도입하는 것 자체가 조직 문제를 풀어주지도 않습니다. 그림이 아무리 예뻐도, **그 표의 주인이 누구인지 정해져 있지 않으면** 문제를 발견한 다음에 연락할 곳이 없습니다.",
      },
    ],
  },
  {
    t: "p",
    md: "그래서 다음 장에서는 \"이 데이터는 이런 모양이고, 이 사람이 책임지며, 바꿀 때는 이렇게 알린다\"를 **미리 약속으로 못 박는** [데이터 계약](/data/data-contract)을 봅니다.",
  },
];

export default blocks;
