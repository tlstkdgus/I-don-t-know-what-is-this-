/**
 * data 주제의 도식들.
 *
 * 부품과 규칙은 `./primitives.tsx`를 보세요. 좌표를 손으로 세지 말고
 * `row()` / `stack()`을 쓰는 것이 이 파일의 유일한 규칙입니다.
 */
import { Arrow, ArrowHeads, Bar, Box, C, Diagram, Divider, Text, row, stack } from "./primitives";

/* ═══════════════ 1장 · 데이터 모델의 계보 ═══════════════ */

export function DataModelShapes() {
  const r = row(5, { end: 644, gap: 14 });
  const label = (i: number, name: string, sub: string) => (
    <>
      <Text x={r.cx(i)} y={24} role="section" anchor="middle">
        {name}
      </Text>
      <Text x={r.cx(i)} y={134} role="note" anchor="middle">
        {sub}
      </Text>
    </>
  );
  return (
    <Diagram h={254} label="다섯 가지 데이터 모델은 담는 모양이 서로 다르고, 그 모양이 잘하는 일을 결정한다">
      {/* 관계형 — 줄과 칸 */}
      {label(0, "관계형", "줄과 칸이 있는 표")}
      <rect x={r.x(0)} y={36} width={r.w} height={76} rx={8} fill={C.surface} stroke={C.hair} strokeWidth={1.5} />
      <line x1={r.x(0)} y1={56} x2={r.x(0) + r.w} y2={56} stroke={C.dim} strokeWidth={1.5} />
      {[75, 94].map((y) => (
        <line key={y} x1={r.x(0)} y1={y} x2={r.x(0) + r.w} y2={y} stroke={C.hair} strokeWidth={1.2} />
      ))}
      {[0.34, 0.67].map((f) => (
        <line
          key={f}
          x1={r.x(0) + r.w * f}
          y1={36}
          x2={r.x(0) + r.w * f}
          y2={112}
          stroke={C.hair}
          strokeWidth={1.2}
        />
      ))}

      {/* 문서형 — 한 덩어리 */}
      {label(1, "문서형", "한 덩어리로 통째")}
      <rect x={r.x(1)} y={36} width={r.w} height={76} rx={8} fill={C.surface} stroke={C.hair} strokeWidth={1.5} />
      <Text x={r.x(1) + 13} y={58} mono>
        {"{ 이름: …"}
      </Text>
      <Text x={r.x(1) + 22} y={77} mono>
        {"주소: {…}"}
      </Text>
      <Text x={r.x(1) + 22} y={96} mono>
        {"주문: [ … ]"}
      </Text>

      {/* 컬럼형 — 칸 단위로 모음 */}
      {label(2, "컬럼형", "칸 단위로 모아둠")}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={r.cx(2) - 44 + i * 32}
          y={36}
          width={24}
          height={76}
          rx={5}
          fill="var(--fe)"
          fillOpacity={i === 1 ? 0.6 : 0.25}
        />
      ))}

      {/* 그래프 — 점과 선 */}
      {label(3, "그래프", "점과 선의 연결")}
      {(() => {
        const cx = r.cx(3);
        const pts: [number, number][] = [
          [cx - 25, 52],
          [cx + 25, 52],
          [cx - 25, 96],
          [cx + 25, 96],
        ];
        return (
          <>
            {[
              [0, 1],
              [0, 2],
              [0, 3],
              [1, 3],
            ].map(([a, b]) => (
              <line
                key={`${a}${b}`}
                x1={pts[a][0]}
                y1={pts[a][1]}
                x2={pts[b][0]}
                y2={pts[b][1]}
                stroke={C.dim}
                strokeWidth={1.8}
              />
            ))}
            {pts.map(([x, y]) => (
              <circle key={`${x}${y}`} cx={x} cy={y} r={10} fill={C.surface} stroke="var(--fe)" strokeWidth={2.2} />
            ))}
          </>
        );
      })()}

      {/* 키-값 — 이름표 하나 */}
      {label(4, "키-값", "이름표 하나로 꺼냄")}
      {[42, 80].map((y) => (
        <g key={y}>
          <rect x={r.x(4)} y={y} width={50} height={26} rx={6} fill={C.surface} stroke={C.hair} strokeWidth={1.5} />
          <Text x={r.x(4) + 25} y={y + 17} anchor="middle" mono>
            key
          </Text>
          <line x1={r.x(4) + 50} y1={y + 13} x2={r.x(4) + 64} y2={y + 13} stroke={C.dim} strokeWidth={1.8} />
          <rect x={r.x(4) + 64} y={y} width={r.w - 64} height={26} rx={6} fill="var(--fe)" fillOpacity={0.35} />
        </g>
      ))}

      <Divider x={166} y1={16} y2={644} horizontal />
      <Text x={16} y={196} role="section">
        모양이 다르면 잘하는 일도 달라집니다.
      </Text>
      <Text x={16} y={220}>
        표는 조건 검색에, 문서는 통째로 읽기에, 컬럼형은 한 칸만 전부 훑는 통계에,
      </Text>
      <Text x={16} y={240}>
        그래프는 연결을 따라가기에, 키-값은 정해진 이름표 하나로 즉시 꺼내는 데 강합니다.
      </Text>
    </Diagram>
  );
}

/* ═══════════════ 2장 · 정규화 ═══════════════ */

export function NormalizationBeforeAfter() {
  const rows = [
    ["#1", "김철수", "010-1234", "사료"],
    ["#2", "김철수", "010-1234", "간식"],
    ["#3", "김철수", "010-1234", "장난감"],
  ];
  const col = [32, 86, 150, 252];
  return (
    <Diagram h={306} label="한 표에 다 넣으면 전화번호가 세 줄에 중복되지만, 나누면 한 곳만 고치면 된다">
      <ArrowHeads id="nz" tones={[undefined, "tip"]} />

      <Text x={16} y={22} role="section" tone="bad">
        한 표에 다 넣었을 때
      </Text>
      <rect x={16} y={34} width={290} height={110} rx={12} fill="var(--bad)" fillOpacity={0.06} stroke="var(--bad)" strokeWidth={2.5} />
      <rect x={144} y={66} width={94} height={70} rx={7} fill="var(--bad)" fillOpacity={0.14} />
      <line x1={16} y1={60} x2={306} y2={60} stroke={C.hair} strokeWidth={1.5} />
      {["주문", "고객", "전화번호", "상품"].map((h, i) => (
        <Text key={h} x={col[i]} y={53} role="section">
          {h}
        </Text>
      ))}
      {rows.map((cells, ri) =>
        cells.map((cell, ci) => (
          <Text key={`${ri}-${ci}`} x={col[ci]} y={86 + ri * 22} mono>
            {cell}
          </Text>
        )),
      )}
      <Text x={191} y={164} anchor="middle" role="section" tone="bad">
        같은 사실이 3번
      </Text>

      <Arrow heads="nz" from={[322, 88]} to={[352, 88]} />

      <Text x={368} y={22} role="section" tone="tip">
        나눴을 때
      </Text>
      <rect x={368} y={34} width={150} height={66} rx={12} fill="var(--tip)" fillOpacity={0.08} stroke="var(--tip)" strokeWidth={2.5} />
      <line x1={368} y1={60} x2={518} y2={60} stroke={C.hair} strokeWidth={1.5} />
      <Text x={384} y={53} role="section">
        고객
      </Text>
      <Text x={440} y={53} role="section">
        전화번호
      </Text>
      <Text x={384} y={86} mono>
        김철수
      </Text>
      <Text x={440} y={86} mono>
        010-1234
      </Text>
      <Text x={532} y={72} role="section" tone="tip">
        한 곳에만
      </Text>

      <rect x={368} y={118} width={150} height={110} rx={12} fill={C.surface} stroke={C.hair} strokeWidth={1.5} />
      <line x1={368} y1={144} x2={518} y2={144} stroke={C.hair} strokeWidth={1.5} />
      {["주문", "고객", "상품"].map((h, i) => (
        <Text key={h} x={[384, 428, 480][i]} y={137} role="section">
          {h}
        </Text>
      ))}
      {rows.map((cells, ri) => (
        <g key={ri}>
          <Text x={384} y={170 + ri * 22} mono>
            {cells[0]}
          </Text>
          <text x={428} y={170 + ri * 22} fontSize={11.5} fontFamily="ui-monospace, monospace" fill={C.muted}>
            {cells[1]}
          </text>
          <Text x={480} y={170 + ri * 22} mono>
            {cells[3]}
          </Text>
        </g>
      ))}
      <line x1={443} y1={100} x2={443} y2={116} stroke="var(--tip)" strokeWidth={2} strokeDasharray="4 3" />
      <Text x={532} y={160}>
        가리키기만 함
      </Text>
      <Text x={532} y={178} role="note">
        (실제로는 4장에서 볼
      </Text>
      <Text x={532} y={194} role="note">
        고유 번호를 씁니다)
      </Text>

      <Text x={16} y={268} role="section">
        전화번호가 바뀌면?
      </Text>
      <Text x={16} y={292}>
        왼쪽은 3줄 전부 수정 — 놓치면 진실이 두 개가 됩니다. · 오른쪽은 위 표 한 줄만 수정.
      </Text>
    </Diagram>
  );
}

/* ═══════════════ 4장 · 식별자 ═══════════════ */

export function IdIndexInsertion() {
  const seq = ["101", "102", "103", "104", "105"];
  const rnd = ["1a3f", "4b2c", "7d81", "9e04", "c5f7"];
  const cell = (i: number) => 16 + i * 68;
  return (
    <Diagram h={280} label="순차 번호는 색인 맨 끝에만 붙지만, 무작위 번호는 매번 중간에 끼어든다">
      <Text x={16} y={24} role="section" tone="tip">
        순서대로 붙는 번호
      </Text>
      {seq.map((v, i) => (
        <Box key={v} x={cell(i)} y={36} w={62} h={34} label={v} mono tone={i === 4 ? "tip" : undefined} />
      ))}
      <line x1={cell(4) + 31} y1={88} x2={cell(4) + 31} y2={74} stroke="var(--tip)" strokeWidth={2} />
      <polygon points={`${cell(4) + 31},70 ${cell(4) + 26},80 ${cell(4) + 36},80`} fill="var(--tip)" />
      <Text x={374} y={52} role="section" tone={undefined}>
        새 항목은 항상 맨 끝에만 추가
      </Text>
      <Text x={374} y={72}>
        건드리는 부분이 늘 한 곳 — 빠릅니다
      </Text>

      <Divider x={118} y1={16} y2={644} horizontal />

      <Text x={16} y={152} role="section" tone="bad">
        완전 무작위 번호
      </Text>
      {rnd.map((v, i) => (
        <Box key={v} x={cell(i)} y={164} w={62} h={34} label={v} mono tone={i === 1 ? "bad" : undefined} />
      ))}
      <line x1={cell(1) + 31} y1={216} x2={cell(1) + 31} y2={202} stroke="var(--bad)" strokeWidth={2} />
      <polygon points={`${cell(1) + 31},198 ${cell(1) + 26},208 ${cell(1) + 36},208`} fill="var(--bad)" />
      <Text x={374} y={180} role="section" tone={undefined}>
        새 항목이 매번 한가운데 끼어듦
      </Text>
      <Text x={374} y={200}>
        뒤쪽을 밀어 정리해야 하고, 최근 데이터가 흩어짐
      </Text>

      <Text x={16} y={262} role="note">
        사전에 새 단어를 알파벳 순서에 맞춰 끼워 넣을 때마다 뒷장을 다시 정리해야 하는 상황과 같습니다.
      </Text>
    </Diagram>
  );
}

/* ═══════════════ 8장 · 역색인 ═══════════════ */

export function InvertedIndex() {
  return (
    <Diagram h={262} label="원본은 문서에서 단어로 향하지만, 역색인은 단어에서 문서로 곧바로 향한다">
      <Text x={16} y={24} role="section">
        원본 (문서 → 단어)
      </Text>
      <Box x={16} y={38} w={80} h={36} label="문서1" />
      <Text x={108} y={62}>
        고양이 · 사료 · 추천
      </Text>
      <Box x={16} y={86} w={80} h={36} label="문서2" />
      <Text x={108} y={110}>
        강아지 · 사료
      </Text>
      <Text x={16} y={158} role="section" tone="bad">
        &quot;사료&quot;를 찾으려면?
      </Text>
      <Text x={16} y={180}>
        문서를 하나씩 다 열어서 훑어야 합니다.
      </Text>
      <Text x={16} y={199}>
        문서가 100만 개면 100만 번.
      </Text>

      <Divider x={330} y1={30} y2={212} />
      <circle cx={330} cy={121} r={15} fill={C.canvas} stroke={C.hair} strokeWidth={1.5} />
      <text x={330} y={127} textAnchor="middle" fontSize={15} fill={C.muted}>
        ↻
      </text>

      <Text x={366} y={24} role="section">
        역색인 (단어 → 문서)
      </Text>
      <Box x={366} y={38} w={92} h={36} label="고양이" />
      <Text x={472} y={62}>
        문서1
      </Text>
      <Box x={366} y={86} w={92} h={36} label="사료" tone="tip" />
      <text x={472} y={110} fontSize={12.5} fontWeight={600} fill={C.ink}>
        문서1 · 문서2
      </text>
      <Box x={366} y={134} w={92} h={36} label="강아지" />
      <Text x={472} y={158}>
        문서2
      </Text>
      <Text x={366} y={192} role="section" tone="tip">
        &quot;사료&quot;를 찾으려면?
      </Text>
      <Text x={366} y={212}>
        해당 줄 하나만 보면 끝.
      </Text>

      <Text x={16} y={244} role="note">
        대신 이 표를 미리 만들어둬야 하고, 문서가 바뀌면 표도 같이 고쳐야 합니다.
      </Text>
      <Text x={16} y={260} role="note">
        검색할 때 치를 비용을, 저장할 때로 옮긴 셈입니다.
      </Text>
    </Diagram>
  );
}

/* ═══════════════ 11장 · 데이터 계보 ═══════════════ */

export function LineageDirections() {
  return (
    <Diagram h={288} label="같은 계보를 거꾸로 보면 원인 추적, 앞으로 보면 영향 범위 파악이 된다">
      <ArrowHeads id="ln" tones={[undefined, "fe"]} />
      <Text x={20} y={26} role="section">
        ← 거꾸로 : 원인 추적
      </Text>
      <Text x={640} y={26} role="section" tone="fe" anchor="end">
        앞으로 : 영향 범위 →
      </Text>

      <Box x={16} y={52} w={126} h={46} label="결제 원본 로그" />
      <Box x={16} y={118} w={126} h={46} label="회원 가입 기록" />
      <Box x={204} y={85} w={140} h={46} label="일별 매출 집계" sub="여기가 틀리면" tone="fe" />
      <Box x={406} y={52} w={132} h={46} label="경영 대시보드" />
      <Box x={406} y={118} w={132} h={46} label="월간 정산 보고서" />
      <Box x={406} y={184} w={132} h={46} label="외부 제출 자료" />

      <Arrow heads="ln" from={[142, 75]} to={[196, 100]} />
      <Arrow heads="ln" from={[142, 141]} to={[196, 116]} />
      <Arrow heads="ln" from={[344, 100]} to={[398, 78]} tone="fe" />
      <Arrow heads="ln" from={[344, 112]} to={[398, 138]} tone="fe" />
      <Arrow heads="ln" from={[472, 166]} to={[472, 176]} tone="fe" />

      <Text x={330} y={266} anchor="middle">
        가운데 하나가 잘못되면, 오른쪽 세 곳이 전부 조용히 함께 틀려집니다.
      </Text>
    </Diagram>
  );
}

export function LineageCollection() {
  const s = stack(3, { start: 14, h: 68, gap: 10 });
  const items: { n: string; title: string; sub: string; tone?: "tip" }[] = [
    { n: "①", title: "코드를 읽어서 추론", sub: "실행하지 않아도 됨 · 동적으로 만들어지는 처리는 놓침" },
    { n: "②", title: "실행될 때 자동으로 보고받기", sub: "실제로 일어난 일이라 정확 · 처리 도구가 지원해야만 가능", tone: "tip" },
    { n: "③", title: "사람이 직접 등록", sub: "뭐든 기록 가능 · 그러나 반드시 뒤처짐 — 코드는 바뀌는데 문서는 안 바뀜" },
  ];
  return (
    <Diagram h={s.total + 14} label="계보를 모으는 세 가지 방식 중 실행 시점에 자동 보고받는 방식이 표준이 되었다">
      {items.map((it, i) => (
        <g key={it.n}>
          <rect
            x={16}
            y={s.y(i)}
            width={628}
            height={s.h}
            rx={12}
            fill={it.tone ? `var(--${it.tone})` : C.surface}
            fillOpacity={it.tone ? 0.08 : 1}
            stroke={it.tone ? `var(--${it.tone})` : C.hair}
            strokeWidth={it.tone ? 2.5 : 1.5}
          />
          <text x={36} y={s.y(i) + 28} fontSize={14} fontWeight={600} fill={C.ink}>
            {`${it.n} ${it.title}`}
          </text>
          <Text x={36} y={s.y(i) + 51}>
            {it.sub}
          </Text>
          {it.tone && (
            <Text x={624} y={s.y(i) + 28} role="section" tone="tip" anchor="end">
              표준이 생긴 지점
            </Text>
          )}
        </g>
      ))}
    </Diagram>
  );
}

export function OpenLineageShape() {
  const senders = ["Spark", "Airflow", "dbt", "Flink"];
  const receivers = ["Marquez", "카탈로그 제품들", "자체 구축 저장소"];
  return (
    <Diagram h={240} label="보내는 쪽과 받는 쪽 사이에 공통 기록 형식을 두면 양쪽을 자유롭게 교체할 수 있다">
      <Text x={90} y={24} role="section" anchor="middle">
        보내는 쪽 (처리 도구)
      </Text>
      {senders.map((s, i) => (
        <Box key={s} x={20} y={38 + i * 38} w={140} h={30} label={s} />
      ))}

      <Box x={242} y={70} w={176} h={90} label="OpenLineage" sub="공통 기록 형식" tone="tip" />
      <Text x={330} y={142} anchor="middle" role="note">
        START · COMPLETE · FAIL
      </Text>

      <Text x={570} y={24} role="section" anchor="middle">
        받는 쪽 (수집·시각화)
      </Text>
      {receivers.map((s, i) => (
        <Box key={s} x={500} y={60 + i * 40} w={140} h={30} label={s} />
      ))}

      {[53, 91, 129, 167].map((y, i) => (
        <line key={y} x1={164} y1={y} x2={238} y2={104 + i * 7} stroke={C.dim} strokeWidth={1.6} />
      ))}
      {[78, 115, 152].map((y, i) => (
        <line key={y} x1={422} y1={106 + i * 9} x2={496} y2={y} stroke={C.dim} strokeWidth={1.6} />
      ))}

      <Text x={330} y={220} anchor="middle">
        한쪽을 바꿔도 반대쪽은 그대로 — 이게 표준을 만드는 이유입니다.
      </Text>
    </Diagram>
  );
}

/* ═══════════════ 12장 · 데이터 계약 ═══════════════ */

export function ContractBeforeAfter() {
  return (
    <Diagram h={300} label="계약이 없으면 쓰는 쪽이 사고 후에 발견하지만, 있으면 만드는 쪽이 배포 전에 막힌다">
      <ArrowHeads id="dc" tones={[undefined, "tip"]} />

      <Text x={20} y={24} role="section" tone="bad">
        계약이 없을 때
      </Text>
      <Box x={20} y={38} w={130} h={44} label="만드는 팀" />
      <Box x={266} y={38} w={128} h={44} label="데이터" />
      <Box x={510} y={38} w={130} h={44} label="쓰는 팀" tone="bad" />
      <Arrow heads="dc" from={[154, 60]} to={[258, 60]} />
      <Arrow heads="dc" from={[398, 60]} to={[502, 60]} />
      <Text x={206} y={104} anchor="middle">
        칸 이름을 바꿈
      </Text>
      <Text x={206} y={121} anchor="middle" role="note">
        (악의 없음. 그냥 몰랐음)
      </Text>
      <Text x={450} y={104} anchor="middle" tone="bad">
        다음 날 아침 화면이 빔
      </Text>
      <Text x={450} y={121} anchor="middle" role="note">
        사용자가 먼저 발견
      </Text>

      <Divider x={146} y1={20} y2={640} horizontal />

      <Text x={20} y={176} role="section" tone="tip">
        계약이 있을 때
      </Text>
      <Box x={20} y={190} w={130} h={44} label="만드는 팀" />
      <Box x={252} y={184} w={156} h={56} label="계약" sub="모양 · 품질 · 주인 · 변경절차" tone="tip" />
      <Box x={510} y={190} w={130} h={44} label="쓰는 팀" />
      <Arrow heads="dc" from={[154, 212]} to={[244, 212]} tone="tip" />
      <Arrow heads="dc" from={[412, 212]} to={[502, 212]} tone="tip" />

      <Text x={330} y={266} anchor="middle">
        약속을 어기는 변경은 배포 단계에서 자동으로 막힘
      </Text>
      <Text x={330} y={286} anchor="middle" role="note">
        → 쓰는 쪽이 아니라 만드는 쪽이, 사고 전에 알게 됨
      </Text>
    </Diagram>
  );
}

export function ContractParts() {
  const parts = [
    { n: "①", t: "구조 — 어떤 칸이 있고 각각 무슨 자료형인가", s: "주문번호는 정수, 결제금액은 소수점 없는 정수, 국가코드는 2글자 문자열" },
    { n: "②", t: "의미 — 그 칸이 정확히 무엇을 뜻하는가", s: '"결제금액"은 할인 후·세금 포함 금액이며 환불은 반영하지 않는다' },
    { n: "③", t: "품질 기준 — 어디까지가 정상인가", s: "주문번호는 비어 있을 수 없고 중복도 없다 · 금액은 0 이상 · 매일 09시까지 갱신" },
    { n: "④", t: "책임자 — 문제가 생기면 누구에게 연락하는가", s: "담당 팀과 연락처. 이게 없으면 나머지 넷이 다 있어도 굴러가지 않습니다", key: true },
    { n: "⑤", t: "변경 절차 — 바꿀 때 어떻게 알리는가", s: "칸 추가는 자유 · 칸 삭제나 의미 변경은 최소 30일 전 공지 후 합의", key: true },
  ];
  return (
    <Diagram h={368} label="구조·의미·품질은 저장 규칙이고, 책임자와 변경 절차가 붙어야 계약이 된다">
      <Text x={20} y={20} role="note">
        여기까지는 그냥 저장 규칙
      </Text>
      {parts.slice(0, 3).map((p, i) => (
        <g key={p.n}>
          <rect x={16} y={30 + i * 58} width={628} height={52} rx={10} fill={C.surface} stroke={C.hair} strokeWidth={1.5} />
          <text x={38} y={53 + i * 58} fontSize={13.5} fontWeight={600} fill={C.ink}>
            {`${p.n} ${p.t}`}
          </text>
          <Text x={38} y={72 + i * 58}>
            {p.s}
          </Text>
        </g>
      ))}
      <Text x={20} y={228} role="section" tone="tip">
        이 둘이 붙어야 비로소 계약
      </Text>
      {parts.slice(3).map((p, i) => (
        <g key={p.n}>
          <rect x={16} y={238 + i * 58} width={628} height={52} rx={10} fill="var(--tip)" fillOpacity={0.08} stroke="var(--tip)" strokeWidth={2.5} />
          <text x={38} y={261 + i * 58} fontSize={13.5} fontWeight={600} fill={C.ink}>
            {`${p.n} ${p.t}`}
          </text>
          <Text x={38} y={280 + i * 58}>
            {p.s}
          </Text>
        </g>
      ))}
    </Diagram>
  );
}

/* ═══════════════ 13장 · 개인정보 ═══════════════ */

export function PrivacySpectrum() {
  const r = row(3, { end: 644, gap: 26 });
  const cols: { title: string; sub: string; tone: "bad" | "warn" | "tip"; rows: string[]; foot: string; revert: string; bar: number }[] = [
    { title: "개인정보", sub: "누구인지 바로 알 수 있음", tone: "bad", rows: ["김철수 · 1990-03-12", "010-1234-5678", "강남구 역삼동"], foot: "규제 가장 무거움", revert: "원본 그대로", bar: 1 },
    { title: "가명정보", sub: "추가 정보가 있어야 알 수 있음", tone: "warn", rows: ["U-8471 · 1990년대생", "(연락처 삭제)", "서울"], foot: "되돌릴 열쇠가 따로 존재", revert: "열쇠가 있으면 가능", bar: 0.7 },
    { title: "익명정보", sub: "되돌릴 방법이 없음", tone: "tip", rows: ["30대 · 서울", "해당 구간 1,428명", "평균 구매액 3.2만원"], foot: "규제 대상 아님", revert: "불가능", bar: 0.32 },
  ];
  return (
    <Diagram h={336} label="개인정보에서 가명정보, 익명정보로 갈수록 규제는 가벼워지고 쓸 수 있는 정보량도 줄어든다">
      <ArrowHeads id="pv" tones={[undefined]} />
      {cols.map((c, i) => (
        <g key={c.title}>
          <rect x={r.x(i)} y={16} width={r.w} height={150} rx={12} fill={`var(--${c.tone})`} fillOpacity={0.07} stroke={`var(--${c.tone})`} strokeWidth={2.5} />
          <text x={r.cx(i)} y={44} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.ink}>
            {c.title}
          </text>
          <Text x={r.cx(i)} y={63} anchor="middle" tone={c.tone}>
            {c.sub}
          </Text>
          {c.rows.map((v, ri) => (
            <text key={v} x={r.x(i) + 18} y={92 + ri * 20} fontSize={11} fontFamily="ui-monospace, monospace" fill={ri === 1 && i === 1 ? C.dim : C.ink}>
              {v}
            </text>
          ))}
          <Text x={r.cx(i)} y={155} anchor="middle" role="note">
            {c.foot}
          </Text>
          <Text x={r.cx(i)} y={234} anchor="middle">
            {c.revert}
          </Text>
          <Bar x={r.x(i)} y={284} w={r.w * c.bar} tone={c.tone} />
        </g>
      ))}
      {[0, 1].map((i) => (
        <Arrow key={i} heads="pv" from={[r.x(i) + r.w + 2, 91]} to={[r.x(i + 1) - 6, 91]} />
      ))}
      <Text x={20} y={208} role="section">
        되돌릴 수 있는가
      </Text>
      <Text x={20} y={272} role="section">
        분석에 쓸 수 있는 정보량
      </Text>
      <Text x={20} y={324} role="note">
        가명정보의 &quot;열쇠&quot;는 반드시 원본과 분리해 보관합니다 — 같이 두면 가명처리한 의미가 없습니다.
      </Text>
    </Diagram>
  );
}

export function MinimizationAxes() {
  const r = row(4, { end: 644, gap: 16 });
  const axes: { t: string; a: string; b: string; tone?: "bad" }[] = [
    { t: "덜 모은다", a: "정말 필요한 항목만", b: "생년월일 대신 연령대" },
    { t: "덜 오래 둔다", a: "보관 기간을 정하고", b: "지나면 자동 파기" },
    { t: "덜 열어준다", a: "업무에 필요한 사람만", b: "접근 기록을 남김" },
    { t: "덜 퍼뜨린다", a: "복사본을 안 만듦", b: "가장 자주 뚫림", tone: "bad" },
  ];
  return (
    <Diagram h={226} label="데이터 최소화는 수집·보관·접근·전파 네 지점 전부에서 이뤄져야 한다">
      {axes.map((a, i) => (
        <g key={a.t}>
          <rect x={r.x(i)} y={26} width={r.w} height={96} rx={12} fill={a.tone ? "var(--bad)" : C.surface} fillOpacity={a.tone ? 0.07 : 1} stroke={a.tone ? "var(--bad)" : C.hair} strokeWidth={a.tone ? 2.5 : 1.5} />
          <text x={r.cx(i)} y={56} textAnchor="middle" fontSize={14} fontWeight={600} fill={C.ink}>
            {a.t}
          </text>
          <Text x={r.cx(i)} y={80} anchor="middle">
            {a.a}
          </Text>
          <Text x={r.cx(i)} y={99} anchor="middle" tone={a.tone}>
            {a.b}
          </Text>
        </g>
      ))}
      <Text x={330} y={168} anchor="middle">
        가장 자주 뚫리는 곳은 첫 번째가 아니라 네 번째입니다.
      </Text>
      <Text x={330} y={194} anchor="middle" role="note">
        개발자 노트북에 내려받은 운영 데이터, 분석용으로 복사해둔 표,
      </Text>
      <Text x={330} y={213} anchor="middle" role="note">
        엑셀로 뽑아 메일로 보낸 명단.
      </Text>
    </Diagram>
  );
}

export function PseudonymRiskTiers() {
  const s = stack(3, { start: 14, h: 58, gap: 10 });
  const tiers: { name: string; tone: "tip" | "warn" | "bad"; what: string; how: string }[] = [
    { name: "저위험", tone: "tip", what: "반복 제공 · 유사 제공 · 내부 부서 간 제공·활용 · 결합전문기관 제공", how: "담당자 중심의 검토와 최소 서류로 처리 가능" },
    { name: "중위험", tone: "warn", what: "기관 내부 분석공간 제공", how: "중간 수준의 검토 절차" },
    { name: "고위험", tone: "bad", what: "비정형데이터 처리 (이미지 · 영상 · 자유 텍스트 등)", how: "가장 엄격한 검토 — 무엇이 찍혀 있을지 미리 알 수 없기 때문" },
  ];
  return (
    <Diagram h={s.total + 10} label="가명정보 처리 위험도를 세 단계로 나눠 절차와 서류 부담을 다르게 적용한다">
      {tiers.map((t, i) => (
        <g key={t.name}>
          <rect x={16} y={s.y(i)} width={628} height={s.h} rx={12} fill={`var(--${t.tone})`} fillOpacity={0.07} stroke={`var(--${t.tone})`} strokeWidth={2.5} />
          <rect x={16} y={s.y(i)} width={10} height={s.h} rx={5} fill={`var(--${t.tone})`} />
          <text x={44} y={s.y(i) + 26} fontSize={14} fontWeight={600} fill={C.ink}>
            {t.name}
          </text>
          <Text x={140} y={s.y(i) + 26}>
            {t.what}
          </Text>
          <Text x={140} y={s.y(i) + 46} role="note">
            {t.how}
          </Text>
        </g>
      ))}
    </Diagram>
  );
}

/* ═══════════════ 5장 · 속성 그래프 vs RDF ═══════════════ */

export function PropertyGraphVsRdf() {
  const triples = [
    ":alice   :placed        :order7 .",
    ':order7  :placedAt      "2026-07-01" .',
    ":alice   rdf:type       :Person .",
  ];
  return (
    <Diagram h={272} label="같은 사실을 속성 그래프는 연결선에 정보를 붙여 표현하고, RDF는 세 조각 문장으로 쪼개 표현한다">
      <ArrowHeads id="gm" tones={["fe"]} />
      <Text x={20} y={24} role="section">
        속성 그래프
      </Text>

      <ellipse cx={106} cy={82} rx={64} ry={30} fill={C.surface} stroke="var(--fe)" strokeWidth={2.2} />
      <text x={106} y={80} textAnchor="middle" fontSize={13.5} fontWeight={600} fill={C.ink}>
        앨리스
      </text>
      <Text x={106} y={97} anchor="middle" role="note">
        Person
      </Text>

      <ellipse cx={330} cy={82} rx={64} ry={30} fill={C.surface} stroke="var(--fe)" strokeWidth={2.2} />
      <text x={330} y={80} textAnchor="middle" fontSize={13.5} fontWeight={600} fill={C.ink}>
        주문 #7
      </text>
      <Text x={330} y={97} anchor="middle" role="note">
        Order
      </Text>

      <Arrow heads="gm" from={[172, 82]} to={[262, 82]} tone="fe" label="PLACED" />
      <Text x={217} y={112} anchor="middle" role="note">
        at: 2026-07-01
      </Text>
      <Text x={430} y={78} role="note">
        연결선에도 정보를
      </Text>
      <Text x={430} y={96} role="note">
        붙일 수 있습니다
      </Text>

      <Divider x={150} y1={20} y2={640} horizontal />

      <Text x={20} y={182} role="section">
        RDF (세 조각 문장들)
      </Text>
      {triples.map((t, i) => (
        <text key={t} x={20} y={210 + i * 22} fontSize={11.5} fontFamily="ui-monospace, monospace" fill={C.ink}>
          {t}
        </text>
      ))}
      <Text x={430} y={210} role="note">
        모든 사실을 주어-서술어-목적어
      </Text>
      <Text x={430} y={228} role="note">
        세 조각으로 쪼갭니다
      </Text>
    </Diagram>
  );
}

/* ═══════════════ 3장 · 레이크하우스 계층 ═══════════════ */

export function LakehouseLayers() {
  const layers = [
    { t: "질의 엔진(질문을 던지는 도구)", s: "Spark · Trino · DuckDB · Snowflake · BigQuery" },
    { t: "정리 담당자(테이블 포맷)", s: "Iceberg · Delta Lake · Hudi", tone: "tip" as const },
    { t: "실제 파일 형식", s: "Parquet · ORC · Avro" },
  ];
  const s = stack(3, { start: 14, h: 56, gap: 10 });
  return (
    <Diagram h={s.total + 34} label="테이블 포맷은 질의 엔진과 파일 형식 사이에 얹히는 한 겹이다">
      {layers.map((l, i) => (
        <g key={l.t}>
          <rect
            x={16}
            y={s.y(i)}
            width={628}
            height={s.h}
            rx={12}
            fill={l.tone ? `var(--${l.tone})` : C.surface}
            fillOpacity={l.tone ? 0.08 : 1}
            stroke={l.tone ? `var(--${l.tone})` : C.hair}
            strokeWidth={l.tone ? 2.5 : 1.5}
          />
          <text x={38} y={s.y(i) + 24} fontSize={13.5} fontWeight={600} fill={C.ink}>
            {l.t}
          </text>
          <Text x={38} y={s.y(i) + 44}>
            {l.s}
          </Text>
        </g>
      ))}
      <Text x={20} y={s.total + 24} role="note">
        그 아래는 그냥 대용량 저장 서비스(S3 등)입니다.
      </Text>
    </Diagram>
  );
}

/* ═══════════════ 9장 · HNSW 계층 탐색 ═══════════════ */

export function HnswLayers() {
  const rows = [
    { name: "상위 층", road: "고속도로", xs: [110, 340, 570], r: 5 },
    { name: "중간 층", road: "국도", xs: [110, 225, 340, 455, 570], r: 4.5 },
    { name: "하위 층", road: "골목", xs: [110, 168, 225, 283, 340, 398, 455, 513, 570], r: 4 },
  ];
  const y = (i: number) => 40 + i * 62;
  return (
    <Diagram h={222} label="위층에서 대충 근처까지 이동한 뒤 아래층으로 내려가며 좁혀 찾는다">
      {rows.map((r, i) => (
        <g key={r.name}>
          <Text x={20} y={y(i) + 5} role="section">
            {r.name}
          </Text>
          <line x1={110} y1={y(i)} x2={570} y2={y(i)} stroke={C.hair} strokeWidth={2} />
          {r.xs.map((x) => (
            <circle key={x} cx={x} cy={y(i)} r={r.r} fill={x === 340 ? "var(--fe)" : C.dim} />
          ))}
          <Text x={588} y={y(i) + 5} role="note">
            {r.road}
          </Text>
        </g>
      ))}
      {[0, 1].map((i) => (
        <line
          key={i}
          x1={340}
          y1={y(i) + 8}
          x2={340}
          y2={y(i + 1) - 8}
          stroke="var(--fe)"
          strokeWidth={2}
          strokeDasharray="4 3"
        />
      ))}
      <Text x={356} y={y(1) - 18} tone="fe">
        내려가며 좁힘
      </Text>
      <Text x={20} y={210} role="note">
        위층일수록 점이 적고 선이 깁니다 — 그래서 처음에 성큼성큼 이동할 수 있습니다.
      </Text>
    </Diagram>
  );
}
