# m2-audit — reconciled verdict (2026-09-01)

Round over the m2-sentinels change (contract commit 7e762ab). Lanes: subjective and objective,
clean-context Opus 5 subagents (Sol recorded dark), blind, one brief; `checker` on Sonnet for
the mechanical claim. Blind returns retained verbatim (`m2-audit-subjective.md`,
`m2-audit-objective.md`, `m2-audit-checker.md`). Terminal lines: subjective FAIL, objective
PASS, checker CONFIRMED on its slice (its terminal line used a nonstandard form; recorded, not
material).

## Reconciled rulings, by claim

1. CONFIRMED (both lanes; the subjective lane's caveat — the phrase "every writer" reaches the
   constructor and `#release`, which are field assigners, not element writers — is folded into
   the claim-7 fix).
2. CONFIRMED (both lanes). The one silent-failure mechanism is the module-evaluation-order limit
   `constants.ts` already states and declines to defend; inside the package's own strict-mode
   ESM every reachable write on a frozen sentinel throws. The prose fix carries the
   qualification.
3. CONFIRMED (both lanes; reachability attacked through individual-getter builds, failure
   settlement, hostile-accessor reentry, and mid-build release — none reaches either refusal).
4. SPLIT per the reconciliation rules — the claim carried two halves. The isolation mechanism:
   CONFIRMED by both lanes (release assigns references, publishes no released collection, and
   plans close over child artifacts, never over the index). The added case's discrimination:
   BROKEN — the Orchestrator reproduced it (a planted neutralization of the `#nodes` release
   assignment left the case green, run recorded 2026-09-01), and the objective lane's own
   bound says deleting the whole freeze block leaves it green. The lanes answered different
   questions: the objective read the case against the contamination its comment names; the
   subjective read the comment's promise against what the case binds to. Both were right about
   their halves. Fix carrier: m2fix (the case comment states what the case is — a preservation
   pin — and names the heap instrument as the change's discriminator; no observability
   machinery enters `src/`).
5. CONFIRMED (both lanes).
6. CONFIRMED (subjective and checker; `#emptyIndex` gone from the whole tree).
7. BROKEN (subjective, substantiated; the objective lane confirmed the mechanics and did not
   read the prose): the sentinel comment writes "every writer" imprecisely and promises a
   freeze without the module-ordering qualification the sibling `#weakMap` comment carries.
   Fix carrier: m2fix, adopting the lane's replacement text.
8. CONFIRMED, with the carried instruction: the guide replacement sentence must not promise a
   `#` static's frozenness to a reader who cannot check it — drop the word or carry the
   qualification. Carrier: the m4 unit's brief.

## Observations recorded, no unit dispatched

- `ShapeCloner` and `SchemaCloner` still carry per-instance `#empty*` peers — the idiom
  `ContractCompiler` has left, so sibling engines in one directory hold one member vocabulary
  for two mechanisms. Already recorded in the plan as a successor seam (transient churn); the
  vocabulary divergence is added to that record.

## Closure route

m2fix is comment-only and adopts the auditors' prescriptions; closure is mechanical
verification of the landed prose against the prescriptions plus the scoped gates, recorded in
the fix unit's report. The lanes and the checker ran; nothing was skipped.
