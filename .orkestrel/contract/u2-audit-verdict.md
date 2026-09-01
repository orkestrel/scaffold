# U2 audit — round 1 verdict and reconciliation (2026-09-01)

Subject: U2 `readValue` lazy construction and the bounded `preview` fast path (tree over e81ba64; brief `u2-readvalue-preview-brief.md`, report `u2-readvalue-preview-report.md`, audit brief `u2-audit-brief.md`). Lanes: subjective (`reviewer`, Opus 5) and objective (Opus 5 through the `reviewer` role file, substituting the excluded Sol `analyst`), blind, read-only, immutable returns in `u2-audit-subjective.md` and `u2-audit-objective.md`. `verifier` ran in parallel: GREEN (`u2-verifier-report.md`). `checker` runs after the fix round.

## Lane terminal lines

- Subjective: `VERDICT: FAIL — 1 broken, 0 unresolved, 0 not-evidenced, 0 findings outside the claims`
- Objective: `VERDICT: FAIL — 0 broken, 0 unresolved, 0 not-evidenced, 1 finding outside the claims`

## Reconciliation (reproduced before ruling)

| Item | Ruling | Carrier |
| --- | --- | --- |
| `preview` TSDoc first paragraph still names the indexed encoder as the only string path (subjective claim 11a; objective F1) | Confirmed by reading `helpers.ts:1794-1798`; the guide sentence was corrected and the TSDoc was not. | U2f: apply the guide's qualifier to that sentence (prescription verbatim). |
| Bare `stringify` as a term in the added paragraph (subjective claim 11b) | Confirmed: three occurrences; the rest of `src/core` writes `JSON.stringify`. | U2f: `JSON.stringify` followed by a noun in all three places. |
| Timing-ratio cost pin (brief sub-question) | Both lanes rule it admissible under `.claude/rules/tests.md` (relationship pin, `performance.now()`, guarded-bench form unreachable in the mirrored suite); the objective lane notes a red reading belongs to the Orchestrator's idle re-run. | U2f: one comment sentence beside the threshold recording the measured margin (about 2600× against 20×). |
| Claim 4 wording ("allocates no context object") contradicts claim 1 under a literal reading (both lanes) | Brief defect: the eager `owned` copy is required; the promise is "publishes no context object and constructs no error". | Successor audit brief wording. |
| `readValue` deferral has no regression guard (objective observation) | Accepted as a property of a behaviour-neutral optimization; the win is guarded by the campaign's paired A/B, not by the suite. Recorded. | This file. |
| Referral: `options.subject` read twice, second read consumed outside containment (subjective) | Reproduced on 0.0.15 and on the U2 tree (`subject-alternating.out`): an accessor answering `'thing'` then a hostile object makes `readValue` throw a raw `Error` (`hostile toString`) from the message template, while the guide row (line 215) promises a `ContractError` for every failed read. Pre-existing, reachable through the typed `ReadValueOptions`, inside the function U2 owns: repaired now per `.claude/rules/quality.md` (reachability bounds the fix). | U2f: read `options?.subject` once inside the eager `attempt`, with a red-first pin. |
| Report counts (objective observation) | Retained artifact, not the package surface; no action. | none |

## Ruling

Round 1 FAILS on documentation drift alone; every code claim held. U2f carries the two prose prescriptions verbatim, the margin sentence, and the containment repair with its red-first proof. The fix round closes on the Orchestrator's re-run evidence (records, parity, scoped suite with the new pin red on the pre-fix tree and green after) and a `checker` pass, per `.claude/rules/quality.md` § Rounds and verdicts.

## Fix round closure (U2f, 2026-09-01)

U2f (`u2f-brief.md`, `u2f-report.md`, `builder` on Sonnet) landed the two TSDoc prescriptions verbatim, the margin note, and the `subject` read-once repair with its pin. Orchestrator evidence (`u2f-acceptance.out`): the read-once mutation reddens exactly the new pin (1 failed of 229) and restores exactly to 229 green; the hostile record differs from 0.0.15 on the alternating-subject vector alone (raw `Error` → `ContractError` `door: thing could not be read`); preview record identical; parity IDENTICAL in both forms; no bare `stringify` token and no superseded sentence remain. `checker` PASS on every item (`u2f-checker-report.md`); `verifier` GREEN (`u2f-verifier-report.md`: `src:core` 1316, policy 111, config 46, setup 61, guides 65). Round closed per `.claude/rules/quality.md` § Rounds and verdicts (verbatim adoption plus the repair's red-first proof).
