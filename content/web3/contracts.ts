import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "p",
    md: "\"스마트 컨트랙트\"는 계약서가 아닙니다. 오해를 낳는 이름입니다. 정확히는 **블록체인에 배포되어 조건이 충족되면 자동 실행되는 프로그램**입니다. 닉 재보(Nick Szabo)가 1994년에 자판기에 빗대 제안한 개념입니다 — 동전을 넣으면 점원의 판단 없이 물건이 나오는 것.",
  },
  { t: "h3", md: "특성" },
  {
    t: "grid",
    cols: 2,
    items: [
      {
        t: "card",
        tone: "tip",
        title: "강점",
        body: [
          {
            t: "ul",
            items: [
              "**불변성** — 배포 후 아무도(개발자 포함) 코드를 못 바꿈",
              "**투명성** — 바이트코드가 공개. 소스 검증(verify)하면 누구나 읽음",
              "**원자성** — 함수 실행 중 하나라도 실패하면 **전체 롤백**. DB 트랜잭션과 동일",
              "**조합 가능성** — 허가 없이 다른 컨트랙트를 호출 가능",
            ],
          },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "대가",
        body: [
          {
            t: "ul",
            items: [
              "**버그 수정 불가** → 프록시 패턴으로 우회하지만, 그건 다시 중앙화 리스크",
              "**모든 상태가 공개** → `private` 키워드는 다른 컨트랙트의 접근만 막을 뿐, 체인 데이터를 직접 읽으면 다 보임",
              "**업그레이드 키 = 공격 표면** → 실제 해킹의 상당수가 어드민 키 탈취",
              "**가스 = 코드 품질의 비용** → 비효율적 코드는 사용자 지갑에서 직접 청구됨",
            ],
          },
        ],
      },
    ],
  },
  { t: "h3", md: "ABI: 프론트엔드가 컨트랙트와 대화하는 법" },
  {
    t: "p",
    md: "**ABI(Application Binary Interface)**는 컨트랙트의 함수 시그니처를 기술한 JSON입니다. **Web3의 OpenAPI 명세라고 보면 정확합니다.**",
  },
  {
    t: "code",
    lang: "ts",
    src: `
[
  {
    "name": "transfer",
    "type": "function",
    "stateMutability": "nonpayable",   // 상태를 바꿈 → 가스 필요
    "inputs": [
      { "name": "to",     "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "outputs": [{ "type": "bool" }]
  }
]`,
  },
  {
    t: "p",
    md: "함수 호출은 `keccak256(\"transfer(address,uint256)\")`의 앞 4바이트(`0xa9059cbb`)에 인자를 붙인 바이트열로 인코딩됩니다. viem/wagmi는 ABI만 주면 이걸 자동으로 처리하고, TypeScript 타입까지 추론해 줍니다.",
  },
  { t: "h4", md: "stateMutability — 이 필드가 프론트엔드에 중요한 이유" },
  {
    t: "table",
    head: ["값", "의미", "프론트엔드 처리"],
    rows: [
      ["`view` / `pure`", "상태를 읽기만 함", "**가스 무료, 즉시 응답, 지갑 팝업 없음**. `useReadContract`"],
      ["`nonpayable`", "상태를 바꿈", "트랜잭션 필요. 지갑 서명 + 대기. `useWriteContract`"],
      ["`payable`", "상태를 바꾸고 ETH도 받음", "위와 같되 `value` 전달"],
    ],
  },
  { t: "h3", md: "이벤트(Event) = 로그 = 프론트엔드의 생명줄" },
  {
    t: "p",
    md: "컨트랙트는 `emit Transfer(from, to, amount)`로 **이벤트**를 발생시킵니다. 이벤트는 저장소보다 훨씬 싸고, 컨트랙트 자신은 읽을 수 없지만 **외부에서는 인덱싱해서 조회할 수 있습니다.**",
  },
  {
    t: "callout",
    tone: "fe",
    title: "왜 중요한가",
    body: [
      {
        t: "p",
        md: "\"이 사용자의 거래 내역을 보여줘\"를 컨트랙트에 물어볼 수는 없습니다. 그런 함수가 없고, 있어도 가스가 폭발합니다. 대신 **이벤트 로그를 인덱싱한 서비스**(The Graph, Alchemy/Ankr API, 직접 만든 인덱서)에 물어봅니다. **Web3 앱에도 결국 백엔드가 필요한 가장 큰 이유가 이것입니다.** 온체인은 \"쓰기와 진실의 원천\", 인덱서는 \"읽기 최적화 레플리카\" — CQRS 패턴 그 자체입니다.",
      },
    ],
  },
  { t: "hr" },
  { t: "h2", md: "토큰 표준 (ERC)" },
  {
    t: "p",
    md: "**ERC(Ethereum Request for Comments)**는 커뮤니티 표준입니다. 강제력은 없지만, 표준을 따르면 모든 지갑·거래소·마켓플레이스가 자동으로 인식합니다. **인터페이스 계약이자 사실상의 npm 패키지 규격**이라고 보면 됩니다.",
  },
  {
    t: "table",
    head: ["표준", "이름", "용도", "실제 사례"],
    rows: [
      ["**ERC-20**", "대체 가능 토큰", "1 단위가 다른 1 단위와 완전히 동일. 화폐·포인트·거버넌스 토큰", "USDC, USDT, UNI, LINK"],
      ["**ERC-721**", "NFT", "각 토큰이 고유 ID를 갖고 서로 구별됨", "CryptoPunks, ENS 도메인"],
      ["**ERC-1155**", "멀티 토큰", "한 컨트랙트에서 FT+NFT 동시 관리, 배치 전송. 게임 아이템에 최적", "게임 인벤토리"],
      ["**ERC-4626**", "토큰화 볼트", "수익 창출 볼트의 예치/출금 인터페이스 표준화", "Yearn, Morpho 볼트"],
      ["**ERC-2612**", "Permit", "서명만으로 approve. **approve 트랜잭션을 없애 UX 개선**", "USDC, DAI"],
      ["**ERC-4337**", "계정 추상화", "컨트랙트 지갑, 가스 대납, 소셜 복구", "Safe, Biconomy"],
      ["**ERC-5792**", "Wallet Call API", "`wallet_sendCalls`로 **여러 동작을 한 번에** 요청", "2026년 배치 UX 표준"],
      ["**ERC-6551**", "토큰 바운드 계정", "NFT가 스스로 지갑을 가짐 (NFT가 다른 자산을 소유)", "게임 캐릭터 인벤토리"],
    ],
  },
  { t: "h3", md: "ERC-20의 실제 인터페이스" },
  {
    t: "code",
    lang: "ts",
    src: `
interface IERC20 {
    // 읽기 (view — 가스 무료)
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    // 쓰기 (트랜잭션 필요)
    function transfer(address to, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);

    // 이벤트 (프론트엔드가 구독)
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}`,
  },
  {
    t: "callout",
    tone: "warn",
    title: "approve → transferFrom 패턴: Web3 UX의 최대 난관",
    body: [
      { t: "p", md: "토큰을 DEX에 스왑하려면 **두 번의 트랜잭션**이 필요합니다." },
      {
        t: "ol",
        items: [
          "`approve(uniswapRouter, amount)` — \"이 컨트랙트가 내 토큰 N개를 가져가도 좋다\" 허가",
          "`swap(...)` — 라우터가 `transferFrom`으로 실제로 가져감",
        ],
      },
      {
        t: "p",
        md: "**왜 이렇게?** 컨트랙트는 내 지갑에서 돈을 그냥 빼갈 수 없기 때문입니다. 명시적 허가가 필요합니다. 문제는 (a) 트랜잭션이 두 번이라 UX가 나쁘고, (b) 많은 앱이 편의상 **무제한 approve**를 요청하는데, 그 컨트랙트가 나중에 해킹당하면 *내 전 재산이 털립니다.*",
      },
      {
        t: "p",
        md: "**해법:** ERC-2612 Permit(서명으로 대체, 가스 0), ERC-5792 `wallet_sendCalls`(배치), EIP-7702(EOA가 배치 실행). 2026년에는 이 셋을 우선 고려하세요. 그리고 사용자에게는 [revoke.cash](https://revoke.cash) 같은 도구로 오래된 approve를 정리하라고 안내하는 게 좋습니다.",
      },
    ],
  },
  { t: "h3", md: "토큰과 코인의 차이" },
  {
    t: "ul",
    items: [
      "**코인(네이티브 자산)** — 체인 자체의 화폐. ETH, BTC, SOL. 가스를 낼 때 씀. 별도 컨트랙트가 없음",
      "**토큰** — 컨트랙트가 발행. USDC는 그냥 \"누가 얼마를 갖고 있다\"는 `mapping(address => uint256)`일 뿐입니다",
    ],
  },
  {
    t: "p",
    md: "따라서 **ETH 잔고를 읽는 법과 USDC 잔고를 읽는 법이 코드상 다릅니다**. 전자는 `useBalance`, 후자는 `useReadContract({functionName:'balanceOf'})`. 처음 헷갈리는 지점입니다.",
  },
];

export default blocks;
