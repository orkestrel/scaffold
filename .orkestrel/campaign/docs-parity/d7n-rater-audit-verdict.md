# Audit verdict — rater (P.1 and P.2)

Workflow `wf_a2638d88-242` (the rater slice), 2026-09-07: the subjective lane (`reviewer`, Opus 5) `FAIL 12`, the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench) `FAIL 12`, the checker (Sonnet) `FAIL 11`; lanes retained as `d7n-rater-audit-{subjective,objective,checker-rater}.md`. Every structural claim PASS on every lane; claim 11 rests on the writer's readings (the closure's `verifier` settles it); claim 12 fails on the reports' counts and a stale citation (annotated).

## Findings carried into the fix round (`d7n-rater-converge-fix-brief.md`)

| Item | Finding | Source |
| --- | --- | --- |
| RT1 | The `### Validators` guard table has no `Shape` column and points the reader to source (Ruling 20) | subjective F2, objective F1 |
| RT2 | One paragraph at `guides/rater.md:88-92` joins a table note to two domain rules and trails off | subjective F1 |
| RT3 | Fences without a lead-in at `:104`, `:142`, `:265`, `:299` | subjective F3, objective F2 |
| RT4 | `rate`'s description demoted `RatingDefinition` to prose | subjective F4 |
| RT5 | The README lost its link to `@orkestrel/reason` | subjective F5 |
| RT6 | `both` in a test name at `tests/guides.test.ts:379` | subjective F6, objective F5 |
| RT7 | The closing sweep's items for rater: the header's third line | the closing generator's reading, objective F3 |
| RT8 | The reports' counts and the stale `below` citation (annotated) | every lane's 12 |

## Rulings and carries

- Ruling 23: Ruling 15's sentence covers an object-literal alias (subjective F7); no amendment.
- The `Rater` class's own member blocks carry no description paragraph while the interface's do (objective F6): the implementing-class member block question stands with the owner (`d7-fleet-plan.md` § For the owner); no unit adds them here.
- The report's diffstat reads one insertion past the committed tree in `src/core/validators.ts` (objective F4); the closure's `verifier` runs every gate on the committed tree, which settles the readings' standing.

The fix round dispatches to the Opus `implementer` and carries the closing sweep's items; the closure re-installs the final guide tarball and runs `checker` over the fix and `verifier` over the whole chain.
