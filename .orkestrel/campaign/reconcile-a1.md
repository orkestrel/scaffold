# A1 reconciliation — both lanes FAIL, converging blind

Sol: FAIL, 9 broken, 1 unresolved. Opus: FAIL, 7 broken, 3 unresolved, 7 findings outside the
claims. Every sharp finding acted on below was reproduced by the Orchestrator's own hand first.

## Convergent, reproduced, carried to fix rounds

- **createRecorders construction launders `any`** (Sol 1b, Opus 1b; Orchestrator probe: annotating
  the `fromEntries` result as `number` compiles). The Orchestrator's design probe proved
  compilation, not soundness — the guard-narrow construction from the objective design lane
  returns. Carrier: R1. Opus 1a's widened-array keying limit rides with it as documentation.
- **Hostile-value duplicate classes** (Sol 3, Opus 3 with the sharper attack: `Array.isArray`
  throws on a revoked proxy, so the revoked array's arrayness is unobservable). Carrier: R1,
  adopting Opus's live array-target throwing-`get` replacement verbatim.
- **createSignal desynchronizes under an options-signal-scoped registration** (Sol 2 UNRESOLVED,
  Opus F-2; Orchestrator probe: scoped case red, unscoped control green). Carrier: R1.
- **UpgradeResult violates Derive-state** (Sol 18, Opus 18). Prescriptions differ; Opus's
  discriminated union wins — it removes the impossible state and narrows, where Sol's flat removal
  leaves `protocol` dangling on the refused shape. Carrier: R3.
- **Guide universal false and the parity gate cannot see fence-value drift** (Sol 21/22, Opus
  21/22). The gate weakness traces to the U4 brief marking `tests/guides.test.ts` off-limits — an
  Orchestrator brief error. Carrier: R4, transcriptions included.
- **readCascade changed observably beyond the documented set** (Sol 23: LIFO to breadth-first;
  Opus 23: nested-scope widening). Carrier: R2 for the pin and prose, R4 for the guide row.

## Divergent, ruled

- **Platform-name gates** (Sol 20 BROKEN, Opus 20 defensible): Opus read the adjacent mechanism
  comments the rule requires; the gates pre-date the campaign at 0.0.8. Ruling: no tree change;
  the audit claim was over-broad as written. Recorded, not carried.
- **Optional-tuple event maps** (Sol 1a): refused. The constraint mirrors the ecosystem `EventMap`
  contract; an optional event name sits outside it. Recorded ruling, no change.

## Opus-only, accepted on evidence

readProperty refusal scope is target-only — guide bound row (R4). HeadersSource "identically"
overclaims — remark wording (R1). mount's TSDoc justifies the wrong thing — composition is the
wrapper-test defense (R2). typeInput dispatches plain Event, never InputEvent — absence list (R2).
style TSDoc still argues the padded premise with an uncheckable universal (R2). F-1: the package's
own setup reimplements all five shipped probes — dedupe through `@src/server` (R3). F-3: the
stored-versus-enforced assertion is vacuous on the host the gate runs on — replace (R3). F-5: the
inference property that justified `createRecorders` is under no gate — promote the campaign
instruments into compiled proofs (R1). F-6: `requestUpgrade` is the only unbounded wait —
`UpgradeOptions` extends `WaitOptions` (R3). F-7: `createDragEvent`'s null arm is dead — delete
(R2).

## Closure protocol

Fixes adopting a lane's prescription verbatim close with a mutation probe. The `createRecorders`
construction departs from both lanes' prescriptions (it restores the design round's guard-narrow
shape), so it gets a focused cross-engine round: Opus audits R1's construction, having written none
of it.
