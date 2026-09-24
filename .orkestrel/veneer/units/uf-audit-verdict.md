# Audit round 1 — UTIL-FONT (`uf`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the UTIL-FONT unit's round 1 (`opus` on Opus 5.5 in `/home/user/veneer-uf` from `2a3f223`),
claims file `uf-audit-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`uf-audit-objective-verdict.md`, thread
`01a0d12b-702b-7bf1-b2b9-2b4de8562ca1`, journal `tmp/codex/uf-audit-analyst.jsonl`, an engine that did
not write the unit), the subjective lane, `reviewer` on Opus 5.5 (`uf-audit-subjective-verdict.md`),
and the checker on Sonnet (`uf-audit-checker-verdict.md`, claims 1, 6, and 8), the last two through
workflow `wf_2c14f81b-b5e`. The Orchestrator's apply check ran on a fresh `git archive 2a3f223`
extract in its scratchpad: `git apply --check uf-shared.patch` exit 0.

## Per-claim rulings

1. **CONFIRMED.** Every lane held the scope clauses; the checker left only the apply check unresolved,
   which the Orchestrator's run settles.
2. **CONFIRMED** by every lane that ruled it.
3. **CONFIRMED** by both lanes, the report's statement on the heading-override case included.
4. **CONFIRMED** by both lanes: the size classes follow the heading scale the `#### h1` rows set.
5. **CONFIRMED** by both lanes.
6. **CONFIRMED** by every lane that ruled it.
7. **BROKEN (both lanes).** (a) The guide says no published Veneer token carries the weights; the
   `--vn-weight-body` and `--vn-weight-heading` tokens are published and carry `400` and `600`. (b) The
   § Showcase sentence says the font utilities share the display classes' sizes; the display classes
   read the `--vn-display-N` tokens, which no font utility reads. (c) "a retuned body line" coins a term
   for the `--vn-line-body` token. Carrier: F-a.
8. **BROKEN.** The objective lane: the binding case in `tests/setupStyles.test.ts` iterates an inline
   matrix of key, property, and table tuples, a case matrix `.claude/rules/tests.md` places in a setup
   file. Every lane: the `font.test.ts` comment uses "above" as a cross-reference. Both lanes: added
   prose counts ("under two parent weights") and names by position ("its first four sizes").
   Carriers: F-b, F-c. The report's counts, ordinals, and temporal word are the round's record, not
   product; recorded here, and the round-2 report follows the writing rule. No carrier.

## Findings outside the claims, ruled

- **F1 (subjective lane): BROKEN.** The `fs` departure bullet says each size class resolves its heading
  class's size and never says those sizes differ from the release's. Carrier: F-a.
- **REPORT-COUNTS (objective lane).** Recorded under claim 8. No carrier.
- **The `9 - $level` mapping (subjective lane's referral).** The heading element, the `.hN` classes,
  and the `.fs-N` classes each write the mapping; one function would state it once, and the fix needs
  `src/styles/elements/**`, which UF may not touch. Carrier: the B-UTILITIES close-out unit, whose brief
  owns the heading partials and names this.
- **The `TYPE_SPECIMENS` wrap claim (subjective lane's referral).** The remark that the line-height
  columns wrap at every width is a rendered claim; the Orchestrator reads the `line-heights` frames at
  390 and 1280 at the landing's capture run and strikes or keeps the sentence there.
- **UTIL-TEXT's pointer (subjective lane's referral): ruled in.** UTIL-TEXT's `### Text utilities`
  section points a reader to `### Font utilities` for the release Text page's font entries; sent to
  UTIL-TEXT as mid-campaign note 4.

## Carrier

Round 2 on the same `opus` subagent carries F-a to F-c (`b-utilities-uf-brief-2.md`). Its audit runs
the objective lane on Astra and the checker; the subjective lane is not run for round 2, because F-a
and F-c adopt that lane's wording and the checker verifies the letters, while F-b closes on its
retained red run.

VERDICT: FAIL 7, 8; outside the claims: F1
