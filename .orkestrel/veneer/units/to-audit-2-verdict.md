# Audit round 2 — TOAST (`to`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the TOAST unit's round 2 (`opus` on Opus 5.5 in `/home/user/veneer-to` from `2a3f223`),
claims file `to-audit-2-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`to-audit-2-objective-verdict.md`, thread
`01a0d127-028c-7a70-9027-e272d8b8c5ea`, journal `tmp/codex/to-2-audit-analyst.jsonl`, an engine that
did not write the unit), and the checker on Sonnet (`to-audit-2-checker-verdict.md`, claims 1, 2, 4,
and 8, through workflow `wf_153d22e7-88b`). The subjective lane was not run for round 2, for the reason
the round-1 verdict records: T1 to T4 adopt that lane's wording and the checker verifies the letters.
The Orchestrator's apply check ran on a fresh `git archive 2a3f223` extract in its scratchpad:
`git apply --check to-shared-2.patch` exit 0.

## Per-claim rulings

1. **CONFIRMED.** The objective lane held every clause; the checker left only the apply check
   unresolved, which the Orchestrator's run settles.
2. **CONFIRMED** by both lanes.
3. **CONFIRMED** by the objective lane against `node_modules/bootstrap/js/src/toast.js`.
4. **CONFIRMED** by both lanes.
5. **CONFIRMED** by the objective lane: each derivation's retained red runs distinguish it.
6. **BROKEN (objective lane).** The binding reads each token's declared length and the style proof
   reads the resolved slot, so a row edited to another token that declares the same `1.5rem` (the
   `--vn-size-6` or `--vn-gap-4` token in place of `--vn-gutter-x`) passes both proofs; an executed Sass
   and PostCSS reading confirmed the identical declarations. The shipped binding is correct; the proof
   of token identity is incomplete. Carrier: T7.
7. **CONFIRMED** by the objective lane.
8. **CONFIRMED for the product; the report recorded.** Both lanes found no law defect in the owned files
   or the patch. The report's temporal words, bare tokens, positional references, the tally "Two further
   behaviors", and the setup-log attribution are the round's record, not product; recorded here, and
   the round-3 report follows the writing rule. No carrier.

## Findings outside the claims, ruled

- **REPORT-COUNTS (objective lane).** Recorded under claim 8. No carrier.

## Carrier

Round 3 on the same `opus` subagent carries T7 (`b-modal-to-brief-3.md`). Its audit runs the objective
lane on Astra and the checker; T7 closes on its retained red run.

VERDICT: FAIL 6; outside the claims: none
