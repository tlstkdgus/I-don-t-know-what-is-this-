import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  { t: "h2", md: "리스크와 사고 통계" },
  { t: "p", md: "Web3를 제대로 알려면 좋은 면만 봐서는 안 됩니다. 이 산업의 사고율은 대단히 높습니다." },
  {
    t: "grid",
    cols: 4,
    items: [
      { t: "stat", n: "165억 달러+", l: "암호화폐 해킹 누적 피해(지금까지 전체)" },
      { t: "stat", n: "77억 달러", l: "DeFi 서비스에서만의 피해 누적" },
      { t: "stat", n: "29억 달러", l: "체인 간 \"다리(브리지)\" 해킹 사고만으로" },
      { t: "stat", n: "8억 4천만 달러+", l: "2026년 상반기 DeFi 피해액" },
    ],
  },
  { t: "h3", md: "2026년의 패턴" },
  {
    t: "ul",
    items: [
      "2026년 4월은 **암호화폐 역사상 피해가 가장 컸던 한 달**이었습니다 — 총 6억 2,969만 달러가 빠져나갔고, 그중 6억 1,417만 달러가 DeFi에서 발생",
      "2026년 1월~5월 중순 사이 DeFi 사고가 **47건** 발생. 2025년 같은 기간 28건보다 **68% 늘어남**",
      "대표적인 사건: 4월 19일 체인 간 \"다리\" 서비스에서 2억 9,200만 달러, 4월 1일 다른 서비스에서 2억 8,500만 달러 유출",
      "분석 기관 Chainalysis는 2026년 전 세계 해킹 피해의 약 **76%**가 라자루스 그룹 등 특정 국가가 배후에 있는 해킹 조직 소행이라고 봅니다",
      "2025년 한 해, [4장](/web3/wallet)에서 본 개인 지갑 탈취 사고는 **15만 8천 건**, 피해자 최소 8만 명, 피해액 7억 1,300만 달러",
    ],
  },
  { t: "h3", md: "사고 유형별로 나눠보면" },
  {
    t: "table",
    head: ["유형", "설명", "사용자가 할 수 있는 대비책"],
    rows: [
      [
        "**피싱 / 지갑 싹쓸이**",
        "가짜 사이트에서 위험한 서명을 유도해 지갑을 통째로 비움. 가장 흔한 유형입니다",
        "주소를 직접 입력, 하드웨어 지갑 사용, 서명 전 내용 확인, 자산을 나눠서 보관",
      ],
      ["**프로그램 자체의 허점**", "[11장](/web3/solidity)에서 본 재진입 공격, 권한 확인 누락, 로직 오류 등", "검토(감사) 이력을 확인. 만들어진 지 얼마 안 된 서비스에 큰돈을 넣지 않기"],
      ["**시세 정보 조작**", "순간적으로 빌린 큰돈으로 가격을 잠깐 왜곡시켜 부당 이득을 챙김", "그 서비스가 신뢰할 만한 시세 정보원을 쓰는지 확인"],
      ["**\"다리(브리지)\" 공격**", "[8장](/web3/layer2)에서 본 것처럼, 체인 사이에 잠긴 큰 자금 풀을 노림", "다리 서비스에 자산을 오래 방치하지 않기"],
      ["**먹튀(러그풀)**", "만든 사람이 자금을 빼서 잠적", "토큰을 누가 얼마나 갖고 있는지, 팀이 신원을 공개했는지 확인. 익명 팀과 비정상적으로 높은 수익률이 같이 있으면 위험 신호"],
      ["**내부자 / 관리자 열쇠 탈취**", "프로그램을 고칠 권한을 가진 열쇠가 유출되거나 악용됨", "그 서비스가 열쇠를 여러 명이 나눠 갖는 방식을 쓰는지 확인"],
    ],
  },
  {
    t: "callout",
    tone: "bad",
    title: "안전 체크리스트",
    body: [
      {
        t: "ul",
        items: [
          "**시드구문은 어디에도 입력하지 않습니다.** 정상적인 서비스는 절대 묻지 않습니다([4장](/web3/wallet))",
          "큰 금액은 **하드웨어 지갑**에, 이것저것 시험해볼 돈은 별도의 지갑에 나눠 보관",
          "서명하기 전 **무엇에 서명하는지** 반드시 확인 — 특히 \"모든 자산에 대한 무제한 허가\" 같은 항목",
          "오래전에 내준 허가는 [revoke.cash](https://revoke.cash)에서 주기적으로 정리",
          "\"고수익 보장\", \"공짜로 코인 드립니다\" 같은 메시지는 **100% 사기**",
          "공식 주소를 미리 즐겨찾기해두기. 검색 결과 맨 위 광고는 가짜인 경우가 많습니다",
        ],
      },
    ],
  },
  { t: "hr" },
  { t: "h2", md: "비판론: 반드시 읽어야 할 반대편 시각" },
  {
    t: "p",
    md: "Web3 관련 자료 대부분은 이 산업에 경제적 이해관계가 있는 사람들이 씁니다. 균형을 위해 진지한 비판들을 정리합니다. **이 비판들은 상당 부분 타당합니다.**",
  },
  {
    t: "callout",
    title: "① \"탈중앙화라는 이름의 연극\"",
    body: [
      {
        t: "p",
        md: "소프트웨어 엔지니어이자 대표적인 비평가 몰리 화이트의 지적입니다: *\"Web3 프로젝트들은 인터넷을 탈중앙화한다고 주장하지만, 실제로는 자신들이 무너뜨리겠다던 것과 똑같은 중앙집권적 구조를 그대로 재생산한다 — 다만 책임을 물을 곳은 더 적은 채로.\"*",
      },
      {
        t: "p",
        md: "구체적으로는 이렇습니다. \"탈중앙\"이라 불리는 많은 서비스가 실제로는 특정 회사의 웹호스팅, 소수의 접속 창구 서비스, 소수의 핵심 개발자가 쥔 관리자 열쇠에 의존합니다. 화면은 한 회사의 서버에, 체인 접속은 다른 한 회사의 창구에, 이미지는 특정 저장소에 있는데, 대체 무엇이 탈중앙인가 하는 질문입니다.",
      },
      {
        t: "diagram",
        name: "decentralization-theater",
        caption:
          "구성 요소별로 실제 상태를 따져보면, 정말로 탈중앙인 것은 맨 아래 한 줄뿐입니다. 비판과 반론이 각각 어디를 가리키는지가 여기서 갈립니다.",
      },
      {
        t: "p",
        md: "**반론:** 그래도 결정적인 차이는 있습니다. *핵심 자산과 그 기록 자체*는 여전히 특정 회사가 마음대로 못 하게 막혀 있다는 점입니다. 화면 서비스가 문을 닫아도 프로그램 자체는 살아있고, 누구든 새 화면을 만들 수 있습니다. 다만 이 반론이 실제로 힘을 가지려면 사용자가 그렇게 할 능력이 있어야 하는데, 대부분의 사용자는 그럴 능력이 없다는 게 이 반론의 약점입니다.",
      },
    ],
  },
  {
    t: "callout",
    title: "② 대부분의 활용 사례가 사실 필요 없다",
    body: [
      {
        t: "p",
        md: "\"공급망 관리를 블록체인으로!\" 같은 제안 대부분은 **평범한 데이터베이스가 더 싸고 빠르고 낫습니다.** 블록체인이 진짜로 필요한 조건은 좁습니다: (a) 서로 믿지 못하는 여러 참여자가 있고, (b) 믿을 만한 중간 관리자를 둘 수 없거나 두고 싶지 않으며, (c) 그 기록을 아무도 마음대로 못 바꾼다는 성질 자체가 진짜 가치가 있을 때. 이 세 조건을 다 만족하는 경우는 생각보다 드뭅니다. 게다가 \"애초에 잘못된 정보를 입력하면 잘못된 정보가 그대로 남는다\"는 문제는 그대로입니다 — 기록을 위조할 수 없다는 것과, 처음 입력한 내용이 사실이라는 것은 다른 이야기입니다.",
      },
    ],
  },
  {
    t: "callout",
    title: "③ 투기가 산업의 중심이다",
    body: [
      {
        t: "p",
        md: "거래량의 압도적인 부분이 실제 사용이 아니라 가격 등락에 대한 베팅입니다. 아무 쓸모없이 유행에만 기댄 코인, 무료로 나눠주는 코인을 노린 반복 행위, \"A 코인을 맡기면 A 코인을 더 준다\"는 식의 순환 구조 등이 그렇습니다. 이런 활동이 통계를 부풀려서, 실제로 얼마나 널리 쓰이는지를 실제보다 커 보이게 만듭니다.",
      },
    ],
  },
  {
    t: "callout",
    title: "④ 되돌릴 수 없다는 것 = 사용자에게 불리하다",
    body: [
      {
        t: "p",
        md: "\"규칙(코드)이 곧 법\"이라는 원칙은, 해커가 그 규칙의 허점을 이용해 자금을 가져가도 \"규칙대로 했으니 정당하다\"는 결론으로 이어질 수 있습니다. 반면 일반 사용자에게는 실수 한 번(주소를 잘못 입력, 시드구문 분실)이 전 재산 상실로 이어집니다. 기존 금융 시스템에 소비자 보호 장치가 생긴 데는 이유가 있었는데, Web3는 그걸 스스로 걷어낸 셈입니다.",
      },
    ],
  },
  {
    t: "callout",
    title: "⑤ 환경 문제(부분적으로는 해소됨)",
    body: [
      {
        t: "p",
        md: "비트코인이 쓰는 작업증명 방식은 여전히 중견 국가 수준의 전력을 소비합니다. 다만 이더리움은 [3장](/web3/consensus)에서 본 2022년의 전환으로 에너지 소비를 **약 99.95% 줄였습니다.** \"블록체인은 곧 환경 파괴\"라는 일반화는, 적어도 2026년 기준 이더리움 계열에는 더 이상 맞지 않습니다.",
      },
    ],
  },
  {
    t: "callout",
    tone: "tip",
    title: "균형 잡힌 결론",
    body: [
      {
        t: "p",
        md: "Web3는 **모든 걸 바꾸는 혁명**도 아니고 **순전한 사기**도 아닙니다. 국경 없는 자금 이동, 허가 없이 서로 조합할 수 있는 금융 서비스, 누구도 마음대로 뺏을 수 없는 소유권 — 이런 특정한 문제에는 실제로 잘 작동하는 기술입니다. 그 밖의 영역에서는 대체로 과장된 경우가 많습니다.",
      },
      {
        t: "p",
        md: "**실용적인 태도 하나:** 이 기술 자체는 배울 가치가 있습니다(암호학, 여러 컴퓨터가 함께 동작하는 방식, 참여자들이 정직하게 행동하도록 설계하는 법은 어디서든 쓸모가 있습니다). 다만 무언가를 접할 때마다 \"이걸 꼭 블록체인으로 해야 하는 이유가 뭘까\"를 스스로 물어보세요. 그 질문에 답을 못 하는 프로젝트는 대개 답이 없는 프로젝트입니다.",
      },
    ],
  },
  { t: "hr" },
  { t: "h2", md: "참고자료(출처)" },
  { t: "p", md: "이 시리즈의 수치와 사실은 아래 자료들로 검증했습니다(2026년 7월 기준)." },
  { t: "h4", md: "공식 문서 · 1차 출처" },
  {
    t: "ul",
    items: [
      "[Building on Ethereum in 2026: what has changed — ethereum.org](https://ethereum.org/latest/building-on-ethereum-in-2026/) (수수료, 업그레이드 타임라인)",
      "[Protocol Priorities Update for 2026 — Ethereum Foundation](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)",
      "[wagmi 공식 문서 — Getting Started](https://wagmi.sh/react/getting-started) / [Connect Wallet 가이드](https://wagmi.sh/react/guides/connect-wallet)",
      "[viem 공식 문서](https://viem.sh)",
    ],
  },
  { t: "h4", md: "생태계 현황" },
  {
    t: "ul",
    items: [
      "[Ethereum L2s Are Splitting Into Winners And Dead Weight — Yellow Research](https://yellow.com/research/ethereum-l2-winners-dead-weight-2026)",
      "[Layer 2 Adoption 2026 Predictions — Cryptopolitan](https://www.cryptopolitan.com/layer-2-adoption-2026-predictions/)",
      "[Top DeFi Protocols in 2026 — Token Metrics](https://tokenmetrics.com/blog/what-are-the-top-defi-protocols-complete-2026-guide-to-decentralized-finance/)",
      "[State of RWA Tokenization 2026 — Canton Network](https://www.canton.network/blog/state-of-rwa-tokenization-2026)",
      "[Real-world asset tokens in 2026 — MetaMask](https://metamask.io/news/real-world-asset-tokens-what-crypto-wallet-users-need-to-know-in-2026)",
      "[NFT Market 2026: Dead or Just Different?](https://earnpark.com/en/posts/nft-market-2026-dead-or-just-different/)",
    ],
  },
  { t: "h4", md: "규제" },
  {
    t: "ul",
    items: [
      "[2026 Stablecoin Regulatory Expectations: GENIUS Act Is Law — Orochi Network](https://orochi.network/blog/2026-stablecoin-regulatory-expectations-the-future-of-global-payments)",
      "[The GENIUS Act and Stablecoin Regulation in 2026](https://assetwhisper.com/genius-act-stablecoin-regulation-2026/)",
    ],
  },
  { t: "h4", md: "보안 · 사고 통계" },
  {
    t: "ul",
    items: [
      "[Crypto Hack Statistics in 2026 — NFT Plazas](https://nftplazas.com/crypto-hack-statistics/)",
      "[DeFi Hacks 2026: $840M+ Lost — altFINS](https://altfins.com/blog/defi-hacks-2026/)",
      "[Every Major DeFi Hack in 2026 So Far — Phemex](https://phemex.com/blogs/defi-hacks-2026-bridge-exploits-explained)",
    ],
  },
  { t: "h4", md: "비판론" },
  {
    t: "ul",
    items: [
      "[Molly White — Citation Needed / Web3 is Going Just Great](https://www.mollywhite.net/)",
      "[Is web3 bullshit? (강연 전문)](https://blog.mollywhite.net/is-web3-bullshit/)",
      "[\"Web3 Is Going Just Great\" Creator On Why It Isn't — IEEE Spectrum](https://spectrum.ieee.org/web3)",
    ],
  },
  {
    t: "callout",
    title: "마지막 한마디",
    body: [
      {
        t: "p",
        md: "여기까지 왔다면, Web3가 왜 필요했고 실제로 무엇을 잘하고 못하는지에 대해 대부분의 사람보다 훨씬 구체적인 그림을 갖게 됐을 겁니다. 이 기술의 진짜 어려움은 사실 도구 사용법이 아니라 **사고방식의 전환**에 있습니다 — 되돌릴 수 없는 기록, 돈이 드는 저장, 기본값이 전체 공개인 데이터, 여러 단계를 거치는 확정, 비밀번호 없는 인증. 이 시리즈에서 다룬 게 바로 이 다섯 가지입니다.",
      },
      {
        t: "p",
        md: "더 깊이 가보고 싶다면 [11장의 학습 로드맵](/web3/solidity) 1주차부터 시작하세요. 연습용 체인에서 직접 지갑을 만들고 거래를 보내보는 30분이, 글 열 편을 읽는 것보다 감이 빨리 잡힙니다.",
      },
    ],
  },
];

export default blocks;
