# Audit verdict — database (P.1 and P.2)

Workflow `wf_60dfdb35-f31` (the database slice), 2026-09-07: the subjective lane (`reviewer`, Opus 5) `FAIL 5 9 12`, the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench) `FAIL 9 12`, the checker (Sonnet) `FAIL 9, 12`; lanes retained as `d7n-database-audit-{subjective,objective,checker-database}.md`. Claims 1 to 4, 6 to 8, 10, and 13 PASS on every lane; claim 11 PASS on the objective lane's corroboration and CANNOT RULE on the subjective lane (the writer's own gate readings), which the closure's `verifier` settles.

## Findings carried into the fix round (`d7n-database-converge-fix-brief.md`)

| Item | Finding | Source |
| --- | --- | --- |
| D1 | `METADATA_STORE` lost the `__metadata__` literal its pre-P.2 cell carried; the block never names it (Ruling 18) | subjective 5 |
| D2 | All-caps emphasis survives across `guides/database.md` (table cells through their owning blocks, § Contract and § Patterns prose), and the round added `REFINES`, `REQUIRED`, `NON-NULL` at `src/server/helpers.ts:187-188`; the report's claim that the sweep covered both Markdown files is false | subjective 9, objective 9, checker 9 |
| D3 | Counts in owned prose: `:850` "three persistent backends"; "the fixed two-table schema" at `:243` (cell and block) and `:796` | subjective 9, objective 9 and outside the claims |
| D4 | `SQLiteDriverOptions`, `QueryPlan`, `CompiledSQL` moved under `### Types` and lost the only signal of which face serves them | subjective F1 |
| D5 | The `## Methods` intro overclaims for `DriverIterator` | subjective F2 |
| D6 | `guarantee` as a behavior claim at `:1887` and `:2468` | subjective F3 |
| D7 | The reports state counts in prose (annotated; the tree is authoritative) | subjective 12, objective 12, checker 12 |

## Carried elsewhere

- **router's Constants convention sentence** carries Ruling 15's interface sentence beside the constants sentence while every other package carries the constants sentence alone (subjective F4) → the closing sweep's Ruling 15 alignment (`d7-fleet-plan.md` § The closing sweep).
- **Inherited members render as duplicated cells** across `#### StorageInterface` and `#### DriverInterface` because `Source.methods` resolves an inherited member to the parent's block (subjective F5) → recorded for the guide package's backlog in `d7-fleet-plan.md` § Findings carried to the guide; not a defect of this unit.
- The README's onboarding paragraph was replaced rather than kept (checker outside the claims, objective 7's recorded departure): the subjective lane read the result as the pilot's shape; ruled accepted.
- The checker could not re-derive the writer's 190-row non-`Summary` cell comparison; the objective lane's positional reading and P23b's census (every control A to H reddens the gate) corroborate it.

The fix round dispatches to the Opus `implementer`; the closure runs `checker` over the fix and `verifier` over the whole chain.
