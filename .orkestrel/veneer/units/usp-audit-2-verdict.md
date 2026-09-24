# Audit round 2 — UTIL-SPACING (`usp`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the UTIL-SPACING unit's round 2 (`opus` on Opus 5.5 in `/home/user/veneer-usp` from `2a3f223`),
claims file `usp-audit-2-claims.md`. Lanes that ran, blind to each other: the objective lane, `analyst`
on GPT-6 Astra (`usp-audit-2-objective-verdict.md`, thread `01a0d184-e982-7662-a768-3e72990c9939`,
journal `tmp/codex/usp-audit-2-analyst.jsonl`), and the checker on Sonnet
(`usp-audit-2-checker-verdict.md`, claims 1, 4, 5, 6, and 7, workflow `wf_0271a2cb-dfc`). The subjective
lane is not run for a fix round, as `usp-audit-verdict.md` records. The Orchestrator's apply check:
`usp-shared-2.patch` on a fresh `git archive 2a3f223` extract, exit 0 (inside
`usp-instruments/usp-2-orchestrator-pseudo-read.sh`).

## Per-claim rulings

1. **CONFIRMED** by both lanes.
2. **CONFIRMED** (objective lane). Each zero-margin mutation fails the auto-margin case through its
   assertions, and the restored case passes.
3. **BROKEN (objective lane), on the instrument alone.** The census script's selector grammar rejects a
   selector carrying a pseudo-class before it inspects declarations, so a planted `.m-6:hover` rule
   reads exit 0; the lane reproduced that in memory. The claim that the census reads the unit's keys is
   false for that form. The Orchestrator settled the product side: it built `2a3f223` with the round's
   owned files and shared patch and listed every emitted selector under the unit's keys
   (`usp-instruments/usp-2-orchestrator-pseudo-read.sh` and its log). The cascade carries 551 such
   selectors, the count the census reports, and none carries a colon. The blind spot hides nothing
   that ships, and the repository's conformance gates, not the census, govern the shipped cascade. No
   carrier.
4. **CONFIRMED** by both lanes.
5. **BROKEN (objective lane), on the report alone.** The report's S1 sentence places the noun before
   the `SIDES` constant and leaves the `SPACING_SIDE_CASES` table without its noun. The checker found no
   defect in the owned and shared lines it read. The report is the round's record, not product. No
   carrier.
6. **CONFIRMED** by both lanes.
7. **CONFIRMED** by both lanes.

## Findings outside the claims

None.

## Acceptance

UTIL-SPACING is accepted with the instrument's and the report's defects on the record. It lands with
`usp-shared-2.patch` and its owned files.

VERDICT: FAIL 3, 5; outside the claims: none
