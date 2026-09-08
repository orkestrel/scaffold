# Audit verdict — interpret (P.1 and P.2)

Workflow `wf_ca997b77-72d` (the interpret slice, its checker resumed after the second session limit), 2026-09-08: the subjective lane (`reviewer`, Opus 5) `FAIL 9, 12`, the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench) `FAIL 9 12`, the checker (Sonnet) `FAIL 9 12`; lanes retained as `d7n-interpret-audit-{subjective,objective,checker-interpret}.md`. Claim 9 fails on all-caps and a count in owned prose and on all-caps in `@remarks` of rewritten blocks; claim 11 rests on the writer's readings; claim 12 fails on the reports' counts (annotated).

## Findings carried into the fix round (`d7n-interpret-converge-fix-brief.md`)

| Item | Finding | Source |
| --- | --- | --- |
| IN1 | `guides/interpret.md:910` `WITHOUT` and an unnamed `both`; `:219` "Two postures" | every lane's 9 |
| IN2 | All-caps in `@remarks` of rewritten blocks (`Interpret.ts`, `Narrator.ts`, `SubjectManager.ts`, `types.ts`, `InterpretContext.ts`, `helpers.ts`, `Clarifier.ts`) | subjective 9, objective 9 |
| IN3 | The § Surface lead-in dangles above the titled heading; the fence has none | subjective F1, objective F2 (Ruling 21) |
| IN4 | The drop-in's header lines 1 to 3 and the closing sweep's remaining items | subjective F2 (Ruling 21) |
| IN5 | Four `destroy` cells carry one sentence | subjective F3 |
| IN6 | `Interpret`'s block states the pipeline twice | subjective F4 (Ruling 7) |
| IN7 | Slash pairs in the options rows | subjective F5 |
| IN8 | The titled block's specifier differs from its neighbours' | subjective F6 |
| IN9 | The Validators intro's claim contradicts the exact-posture rows | objective F1 |
| IN10 | The reports' counts (annotated) | every lane's 12 |

The fix round dispatches to the Opus `implementer` and carries the closing sweep's items; the closure re-installs the final guide tarball and runs `checker` over the fix and `verifier` over the whole chain.
