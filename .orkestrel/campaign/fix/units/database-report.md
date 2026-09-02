# Unit breaking-database — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s05-06** — applied: `matchesFuzzy` removed — source, guide Surface row, guide fence import and call, and the test block (seven `it` cases).
- **s05-12** — applied: `driverFindings` → `scanDriver`; `conformDriver` and `auditDriver` call sites and `{@link}` targets, the guide Conformance rows, the `ConformanceFinding` row, the guide fence, and the tests (including the `conformDriver (fail-fast over scanDriver)` title).
- **s05-21** — applied: `INDEXABLE_STORAGE`: `ReadonlySet<ColumnStorage>` → `readonly ColumnStorage[]` wrapped in `Object.freeze`; `.has(column.storage)` → `.some((storage) => storage === column.storage)`, the form `src/server/helpers.ts` already uses; the `@remarks` names the frozen-array shape.
- **s05-23** — applied: `compileWhere` → `compileWhereSQL`, `compileOrder` → `compileOrderSQL`, `compilePage` → `compilePageSQL`, with third-person first sentences; `schemaToTable`, `schemaToIndexes`, `stepToSQL` untouched.
- **s05-04 (breaking half)** — applied: `escapeLike` removed with its guide row and test block (three `it` cases); the invented-audience sentence went with the TSDoc.
- **s05-01/s05-07 (audit fix-up)** — applied: Guide Tests index: the page-matrix clause struck from the `validators.test.ts` bullet; `validatePage`/`findColumn`/`resolvePrimary`/`resolveColumns` credited to the `helpers.test.ts` bullet; a bullet for `tests/src/server/inferers.test.ts` placed with the server bullets.
- **s05-18 (audit fix-up)** — applied: Re-wrapped every paragraph the citation deletion left ragged and recast the two stranded-preposition sentences to `the same core engine that answers every query for MemoryDriver and JSONDriver`.
- **W-DEV carrier (DriverInterface extends)** — applied: The `DriverInterface` Methods table lists every inherited call-signature member. Failing-first: with every source edit in place and the table untouched, `npm run test:guides` → `FAIL tests/guides.test.ts > Database > DriverInterface > documents every interface method — expected [ 'aggregate', 'clear', …(11) ] to deeply equal []`, 1 failed | 62 passed (63); after listing the members, 63 passed (63).
- **sqlite adoption** — applied: `SQLiteDatabaseInterface.exec` → `execute` in `src/server/drivers/SQLiteDriver.ts`, `tests/setupServer.ts`, `tests/src/server/drivers/SQLiteDriver.test.ts`, and the two guide sentences describing the wrapper's raw surface. `npm run check` was red at entry (exit 2); that red was the adoption list.
- **indexeddb adoption** — applied: `IndexedDBUpgradeContext` managers (`context.stores.names/create/drop/open`, `context.indexes.create/drop`) replace the flat members and the `stores` string list; `rangeExactKey`/`rangeBetweenKeys` → `IDBKeyRange.only(first)` / `IDBKeyRange.bound(first, second)`; `IndexedDBCursorInterface.value` is `Row | undefined`, so the `column.remove` migration advances past a non-record stored value instead of rewriting it.

## Symbols moved

- matchesFuzzy → removed
- driverFindings → scanDriver
- INDEXABLE_STORAGE: ReadonlySet<ColumnStorage> → readonly ColumnStorage[] (frozen)
- compileWhere → compileWhereSQL
- compileOrder → compileOrderSQL
- compilePage → compilePageSQL
- escapeLike → removed

## Files touched

- src/core/helpers.ts
- src/core/types.ts
- src/server/compilers.ts
- src/server/drivers/SQLiteDriver.ts
- src/server/helpers.ts
- src/server/types.ts
- src/browser/constants.ts
- src/browser/helpers.ts
- src/browser/drivers/IndexedDBDriver.ts
- src/browser/types.ts
- guides/database.md
- tests/setupServer.ts
- tests/src/core/helpers.test.ts
- tests/src/server/compilers.test.ts
- tests/src/server/drivers/SQLiteDriver.test.ts
- tests/src/browser/drivers/IndexedDBDriver.test.ts

## Tests changed

- tests/src/core/helpers.test.ts — `matchesFuzzy` block deleted with its import; `driverFindings` describe and call sites renamed to `scanDriver`
- tests/src/server/compilers.test.ts — `escapeLike` block deleted with its import; the three compiler describes and call sites renamed
- tests/src/server/drivers/SQLiteDriver.test.ts and tests/setupServer.ts — `native.exec` / `locker.exec` → `execute`
- tests/src/browser/drivers/IndexedDBDriver.test.ts — upgrade callbacks moved to the store and index managers
- src test count 934 → 924, exactly the ten deleted `it` cases (seven `matchesFuzzy`, three `escapeLike`)

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format. 95 files.
- `npm run lint:check` → exit 0 — oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics
- `npm run check` → exit 0 — root tsc, then check:src:core / check:src:browser / check:src:server
- `npm run build` → exit 0 — ES + CJS + declarations; dist/src/server/index.d.ts copied to .d.cts
- `npm test` → exit 0 — src 21 files / 924 tests; policy 111; config 46; setup 63; guides 63

## Diff stat

```text
guides/database.md                                |  66 +++++++------
 src/browser/constants.ts                          |   6 +-
 src/browser/drivers/IndexedDBDriver.ts            |  45 +++++----
 src/browser/helpers.ts                            |  17 ++--
 src/browser/types.ts                              |   4 +-
 src/core/helpers.ts                               | 105 +++++++-------------
 src/core/types.ts                                 |  48 +++++----
 src/server/compilers.ts                           |  49 +++-------
 src/server/drivers/SQLiteDriver.ts                | 113 +++++++++++-----------
 src/server/helpers.ts                             |   4 +-
 src/server/types.ts                               |  10 +-
 tests/setupServer.ts                              |   4 +-
 tests/src/browser/drivers/IndexedDBDriver.test.ts |  14 +--
 tests/src/core/helpers.test.ts                    |  67 ++-----------
 tests/src/server/compilers.test.ts                |  57 ++++-------
 tests/src/server/drivers/SQLiteDriver.test.ts     |  48 ++++-----
 16 files changed, 276 insertions(+), 381 deletions(-)
```

Status at return (writer's reading): `All gates green; no row refused; no deviation raised. `npm run format` ran once to converge before the chain, per the brief's allowance. Acceptance: the word-boundary sweep over src, tests, guides is empty for matchesFuzzy, driverFindings, escapeLike, compileWhere, compileOrder, compilePage, and for the inflected and prose sweeps (fuzzy, driver findings, escape like, compile where/order/page, case-insensitive), with one hit outside the owned set recorded as an observation (the vendored guides/indexeddb.md mirror); check, lint:check, format:check, build, test exit 0; guides/database.md names every new symbol and no removed one. The index is clean: nothing staged, no untracked file. Loading the built entries read-only confirms the surface and proves no module-init cycle: core scanDriver function / matchesFuzzy undefined; server compileWhereSQL function / escapeLike undefined / compileWhere undefined; dist/src/browser/index.d.ts:121 export declare const INDEXABLE_STORAGE: readonly ColumnStorage[].`
Built `dist/` moves: true

## Observations

- `guides/indexeddb.md` is a stale vendored mirror: it documents `rangeExactKey` and `rangeBetweenKeys`, which `@orkestrel/indexeddb` at `bf4730e` deleted. Off-limits; needs a mirror refresh in its own unit.
- `§N` citations survive outside `src/`: s05-18 was scoped to `src/` and `grep -rn '§' src/` is empty, while `guides/database.md` still carries `AGENTS §1`, `§9.2`, `§12`, `§13`, `§14`, `§21`, `§22`, and `tests/setupServer.ts` carries `AGENTS §16.1`. Recorded against the package's prose capability for the next change.
- `via` remains in guide sentences the re-wrap rejoined but did not author; the deferred voice and vocabulary wave owns it.
- `The 15 WHERE operators` on the `ConditionOperator` guide row is a banned count belonging to no row in this unit; it stays for the work order. The `(17 phases)` count on the `scanDriver` row was the unit's to write and is deleted.
- TSDoc voice stays mixed: the first sentence of every edited block is third person (`scanDriver`, `conformDriver`, `auditDriver`, `compileWhereSQL`, `compileOrderSQL`, `compilePageSQL`); the remaining imperative openings are the deferred voice wave's subject.
- No test was timing-suspect; the whole-suite run finished green on the first attempt.

## Deviations

- none

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/database.diff`,
`tmp/units/breaking/database.status`.
