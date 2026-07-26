import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "p",
    md: "웨어하우스와 레이크의 차이를 \"정형이냐 비정형이냐\"로 외우면 실제 선택에 쓸 수 없습니다. 진짜 축은 하나입니다. **검증 비용을 쓸 때 낼 것인가, 읽을 때 낼 것인가.**",
  },

  { t: "h3", md: "두 진영" },
  {
    t: "grid",
    cols: 2,
    items: [
      {
        t: "card",
        title: "스키마 온 라이트 (웨어하우스)",
        body: [
          {
            t: "p",
            md: "넣기 전에 형식을 맞춥니다. **넣기 어렵고 쓰기 쉽습니다.** 들어간 데이터는 전부 같은 규격이므로 질의가 단순해집니다.",
          },
        ],
      },
      {
        t: "card",
        title: "스키마 온 리드 (레이크)",
        body: [
          {
            t: "p",
            md: "원본 그대로 넣고 읽을 때 해석합니다. **넣기 쉽고 쓰기 어렵습니다.** 나중에 어떻게 쓸지 몰라도 일단 보존됩니다.",
          },
        ],
      },
    ],
  },
  {
    t: "p",
    md: "레이크의 논리에는 타당한 면이 있습니다. **변환은 정보를 버리는 행위**고, 버린 정보는 되돌릴 수 없으니까요. 3년 전 로그를 지금 다른 각도로 분석하고 싶을 때, 그때 정한 스키마에 맞춰 잘라둔 데이터로는 못 합니다.",
  },

  { t: "h3", md: "레이크가 늪이 되는 경로" },
  {
    t: "p",
    md: "그런데 검증을 미루면 대체로 이 순서로 무너집니다.",
  },
  {
    t: "ol",
    items: [
      "아무나 아무거나 넣는다 — 진입 장벽이 낮은 게 장점이었으니까",
      "같은 개념의 파일이 형식이 다른 채로 여러 벌 쌓인다",
      "어느 게 최신이고 어느 게 맞는지 아무도 모른다",
      "쓰려면 매번 탐색과 검증부터 해야 한다",
      "결국 아무도 안 쓰고, 옆에 새 웨어하우스를 만든다",
    ],
  },
  {
    t: "callout",
    tone: "warn",
    title: "핵심 교훈",
    body: [
      {
        t: "p",
        md: "검증을 미룬 게 아니라 **책임을 미룬 것**입니다. 미룬 책임은 사라지지 않고 하류의 모든 소비자에게 N배로 청구됩니다. 생산자 한 명이 10분 쓸 일을, 소비자 열 명이 매번 30분씩 씁니다.",
      },
    ],
  },

  { t: "h3", md: "레이크하우스: 오브젝트 스토리지 위에 얹은 메타데이터 계층" },
  {
    t: "p",
    md: "절충안은 S3 같은 값싼 오브젝트 스토리지의 저장 비용은 그대로 쓰면서, 그 위에 **메타데이터 계층**을 얹어 DB처럼 굴게 만드는 것입니다. 이 계층이 원자적 커밋, 스냅샷 격리, 스키마 진화, 타임 트래블, 행 단위 갱신·삭제를 제공합니다.",
  },
  {
    t: "figure",
    caption: "테이블 포맷은 파일 위에 얹히는 한 겹입니다. 파일 자체는 여전히 Parquet입니다.",
    svg: `<svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="레이크하우스 계층 구조">
  <g font-family="ui-sans-serif, system-ui" font-size="13" fill="currentColor">
    <rect x="20" y="16" width="600" height="42" rx="10" fill="none" stroke="currentColor" stroke-opacity="0.25"/>
    <text x="36" y="42">질의 엔진 — Spark · Trino · DuckDB · Snowflake · BigQuery</text>

    <rect x="20" y="72" width="600" height="42" rx="10" fill="none" stroke="currentColor" stroke-opacity="0.55"/>
    <text x="36" y="98">테이블 포맷 — Iceberg · Delta Lake · Hudi  (스냅샷 · 커밋 로그 · 스키마 이력)</text>

    <rect x="20" y="128" width="600" height="42" rx="10" fill="none" stroke="currentColor" stroke-opacity="0.25"/>
    <text x="36" y="154">파일 포맷 — Parquet · ORC · Avro</text>

    <text x="20" y="196" fill-opacity="0.6">그 아래는 그냥 오브젝트 스토리지(S3 · GCS · ADLS)입니다.</text>
  </g>
</svg>`,
  },
  {
    t: "p",
    md: "Iceberg, Delta Lake, Hudi 세 형식 모두 위 기능을 제공합니다. 갈리는 건 기능표가 아니라 **출발점**입니다.",
  },
  {
    t: "table",
    head: ["형식", "출발점", "지금 강한 곳"],
    rows: [
      ["**Apache Iceberg**", "벤더 중립 명세를 먼저 설계하고 구현을 나중에 붙임", "카탈로그·거버넌스 생태계, 다중 엔진 읽기/쓰기"],
      ["**Delta Lake**", "Spark에서 출발해 범위를 넓힘", "Databricks·Spark 환경에서의 통합 깊이"],
      ["**Apache Hudi**", "스트리밍 데이터의 빠른 증분 upsert라는 단일 문제", "키 기반 upsert, CDC 성 워크로드"],
    ],
  },

  { t: "h3", md: "2026년 현재: Iceberg로 수렴" },
  {
    t: "p",
    md: "표준 경쟁은 사실상 정리됐습니다. 주요 클라우드가 모두 관리형 Iceberg를 제공하고, Snowflake와 Databricks 양쪽이 네이티브로 읽고 씁니다. DuckDB가 Iceberg 쓰기를 지원하고, PostgreSQL에서 Iceberg 테이블을 직접 질의하는 길도 열렸습니다.",
  },
  {
    t: "p",
    md: "다만 **형식이 하나로 통합되지는 않았습니다.** 애초에 서로 다른 문제를 풀고 있었기 때문입니다. 대신 선택의 부담이 줄었습니다. Delta UniForm은 Delta 테이블을 쓰면서 Iceberg 호환 메타데이터를 같이 내보내고, Apache XTable은 데이터를 복사하지 않고 형식 간 메타데이터를 변환합니다.",
  },
  {
    t: "callout",
    tone: "tip",
    title: "정리하면",
    body: [
      {
        t: "ul",
        items: [
          "**새로 시작한다면** Iceberg — 상호운용 기본값입니다",
          "**Databricks에 이미 깊이 들어가 있다면** Delta — UniForm으로 Iceberg 소비자도 커버됩니다",
          "**Hudi**는 키 기반 upsert가 핵심 요구가 아니라면 새로 고를 이유가 줄었습니다",
        ],
      },
    ],
  },
  {
    t: "legend",
    md: "테이블 포맷 현황은 2026년 7월 기준으로 확인했습니다. 변화가 빠른 영역이라 인용 전에 다시 확인하는 편이 안전합니다. 출처: [Lakehouse Table Formats in 2026](https://dev.to/alexmercedcoder/lakehouse-table-formats-in-2026-iceberg-delta-lake-hudi-paimon-and-ducklake-how-they-work-p1k)",
  },

  { t: "h3", md: "한계" },
  {
    t: "p",
    md: "레이크하우스는 저장 계층의 문제를 풀지, **의미의 문제를 풀지 않습니다.** 타임 트래블이 된다고 해서 어제 숫자와 오늘 숫자가 왜 다른지 설명되지는 않습니다. 그건 계보와 데이터 계약의 영역이고(파트 4에서 다룰 예정입니다), 도구보다 합의가 더 필요한 부분입니다.",
  },
];

export default blocks;
