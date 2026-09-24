# Audit round 1 — UTIL-SPACING (`usp`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the UTIL-SPACING unit's round 1 (`opus` on Opus 5.5 in `/home/user/veneer-usp` from `2a3f223`),
claims file `usp-audit-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`usp-audit-objective-verdict.md`, thread
`01a0d153-c382-7f01-b4e7-37026fd3b738`, journal `tmp/codex/usp-audit-analyst.jsonl`, an engine that did
not write the unit), the subjective lane, `reviewer` on Opus 5.5 (`usp-audit-subjective-verdict.md`), and
the checker on Sonnet (`usp-audit-checker-verdict.md`, claims 1, 6, and 8), the last two through workflow
`wf_178e9a1a-b6d`. The Orchestrator's apply check: `git apply --check usp-shared.patch` on a fresh
`git archive 2a3f223` extract, exit 0.

## Per-claim rulings

1. **CONFIRMED** by every lane.
2. **CONFIRMED** by both lanes. The cascade census has no retained negative control (the subjective
   lane's referral). Carrier: S7.
3. **CONFIRMED** by both lanes.
4. **CONFIRMED** by both lanes, with the subjective lane's referral ruled in: the auto-margin section case
   cannot fail for the `.me-auto` and `.my-auto` members, because it reads only the right margin of a card
   already at the line's start, and top equal to bottom, which the stretch default also satisfies.
   Carrier: S1.
5. **CONFIRMED** by both lanes; the profiles attribution rests on UTIL-PAINT's round-1 patch, which its
   round-2 patch supersedes, so the landing reads the union of the wave's names against UTIL-PAINT's
   revised patch.
6. **BROKEN (both lanes).** `SpacingSection.test.ts` restates the auto-margin population as a literal
   list and the side order as a literal array, where note 1 keeps case populations in the setup file.
   The checker's CONFIRMED reading is discarded for those sites: the lanes' citations resolve. Carrier:
   S1.
7. **BROKEN (both lanes).** The Tailwind paragraph ends a clause on bare `!important` text and on a bare
   list of utility names; the density sentence says every margin and padding step moves, where the `0`
   and `auto` steps do not. Carrier: S2.
8. **BROKEN (objective lane).** The style proofs' comments leave the importance token without its noun,
   and the `SPACING_*` TSDoc leaves the `auto` field and the boolean values bare. The checker's
   CONFIRMED reading rests on the sites it read. Carrier: S3.

## Findings outside the claims, ruled

- **F1 (subjective lane): BROKEN.** `SPACING_PROPERTY_CASES` names the class's leading text `initial`,
  where the setup file names that concept `prefix` in `FLEX_ENTRY_CASES`, the sizing entries, and
  `POSITION_ENTRY_CASES`; one concept takes one term, and `initial` is also a CSS keyword. Carrier: S4.
- **F2 (subjective lane): BROKEN.** "the `none` and `auto` keys" reads as inventory keys beside "the
  `pe` key"; "The user-select key" leaves the key name unformatted. Carrier: S5.
- **F3 (subjective lane): BROKEN.** The Interaction copy says a click passes through the link that takes
  no pointer events and reaches the links that take them, which misdescribes one click. Carrier: S6.
- **F4 (subjective lane): the Orchestrator's defect, corrected.** The retained report named the patch at
  a path under the worktree; it names the retained patch.
- **REPORT-COUNTS (objective lane): recorded.** The report's owned-file line counts and "six boundary
  cases" tally are the round's record; the round-2 report states no tally. No product carrier.

## Carrier

Round 2 on the same `opus` subagent carries S1 to S7 (`b-utilities-usp-brief-2.md`). Its audit runs the
objective lane on Astra and the checker; the subjective lane is not run for round 2, because S2, S5, and
S6 adopt that lane's wording, S4 applies the setup file's own term, and S1, S3, and S7 close on retained
runs and the checker's letters.

VERDICT: FAIL 6, 7, 8; outside the claims: F1, F2, F3, F4
