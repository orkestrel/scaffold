# m1-audit — reconciled verdict (2026-09-01)

Round over the m1-dead-memo change (contract commit b3852d9). Lanes: subjective and objective,
each a clean-context subagent on Opus 5 (Sol recorded dark; the remaining engine ran every
lane), blind, on one brief; `checker` on Sonnet beside them for the mechanical claims. Blind
returns are immutable and retained verbatim (`m1-audit-subjective.md`, `m1-audit-objective.md`,
`m1-audit-checker.md`). Terminal lines: subjective FAIL, objective FAIL, checker PASS on its
mechanical slice.

## Reconciled rulings, by claim

1. CONFIRMED (both lanes; construction sites enumerated from source, dist corroborated).
2. CONFIRMED (both lanes; the objective lane proved the widened operand runtime-dead across
   reentrancy, partial-assignment, and throw interleavings, and recorded that the claim's
   wording under-covered the `retain` write, which the same branch protects).
3. CONFIRMED, bounded: the added cross-call case is weaker than the existing sibling at
   `tests/src/core/ContractCompiler.test.ts:389-400`, which carries the load; no cross-call case
   covers the reporter family — pre-existing bound, recorded for the successor matrix.
4. CONFIRMED, bounded to the guard family; the existing shared-read case covers the diagnostic
   families.
5. CONFIRMED — settled by the Orchestrator after the round: `git show b3852d9` carries no
   deletion line in the test file beyond the file header and its diffstat matches the recomputed
   hunk sums; `git status --porcelain` clean. The lane's UNRESOLVED was correct at its
   allowlist.
6. BROKEN (subjective, substantiated; objective's tense correction folds in): the added comment
   restates the declaration, narrates deleted code, sits in one method while describing both,
   and omits the receiver-proof fact that keeps the widened operand from reading as deletable
   dead code. Carrier: FIX-A in `m1fix-brief.md`.
7. Split per the reconciliation rules — the claim number carried two claims. The behavior half:
   CONFIRMED by both lanes. The observability-exception clause: BROKEN as worded (the round's
   own instrument observes the allocation through a pre-module-evaluation intrinsic capture, not
   heap measurement). The defect is the Orchestrator's brief wording; no code change. Recorded
   here as the correction.
8. CONFIRMED (both lanes; structural symmetry read line by line).

## Findings outside the claims, each with its carrier

- Objective F1 (substantiated; premise reproduced by the Orchestrator against
  `tests/src/core/integration.test.ts:1009-1037`): the settled instrument was not promoted into
  a regression guard, and the brief's premise excusing that was false. Carrier: FIX-B in
  `m1fix-brief.md`, with the assertion shape corrected by the Orchestrator's
  `promotion-shape.mjs` measurement — build-read construction DELTA between shapes differing in
  tracked nodes, not an absolute count, because `#prepare` constructs `ShapeValidator` working
  maps either way. That correction is a recorded departure from the auditor's verbatim
  prescription, forced by the measurement.
- Subjective F1 (substantiated; reproduced against `tests/setup.ts:2724` and the import at
  `tests/src/core/ContractCompiler.test.ts:31`): the added within-call case re-implements the
  exported counting instrument inline. Carrier: FIX-C in `m1fix-brief.md`.

## Referrals recorded, no unit dispatched

- Scope sharing when a compiled door runs synchronously inside another door's walk (the guide
  documents reuse "within ONE call"); pre-existing, owned by the call-scoped ledger capability.
- The `any`-shaped return of `INTRINSICS.recall` at its declaration; pre-existing, owned by the
  constants surface.
- No cross-call case covers the reporter family; owned by the test-coverage row of the next
  matrix.

## Closure route

The fix round adopts the auditors' prescriptions with one recorded, measured departure (the
FIX-B assertion shape). Closure is by mutation probe per `.claude/rules/quality.md` § Rounds and
verdicts: the planted build-time initializer must redden the promoted case and its removal must
green it, recorded in the fix unit's report. The lanes and the checker ran; nothing was skipped.
