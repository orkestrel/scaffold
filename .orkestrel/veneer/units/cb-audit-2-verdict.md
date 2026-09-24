# Audit round 2 — BARE-BUTTON (`cb`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the BARE-BUTTON unit's round 2 (`opus` on Opus 5.5 in `/home/user/veneer-cb` from `a9dff19`),
claims file `cb-audit-2-claims.md`. Lanes that ran, blind to each other: the objective lane, `analyst`
on GPT-6 Astra (`cb-audit-2-objective-verdict.md`, thread `01a0d1a4-b96b-7360-9df2-8982ee26bfa7`,
journal `tmp/codex/cb-audit-2-analyst.jsonl`), and the checker on Sonnet (`cb-audit-2-checker-verdict.md`,
claims 1, 4, and 6, workflow `wf_2c4b0b26-14b`). The subjective lane is not run for round 2, as
`cb-audit-verdict.md` records. The Orchestrator's apply check: `cb-shared-2.patch` on a fresh
`git archive a9dff19` extract, exit 0.

## Per-claim rulings

1. **CONFIRMED** by both lanes.
2. **CONFIRMED** (objective lane). The retained runs with `font-size: inherit` dropped and with the
   focus-visible branch unscoped each fail the list-group case on the comparison that distinguishes
   them.
3. **CONFIRMED** (objective lane). The `19px/29px` wrapper matches no size or line token, and the
   token-writing mutation reads 20 and 30 against 19 and 29.
4. **CONFIRMED** by both lanes.
5. **CONFIRMED** (objective lane).
6. **BROKEN** by both lanes, on the report alone: two code tokens without their nouns. The report is
   the round's record, not product. No carrier.

## Findings outside the claims

- **files-row-deviation-scope (checker): dropped.** The checker read the § Files row's "the bare
  button, a button with no `class` attribute…" as a departure from the brief's literal row. The same
  brief's C-b also directs "write 'bare button' in the § Files row", so the row carries both forms as
  the brief instructs; the objective lane rules the row consistent with the defined term. Dropped on
  the record.

## Acceptance

BARE-BUTTON is accepted with the report's defects on the record. It lands with `cb-shared-2.patch` and
its owned files, after the second batch.

VERDICT: FAIL 6; outside the claims: none
