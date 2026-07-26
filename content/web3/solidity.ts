import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "p",
    md: "프론트엔드 개발자라도 컨트랙트를 **읽을 줄은** 알아야 합니다. 내가 호출하는 함수가 뭘 하는지 모른 채 UI를 짜면 안 되니까요. 문법은 JavaScript와 비슷합니다.",
  },
  {
    t: "tabs",
    tabs: [
      {
        label: "간단한 예시",
        body: [
          {
            t: "code",
            lang: "solidity",
            src: `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TipJar {
    // 상태 변수 = 영구 저장소 (쓰기가 비쌈: 슬롯당 약 20,000 gas)
    address public immutable owner;              // immutable은 저장소를 안 씀 → 저렴
    mapping(address => uint256) public tips;      // public이면 getter가 자동 생성
    uint256 public totalTips;

    // 이벤트: 프론트엔드가 구독할 로그. 저장소보다 훨씬 저렴
    event Tipped(address indexed from, uint256 amount, string message);

    // 커스텀 에러: revert 문자열보다 가스 효율적 (0.8.4+)
    error TipTooSmall(uint256 sent, uint256 required);
    error NotOwner();

    constructor() { owner = msg.sender; }

    // payable = ETH를 받을 수 있음. msg.value에 보낸 금액이 담김
    function tip(string calldata message) external payable {
        if (msg.value < 0.001 ether) revert TipTooSmall(msg.value, 0.001 ether);

        tips[msg.sender] += msg.value;   // 0.8+ 는 오버플로 자동 검사
        totalTips += msg.value;

        emit Tipped(msg.sender, msg.value, message);
    }

    function withdraw() external {
        if (msg.sender != owner) revert NotOwner();

        uint256 amount = address(this).balance;
        // ⚠️ 외부 호출은 항상 마지막에 (재진입 공격 방지)
        (bool ok, ) = owner.call{value: amount}("");
        require(ok, "transfer failed");
    }
}`,
          },
        ],
      },
      {
        label: "ERC-20 (OpenZeppelin)",
        body: [
          {
            t: "code",
            lang: "solidity",
            src: `
// 실무에서는 절대 직접 짜지 않습니다. 감사받은 라이브러리를 상속하세요.
// forge install OpenZeppelin/openzeppelin-contracts
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyToken is ERC20, ERC20Permit, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000e18;

    constructor(address initialOwner)
        ERC20("My Token", "MTK")
        ERC20Permit("My Token")      // ERC-2612: 서명으로 approve → UX 개선
        Ownable(initialOwner)
    {
        _mint(initialOwner, 100_000e18);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "cap exceeded");
        _mint(to, amount);
    }
}

/* 이 한 파일로 transfer / approve / transferFrom / balanceOf /
   allowance / permit / Transfer 이벤트가 전부 표준대로 구현됩니다.
   프론트엔드는 표준 ERC-20 ABI만 있으면 바로 붙일 수 있습니다. */`,
          },
        ],
      },
      {
        label: "보안 패턴",
        body: [
          {
            t: "code",
            lang: "ts",
            src: `
// 재진입(Reentrancy) 공격 — 2016년 The DAO 해킹의 원인, 지금도 계속 발생

// ❌ 취약한 코드
function withdrawBad() external {
    uint256 amount = balances[msg.sender];
    (bool ok,) = msg.sender.call{value: amount}("");  // ← 여기서 공격자 컨트랙트로 제어권이 넘어감
    require(ok);
    balances[msg.sender] = 0;   // ← 아직 0이 아님! 공격자가 재귀 호출로 계속 인출
}

// ✅ Checks-Effects-Interactions 패턴
function withdrawGood() external {
    uint256 amount = balances[msg.sender];   // 1. Checks  — 검사
    require(amount > 0, "nothing to withdraw");
    balances[msg.sender] = 0;               // 2. Effects — 상태 먼저 변경
    (bool ok,) = msg.sender.call{value: amount}("");  // 3. Interactions — 외부 호출 마지막
    require(ok);
}

// 더 안전하게: OpenZeppelin의 ReentrancyGuard 사용
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
contract Vault is ReentrancyGuard {
    function withdraw() external nonReentrant { /* ... */ }
}

/* 그 외 주요 취약점
   · 접근 제어 누락    — onlyOwner 빠뜨리기 (실제 사고 1위급)
   · 오라클 조작       — 단일 DEX 가격을 신뢰 → 플래시론으로 조작
   · 프론트러닝(MEV)   — 멤풀에서 내 거래를 보고 새치기
   · 서명 재사용       — nonce/deadline 없는 서명 검증
   · 업그레이드 키 탈취 — 프록시 admin 키 관리 실패                        */`,
          },
        ],
      },
    ],
  },
  { t: "h4", md: "Solidity에서 JS 개발자가 놀라는 점" },
  {
    t: "ul",
    items: [
      "**부동소수점이 없습니다.** `0.1 + 0.2`를 못 씁니다. 모든 금액은 정수 + decimals로 표현합니다",
      "**반복문이 위험합니다.** 배열을 순회하다 가스 한도를 넘으면 함수가 영영 실행 불가가 됩니다",
      "**`private`은 프라이버시가 아닙니다.** 다른 컨트랙트의 접근만 막습니다. 체인 데이터를 직접 읽으면 다 보입니다",
      "**난수가 없습니다.** `block.timestamp` 같은 걸로 난수를 만들면 채굴자/검증자가 조작할 수 있습니다. Chainlink VRF 같은 외부 오라클을 씁니다",
      "**storage vs memory vs calldata** — 데이터 위치를 명시해야 하고, 비용이 수천 배 차이 납니다",
    ],
  },
  { t: "hr" },
  { t: "h2", md: "프론트엔드가 반드시 겪는 함정 12가지" },
  {
    t: "grid",
    cols: 2,
    items: [
      {
        t: "card",
        tone: "bad",
        title: "1. Number로 금액 계산",
        body: [
          {
            t: "p",
            md: "`Number(balance)` → 정밀도 손실. 반드시 `bigint`와 `formatUnits/parseUnits`를 쓰세요. 이건 버그가 아니라 *사고*입니다.",
          },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "2. decimals를 18로 하드코딩",
        body: [
          { t: "p", md: "USDC/USDT는 **6**, WBTC는 **8**입니다. 컨트랙트에서 읽어오거나 상수로 관리하세요. 안 그러면 금액이 10¹² 배 틀립니다." },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "3. 체인 확인 누락",
        body: [
          {
            t: "p",
            md: "사용자가 폴리곤에 있는데 메인넷 컨트랙트를 호출하면 알 수 없는 에러가 납니다. 항상 `chain?.id`를 확인하고 `useSwitchChain`으로 유도하세요.",
          },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "4. 낙관적 UI 오남용",
        body: [
          {
            t: "p",
            md: "서명 직후 \"완료!\"를 띄우면 안 됩니다. 트랜잭션은 되돌아갈 수 있습니다. `useWaitForTransactionReceipt`로 확정을 기다리세요.",
          },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "5. RPC 요청 폭주",
        body: [
          {
            t: "p",
            md: "토큰 20개 잔고를 20번 호출하면 무료 티어가 즉시 소진됩니다. `multicall`과 React Query 캐싱(`staleTime`)을 활용하세요.",
          },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "6. 온체인에서 히스토리를 조회하려는 시도",
        body: [
          { t: "p", md: "\"이 유저의 지난 거래 100건\"은 컨트랙트가 답할 수 없습니다. 인덱서(The Graph, Ponder)나 익스플로러 API를 쓰세요." },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "7. 에러 처리 부재",
        body: [
          {
            t: "p",
            md: "사용자 거절, 가스 부족, revert, nonce 충돌, RPC 타임아웃… 각각 다른 메시지가 필요합니다. viem의 `error.shortMessage`와 `error.name`으로 분기하세요.",
          },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "8. 무제한 approve를 기본값으로",
        body: [
          { t: "p", md: "편하지만 위험합니다. 필요한 만큼만 요청하거나 Permit(ERC-2612)을 쓰고, 사용자에게 승인 범위를 명확히 보여주세요." },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "9. 주소를 그대로 노출",
        body: [
          { t: "p", md: "`0x71C7…976F`로 축약하고, ENS 이름(`useEnsName`)이 있으면 그걸 보여주세요. 복사 버튼도 필수입니다." },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "10. 모바일 지갑 무시",
        body: [
          { t: "p", md: "모바일에서는 브라우저 확장이 없습니다. WalletConnect나 지갑 내장 브라우저를 반드시 지원하세요." },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "11. 지갑이 없는 사용자를 방치",
        body: [
          {
            t: "p",
            md: "\"MetaMask를 설치하세요\"는 사용자의 90%를 잃는 화면입니다. Privy·Dynamic 같은 임베디드 지갑으로 이메일 로그인 경로를 제공하세요.",
          },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "12. 슬리피지·MEV를 설명하지 않음",
        body: [
          { t: "p", md: "스왑에서 \"예상 금액\"과 \"최소 수령액\"은 다릅니다. 멤풀이 공개라 샌드위치 공격을 당할 수 있음을 UI에 반영하세요." },
        ],
      },
    ],
  },
  { t: "h3", md: "에러 분기 예시" },
  {
    t: "code",
    lang: "ts",
    src: `
import { BaseError, UserRejectedRequestError, ContractFunctionRevertedError } from 'viem'

function toUserMessage(err) {
  if (err instanceof BaseError) {
    if (err.walk(e => e instanceof UserRejectedRequestError))
      return '지갑에서 요청을 거절했습니다.'

    const revert = err.walk(e => e instanceof ContractFunctionRevertedError)
    if (revert)
      return \`거래가 거부되었습니다: \${revert.data?.errorName ?? '알 수 없는 이유'}\`

    if (err.shortMessage?.includes('insufficient funds'))
      return '가스비로 쓸 ETH가 부족합니다.'
  }
  return '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
}`,
  },
  { t: "hr" },
  { t: "h2", md: "학습 로드맵 (프론트엔드 개발자 기준)" },
  {
    t: "callout",
    title: "1주차 — 사용자가 되어보기 가장 중요",
    body: [
      {
        t: "ul",
        items: [
          "MetaMask 또는 Rabby 설치. **시드구문을 종이에 적어 보관**(스크린샷 금지)",
          "Sepolia 테스트넷으로 전환 → [포싯](https://sepoliafaucet.com)에서 무료 테스트 ETH 받기",
          "본인의 다른 주소로 송금해 보고, [Etherscan](https://sepolia.etherscan.io)에서 트랜잭션 확인",
          "Uniswap 테스트넷에서 스왑 한 번 — approve 두 번 뜨는 걸 직접 체감",
          "[ENS](https://app.ens.domains) 살펴보기, [revoke.cash](https://revoke.cash)로 승인 관리 이해",
        ],
      },
      { t: "p", md: "**이 단계를 건너뛰지 마세요.** UX를 몸으로 겪지 않고 만든 Web3 앱은 반드시 나쁩니다." },
    ],
  },
  {
    t: "callout",
    title: "2~3주차 — 읽기 전용 dApp 만들기",
    body: [
      {
        t: "ul",
        items: [
          "Next.js + wagmi + viem 세팅, Alchemy 무료 키 발급",
          "지갑 연결 버튼 → 주소·ETH 잔고·ENS 이름 표시",
          "USDC 잔고 읽기 (`useReadContract`) → decimals 함정 체감",
          "최근 블록 번호·가스 가격 실시간 표시",
          "여러 토큰 잔고를 `multicall`로 한 번에 조회",
        ],
      },
    ],
  },
  {
    t: "callout",
    title: "4~6주차 — 쓰기가 있는 dApp",
    body: [
      {
        t: "ul",
        items: [
          "테스트넷 토큰 전송 UI + 3단계 트랜잭션 상태 표시",
          "모든 실패 케이스 처리 (거절/가스부족/revert)",
          "이벤트 구독으로 실시간 갱신",
          "SIWE 로그인 붙이기",
          "배포 (Vercel) — 프론트엔드 배포는 Web2와 완전히 동일",
        ],
      },
    ],
  },
  {
    t: "callout",
    title: "2~3개월차 — 컨트랙트 쪽으로",
    body: [
      {
        t: "ul",
        items: [
          "[CryptoZombies](https://cryptozombies.io) 또는 [Speedrun Ethereum](https://speedrunethereum.com)으로 Solidity 기초",
          "Foundry 설치 → `forge init`, `forge test`, `anvil`로 로컬 체인",
          "OpenZeppelin으로 ERC-20 / ERC-721 배포 (테스트넷)",
          "내가 만든 컨트랙트를 내 프론트엔드에 연결 — **여기서 전체 그림이 완성됩니다**",
          "[Ethernaut](https://ethernaut.openzeppelin.com) 워게임으로 보안 감각 기르기",
        ],
      },
    ],
  },
  {
    t: "callout",
    tone: "tip",
    title: "추천 학습 자료",
    body: [
      {
        t: "ul",
        items: [
          "**[ethereum.org 개발자 문서](https://ethereum.org/developers/)** — 1차 출처. 한국어 번역도 상당히 좋음",
          "**[Speedrun Ethereum](https://speedrunethereum.com)** (BuidlGuidl) — 챌린지 형식으로 풀스택 dApp을 만들며 배움. **가장 추천**",
          "**[wagmi 공식 문서](https://wagmi.sh)** / [viem 공식 문서](https://viem.sh) — 예제가 깔끔함",
          "**[Scaffold-ETH 2](https://scaffoldeth.io)** — Next.js + wagmi + Foundry 보일러플레이트",
          "**[Cyfrin Updraft](https://updraft.cyfrin.io)** — 무료 고품질 Solidity/보안 강의",
          "**[RareSkills](https://www.rareskills.io/learn-solidity)** — 심화 (가스 최적화, EVM 내부)",
          "**[L2BEAT](https://l2beat.com)** — L2들의 실제 탈중앙화 수준을 냉정하게 평가. 필독",
          "**[DeFiLlama](https://defillama.com)** — TVL·수수료 등 생태계 데이터",
        ],
      },
    ],
  },
];

export default blocks;
