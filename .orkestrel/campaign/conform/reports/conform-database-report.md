# Unit conform-database — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green.

## Rows

| Id                        | Disposition | Evidence                                                                                                                                                                          |
| ------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| database-subj-1           | applied     | `src/core/Table.ts` aggregate `@remarks` now opens `Unlike {@link count}`, matching `src/core/types.ts` and the guarded `count` body.                                              |
| database-subj-2           | applied     | `guides/database.md` Observing parenthetical rewritten to the refuter's form. The corrected claim is already executed by `tests/src/core/Table.test.ts` (see § Behavioural proofs). |
| database-subj-3           | applied     | `#### \`AdmissionInterface\`` table added at `guides/database.md:363-370`; `track` example fence added beside the admission-ledger paragraph; `@example` added to the interface.    |
| database-subj-4           | applied     | `README.md:26` reads `Pre-release: the core engine…`; the `0.0.7` parenthetical is gone and no version was substituted.                                                            |
| database-subj-5           | applied     | Every in-subject `AGENTS §N` / bare `§N` citation replaced with its named rule section or deleted. Sweep clean (see § Sweeps).                                                     |
| database-subj-6           | applied     | `resolveColumns` renamed `requireColumns` at its declaration, overloads, TSDoc, `@example`, both call sites, its test, and both guide sites. BREAKING — see § Breaking.             |
| database-subj-7           | applied     | `src/core/helpers.ts` `conformDriver` `@remarks` opens `Consumes only the first value {@link scanDriver} yields`.                                                                  |
| database-subj-8           | applied     | Substitution sweep over `src/**` and the guides rewritten by table row and by sense. Sweep clean over the declared paths (see § Sweeps and § Observations).                        |
| database-subj-9           | applied     | `guides/database.md` IndexedDB error-mapping fence puts `import type { IndexedDBError }` first. No other fence carries the inversion (multiline sweep clean).                      |
| database-subj-10          | applied     | Applied as the § Successor note's carrier, not as the brief's "no edit" row: the re-staged `@orkestrel/guide` **does** extract `transaction?<R>(`, so the parity gate demanded it.  |
| database-subj-11          | noop        | No edit, as the row directs. `count` and `aggregate` keep their names and the divergence stays documented at `src/core/types.ts`.                                                  |
| database-obj-1            | applied     | `findColumnStorage` and its TSDoc deleted with the `// === Schema lookups` heading; test import, `describe` block, and guide Surface row deleted. BREAKING — see § Breaking.        |
| database-obj-2            | applied     | `DriverIterator` barrelled; both deep relative imports folded into each file's `@src/core` value import; INTERNAL entry and comment name removed; Surface row and `@example` added. |
| database-obj-4            | applied     | Every `import type` in the four named files moved above the first value import. Multiline sweep over `src/**` returns no remaining inversion.                                       |
| database-obj-5            | applied     | Four mirrored test files added and collected by the existing globs; one guide `## Tests` row each.                                                                                 |
| database-obj-6            | applied     | `describe('flagship fences: …')` blocks added to `tests/guides.test.ts`, transcribing every fence that states a value. Mutation control run (see § Behavioural proofs).            |
| database-obj-7            | applied     | `taverna` replaced with `database` at every site; `npm run test:src:browser` green inside `test:src`. Sweep clean.                                                                  |
| fleet-F1                  | noop        | The addendum's ruling: database **has** a browser environment. Read `src/browser/` (constants, drivers/IndexedDBDriver, factories, helpers, index, types) and `tests/setupBrowser.ts`. `isBrowserVuePath` is absent from the tree entirely (`git grep isBrowserVuePath -- tests src` empty). |
| fleet-F2                  | noop        | No implementation class declares a public `readonly id: string` data field. Classes read: `IndexedDBDriver`, `Cursor`, `Database`, `DatabaseContext`, `DatabaseTransaction`, `DriverIterator`, `Query`, `ScopedIterator`, `Table`, `TransactionScope`, `MemoryDriver`, `DatabaseError`, `JSONDriver`, `SQLiteDriver`. The only public data fields anywhere are `DatabaseError`'s `code` and `context` — a different name, on an errors-file class. |

### Consumer edits carried from producers (§ Successor note, addendum § The closure you build against)

Taken first, before any numbered row.

| Producer id     | Disposition | Sites edited                                                                                                                                                   |
| --------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| contract-subj-1 | applied     | `src/core/helpers.ts` `switch (shape.category)`; `src/core/types.ts` `RowOf` structural literal reads `readonly category: 'object'`.                            |
| indexeddb-subj-1 | applied    | `src/browser/drivers/IndexedDBDriver.ts` — `context.stores.open(...)` → `context.stores.store(...)` at both sites. The installed member is `store`, not `open`.  |
| sqlite-subj-1   | applied     | `SQLiteDriver.ts` — six `statement.run(...)` → `.execute(...)`; `SQLiteDriver.test.ts` — three `.prepare(...).run(...)` → `.execute(...)`. No `SQLiteRunResult` reference existed. |
| sqlite-subj-14  | applied     | `SQLiteDriver.ts` — three `database.transact(...)` call sites, plus the stale `database.transaction` in its own class `@remarks`. The package's own `DatabaseInterface.transaction` / `DriverInterface.transaction` are untouched. |

## Behavioural proofs (failing first, then green)

| Claim                                                                   | Command                                          | Before                              | After                            |
| ----------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------- | -------------------------------- |
| The consumer edits are what make the tree compile against the closure   | `npm --prefix /home/user/fleet/database run check` | exit 2, 100+ diagnostics across `src/core/helpers.ts`, `src/core/types.ts`, `src/browser/drivers/IndexedDBDriver.ts`, `src/server/drivers/SQLiteDriver.ts` and every test that reads a `RowOf` row (`consumer-edits-before.txt`) | exit 0 (`consumer-edits-after.txt`) |
| contract-subj-1's `types.ts` edit narrows `RowOf` rather than widening  | same                                              | `tests/src/core/Database.test.ts(157,9): error TS2322: Type 'TableInterface<unknown>' is not assignable to type 'TableInterface<{ readonly id: string; readonly age: number; }>'` | compiles                          |
| `AdmissionInterface` and `DriverInterface.transaction` reach parity      | `npm --prefix /home/user/fleet/database run test:guides` | 2 failed \| 66 passed (`subj-3-subj-10-guides-before.txt`) | 81 passed (`subj-3-subj-10-obj-6-guides-after.txt`) |

The `check` reading is the failing-first proof the addendum names for the consumer edits. The
`test:guides` reading is the failing-first proof for `database-subj-3` and for the
`database-subj-10` carrier: against the re-staged `@orkestrel/guide`, the committed tip was
already red on `DriverInterface > documents every interface method` expecting `transaction`.

### The flagship-fence instrument was made to fail

`database-obj-6`'s block is an instrument, so it was run against a broken source before being
trusted. `src/server/helpers.ts` `quoteIdentifier` was mutated to emit backticks, the guides
project was run, and the mutation was reverted.

- Control red (`obj-6-flagship-control-red.txt`): `2 failed | 79 passed`. The two failures are
  exactly `flagship fences: server helpers > compileQuerySQL emits the fence text and parameters`
  and `> the SQL emitters return what the fence claims`. Every parity assertion stayed green under
  the same mutation, which is the row's own claim: name resolution cannot see a wrong value.
- Restored green: `81 passed`.

Two further honest reds were read and fixed during the work rather than asserted around:
`TransactionScope.track` refuses a nested `track` started after `stop` (the first draft asserted
the opposite), and `schemaToTable` returns a `string` rather than a `CompiledSQL`.

## Sweeps

Each pattern was run with `git grep -n -i -E` from `/home/user/fleet/database`, so the population is
the tracked tree and `node_modules` is outside it by construction. Vendored dependency guides
(`guides/contract.md`, `emitter.md`, `guide.md`, `indexeddb.md`, `sqlite.md`) were excluded from the
paths and left untouched; they still carry their own upstream `§N` citations.

| Sweep                        | Pattern                                                                              | Paths                                                     | Result |
| ---------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------- | ------ |
| old name + inflections       | `resolveColumns?\|resolvecolumn(s\|ed\|ing)`                                          | `src tests guides/database.md guides/README.md README.md` | empty  |
| removed export               | `findColumnStorage`                                                                   | same                                                      | empty  |
| foreign project name         | `taverna\|tavernas\|tavernaed\|tavernaing`                                            | same                                                      | empty  |
| section-number citations     | `AGENTS §\|§[0-9]+`                                                                   | same                                                      | empty  |
| substitution table           | `\b(via\|simply\|just\|easy\|easier\|leverage\|utilize)\b\|e\.g\.\|i\.e\.\|etc\.`      | `src guides/database.md guides/README.md README.md`       | empty  |
| import-type ordering         | multiline `^import \{[^\n]*\n(import [^\n]*\n)*import type ` (Grep, `multiline: true`) | `src`, `guides/database.md`                               | empty  |

Every `via` hit was ruled by sense and rewritten `through` (or `by using` where the object is an
instrument); `e.g.` → `for example`; `i.e.` → `that is`; `simply` deleted with the sentence recast;
`just` ruled per hit — `not just X` → `not only X`, `just before/after` → `immediately
before/after`, `resume just past it` → `resume immediately past it`, and the remaining guide hits by
deletion or by `only`. No hit was found in a permitted sense.

## Files touched

**Source**

- `src/core/types.ts` — `RowOf` discriminant; `AdmissionInterface` `@example`; substitution rewrites.
- `src/core/helpers.ts` — `shapeToColumnStorage` discriminant; `resolveColumns` → `requireColumns`; `conformDriver` `@remarks`; substitution rewrites.
- `src/core/Table.ts` — aggregate `@remarks` `Unlike`; `import type` ordering.
- `src/core/Database.ts` — `requireColumns` import and three call sites; `import type` ordering.
- `src/core/DatabaseTransaction.ts` — `requireColumns` import and call site; `import type` ordering.
- `src/core/DriverIterator.ts` — runnable `@example`, `@typeParam`, and constructor `@param`s for its new barrel row.
- `src/core/index.ts` — `export * from './DriverIterator.js'`.
- `src/core/Cursor.ts`, `src/core/errors.ts`, `src/core/factories.ts`, `src/core/drivers/MemoryDriver.ts` — substitution rewrites only.
- `src/server/helpers.ts` — `findColumnStorage` and its heading deleted; substitution rewrite.
- `src/server/drivers/SQLiteDriver.ts` — `transact` / `execute` call sites; `DriverIterator` through `@src/core`; stale `database.transaction` prose; substitution rewrites.
- `src/server/drivers/JSONDriver.ts` — `DriverIterator` through `@src/core`.
- `src/server/compilers.ts`, `src/server/constants.ts`, `src/server/types.ts` — substitution rewrites only.
- `src/browser/drivers/IndexedDBDriver.ts` — `context.stores.store`; `import type` ordering; substitution rewrites.
- `src/browser/helpers.ts` — substitution rewrites only.

**Tests**

- `tests/guides.test.ts` — `DriverIterator` struck from INTERNAL and its comment; citation rewrite; the `flagship fences` blocks and their imports.
- `tests/src/core/TransactionScope.test.ts` (new) — the interned lifetime boundary driven directly.
- `tests/src/core/DatabaseContext.test.ts` (new) — the interned shared context driven directly.
- `tests/src/core/DatabaseTransaction.test.ts` (new) — the interned transaction view driven directly.
- `tests/src/server/factories.test.ts` (new) — `createJSONDriver` / `createSQLiteDriver`, mirroring the core and browser factory tests.
- `tests/src/core/helpers.test.ts` — `requireColumns` import, `describe`, and calls; citation rewrite.
- `tests/src/server/helpers.test.ts` — `findColumnStorage` import and `describe` block deleted.
- `tests/src/server/drivers/SQLiteDriver.test.ts` — three `.execute(...)` call sites; citation rewrites.
- `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/src/browser/drivers/IndexedDBDriver.test.ts`, `tests/src/browser/factories.test.ts`, `tests/src/browser/integration.test.ts` — `taverna` → `database`.
- `tests/setup.ts`, `tests/setupServer.ts`, `tests/src/core/Database.test.ts`, `tests/src/core/Query.test.ts`, `tests/src/core/Table.test.ts`, `tests/src/server/drivers/JSONDriver.test.ts` — citation rewrites only.

**Documentation**

- `guides/database.md` — every numbered row's guide half, plus the formatter's re-wrap of the file.
- `guides/README.md` — two citation rewrites.
- `README.md` — the Status line.

`package.json` is unmodified: no row named a field in it once `database-subj-4` was ruled to delete
the version rather than sync it.

## Gates

| Gate                  | Command                                                | Exit | Reading                                                     |
| --------------------- | ------------------------------------------------------ | ---- | ------------------------------------------------------------- |
| `format:check`        | `npm --prefix /home/user/fleet/database run format:check` | 0    | `All matched files use the correct format.` on 99 files     |
| `lint:check`          | `npm --prefix /home/user/fleet/database run lint:check`    | 0    | no output                                                   |
| `check`               | `npm --prefix /home/user/fleet/database run check`         | 0    | root plus the three scoped isolation passes                 |
| `build`               | `npm --prefix /home/user/fleet/database run build`         | 0    | core, browser, server built; declarations emitted           |
| `test`                | `npm --prefix /home/user/fleet/database test`              | 0    | `src` 969/969, `policy` 111/111, `config` 46/46, `setup` 63/63, `guides` 81/81 |

`format:check` failed once on `guides/database.md`, `tests/guides.test.ts`, and
`tests/src/core/DatabaseContext.test.ts` — all owned. They were formatted scoped with
`npx oxfmt --config .oxfmtrc.json --write <the three paths>` rather than by a tree-wide `format`,
and the gate then reported clean. `lint:check` failed once on `Array<() => void>` in the new
server factories test, which was fixed in place.

### `scaffold audit --offline`

`cd /home/user/fleet/database && npx scaffold audit --offline`:

```text
1 of 45 planned paths drifted from the plan. Audit compared bytes at 28, existence at 5, and nothing at 12.
```

The single drifted path is `configs/browsers.ts` (group `configs`, `stale`).
`git status --short -- configs/browsers.ts` is empty, so the drift is at the committed tip and this
unit did not cause it. `configs/**` is off-limits, so it is reported rather than repaired.

### Build inspection for database-obj-2

The row claimed `DriverIterator` was bundled a second time into the server output. After the fix,
`dist/src/server/index.js:1` imports `DriverIterator` from `../core/index.js` and no
`var DriverIterator = class` remains in that file, while `dist/src/core/index.js` now carries the
class. The predicted duplication is gone.

## Breaking

Two rows change the published surface. `package.json`'s `version` is off-limits to this unit, so the
bump is the Orchestrator's.

| Change                                                             | Surface                        | Consumer edit required                                                                                          |
| ------------------------------------------------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `resolveColumns` renamed `requireColumns` (database-subj-6)         | `@orkestrel/database`          | **None.** Swept the identifier across `/home/user/fleet` excluding `node_modules`: only this package matched.    |
| `findColumnStorage` removed (database-obj-1)                        | `@orkestrel/database/server`   | **None.** Swept the identifier across `/home/user/fleet` excluding `node_modules`: only this package and the nine vendored `guides/database.md` mirrors matched. |
| `DriverIterator` added to the core barrel (database-obj-2)          | `@orkestrel/database`          | Additive; no consumer edit.                                                                                     |

`@orkestrel/middleware` needs no edit **from** this unit. Its red was caused by this package's
committed tip authoring `ContractShape` literals with `type` where the landed `@orkestrel/contract`
reads `category`; the contract-subj-1 carry above is what closes it. Nothing this unit changed adds
a further obligation on middleware.

The vendored `guides/database.md` mirror moved in `@orkestrel/agent`, `@orkestrel/middleware`,
`@orkestrel/queue`, `@orkestrel/relation`, `@orkestrel/terminal`, `@orkestrel/toolbox`,
`@orkestrel/workflow`, `@orkestrel/worker`, and `@orkestrel/workspace`. Each refreshes at re-pin;
none was hand-edited.

## Shared-file patches

None. Every edit landed inside Owned. No file outside `/home/user/fleet/database` was written, and no
sibling checkout was touched.

## Observations, not criteria

- **Whole-suite timing.** `npm test` was read inside this unit's own exec. The deciding run belongs to the Orchestrator after this unit exits.
- **`configs/browsers.ts` is stale at the committed tip.** Pre-existing, off-limits, named earlier.
- **`via` survives in `tests/**`.** `database-subj-8` fixes its paths at `src/**/*.ts` and `guides/database.md`, so these sites are outside the row: `tests/src/browser/drivers/IndexedDBDriver.test.ts:393,1002,1024,2033`; `tests/src/core/Database.test.ts:907,909` (`e.g.`); `tests/src/core/Query.test.ts:240`; `tests/src/core/Table.test.ts:459,571`; `tests/src/core/helpers.test.ts:219`; `tests/src/server/compilers.test.ts:207,486`; `tests/src/server/drivers/SQLiteDriver.test.ts:736,2684`. Recorded against `database-subj-8` for a successor, not reopened here.
- **`now` survives in `guides/database.md`.** `.claude/rules/writing.md` § Substitutions bans it, but `database-subj-8` fixes the sweep pattern and `now` is not in it. Sites include the `JSONDriver now DOES implement` clause. Recorded for a successor.
- **`DatabaseContext`'s rollback-failure wrapping was not duplicated.** `tests/src/core/Database.test.ts:756` and `:788` already drive that seam end to end with the sanctioned `createMemoryAdapter` stub, so the new context test names the location instead of re-asserting it.
- **Two browser fence claims are unassertable in the `guides` project.** `conditionToRange` and `selectPlan` return `IDBKeyRange` values and that project runs in Node with the browser disabled. `tests/src/browser/helpers.test.ts` asserts them in real Chromium; the new block states this beside the browser describe.
- **Counts deleted while rewriting a comment.** `AGENTS.md` § Writing forbids a count and directs deleting rather than correcting one. Two sat inside sentences `database-subj-5` was already rewriting, so they went with the rewrite: `tests/guides.test.ts` "The five constants below" → "The constants below", and `tests/src/server/drivers/JSONDriver.test.ts` "the JSON driver's nine DriverInterface primitives" → "the JSON driver's DriverInterface primitives".

## Deviations

None. No row's repair contradicted a rule, collided with an existing name, required a file outside
Owned, or required a consumer edit to keep this package's gates green.

Two ancillary questions were decided and carried on from, as the deviation contract allows.
`database-subj-3`'s example: the refuter expected the interface's own `@example` block to satisfy
`findUnexampled`, but `@orkestrel/guide`'s `Source.examples(name)` reads `extractExampleMethods`
over the declaration **body**, so a block on the leading TSDoc is not in that population. The
`test:guides` run confirmed it (`AdmissionInterface examples > documents an example for every method`
returned `['track']`). A guide `ts` fence carrying the bare identifier was added beside the
admission-ledger paragraph, which is the population `findUnexampled` actually reads, and the
interface `@example` was kept because the TSDoc rule requires it. `database-subj-10` was applied
rather than left as the brief's "no edit", because the § Successor note makes it a carrier once the
re-staged `@orkestrel/guide` extracts the member — and it does, so the parity gate was already red
without it.
