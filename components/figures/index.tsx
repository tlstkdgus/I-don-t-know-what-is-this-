/**
 * 도식 레지스트리 — `{ t: "diagram", name: "..." }` 블록이 여기서 컴포넌트를 찾습니다.
 * `Demos.tsx`의 `DEMOS`와 같은 패턴이지만, 도식은 정적이라 서버 컴포넌트로 둡니다
 * (클라이언트로 나가는 JS가 없습니다).
 *
 * 새 도식을 추가하려면:
 *   1. `./data.tsx` 또는 `./web3.tsx`에 컴포넌트 작성 (부품은 `./primitives.tsx`)
 *   2. 아래 FIGURES에 등록
 *   3. 본문에 `{ t: "diagram", name: "키", caption: "..." }` 삽입
 */
import * as D from "./data";
import * as W from "./web3";

export const FIGURES: Record<string, () => React.JSX.Element> = {
  /* ---------------- data ---------------- */
  "data-model-shapes": D.DataModelShapes,
  "normalization-before-after": D.NormalizationBeforeAfter,
  "lakehouse-layers": D.LakehouseLayers,
  "id-index-insertion": D.IdIndexInsertion,
  "property-graph-vs-rdf": D.PropertyGraphVsRdf,
  "inverted-index": D.InvertedIndex,
  "hnsw-layers": D.HnswLayers,
  "lineage-directions": D.LineageDirections,
  "lineage-collection": D.LineageCollection,
  "openlineage-shape": D.OpenLineageShape,
  "contract-before-after": D.ContractBeforeAfter,
  "contract-parts": D.ContractParts,
  "ontology-layers": D.OntologyLayers,
  "metric-definition-drift": D.MetricDefinitionDrift,
  "rrf-fusion": D.RrfFusion,
  "privacy-spectrum": D.PrivacySpectrum,
  "minimization-axes": D.MinimizationAxes,
  "pseudonym-risk-tiers": D.PseudonymRiskTiers,

  /* ---------------- web3 ---------------- */
  "ownership-compare": W.OwnershipCompare,
  trilemma: W.Trilemma,
  "seed-derivation": W.SeedDerivation,
  "gas-split": W.GasSplit,
  "approve-then-transfer": W.ApproveThenTransfer,
  "blockchain-links": W.BlockChainLinks,
  "web3-architecture": W.Web3Architecture,
  "shared-world-state": W.SharedWorldState,
  "rollup-batching": W.RollupBatching,
  "tx-lifecycle": W.TxLifecycle,
  "reentrancy-attack": W.ReentrancyAttack,
  "amm-pool": W.AmmPool,
  "decentralization-theater": W.DecentralizationTheater,
};
