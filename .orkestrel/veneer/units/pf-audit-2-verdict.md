# Audit round 2 — PAGE-FRAME (`pf`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: PAGE-FRAME's round 2 (`opus` on Opus 5.5 in `/home/user/veneer-pf`, brief `b-cross-pf-brief-2.md`),
claims file `pf-audit-2-claims.md`. Lanes that ran, blind to each other: the objective lane, `analyst` on
GPT-6 Astra (`pf-audit-2-objective-verdict.md`, thread `01a0d327-da0c-7873-944f-b0b78deac54f`, journal
`tmp/codex/pf-audit-2-analyst.jsonl`), and the checker on Sonnet (`pf-audit-2-checker-verdict.md`, claims 1,
5, 7, and 8, workflow `wf_098386b0-0f6`). The subjective lane was not run: round 2 adopts that lane's round-1
findings with its fixes, as `pf-audit-verdict.md` § Carrier records. The Orchestrator's apply check:
`pf-shared-2.patch` on a fresh `dc92a09` extract, exit 0.

## Per-claim rulings

1. **CONFIRMED** by both lanes: the status matches round 1's owned set, the patch touches the guide alone, and
   every changed hunk serves P-a to P-d.
2. **CONFIRMED (objective lane).** The `#settle` method stages the pane again on every path and refuses naming
   both readings; the viewport-branch mutation and the dropped refusal each redden on a rejection assertion,
   and the observer seam drives the installed `stagePane` function's real marker.
3. **CONFIRMED (objective lane).** The structural guard precedes every pointer-held placement; the un-lift
   mutation fails on it and passes without it, so the guard is what distinguishes an in-place host. This
   settles round 1's claim 5.
4. **CONFIRMED (objective lane).** Each rewritten re-read comment reads true against the restoration order.
5. **CONFIRMED** by both lanes.
6. **BROKEN on the claim's wording; the code holds.** The objective lane found that the class records an
   admitted placement before the portfolio's own `place` call, so a portfolio refusal (an unregistered
   scenario) leaves that scenario recorded. The claim's clause "a refused placement records nothing" was the
   Orchestrator's overstatement: the `placements` getter's TSDoc says every scenario admitted for placement,
   written or not, which is what the code does, and the settle and area refusals record nothing, as the
   refusal cases assert. A portfolio refusal throws and fails its case, so no reader depends on the retained
   entry. No carrier.
7. **CONFIRMED** by both lanes against the PNG headers and the frame record.
8. **BROKEN on the report** (bare code tokens) under the objective lane; the code-law clauses hold under both
   lanes. Accepted on the record, per the user's instruction to weight audits toward implementation.

## Findings outside the claims

None.

## Acceptance

PAGE-FRAME is accepted. It lands on the session branch with `pf-shared-2.patch` (base `dc92a09`), and the
batch-2 verification chain runs after it.

VERDICT: FAIL 6, 8; outside the claims: none
