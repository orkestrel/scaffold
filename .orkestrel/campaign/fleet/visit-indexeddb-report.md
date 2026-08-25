# Unit VISIT-indexeddb — report

## Deviation: `tests/setupBrowser.ts` cannot be proven from the `setup` project

**Expected.** `tests/setupBrowser.test.ts` proves the module's host-independent contracts from the
`setup` project, which runs in Node with the browser disabled, and names the DOM-driving exports as
proven by the consuming browser suites.

**Found.** The module cannot be imported in Node at all. Its
`import { removeDatabase } from '@orkestrel/test/browser'` loads `vitest/browser`, which throws at
import time outside Browser Mode. No half of the module is reachable, so the fixed proof shape
cannot be met from any Node-hosted project.

**Exact evidence.** Written `tests/setupBrowser.test.ts` (the intended proof, retained at
`tmp/units/setupBrowser.test.ts.blocked`), then `npm run test:setup`:

```text
> vitest run --config vite.config.ts --no-cache --reporter=dot --project setup

 FAIL  |setup| tests/setupBrowser.test.ts [ tests/setupBrowser.test.ts ]
Error: vitest/browser can be imported only inside the Browser Mode. Your test is running in forks pool. Make sure your regular tests are excluded from the "test.include" glob pattern.
 ❯ node_modules/vitest/browser/context.js:14:7
 ❯ tests/setupBrowser.ts:14:1
     13| import { waitForDelay } from '@orkestrel/test'
     14| import { removeDatabase } from '@orkestrel/test/browser'
       | ^

 Test Files  1 failed | 1 passed (2)
      Tests  1 passed (1)
```

The same throw reproduces through the `probe` project, so it is the Node host rather than the
`setup` project's own wiring.

**Done.** `tests/setup.test.ts`, the `test:guides` adoption, the `test:setup` script, the `test`
chain, the `setup` Vitest project, and every gate.

**Not done.** `tests/setupBrowser.test.ts`. The file was removed from `tests/` so the tree stays
green; its content is retained at `tmp/units/setupBrowser.test.ts.blocked` and is ready to move back
verbatim after the blocker clears. Acceptance criterion "no `setup:` advisory" is therefore unmet:
the advisory still names `tests/setupBrowser.ts`.

**Hypothesis (one).** The fix belongs in `tests/setupBrowser.ts`, which this unit does not own:
drop the `@orkestrel/test/browser` import and delete the database directly, which is what
`@orkestrel/database` already does — its `tests/setupBrowser.ts` carries the comment "This is
deliberately NOT `removeDatabase` from `@orkestrel/test/browser`", and that module is the one
`setupBrowser.test.ts` in the fleet that imports cleanly under Node. Across the fleet's
`tests/setupBrowser.ts` modules, `@orkestrel/indexeddb` is the only one importing
`@orkestrel/test/browser`, and it is the only one with no proof.

## The advisory, as taken at the start

`npx --no-install scaffold audit`, run before any edit:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupBrowser.ts. Add tests/setup.test.ts, tests/setupBrowser.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

Closing table line: `48 of 128 planned paths drifted from the plan. Audit compared bytes at 102,
existence at 19, and nothing at 7. The plan does not own 7 further paths beneath its groups.`

## Proof files

### `tests/setup.test.ts`

`tests/setup.ts` exports nothing. Its whole body is the `afterEach` hook restoring Vitest's own
registry, so its observable contract is that loading it first as `setupFiles[0]` contributes nothing
to a project's module namespace — the guarantee a DOM, `node:*`, or IndexedDB helper landing there
by accident would break. One case, `adds no export`, imports the module as a namespace and asserts
`Object.keys` equals the empty array. The file's comment states the module is deliberately
export-free and points the package's IndexedDB helpers at `tests/setupBrowser.ts` and the
`src:browser` suites.

This matches `@orkestrel/sqlite`'s `tests/setup.test.ts`, the fleet's existing proof for an
export-free base setup module.

### `tests/setupBrowser.test.ts` — written, blocked, removed

Retained at `tmp/units/setupBrowser.test.ts.blocked`. It asserts the host-independent contracts:

- `uniqueName` — a batch of names collides with none of its own (read as set membership, not as a
  counter value); one shared counter numbers every name whatever the prefix (read by parsing the
  trailing segment back out of the string); the caller prefix precedes the counter and defaults to
  `terrain-idb`.
- `errorCode` — reports the code of an `IndexedDBError` for every code the wrapper maps, with the
  expected codes drawn from `ERROR_CODES` in `@src/browser`, a table the helper never reads;
  reports `undefined` for a plain `Error`, a sibling `TypeError`, a plain-object lookalike carrying
  `name: 'IndexedDBError'` and a `code`, a bare string, `undefined`, and `null`.
- `drainCursor` — collects nothing from the `null` source rather than throwing. This is the one
  branch it takes before any cursor exists.
- `SEED_USER_STORES` / `SEED_STORE_STORES` — each declares one `users` store keyed by `id`; the
  user seed's indexes flatten to `byAge` on `age` non-unique and `byEmail` on `email` unique, which
  is what `tests/src/browser/IndexedDBIndex.test.ts` reads back off a live store; the plain seed
  declares no secondary index, which is what the cursor suite's primary-key walk relies on.

Its comment names each DOM-driving export as proven by the consuming browser suites: `dropDatabase`
by the `IndexedDBDatabase`, `factories`, and `helpers` browser suites; `createTestDatabase` by the
`IndexedDBDatabase`, `IndexedDBStore`, `IndexedDBIndex`, `IndexedDBCursor`, `IndexedDBTransaction`,
`IndexedDBTransactionStore`, and `helpers` browser suites; `seedUsers` by the `IndexedDBIndex`
suite; `seedStore` by the `IndexedDBCursor` suite; and `drainCursor`'s traversal branch by the
`IndexedDBCursor`, `IndexedDBIndex`, `IndexedDBStore`, and `IndexedDBTransactionStore` suites.

## Mutation controls

`tests/setup.test.ts` — the expectation was changed in place to name one entry, the case failed, and
the file was restored from a copy taken before the edit:

```text
 ❯ tests/setup.test.ts:17:30
     17|   expect(Object.keys(setup)).toEqual(['restoreMocks'])
       |                              ^
 Test Files  1 failed (1)
      Tests  1 failed (1)
```

Restored: `npm run test:setup` reports `Test Files  1 passed (1)` / `Tests  1 passed (1)`.

`tests/setupBrowser.test.ts` — no mutation control. The file cannot be collected, so no assertion in
it has ever run either red or green.

## The visit

Run in the fixed order.

1. `npm pkg set 'scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot --project guides'`.
2. `npx --no-install scaffold repair` blocked as the brief predicted:
   `TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it. test:setup is already declared, so the gate is missing rather than the script: invoke it by name from the test or prepublishOnly chain. Exclude configs from --groups to write another group.`
   That message's clause "test:setup is already declared" was false at the time it printed —
   `package.json` carried no `test:setup` — and the following `repair --groups manifest` is what
   wrote it. Report it upstream if scaffold's diagnostic is meant to be read literally.
3. `npx --no-install scaffold repair --groups manifest` → `1 written, 1 unchanged, 0 removed in ..`,
   writing `test:setup`.
4. `npm pkg set 'scripts.test=npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides'`.
5. `npx --no-install scaffold repair` clean → `0 of 128 planned paths drifted from the plan.` /
   `49 written, 80 unchanged, 0 removed in ..`. It added the `setup` project factory to
   `vite.config.ts` and registered it between `config` and `guides`, and refreshed the
   orchestration group.
6. `npm run format` → `Finished in 4205ms on 149 files using 4 threads.`

**Retained differing values `repair` named.** None beyond `test:guides`. That advisory was the only
`scripts` row, and it is adopted. No further differing-value line appeared in any `repair` run.

**Observation, not a criterion.** `npm pkg set` appended `test:setup` after `prepack` rather than
beside the other `test:*` scripts. The audit compares script values and not their order, so the
manifest reads clean; the placement is cosmetic.

## Gates

Each read bare, in order, at `/home/user/orkestrel/indexeddb`.

| Gate                  | Closing line                                                                   |
| --------------------- | ------------------------------------------------------------------------------ |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 5522ms on 149 files using 4 threads.` |
| `npm run lint:check`  | no diagnostic, exit code 0                                                     |
| `npm run check`       | `tsc --noEmit -p configs/src/tsconfig.browser.json`, no diagnostic, exit code 0 |
| `npm run build`       | `dist/src/browser/index.js  34.09 kB │ gzip: 8.56 kB │ map: 71.06 kB` / `✓ built in 2.36s` |
| `npm test`            | exit code 0 — `src:browser` `Test Files  8 passed (8)` / `Tests  112 passed (112)`; `policy` `1 passed (1)` / `93 passed (93)`; `config` `1 passed (1)` / `46 passed (46)`; `setup` `1 passed (1)` / `1 passed (1)`; `guides` `1 passed (1)` / `48 passed (48)` |

`npm run build` prints an API Extractor notice, not a failure:
`*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.`

## Closing audit

`npx --no-install scaffold audit` at exit:

```text
setup: The target at . carries a test setup module that no proof covers: tests/setupBrowser.ts. Add tests/setupBrowser.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

Closing table line: `0 of 128 planned paths drifted from the plan. Audit compared bytes at 116,
existence at 5, and nothing at 7. The plan does not own 7 further paths beneath its groups.`

The `scripts` advisory is gone and no path drifted. The remaining drift rows are the foreign
`orkestrel-human-journey` paths plus `.claude/agents/codex.md` and `.codex/agents/claude.toml`,
which the brief reserves for the Orchestrator, and the fleet-wide `typescript` advisory the brief
puts out of scope.

## Acceptance criteria

- **No `setup:` advisory at exit** — UNMET. The advisory names `tests/setupBrowser.ts`. See the
  deviation.
- **Every gate green, each read bare** — MET. See the gate table.
- **One mutation-control failing line per proof file, all restored** — MET for
  `tests/setup.test.ts`; not applicable to `tests/setupBrowser.test.ts`, which cannot be collected.

## Touched files

| File                       | Change                                                                          |
| -------------------------- | ------------------------------------------------------------------------------- |
| `tests/setup.test.ts`      | New. Proves `tests/setup.ts` adds no export.                                     |
| `package.json`             | `test:guides` adopted, `test:setup` written by `repair`, `test` chain invokes it. |
| `vite.config.ts`           | `setup` project factory added and registered, both written by `repair`.           |
| `package-lock.json`        | Untouched by this unit; carries the pre-dispatch `^0.0.52` re-pin.               |
| orchestration group files  | Refreshed by `repair`, not authored here.                                        |

Diffstat over the files this unit decided:

```text
 package.json   |  9 +++++----
 vite.config.ts | 13 ++++++++++++-
 tests/setup.test.ts | 19 +++++++++++++++++++ (new)
```

No commit. No git state change.

## Successor scope — the setupBrowser fix and its proof

**Outcome.** The `setup:` advisory is gone, `tests/setupBrowser.test.ts` is in place and green, and
every gate closes green. The proof needed no adjustment: it was moved back verbatim from
`tmp/units/setupBrowser.test.ts.blocked` and passed unchanged on its first run.

### One deliberate departure from the ruling's letter

The ruling asks for the block to be handled "the way the database module does". That module's
`deleteDatabase` resolves on `blocked`. `dropDatabase` documents the opposite — `@throws Thrown when
the request errors, and when a connection the caller left open blocks it` — and the shipped
`removeDatabase` it replaced rejects on both. Adopting the absorbing variant would change an
observable behavior, which the same ruling forbids and which the browser suites cannot catch:
absorbing a block lets the next test read the previous test's records through a database reporting
itself deleted, and that reads as a pass.

So the mechanism follows the database precedent — the native request driven directly against
`globalThis.indexedDB` — while the resolve and reject conditions and their two messages match
`removeDatabase` exactly. `@orkestrel/database` needed the absorbing variant because its own driver's
`close` resolves before Chromium releases the connection; `dropDatabase` already covers that with the
`waitForDelay()` it awaits first, which is why the browser suites hold at their previous counts.

### The module diff

```diff
--- a/tests/setupBrowser.ts
+++ b/tests/setupBrowser.ts
@@ -11,7 +11,6 @@ import type {
 import { createIndexedDBDatabase, IndexedDBError } from '@src/browser'
 import type { TeardownInterface } from '@orkestrel/test'
 import { waitForDelay } from '@orkestrel/test'
-import { removeDatabase } from '@orkestrel/test/browser'

 // ── IndexedDB test fixtures (real Chromium, real `indexedDB`) ────────────────
 //
@@ -22,8 +21,8 @@
 // per-file local opener. Each test keeps only its file-specific store / index
 // definitions, passed in as the schema.
 //
-// Deleting a database goes through {@link dropDatabase}, which composes the
-// shipped `removeDatabase` with the wait a close needs to land.
+// Deleting a database goes through {@link dropDatabase}, which drives the native
+// delete request itself after the wait a close needs to land.

 /**
  * Deletes an IndexedDB database after the connections closing it have finished
@@ -36,15 +35,35 @@
  *
  * @remarks
  * Close every connection to `name` before calling this. `IDBDatabase.close`
- * returns before the connection is gone, and `removeDatabase` reports a block as
- * a rejection rather than waiting one out, so a delete requested in the same task
- * as the close rejects on a connection that is already closing. The host timer
- * here gives that close a turn to complete. Deleting a database that was never
- * created succeeds, so this is safe as the first line of a test.
+ * returns before the connection is gone, and a block is reported as a rejection
+ * rather than waited out, so a delete requested in the same task as the close
+ * rejects on a connection that is already closing. The host timer here gives that
+ * close a turn to complete. Deleting a database that was never created succeeds,
+ * so this is safe as the first line of a test.
+ *
+ * The native request is driven here rather than through `removeDatabase` from
+ * `@orkestrel/test/browser`, which is the same contract: that module loads
+ * `vitest/browser`, which throws on import outside Browser Mode, so importing it
+ * puts this whole file out of reach of the Node-hosted `setup` project and leaves
+ * `tests/setupBrowser.test.ts` unable to prove any of the module. The resolve and
+ * reject conditions and their messages match that helper exactly.
+ *
+ * A block stays a rejection and is never absorbed. `blocked` fires while another
+ * connection is open, so a suite that swallowed it would let the next test read
+ * the previous test's records through a database reporting itself deleted.
  */
 export async function dropDatabase(name: string): Promise<void> {
 	await waitForDelay()
-	await removeDatabase(name)
+	await new Promise<void>((resolve, reject) => {
+		const request = globalThis.indexedDB.deleteDatabase(name)
+		request.addEventListener('success', () => resolve())
+		request.addEventListener('error', () => {
+			reject(new Error(`IndexedDB database "${name}" could not be deleted`))
+		})
+		request.addEventListener('blocked', () => {
+			reject(new Error(`IndexedDB database "${name}" is blocked by an open connection`))
+		})
+	})
 }
```

Nothing else in the module moved. Every exported name, signature, and behavior is unchanged, and no
consuming test file was touched.

### Mutation control for `tests/setupBrowser.test.ts`

The flattened index expectation's `byAge` entry was flipped from `false` to `true` in place, after a
snapshot of the file was taken. `npm run test:setup`:

```text
 ❯ tests/setupBrowser.test.ts:119:47
    119|   expect(readIndexes(SEED_USER_STORES.users)).toEqual({
       |                                               ^
    120|    byAge: ['age', true],

 Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 10 passed (11)
```

Restored from the snapshot. `sha256sum tests/setupBrowser.test.ts` reports
`917b34262c8920a414fa9ac26d272d5bacbcaabb46bb9ec5b454d54acb7f1eb9` both before the edit and after the
restore, so the file is byte-for-byte identical. Re-run green:
`Test Files  2 passed (2)` / `Tests  11 passed (11)`.

### Gates after the fix

| Gate | Closing line |
| --- | --- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 5637ms on 150 files using 4 threads.` |
| `npm run lint:check` | no diagnostic, exit code 0 |
| `npm run check` | `tsc --noEmit -p configs/src/tsconfig.browser.json`, no diagnostic, exit code 0 |
| `npm run test:setup` | `Test Files  2 passed (2)` / `Tests  11 passed (11)` |
| `npm run test:src` (the `src:browser` project, which runs `tests/src/browser/`) | exit code 0 — `Test Files  8 passed (8)` / `Tests  112 passed (112)` in 16.16s, the same counts the pre-fix run reported |
| `npm run build` | `dist/src/browser/index.js  34.09 kB │ gzip: 8.56 kB │ map: 71.06 kB` / `✓ built in 1.83s` |
| `npm test` | exit code 0 — `src:browser` `8 passed (8)` / `112 passed (112)`; `policy` `1 passed (1)` / `93 passed (93)`; `config` `1 passed (1)` / `46 passed (46)`; `setup` `2 passed (2)` / `11 passed (11)`; `guides` `1 passed (1)` / `48 passed (48)` |

### Closing audit

`npx --no-install scaffold audit`:

```text
dependencies: typescript declares major 6, while the registry serves major 7.
```

Closing table line: `0 of 128 planned paths drifted from the plan. Audit compared bytes at 116,
existence at 5, and nothing at 7. The plan does not own 7 further paths beneath its groups.`

The `setup:` advisory is gone. What remains is the fleet-wide `typescript` advisory the brief puts
out of scope, and the foreign drift rows the brief reserves for the Orchestrator.

### Acceptance criteria, restated

- **No `setup:` advisory at exit** — MET.
- **Every gate green, each read bare** — MET.
- **One mutation-control failing line per proof file, all restored** — MET for both proof files.

### Touched files, restated

| File | Change |
| --- | --- |
| `tests/setup.test.ts` | New. Proves `tests/setup.ts` adds no export. |
| `tests/setupBrowser.test.ts` | New. Proves the host-independent half of `tests/setupBrowser.ts`. |
| `tests/setupBrowser.ts` | `dropDatabase` drives the native delete request instead of importing `removeDatabase` from `@orkestrel/test/browser`. Exports, signatures, and behavior unchanged. |
| `package.json` | `test:guides` adopted, `test:setup` written by `repair`, `test` chain invokes it. |
| `vite.config.ts` | `setup` project factory added and registered, both written by `repair`. |
| `package-lock.json` | Untouched by this unit; carries the pre-dispatch `^0.0.52` re-pin. |
| orchestration group files | Refreshed by `repair`, not authored here. |

```text
 package.json               |   9 +++++----
 tests/setupBrowser.ts      |  37 ++++++++++++++++++++++++++---------
 vite.config.ts             |  13 ++++++++++++-
 tests/setup.test.ts        |  19 ++++++++++++++++++ (new)
 tests/setupBrowser.test.ts | 135 +++++++++++++++++++++++++++++++++ (new)
```

`tmp/units/setupBrowser.test.ts.blocked` is removed; the file it held now lives at
`tests/setupBrowser.test.ts`. No commit. No git state change. No deviation open.
