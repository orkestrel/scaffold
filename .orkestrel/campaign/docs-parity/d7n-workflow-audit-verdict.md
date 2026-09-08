# Audit verdict — workflow (P.1 `84c043f`, P.2 `1151786`)

`wf_8f5b2bda-416`, 2026-09-08. Subjective lane `reviewer` (Opus 5); objective lane `reviewer` (Opus 5, the recorded substitution for the dark Sol bench); `checker` (Sonnet). Lanes retained as `d7n-workflow-audit-{subjective,objective,checker-workflow}.md`; brief `d7n-workflow-audit-brief.md`.

| Lane | Terminal | Failing claims |
| --- | --- | --- |
| subjective | VERDICT: FAIL 4 9 | the `### Shapes` sentence and cells (Ruling 25); Constants literal types (Ruling 21); `DUAL-store` caps; descriptions repeating their own `@remarks` |
| objective | VERDICT: FAIL 5 9 | descriptions repeating `@remarks` at six blocks; caps in the guide and in rewritten blocks' remarks; claim 11 CANNOT RULE (unwitnessed gate runs) |
| checker | VERDICT: FAIL 9, 11 | `FIRST` at `guides/workflow.md:1414`; claim 11 CANNOT RULE |

## Reconciled items, carried by `d7n-workflow-converge-fix-brief.md`

- WF1 — the `### Shapes` table: the package-invented sentence becomes the constants sentence and each cell holds the shape value's declared type in bare-member form (subjective 4, Ruling 25).
- WF2 — the `### Constants` cells `false`, `1024`, `2_147_483_647` become `boolean`, `number`, `number` (subjective 4, objective F2, Ruling 21).
- WF3 — all-caps emphasis: `guides/workflow.md` `DUAL-store` (`:195`, `:1091`) and `FIRST` (`:1414`); the remarks of every rewritten block (`src/core/factories.ts:344-354`, `src/core/constants.ts:78-89`, `src/core/types.ts:2113-2138`); and the sweep over every doc block under `src/**` the fleet's other fix rounds ran, ruled hit by hit (subjective 9 and F2, objective 9, F3, and F4, checker 9).
- WF4 — a description repeating its own `@remarks` is pruned from the remark (Ruling 7): `src/core/types.ts` at `:179/:182`, `:361/:364`, `:165/:168`, `:229/:234` (subjective 9); `src/core/factories.ts:340-344`, `:257-264`, `:291-303`, `src/core/stores/MemoryWorkflowStore.ts:7-15`, `src/core/errors.ts:10-15`, `src/core/WorkflowPersistence.ts:5-9` (objective 5).
- WF5 — the titled fence's lead-in moves below `### Author a definition and run it` (subjective F1, objective F1, Ruling 21).
- WF6 — the count in `WorkflowStoreInterface`'s description ("three async primitives") names the members and reaches the cell through `--to guide` (subjective F3).
- WF7 — the closing sweep's items (Rulings 13, 20, 21, 24, 25, 26, 28): the drop-in's header and region against the pilot, the `Shape` idiom where a table lacks it, `#` links, a lead-in before every fence directly under a heading, the README's fences.

Claim 11 (both lanes CANNOT RULE): the closure's `verifier` runs the gates against the committed tip and retains the log; no fix item. The objective lane's F3 (the report's recorded sweep scope) is closed by WF3 and an annotation on the converge report. Dropped, on the record: none.
