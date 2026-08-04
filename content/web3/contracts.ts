import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "p",
    md: "\"스마트 컨트랙트\"라는 이름 때문에 종이 계약서를 떠올리기 쉽지만, 계약서가 아닙니다. 정확히는 **블록체인에 올라가 있고, 정해진 조건이 충족되면 자동으로 실행되는 프로그램**입니다. 이 개념을 처음 제안한 닉 재보(1994년)는 자판기에 빗댔습니다 — 동전을 넣으면 점원이 판단할 필요 없이 정해진 물건이 그냥 나오죠.",
  },
  { t: "h3", md: "이 방식의 장점과 그 대가" },
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
              "**바꿀 수 없음** — 한 번 배포하면 만든 사람조차 코드를 못 고침",
              "**투명함** — 프로그램의 실제 실행 코드가 전부 공개돼 있어 누구나 뜯어볼 수 있음",
              "**전부 되거나 전부 안 되거나** — 프로그램 실행 중 한 단계라도 실패하면 이미 진행된 부분까지 전부 취소됨(결혼식 서약처럼, \"일부만 성립\"이 없습니다)",
              "**허가 없이 이어붙이기 가능** — 남이 만든 프로그램을 내 프로그램에서 자유롭게 불러 쓸 수 있음",
            ],
          },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "그 대가",
        body: [
          {
            t: "ul",
            items: [
              "**버그를 못 고침** → 우회 방법(새 금고를 만들어 옛 금고가 가리키게 하기)이 있지만, 그건 다시 \"누군가 마음대로 바꿀 수 있다\"는 위험을 되살립니다",
              "**저장된 값이 전부 공개됨** → \"이건 비공개\"라고 코드에 표시해도, 다른 프로그램의 접근만 막을 뿐 장부 데이터를 직접 들여다보면 다 보입니다",
              "**고칠 권한을 가진 열쇠 자체가 공격 표적** → 실제 해킹 사고의 상당수가 이 관리자 열쇠를 훔치는 방식으로 일어납니다",
              "**엉성한 코드는 그대로 사용자 비용이 됨** → 비효율적으로 짠 프로그램은 쓸 때마다 수수료가 더 비쌉니다",
            ],
          },
        ],
      },
    ],
  },
  { t: "h3", md: "\"설명서\"가 있어야 대화가 됩니다 (ABI)" },
  {
    t: "p",
    md: "어떤 프로그램에게 일을 시키려면, 그 프로그램이 어떤 기능(함수)을 갖고 있고 각 기능에 무엇을 넣어야 하는지 알아야 합니다. 이 설명서 역할을 하는 문서를 **ABI**라고 부릅니다.",
  },
  {
    t: "code",
    lang: "ts",
    src: `
[
  {
    "name": "transfer",
    "type": "function",
    "stateMutability": "nonpayable",   // 장부 내용을 바꾸는 기능 → 수수료 필요
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
    md: "위 설명서는 \"`transfer`라는 기능이 있고, 받는 주소와 금액을 넣으면 성공 여부를 알려준다\"는 뜻입니다. 실제로는 이 설명서를 컴퓨터가 읽기 쉬운 암호 같은 형태로 바꿔서 요청을 보내는데, 이 변환은 프로그램이 자동으로 처리해주므로 사람이 직접 할 일은 없습니다.",
  },
  { t: "h4", md: "\"읽기\"와 \"쓰기\"는 완전히 다르게 취급됩니다" },
  {
    t: "table",
    head: ["종류", "의미", "실제로 벌어지는 일"],
    rows: [
      ["읽기 전용(`view`/`pure`)", "장부를 보기만 함, 바꾸지 않음", "**수수료 없이, 즉시** 결과를 받습니다. 지갑 서명도 필요 없습니다"],
      ["쓰기(`nonpayable`)", "장부 내용을 바꿈", "거래가 필요합니다. 지갑에서 서명하고 확정될 때까지 기다려야 합니다"],
      ["쓰기 + 송금(`payable`)", "장부를 바꾸면서 코인도 함께 보냄", "위와 같지만 보낼 금액도 같이 지정합니다"],
    ],
  },
  { t: "h3", md: "이벤트 = 방명록, 뒤에서 조회의 생명줄" },
  {
    t: "p",
    md: "프로그램은 어떤 일이 일어났을 때 **이벤트**라는 기록을 별도로 남길 수 있습니다. 장부에 값을 저장하는 것보다 훨씬 저렴하지만, 대신 프로그램 스스로는 이 기록을 다시 읽을 수 없습니다 — **바깥에서 지켜보고 정리하는 용도**입니다.",
  },
  {
    t: "callout",
    tone: "fe",
    title: "왜 중요한가",
    body: [
      {
        t: "p",
        md: "\"이 사용자의 거래 내역을 전부 보여줘\" 같은 질문을 프로그램에게 직접 물어볼 수는 없습니다. 그런 기능 자체가 없고, 억지로 만들어도 비용이 폭발적으로 늘어납니다. 대신 이 이벤트 기록을 미리 정리해둔 별도 서비스(The Graph 같은 것)에 물어봅니다. 손님이 올 때마다 방명록에 적어두고, \"누가 언제 왔었나\"는 그 방명록을 따로 정리해둔 안내데스크에 물어보는 것과 같은 구조입니다. **Web3 서비스에도 결국 별도의 뒷단 서버(인덱서)가 필요한 가장 큰 이유가 이것입니다.**",
      },
    ],
  },
  { t: "hr" },
  { t: "h2", md: "토큰 표준(ERC)" },
  {
    t: "p",
    md: "**ERC**는 커뮤니티가 합의한 공통 규격입니다. 지키지 않아도 프로그램은 돌아가지만, 규격을 지키면 모든 지갑·거래소·마켓플레이스가 자동으로 알아봅니다. 서로 다른 리모컨이라도 같은 규격의 건전지를 쓰면 다 호환되는 것과 비슷합니다.",
  },
  {
    t: "table",
    head: ["표준", "이름", "용도", "실제 사례"],
    rows: [
      ["**ERC-20**", "대체 가능 토큰", "1개가 다른 1개와 완전히 동일. 화폐·포인트 같은 것", "USDC, USDT, UNI"],
      ["**ERC-721**", "NFT", "각 토큰이 고유 번호를 가져 서로 구별됨", "CryptoPunks, ENS 도메인"],
      ["**ERC-1155**", "여러 토큰을 한 번에", "한 프로그램에서 여러 종류를 동시에 관리, 여러 개를 한 번에 전송", "게임 아이템 인벤토리"],
      ["**ERC-4626**", "수익형 금고 규격", "돈을 맡기고 찾는 방식(예치·출금)을 표준화", "Yearn, Morpho의 금고 상품"],
      ["**ERC-2612**", "서명만으로 허가", "허가를 위한 거래 한 번을 서명 한 번으로 대체해 더 간편하게", "USDC, DAI"],
      ["**ERC-4337**", "계정 추상화", "[4장](/web3/wallet)에서 본 스마트 지갑(복구·수수료 대납 등)의 기반 규격", "Safe, Biconomy"],
      ["**ERC-5792**", "여러 동작 한 번에 묶기", "\"이것도 하고 저것도 해줘\"를 한 번의 요청으로 처리", "2026년 기준 새 표준"],
      ["**ERC-6551**", "토큰이 지갑을 가짐", "NFT 하나가 스스로 지갑처럼 다른 자산을 소유할 수 있음", "게임 캐릭터가 아이템을 소유"],
    ],
  },
  { t: "h3", md: "ERC-20이 실제로 어떻게 생겼는지" },
  {
    t: "p",
    md: "코드를 몰라도 됩니다. \"이런 기능들이 정해진 이름으로 존재한다\"는 것만 봐도 충분합니다.",
  },
  {
    t: "code",
    lang: "ts",
    src: `
interface IERC20 {
    // 읽기 (수수료 없음)
    function totalSupply() external view returns (uint256);       // 전체 발행량
    function balanceOf(address account) external view returns (uint256); // 이 주소의 잔고
    function allowance(address owner, address spender) external view returns (uint256); // 허가해준 한도

    // 쓰기 (거래 필요)
    function transfer(address to, uint256 amount) external returns (bool);       // 보내기
    function approve(address spender, uint256 amount) external returns (bool);   // 대신 가져갈 수 있게 허가
    function transferFrom(address from, address to, uint256 amount) external returns (bool); // 허가받은 만큼 대신 가져가기

    // 이벤트 (바깥에서 지켜보는 기록)
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}`,
  },
  {
    t: "callout",
    tone: "warn",
    title: "\"허가 후 실행\" 패턴: Web3 사용성의 최대 난관",
    body: [
      { t: "p", md: "토큰을 다른 서비스(예: 거래소 역할을 하는 프로그램)에서 교환하려면 보통 **거래를 두 번** 해야 합니다." },
      {
        t: "ol",
        items: [
          "\"이 프로그램이 내 토큰 얼마까지는 가져가도 좋다\"고 미리 허가(`approve`)",
          "그 프로그램이 실제로 교환을 실행하면서 허가받은 만큼 가져감(`transferFrom`)",
        ],
      },
      {
        t: "p",
        md: "**왜 이렇게 번거롭게 할까요?** 프로그램이 내 지갑에서 마음대로 돈을 빼갈 수 없게 막아뒀기 때문입니다 — 반드시 명시적인 허가가 먼저 있어야 합니다. 문제는 두 가지입니다. 거래를 두 번 해야 해서 번거롭고, 많은 서비스가 편의상 \"금액 제한 없이\" 허가를 요청하는데 나중에 그 서비스가 해킹당하면 **허가해준 만큼(사실상 전 재산까지) 털릴 수 있습니다.**",
      },
      {
        t: "figure",
        caption: "허가는 한 번 해두면 계속 남아 있습니다. 그래서 오래된 허가를 정리하는 일이 필요합니다.",
        svg: `<svg viewBox="0 0 640 254" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="허가 후 실행 두 단계와 무제한 허가의 위험">
  <g font-family="ui-sans-serif, system-ui" font-size="11" fill="currentColor">
    <rect x="20" y="34" width="104" height="40" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.45"/>
    <text x="72" y="52" text-anchor="middle">내 지갑</text>
    <text x="72" y="67" text-anchor="middle" font-size="9.5" fill-opacity="0.55">토큰 100개</text>

    <rect x="268" y="34" width="120" height="40" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.45"/>
    <text x="328" y="52" text-anchor="middle">교환 프로그램</text>
    <text x="328" y="67" text-anchor="middle" font-size="9.5" fill-opacity="0.55">스마트 컨트랙트</text>

    <text x="20" y="20" font-size="11.5" fill-opacity="0.62">1단계 — 허가</text>
    <line x1="124" y1="54" x2="262" y2="54" stroke="currentColor" stroke-opacity="0.45"/>
    <polygon points="262,54 254,50 254,58" fill="currentColor" fill-opacity="0.45"/>
    <text x="193" y="46" text-anchor="middle" font-size="10" fill-opacity="0.6">"10개까지 가져가도 좋다"</text>
    <text x="193" y="90" text-anchor="middle" font-size="9.5" fill-opacity="0.45">거래 1회 · 수수료 발생</text>

    <text x="20" y="126" font-size="11.5" fill-opacity="0.62">2단계 — 실행</text>
    <rect x="20" y="140" width="104" height="40" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.45"/>
    <text x="72" y="158" text-anchor="middle">내 지갑</text>
    <text x="72" y="173" text-anchor="middle" font-size="9.5" fill-opacity="0.55">토큰 90개</text>

    <rect x="268" y="140" width="120" height="40" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.45"/>
    <text x="328" y="158" text-anchor="middle">교환 프로그램</text>
    <text x="328" y="173" text-anchor="middle" font-size="9.5" fill-opacity="0.55">허가받은 10개 가져감</text>

    <line x1="262" y1="160" x2="128" y2="160" stroke="currentColor" stroke-opacity="0.45"/>
    <polygon points="128,160 136,156 136,164" fill="currentColor" fill-opacity="0.45"/>
    <text x="193" y="152" text-anchor="middle" font-size="10" fill-opacity="0.6">실제로 가져감</text>
    <text x="193" y="196" text-anchor="middle" font-size="9.5" fill-opacity="0.45">거래 2회째 · 수수료 또 발생</text>

    <line x1="418" y1="24" x2="418" y2="212" stroke="currentColor" stroke-opacity="0.15"/>

    <text x="438" y="20" font-size="11.5" fill-opacity="0.62">⚠ 무제한으로 허가하면</text>
    <rect x="438" y="34" width="182" height="40" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.65"/>
    <text x="529" y="52" text-anchor="middle" font-size="10.5">"얼마든지 가져가도 좋다"</text>
    <text x="529" y="67" text-anchor="middle" font-size="9.5" fill-opacity="0.55">한도 없음</text>

    <text x="438" y="98" font-size="10" fill-opacity="0.6">편합니다 — 다시 허가할 일이 없으니까요.</text>

    <text x="438" y="128" font-size="10" fill-opacity="0.6">그런데 이 허가는 계속 살아 있습니다.</text>
    <text x="438" y="146" font-size="10" fill-opacity="0.6">몇 달 뒤 그 프로그램이 해킹당하면,</text>
    <text x="438" y="164" font-size="10" fill-opacity="0.72">공격자가 그 허가를 그대로 씁니다.</text>

    <text x="438" y="194" font-size="10" fill-opacity="0.5">그래서 오래된 허가는 정리해야 합니다.</text>

    <text x="20" y="240" font-size="10" fill-opacity="0.45">이 번거로움을 줄이려고 서명 한 번으로 허가를 대신하거나, 두 단계를 한 번에 묶는 방식이 나왔습니다.</text>
  </g>
</svg>`,
      },
      {
        t: "p",
        md: "**2026년의 개선책:** 서명 한 번으로 허가를 대신하는 방식(ERC-2612), 여러 동작을 한 번에 묶는 방식(ERC-5792), 일반 지갑이 이런 기능을 빌려 쓰는 방식([4장](/web3/wallet)에서 본 2025년부터의 변화) 세 가지가 이 문제를 줄이고 있습니다. 그리고 오래전에 내준 무제한 허가는 revoke.cash 같은 도구로 주기적으로 정리하는 게 좋습니다.",
      },
    ],
  },
  { t: "h3", md: "\"코인\"과 \"토큰\"은 다른 말입니다" },
  {
    t: "ul",
    items: [
      "**코인(네이티브 자산)** — 그 체인 자체의 화폐입니다. ETH, BTC처럼요. 수수료를 낼 때 쓰이고, 별도의 프로그램 없이 체인 자체에 내장돼 있습니다",
      "**토큰** — 프로그램이 발행한 자산입니다. USDC는 사실 \"누가 얼마를 갖고 있다\"는 목록 하나를 관리하는 프로그램일 뿐입니다",
    ],
  },
  {
    t: "p",
    md: "그래서 실제로 서비스를 만들 때는 **ETH 잔고를 확인하는 방법과 USDC 잔고를 확인하는 방법이 코드상 완전히 다릅니다.** 전자는 체인에 바로 물어보면 되고, 후자는 USDC라는 프로그램에게 \"이 주소 잔고가 얼마냐\"고 물어봐야 합니다. 처음 접하면 자주 헷갈리는 지점입니다.",
  },
];

export default blocks;
