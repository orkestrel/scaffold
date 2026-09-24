# Audit round 2 — UTIL-FLOW (`ufl`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the UTIL-FLOW unit's round 2 (`opus` on Opus 5.5 in `/home/user/veneer-ufl` from `2a3f223`),
claims file `ufl-audit-2-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`ufl-audit-2-objective-verdict.md`, thread
`01a0d13b-5209-7862-ba29-276e9a589b3c`, journal `tmp/codex/ufl-audit-2-analyst.jsonl`, an engine that
did not write the unit), and the checker on Sonnet (`ufl-audit-2-checker-verdict.md`, claims 1, 3, 5,
and 7, through workflow `wf_ebf8e880-fab`). The subjective lane was not run for round 2, for the reason
the round-1 verdict records. The Orchestrator's apply checks ran on a fresh `git archive 2a3f223`
extract in its scratchpad: `ufl-shared-2.patch` exit 0, and `ufl-routeb-2.patch` over it and the owned
files exit 0.

## Per-claim rulings

1. **CONFIRMED.** The objective lane held every clause; the checker left only the apply checks
   unresolved, which the Orchestrator's runs settle.
2. **CONFIRMED** by the objective lane: the tables are recursively frozen, the binding compares the
   corner vocabulary with the inventory, and each red run's assertions distinguish its mutation.
3. **BROKEN (objective lane).** The prescribed replacements are present, and the added TSDoc leaves code
   tokens without nouns: "such as a live `DOMRect` a proof reads", "in the order {@link HIT_CORNERS}
   names the corners", and "each corner of {@link HIT_CORNERS} reaches", in the `computeCornerPoints` and
   `STRETCHED_LINK_HOSTS` doc blocks. The checker's CONFIRMED reading rests on the prescribed sites
   alone, and its own record says it did not sweep every added line; the objective lane's citations
   resolve (`ufl-shared-2.patch` in those doc blocks), so the checker's reading of this claim is
   discarded. Carrier: U6.
4. **CONFIRMED** by the objective lane: the `cover-block` mixin's own red run is retained and
   distinguished.
5. **CONFIRMED** by both lanes.
6. **CONFIRMED** by the objective lane: the round-2 cascades compile byte-identical to round 1's, and
   Route A and Route B compile identically.
7. **CONFIRMED for the product; the report recorded.** Both lanes found no law defect in the owned files
   or the patches. The report's bare file and class tokens and its repeated totals are the round's
   record, not product; recorded here. No carrier.

## Findings outside the claims, ruled

- **REPORT-COUNTS (objective lane).** Recorded under claim 7. No carrier.

## Carrier

Round 3 on the same `opus` subagent carries U6 (`b-utilities-ufl-brief-3.md`), a token-noun fix in
three TSDoc sentences with no behaviour change. Its audit runs the checker, which verifies the letters of
a prose-only fix; the objective and subjective lanes are not run for round 3, because the round changes
no code, no test, and no guide sentence, and the round-2 objective lane named each replacement.

VERDICT: FAIL 3; outside the claims: none
