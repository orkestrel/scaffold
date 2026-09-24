# Audit round 2 — UTIL-EFFECT (`ue`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the UTIL-EFFECT unit's round 2 (`opus` on Opus 5.5 in `/home/user/veneer-ue` from `2a3f223`),
claims file `ue-audit-2-claims.md`. Lanes that ran, blind to each other on that one file: the objective
lane, `analyst` on GPT-6 Astra (`ue-audit-2-objective-verdict.md`, thread
`01a0d14e-1cc9-7df3-9270-d17e90389142`, journal `tmp/codex/ue-audit-2-analyst.jsonl`, an engine that did
not write the unit), and the checker on Sonnet (`ue-audit-2-checker-verdict.md`, claims 1, 3, and 7,
workflow `wf_d82c1ef3-375`). The subjective lane is not run for round 2, as `ue-audit-verdict.md`
records. The Orchestrator's apply check: `git apply --check ue-shared-2.patch` on a fresh
`git archive 2a3f223` extract, exit 0.

## Per-claim rulings

1. **CONFIRMED.** The checker's UNRESOLVED apply sub-clause is settled by the objective lane's run and
   the Orchestrator's.
2. **CONFIRMED** (objective lane), the small-shadow swap and each reader control distinguished.
3. **CONFIRMED.** The objective lane read the retained exemption-removed and row-restored runs in
   `ue-mutations-2.log.txt` and ruled the case distinguishes each; the checker's UNRESOLVED sub-clause
   asked for that reading.
4. **CONFIRMED** (objective lane).
5. **CONFIRMED** (objective lane).
6. **CONFIRMED** (objective lane).
7. **BROKEN (objective lane), on the report alone.** The syntax and writing law hold on the owned files
   and the patch (both lanes). The report's gate table gives `—` as the build result where the
   retained build log carries its result line. The checker's CONFIRMED reading of the gate table is
   discarded for that row: the cited log line resolves (`ue-instruments/ue-2-gate-build.log.txt`).

## Findings outside the claims, ruled

- **REPORT-COUNTS (objective lane): recorded.** "One reading" in the report tallies a growable set.
- **PROBE-NESTED-FUNCTION (objective lane): recorded.** The retained probe
  `ue-instruments/ue-probe-2.test.ts` assigns an arrow function inside an `it` callback. The probe is a
  measurement instrument in the worktree's `tmp/` that ships nowhere; its readings stand, and the next
  instrument this unit writes follows the rule.

## Acceptance

UTIL-EFFECT is accepted. Every claim about what ships is confirmed on evidence, and the failing claim
and both outside findings concern the report and a retained instrument, which are the round's record,
not product; a further round would change no shipped byte. The report defects stay on the record here.

VERDICT: FAIL 7; outside the claims: REPORT-COUNTS, PROBE-NESTED-FUNCTION
