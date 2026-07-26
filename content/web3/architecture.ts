import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "p",
    md: "지금까지는 Web3가 무엇이고 왜 그렇게 동작하는지를 봤습니다. 이번 장은 이런 서비스가 **실제로 어떻게 만들어지는지** 살짝 들여다봅니다. 직접 만들 계획이 없어도, 지금까지 배운 개념들이 실제 도구에서 어떤 모습으로 나타나는지 보면 이해가 한층 단단해집니다.",
  },
  { t: "h3", md: "지금 흔한 서비스 구조와 무엇이 다른가" },
  {
    t: "figure",
    svg: "<svg viewBox=\"0 0 760 330\" xmlns=\"http://www.w3.org/2000/svg\"><g font-family=\"sans-serif\" font-size=\"11\"><text x=\"10\" y=\"18\" fill=\"var(--ink-dim)\" font-size=\"13\" font-weight=\"bold\">지금 흔한 구조</text><rect x=\"10\" y=\"28\" width=\"150\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"34\" y=\"54\" fill=\"var(--ink)\">화면(프론트엔드)</text><line x1=\"85\" y1=\"70\" x2=\"85\" y2=\"92\" stroke=\"var(--fe)\" stroke-width=\"1.5\"/><text x=\"92\" y=\"86\" fill=\"var(--ink-dim)\" font-size=\"10\">데이터 요청</text><rect x=\"10\" y=\"92\" width=\"150\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"42\" y=\"118\" fill=\"var(--ink)\">회사 서버</text><line x1=\"85\" y1=\"134\" x2=\"85\" y2=\"156\" stroke=\"var(--fe)\" stroke-width=\"1.5\"/><rect x=\"10\" y=\"156\" width=\"150\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"52\" y=\"182\" fill=\"var(--ink)\">회사 DB</text><text x=\"10\" y=\"222\" fill=\"var(--ink-dim)\" font-size=\"10.5\">✓ 회사가 전부 통제</text><text x=\"10\" y=\"240\" fill=\"var(--ink-dim)\" font-size=\"10.5\">✓ 빠르고 값싼 조회</text><text x=\"10\" y=\"258\" fill=\"var(--ink-dim)\" font-size=\"10.5\">✗ 사용자는 데이터를 소유하지 못함</text><line x1=\"200\" y1=\"20\" x2=\"200\" y2=\"300\" stroke=\"var(--hairline)\" stroke-dasharray=\"4 4\"/><text x=\"230\" y=\"18\" fill=\"var(--fe)\" font-size=\"13\" font-weight=\"bold\">Web3 구조</text><rect x=\"230\" y=\"28\" width=\"160\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--fe)88\"/><text x=\"252\" y=\"54\" fill=\"var(--ink)\">화면(프론트엔드)</text><rect x=\"440\" y=\"28\" width=\"140\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"470\" y=\"48\" fill=\"var(--ink)\">지갑</text><text x=\"452\" y=\"63\" fill=\"var(--ink-dim)\" font-size=\"9.5\">MetaMask 등</text><line x1=\"390\" y1=\"49\" x2=\"436\" y2=\"49\" stroke=\"var(--fe)\" stroke-width=\"1.5\"/><text x=\"392\" y=\"42\" fill=\"var(--ink-dim)\" font-size=\"9\">서명 요청</text><rect x=\"620\" y=\"28\" width=\"130\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"638\" y=\"48\" fill=\"var(--ink)\">인덱싱 서비스</text><text x=\"632\" y=\"63\" fill=\"var(--ink-dim)\" font-size=\"9.5\">The Graph 등</text><line x1=\"390\" y1=\"88\" x2=\"680\" y2=\"88\" stroke=\"var(--tip)\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/><line x1=\"680\" y1=\"70\" x2=\"680\" y2=\"88\" stroke=\"var(--tip)\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/><line x1=\"310\" y1=\"70\" x2=\"310\" y2=\"88\" stroke=\"var(--tip)\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/><text x=\"440\" y=\"103\" fill=\"var(--tip)\" font-size=\"9.5\">조회 전용 경로 (과거 기록·검색·집계)</text><line x1=\"310\" y1=\"112\" x2=\"310\" y2=\"140\" stroke=\"var(--fe)\" stroke-width=\"1.5\"/><text x=\"318\" y=\"132\" fill=\"var(--ink-dim)\" font-size=\"10\">체인에 연결해주는 창구</text><rect x=\"230\" y=\"140\" width=\"160\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"248\" y=\"160\" fill=\"var(--ink)\">노드 제공 서비스</text><text x=\"252\" y=\"175\" fill=\"var(--ink-dim)\" font-size=\"9.5\">Alchemy 등</text><line x1=\"310\" y1=\"182\" x2=\"310\" y2=\"208\" stroke=\"var(--fe)\" stroke-width=\"1.5\"/><rect x=\"230\" y=\"208\" width=\"330\" height=\"52\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--tip)88\"/><text x=\"248\" y=\"230\" fill=\"var(--tip)\" font-weight=\"bold\">블록체인 (공유 백엔드)</text><text x=\"248\" y=\"248\" fill=\"var(--ink-dim)\" font-size=\"10\">프로그램 = 처리 로직 · 장부 = 저장 공간</text><rect x=\"590\" y=\"208\" width=\"160\" height=\"52\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"608\" y=\"230\" fill=\"var(--ink)\">IPFS / Arweave</text><text x=\"608\" y=\"248\" fill=\"var(--ink-dim)\" font-size=\"10\">이미지 등 큰 파일 저장</text><line x1=\"560\" y1=\"234\" x2=\"586\" y2=\"234\" stroke=\"var(--hairline)\" stroke-width=\"1.5\"/><text x=\"230\" y=\"288\" fill=\"var(--ink-dim)\" font-size=\"10.5\">✓ 사용자가 자산 소유 ✓ 남이 만든 것과 조합 가능 ✗ 기록이 느리고 비쌈 ✗ 조회는 별도 인프라 필요</text></g></svg>",
  },
  { t: "h3", md: "그대로인 것 / 새로 필요한 것" },
  {
    t: "p",
    md: "일반적인 웹 서비스를 만드는 방법을 이미 안다면, 그중 상당 부분은 Web3에서도 똑같이 씁니다. 새로 필요한 건 \"블록체인이라는 특수한 뒷단과 대화하는 법\" 정도입니다.",
  },
  {
    t: "grid",
    cols: 2,
    items: [
      {
        t: "card",
        tone: "tip",
        title: "그대로 쓰는 것",
        body: [
          {
            t: "ul",
            items: [
              "화면을 만드는 도구(React, Next.js, Vue 등) — 전부 동일",
              "타입 체크, 디자인, 상태 관리 같은 일반적인 개발 방법론",
              "화면 배포, 자동 테스트·배포 파이프라인",
              "컴포넌트 설계, 접근성, 반응형 레이아웃",
            ],
          },
        ],
      },
      {
        t: "card",
        tone: "warn",
        title: "새로 배울 것",
        body: [
          {
            t: "ul",
            items: [
              "지갑 연결 상태와, 사용자가 어느 체인에 접속해 있는지 관리하기",
              "아주 큰 정수로 금액을 다루는 법 ([6장](/web3/gas)의 wei 단위)",
              "거래가 \"보냄 → 처리됨 → 확정됨\" 단계를 거치는 걸 화면에 보여주기",
              "실패 상황 대응: 사용자가 서명을 거절함, 수수료 부족, 프로그램이 조건을 안 받아줌",
              "[7장](/web3/contracts)에서 본 ABI(프로그램 설명서) 다루기",
              "\"지금 이 순간 값\"을 체인에서 바로 읽을지, 정리된 기록을 인덱싱 서비스에서 읽을지 구분하기",
            ],
          },
        ],
      },
    ],
  },
  {
    t: "callout",
    tone: "fe",
    title: "기존 웹 개발 지식이 있다면: 부품 대응표",
    body: [
      {
        t: "table",
        head: ["지금 흔한 방식", "Web3에서 이에 해당하는 것"],
        rows: [
          ["화면이 서버에 데이터를 요청하는 방식(API 호출)", "화면이 체인에 데이터를 요청하는 방식(JSON-RPC)"],
          ["서버가 제공하는 기능 목록", "프로그램의 함수들([7장](/web3/contracts))"],
          ["그 기능 목록을 설명하는 문서", "**ABI**"],
          ["데이터베이스의 한 줄(row)", "프로그램 저장 공간의 한 칸"],
          ["비밀번호·로그인 유지용 쿠키", "지갑 서명([4장](/web3/wallet))"],
          ["실시간 알림 구독", "이벤트 기록 구독"],
          ["검색·통계용으로 따로 정리해둔 사본", "인덱싱 서비스(The Graph 등)"],
          ["이미지·파일 저장 공간", "IPFS, Arweave"],
          ["\"어느 서버로 접속할지\" 설정값", "\"어느 체인·어느 프로그램인지\" 지정하는 값"],
        ],
      },
    ],
  },
  { t: "hr" },
  { t: "h2", md: "2026년 기준, 실제로 쓰이는 도구들" },
  {
    t: "p",
    md: "아래는 실제로 서비스를 만들 때 쓰는 도구 이름들입니다. 이름 자체를 외울 필요는 없고, \"이런 역할마다 전문 도구가 따로 있구나\" 정도로만 봐도 충분합니다.",
  },
  {
    t: "table",
    head: ["역할", "대표 도구", "하는 일"],
    rows: [
      [
        "체인과 대화하는 기본 도구",
        "**viem**(요즘 표준), ethers.js",
        "체인에 요청을 보내고, 프로그램 설명서(ABI)를 이해하기 쉬운 형태로 바꿔줌",
      ],
      ["화면 프레임워크와 연결", "**wagmi**", "위 도구를 화면 프레임워크(React)에서 바로 쓰기 편하게 감싼 것"],
      ["지갑 연결 화면", "RainbowKit, ConnectKit", "\"지갑 선택\" 팝업과 체인 전환 화면을 완제품으로 제공"],
      ["체인 접속 창구", "Alchemy, Infura", "직접 체인 참가자용 컴퓨터를 운영하지 않고도 체인에 접속하게 해줌"],
      ["기록 정리·조회", "The Graph, Ponder", "이벤트 기록을 검색하기 쉬운 형태로 미리 정리해둠"],
      ["파일 저장", "IPFS, Arweave", "이미지 등 큰 파일. 체인에는 파일 자체가 아니라 그 파일을 가리키는 값만 저장"],
      ["체인 밖 데이터 연결", "Chainlink", "환율·날씨 같은 체인 바깥 정보를 프로그램이 쓸 수 있게 전달"],
      ["쉬운 로그인", "Privy, Dynamic", "이메일·소셜 로그인만으로 지갑을 자동으로 만들어줌"],
      ["프로그램 개발", "Foundry, Hardhat", "프로그램을 작성·검사·배포하는 도구"],
      ["검증된 표준 코드", "OpenZeppelin", "[7장](/web3/contracts)의 ERC 표준들을 이미 안전하게 짜둔 코드 — 직접 처음부터 짜지 않고 가져다 씀"],
    ],
  },
  {
    t: "p",
    md: "이 조합을 실제로 설치하는 명령은 이렇게 생겼습니다 — 참고용입니다.",
  },
  {
    t: "code",
    lang: "bash",
    src: `
npm install wagmi viem @tanstack/react-query
# 지갑 연결 화면까지 완제품으로 쓰고 싶다면
npm install @rainbow-me/rainbowkit`,
  },
];

export default blocks;
