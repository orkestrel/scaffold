# Audit verdict — brief (P.1 and P.2)

Workflow `wf_f822ca37-192` (the brief slice, resumed after the second session limit), 2026-09-08: the subjective lane (`reviewer`, Opus 5) `FAIL 12`, the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench) `FAIL 9 12`, the checker (Sonnet) `FAIL 12`; lanes retained as `d7n-brief-audit-{subjective,objective,checker-brief}.md`. Claim 11 rests on the writer's readings (the closure's `verifier` settles it); claim 12 fails on the reports' counts and two inaccuracies (annotated).

## Findings carried into the fix round (`d7n-brief-converge-fix-brief.md`)

| Item | Finding | Source |
| --- | --- | --- |
| BR1 | The lead-in sentence sits above the titled heading rather than between the heading and its fence | subjective F1 (Ruling 21) |
| BR2 | The drop-in's header lines 1 to 3 carry the struck clause | subjective F2 (Ruling 21) |
| BR3 | The package's file-scope case sits inside the pilot's block | subjective F3, objective F3 (Ruling 20) |
| BR4 | All-caps in fence comments at `guides/brief.md:1007`, `:1049`, `:1053` | subjective F4 |
| BR5 | One expression printed twice at `:1002-1003` | subjective F5 |
| BR6 | `BriefError`'s dropped clause reached the guide prose only | subjective F6 (Ruling 7) |
| BR7 | `SINGLE_LINE_PATTERN`'s description converged onto the vaguer side | subjective F7 (Ruling 14) |
| BR8 | The `### Constants` table carries no `Shape` column (ruled in, fleet-wide) | subjective F8, objective F1 (Rulings 18 and 20) |
| BR9 | The README carries no runtime line and its fences sit bare | subjective F9 |
| BR10 | The event maps' payloads left the guide | objective F2 |
| BR11 | The closing sweep's remaining items for brief (the closing generator's reading) | — |
| BR12 | The reports' counts and inaccuracies (annotated) | every lane's 12 |

## Carries

- The drop-in's summary half has no non-vacuousness pin (objective F4) → `d7-fleet-plan.md` § The drop-in's summary pin: a successor unit on the pilot after the closing sweep, then a propagation pass.
- The P.1 diff capture cannot show an untracked `scripts/docs.ts` (checker): the landing log's `git show --stat` line is the record; a future prep retains it.
- Instruments retained under `instruments/d7/units/brief/`; the closure's `verifier` takes the readings the unit's logs lack (objective F5).

The fix round dispatches to the Opus `implementer` and carries the closing sweep's items; the closure re-installs the final guide tarball and runs `checker` over the fix and `verifier` over the whole chain.
