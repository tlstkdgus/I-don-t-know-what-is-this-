import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  { t: "h2", md: "22. 리스크와 사고 통계" },
  { t: "p", md: "Web3를 제대로 배우려면 좋은 면만 봐서는 안 됩니다. 이 산업의 사고율은 대단히 높습니다." },
  {
    t: "grid",
    cols: 4,
    items: [
      { t: "stat", n: "$16.5B+", l: "암호화폐 해킹 누적 피해 (전체 기간)" },
      { t: "stat", n: "$7.7B", l: "DeFi 프로토콜 피해 누적" },
      { t: "stat", n: "$2.9B", l: "브리지 익스플로잇만으로" },
      { t: "stat", n: "$840M+", l: "2026년 상반기 DeFi 피해액" },
    ],
  },
  { t: "h3", md: "2026년의 패턴" },
  {
    t: "ul",
    items: [
      "2026년 4월은 **암호화폐 역사상 최악의 단월**이었습니다 — 총 6억 2,969만 달러 유출, 그중 6억 1,417만 달러가 DeFi",
      "2026년 1월~5월 중순 DeFi 사고 **47건**. 같은 기간 2025년의 28건 대비 **68% 증가**",
      "주요 사건: Kelp DAO LayerZero 브리지 **2억 9,200만 달러**(4/19), Drift Protocol **2억 8,500만 달러**(4/1)",
      "Chainalysis는 2026년 전 세계 해킹 피해의 약 **76%**를 라자루스 그룹 등 국가 배후 행위자에 귀속시킵니다",
      "2025년 개인 지갑 탈취 **15만 8천 건**, 피해자 최소 8만 명, 손실 **7억 1,300만 달러**",
    ],
  },
  { t: "h3", md: "사고 유형별 분류" },
  {
    t: "table",
    head: ["유형", "설명", "사용자가 할 수 있는 방어"],
    rows: [
      [
        "**피싱 / 드레이너**",
        "가짜 사이트에서 악성 서명을 유도해 지갑을 통째로 비움. 가장 흔함",
        "URL 직접 입력, 하드웨어 지갑, 서명 내용 확인, 자산 분리 보관",
      ],
      ["**컨트랙트 취약점**", "재진입, 접근제어 누락, 로직 오류", "감사 이력 확인, 신생 프로토콜에 큰 돈 넣지 않기"],
      ["**오라클 조작**", "플래시론으로 가격을 순간 조작해 부당 이득", "프로토콜의 오라클 설계 확인 (Chainlink 등 견고한 피드 사용 여부)"],
      ["**브리지 공격**", "체인 간 잠긴 대규모 자금 풀 탈취", "브리지에 자산을 장기간 방치하지 않기"],
      ["**러그풀**", "개발자가 유동성을 빼고 잠적", "토큰 배분·락업·팀 신원 확인. 익명 팀 + 고수익 = 위험 신호"],
      ["**내부자 / 키 탈취**", "어드민 키가 유출되거나 악용", "멀티시그·타임락 사용 여부 확인"],
    ],
  },
  {
    t: "callout",
    tone: "bad",
    title: "사용자 안전 체크리스트 (프론트엔드가 UI로 도와야 할 것들)",
    body: [
      {
        t: "ul",
        items: [
          "**시드구문은 어디에도 입력하지 않습니다.** 어떤 정상 서비스도 묻지 않습니다",
          "큰 금액은 **하드웨어 지갑**에, 실험용은 별도의 \"핫\" 지갑에 분리",
          "서명하기 전 **무엇에 서명하는지** 확인 — 특히 `SetApprovalForAll`, 무제한 `approve`, 알 수 없는 `permit`",
          "오래된 approve는 [revoke.cash](https://revoke.cash)에서 주기적으로 취소",
          "\"고수익 보장\", \"에어드랍 받으세요\" DM은 **100% 사기**",
          "공식 URL을 북마크. 검색 결과 상단 광고는 가짜인 경우가 많음",
        ],
      },
    ],
  },
  { t: "hr" },
  { t: "h2", md: "비판론: 반드시 읽어야 할 반대편" },
  {
    t: "p",
    md: "Web3 자료의 대부분은 이 산업에 경제적 이해관계가 있는 사람들이 씁니다. 균형을 위해 진지한 비판을 정리합니다. **이 비판들은 상당 부분 타당합니다.**",
  },
  {
    t: "callout",
    title: "① \"탈중앙화 극장(Decentralization Theater)\"",
    body: [
      {
        t: "p",
        md: "소프트웨어 엔지니어이자 대표적 비평가인 몰리 화이트(Molly White)의 지적: *\"Web3 프로젝트들은 인터넷을 탈중앙화한다고 주장하지만, 실제로는 자신들이 무너뜨리겠다던 중앙집권적 권력 구조를 그대로 재생산한다 — 다만 책임성은 더 적은 채로.\"*",
      },
      {
        t: "p",
        md: "구체적으로: 많은 \"탈중앙\" 앱이 결국 **중앙 웹호스팅, 사설 API(Infura/Alchemy), 소수의 핵심 개발자가 쥔 어드민 키**에 의존합니다. 프론트엔드는 Vercel에, RPC는 Alchemy에, 이미지는 중앙 IPFS 게이트웨이에 있는데 무엇이 탈중앙인가 하는 질문입니다.",
      },
      {
        t: "p",
        md: "**반론:** 결정적 차이는 *기반 자산과 상태*가 검열 저항적이라는 점입니다. 프론트엔드가 내려가도 컨트랙트는 살아있고, 누구나 다른 인터페이스를 만들 수 있습니다. 다만 이 반론이 실제로 작동하려면 사용자가 그럴 능력이 있어야 하는데, 대부분은 없습니다.",
      },
    ],
  },
  {
    t: "callout",
    title: "② 대부분의 유스케이스가 실제로는 필요 없다",
    body: [
      {
        t: "p",
        md: "\"블록체인으로 공급망을!\" 같은 제안의 대부분은 **일반 데이터베이스가 더 싸고 빠르고 낫습니다.** 블록체인이 진짜로 필요한 조건은 좁습니다: (a) 서로 신뢰하지 않는 다수의 참여자가 있고, (b) 신뢰할 중개자를 두고 싶지 않거나 둘 수 없으며, (c) 상태의 검열 저항성이 실제로 가치 있을 때. 이 셋을 모두 만족하는 경우는 생각보다 드뭅니다. 게다가 **\"쓰레기를 넣으면 쓰레기가 나온다\"**는 문제가 그대로 남습니다 — 온체인 기록이 위조 불가라는 게, 처음 입력한 정보가 참이라는 뜻은 아닙니다.",
      },
    ],
  },
  {
    t: "callout",
    title: "③ 투기가 산업의 중심이다",
    body: [
      {
        t: "p",
        md: "거래량의 압도적 부분이 실사용이 아니라 자산 가격에 대한 베팅입니다. 밈코인, 무한 에어드랍 파밍, 순환 논리적 수익(A 토큰을 예치하면 A 토큰을 더 준다) 등. 이런 활동이 통계를 부풀려 실제 채택 정도를 과대평가하게 만듭니다.",
      },
    ],
  },
  {
    t: "callout",
    title: "④ 되돌릴 수 없음 = 사용자 적대적",
    body: [
      {
        t: "p",
        md: "\"코드가 곧 법\"은 해커가 규칙 안에서 자금을 가져가도 정당하다는 결론을 낳습니다. 일반 사용자에게는 실수 한 번(주소 오타, 시드구문 분실)이 전 재산 상실로 이어집니다. 금융 시스템이 소비자 보호 장치를 갖게 된 데는 이유가 있었고, Web3는 그것을 자발적으로 버렸습니다.",
      },
    ],
  },
  {
    t: "callout",
    title: "⑤ 환경 문제 (부분적으로 해소됨)",
    body: [
      {
        t: "p",
        md: "비트코인의 PoW는 여전히 중견 국가급 전력을 소비합니다. 다만 이더리움은 2022년 PoS 전환으로 에너지 소비를 **약 99.95% 줄였습니다.** \"블록체인 = 환경 파괴\"라는 일반화는 2026년 기준으로는 이더리움 계열에 대해서는 부정확합니다.",
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
        md: "Web3는 **모든 것을 바꾸는 혁명**도 아니고 **순전한 사기**도 아닙니다. 특정한 문제 — 국경 없는 가치 이동, 허가 없는 금융 조합, 검열 저항적 소유권 — 에 대해 실제로 작동하는 기술입니다. 그 밖의 영역에서는 대체로 과잉입니다.",
      },
      {
        t: "p",
        md: "**개발자로서의 실용적 태도:** 기술 자체는 배울 가치가 있습니다(암호학, 분산 시스템, 인센티브 설계는 어디서든 유용합니다). 다만 \"이걸 왜 블록체인으로 해야 하는가\"라는 질문을 매번 스스로에게 던지세요. 그 질문에 답하지 못하는 프로젝트는 대개 답이 없는 프로젝트입니다.",
      },
    ],
  },
  { t: "hr" },
  { t: "h2", md: "참고자료 (출처)" },
  { t: "p", md: "이 문서의 수치와 기술적 사실은 아래 자료들로 검증했습니다 (2026년 7월 기준)." },
  { t: "h4", md: "공식 문서 · 1차 출처" },
  {
    t: "ul",
    items: [
      "[Building on Ethereum in 2026: what has changed — ethereum.org](https://ethereum.org/latest/building-on-ethereum-in-2026/) (가스 비용, EIP-7702, 업그레이드 타임라인)",
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
      "[Layer 2 Adoption 2026 Predictions — Cryptopolitan](https://www.cryptopolitan.com/layer-2-adoption-2026-predictions/) (L2 TVL 수치)",
      "[Top DeFi Protocols in 2026 — Token Metrics](https://tokenmetrics.com/blog/what-are-the-top-defi-protocols-complete-2026-guide-to-decentralized-finance/) (TVL, Aave/Lido 순위)",
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
        md: "프론트엔드 지식이 있다면 Web3 앱 개발 자체는 **2~3주면 감이 잡힙니다.** React와 TanStack Query를 알면 wagmi는 거의 공짜로 얻어집니다. 진짜 학습 곡선은 코드가 아니라 **멘탈 모델**에 있습니다 — 되돌릴 수 없는 상태, 돈이 드는 쓰기, 공개된 데이터, 3단계 트랜잭션, 신뢰 없는 인증.",
      },
      {
        t: "p",
        md: "그러니 **17장 로드맵의 1주차(사용자 되어보기)부터** 시작하세요. 테스트넷에서 직접 지갑을 만들고 트랜잭션을 보내보는 30분이, 문서 열 개를 읽는 것보다 낫습니다.",
      },
    ],
  },
];

export default blocks;
