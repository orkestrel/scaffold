# Audit verdict — sea (P.1 and P.2)

Workflow `wf_a77b92c9-98c`, 2026-09-07, 13 minutes: the subjective lane (`reviewer`, Opus 5) `FAIL 9`, the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench) `FAIL 5 12`, the checker (Sonnet) `PASS`; lanes retained as `d7n-sea-audit-{subjective,objective,checker-sea}.md`. Claim 11 CANNOT RULE on the lanes' side beyond P23b's independent `docs` and `test:guides` readings; the closure's `verifier` settles it.

## Findings carried into the fix round (`d7n-sea-converge-fix-brief.md`)

| Item | Finding | Source |
| --- | --- | --- |
| S1 | All-caps emphasis in blocks the round did not rewrite: `src/server/types.ts:476` `LAST`, `:480` `HOST`, `:493` `SENSITIVE`, `:501` `ONE`; `src/server/helpers.ts:618` `EXACTLY ONE`, `:624` `NEVER`, `:752` `BOTH` | subjective 9 |
| S2 | `SEAInterface.execute` lost "throws on error" from its row with no landing; `@throws SEAError` on the block (Ruling 21) | objective 5 |
| S3 | Fences directly under headings with no lead-in sentence at `guides/sea.md:12`, `:233`, `:250`, `:272` (Ruling 21) | subjective F2 |
| S4 | The Methods preamble at `guides/sea.md:198` names `Injector` where the cell sits on `InjectorInterface` and collapses `status` and `count` into "the others" | subjective F4 |
| S5 | The H1 re-expands the tagline's expansion; `SEA` alone, the pilot's form | subjective F5 |
| S6 | `SEACompressionOptions` flattens its parent's members; `SEABrotliOptions plus { paths }` and the extended-interface sentence (Ruling 21) | objective, campaign |
| S7 | The drop-in header's lines 1 to 3 take the pilot's canon (Ruling 21); the `INTERNAL` block carries the pilot's sentence | subjective F1, the closing generator's reading |
| S8 | The reports state counts, cite a `terminal` precedent it does not carry, and quote a pipeline whose output is not empty (annotated) | objective 12 and outside the claims |

## Rulings and carries

- Ruling 21 settles the extended interface's cell, the header's clause, the fence lead-in, the constants cell's widened type, `@throws` as a landing, and the function-type alias's literal (`SEACompressionHandler`'s cell is permitted: subjective R2, ruled).
- The constants sentence alone (subjective F3): Ruling 20; server and router are the outliers the closing sweep and server's own round correct.
- The reader's underscore-pair reading (subjective R1): carried to the guide package in `d7-fleet-plan.md` § Findings carried to the guide package.
- `cells.mjs` keys a row by its first cell alone (objective, non-blocking): recorded here; the retained instrument stays as executed.
- Retention (objective): the unit's instruments were copied to `instruments/d7/units/sea/` before the lane's reading was recorded and are there.

The fix round dispatches to the Opus `implementer` and carries the closing sweep's items for sea, so no separate closing unit follows; the closure re-installs the final guide tarball and runs `checker` over the fix and `verifier` over the whole chain.
