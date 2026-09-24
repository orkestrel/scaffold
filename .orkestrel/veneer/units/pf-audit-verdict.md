# Audit round 1 — PAGE-FRAME (`pf`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the PAGE-FRAME unit (`opus` on Opus 5.5 in `/home/user/veneer-pf` from `dc92a09`), claims file
`pf-audit-claims.md`. Lanes that ran, blind to each other: the objective lane, `analyst` on GPT-6 Astra
(`pf-audit-objective-verdict.md`, thread `01a0d30b-a32f-7b40-a4d8-477fee3b3d48`, journal
`tmp/codex/pf-audit-analyst.jsonl`); the subjective lane, `reviewer` on Opus 5.5
(`pf-audit-subjective-verdict.md`); and the checker on Sonnet (`pf-audit-checker-verdict.md`, claims 1, 7,
and 8). The reviewer and the checker ran in workflow `wf_b8ee4c00-b9d`. The Orchestrator's apply check:
`pf-shared.patch` on a fresh `dc92a09` extract, exit 0.

## Per-claim rulings

1. **CONFIRMED** by every lane.
2. **CONFIRMED** by both adversarial lanes; every named mutation reddens on an assertion, not a collection
   failure.
3. **BROKEN (objective lane).** The `#settle` method returns without the agreeing re-read when the bounded
   content fits the viewport, so the re-read the claim and the class remarks state runs only on the taller
   branch. The subjective lane's F3 adds that "never settled" names one disagreeing re-read. The taller
   branch's proofs distinguish their mutations. Carrier: P-a.
4. **CONFIRMED** by both adversarial lanes.
5. **UNRESOLVED (subjective lane), carried to a run.** The placements hold, but the reading after each
   pointer shot runs after the class lays every section out again, so by derivation an un-lifted
   `primary-hover` host would pass while its frame shows the rest fill; the unit ran no un-lift mutation.
   Carrier: P-b settles it with a structural guard and the mutation's red run.
6. **CONFIRMED** by both adversarial lanes against the frames and their headers.
7. **BROKEN (subjective lane; the objective lane on the settling prose).** "Opening" carries two meanings
   (with and without the Showcase region); the `check-group-focus` comment still says the frame "covers the
   page"; a rewritten comment states the pre-bounding blank-frame measurement as present; the
   `{@link FRAME_AREA}` references carry no noun; the class remarks promise a re-read the code skips. The
   checker's UNRESOLVED sub-clause on the "first pixel" rewrite is settled by the subjective lane, which read
   it against the portfolio case. Carrier: P-c.
8. **BROKEN** on the report (temporal "now", bare tokens) by every lane; accepted on the record. The code-law
   clauses and the `recordPlacements` recorder hold under both adversarial lanes.

## Findings outside the claims

- **F1 (subjective lane).** The `#scenarios` list always equals the scenarios of the `#placements` list: a
  second stored state. Carrier: P-d.
- **F2 (subjective lane).** The comments claiming the re-read runs "in the layout the shot was taken in" are
  false after the class restores the sections. Carrier: P-b.
- **F3 and F4 (subjective lane).** Carried by P-a and P-c.

## Carrier

Round 2 on the same `opus` subagent (`b-cross-pf-brief-2.md`) carries P-a to P-d. Its audit runs the
objective lane on Astra and the checker; the subjective lane is not run for round 2, because P-b to P-d
adopt that lane's findings with its fixes and P-b settles claim 5 by a retained red run.

VERDICT: FAIL 3, 7, 8; UNRESOLVED 5; outside the claims: F1, F2, F3, F4
