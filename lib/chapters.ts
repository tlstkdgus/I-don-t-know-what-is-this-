export type Chapter = {
  slug: string;
  num: number;
  title: string;
  desc: string;
  part: string;
  partKey: string;
  minutes: number;
  tags: string[];
};

export const PARTS = [
  { key: "Part 1", name: "블록체인의 원리" },
  { key: "Part 2", name: "이더리움" },
  { key: "Part 3", name: "확장성" },
  { key: "Part 4", name: "프론트엔드 실무" },
  { key: "Part 5", name: "생태계와 현실" },
] as const;

export const chapters: Chapter[] = [
  {
    slug: "what-is-web3",
    num: 1,
    title: "Web3란 무엇인가",
    desc: "Web1 → Web2 → Web3의 실제 차이. 마케팅 수사를 걷어내고 무엇이 달라지는지부터.",
    part: "블록체인의 원리",
    partKey: "Part 1",
    minutes: 8,
    tags: ["개념", "입문"],
  },
  {
    slug: "blockchain",
    num: 2,
    title: "블록체인 구조: 해시와 체인",
    desc: "해시 함수부터 블록 연결까지. 직접 데이터를 조작해 보며 왜 위조가 불가능한지 확인합니다.",
    part: "블록체인의 원리",
    partKey: "Part 1",
    minutes: 12,
    tags: ["실습", "핵심"],
  },
  {
    slug: "consensus",
    num: 3,
    title: "합의 알고리즘과 트릴레마",
    desc: "PoW vs PoS, 최종성(Finality), 그리고 왜 트랜잭션이 즉시 확정되지 않는가.",
    part: "블록체인의 원리",
    partKey: "Part 1",
    minutes: 9,
    tags: ["개념"],
  },
  {
    slug: "wallet",
    num: 4,
    title: "지갑과 키: 계정의 정체",
    desc: "개인키·시드구문·주소의 관계와, 서명이 어떻게 로그인을 대체하는지.",
    part: "블록체인의 원리",
    partKey: "Part 1",
    minutes: 10,
    tags: ["보안", "인증"],
  },
  {
    slug: "evm",
    num: 5,
    title: "EVM과 계정 모델",
    desc: "전 세계가 공유하는 단일 상태 머신. EOA와 컨트랙트 계정의 차이.",
    part: "이더리움",
    partKey: "Part 2",
    minutes: 8,
    tags: ["이더리움"],
  },
  {
    slug: "gas",
    num: 6,
    title: "트랜잭션과 가스",
    desc: "수수료 계산기로 직접 확인하는 2026년 실제 비용. \"이더리움은 비싸다\"는 이제 틀린 전제입니다.",
    part: "이더리움",
    partKey: "Part 2",
    minutes: 11,
    tags: ["실습", "2026 업데이트"],
  },
  {
    slug: "contracts",
    num: 7,
    title: "스마트 컨트랙트와 ERC 표준",
    desc: "ABI, 이벤트, ERC-20/721/4337. approve 지옥이 왜 생기고 어떻게 벗어나는가.",
    part: "이더리움",
    partKey: "Part 2",
    minutes: 14,
    tags: ["핵심", "표준"],
  },
  {
    slug: "layer2",
    num: 8,
    title: "L2와 롤업, 체인 지형도",
    desc: "옵티미스틱 vs ZK 롤업, 블롭, 그리고 어느 체인에서 개발을 시작해야 하는가.",
    part: "확장성",
    partKey: "Part 3",
    minutes: 12,
    tags: ["확장성", "2026 업데이트"],
  },
  {
    slug: "architecture",
    num: 9,
    title: "Web3 앱 아키텍처와 스택",
    desc: "React/REST 지식을 그대로 매핑합니다. 바뀌는 것과 안 바뀌는 것의 정확한 경계.",
    part: "프론트엔드 실무",
    partKey: "Part 4",
    minutes: 11,
    tags: ["프론트엔드", "핵심"],
  },
  {
    slug: "code",
    num: 10,
    title: "실전 코드: wagmi + viem",
    desc: "설정부터 지갑 연결, 컨트랙트 읽기/쓰기, 이벤트 구독, SIWE 로그인까지 동작하는 코드 8종.",
    part: "프론트엔드 실무",
    partKey: "Part 4",
    minutes: 18,
    tags: ["코드", "실무"],
  },
  {
    slug: "solidity",
    num: 11,
    title: "Solidity와 함정 12가지",
    desc: "컨트랙트를 읽는 법, 보안 패턴, 그리고 프론트엔드가 반드시 겪는 실수들과 학습 로드맵.",
    part: "프론트엔드 실무",
    partKey: "Part 4",
    minutes: 16,
    tags: ["코드", "로드맵"],
  },
  {
    slug: "ecosystem",
    num: 12,
    title: "생태계: DeFi · NFT · DAO · 스테이블코인",
    desc: "실제로 돈이 어디서 어떻게 움직이는가. 2026년 기준 검증된 수치와 함께.",
    part: "생태계와 현실",
    partKey: "Part 5",
    minutes: 15,
    tags: ["생태계", "2026 업데이트"],
  },
  {
    slug: "risk",
    num: 13,
    title: "리스크와 비판론",
    desc: "해킹 통계, 사기 유형, 그리고 \"탈중앙화 극장\" 비판. 균형을 위해 반드시 읽어야 할 장.",
    part: "생태계와 현실",
    partKey: "Part 5",
    minutes: 12,
    tags: ["보안", "비판"],
  },
];

export const bySlug = (slug: string) => chapters.find((c) => c.slug === slug);

export const neighbors = (slug: string) => {
  const i = chapters.findIndex((c) => c.slug === slug);
  return { prev: i > 0 ? chapters[i - 1] : null, next: i < chapters.length - 1 ? chapters[i + 1] : null };
};

export const totalMinutes = chapters.reduce((a, c) => a + c.minutes, 0);
