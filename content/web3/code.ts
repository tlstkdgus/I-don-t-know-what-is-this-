import type { Block } from "@/lib/blocks";

const blocks: Block[] = [
  { t: "p", md: "아래 코드는 wagmi v2 + viem v2 기준입니다. 실제로 동작하는 최소 구현입니다." },
  { t: "h3", md: "① 설정 (config)" },
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
    [base.id]:    http(),  // 생략하면 공개 RPC 사용 (개발용으로만)
    [sepolia.id]: http(),
  },
})`,
  },
  { t: "h3", md: "② 프로바이더 감싸기" },
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
  { t: "legend", md: "React Query를 써봤다면 이 구조가 완전히 익숙할 겁니다. 실제로 같은 것입니다." },
  { t: "h3", md: "③ 지갑 연결 버튼" },
  {
    t: "code",
    lang: "tsx",
    src: `
import { useAccount, useConnect, useDisconnect, useBalance, useEnsName } from 'wagmi'

function ConnectButton() {
  const { address, isConnected, chain } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })     // vitalik.eth 같은 이름
  const { data: balance } = useBalance({ address })    // 네이티브 ETH 잔고

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
  { t: "h3", md: "④ 컨트랙트 읽기 — 가스 없음, 즉시" },
  {
    t: "code",
    lang: "tsx",
    src: `
import { useReadContract } from 'wagmi'
import { formatUnits } from 'viem'

// \`as const\`가 핵심! 이게 있어야 타입 추론이 동작합니다
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
    functionName: 'balanceOf',   // ← 자동완성 됨. 오타 시 컴파일 에러
    args: [address],              // ← 인자 타입도 검사됨
    query: { enabled: !!address },
  })

  if (isLoading) return <p>불러오는 중…</p>
  if (error) return <p>오류: {error.shortMessage}</p>

  // data는 bigint! USDC는 decimals가 6 (ETH의 18과 다름 — 하드코딩 금지)
  return <p>{formatUnits(data ?? 0n, 6)} USDC</p>
}`,
  },
  { t: "h3", md: "⑤ 컨트랙트 쓰기 — 트랜잭션 전체 라이프사이클" },
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

  // 트랜잭션이 블록에 포함될 때까지 폴링
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  async function send(to, amount) {
    // ⚠️ 필수: 사용자가 다른 체인에 있을 수 있음
    if (chain?.id !== base.id) {
      await switchChain({ chainId: base.id })
    }
    writeContract({
      address: USDC_BASE,
      abi: erc20Abi,
      functionName: 'transfer',
      args: [to, parseUnits(amount, 6)],   // "10.5" → 10500000n
    })
  }

  return (
    <>
      <button onClick={() => send('0x…', '10.5')} disabled={isPending || isConfirming}>
        {isPending    ? '지갑에서 승인해 주세요…'     // 사용자가 팝업 확인 중
        : isConfirming ? '블록 확정 대기 중…'        // 네트워크가 처리 중
        : '10.5 USDC 보내기'}
      </button>

      {hash      && <a href={\`https://basescan.org/tx/\${hash}\`}>익스플로러에서 보기</a>}
      {isSuccess && <p>✅ 전송 완료</p>}
      {error     && <p>❌ {error.shortMessage}</p>}  // shortMessage가 사용자 친화적
    </>
  )
}`,
  },
  {
    t: "callout",
    tone: "tip",
    title: "상태가 3단계인 것에 주목하세요",
    body: [
      {
        t: "p",
        md: "`isPending`(지갑 팝업 대기) → `isConfirming`(네트워크 대기) → `isSuccess`(포함됨). Web2의 `loading/success/error`보다 한 단계 많습니다. 이 구분을 UI에 반영하지 않으면 사용자는 \"왜 아무 반응이 없지?\"라고 느낍니다. 그리고 `isSuccess`도 *최종성*이 아니라 *블록 포함*임을 기억하세요.",
      },
    ],
  },
  { t: "h3", md: "⑥ 이벤트 구독 (실시간 업데이트)" },
  {
    t: "code",
    lang: "ts",
    src: `
import { useWatchContractEvent } from 'wagmi'

useWatchContractEvent({
  address: USDC,
  abi: erc20Abi,
  eventName: 'Transfer',
  args: { to: myAddress },        // indexed 파라미터로 필터링
  onLogs(logs) {
    logs.forEach(l => toast(\`입금: \${formatUnits(l.args.value, 6)} USDC\`))
    refetchBalance()
  },
})`,
  },
  { t: "h3", md: "⑦ 서명으로 로그인 (SIWE)" },
  {
    t: "code",
    lang: "ts",
    src: `
import { useSignMessage } from 'wagmi'

const { signMessageAsync } = useSignMessage()

async function login(address) {
  // 1. 서버에서 nonce 받기 (재사용 공격 방지)
  const { nonce } = await fetch('/api/nonce').then(r => r.json())

  // 2. EIP-4361 형식 메시지에 서명 — 가스 0원, 온체인 기록 없음
  const message = \`myapp.com wants you to sign in with your Ethereum account:
\${address}

URI: https://myapp.com
Version: 1
Chain ID: 1
Nonce: \${nonce}
Issued At: \${new Date().toISOString()}\`

  const signature = await signMessageAsync({ message })

  // 3. 서버가 verifyMessage로 주소를 복원해 검증 → 세션 발급
  await fetch('/api/verify', { method:'POST', body: JSON.stringify({ message, signature }) })
}`,
  },
  { t: "h3", md: "⑧ viem 단독 사용 (React 밖 / 서버)" },
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

// 여러 컨트랙트 호출을 1번의 RPC로 묶기 (multicall) — 성능 필수 기법
const results = await client.multicall({
  contracts: [
    { address: USDC, abi: erc20Abi, functionName: 'balanceOf', args: [me] },
    { address: DAI,  abi: erc20Abi, functionName: 'balanceOf', args: [me] },
    { address: WETH, abi: erc20Abi, functionName: 'balanceOf', args: [me] },
  ],
})`,
  },
  { t: "legend", md: "`multicall`은 N번의 네트워크 왕복을 1번으로 줄입니다. 토큰 목록을 그리는 화면에서 필수입니다." },
];

export default blocks;
