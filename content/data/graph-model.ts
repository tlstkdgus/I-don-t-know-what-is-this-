import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "p",
    md: "관계형 DB에서도 관계는 표현됩니다. 외래키가 곧 관계니까요. 그래프 DB가 다른 점은 **관계 자체가 저장 단위이자 질의 대상**이라는 것입니다. 이 차이가 언제 비용을 뒤집는지가 이 장의 주제입니다.",
  },

  { t: "h3", md: "두 계보: 속성 그래프와 RDF" },
  {
    t: "table",
    head: ["", "속성 그래프", "RDF 트리플"],
    rows: [
      ["**저장 단위**", "노드·엣지 + 각각의 속성", "주어-술어-목적어 세 쌍"],
      ["**질의어**", "Cypher, Gremlin, GQL", "SPARQL"],
      ["**대표 구현**", "Neo4j, Memgraph, Amazon Neptune", "각종 트리플스토어, Neptune"],
      ["**강점**", "실무 채택률, 직관성, 속성 표현이 자연스러움", "W3C 표준, 스키마·추론기(OWL) 연결"],
      ["**약점**", "질의어 표준화가 최근에야 시작", "학습 곡선, 도구 생태계가 얇음"],
    ],
  },
  {
    t: "p",
    md: "실무 채택은 속성 그래프가 압도적입니다. RDF는 **[다음 장의 온톨로지](/data/ontology)와 붙을 때** 비로소 의미가 생깁니다. \"표준화된 어휘를 조직 밖과 공유해야 한다\"는 요구가 없으면 굳이 고를 이유가 크지 않습니다.",
  },
  {
    t: "figure",
    caption: "같은 사실을 표현하는 두 방식. 속성 그래프는 엣지에도 속성을 붙일 수 있고, RDF는 모든 것을 세 쌍으로 쪼갭니다.",
    svg: `<svg viewBox="0 0 640 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="속성 그래프와 RDF 트리플 비교">
  <g font-family="ui-sans-serif, system-ui" font-size="12" fill="currentColor">
    <text x="20" y="22" font-size="13" fill-opacity="0.6">속성 그래프</text>
    <ellipse cx="90" cy="72" rx="58" ry="26" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="60" y="70">앨리스</text>
    <text x="52" y="86" font-size="10" fill-opacity="0.6">Person</text>
    <ellipse cx="270" cy="72" rx="58" ry="26" fill="none" stroke="currentColor" stroke-opacity="0.5"/>
    <text x="244" y="70">주문 #7</text>
    <text x="240" y="86" font-size="10" fill-opacity="0.6">Order</text>
    <line x1="148" y1="72" x2="212" y2="72" stroke="currentColor" stroke-opacity="0.5"/>
    <polygon points="212,72 204,68 204,76" fill="currentColor" fill-opacity="0.5"/>
    <text x="180" y="60" font-size="10" text-anchor="middle">PLACED</text>
    <text x="180" y="112" font-size="10" fill-opacity="0.6" text-anchor="middle">at: 2026-07-01</text>

    <line x1="20" y1="140" x2="620" y2="140" stroke="currentColor" stroke-opacity="0.15"/>

    <text x="20" y="170" font-size="13" fill-opacity="0.6">RDF 트리플</text>
    <text x="20" y="196" font-family="ui-monospace, monospace" font-size="11">:alice   :placed        :order7 .</text>
    <text x="20" y="216" font-family="ui-monospace, monospace" font-size="11">:order7  :placedAt      "2026-07-01" .</text>
    <text x="20" y="236" font-family="ui-monospace, monospace" font-size="11">:alice   rdf:type       :Person .</text>
  </g>
</svg>`,
  },

  { t: "h3", md: "조인이 그래프에 지는 지점" },
  {
    t: "p",
    md: "RDBMS의 조인은 **집합 연산**입니다. \"A 테이블과 B 테이블 중 조건에 맞는 조합\"을 찾습니다. 인덱스가 있어도 홉이 늘어나면 중간 결과 집합이 커지고, 옵티마이저가 그 크기를 잘못 추정하면 실행 계획이 통째로 무너집니다.",
  },
  {
    t: "p",
    md: "그래프는 **포인터 순회**에 가깝습니다. 시작 노드에서 엣지를 따라 이동하고, 방문하지 않은 영역은 아예 건드리지 않습니다. 시작점이 좁으면 전체 데이터 크기가 커져도 탐색 비용이 크게 늘지 않습니다.",
  },
  {
    t: "tabs",
    tabs: [
      {
        label: "Cypher",
        body: [
          {
            t: "code",
            lang: "cypher",
            src: `
// 앨리스의 친구의 친구의 친구
MATCH (a:Person {name: 'Alice'})-[:FRIEND*3]-(p:Person)
WHERE p <> a
RETURN DISTINCT p.name`,
          },
          {
            t: "p",
            md: "홉 수를 `*3`에서 `*5`로 바꾸는 데 쿼리 구조가 바뀌지 않습니다. `*1..5`처럼 범위도 됩니다.",
          },
        ],
      },
      {
        label: "SQL (재귀 CTE)",
        body: [
          {
            t: "code",
            lang: "sql",
            src: `
WITH RECURSIVE reachable AS (
  SELECT friend_id, 1 AS hop
  FROM friendship WHERE person_id = :alice
  UNION
  SELECT f.friend_id, r.hop + 1
  FROM reachable r
  JOIN friendship f ON f.person_id = r.friend_id
  WHERE r.hop < 3
)
SELECT DISTINCT friend_id FROM reachable;`,
          },
          {
            t: "p",
            md: "동작은 합니다. 다만 **관계 종류가 늘 때마다 쿼리를 새로 씁니다.** \"친구이거나 같은 회사이거나 같은 프로젝트\"가 되면 UNION이 계속 붙고, 경로별 가중치나 최단 경로 같은 요구가 오면 급격히 어려워집니다.",
          },
        ],
      },
    ],
  },
  {
    t: "callout",
    tone: "warn",
    title: "\"3홉부터 그래프가 이긴다\"는 말에 대해",
    body: [
      {
        t: "p",
        md: "흔히 인용되지만 **일반적인 상수가 아닙니다.** 실제 역전 지점은 데이터 규모, 차수 분포(연결이 많은 허브 노드가 있는지), 인덱스 상태, 시작 집합의 크기에 좌우됩니다. 허브가 큰 소셜 그래프에서는 2홉만에 폭발하기도 하고, 희소한 그래프에서는 5홉도 무난합니다.",
      },
      {
        t: "p",
        md: "그래서 이 글에서는 수치를 쓰지 않습니다. 판단이 필요하면 **본인 데이터로 재는 게 유일하게 맞는 방법**입니다.",
      },
    ],
  },

  { t: "h3", md: "그래프가 지는 곳" },
  {
    t: "grid",
    cols: 2,
    items: [
      {
        t: "card",
        tone: "bad",
        title: "집계와 대량 스캔",
        body: [
          {
            t: "p",
            md: "\"전체 주문 금액 합계\" 같은 질의는 RDBMS나 컬럼형이 압승입니다. 그래프는 결국 전수 순회를 해야 합니다.",
          },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "대량 쓰기",
        body: [
          {
            t: "p",
            md: "엣지를 만들 때마다 양쪽 인접 구조와 인덱스를 갱신해야 합니다. 배치 적재 처리량이 관계형보다 낮은 경우가 많습니다.",
          },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "정형 리포트",
        body: [
          {
            t: "p",
            md: "관계가 고정돼 있고 질의 형태도 정해져 있다면, 잘 잡힌 조인이 더 빠르고 더 예측 가능합니다.",
          },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "운영 성숙도",
        body: [
          {
            t: "p",
            md: "백업·복제·모니터링·마이그레이션 도구 생태계가 RDBMS보다 얕습니다. 장애 시 참고할 사례도 적습니다.",
          },
        ],
      },
    ],
  },

  { t: "h3", md: "판단 기준 한 줄" },
  {
    t: "callout",
    tone: "tip",
    body: [
      {
        t: "p",
        md: "**관계 자체가 질문의 대상인가, 아니면 데이터를 이어붙이는 수단일 뿐인가.**",
      },
      {
        t: "p",
        md: "\"이 두 계좌 사이에 몇 단계를 거쳐 돈이 흘렀나\", \"이 부품을 쓰는 완제품을 전부 찾아라\", \"이 권한이 어떤 경로로 부여됐나\" — 관계가 답 자체인 질문입니다. 반면 \"주문 목록에 고객 이름을 붙여 보여줘\"는 관계를 수단으로 쓸 뿐이고, 이건 조인으로 충분합니다.",
      },
    ],
  },
  {
    t: "p",
    md: "현실적인 절충안도 있습니다. 원본은 관계형에 두고 **관계 탐색이 필요한 부분만 그래프로 파생**시키는 방식입니다. 검색 인덱스를 따로 두는 것과 같은 발상이고, 정합성 관리 부담은 그만큼 늘어납니다.",
  },
];

export default blocks;
