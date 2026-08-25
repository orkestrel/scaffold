# Unit VISIT-database — report

Done. The three setup proofs are written, `test:guides` and the `test` chain carry their planned
values, `scaffold repair` ran clean, and every gate closed green. Nothing committed.

## The advisory as taken

`npx --no-install scaffold audit`, run first, at `/home/user/orkestrel/database`:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupBrowser.test.ts, tests/setupServer.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
48 of 137 planned paths drifted from the plan. Audit compared bytes at 106, existence at 19, and nothing at 12. The plan does not own 7 further paths beneath its groups.
```

The drift table named the foreign `orkestrel-human-journey` paths plus `.claude/agents/codex.md`
and `.codex/agents/claude.toml`, left alone per the brief, and the stale and missing orchestration
paths `repair` later wrote.

At exit the audit reports no `setup:` advisory and no `scripts:` advisory. What remains is the
fleet-wide `dependencies: typescript declares major 6, while the registry serves major 7` and the
seven foreign paths.

## The proof files

### `tests/setup.test.ts`

The host-independent base module. Expectations arrive through `compileGuard` from
`@orkestrel/contract`, through a real query's returned rows, or through the WRAPPED driver rather
than the handle a fixture returned.

- `INTEGRATION_TABLES` — the shape maps admit the canonical fixture row and refuse a wrong-typed or
  fractional value, read through a compiled guard.
- `createUserRow` — the canonical defaults, override replacement, and a built row the fixture column
  contracts admit.
- `userRows` — the Ada / Grace / Edsger trio in key order, and a fresh array of fresh rows per call.
- `tableSchemas` — a real `MemoryDriver` readies every named table and stores rows against it, and
  refuses an undeclared name with `NOT_FOUND`.
- `buildCondition` — a real query applies the built condition to the rows it names, defaults the
  connector to `and`, and widens under an explicit `or`.
- `collectRankStreamIds` — sorted ids below rank 10, excluding the boundary row at rank 10.
- `seedUsersTable` — the returned live table carries exactly what the caller seeded, and each call
  builds a fresh database so no row reaches the next table.
- `createConstrainedUsersDatabase` — names the database `app`, rejects an empty `name` and a
  negative `age` with `VALIDATION`, routes a listener throw to the supplied error handler with the
  event name, and builds a fresh database per call.
- `CURSOR_COLUMNS` — the `role` literal admits the declared roles and refuses one outside the set,
  and `age` refuses a negative value.
- `createCursorDatabase` — rows land in the caller-supplied driver, read back through that driver.
- `seedCursorDatabase` — the canonical trio in a fresh database, unaffected by a sibling's removal.
- `createMemoryAdapter` — the memory driver's `stream`, `migrate`, `metadata`, and `stamp` are
  functions while the adapter's are `undefined`, and every exposed primitive is read back through
  the wrapped driver.
- `createReconciliationDriver` — omits every optional hook the options refuse; serves the initial
  metadata then what `stamp` persisted, recording both; records a migration, applies it to the real
  driver (the added table's `keys` resolve), and adopts its metadata.
- `IteratorSource` — iterates exactly what the supplied iterator yields.
- `RecordingIterator` — delegates `next`, runs the cleanup before delegating `return`, and still
  runs the cleanup when the source carries no `return`.
- `createRecordingDriver` — the native hooks answer with the sentinels and record their inputs while
  the real row stays stored and visible through `scan`; `aggregatesUndefined` resolves the hook to
  `undefined` and still records.
- `conformDriver` — the registered battery mints its driver from the supplied factory, proven by a
  recorder the factory calls.

### `tests/setupBrowser.test.ts`

The `setup` project runs in Node with the browser disabled. The file states in a comment that the
DOM-driving half — `deleteDatabase` and `putIndexedDBValue`, which read `globalThis.indexedDB` and a
live `IDBDatabase` — is proven by the consuming browser suites
`tests/src/browser/drivers/IndexedDBDriver.test.ts`, `tests/src/browser/factories.test.ts`, and
`tests/src/browser/integration.test.ts`. The comment also records that `createIntegrationDatabase`
is imported by no suite, so its opened half is proven nowhere.

- `uniqueName` — a name no earlier call returned, one shared counter across prefixes, the default
  `taverna-idb` prefix and a supplied one.
- `createIntegrationDatabase` — a fresh name per fixture under the integration prefix; the `users`
  and `posts` tables declared on the returned database, keyed on `id`; a compiled row contract
  admitting the canonical fixture row and refusing a missing column, a wrong-typed column, and an
  undeclared column; and the database left `idle`, so no connection exists before a suite drives it.

### `tests/setupServer.test.ts`

Real Node resources throughout: real temporary directories, real TypeScript programs over real
source files, a real on-disk SQLite database, and a real JSON driver. The scratch parent is probed
on the host at runtime rather than assumed.

- `formatCompilerDiagnostics` — one flattened message per line from real diagnostics; empty input
  gives an empty string.
- `checkCompilerDiagnostics` — returns silently for a clean phase, throws naming the failing one and
  carrying the diagnostic text.
- `locateGuideFences` — ordinal, guide line, and zero-padded module path per fence; the cursor
  advances so a repeated body maps to its later occurrence; a body the guide lacks is refused by
  ordinal.
- `formatGuideFenceDiagnostic` — adds the diagnostic's line to the guide line when the fault is in
  the fence file, and keeps the guide line while naming the relative path when it is imported.
- `checkGuideFences` — refuses a guide with no executable fences, returns silently when every fence
  compiles, and names only the failing fence with its guide line.
- `isTypeOnlyExport` — reports `export type { X } from` and `export { type X } from`, clears an
  ordinary value re-export.
- `resolveEntrySymbol` — follows a re-export to the module that declares it, returns a local symbol
  unchanged.
- `classifyEntryDeclaration` — class, function, const, interface, and type each classify; a `let`
  returns `undefined`.
- `shapeEntrySymbols` — one symbol per distinct declaration kind a name carries; refuses a default
  export, a type-only export, and an unsupported declaration.
- `deriveEntrySurfaces` — each requested entry maps to its sorted surface; a missing entry path is
  refused; a fault inside the source tree fails closed; a fault in an imported file outside it is
  ignored.
- `tempTypeScriptProject` — writes a strict config beside the supplied sources, read back through
  `node:fs`, and `destroy` removes the directory.
- `tempDatabasePath` — a `database.json` anchored in its own fresh directory, distinct per call, and
  removed on cleanup.
- `replaceTransactionFailure` — refuses a driver with no native transaction; replaces the rejection
  reason only after the real SQLite rollback has happened (the scoped write is gone); delegates
  every required primitive to the wrapped driver.
- `FOREIGN_KEY_SCHEMA` — frozen, and declares the `children.parent` column the fixture keys.
- `createForeignKeyFixture` — returns an open driver over tables the fixture created itself,
  forwards the `references` option, and removes the temporary directory it allocated (read as a set
  difference under a runtime-probed scratch parent).
- `driverSchema` — indexes `users` on `name` by default, leaves `posts` unindexed and keyed on
  `slug`, replaces the index set when the caller declares one, and a real JSON driver opens the
  schema and keys `posts` rows by `slug`.

## Mutation controls

One per proof file, each a copy of the file with one assertion's input or expectation broken, run
under `npm run test:setup`, then restored. Each run reported exactly one failure.

| Proof file                    | Failing line                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------ |
| `tests/setup.test.ts`         | `AssertionError: expected [ 'r1', 'r3' ] to deeply equal [ 'r1', 'r2', 'r3' ]`                    |
| `tests/setupBrowser.test.ts`  | `AssertionError: expected false to be true // Object.is equality`                                |
| `tests/setupServer.test.ts`   | `AssertionError: expected [ 4, 8 ] to deeply equal [ 4, 9 ]`                                     |

Each run closed `Tests  1 failed | 67 passed (68)`. Every file was restored from its copy and the
suite returned to `68 passed (68)`.

## The visit

1. Proofs written.
2. `npm pkg set 'scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot --project guides'`.
3. The first full `npx --no-install scaffold repair` blocked, exactly as the brief describes:
   `TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup.`
4. `npx --no-install scaffold repair --groups manifest` wrote `test:setup`
   (`1 written, 1 unchanged, 0 removed in ..`).
5. `npm pkg set 'scripts.test=npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides'`, the order the installed scaffold's compiler places `test:setup` in.
6. The full `npx --no-install scaffold repair` ran clean: `49 written, 89 unchanged, 0 removed in ..`.
   It named no retained differing script value. A second run is idempotent:
   `0 written, 138 unchanged, 0 removed in ..`.
7. `npm run format` (`Finished in 3455ms on 192 files using 4 threads`), then the gates.

## Gates

Each read bare, in order, at `/home/user/orkestrel/database`.

| Gate                  | Closing line                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 5194ms on 192 files using 4 threads.`   |
| `npm run lint:check`   | no diagnostics; exit 0                                                                            |
| `npm run check`        | `> tsc --noEmit -p configs/src/tsconfig.server.json` with no diagnostics; exit 0                  |
| `npm run build`        | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts`                               |
| `npm test`             | `test:src` 929 passed (20 files); `test:policy` 93 passed; `test:config` 46 passed; `test:setup` 68 passed (3 files); `test:guides` 63 passed |

`npx --no-install scaffold audit` at exit: `0 of 137 planned paths drifted from the plan.` with no
`setup:` and no `scripts:` advisory.

## Touched files

| File                            | Change                                                                        |
| ------------------------------- | ------------------------------------------------------------------------------- |
| `tests/setup.test.ts`           | New. The base setup module's proof (424 lines).                               |
| `tests/setupBrowser.test.ts`    | New. The browser setup module's host-independent proof (80 lines).            |
| `tests/setupServer.test.ts`     | New. The server setup module's proof (650 lines).                             |
| `package.json`                  | `test:guides` planned value, `test:setup` from repair, `test` chain adopted.  |
| `vite.config.ts`                | The `setup` project, written by repair and registered in `projects`.          |
| `package-lock.json`             | The scaffold `^0.0.52` re-pin that arrived dirty.                             |
| 44 orchestration files          | Written by `scaffold repair`.                                                 |

Diffstat over the files this unit changed by hand or through repair's manifest and config groups:

```text
 package-lock.json |  8 ++++----
 package.json      |  9 +++++----
 vite.config.ts    | 13 ++++++++++++-
 3 files changed, 21 insertions(+), 9 deletions(-)
```

The repair-written orchestration group is a further 44 tracked and untracked paths, plus the three
new proof files.

## Shared-file patches

None. Every file written is owned by the unit or regenerated by `repair`.

## Observations

- The heaviest proof case is `checkGuideFences > returns silently when every fence compiles` at
  1603 ms, measured in the `setup` project's own run; the default 5000 ms case budget clears it
  roughly threefold. An earlier draft asserted the failing-fence case with three `toThrow` calls,
  each re-running the whole two-fence compile; that overran the budget and timed out at 5000 ms. It
  now captures one compile pass and reads its error, and a comment in the file records why.
- `tests/setup.ts` imports `describe`, `it`, and `expect` from `vitest` for its `conformDriver`
  wrapper, which `.claude/rules/tests.md` § Shared test infrastructure forbids in a `setup*.ts`.
  The module is off-limits to this unit, so it is left alone and recorded here.
- The `dependencies: typescript declares major 6` advisory is fleet-wide and out of scope.
- The seven foreign paths under the retired `orkestrel-human-journey` name, `.claude/agents/codex.md`,
  and `.codex/agents/claude.toml` are untouched, for the Orchestrator to remove at commit.

## Deviation state

None. Every acceptance criterion is met and nothing was left open.
