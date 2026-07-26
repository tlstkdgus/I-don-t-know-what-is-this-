/**
 * 사이트 전체의 단일 출처(single source of truth).
 *
 * 주제(Topic) → 챕터(Doc) 2단계 구조입니다.
 * 사이드바, 검색, 이전/다음 네비게이션, generateStaticParams가 전부 이 파일을 읽습니다.
 * 순서·제목·slug는 여기서만 바꾸세요.
 *
 * 챕터를 추가하려면:
 *   1. content/{topic}/{slug}.ts 작성 (Block[] default export)
 *   2. 아래 docs 배열에 항목 추가
 *   3. npm run build 로 정적 경로 생성 확인
 */

export type TopicStatus = "active" | "planned";

export type Topic = {
  slug: string;
  name: string;
  /** 홈 카드 한 줄 요약 */
  tagline: string;
  /** 주제 페이지 도입부 */
  intro: string;
  status: TopicStatus;
  /** 파트 구분. 순서대로 사이드바 그룹이 됩니다. */
  parts: { key: string; name: string }[];
  /** status가 "planned"일 때 주제 페이지에 보여줄 예정 목차 */
  outline?: string[];
};

export type Doc = {
  topic: string;
  slug: string;
  num: number;
  title: string;
  desc: string;
  /** Topic.parts의 key */
  partKey: string;
  minutes: number;
  tags: string[];
};

export const topics: Topic[] = [
  {
    slug: "web3",
    name: "Web3",
    tagline: "블록체인을 아예 모르는 상태에서 시작하는 13장",
    intro:
      "해시 함수부터 wagmi/viem 실전 코드, 2026년 생태계 현황과 비판론까지. 이미 쓰던 도구·패턴에 매핑해 가며 읽습니다.",
    status: "active",
    parts: [
      { key: "p1", name: "블록체인의 원리" },
      { key: "p2", name: "이더리움" },
      { key: "p3", name: "확장성" },
      { key: "p4", name: "프론트엔드 실무" },
      { key: "p5", name: "생태계와 현실" },
    ],
  },
  {
    slug: "data",
    name: "데이터 · 지식 표현",
    tagline: "모델링부터 그래프, 검색, 계보까지",
    intro:
      "테이블을 만들 줄은 아는데 왜 그렇게 만드는지는 설명하기 어려웠던 것들. 데이터에 의미를 붙이는 방법과, 그 의미가 조직 안에서 깨지는 지점을 다룹니다.",
    status: "active",
    parts: [
      { key: "p1", name: "표현과 모델링" },
      { key: "p2", name: "관계와 의미" },
      { key: "p3", name: "검색" },
      // p4(운영과 신뢰 — 계보 · 데이터 계약 · 개인정보)는 아직 챕터가 없습니다.
      // groupedDocs가 빈 파트를 걸러내므로, 등록만 해두고 글이 생기면 docs에 추가합니다.
      { key: "p4", name: "운영과 신뢰" },
    ],
  },
  {
    slug: "backend",
    name: "백엔드 · 인프라",
    tagline: "DB, 네트워크, 컨테이너, 분산 시스템",
    intro:
      "API 너머로 넘어갈 때 매번 막히는 것들. 인덱스가 왜 느려지는지, 컨테이너가 실제로 무엇인지부터.",
    status: "planned",
    parts: [
      { key: "p1", name: "데이터베이스" },
      { key: "p2", name: "네트워크" },
      { key: "p3", name: "배포와 운영" },
      { key: "p4", name: "분산 시스템" },
    ],
    outline: [
      "인덱스는 왜 어떤 쿼리만 빠르게 하는가",
      "트랜잭션 격리 수준과 실제로 겪는 이상 현상",
      "N+1과 커넥션 풀 고갈",
      "TCP 핸드셰이크부터 TLS까지, 요청 하나의 생애",
      "컨테이너는 가상머신이 아니다 — namespace와 cgroup",
      "쿠버네티스: Pod, Service, Ingress의 최소 이해",
      "캐시 무효화 전략과 stale-while-revalidate",
      "CAP와 최종 일관성이 실무에서 뜻하는 것",
    ],
  },
  {
    slug: "cs",
    name: "CS 기초",
    tagline: "OS, 자료구조, 컴파일러, 네트워킹 이론",
    intro:
      "전공으로 배우지 않고 지나쳤지만, 성능 문제를 만날 때마다 발목을 잡는 기초. 실제로 코드에 나타나는 지점 위주로.",
    status: "planned",
    parts: [
      { key: "p1", name: "운영체제" },
      { key: "p2", name: "자료구조와 알고리즘" },
      { key: "p3", name: "언어와 런타임" },
    ],
    outline: [
      "프로세스 · 스레드 · 이벤트 루프의 관계",
      "메모리 계층과 캐시 지역성이 만드는 100배 차이",
      "Big-O를 실제 실행 시간으로 번역하기",
      "해시 테이블이 O(1)이 아닐 때",
      "가비지 컬렉터가 멈추는 순간",
      "컴파일 · 트랜스파일 · JIT의 경계",
      "유니코드, UTF-8, 그리고 문자열 길이라는 거짓말",
    ],
  },
  {
    slug: "ai",
    name: "AI · ML",
    tagline: "LLM, 임베딩, RAG, 학습 원리",
    intro:
      "API를 호출하는 것 이상으로 내려가 봅니다. 토큰이 무엇이고, 임베딩이 왜 검색을 바꾸며, 모델이 왜 틀리는지.",
    status: "planned",
    parts: [
      { key: "p1", name: "언어 모델의 원리" },
      { key: "p2", name: "애플리케이션 패턴" },
      { key: "p3", name: "평가와 한계" },
    ],
    // 검색 계층(역색인 · 벡터 저장소 운영 · 하이브리드 융합)은 data 주제에서 다룹니다.
    // 여기서는 "모델이 데이터를 어떻게 다루는가"만 봅니다.
    outline: [
      "토크나이저 — 모델이 보는 텍스트의 실제 단위",
      "트랜스포머와 어텐션을 수식 없이",
      "컨텍스트 윈도우와 비용의 관계",
      "임베딩은 어떻게 만들어지는가 — 저장·검색 운영은 데이터 주제에서",
      "RAG 파이프라인의 실패 지점들",
      "파인튜닝 · 프롬프트 · 컨텍스트 중 무엇을 언제",
      "환각은 버그가 아니라 성질이다",
    ],
  },
];

export const docs: Doc[] = [
  {
    topic: "web3",
    slug: "what-is-web3",
    num: 1,
    title: "Web3란 무엇인가",
    desc: "Web1 → Web2 → Web3의 실제 차이. 마케팅 수사를 걷어내고 무엇이 달라지는지부터.",
    partKey: "p1",
    minutes: 8,
    tags: ["개념", "입문"],
  },
  {
    topic: "web3",
    slug: "blockchain",
    num: 2,
    title: "블록체인 구조: 해시와 체인",
    desc: "해시 함수부터 블록 연결까지. 직접 데이터를 조작해 보며 왜 위조가 불가능한지 확인합니다.",
    partKey: "p1",
    minutes: 12,
    tags: ["실습", "핵심"],
  },
  {
    topic: "web3",
    slug: "consensus",
    num: 3,
    title: "합의 알고리즘과 트릴레마",
    desc: "PoW vs PoS, 최종성(Finality), 그리고 왜 트랜잭션이 즉시 확정되지 않는가.",
    partKey: "p1",
    minutes: 9,
    tags: ["개념"],
  },
  {
    topic: "web3",
    slug: "wallet",
    num: 4,
    title: "지갑과 키: 계정의 정체",
    desc: "개인키·시드구문·주소의 관계와, 서명이 어떻게 로그인을 대체하는지.",
    partKey: "p1",
    minutes: 10,
    tags: ["보안", "인증"],
  },
  {
    topic: "web3",
    slug: "evm",
    num: 5,
    title: "EVM과 계정 모델",
    desc: "전 세계가 공유하는 단일 상태 머신. EOA와 컨트랙트 계정의 차이.",
    partKey: "p2",
    minutes: 8,
    tags: ["이더리움"],
  },
  {
    topic: "web3",
    slug: "gas",
    num: 6,
    title: "트랜잭션과 가스",
    desc: '수수료 계산기로 직접 확인하는 2026년 실제 비용. "이더리움은 비싸다"는 이제 틀린 전제입니다.',
    partKey: "p2",
    minutes: 11,
    tags: ["실습", "2026 업데이트"],
  },
  {
    topic: "web3",
    slug: "contracts",
    num: 7,
    title: "스마트 컨트랙트와 ERC 표준",
    desc: "ABI, 이벤트, ERC-20/721/4337. approve 지옥이 왜 생기고 어떻게 벗어나는가.",
    partKey: "p2",
    minutes: 14,
    tags: ["핵심", "표준"],
  },
  {
    topic: "web3",
    slug: "layer2",
    num: 8,
    title: "L2와 롤업, 체인 지형도",
    desc: "옵티미스틱 vs ZK 롤업, 블롭, 그리고 어느 체인에서 개발을 시작해야 하는가.",
    partKey: "p3",
    minutes: 12,
    tags: ["확장성", "2026 업데이트"],
  },
  {
    topic: "web3",
    slug: "architecture",
    num: 9,
    title: "Web3 앱 아키텍처와 스택",
    desc: "React/REST 지식을 그대로 매핑합니다. 바뀌는 것과 안 바뀌는 것의 정확한 경계.",
    partKey: "p4",
    minutes: 11,
    tags: ["프론트엔드", "핵심"],
  },
  {
    topic: "web3",
    slug: "code",
    num: 10,
    title: "실전 코드: wagmi + viem",
    desc: "설정부터 지갑 연결, 컨트랙트 읽기/쓰기, 이벤트 구독, SIWE 로그인까지 동작하는 코드 8종.",
    partKey: "p4",
    minutes: 18,
    tags: ["코드", "실무"],
  },
  {
    topic: "web3",
    slug: "solidity",
    num: 11,
    title: "Solidity와 함정 12가지",
    desc: "컨트랙트를 읽는 법, 보안 패턴, 그리고 프론트엔드가 반드시 겪는 실수들과 학습 로드맵.",
    partKey: "p4",
    minutes: 16,
    tags: ["코드", "로드맵"],
  },
  {
    topic: "web3",
    slug: "ecosystem",
    num: 12,
    title: "생태계: DeFi · NFT · DAO · 스테이블코인",
    desc: "실제로 돈이 어디서 어떻게 움직이는가. 2026년 기준 검증된 수치와 함께.",
    partKey: "p5",
    minutes: 15,
    tags: ["생태계", "2026 업데이트"],
  },
  {
    topic: "web3",
    slug: "risk",
    num: 13,
    title: "리스크와 비판론",
    desc: '해킹 통계, 사기 유형, 그리고 "탈중앙화 극장" 비판. 균형을 위해 반드시 읽어야 할 장.',
    partKey: "p5",
    minutes: 12,
    tags: ["보안", "비판"],
  },

  /* ---------------- data ---------------- */

  {
    topic: "data",
    slug: "data-models",
    num: 1,
    title: "데이터 모델의 계보",
    desc: "계층형 → 관계형 → 문서 → 그래프. 관계형이 오래 버틴 이유와, 그 이유가 흔들리는 지점.",
    partKey: "p1",
    minutes: 10,
    tags: ["개념", "입문"],
  },
  {
    topic: "data",
    slug: "normalization",
    num: 2,
    title: "정규화와, 그것을 깨는 순간",
    desc: "3NF까지의 논리를 규칙이 아니라 증상으로. 그리고 실무에서 비정규화를 택하는 세 가지 기준.",
    partKey: "p1",
    minutes: 12,
    tags: ["모델링", "핵심"],
  },
  {
    topic: "data",
    slug: "schema-on-read",
    num: 3,
    title: "스키마 온 라이트 vs 스키마 온 리드",
    desc: "웨어하우스·레이크·레이크하우스가 실제로 갈라지는 지점과, 2026년 테이블 포맷 현황.",
    partKey: "p1",
    minutes: 11,
    tags: ["아키텍처", "2026 업데이트"],
  },
  {
    topic: "data",
    slug: "identifiers",
    num: 4,
    title: "식별자 설계",
    desc: "auto increment, UUIDv4, UUIDv7, ULID. 자연키를 기본키로 쓰면 안 되는 이유부터.",
    partKey: "p1",
    minutes: 9,
    tags: ["모델링", "실무"],
  },
  {
    topic: "data",
    slug: "graph-model",
    num: 5,
    title: "그래프 데이터 모델",
    desc: "속성 그래프와 RDF의 차이. 조인이 관계 탐색에 지는 지점과, 그래프가 지는 지점.",
    partKey: "p2",
    minutes: 12,
    tags: ["그래프", "핵심"],
  },
  {
    topic: "data",
    slug: "ontology",
    num: 6,
    title: "온톨로지와 지식 그래프",
    desc: "스키마와 무엇이 다른가. RDF/OWL 표준, 팔란티어식 객체·액션 모델, 그리고 GraphRAG.",
    partKey: "p2",
    minutes: 14,
    tags: ["개념", "RAG"],
  },
  {
    topic: "data",
    slug: "semantic-layer",
    num: 7,
    title: "시맨틱 레이어",
    desc: "「활성 사용자」의 정의가 팀마다 다른 문제. 지표를 코드로 고정하고 에이전트에 넘기기.",
    partKey: "p2",
    minutes: 11,
    tags: ["실무", "협업"],
  },
  {
    topic: "data",
    slug: "keyword-search",
    num: 8,
    title: "키워드 검색은 어떻게 동작하는가",
    desc: "역색인과 BM25, 그리고 교착어라서 생기는 한국어 형태소 분석이라는 별도의 난관.",
    partKey: "p3",
    minutes: 12,
    tags: ["검색", "한국어"],
  },
  {
    topic: "data",
    slug: "vector-search",
    num: 9,
    title: "임베딩과 벡터 검색",
    desc: "의미로 찾는다는 것의 실제 구현. 정확하지 않아도 되는 이유와, 품번에 약한 이유.",
    partKey: "p3",
    minutes: 13,
    tags: ["검색", "AI"],
  },
  {
    topic: "data",
    slug: "hybrid-search",
    num: 10,
    title: "하이브리드 검색과 리랭킹",
    desc: "RRF로 두 순위를 합치는 법, 크로스 인코더 리랭커, 그리고 어디서 멈출 것인가.",
    partKey: "p3",
    minutes: 10,
    tags: ["검색", "실무"],
  },
];

/* ---------------- 조회 헬퍼 ---------------- */

export const topicBySlug = (slug: string) => topics.find((t) => t.slug === slug);

export const docsOf = (topicSlug: string) =>
  docs.filter((d) => d.topic === topicSlug).sort((a, b) => a.num - b.num);

export const findDoc = (topicSlug: string, docSlug: string) =>
  docs.find((d) => d.topic === topicSlug && d.slug === docSlug);

/** 같은 주제 안에서의 이전/다음 */
export const neighbors = (topicSlug: string, docSlug: string) => {
  const list = docsOf(topicSlug);
  const i = list.findIndex((d) => d.slug === docSlug);
  return {
    prev: i > 0 ? list[i - 1] : null,
    next: i >= 0 && i < list.length - 1 ? list[i + 1] : null,
  };
};

/** 사이드바용: 파트별로 묶은 챕터 목록 (빈 파트는 제외) */
export const groupedDocs = (topic: Topic) =>
  topic.parts
    .map((part) => ({
      part,
      items: docsOf(topic.slug).filter((d) => d.partKey === part.key),
    }))
    .filter((g) => g.items.length > 0);

export const minutesOf = (topicSlug: string) =>
  docsOf(topicSlug).reduce((a, d) => a + d.minutes, 0);

export const activeTopics = () => topics.filter((t) => t.status === "active");
