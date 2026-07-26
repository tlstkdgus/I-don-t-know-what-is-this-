import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  { t: "p", md: "블록체인을 이해하려면 딱 두 개의 암호학 도구만 알면 됩니다. **해시 함수**와 **공개키 서명**. 나머지는 응용입니다. 먼저 해시." },
  {
    t: "p",
    md: "**해시 함수**는 임의 길이의 입력을 고정 길이 출력으로 바꾸는 일방향 함수입니다. 비트코인·이더리움에서 쓰는 SHA-256, Keccak-256은 다음 성질을 만족합니다.",
  },
  {
    t: "ul",
    items: [
      "**결정적** — 같은 입력 → 항상 같은 출력",
      "**눈사태 효과** — 입력이 1비트만 바뀌어도 출력이 완전히 달라짐",
      "**일방향** — 출력으로부터 입력을 역산할 수 없음",
      "**충돌 저항** — 같은 출력을 내는 다른 입력을 찾기가 사실상 불가능",
    ],
  },
  { t: "demo", name: "hash" },
  {
    t: "callout",
    tone: "fe",
    title: "프론트엔드 비유",
    body: [
      {
        t: "p",
        md: "React의 `key`나 캐시 무효화용 콘텐츠 해시(`main.a3f9b2.js`)와 같은 원리입니다. 파일 내용이 1바이트라도 바뀌면 파일명이 통째로 바뀌죠. 블록체인은 이 성질을 **\"과거를 조작하면 즉시 들통난다\"**는 보증에 씁니다.",
      },
    ],
  },
  { t: "hr" },
  { t: "h2", md: "블록체인 구조: 왜 \"체인\"인가" },
  { t: "p", md: "블록체인은 이름 그대로 **블록을 사슬처럼 연결한 자료구조**입니다. 핵심은 하나: **각 블록이 이전 블록의 해시를 담고 있다**는 것." },
  {
    t: "figure",
    svg: "<svg viewBox=\"0 0 760 200\" xmlns=\"http://www.w3.org/2000/svg\"><defs><marker id=\"ar\" markerWidth=\"9\" markerHeight=\"9\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" fill=\"var(--fe)\"/></marker></defs><g font-family=\"monospace\" font-size=\"10\"><rect x=\"15\" y=\"35\" width=\"200\" height=\"130\" rx=\"10\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"30\" y=\"58\" fill=\"var(--fe)\" font-size=\"13\" font-weight=\"bold\">Block #1024</text><text x=\"30\" y=\"80\" fill=\"var(--ink-dim)\">prevHash</text><text x=\"30\" y=\"94\" fill=\"var(--ink-muted)\">0x0000a3f9…</text><text x=\"30\" y=\"114\" fill=\"var(--ink-dim)\">merkleRoot (거래 요약)</text><text x=\"30\" y=\"128\" fill=\"var(--ink-muted)\">0x7b21cc…</text><text x=\"30\" y=\"148\" fill=\"var(--ink-dim)\">nonce / timestamp</text><rect x=\"280\" y=\"35\" width=\"200\" height=\"130\" rx=\"10\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"295\" y=\"58\" fill=\"var(--fe)\" font-size=\"13\" font-weight=\"bold\">Block #1025</text><text x=\"295\" y=\"80\" fill=\"var(--ink-dim)\">prevHash</text><text x=\"295\" y=\"94\" fill=\"var(--tip)\">0x0000b7c1…</text><text x=\"295\" y=\"114\" fill=\"var(--ink-dim)\">merkleRoot</text><text x=\"295\" y=\"128\" fill=\"var(--ink-muted)\">0x91ae04…</text><text x=\"295\" y=\"148\" fill=\"var(--ink-dim)\">nonce / timestamp</text><rect x=\"545\" y=\"35\" width=\"200\" height=\"130\" rx=\"10\" fill=\"var(--surface-1)\" stroke=\"var(--hairline)\"/><text x=\"560\" y=\"58\" fill=\"var(--fe)\" font-size=\"13\" font-weight=\"bold\">Block #1026</text><text x=\"560\" y=\"80\" fill=\"var(--ink-dim)\">prevHash</text><text x=\"560\" y=\"94\" fill=\"var(--tip)\">0x0000e5d2…</text><text x=\"560\" y=\"114\" fill=\"var(--ink-dim)\">merkleRoot</text><text x=\"560\" y=\"128\" fill=\"var(--ink-muted)\">0x3fc7b8…</text><text x=\"560\" y=\"148\" fill=\"var(--ink-dim)\">nonce / timestamp</text><line x1=\"215\" y1=\"100\" x2=\"272\" y2=\"100\" stroke=\"var(--fe)\" stroke-width=\"2\" marker-end=\"url(#ar)\"/><line x1=\"480\" y1=\"100\" x2=\"537\" y2=\"100\" stroke=\"var(--fe)\" stroke-width=\"2\" marker-end=\"url(#ar)\"/><text x=\"218\" y=\"90\" fill=\"var(--tip)\" font-size=\"9\">해시</text><text x=\"483\" y=\"90\" fill=\"var(--tip)\" font-size=\"9\">해시</text><text x=\"15\" y=\"190\" fill=\"var(--ink-dim)\" font-size=\"11\">각 블록은 앞 블록 전체를 해시한 값을 품는다 → 과거를 바꾸면 그 뒤 모든 블록의 해시가 어긋난다</text></g></svg>",
  },
  {
    t: "p",
    md: "이 구조 때문에 **블록 #500의 거래 하나를 조작하면 #501부터 현재까지 모든 블록의 해시가 어긋납니다.** 조작하려면 그 이후 전체를 다시 계산해야 하고, 그 사이 정직한 네트워크는 계속 앞으로 나아가므로 따라잡을 수 없습니다. 아래 데모에서 직접 확인해 보세요.",
  },
  { t: "demo", name: "chain" },
  { t: "h3", md: "블록에 실제로 들어가는 것" },
  {
    t: "table",
    head: ["필드", "설명"],
    rows: [
      ["`parentHash`", "이전 블록 헤더의 해시. 체인을 잇는 고리"],
      ["`stateRoot`", "이 블록 실행 후 *전체 세계 상태*(모든 계정 잔고·컨트랙트 저장소)를 요약한 머클 패트리샤 트리의 루트 해시"],
      ["`transactionsRoot`", "블록에 포함된 거래 목록의 머클 루트"],
      ["`receiptsRoot`", "거래 실행 결과(로그·이벤트 포함)의 머클 루트"],
      ["`number`, `timestamp`", "블록 높이와 시각. 이더리움은 12초에 한 블록(슬롯)"],
      ["`gasLimit`, `gasUsed`, `baseFeePerGas`", "이 블록의 연산 예산과 실제 사용량, 기본 수수료"],
    ],
  },
  { t: "h4", md: "머클 트리 (Merkle Tree)" },
  {
    t: "p",
    md: "거래 1만 건이 든 블록에서 \"내 거래가 정말 포함됐나?\"를 확인하려면 1만 건을 다 받아야 할까요? 아닙니다. 거래들을 둘씩 짝지어 해시하고, 그 결과를 다시 둘씩 짝지어 해시하기를 반복하면 하나의 **머클 루트**가 나옵니다. 내 거래 + 형제 노드 해시 `log₂(n)`개만 있으면 루트를 재계산해 포함 여부를 증명할 수 있습니다(1만 건이면 14개). 이것이 **가벼운 클라이언트**와 롤업 증명의 기반입니다.",
  },
  {
    t: "callout",
    tone: "fe",
    title: "프론트엔드 비유",
    body: [
      {
        t: "p",
        md: "Git을 떠올리면 정확합니다. Git 커밋도 부모 커밋 해시를 담고, 트리 객체로 파일 상태를 요약하며, 과거 커밋을 바꾸면 이후 해시가 전부 바뀝니다(`git rebase` 후 SHA가 달라지는 이유). **블록체인 ≈ 전 세계가 공유하는, 아무나 force push 할 수 없는 Git 저장소**입니다.",
      },
    ],
  },
];

export default blocks;
