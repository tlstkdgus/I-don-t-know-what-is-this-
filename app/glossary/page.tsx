import Link from "next/link";

export const metadata = {
  title: "용어집",
  description:
    "gas, nonce, MEV, TVL, 슬리피지 등 Web3에서 자주 나오는 25개 용어 정리.",
};

const terms: [string, string][] = [
  ["ABI", "Application Binary Interface. 컨트랙트의 함수 시그니처를 기술한 JSON. Web3의 OpenAPI 명세에 해당."],
  ["Airdrop", "초기 사용자에게 토큰을 무상 배포하는 것. 마케팅이자 탈중앙화 수단."],
  ["AMM", "Automated Market Maker. 오더북 없이 x·y=k 같은 수식으로 가격을 결정하는 교환 방식."],
  ["Bridge", "체인 간 자산 이동 장치. 잠긴 자금 풀이 표적이 되어 보안상 가장 취약한 지점."],
  ["Composability", "조합 가능성. 허가 없이 다른 프로토콜 위에 쌓아 올릴 수 있는 성질. \"돈의 레고\"."],
  ["DA (Data Availability)", "데이터 가용성. 롤업 데이터를 누구나 받아볼 수 있음을 보장하는 것."],
  ["dApp", "Decentralized Application. 스마트 컨트랙트를 백엔드로 쓰는 앱."],
  ["EOA", "Externally Owned Account. 개인키로 제어되는 일반 지갑 계정. 컨트랙트 계정과 대비."],
  ["Faucet", "테스트넷 코인을 무료로 나눠주는 서비스. 개발 시작에 필수."],
  ["Finality", "최종성. 거래가 되돌려질 수 없게 확정되는 상태. 이더리움 PoS는 약 12.8분."],
  ["Flash Loan", "같은 트랜잭션 안에서 빌리고 갚는 무담보 대출. 차익거래와 공격 양쪽에 쓰임."],
  ["Gas", "EVM 연산 비용 단위. 수수료 = gasUsed × (baseFee + priorityFee)."],
  ["Gwei", "10⁻⁹ ETH. 가스 가격을 표기하는 단위."],
  ["Impermanent Loss", "비영구적 손실. AMM에 유동성을 공급했을 때 발생 가능한 기회비용 손실."],
  ["Mempool", "아직 블록에 포함되지 않은 대기 트랜잭션 저장소. 공개돼 있어 MEV의 원인이 됨."],
  ["MEV", "Maximal Extractable Value. 거래 순서를 조작해 추출하는 가치. 샌드위치 공격 등."],
  ["Multisig", "여러 개의 서명이 있어야 실행되는 지갑. 팀 자금 관리의 표준 (예: Safe)."],
  ["Nonce", "계정의 트랜잭션 순번. 재전송 공격 방지와 순서 보장에 사용."],
  ["Oracle", "체인 밖 데이터(가격 등)를 온체인으로 가져오는 장치. Chainlink가 대표."],
  ["Rug Pull", "개발자가 유동성을 빼고 잠적하는 사기 유형."],
  ["Sequencer", "L2에서 거래 순서를 정하는 주체. 대부분 아직 중앙화돼 있어 탈중앙화 과제로 남음."],
  ["Slashing", "PoS에서 부정행위를 한 검증자의 예치금을 몰수하는 벌칙."],
  ["Slippage", "예상 체결가와 실제 체결가의 차이. 스왑 UI에서 허용치를 설정."],
  ["TVL", "Total Value Locked. 프로토콜에 예치된 총 자산 가치. 규모 비교 지표."],
  ["Wei", "ETH의 최소 단위. 1 ETH = 10¹⁸ wei. 코드에서는 항상 wei(bigint)로 계산."],
];

export default function GlossaryPage() {
  return (
    <main className="mx-auto max-w-[75rem] px-5 pb-16 sm:px-8">
      <header className="py-16 sm:py-24">
        <p className="text-caption font-medium text-ink-dim">
          부록 ·{" "}
          <Link href="/web3" className="transition-colors hover:text-ink">
            Web3
          </Link>
        </p>
        <h1 className="mt-4 text-[2.5rem] font-medium leading-[1.02] tracking-[-0.05em] text-ink sm:text-display-lg">
          용어집
        </h1>
        <p className="mt-6 max-w-[42ch] text-body-lg text-ink-muted">
          읽다가 막히는 단어가 나오면 여기서 찾아보세요. Ctrl+F로 검색하면
          빠릅니다.
        </p>
      </header>

      <dl className="max-w-[52rem] overflow-hidden rounded-lg border border-hairline">
        {terms.map(([term, def]) => (
          <div
            key={term}
            className="grid gap-x-6 gap-y-1 border-b border-hairline-soft bg-surface-1 px-5 py-4 last:border-b-0 sm:grid-cols-[13rem_1fr]"
          >
            <dt className="font-mono text-body-sm text-ink">{term}</dt>
            <dd className="text-body-sm text-ink-muted">{def}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
