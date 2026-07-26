import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  {
    t: "p",
    md: "이번 장은 실제로 동작하는 코드 여덟 조각을 보여드립니다. **코드를 읽을 줄 몰라도 괜찮습니다** — 각 코드가 하는 일은 코드 위에 미리 문장으로 설명해둡니다. \"실제로 이런 서비스를 만들 때 코드가 대략 이렇게 생겼구나\"라는 감을 잡는 용도로 봐주세요. 도구는 앞 장에서 나온 viem·wagmi입니다.",
  },
  { t: "h3", md: "① 어느 체인에, 어떤 방식으로 연결할지 정하기" },
  { t: "p", md: "가장 먼저 \"어느 체인들을 지원할지\", \"지갑을 어떤 방식으로 연결받을지\"를 정하는 설정입니다." },
  {
    t: "code",
    lang: "ts",
    src: `
// wagmi.ts
import { http, createConfig } from 'wagmi'
import { mainnet, base, sepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, base, sepolia],
  connectors: [
    injected(),                                // MetaMask, Rabby 등 브라우저 확장
    walletConnect({ projectId: 'YOUR_ID' }),   // 모바일 지갑 QR 연결
  ],
  transports: {
    [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/KEY'),
    [base.id]:    http(),  // 생략하면 공개 접속 창구 사용 (연습용으로만)
    [sepolia.id]: http(),
  },
})`,
  },
  { t: "h3", md: "② 이 설정을 화면 전체에서 쓸 수 있게 감싸기" },
  { t: "p", md: "위 설정을 앱의 어느 화면에서든 꺼내 쓸 수 있게 만드는 준비 작업입니다." },
  {
    t: "code",
    lang: "tsx",
    src: `
// app/providers.tsx
'use client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/wagmi'

const queryClient = new QueryClient()

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}`,
  },
  { t: "h3", md: "③ 지갑 연결 버튼" },
  { t: "p", md: "지갑이 이미 연결돼 있으면 이름과 잔고를 보여주고, 아니면 \"연결하기\" 버튼들을 보여주는 코드입니다." },
  {
    t: "code",
    lang: "tsx",
    src: `
import { useAccount, useConnect, useDisconnect, useBalance, useEnsName } from 'wagmi'

function ConnectButton() {
  const { address, isConnected, chain } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })     // vitalik.eth 같은 별명
  const { data: balance } = useBalance({ address })    // 이 체인의 기본 코인 잔고

  if (isConnected) return (
    <div>
      <p>{ensName ?? \`\${address.slice(0,6)}…\${address.slice(-4)}\`}</p>
      <p>{balance?.formatted} {balance?.symbol} · {chain?.name}</p>
      <button onClick={() => disconnect()}>연결 해제</button>
    </div>
  )

  return connectors.map((c) => (
    <button key={c.uid} onClick={() => connect({ connector: c })} disabled={isPending}>
      {c.name} 연결
    </button>
  ))
}`,
  },
  { t: "h3", md: "④ 값을 읽기만 하기 — 수수료 없이, 즉시" },
  { t: "p", md: "[7장](/web3/contracts)에서 본 것처럼 \"읽기 전용\" 요청은 수수료가 들지 않고 곧바로 결과가 옵니다. 여기서는 특정 주소의 USDC 잔고를 읽어옵니다." },
  {
    t: "code",
    lang: "tsx",
    src: `
import { useReadContract } from 'wagmi'
import { formatUnits } from 'viem'

// 프로그램 설명서(ABI). 이렇게 적어두면 함수 이름·인자 오타를 자동으로 잡아줍니다
const erc20Abi = [
  { name:'balanceOf', type:'function', stateMutability:'view',
    inputs:[{name:'owner',type:'address'}], outputs:[{type:'uint256'}] },
  { name:'decimals', type:'function', stateMutability:'view',
    inputs:[], outputs:[{type:'uint8'}] },
] as const

const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'  // 메인넷 USDC

function UsdcBalance({ address }) {
  const { data, isLoading, error } = useReadContract({
    address: USDC,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address],
    query: { enabled: !!address },
  })

  if (isLoading) return <p>불러오는 중…</p>
  if (error) return <p>오류: {error.shortMessage}</p>

  // USDC는 소수점 자리수가 6입니다(ETH는 18) — 이 숫자를 그냥 고정해서 쓰면 안 됩니다
  return <p>{formatUnits(data ?? 0n, 6)} USDC</p>
}`,
  },
  { t: "h3", md: "⑤ 장부 내용을 바꾸기 — 거래 전체 흐름" },
  { t: "p", md: "값을 바꾸는 요청은 [3장](/web3/consensus)에서 본 것처럼 \"지갑 승인 → 네트워크 확정\" 단계를 거칩니다. 여기서는 실제로 USDC를 보내는 코드입니다." },
  {
    t: "code",
    lang: "tsx",
    src: `
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useSwitchChain } from 'wagmi'
import { parseUnits } from 'viem'
import { base } from 'wagmi/chains'

function SendUsdc() {
  const { chain } = useAccount()
  const { switchChain } = useSwitchChain()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  // 거래가 페이지에 실릴 때까지 계속 확인
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  async function send(to, amount) {
    // ⚠️ 필수: 사용자가 다른 체인에 접속해 있을 수 있음
    if (chain?.id !== base.id) {
      await switchChain({ chainId: base.id })
    }
    writeContract({
      address: USDC_BASE,
      abi: erc20Abi,
      functionName: 'transfer',
      args: [to, parseUnits(amount, 6)],   // "10.5" → 10500000
    })
  }

  return (
    <>
      <button onClick={() => send('0x…', '10.5')} disabled={isPending || isConfirming}>
        {isPending    ? '지갑에서 승인해 주세요…'     // 사용자가 팝업 확인 중
        : isConfirming ? '확정 대기 중…'             // 네트워크가 처리 중
        : '10.5 USDC 보내기'}
      </button>

      {hash      && <a href={\`https://basescan.org/tx/\${hash}\`}>탐색기에서 보기</a>}
      {isSuccess && <p>✅ 전송 완료</p>}
      {error     && <p>❌ {error.shortMessage}</p>}
    </>
  )
}`,
  },
  {
    t: "callout",
    tone: "tip",
    title: "\"진행 상태\"가 3단계인 것에 주목하세요",
    body: [
      {
        t: "p",
        md: "**승인 대기 중(지갑 팝업) → 확정 대기 중(네트워크 처리) → 완료됨(페이지에 실림)**, 이렇게 세 단계입니다. 흔한 \"불러오는 중 → 성공 → 실패\" 3단계보다 한 단계가 더 있는 셈입니다. 이 구분을 화면에 그대로 보여주지 않으면 사용자는 \"왜 아무 반응이 없지?\"라고 느낍니다. 그리고 여기서 말하는 \"완료됨\"은 [3장](/web3/consensus)에서 본 **최종성**과는 다릅니다 — 페이지에 실린 것뿐, 몇 분은 더 지나야 확실히 뒤집히지 않습니다.",
      },
    ],
  },
  { t: "h3", md: "⑥ 실시간으로 지켜보기" },
  { t: "p", md: "[7장](/web3/contracts)에서 본 이벤트 기록을 실시간으로 구독하는 코드입니다. 누군가 나에게 USDC를 보낼 때마다 알림을 띄웁니다." },
  {
    t: "code",
    lang: "ts",
    src: `
import { useWatchContractEvent } from 'wagmi'

useWatchContractEvent({
  address: USDC,
  abi: erc20Abi,
  eventName: 'Transfer',
  args: { to: myAddress },        // 나에게 오는 것만 필터링
  onLogs(logs) {
    logs.forEach(l => toast(\`입금: \${formatUnits(l.args.value, 6)} USDC\`))
    refetchBalance()
  },
})`,
  },
  { t: "h3", md: "⑦ 서명으로 로그인하기" },
  { t: "p", md: "[4장](/web3/wallet)에서 본 \"비밀번호 대신 서명으로 증명하기\"가 실제 코드로는 이렇게 생겼습니다." },
  {
    t: "code",
    lang: "ts",
    src: `
import { useSignMessage } from 'wagmi'

const { signMessageAsync } = useSignMessage()

async function login(address) {
  // 1. 서버에서 일회용 값(nonce) 받기 — 같은 서명을 재사용하는 걸 막기 위함
  const { nonce } = await fetch('/api/nonce').then(r => r.json())

  // 2. 정해진 형식의 메시지에 서명 — 수수료 없음, 기록도 안 남음
  const message = \`myapp.com wants you to sign in with your Ethereum account:
\${address}

URI: https://myapp.com
Version: 1
Chain ID: 1
Nonce: \${nonce}
Issued At: \${new Date().toISOString()}\`

  const signature = await signMessageAsync({ message })

  // 3. 서버가 이 서명에서 주소를 거꾸로 확인해 로그인 처리
  await fetch('/api/verify', { method:'POST', body: JSON.stringify({ message, signature }) })
}`,
  },
  { t: "h3", md: "⑧ 화면 없이, 서버에서 직접 체인 조회하기" },
  { t: "p", md: "지금까지는 화면(React) 안에서의 코드였습니다. 서버에서 화면 없이 바로 체인 정보를 가져오고 싶을 때는 이렇게 씁니다." },
  {
    t: "code",
    lang: "ts",
    src: `
import { createPublicClient, http, formatEther } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

const block   = await client.getBlockNumber()
const balance = await client.getBalance({ address: '0xd8dA…6045' })  // vitalik.eth
const gas     = await client.getGasPrice()

console.log(block, formatEther(balance), gas)

// 여러 프로그램에 대한 요청을 한 번의 왕복으로 묶기 (multicall)
const results = await client.multicall({
  contracts: [
    { address: USDC, abi: erc20Abi, functionName: 'balanceOf', args: [me] },
    { address: DAI,  abi: erc20Abi, functionName: 'balanceOf', args: [me] },
    { address: WETH, abi: erc20Abi, functionName: 'balanceOf', args: [me] },
  ],
})`,
  },
  {
    t: "legend",
    md: "`multicall`은 여러 번 오갈 요청을 한 번으로 묶어서 속도를 높이는 기법입니다. 여러 토큰의 잔고를 한 화면에 동시에 보여줄 때 특히 중요합니다.",
  },
];

export default blocks;
