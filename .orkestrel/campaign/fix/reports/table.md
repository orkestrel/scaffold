# Fix report: table

## Dispositions

- **s14-23** deferred_breaking: Re-verified against the current tree: `src/core/index.ts:10-15` still star-exports all six manager classes, `guides/table.md` still carries their Surface rows, and no consumer can construct one. The repair's own first step deletes six exported symbols from the published barrel, which the breaking test defers whole; the guide-row deletion and the `INTERNAL` naming cannot stand alone because each on its own turns a parity test red. Carried to the work order with the finding's dependency note that findings 24 and 26 could make a manager constructible.
- **s14-24** applied (src/core/tables/KeyManager.ts, src/core/tables/SelectionManager.ts, src/core/tables/ExpansionManager.ts, tests/src/core/tables/KeyManager.test.ts, tests/src/core/Table.test.ts, tests/guides.test.ts, guides/table.md): Applied the DRIFT-RESHAPE correction (the composition form both corrections share), not the finding's collapse-to-one-interface repair. Extracted the shared shell - the five closure fields, the `keys` getter, and `#change` - into a new `KeyManager` class in `src/core/tables/KeyManager.ts`, holding its event name as constructor data. `SelectionManager` and `ExpansionManager` keep their own classes, verbs, events, and interfaces, and now compose the engine; their public members, constructor signatures, and `TableInterface.selection` / `TableInterface.expansion` types are unchanged. `KeyManager` is interned rather than barrelled (its constructor needs closures only `Table` produces), so it is named in `INTERNAL` at `tests/guides.test.ts` and the published surface does not move. Updated the source-shape test in `Table.test.ts` that pinned one `computeKeys` call per manager file - it now pins the call in the engine and its absence from both managers - and added the mirror suite `tests/src/core/tables/KeyManager.test.ts`.
- **s14-25** applied (src/core/helpers.ts, src/core/types.ts, src/core/tables/SortManager.ts, src/core/tables/FilterManager.ts, tests/src/core/helpers.test.ts, tests/src/core/index.test.ts, tests/guides.test.ts, guides/table.md): Extracted the column-keyed list engine into three exported pure leaves in `helpers.ts`: `mergeTerms` (replace-or-append by `column`), `removeTerms` (drop entries whose `column` is named), and `matchesTerms` (compare two lists, taking the operand test from its caller). Added the `TableTerm` constraint interface to `types.ts`. `SortManager` and `FilterManager` now compose them with their own validation, their own emit, and the filter's pagination clamp; `SortManager.#same` is gone and `FilterManager.#same` is reduced to the operator-specific `#operands`. All four exports are additive. Documented `TableTerm` in the lens Surface table, the three helpers in the helper Surface table, with a worked fence in the sorting section transcribed into the guides fence suite, and covered each leaf in `tests/src/core/helpers.test.ts`.
- **s14-29** applied (src/core/Table.ts, tests/src/core/Table.test.ts, guides/table.md): Applied the DRIFT-RESHAPE lane's operative correction and kept the ownability probe in `isTableColumn` as it directs. `Table`'s constructor now guards the caller's schema, owns a copy through a total step (`attempt(() => cloneSchema(schema))`, rethrowing a `TableError` and mapping any other throw to `SCHEMA` `The table schema is unusable: The schema is not a table schema`), then runs `isStructuralTableSchema` and `auditTable` against that owned copy and stores the same object. Foreign `meta` reads through the constructor drop from three to two, measured with a counting proxy: 2 after the change, and the audit now reads the owned copy. Added the pinning test `refuses a schema whose owned copy fails the guard the caller-supplied one passed` in `Table.test.ts` - a proxy answering a property read with `'end'` over a data descriptor holding a 600-deep record. It reports `NO_THROW` against the pre-repair constructor body (run and read) and `SCHEMA` after. Documented the guard-own-guard order in the guide's owning-what-arrives section.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2252ms on 62 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (exit 0, no diagnostics)
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json (exit 0)
- npm run build: pass — vite build ... built in 2.39s; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src:core 16 files / 103 tests passed; policy 111 passed; config 46 passed; setup 12 passed; guides 82 passed

## Diffstat

```text
 guides/table.md                     | 58 +++++++++++++++++-----
 src/core/Table.ts                   | 18 +++++---
 src/core/helpers.ts                 | 62 +++++++++++++++++++++++++++
 src/core/tables/ExpansionManager.ts | 42 ++++---------------
 src/core/tables/FilterManager.ts    | 53 +++++++----------------
 src/core/tables/SelectionManager.ts | 42 ++++---------------
 src/core/tables/SortManager.ts      | 34 ++++-----------
 src/core/types.ts                   | 13 ++++++
 tests/guides.test.ts                | 20 ++++++++-
 tests/src/core/Table.test.ts        | 38 ++++++++++++++++-
 tests/src/core/helpers.test.ts      | 83 ++++++++++++++++++++++++++++++++++++-
 tests/src/core/index.test.ts        |  3 ++
 12 files changed, 313 insertions(+), 153 deletions(-)
 (untracked, not in the stat: src/core/tables/KeyManager.ts 68 lines, tests/src/core/tables/KeyManager.test.ts 104 lines)
```

- dist moves: true

## Deviations

s14-29 order: the corrected repair states two orders in one paragraph — "own the schema first" and "mirroring the guard-then-own-then-guard order `parseTable` already uses at parsers.ts:21-28". I implemented guard-then-own-then-guard, because own-first changes a published refusal message the package's own guide pins twice: `guides/table.md` says `cloneSchema` raises `SCHEMA` for a `meta` no clone can own "which the guard and the audit refuse first", and the cloners section says "`createTable` never reaches it, because `isTableColumn` ... refuses such a schema first". Own-first would surface `column "id" has metadata that cannot be owned` from `createTable` where the guard's `The schema is not a table schema` is documented today, which the brief defers as an observable change no document pins. The order I applied satisfies every operative clause of the correction — the total own step with the non-`TableError` mapping, the guard and audit run against the owned copy, that same object stored, the `isTableColumn` probe kept — and it is the `parseTable` mirror the lane itself named.

s14-24 barrel placement: the corrected repair says "one exported key-set engine". `KeyManager` is exported from its own file but deliberately not added to `src/core/index.ts`, because its constructor takes closures over `Table`'s `#` fields — the exact intern condition in `.claude/rules/architecture.md` § Barrel exports, and the same condition s14-23 raises against the six existing manager rows. Barrelling it would have created a seventh row the finding s14-23 exists to remove. It is named in the parity `INTERNAL` list instead, so no published symbol moved.

Two existing tests changed because the repairs make their assertions false: the `Table.test.ts` source-shape test that pinned exactly one `computeKeys` call in each of `SelectionManager.ts` and `ExpansionManager.ts` (the call now lives in the engine), and the `index.test.ts` barrel-name list (three additive helper exports). Neither was deleted or renamed.
