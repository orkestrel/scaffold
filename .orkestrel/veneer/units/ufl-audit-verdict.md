# Audit round 1 — UTIL-FLOW (`ufl`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the UTIL-FLOW unit's round 1 (`opus` on Opus 5.5 in `/home/user/veneer-ufl` from `2a3f223`),
claims file `ufl-audit-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`ufl-audit-objective-verdict.md`, thread
`01a0d11a-0fac-70f2-8436-5c15368fe33c`, journal `tmp/codex/ufl-audit-analyst.jsonl`, an engine that
did not write the unit), the subjective lane, `reviewer` on Opus 5.5 (`ufl-audit-subjective-verdict.md`),
and the checker on Sonnet (`ufl-audit-checker-verdict.md`, claims 1, 6, and 8), the last two through
workflow `wf_64c930ac-c23`. The Orchestrator's apply check ran on a fresh `git archive 2a3f223` extract
in its scratchpad: `git apply --check ufl-shared.patch` exit 0, then, over the applied patch and the
owned files, `git apply --check ufl-routeb.patch` exit 0.

## Per-claim rulings

1. **CONFIRMED.** Every lane held the scope clauses; the subjective lane and the checker left only the
   apply checks unresolved, and the Orchestrator's run settles both.
2. **CONFIRMED** by every lane that ruled it.
3. **CONFIRMED** for every named mutation. The subjective lane's referral stands as a gap beside the
   claim: `ufl-mutation-inset-omitted.log.txt` mutated the inline block Route B deletes, so the
   `cover-block` mixin has no failing-first run of its own. Carrier: U4.
4. **CONFIRMED.** D46 holds under `.claude/rules/styles.md`, which already carries the coincidence
   and pattern lines D46 applies. The subjective lane's referral that D46 has no home there is
   dropped: the rule's coincidence line is its home, and `findDuplication`'s floor encodes the
   measured bound on independent agreement (4 declarations), so no recorded measure block reaches
   the gate today. The mixin's comment opens "Places a box" where its siblings open "Emits"; carried
   with the prose fixes in U2.
5. **CONFIRMED** by every lane that ruled it.
6. **BROKEN** (objective lane). `tests/src/styles/components/stretched-link.test.ts` writes and
   iterates the selector population `['.stretched', '.bare']`, and
   `tests/app/browser/sections/LinkSection.test.ts` builds its corner population locally; the
   subjective lane's referral adds the hand-listed float classes in `FloatSection.test.ts`. Each is a
   case population outside a setup table or a derivation (note 1, `.claude/rules/tests.md`). Carrier:
   U1. The checker's PASS on claims 6 and 8 rests on the compliant sites it read; the objective lane's
   citations resolve (`stretched-link.test.ts` around its corner reading, `LinkSection.test.ts` around
   its card-corner points, `_overflow.scss` in its opening comment), so the checker's readings of those
   two claims are discarded and its claim-1 reading stands. The subjective lane's region-order referral is ruled in: the landed utility regions construct in
   the release's map order (Display, Flex; Position, Sizing, Visibility), and this unit's barrel order
   is float, object-fit, overflow, so the regions construct Float, Object fit, Overflow. Carrier: U5.
7. **CONFIRMED** by the objective and subjective lanes; the subjective lane's F1 is ruled outside the
   claims.
8. **BROKEN.** The objective lane: the `_overflow.scss` comment states "three entries". The subjective
   lane: the `OBJECT_FIT_*` TSDoc names a region by its position ("The last region") and counts the
   pictures ("both pictures", "the two pictures"). Carrier: U2. The report's counts, its temporal
   "new" labels, and its bare code tokens are the round's record, not product; they are recorded here
   and the round-2 report follows the writing rule. No carrier.

## Findings outside the claims, ruled

- **F1 (subjective lane): BROKEN.** `OBJECT_FIT_COPY.paragraph` credits the value change to the box:
  "then a tall picture whose box changes its value at the md boundary", where the classes sit on the
  image. Carrier: U3.
- **REPORT-COUNTS (objective lane).** Recorded under claim 8. No carrier.
- **Non-blocking observations (subjective lane).** The float "sides" vocabulary counting `none`, the
  guide lines that leave "The" alone after a reflow, the stretched-link proof sentence placement, and
  the `cleared-floats` capture row's selector lead are dropped with reason: each names a style choice
  no rule decides, and the registry remark explains the capture row.

## Carrier

Round 2 on the same `opus` subagent carries U1 to U5 (`b-utilities-ufl-brief-2.md`). Its audit runs
the objective lane on Astra and the checker; the subjective lane is not run for round 2, because U2,
U3, and U5 adopt that lane's wording or referral verbatim and the checker verifies the letters, while
U1 and U4 close on their retained red runs.

VERDICT: FAIL 6, 8; outside the claims: F1
