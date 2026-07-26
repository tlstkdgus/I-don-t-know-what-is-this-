import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  { t: "h2", md: "12. Web3 앱 아키텍처" },
  { t: "p", md: "여기가 이 문서의 핵심입니다. 이미 알고 있는 것과 새로 배울 것을 정확히 구분해 봅시다." },
  { t: "h3", md: "Web2 vs Web3 아키텍처" },
  {
    t: "figure",
    svg: "<svg viewBox=\"0 0 760 330\" xmlns=\"http://www.w3.org/2000/svg\"><g font-family=\"sans-serif\" font-size=\"11\"><text x=\"10\" y=\"18\" fill=\"var(--ink-dim)\" font-size=\"13\" font-weight=\"bold\">Web2</text><rect x=\"10\" y=\"28\" width=\"150\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"34\" y=\"54\" fill=\"var(--ink)\">React 프론트엔드</text><line x1=\"85\" y1=\"70\" x2=\"85\" y2=\"92\" stroke=\"var(--fe)\" stroke-width=\"1.5\"/><text x=\"92\" y=\"86\" fill=\"var(--ink-dim)\" font-size=\"10\">fetch / REST</text><rect x=\"10\" y=\"92\" width=\"150\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"42\" y=\"118\" fill=\"var(--ink)\">내 API 서버</text><line x1=\"85\" y1=\"134\" x2=\"85\" y2=\"156\" stroke=\"var(--fe)\" stroke-width=\"1.5\"/><rect x=\"10\" y=\"156\" width=\"150\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"52\" y=\"182\" fill=\"var(--ink)\">내 DB</text><text x=\"10\" y=\"222\" fill=\"var(--ink-dim)\" font-size=\"10.5\">✓ 내가 전부 통제</text><text x=\"10\" y=\"240\" fill=\"var(--ink-dim)\" font-size=\"10.5\">✓ 빠르고 값싼 쿼리</text><text x=\"10\" y=\"258\" fill=\"var(--ink-dim)\" font-size=\"10.5\">✗ 사용자는 데이터를 소유하지 못함</text><line x1=\"200\" y1=\"20\" x2=\"200\" y2=\"300\" stroke=\"var(--hairline)\" stroke-dasharray=\"4 4\"/><text x=\"230\" y=\"18\" fill=\"var(--fe)\" font-size=\"13\" font-weight=\"bold\">Web3</text><rect x=\"230\" y=\"28\" width=\"160\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--fe)88\"/><text x=\"252\" y=\"54\" fill=\"var(--ink)\">React 프론트엔드</text><rect x=\"440\" y=\"28\" width=\"140\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"470\" y=\"48\" fill=\"var(--ink)\">지갑</text><text x=\"452\" y=\"63\" fill=\"var(--ink-dim)\" font-size=\"9.5\">MetaMask / Rabby</text><line x1=\"390\" y1=\"49\" x2=\"436\" y2=\"49\" stroke=\"var(--fe)\" stroke-width=\"1.5\"/><text x=\"392\" y=\"42\" fill=\"var(--ink-dim)\" font-size=\"9\">서명 요청</text><rect x=\"620\" y=\"28\" width=\"130\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"638\" y=\"48\" fill=\"var(--ink)\">인덱서 / API</text><text x=\"632\" y=\"63\" fill=\"var(--ink-dim)\" font-size=\"9.5\">The Graph, Alchemy</text><line x1=\"390\" y1=\"88\" x2=\"680\" y2=\"88\" stroke=\"var(--tip)\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/><line x1=\"680\" y1=\"70\" x2=\"680\" y2=\"88\" stroke=\"var(--tip)\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/><line x1=\"310\" y1=\"70\" x2=\"310\" y2=\"88\" stroke=\"var(--tip)\" stroke-width=\"1\" stroke-dasharray=\"3 3\"/><text x=\"440\" y=\"103\" fill=\"var(--tip)\" font-size=\"9.5\">읽기 최적화 경로 (히스토리·검색·집계)</text><line x1=\"310\" y1=\"112\" x2=\"310\" y2=\"140\" stroke=\"var(--fe)\" stroke-width=\"1.5\"/><text x=\"318\" y=\"132\" fill=\"var(--ink-dim)\" font-size=\"10\">JSON-RPC</text><rect x=\"230\" y=\"140\" width=\"160\" height=\"42\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"248\" y=\"160\" fill=\"var(--ink)\">RPC 노드 제공자</text><text x=\"252\" y=\"175\" fill=\"var(--ink-dim)\" font-size=\"9.5\">Alchemy / Infura</text><line x1=\"310\" y1=\"182\" x2=\"310\" y2=\"208\" stroke=\"var(--fe)\" stroke-width=\"1.5\"/><rect x=\"230\" y=\"208\" width=\"330\" height=\"52\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--tip)88\"/><text x=\"248\" y=\"230\" fill=\"var(--tip)\" font-weight=\"bold\">블록체인 (공유 백엔드)</text><text x=\"248\" y=\"248\" fill=\"var(--ink-dim)\" font-size=\"10\">스마트 컨트랙트 = 로직 · 온체인 상태 = DB</text><rect x=\"590\" y=\"208\" width=\"160\" height=\"52\" rx=\"8\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"608\" y=\"230\" fill=\"var(--ink)\">IPFS / Arweave</text><text x=\"608\" y=\"248\" fill=\"var(--ink-dim)\" font-size=\"10\">이미지·메타데이터</text><line x1=\"560\" y1=\"234\" x2=\"586\" y2=\"234\" stroke=\"var(--hairline)\" stroke-width=\"1.5\"/><text x=\"230\" y=\"288\" fill=\"var(--ink-dim)\" font-size=\"10.5\">✓ 사용자가 자산을 소유 ✓ 백엔드를 남과 공유(조합 가능) ✗ 쓰기가 느리고 비쌈 ✗ 읽기는 별도 인프라 필요</text></g></svg>",
  },
  { t: "h3", md: "바뀌는 것 / 안 바뀌는 것" },
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
              "React / Next.js / Vue — 전부 동일",
              "TypeScript, Tailwind, 상태관리",
              "TanStack Query — **wagmi가 내부적으로 이걸 씁니다**",
              "Vercel 배포, CI/CD, 테스트",
              "컴포넌트 설계, 접근성, 반응형",
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
              "지갑 연결과 **체인 전환** 상태 관리",
              "`bigint` 기반 금액 처리와 소수점(decimals)",
              "트랜잭션 라이프사이클 UI (제출→포함→확정)",
              "실패 시나리오: 거절, 가스 부족, revert, nonce 충돌",
              "ABI와 타입 생성",
              "온체인 읽기 vs 인덱서 읽기의 구분",
            ],
          },
        ],
      },
    ],
  },
  {
    t: "callout",
    tone: "fe",
    title: "멘탈 모델 매핑",
    body: [
      {
        t: "table",
        head: ["Web2 개념", "Web3 대응"],
        rows: [
          ["`fetch('/api/...')`", "JSON-RPC 호출 (`eth_call`, `eth_sendRawTransaction`)"],
          ["REST 엔드포인트", "컨트랙트 함수"],
          ["OpenAPI / Swagger", "**ABI**"],
          ["DB row", "컨트랙트 storage slot"],
          ["JWT / 세션 쿠키", "지갑 서명 (SIWE)"],
          ["웹훅 / SSE", "이벤트 로그 구독 (`watchContractEvent`)"],
          ["Elasticsearch / read replica", "The Graph 서브그래프, 인덱서 API"],
          ["S3 / CDN", "IPFS, Arweave"],
          ["환경변수 `API_URL`", "`chainId` + RPC URL + 컨트랙트 주소"],
        ],
      },
    ],
  },
  { t: "hr" },
  { t: "h2", md: "2026년 프론트엔드 스택" },
  {
    t: "table",
    head: ["레이어", "도구", "역할"],
    rows: [
      [
        "**저수준 클라이언트**",
        "**viem** 표준 ethers.js v6, web3.js는 레거시",
        "RPC 추상화, ABI 인코딩, 타입 안전한 컨트랙트 호출. 트리셰이킹 잘 되고 TS 추론이 강력",
      ],
      ["**React 훅**", "**wagmi v2**", "viem 위의 React 계층. 계정·체인·컨트랙트 훅 제공. 내부적으로 TanStack Query v5 사용"],
      ["**지갑 연결 UI**", "RainbowKit / ConnectKit / Web3Modal(Reown)", "지갑 선택 모달, 체인 전환 UI를 완성품으로 제공"],
      ["**RPC 제공자**", "Alchemy, Infura, QuickNode, Ankr, drpc", "노드를 직접 안 돌리고 API로 체인에 접근. 무료 티어 존재"],
      ["**인덱싱**", "The Graph, Ponder, Envio, Goldsky", "이벤트 로그를 GraphQL/SQL로 조회 가능하게"],
      ["**파일 저장**", "IPFS(Pinata, web3.storage), Arweave", "이미지·메타데이터. 온체인엔 해시/URI만 저장"],
      ["**가격·데이터**", "Chainlink 오라클, CoinGecko API", "체인 밖 데이터를 온체인/앱으로"],
      ["**계정 추상화**", "Privy, Dynamic, Safe, ZeroDev, Biconomy", "이메일/소셜 로그인으로 지갑 생성, 가스 대납"],
      ["**컨트랙트 개발**", "**Foundry** (Rust 기반, 빠름) / Hardhat (JS 친화)", "컴파일·테스트·배포. 로컬 체인(anvil) 포함"],
      ["**컨트랙트 라이브러리**", "OpenZeppelin Contracts, Solady", "감사받은 ERC-20/721 구현체. **직접 짜지 마세요**"],
    ],
  },
  { t: "h3", md: "왜 viem/wagmi인가 (ethers.js 대신)" },
  {
    t: "ul",
    items: [
      "**타입 추론** — ABI를 `as const`로 넘기면 함수명·인자·반환 타입이 전부 자동 추론됩니다. 오타가 컴파일 타임에 잡힙니다",
      "**번들 크기** — 모듈러 설계로 트리셰이킹이 잘 됩니다",
      "**TanStack Query 통합** — 캐싱·재검증·로딩 상태를 이미 아는 방식으로 다룹니다",
      "**생태계 기본값** — RainbowKit, Privy 등 주요 라이브러리가 wagmi를 전제로 합니다",
    ],
  },
  {
    t: "code",
    lang: "bash",
    src: `
npm install wagmi viem @tanstack/react-query
# 지갑 UI까지 원한다면
npm install @rainbow-me/rainbowkit`,
  },
];

export default blocks;
