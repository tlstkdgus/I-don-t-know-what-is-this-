/**
 * web3 주제의 도식들. 부품과 규칙은 `./primitives.tsx`를 보세요.
 */
import { Arrow, ArrowHeads, Box, C, Diagram, Divider, Text } from "./primitives";

/* ═══════════════ 1장 · 데이터 소유 구조 ═══════════════ */

export function OwnershipCompare() {
  return (
    <Diagram h={288} label="지금은 내 데이터가 회사 울타리 안에 있고, Web3는 공용 장부 위에 있어 앱을 갈아타도 따라온다">
      <Text x={20} y={22} role="section" tone="bad">
        지금 (Web2)
      </Text>
      <rect x={16} y={32} width={284} height={142} rx={14} fill="var(--bad)" fillOpacity={0.06} stroke="var(--bad)" strokeWidth={2} strokeDasharray="6 4" />
      <Text x={34} y={55} role="section" tone="bad">
        회사 울타리
      </Text>
      <Box x={34} y={68} w={118} h={42} label="앱 화면" />
      <Box x={166} y={68} w={118} h={42} label="내 데이터" sub="팔로워 · 게시물" tone="bad" />
      <line x1={152} y1={89} x2={166} y2={89} stroke={C.dim} strokeWidth={1.8} />
      <Text x={34} y={136}>
        회사가 계정을 정지하면
      </Text>
      <Text x={34} y={156}>
        울타리 안의 내 데이터에 접근할 수 없습니다.
      </Text>
      <Box x={16} y={196} w={104} h={36} label="나" />
      <line x1={120} y1={214} x2={142} y2={214} stroke={C.dim} strokeWidth={1.8} />
      <Text x={150} y={219}>
        회사를 거쳐야만 접근
      </Text>

      <Divider x={324} y1={26} y2={258} />

      <Text x={348} y={22} role="section" tone="tip">
        Web3
      </Text>
      <rect x={348} y={32} width={130} height={40} rx={9} fill={C.surface} stroke={C.hair} strokeWidth={1.5} strokeDasharray="6 4" />
      <Text x={413} y={57} anchor="middle">
        앱 A
      </Text>
      <rect x={500} y={32} width={130} height={40} rx={9} fill={C.surface} stroke={C.hair} strokeWidth={1.5} strokeDasharray="6 4" />
      <Text x={565} y={57} anchor="middle">
        앱 B
      </Text>
      <path d="M413 72 L460 104 M565 72 L518 104" stroke={C.dim} strokeWidth={1.8} fill="none" />
      <Box x={348} y={108} w={282} h={54} label="공용 장부 (블록체인)" sub="내 데이터 — 어느 앱의 소유도 아님" tone="tip" />
      <Text x={348} y={186}>
        앱 A가 나를 차단해도
      </Text>
      <Text x={348} y={206}>
        앱 B로 갈아타면 데이터가 그대로 따라옵니다.
      </Text>
      <Box x={348} y={228} w={104} h={36} label="나" />
      <line x1={452} y1={246} x2={474} y2={246} stroke="var(--tip)" strokeWidth={1.8} />
      <Text x={482} y={251}>
        내 도장으로 직접
      </Text>
    </Diagram>
  );
}

/* ═══════════════ 3장 · 트릴레마 ═══════════════ */

export function Trilemma() {
  const apex: [number, number] = [330, 58];
  const left: [number, number] = [148, 262];
  const right: [number, number] = [512, 262];
  return (
    <Diagram h={330} label="탈중앙화·보안·확장성 세 꼭짓점을 동시에 다 잡기 어렵고, 각 체인은 삼각형 안 서로 다른 위치를 택했다">
      <polygon
        points={`${apex[0]},${apex[1]} ${right[0]},${right[1]} ${left[0]},${left[1]}`}
        fill="var(--fe)"
        fillOpacity={0.07}
        stroke="var(--fe)"
        strokeWidth={2}
      />
      {[apex, left, right].map(([x, y]) => (
        <circle key={`${x}`} cx={x} cy={y} r={7} fill="var(--fe)" />
      ))}

      <text x={330} y={34} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.ink}>
        탈중앙화
      </text>
      <Text x={330} y={50} anchor="middle">
        많은 사람이 나눠 운영
      </Text>

      <text x={120} y={288} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.ink}>
        보안
      </text>
      <Text x={120} y={305} anchor="middle">
        공격에 견딤
      </Text>

      <text x={546} y={288} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.ink}>
        확장성
      </text>
      <Text x={546} y={305} anchor="middle">
        빠르고 저렴하게
      </Text>

      <circle cx={239} cy={160} r={6.5} fill={C.ink} />
      <text x={225} y={150} textAnchor="end" fontSize={12.5} fontWeight={600} fill={C.ink}>
        비트코인 · 이더리움
      </text>
      <Text x={225} y={167} anchor="end">
        확장성을 내줌
      </Text>

      <circle cx={421} cy={160} r={6.5} fill={C.ink} />
      <text x={435} y={150} fontSize={12.5} fontWeight={600} fill={C.ink}>
        솔라나 등 고성능 체인
      </text>
      <Text x={435} y={167}>
        탈중앙화를 일부 내줌
      </Text>

      <circle cx={330} cy={218} r={6.5} fill="var(--tip)" />
      <text x={330} y={240} textAnchor="middle" fontSize={12.5} fontWeight={600} fill="var(--tip)">
        L2 롤업
      </text>
      <Text x={330} y={256} anchor="middle">
        보안은 빌리고 처리만 밖에서
      </Text>

      <Text x={330} y={300} anchor="middle" role="note">
        꼭짓점에 가까울수록 그 성질이 강합니다.
      </Text>
    </Diagram>
  );
}

/* ═══════════════ 4장 · 시드구문 파생 ═══════════════ */

export function SeedDerivation() {
  const cols = [136, 330, 524];
  const addrs = ["0x71C7…976F", "0x3A9b…21Ec", "0xF04d…8B12"];
  return (
    <Diagram h={276} label="시드구문 하나에서 여러 개인키와 주소가 파생되므로 시드구문이 가장 중요하다">
      <Box x={176} y={14} w={308} h={58} label="시드구문 (영어 단어 12~24개)" sub="apple ocean tiger … forest" tone="bad" />
      <path
        d={`M330 72 L330 92 M${cols[0]} 92 L${cols[2]} 92 M${cols[0]} 92 L${cols[0]} 110 M330 92 L330 110 M${cols[2]} 92 L${cols[2]} 110`}
        stroke={C.dim}
        strokeWidth={1.8}
        fill="none"
      />
      {cols.map((cx, i) => (
        <g key={cx}>
          <Box x={cx - 70} y={110} w={140} h={38} label={`개인키 ${i + 1}${i === 2 ? " …" : ""}`} />
          <line x1={cx} y1={148} x2={cx} y2={168} stroke={C.dim} strokeWidth={1.8} />
          <polygon points={`${cx},174 ${cx - 5},164 ${cx + 5},164`} fill={C.dim} />
          <Box x={cx - 70} y={178} w={140} h={38} label={addrs[i]} mono />
        </g>
      ))}
      <Text x={330} y={238} anchor="middle">
        각각 남에게 알려줘도 되는 주소 (계좌번호)
      </Text>
      <text x={330} y={266} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--bad)">
        시드구문을 잃으면 전부 잃고, 시드구문이 새면 전부 털립니다.
      </text>
    </Diagram>
  );
}

/* ═══════════════ 6장 · 수수료 구성 ═══════════════ */

export function GasSplit() {
  return (
    <Diagram h={268} label="낸 수수료는 소각되는 기본 요금과 검증자에게 가는 팁으로 나뉜다">
      <Text x={20} y={24} role="section">
        내가 낸 수수료
      </Text>
      <rect x={16} y={34} width={628} height={50} rx={12} fill={C.surface} stroke={C.hair} strokeWidth={1.5} />
      <text x={330} y={65} textAnchor="middle" fontSize={16} fontWeight={600} fill={C.ink}>
        작업량 × (기본 요금 + 팁)
      </text>
      {[200, 470].map((x) => (
        <g key={x}>
          <line x1={x} y1={84} x2={x} y2={106} stroke={C.dim} strokeWidth={1.8} />
          <polygon points={`${x},112 ${x - 5},102 ${x + 5},102`} fill={C.dim} />
        </g>
      ))}
      <Box x={16} y={116} w={368} h={66} label="기본 요금 → 소각" sub="아무도 받지 않고 그냥 없어짐" tone="bad" />
      <Box x={400} y={116} w={244} h={66} label="팁 → 검증자" sub="처리해준 사람 몫" />
      <Text x={20} y={216}>
        기본 요금은 네트워크가 붐빌수록 자동으로 오르고, 한산하면 내려갑니다.
      </Text>
      <Text x={20} y={238}>
        걷힌 기본 요금이 사라지므로, 많이 쓸수록 전체 코인 수량이 조금씩 줄어듭니다.
      </Text>
      <Text x={20} y={260} role="note">
        고속도로 통행료의 일부를 아예 폐기해서 시중 통화량을 줄이는 상황과 비슷합니다.
      </Text>
    </Diagram>
  );
}

/* ═══════════════ 7장 · 허가 후 실행 ═══════════════ */

export function ApproveThenTransfer() {
  return (
    <Diagram h={286} label="허가와 실행이 두 번의 거래로 나뉘고, 무제한으로 허가하면 그 허가가 계속 살아 있어 위험하다">
      <ArrowHeads id="ct" tones={[undefined]} />

      <Text x={20} y={22} role="section">
        1단계 — 허가
      </Text>
      <Box x={20} y={34} w={118} h={48} label="내 지갑" sub="토큰 100개" />
      <Box x={270} y={34} w={132} h={48} label="교환 프로그램" sub="스마트 컨트랙트" />
      <Arrow heads="ct" from={[142, 58]} to={[262, 58]} label='"10개까지 가져가도 좋다"' />
      <Text x={202} y={100} anchor="middle" role="note">
        거래 1회 · 수수료 발생
      </Text>

      <Text x={20} y={146} role="section">
        2단계 — 실행
      </Text>
      <Box x={20} y={158} w={118} h={48} label="내 지갑" sub="토큰 90개" />
      <Box x={270} y={158} w={132} h={48} label="교환 프로그램" sub="허가받은 10개 가져감" />
      <Arrow heads="ct" from={[262, 182]} to={[146, 182]} label="실제로 가져감" />
      <Text x={202} y={224} anchor="middle" role="note">
        거래 2회째 · 수수료 또 발생
      </Text>

      <Divider x={432} y1={26} y2={240} />

      <Text x={452} y={22} role="section" tone="bad">
        ⚠ 무제한으로 허가하면
      </Text>
      <Box x={452} y={34} w={192} h={48} label='"얼마든지 가져가도 좋다"' sub="한도 없음" tone="bad" />
      <Text x={452} y={108}>
        편합니다 — 다시 허가할 일이 없으니까요.
      </Text>
      <Text x={452} y={140}>
        그런데 이 허가는 계속 살아 있습니다.
      </Text>
      <Text x={452} y={160}>
        몇 달 뒤 그 프로그램이 해킹당하면,
      </Text>
      <text x={452} y={180} fontSize={11.5} fontWeight={600} fill="var(--bad)">
        공격자가 그 허가를 그대로 씁니다.
      </text>
      <Text x={452} y={212} role="note">
        그래서 오래된 허가는 정리해야 합니다.
      </Text>

      <Text x={20} y={272} role="note">
        이 번거로움을 줄이려고 서명 한 번으로 허가를 대신하거나, 두 단계를 한 번에 묶는 방식이 나왔습니다.
      </Text>
    </Diagram>
  );
}

/* ═══════════════ 2장 · 블록 사슬 ═══════════════ */

export function BlockChainLinks() {
  const blocks = [
    { n: "1024번 페이지", prev: "0x0000a3f9…", root: "0x7b21cc…" },
    { n: "1025번 페이지", prev: "0x0000b7c1…", root: "0x91ae04…" },
    { n: "1026번 페이지", prev: "0x0000e5d2…", root: "0x3fc7b8…" },
  ];
  const x = (i: number) => 16 + i * 216;
  return (
    <Diagram h={216} label="각 페이지가 앞 페이지의 지문을 담고 있어 과거를 바꾸면 그 뒤 전부가 어긋난다">
      <ArrowHeads id="bc" tones={["fe"]} />
      {blocks.map((b, i) => (
        <g key={b.n}>
          <rect x={x(i)} y={20} width={192} height={130} rx={12} fill={C.surface} stroke={C.hair} strokeWidth={1.5} />
          <text x={x(i) + 20} y={46} fontSize={13.5} fontWeight={600} fill="var(--fe)">
            {b.n}
          </text>
          <Text x={x(i) + 20} y={70} role="note">
            앞 페이지 지문
          </Text>
          <text
            x={x(i) + 20}
            y={88}
            fontSize={11.5}
            fontFamily="ui-monospace, monospace"
            fill={i === 0 ? C.muted : "var(--tip)"}
          >
            {b.prev}
          </text>
          <Text x={x(i) + 20} y={112} role="note">
            이 페이지 거래 요약
          </Text>
          <text x={x(i) + 20} y={130} fontSize={11.5} fontFamily="ui-monospace, monospace" fill={C.muted}>
            {b.root}
          </text>
        </g>
      ))}
      {[0, 1].map((i) => (
        <Arrow key={i} heads="bc" from={[x(i) + 192, 85]} to={[x(i + 1) - 6, 85]} tone="fe" label="지문" />
      ))}
      <Text x={16} y={188} role="note">
        각 페이지는 앞 페이지 전체의 지문을 담습니다 → 과거를 바꾸면 그 뒤 모든 페이지의 지문이 어긋납니다.
      </Text>
      <Text x={16} y={208} role="note">
        들키지 않으려면 뒤 페이지를 전부 다시 써야 하는데, 그동안 나머지 참여자는 계속 앞서 나갑니다.
      </Text>
    </Diagram>
  );
}

/* ═══════════════ 9장 · Web3 앱 구조 ═══════════════ */

export function Web3Architecture() {
  return (
    <Diagram h={300} label="지금 흔한 구조는 회사 서버 한 줄로 이어지지만, Web3는 지갑·노드 창구·인덱싱 서비스가 함께 붙는다">
      <ArrowHeads id="ar" tones={["fe", "tip"]} />

      <Text x={16} y={22} role="section">
        지금 흔한 구조
      </Text>
      <Box x={16} y={34} w={160} h={44} label="화면(프론트엔드)" />
      <Arrow heads="ar" from={[96, 78]} to={[96, 98]} tone="fe" />
      <Text x={106} y={94} role="note">
        데이터 요청
      </Text>
      <Box x={16} y={104} w={160} h={44} label="회사 서버" />
      <Arrow heads="ar" from={[96, 148]} to={[96, 168]} tone="fe" />
      <Box x={16} y={174} w={160} h={44} label="회사 DB" />
      <Text x={16} y={248} role="note">
        ✓ 회사가 전부 통제
      </Text>
      <Text x={16} y={266} role="note">
        ✓ 빠르고 값싼 조회
      </Text>
      <Text x={16} y={284} role="note">
        ✗ 사용자는 데이터를 소유하지 못함
      </Text>

      <Divider x={210} y1={20} y2={290} />

      <Text x={232} y={22} role="section" tone="fe">
        Web3 구조
      </Text>
      <Box x={232} y={34} w={168} h={44} label="화면(프론트엔드)" tone="fe" />
      <Box x={430} y={34} w={110} h={44} label="지갑" sub="MetaMask 등" />
      <Arrow heads="ar" from={[404, 56]} to={[426, 56]} tone="fe" label="서명" />
      <Box x={556} y={34} w={98} h={44} label="인덱싱" sub="The Graph 등" />

      <path d="M316 78 L316 96 M316 96 L605 96 M605 96 L605 82" stroke="var(--tip)" strokeWidth={1.6} strokeDasharray="4 3" fill="none" />
      <Text x={330} y={112} tone="tip" role="note">
        조회 전용 경로 (과거 기록·검색·집계)
      </Text>

      <Arrow heads="ar" from={[316, 120]} to={[316, 140]} tone="fe" />
      <Box x={232} y={146} w={168} h={44} label="노드 제공 서비스" sub="Alchemy 등" />
      <Text x={410} y={172} role="note">
        체인에 연결해주는 창구
      </Text>

      <Arrow heads="ar" from={[316, 190]} to={[316, 210]} tone="fe" />
      <Box x={232} y={216} w={230} h={50} label="블록체인 (공유 백엔드)" sub="프로그램 = 로직 · 장부 = 저장" tone="tip" />
      <Box x={486} y={216} w={168} h={50} label="IPFS / Arweave" sub="이미지 등 큰 파일" />
      <Text x={232} y={290} role="note">
        ✓ 사용자가 자산 소유  ✓ 남이 만든 것과 조합 가능  ✗ 기록이 느리고 비쌈
      </Text>
    </Diagram>
  );
}
