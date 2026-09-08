# Audit verdict — relation (P.1 and P.2)

Workflow `wf_a2638d88-242` (the relation slice, resumed after the second session limit), 2026-09-08: the subjective lane (`reviewer`, Opus 5) `FAIL 7 12`, the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench) `FAIL 9, 12`, the checker (Sonnet) `FAIL 12`; lanes retained as `d7n-relation-audit-{subjective,objective,checker-relation}.md`. Claim 11 rests on the writer's readings (the closure's `verifier` settles it); claim 12 fails on the reports' counts and two inaccuracies (annotated). The objective lane's claim 9 fails on the audit template's own exception list rather than on the tree: the voice sweep's lossless corrections to non-`Summary` cells are mandated, and the template now names them (`gen-audit.sh`).

## Findings carried into the fix round (`d7n-relation-converge-fix-brief.md`)

| Item | Finding | Source |
| --- | --- | --- |
| RL1 | The tagline shifts mood mid-blockquote and uses `load` and `find` as verbs | subjective 7 |
| RL2 | `FindOptions`'s cell flattens the inherited `signal?` (Ruling 21) | subjective F1, objective F1 |
| RL3 | `FK` and `foreign key` name one concept | subjective F2 |
| RL4 | All-caps and the retired `THIS`/`RELATED` vocabulary in unrewritten blocks and comments | subjective F3, objective F4, checker |
| RL5 | The drop-in's header lines 1 to 3 (Ruling 21) | subjective F4, objective F2 |
| RL6 | The titled fence at `guides/relation.md:151` has no lead-in (Ruling 21) | subjective F5, objective F3 |
| RL7 | A `Returns` cell's "(or array)" chrome | subjective F6 |
| RL8 | The reports' counts and inaccuracies (annotated); the audit template's claim 9 corrected | every lane's 12, objective 9 |

The fix round dispatches to the Opus `implementer` and carries the closing sweep's items; the closure re-installs the final guide tarball and runs `checker` over the fix and `verifier` over the whole chain.
