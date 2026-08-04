import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "callout",
    tone: "warn",
    title: "먼저 밝혀둡니다 — 이 글은 법률 자문이 아닙니다",
    body: [
      {
        t: "p",
        md: "이 장은 데이터를 다루는 사람이 알아야 할 **개념과 사고방식**을 정리한 것입니다. 실제 사업에 적용할 판단이 필요하면 반드시 법률 전문가와 상의하세요. 개인정보 관련 법령과 지침은 개정이 잦고, 같은 조항도 상황에 따라 해석이 달라집니다. 아래 인용한 내용은 2026년 8월 기준으로 확인한 것이며, 지금 읽는 시점에는 이미 바뀌었을 수 있습니다.",
      },
    ],
  },
  {
    t: "p",
    md: "데이터를 다루는 일에서 가장 확실한 보안 대책은 의외로 단순합니다. **애초에 갖고 있지 않은 데이터는 유출될 수 없습니다.** 이 당연한 사실에서 출발하는 원칙이 데이터 최소화입니다.",
  },
  {
    t: "callout",
    tone: "fe",
    title: "일상 비유로 한 문장",
    body: [
      {
        t: "p",
        md: "친구가 여행 가면서 귀중품을 맡겼다고 해봅시다. 맡아주는 순간 그건 **자산이 아니라 부담**이 됩니다. 잃어버리면 물어줘야 하고, 잘 보관하려면 금고도 사야 하고, 언제 돌려줄지도 정해야 하죠. 그래서 현명한 사람은 \"꼭 필요한 것만, 꼭 필요한 기간만\" 맡습니다. 개인정보도 똑같습니다 — **모으는 순간 자산이 아니라 책임**이 됩니다.",
      },
    ],
  },
  {
    t: "p",
    md: "그런데 실무에서는 반대 방향의 힘이 훨씬 셉니다. \"나중에 분석할 때 필요할지도 모르니 일단 다 쌓아두자\"는 유혹이죠. [3장](/data/schema-on-read)에서 본 \"일단 다 넣기\" 방식이 그대로 개인정보에 적용되면, 아무도 안 쓰는데 유출되면 치명적인 데이터가 계속 쌓입니다.",
  },

  { t: "h3", md: "개인정보 · 가명정보 · 익명정보 — 같은 데이터의 세 단계" },
  {
    t: "p",
    md: "이 세 단어가 실무에서 가장 자주 혼동됩니다. 핵심 차이는 하나입니다. **누군가를 특정할 수 있느냐, 그리고 되돌릴 수 있느냐.**",
  },
  {
    t: "figure",
    caption: "오른쪽으로 갈수록 규제는 가벼워지고, 데이터의 쓸모도 함께 줄어듭니다. 공짜는 없습니다.",
    svg: `<svg viewBox="0 0 660 336" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="개인정보 가명정보 익명정보의 차이">
  <defs>
    <marker id="pv-ar" markerWidth="10" markerHeight="10" refX="9" refY="3.5" orient="auto">
      <path d="M0,0 L0,7 L9,3.5 z" fill="var(--ink-dim)"/>
    </marker>
  </defs>
  <g font-family="ui-sans-serif, system-ui">
    <rect x="16" y="16" width="192" height="150" rx="12" fill="var(--surface-2)" stroke="var(--bad)" stroke-width="2.5"/>
    <text x="112" y="44" text-anchor="middle" font-size="15" font-weight="600" fill="var(--ink)">개인정보</text>
    <text x="112" y="63" text-anchor="middle" font-size="11" fill="var(--bad)">누구인지 바로 알 수 있음</text>
    <text x="34" y="92" font-family="ui-monospace, monospace" font-size="11" fill="var(--ink)">김철수 · 1990-03-12</text>
    <text x="34" y="112" font-family="ui-monospace, monospace" font-size="11" fill="var(--ink)">010-1234-5678</text>
    <text x="34" y="132" font-family="ui-monospace, monospace" font-size="11" fill="var(--ink)">강남구 역삼동</text>
    <text x="112" y="155" text-anchor="middle" font-size="10.5" fill="var(--ink-muted)">규제 가장 무거움</text>

    <rect x="234" y="16" width="192" height="150" rx="12" fill="var(--surface-2)" stroke="var(--warn)" stroke-width="2.5"/>
    <text x="330" y="44" text-anchor="middle" font-size="15" font-weight="600" fill="var(--ink)">가명정보</text>
    <text x="330" y="63" text-anchor="middle" font-size="11" fill="var(--warn)">추가 정보가 있어야 알 수 있음</text>
    <text x="252" y="92" font-family="ui-monospace, monospace" font-size="11" fill="var(--ink)">U-8471 · 1990년대생</text>
    <text x="252" y="112" font-family="ui-monospace, monospace" font-size="11" fill="var(--ink-dim)">(연락처 삭제)</text>
    <text x="252" y="132" font-family="ui-monospace, monospace" font-size="11" fill="var(--ink)">서울</text>
    <text x="330" y="155" text-anchor="middle" font-size="10.5" fill="var(--ink-muted)">되돌릴 열쇠가 따로 존재</text>

    <rect x="452" y="16" width="192" height="150" rx="12" fill="var(--surface-2)" stroke="var(--tip)" stroke-width="2.5"/>
    <text x="548" y="44" text-anchor="middle" font-size="15" font-weight="600" fill="var(--ink)">익명정보</text>
    <text x="548" y="63" text-anchor="middle" font-size="11" fill="var(--tip)">되돌릴 방법이 없음</text>
    <text x="470" y="92" font-family="ui-monospace, monospace" font-size="11" fill="var(--ink)">30대 · 서울</text>
    <text x="470" y="112" font-family="ui-monospace, monospace" font-size="11" fill="var(--ink)">해당 구간 1,428명</text>
    <text x="470" y="132" font-family="ui-monospace, monospace" font-size="11" fill="var(--ink)">평균 구매액 3.2만원</text>
    <text x="548" y="155" text-anchor="middle" font-size="10.5" fill="var(--ink-muted)">규제 대상 아님</text>

    <line x1="210" y1="91" x2="228" y2="91" stroke="var(--ink-dim)" stroke-width="2" marker-end="url(#pv-ar)"/>
    <line x1="428" y1="91" x2="446" y2="91" stroke="var(--ink-dim)" stroke-width="2" marker-end="url(#pv-ar)"/>

    <text x="20" y="208" font-size="12" font-weight="600" fill="var(--ink-muted)">되돌릴 수 있는가</text>
    <text x="112" y="234" text-anchor="middle" font-size="12" fill="var(--ink)">원본 그대로</text>
    <text x="330" y="234" text-anchor="middle" font-size="12" fill="var(--ink)">열쇠가 있으면 가능</text>
    <text x="548" y="234" text-anchor="middle" font-size="12" fill="var(--ink)">불가능</text>

    <text x="20" y="272" font-size="12" font-weight="600" fill="var(--ink-muted)">분석에 쓸 수 있는 정보량</text>
    <rect x="16" y="284" width="192" height="12" rx="6" fill="var(--bad)" fill-opacity="0.75"/>
    <rect x="234" y="284" width="134" height="12" rx="6" fill="var(--warn)" fill-opacity="0.75"/>
    <rect x="452" y="284" width="62" height="12" rx="6" fill="var(--tip)" fill-opacity="0.75"/>

    <text x="20" y="324" font-size="11.5" fill="var(--ink-muted)">가명정보의 "열쇠"는 반드시 원본과 분리해 보관합니다 — 같이 두면 가명처리한 의미가 없습니다.</text>
  </g>
</svg>`,
  },
  {
    t: "ul",
    items: [
      "**개인정보** — 이름·주민등록번호·영상처럼 그 자체로 개인을 알아볼 수 있거나, 다른 정보와 쉽게 결합하면 알아볼 수 있는 정보입니다",
      "**가명정보** — 개인정보를 가공해서, **추가 정보를 쓰지 않고서는** 특정 개인을 알아볼 수 없게 만든 것입니다. 여전히 개인정보의 일종으로 다뤄지지만, 통계 작성·과학적 연구 등 정해진 목적에서는 동의 없이 쓸 수 있는 특례가 있습니다",
      "**익명정보** — 시간과 비용, 기술을 합리적으로 고려해도 다시 개인을 알아볼 수 없는 정보입니다. 개인정보 규제 대상에서 벗어납니다",
    ],
  },
  {
    t: "callout",
    tone: "bad",
    title: "가장 흔한 오해: \"이름만 지우면 익명\"",
    body: [
      {
        t: "p",
        md: "이름과 연락처를 지워도, **남은 정보 몇 개를 조합하면 개인이 특정되는 경우가 매우 많습니다.** \"1990년 3월생 · 강남구 거주 · 특정 회사 재직\"이면 해당하는 사람이 몇 명 안 될 수 있고, 여기에 다른 공개 정보를 붙이면 한 명으로 좁혀지기도 합니다. 이걸 **재식별**이라 부릅니다.",
      },
      {
        t: "p",
        md: "그래서 가명·익명 처리는 \"어떤 칸을 지울까\"가 아니라 **\"남은 조합으로 누군가를 특정할 수 있는가\"를 평가하는 일**입니다. 이 평가를 안 하고 칸만 지운 뒤 \"익명화했다\"고 부르는 것이 실무에서 가장 자주 나오는 위험한 착각입니다.",
      },
    ],
  },

  { t: "h3", md: "최소 수집 원칙 — 법에 적혀 있는 기본값" },
  {
    t: "p",
    md: "우리나라 개인정보 보호법 제16조는 **\"그 목적에 필요한 최소한의 개인정보를 수집하여야 한다\"**고 정하고 있습니다. 여기서 실무적으로 중요한 세부 사항이 셋 있습니다.",
  },
  {
    t: "ul",
    items: [
      "**최소한이라는 것을 증명할 책임은 수집하는 쪽에 있습니다.** \"왜 필요한지 설명 못 하면 모으면 안 된다\"는 뜻으로 읽는 편이 안전합니다",
      "동의를 받아 수집할 때는, **최소한의 정보 외의 항목은 동의하지 않아도 된다는 사실을 구체적으로 알려야** 합니다",
      "**최소한의 정보 외 항목에 동의하지 않는다는 이유로 서비스 제공을 거부할 수 없습니다.** \"선택 항목\"이라 해놓고 사실상 강제하는 설계가 문제가 되는 지점입니다",
    ],
  },
  {
    t: "legend",
    md: "출처: 개인정보 보호법 제16조(개인정보의 수집 제한) — [국가법령정보센터](https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=249553). 조문은 개정될 수 있으므로 실제 적용 시 최신 원문을 직접 확인하세요.",
  },
  {
    t: "p",
    md: "이 원칙을 설계에 옮기면, 최소화는 수집 단계에서만 하는 게 아니라 **네 지점 전부에서** 이뤄져야 합니다.",
  },
  {
    t: "figure",
    caption: "한 곳만 조여도 나머지가 열려 있으면 소용이 없습니다.",
    svg: `<svg viewBox="0 0 660 226" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="데이터 최소화의 네 가지 축">
  <g font-family="ui-sans-serif, system-ui">
    <rect x="16" y="26" width="150" height="96" rx="12" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="91" y="56" text-anchor="middle" font-size="14" font-weight="600" fill="var(--ink)">덜 모은다</text>
    <text x="91" y="80" text-anchor="middle" font-size="11" fill="var(--ink-muted)">정말 필요한 항목만</text>
    <text x="91" y="99" text-anchor="middle" font-size="11" fill="var(--ink-muted)">생년월일 대신 연령대</text>

    <rect x="182" y="26" width="150" height="96" rx="12" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="257" y="56" text-anchor="middle" font-size="14" font-weight="600" fill="var(--ink)">덜 오래 둔다</text>
    <text x="257" y="80" text-anchor="middle" font-size="11" fill="var(--ink-muted)">보관 기간을 정하고</text>
    <text x="257" y="99" text-anchor="middle" font-size="11" fill="var(--ink-muted)">지나면 자동 파기</text>

    <rect x="348" y="26" width="150" height="96" rx="12" fill="var(--surface-2)" stroke="var(--hairline)" stroke-width="1.5"/>
    <text x="423" y="56" text-anchor="middle" font-size="14" font-weight="600" fill="var(--ink)">덜 열어준다</text>
    <text x="423" y="80" text-anchor="middle" font-size="11" fill="var(--ink-muted)">업무에 필요한 사람만</text>
    <text x="423" y="99" text-anchor="middle" font-size="11" fill="var(--ink-muted)">접근 기록을 남김</text>

    <rect x="514" y="26" width="130" height="96" rx="12" fill="var(--surface-2)" stroke="var(--bad)" stroke-width="2.5"/>
    <text x="579" y="56" text-anchor="middle" font-size="14" font-weight="600" fill="var(--ink)">덜 퍼뜨린다</text>
    <text x="579" y="80" text-anchor="middle" font-size="11" fill="var(--ink-muted)">복사본을 안 만듦</text>
    <text x="579" y="99" text-anchor="middle" font-size="11" fill="var(--bad)">가장 자주 뚫림</text>

    <text x="330" y="168" text-anchor="middle" font-size="12.5" fill="var(--ink-muted)">가장 자주 뚫리는 곳은 첫 번째가 아니라 네 번째입니다.</text>
    <text x="330" y="194" text-anchor="middle" font-size="11.5" fill="var(--ink-dim)">개발자 노트북에 내려받은 운영 데이터, 분석용으로 복사해둔 표,</text>
    <text x="330" y="213" text-anchor="middle" font-size="11.5" fill="var(--ink-dim)">엑셀로 뽑아 메일로 보낸 명단.</text>
  </g>
</svg>`,
  },
  {
    t: "p",
    md: "네 번째(덜 퍼뜨린다)가 실무에서 가장 자주 뚫립니다. 그리고 복사본이 어디까지 갔는지 알려면 [11장의 데이터 계보](/data/lineage)가 필요합니다 — 계보 없이는 회수할 대상조차 특정할 수 없습니다.",
  },

  { t: "h3", md: "2026년 3월, 가명정보 판단 기준이 바뀌었습니다" },
  {
    t: "p",
    md: "가명정보를 쓰려면 \"이 처리가 안전한가\"를 검토해야 하는데, 그동안 이 기준이 담당자마다 달라 실무에서 혼란이 컸습니다. 개인정보보호위원회는 2026년 3월 「가명정보 처리 가이드라인」을 전면 개정하면서, 이 판단을 **위험도 기반 3단계**로 표준화했습니다.",
  },
  {
    t: "figure",
    caption: "위험이 낮으면 절차도 가볍게, 높으면 무겁게 — 일률적으로 같은 서류를 요구하던 방식에서 바뀌었습니다.",
    svg: `<svg viewBox="0 0 660 218" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="가명정보 처리 위험도 3단계 체계">
  <g font-family="ui-sans-serif, system-ui">
    <rect x="16" y="14" width="628" height="58" rx="12" fill="var(--surface-2)" stroke="var(--tip)" stroke-width="2.5"/>
    <rect x="16" y="14" width="10" height="58" rx="5" fill="var(--tip)"/>
    <text x="44" y="40" font-size="14" font-weight="600" fill="var(--ink)">저위험</text>
    <text x="140" y="40" font-size="12" fill="var(--ink)">반복 제공 · 유사 제공 · 내부 부서 간 제공·활용 · 결합전문기관 제공</text>
    <text x="140" y="60" font-size="11" fill="var(--ink-muted)">담당자 중심의 검토와 최소 서류로 처리 가능</text>

    <rect x="16" y="82" width="628" height="58" rx="12" fill="var(--surface-2)" stroke="var(--warn)" stroke-width="2.5"/>
    <rect x="16" y="82" width="10" height="58" rx="5" fill="var(--warn)"/>
    <text x="44" y="108" font-size="14" font-weight="600" fill="var(--ink)">중위험</text>
    <text x="140" y="108" font-size="12" fill="var(--ink)">기관 내부 분석공간 제공</text>
    <text x="140" y="128" font-size="11" fill="var(--ink-muted)">중간 수준의 검토 절차</text>

    <rect x="16" y="150" width="628" height="58" rx="12" fill="var(--surface-2)" stroke="var(--bad)" stroke-width="2.5"/>
    <rect x="16" y="150" width="10" height="58" rx="5" fill="var(--bad)"/>
    <text x="44" y="176" font-size="14" font-weight="600" fill="var(--ink)">고위험</text>
    <text x="140" y="176" font-size="12" fill="var(--ink)">비정형데이터 처리 (이미지 · 영상 · 자유 텍스트 등)</text>
    <text x="140" y="196" font-size="11" fill="var(--ink-muted)">가장 엄격한 검토 — 무엇이 찍혀 있을지 미리 알 수 없기 때문</text>
  </g>
</svg>`,
  },
  {
    t: "p",
    md: "**비정형데이터가 가장 높은 위험으로 분류된 이유**를 이해하면 이 체계 전체가 납득됩니다. 표 형태의 데이터는 어떤 칸에 무엇이 들었는지 미리 알 수 있어서, 지울 것을 특정할 수 있습니다. 반면 사진이나 자유롭게 쓴 글에는 **무엇이 들어있을지 미리 알 수 없습니다** — 배경에 다른 사람 얼굴이 찍혔을 수도, 문장 속에 주소가 적혀 있을 수도 있죠. 전부 다 검사하는 건 현실적으로 불가능에 가깝습니다.",
  },
  {
    t: "p",
    md: "이 개정으로 작성해야 하는 서식도 24종에서 10종으로 줄었습니다. 위험이 낮은 일까지 무거운 서류를 요구하던 부담을 덜어내되, **위험이 높은 곳에는 오히려 집중하겠다**는 방향입니다.",
  },
  {
    t: "legend",
    md: "출처: 개인정보보호위원회 「가명정보 처리 가이드라인」 전면 개정(2026년 3월) — [정책브리핑 보도자료](https://www.korea.kr/briefing/pressReleaseView.do?newsId=156751967) · [KISA 자료실](https://www.kisa.or.kr/2060202/form?postSeq=138). 위험도 구분 예시는 보도 내용을 옮긴 것이며, 실제 적용 기준은 가이드라인 원문을 확인하세요.",
  },

  { t: "h3", md: "2026년 9월, 책임의 무게도 달라집니다" },
  {
    t: "p",
    md: "개인정보 보호법 개정 사항이 **2026년 9월 11일부터 시행**됩니다. 데이터를 다루는 입장에서 알아둘 만한 변화는 다음과 같습니다.",
  },
  {
    t: "table",
    head: ["무엇이", "어떻게 바뀌나"],
    rows: [
      ["**과징금**", "반복적·중대한 위반에 대해 전체 매출액의 3% 상한을 **10% 이내**로 올리는 특례가 도입됩니다"],
      ["**책임자**", "사업주·대표자를 개인정보 보호의 최종 책임자로 명시합니다. 일정 규모 이상은 보호책임자 지정 시 이사회 의결과 보호위원회 신고 절차가 요구됩니다"],
      ["**보안 인증**", "일정 기준에 해당하는 처리자에게 ISMS-P 인증이 의무화됩니다 (이 조항은 2027년 7월 1일부터 적용 예정)"],
      ["**감경 사유**", "개인정보 보호를 위한 예산·인력·설비 투자와 운영이 과징금 감경 사유로 추가됩니다"],
    ],
  },
  {
    t: "p",
    md: "실무적으로 읽으면 이렇습니다. **\"사고가 나면 담당자 선에서 끝나지 않는다\"**는 방향이고, 동시에 **\"평소에 제대로 투자해둔 것이 실제로 인정받는다\"**는 방향입니다. 데이터 최소화·계보·계약 같은 앞 장의 작업들이 사고 이후에 \"우리는 이렇게 관리하고 있었다\"는 증거가 되는 셈입니다.",
  },
  {
    t: "legend",
    md: "출처: 2026년 2월 국회 통과 개인정보 보호법 개정안 관련 [법률신문 해설](https://www.lawtimes.co.kr/news/217245) 등. 시행일과 세부 기준(대통령령 위임 사항 포함)은 확정·변경될 수 있으므로, 적용 전에 반드시 원문과 최신 공지를 확인하고 필요하면 법률 자문을 받으세요.",
  },

  { t: "h3", md: "설계 단계에서 미리 줄이는 방법" },
  {
    t: "p",
    md: "가장 효과가 큰 일은 사고 후 대응이 아니라 **처음 설계할 때 안 모으는 것**입니다. 구체적으로는 이런 질문들입니다.",
  },
  {
    t: "grid",
    cols: 2,
    items: [
      {
        t: "card",
        tone: "tip",
        title: "생년월일이 정말 필요한가",
        body: [
          { t: "p", md: "성인 인증이 목적이라면 \"성인 여부(참/거짓)\" 한 칸이면 됩니다. 연령대별 통계가 목적이면 \"20대·30대\" 구간이면 됩니다. **목적을 만족하는 가장 거친 형태**를 먼저 검토합니다." },
        ],
      },
      {
        t: "card",
        tone: "tip",
        title: "원본을 저장해야 하나",
        body: [
          { t: "p", md: "본인 확인이 목적이라면, 값 자체를 저장하지 않고 대조용 \"지문\" 값만 저장할 수 있는 경우가 있습니다(원본은 복원되지 않지만 같은 값인지는 확인 가능). 유출돼도 원본이 드러나지 않습니다." },
        ],
      },
      {
        t: "card",
        tone: "tip",
        title: "언제 지울지 정했나",
        body: [
          { t: "p", md: "보관 기간을 정하지 않으면 실무에서는 \"영구 보관\"이 됩니다. 수집 시점에 **파기 시점을 함께 정하고 자동화**해야 실제로 지워집니다." },
        ],
      },
      {
        t: "card",
        tone: "tip",
        title: "분석용 사본은 어떤 상태인가",
        body: [
          { t: "p", md: "분석·개발 환경에 운영 데이터를 그대로 복사하는 것이 실무에서 가장 흔한 유출 경로입니다. 복사 시점에 가명처리를 거치도록 파이프라인 자체를 설계합니다." },
        ],
      },
    ],
  },

  { t: "h3", md: "한계" },
  {
    t: "callout",
    tone: "bad",
    body: [
      {
        t: "p",
        md: "**\"익명화했으니 안전하다\"는 판단은 시간이 지나면 틀릴 수 있습니다.** 지금은 재식별이 어렵더라도, 나중에 공개되는 다른 데이터와 결합하면 가능해질 수 있습니다. 그래서 익명 여부는 한 번 판정하고 끝나는 게 아니라 **주기적으로 다시 봐야 하는 판단**입니다.",
      },
      {
        t: "p",
        md: "그리고 이 장 전체에 해당하는 한계인데, **여기 적힌 것은 개념이지 기준이 아닙니다.** 실제 판단은 처리하는 데이터의 성격, 결합 가능한 다른 정보, 사업의 맥락에 따라 전부 달라집니다. 다시 한번, 실제 적용에는 법률 전문가의 검토를 받으세요.",
      },
    ],
  },
  {
    t: "p",
    md: "이것으로 데이터 주제의 네 파트가 마무리됩니다. [표현과 모델링](/data/data-models)에서 시작해 [관계와 의미](/data/graph-model), [검색](/data/keyword-search)을 거쳐, 마지막으로 그 모든 것을 **믿을 수 있게 운영하는 방법**까지 왔습니다. 관통하는 결론은 하나입니다 — 데이터의 어려움은 대부분 기술이 아니라 **누가 무엇을 책임지기로 했는가**에 있습니다.",
  },
];

export default blocks;
