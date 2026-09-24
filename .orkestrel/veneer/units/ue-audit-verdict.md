# Audit round 1 — UTIL-EFFECT (`ue`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the UTIL-EFFECT unit's round 1 (`opus` on Opus 5.5 in `/home/user/veneer-ue` from `2a3f223`),
claims file `ue-audit-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`ue-audit-objective-verdict.md`, thread
`01a0d133-aff3-71a2-8c66-f9aeabe3b71f`, journal `tmp/codex/ue-audit-analyst.jsonl`, an engine that did
not write the unit), the subjective lane, `reviewer` on Opus 5.5 (`ue-audit-subjective-verdict.md`),
and the checker on Sonnet (`ue-audit-checker-verdict.md`, claims 1, 6, and 8), the last two through
workflow `wf_2c14f81b-b5e`. The Orchestrator's apply check ran on a fresh `git archive 2a3f223`
extract in its scratchpad: `git apply --check ue-shared.patch` exit 0.

## Per-claim rulings

1. **CONFIRMED.** Every lane held the scope clauses; the subjective lane and the checker left only the
   apply check unresolved, which the Orchestrator's run settles.
2. **CONFIRMED** by both lanes, the helper's normal priority under family ruling 5 included.
3. **BROKEN (objective lane).** The matrix names a `.shadow-sm` alias swap no log records; the retained
   run swaps the large alias. The subjective lane's referral adds that `ue-cascade-keys.mjs` has never
   read red. Carrier: E-a.
4. **CONFIRMED** by both lanes: the `Default focus ring` rename resolves a real refusal in `readSubject`,
   and the role classes in the components layer move no resolution. The unit settled the rename inside
   its deviation contract's ancillary choices, and the Orchestrator accepts it.
5. **CONFIRMED** by both lanes.
6. **BROKEN (both lanes).** The `default-focus-ring` resting row reads `box-shadow` on an unfocused link,
   which no rule sets at rest, so the row reads the initial value against itself and stays green with
   the partial deleted, against the table's own contract. The subjective lane's fix is adopted: the row
   is dropped, the `Default focus ring` subject keeps its driven row, and the remarks record why. The
   objective lane's alternative, reading the ring colour at rest, is dropped: the `.focus-ring` class sets
   no property at rest, and the role classes carry that colour. Carrier: E-b.
7. **BROKEN (both lanes).** The shadow sentence and the `shadow` compatibility row say every shadow
   class reads an alias, and `.shadow-none` reads none; the opacity section credits `!important` for a
   step beating the `.placeholder` class's opacity, where the utilities layer following the components
   layer does it; the shadow section omits that a factor or step retune moves a shadow class only on the
   root element, because the aliases substitute there; and the focus-ring clause credits source order
   where the utility's `!important` flag decides. Carrier: E-c.
8. **CONFIRMED for the product; the report recorded.** Both lanes found no law defect in the owned files
   or the patch. The report's tally, positional naming, placeholder commands, and the timeout
   attribution are the round's record, not product; recorded here, and the round-2 report follows the
   writing rule and records each command as it ran. No carrier.

## Findings outside the claims, ruled

- **F1 (subjective lane): BROKEN.** The `focus-ring.test.ts` comment says the shadow utility clears the
  ring because it sits in a later layer and follows the helper; an important declaration beats a
  normal one whatever layer each sits in. Carrier: E-c.
- **The region name (subjective lane's R4): dropped with reason.** The family record's table names the
  region `Shadow`, as it names `Border`, and the UTIL-PAINT audit held that form.
- **REPORT-COUNTS (objective lane).** Recorded under claim 8. No carrier.

## Carrier

Round 2 on the same `opus` subagent carries E-a to E-c (`b-utilities-ue-brief-2.md`). Its audit runs
the objective lane on Astra and the checker; the subjective lane is not run for round 2, because E-b and
E-c adopt that lane's wording, the checker verifies the letters, and E-a closes on its retained runs.

VERDICT: FAIL 3, 6, 7; outside the claims: F1
