import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "p",
    md: "여기서부터는 조금 더 깊이 들어갑니다. 실제 프로그램(스마트 컨트랙트) 코드가 어떻게 생겼는지, 그리고 나중에 직접 만들어보고 싶어졌을 때 무엇부터 해야 하는지를 다룹니다. **코드를 못 읽어도 괜찮습니다** — 각 코드 옆에 무슨 일이 벌어지는지 적어뒀습니다. 이 언어는 **Solidity**라고 부르고, 문법은 흔히 쓰이는 프로그래밍 언어들과 크게 다르지 않습니다.",
  },
  {
    t: "p",
    md: "첫 예시는 \"누구나 돈을 보낼 수 있고, 만든 사람만 그 돈을 인출할 수 있는\" 아주 단순한 저금통 프로그램입니다.",
  },
  {
    t: "tabs",
    tabs: [
      {
        label: "간단한 예시: 저금통",
        body: [
          {
            t: "code",
            lang: "solidity",
            src: `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TipJar {
    // 영구 저장 값 (쓰기가 비쌈: [6장]에서 본 것처럼 저장은 계산보다 훨씬 비쌉니다)
    address public immutable owner;              // 배포 이후 안 바뀌는 값은 저장 비용이 안 듦 → 저렴
    mapping(address => uint256) public tips;      // "누가 얼마 보냈는지" 목록
    uint256 public totalTips;

    // 이벤트: 바깥에서 지켜볼 수 있는 기록. 저장하는 것보다 훨씬 저렴
    event Tipped(address indexed from, uint256 amount, string message);

    // 실패 이유를 이름 붙여서 알림 (문자열보다 비용이 적게 듦)
    error TipTooSmall(uint256 sent, uint256 required);
    error NotOwner();

    constructor() { owner = msg.sender; }   // 배포한 사람이 주인이 됨

    // payable = 코인을 받을 수 있음. 보낸 금액이 msg.value에 담김
    function tip(string calldata message) external payable {
        if (msg.value < 0.001 ether) revert TipTooSmall(msg.value, 0.001 ether);

        tips[msg.sender] += msg.value;
        totalTips += msg.value;

        emit Tipped(msg.sender, msg.value, message);
    }

    function withdraw() external {
        if (msg.sender != owner) revert NotOwner();   // 주인만 인출 가능

        uint256 amount = address(this).balance;
        // ⚠️ 잔고를 먼저 0으로 만들고 나중에 돈을 보내야 안전합니다 (아래 "보안 패턴" 참고)
        (bool ok, ) = owner.call{value: amount}("");
        require(ok, "transfer failed");
    }
}`,
          },
        ],
      },
      {
        label: "토큰 만들기 (검증된 코드 재사용)",
        body: [
          {
            t: "p",
            md: "실무에서는 [7장](/web3/contracts)에서 본 ERC-20 같은 표준을 처음부터 직접 짜지 않습니다. 이미 수많은 전문가가 검토한 코드를 가져다 씁니다.",
          },
          {
            t: "code",
            lang: "solidity",
            src: `
// forge install OpenZeppelin/openzeppelin-contracts 로 가져온 검증된 코드를 재사용
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyToken is ERC20, ERC20Permit, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000e18;

    constructor(address initialOwner)
        ERC20("My Token", "MTK")
        ERC20Permit("My Token")      // [7장]에서 본, 서명만으로 허가하는 기능 포함
        Ownable(initialOwner)
    {
        _mint(initialOwner, 100_000e18);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "cap exceeded");
        _mint(to, amount);
    }
}

/* 이 짧은 코드만으로 보내기 / 허가하기 / 잔고 조회 같은 기능이
   전부 표준 규격대로 자동으로 갖춰집니다. */`,
          },
        ],
      },
      {
        label: "실제 해킹 사례로 보는 보안",
        body: [
          {
            t: "p",
            md: "2016년, 아래와 같은 허점 하나로 당시 시세로 약 6천만 달러어치의 이더리움이 도난당했습니다(\"The DAO 해킹\"으로 불리는 사건입니다). 지금도 같은 실수가 반복됩니다.",
          },
          {
            t: "code",
            lang: "ts",
            src: `
// ❌ 위험한 코드: 돈을 먼저 보내고 나중에 장부를 0으로 만듦
function withdrawBad() external {
    uint256 amount = balances[msg.sender];
    (bool ok,) = msg.sender.call{value: amount}("");  // ← 여기서 상대방 프로그램에게 제어권이 넘어감
    require(ok);
    balances[msg.sender] = 0;   // ← 아직 실행 전! 상대가 이 틈에 인출 함수를 반복 호출해 계속 빼갈 수 있음
}

// ✅ 안전한 코드: 장부부터 먼저 정리하고, 돈은 맨 마지막에 보냄
function withdrawGood() external {
    uint256 amount = balances[msg.sender];   // 1. 확인
    require(amount > 0, "nothing to withdraw");
    balances[msg.sender] = 0;               // 2. 장부를 먼저 정리
    (bool ok,) = msg.sender.call{value: amount}("");  // 3. 외부로 나가는 호출은 항상 마지막에
    require(ok);
}

/* 그 외에 자주 나는 실수들
   · 권한 확인을 깜빡함        — "주인만 실행 가능"을 빠뜨리는 것. 실제 사고에서 가장 흔함
   · 가격 정보 조작            — 한 곳의 시세만 믿었다가, 그 시세 자체를 조작당함
   · 새치기(MEV)               — 대기 중인 거래 내용이 공개라 남이 미리 보고 새치기함
   · 서명 재사용                — 같은 서명을 여러 번 쓸 수 있게 방치함
   · 관리자 열쇠 탈취           — 프로그램을 고칠 권한을 가진 열쇠 자체가 털림             */`,
          },
        ],
      },
    ],
  },
  { t: "h4", md: "이 언어의 독특한 점들" },
  {
    t: "ul",
    items: [
      "**소수점 계산이 아예 없습니다.** [6장](/web3/gas)에서 본 것처럼 모든 금액은 정수로만 다룹니다",
      "**반복문이 위험할 수 있습니다.** 목록이 너무 길어지면 한 번의 실행에 필요한 작업량이 한도를 넘어서서, 그 함수 자체가 영영 실행 불가능해질 수 있습니다",
      "**\"비공개\"라고 적어도 완전히 숨겨지진 않습니다.** [7장](/web3/contracts)에서 본 것처럼 다른 프로그램의 접근만 막을 뿐, 장부 데이터를 직접 들여다보면 다 보입니다",
      "**진짜 무작위 숫자를 만들 수 없습니다.** [5장](/web3/evm)에서 본 EVM의 특성 때문입니다. 억지로 시간값 등으로 흉내 내면 조작당할 수 있어서, 신뢰할 수 있는 외부 서비스를 따로 씁니다",
    ],
  },
  { t: "hr" },
  { t: "h2", md: "실제로 자주 나는 실수 12가지" },
  {
    t: "p",
    md: "나중에 직접 이런 서비스를 만들게 된다면, 아래 12가지는 정말 자주 반복되는 실수들입니다. 지금까지 이 시리즈를 읽었다면 왜 문제가 되는지는 이미 다 나온 개념들입니다.",
  },
  {
    t: "grid",
    cols: 2,
    items: [
      {
        t: "card",
        tone: "bad",
        title: "1. 큰 금액을 일반적인 숫자로 계산",
        body: [
          { t: "p", md: "[6장](/web3/gas)에서 본 것처럼 이더리움의 금액은 자릿수가 너무 커서, 일반적인 숫자 계산으로 다루면 미세한 오차가 생깁니다. 반드시 정수 전용 계산 방식을 써야 합니다. 이건 사소한 버그가 아니라 사고입니다." },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "2. 소수점 자리수를 고정값으로 가정",
        body: [
          { t: "p", md: "USDC·USDT는 소수점 6자리, WBTC는 8자리입니다(이더는 18자리). 이 숫자를 하드코딩하면 금액이 자릿수만큼 통째로 틀어집니다." },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "3. 사용자가 어느 체인에 있는지 확인 안 함",
        body: [
          { t: "p", md: "[8장](/web3/layer2)에서 본 여러 체인 중 사용자가 엉뚱한 체인에 있으면, 프로그램 호출은 알 수 없는 오류를 냅니다. 항상 지금 어느 체인에 있는지 먼저 확인해야 합니다." },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "4. 확정 전에 \"완료\" 표시",
        body: [
          { t: "p", md: "서명 직후 곧바로 \"완료!\"를 보여주면 안 됩니다. [3장](/web3/consensus)에서 본 것처럼 거래는 몇 분 뒤까지도 되돌아갈 수 있습니다. 진짜 확정까지 기다려야 합니다." },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "5. 체인에 요청을 너무 자주 보냄",
        body: [
          { t: "p", md: "토큰 20개의 잔고를 하나씩 20번 물어보면, 무료로 제공되는 접속 한도가 금방 바닥납니다. [10장](/web3/code)에서 본 여러 요청을 한 번에 묶는 기법을 씁니다." },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "6. 지난 기록을 프로그램에게 직접 물어보려는 시도",
        body: [ { t: "p", md: "\"이 사람의 지난 거래 100건\" 같은 질문에는 프로그램이 답할 수 없습니다. [7장](/web3/contracts)에서 본 인덱싱 서비스에 물어봐야 합니다." } ],
      },
      {
        t: "card",
        tone: "bad",
        title: "7. 실패 이유를 구분 안 함",
        body: [
          { t: "p", md: "사용자가 거절함, 수수료 부족, 프로그램이 조건을 거부함, 접속 자체가 끊김 — 이유마다 사용자에게 보여줄 안내 문구가 달라야 합니다." },
        ],
      },
      {
        t: "card",
        tone: "bad",
        title: "8. 무제한 허가를 기본값으로",
        body: [ { t: "p", md: "[7장](/web3/contracts)에서 본 것처럼 편하지만 위험합니다. 필요한 만큼만 허가하거나, 서명 한 번으로 대체하는 방식을 쓰고, 사용자에게 허가 범위를 명확히 보여줘야 합니다." } ],
      },
      {
        t: "card",
        tone: "bad",
        title: "9. 지갑 주소를 길게 그대로 노출",
        body: [ { t: "p", md: "\"0x71C7…976F\"처럼 앞뒤만 남기고 줄이고, [4장](/web3/wallet)에서 본 사람이 읽기 쉬운 별명이 있으면 그걸 대신 보여줘야 합니다. 복사 버튼도 꼭 필요합니다." } ],
      },
      {
        t: "card",
        tone: "bad",
        title: "10. 휴대폰 사용자를 잊음",
        body: [ { t: "p", md: "휴대폰에는 컴퓨터의 지갑 확장 프로그램이 없습니다. QR 연결이나 지갑 앱 안의 브라우저를 반드시 함께 지원해야 합니다." } ],
      },
      {
        t: "card",
        tone: "bad",
        title: "11. 지갑이 없는 사람을 방치",
        body: [ { t: "p", md: "\"지갑부터 설치하세요\"는 방문자 대부분을 그 자리에서 잃는 화면입니다. 이메일만으로 지갑을 자동으로 만들어주는 서비스로 진입장벽을 낮출 수 있습니다." } ],
      },
      {
        t: "card",
        tone: "bad",
        title: "12. 가격 미끄러짐과 새치기를 설명 안 함",
        body: [ { t: "p", md: "코인을 교환할 때 \"예상 금액\"과 \"실제로 받는 최소 금액\"은 다릅니다. 대기 중인 거래 내용이 공개돼 있어서 남이 미리 보고 끼어들 수도 있다는 걸 화면에 알려줘야 합니다." } ],
      },
    ],
  },
  { t: "h3", md: "실패 이유를 구분하는 코드 예시" },
  { t: "p", md: "위 7번 항목을 실제로 코드로 처리하면 이런 모습입니다 — 오류 종류별로 다른 안내 문구를 고릅니다." },
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
      return '수수료로 쓸 코인이 부족합니다.'
  }
  return '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
}`,
  },
  { t: "hr" },
  { t: "h2", md: "학습 로드맵 — 직접 만들어보고 싶다면" },
  {
    t: "p",
    md: "여기부터는 실제로 개발을 배워보고 싶은 사람을 위한 순서입니다. 지금까지 이 시리즈를 읽었다면 아래 각 단계가 왜 필요한지는 이미 이해하고 있을 겁니다.",
  },
  {
    t: "callout",
    title: "1주차 — 먼저 사용자가 되어보기 (가장 중요)",
    body: [
      {
        t: "ul",
        items: [
          "지갑 프로그램(MetaMask 등) 설치. **시드구문은 반드시 종이에 적어 보관**(스크린샷 금지, [4장](/web3/wallet) 참고)",
          "진짜 돈이 안 오가는 연습용 체인(Sepolia)으로 전환 → [포싯](https://sepoliafaucet.com)에서 무료 연습용 코인 받기",
          "내 다른 주소로 직접 송금해보고, [Etherscan](https://sepolia.etherscan.io)에서 그 거래 확인해보기",
          "연습용 거래소에서 교환을 한 번 해보며, [7장](/web3/contracts)에서 본 \"허가 후 실행\" 절차를 직접 체감",
          "[ENS](https://app.ens.domains) 둘러보기, [revoke.cash](https://revoke.cash)로 허가 내역 정리해보기",
        ],
      },
      { t: "p", md: "**이 단계를 건너뛰지 마세요.** 사용자로서 겪어보지 않고 만든 서비스는 대부분 쓰기 불편합니다." },
    ],
  },
  {
    t: "callout",
    title: "2~3주차 — 읽기 전용 화면 만들기",
    body: [
      {
        t: "ul",
        items: [
          "[9장](/web3/architecture)에서 본 도구들로 개발 환경 준비",
          "지갑 연결 버튼 → 주소·잔고·별명(ENS) 표시",
          "USDC 잔고 읽기 → 소수점 자리수 함정 직접 체감",
          "최근 블록 번호·수수료를 실시간으로 표시",
          "여러 토큰 잔고를 [10장](/web3/code)에서 본 방식으로 한 번에 조회",
        ],
      },
    ],
  },
  {
    t: "callout",
    title: "4~6주차 — 값을 바꾸는 기능까지",
    body: [
      {
        t: "ul",
        items: [
          "연습용 코인 전송 화면 + [10장](/web3/code)에서 본 3단계 진행 상태 표시",
          "모든 실패 상황 처리하기",
          "실시간 갱신(이벤트 구독) 붙이기",
          "서명으로 로그인하는 기능 붙이기",
          "실제로 배포해보기 — 이 부분은 일반적인 웹 배포와 완전히 동일합니다",
        ],
      },
    ],
  },
  {
    t: "callout",
    title: "2~3개월차 — 프로그램(컨트랙트) 쪽도 직접",
    body: [
      {
        t: "ul",
        items: [
          "[CryptoZombies](https://cryptozombies.io) 또는 [Speedrun Ethereum](https://speedrunethereum.com)으로 Solidity 기초 익히기",
          "개발 도구(Foundry) 설치해서 로컬 연습용 체인 띄워보기",
          "검증된 코드로 나만의 토큰·NFT를 연습용 체인에 배포해보기",
          "내가 만든 프로그램을 내가 만든 화면에 연결 — **여기서 전체 그림이 완성됩니다**",
          "[Ethernaut](https://ethernaut.openzeppelin.com) 같은 보안 실습 게임으로 감각 기르기",
        ],
      },
    ],
  },
  {
    t: "callout",
    tone: "tip",
    title: "더 보고 싶다면",
    body: [
      {
        t: "ul",
        items: [
          "**[ethereum.org 개발자 문서](https://ethereum.org/developers/)** — 가장 신뢰할 수 있는 1차 자료",
          "**[Speedrun Ethereum](https://speedrunethereum.com)** — 직접 만들어보며 배우는 방식. 가장 추천",
          "**[wagmi 공식 문서](https://wagmi.sh)** / [viem 공식 문서](https://viem.sh)",
          "**[Scaffold-ETH 2](https://scaffoldeth.io)** — 개발 환경이 이미 갖춰진 시작 템플릿",
          "**[Cyfrin Updraft](https://updraft.cyfrin.io)** — 무료 보안 강의",
          "**[L2BEAT](https://l2beat.com)** — [8장](/web3/layer2)에서 본 체인들이 실제로 얼마나 탈중앙화됐는지 냉정하게 평가",
          "**[DeFiLlama](https://defillama.com)** — 예치금·수수료 같은 생태계 데이터",
        ],
      },
    ],
  },
];

export default blocks;
