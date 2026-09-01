# Fix report: relation

## Dispositions

- **s17-09** applied (src/core/validators.ts, src/core/helpers.ts, src/core/index.ts, tests/src/core/validators.test.ts, tests/src/core/helpers.test.ts): Re-verified: isRelationDescriptor still sat in helpers.ts and the package had no validators.ts. Created src/core/validators.ts holding the guard unchanged (same TSDoc, same body), added `export * from './validators.js'` to index.ts directly after './errors.js', and pointed helpers.ts at './validators.js' (dropping its now-unused isRecord import). Mirrored the test: moved the isRelationDescriptor describe block out of tests/src/core/helpers.test.ts into a new tests/src/core/validators.test.ts, adding a builder-output case. Barrel star-exports both files, so the published surface is identical.
- **s17-10** deferred_breaking: Defect re-verified as real: every `?? ''` read still stands in Model.ts (link/unlink/links and the five loaders). Both lane corrections agree on the repair — split ResolvedRelation into a five-arm union discriminated on `relationship` and narrow Model.#through to the `through` arm — and that repair moves the published surface: ResolvedRelation is an exported, guide-documented interface whose optional members `column`/`key`/`through`/`source`/`target`/`tag`/`label` would each stop being readable without narrowing, its declaration kind changes from interface to type (so `extends ResolvedRelation` stops compiling), and its guide Types row would change kind. That is the brief's 'removing any public interface member' case. No part of it stands alone: deleting a `?? ''` does not typecheck without the narrow. Applied nothing; carried to the work order.
- **s17-11** applied (src/core/types.ts, guides/relation.md): Applied the non-breaking half of the reshaped repair only. Re-verified the shape deviation: model(name) returns an entity while models() returns identifiers. The lane amendment's substance — rename models() to names() — renames an exported interface method and is deferred_breaking; it is carried to the work order and nothing was applied for it. The amendment's second half stands on its own and was applied: struck the false 'Follows the manager accessor pattern (`model` / `models`)' sentence from the RelationManagerInterface TSDoc in types.ts, and replaced the guide's matching 'Follows the manager accessor pattern (`model` singular, `models` plural).' line under #### RelationManagerInterface with an accurate description of what each member returns.
- **s17-13** applied (src/core/helpers.ts, src/core/Model.ts, guides/relation.md, tests/src/core/helpers.test.ts): Re-verified both privates as pure leaves reaching no #state and no sibling method. Moved them to src/core/helpers.ts under a new '// === Row projection' band as `readColumn(record: unknown, column: string): unknown` and `countAttached(values: ReadonlyArray<Row | readonly Row[] | undefined>): number`, bodies unchanged, each with third-person TSDoc and an @example (the guides parity gate requires an example per Surface function). Model.ts imports both; 12 `this.#field(` call sites and the single `this.#attached(values)` site now call the leaves, and #index/#group stay private as the repair directs. Added a 'Row helpers' Surface table to guides/relation.md for the two additive exports, and unit tests for each in tests/src/core/helpers.test.ts (projection, missing column, non-object/null/undefined; array-sum plus single-row tally, empty set, empty arrays).

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2341ms on 44 files using 4 threads. (First run failed on guides/relation.md and src/core/Model.ts — my own edits; converged with npm run lint then npm run format, then re-ran the non-mutating chain.)
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no output, exit 0
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — no diagnostics
- npm run build: pass — ✓ 9 modules transformed. dist/src/core/index.cjs 24.73 kB │ gzip: 6.06 kB │ map: 47.31 kB ✓ built in 2.66s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src:core 44 passed (44); policy 111 passed (111); config 46 passed (46); setup 10 passed (10); guides 23 passed (23)

## Diffstat

```text
 guides/relation.md             |  9 +++++-
 src/core/Model.ts              | 47 +++++++++----------------------
 src/core/helpers.ts            | 64 +++++++++++++++++++++++++++++++++---------
 src/core/index.ts              |  1 +
 src/core/types.ts              |  2 +-
 tests/src/core/helpers.test.ts | 35 +++++++++++++++++------
 6 files changed, 101 insertions(+), 57 deletions(-)

Untracked (not in `git diff --stat`; not staged, per the brief's no-stage rule):
 src/core/validators.ts              | 14 ++++++++++++++
 tests/src/core/validators.test.ts   | 11 +++++++++++
```

- dist moves: true

## Deviations

No stop-and-report conditions arose. Two judgment calls recorded rather than escalated, both inside the brief's ancillary-choice allowance:

1. s17-11 has three Verification notes, not two lane corrections that conflict. The Judge note rejects the finding's own repair (entity-returning plural) and is truncated mid-word in the dossier; the DRIFT/high lane says "stands"; the DRIFT-RESHAPE/medium lane amends to rename models() to names() and strike the conformance sentence. I read the Judge and the reshape lane as agreeing that the finding's repair is wrong and that no entity-returning plural should be added, and applied only what survives the breaking test.

2. s17-13's two new exports needed guide Surface rows and an example each, or the guides parity gate fails ("documents every barrel export" and "documents an example for every Surface function"). Neither the finding nor the brief names the guide, but the brief's owned scope includes guides/relation.md and the repair could not land green without them. I added a "Row helpers" table and TSDoc @example blocks rather than new guide fences.

Work-order items deferred out of this unit: s17-10 whole (ResolvedRelation five-arm union split plus the `?? ''` deletions and the Model.#through narrow), and the s17-11 rename of RelationManagerInterface.models() to names().
