# Unit database-fixup — close the database unit's audit findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

The findings the objective and subjective lanes raised outside their claims are closed as ruled in
`@orkestrel/database` at commit `c7baae0`: the IndexedDB `column.remove` migration fails closed on
a non-record stored value and a test pins it; the frozen `INDEXABLE_STORAGE` claim has an executed
assertion; the `scan` rows agree with their intro; membership over the storage arrays reads
`includes`.

## Context

**Findings, each with its ruling.**

1. **F1 (objective) — `src/browser/drivers/IndexedDBDriver.ts:747-766`.** The `column.remove`
   step skips a cursor position whose `value` is `undefined` (the staged `@orkestrel/indexeddb`
   reports `undefined` exactly where the stored value is not a record). `DriverInterface`'s
   contract (`src/core/types.ts:400-403`) says malformed durable state "fails `open` /
   `metadata` closed; it is never treated as fresh, rewritten, or repaired automatically", so
   skipping relaxes the posture. Ruling: fail closed. Replace the skip with a throw in the same
   style as the existing one on that path:
   `throw new DatabaseError('MIGRATION', 'migrate: stored value is not a record', { table: step.table })`,
   drop the comment that explained the skip, and keep the rest of the loop as it is. Add one case
   to `tests/src/browser/drivers/IndexedDBDriver.test.ts` beside "a column.remove migration
   rewrites stored rows (verified post-reconnect)" (`:1251`), built the way that case seeds and
   reopens: seed the deployed schema with one real row, then store one non-record value (for
   example the number `42` under a distinct key) through the native store the way
   `@orkestrel/indexeddb`'s own cursor test does (`transaction.store(name).store.put(42, 'x')`
   inside a `write` scope on an `IndexedDBDatabase` opened on the same database name), then run
   the `column.remove` migration `open` and assert it rejects with a `DatabaseError` whose `code`
   is `MIGRATION`. Write the case first and run `npm run test:src -- IndexedDBDriver` to record it
   failing against the skip (quote the failing count), then change the branch. Add one sentence
   to the guide's IndexedDB migration contract — the paragraph at `guides/database.md:565`
   beginning "`IndexedDBDriver` performs a non-empty plan in one versionchange transaction" —
   stating that a stored value that is not a record fails the migration closed with `MIGRATION`
   and nothing is rewritten.
2. **R1 (subjective) — `src/browser/constants.ts:11-13` and `guides/database.md:144`.** The
   frozen-array claim has no executed assertion. Ruling: add to `tests/src/browser/helpers.test.ts`
   (the browser tests carry no `constants.test.ts`; place the case in a `describe('INDEXABLE_STORAGE')`
   block) an assertion that `Object.isFrozen(INDEXABLE_STORAGE)` is `true` and that its members
   are exactly the list the constant declares, read from `@src/browser`.
3. **R2 (subjective) — `guides/database.md:308` against `:335` and the intro at `:319-323`.**
   The `DriverInterface` `scan` row promises ascending key order while the `StorageInterface`
   row does not, and the intro says the inherited rows carry the same contract. Every driver's
   `scan` yields in key order (`MemoryDriver.ts:43`, `JSONDriver.ts:771`, `IndexedDBDriver.ts:683`,
   and `SQLiteDriver.ts:631` orders by the primary column). Ruling: the `StorageInterface` row
   reads "Iterate a table's rows in ascending key order inside the transaction." and the
   `DriverInterface` row keeps "Iterate a table's rows in ascending key order."; change nothing
   else in either table.
4. **Referral (subjective), ruled by the Orchestrator — membership form.** `src/browser/helpers.ts:166`
   and `src/server/helpers.ts:163` read membership as `.some((storage) => storage === column.storage)`
   where `includes(column.storage)` is the plain expression on a `readonly ColumnStorage[]`.
   Ruling: both read `.includes(column.storage)`, and the `INDEXABLE_STORAGE` TSDoc sentence
   "a consumer holding it reads the membership with `some`" reads "with `includes`". Leave the
   `EXACT_COLUMN_STORAGE` TSDoc alone unless it names `some`.

**Law.** `AGENTS.md`; `.claude/rules/tests.md` (real IndexedDB, no mock); `.claude/rules/documentation.md`
§ Parity; `.claude/rules/writing.md`.

**Host.** Linux, bash. Repository `/home/user/fleet/database` at commit `c7baae0`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed with
the closure staged (`node /home/user/work/verify-stage.mjs database` reports every dependency OK).
Do not run `npm install`. Other gate chains run on this host concurrently; the browser project is
timing-sensitive, so if `npm test` fails on a timing-suspect test, re-run `npm run test:src` once
and report both readings.

**Standing conditions.** none.

## Unknowns

Whether the non-record value can be seeded through `@orkestrel/indexeddb` on the same database
name while the driver is closed; if the seeding path you find differs from the sketch in finding 1,
use the real path and report it.

## Scope

**Owned.** `src/browser/drivers/IndexedDBDriver.ts` (the `column.remove` branch only),
`src/browser/constants.ts` (the TSDoc sentence only), `src/browser/helpers.ts:166`,
`src/server/helpers.ts:163`, `guides/database.md` (the two `scan` rows and the one migration
sentence only), `tests/src/browser/drivers/IndexedDBDriver.test.ts` (the new case only),
`tests/src/browser/helpers.test.ts` (the new block only).

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every vendored guide mirror under `guides/`,
every other file, every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply finding 1 with its
failing-first run, then findings 2, 3, and 4, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the failing-first count and the passing count for finding 1; the seeding path used;
each gate command with its exit code and an excerpt for any failure; `git diff --stat`;
`git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the non-record value cannot be seeded from the test at all, when the new throw
breaks an existing test the rulings did not anticipate, or when a gate fails for a cause you cannot
attribute after the re-run. Decide, record, and carry on from the exact wording of the guide
sentence.

## Acceptance criteria

1. The new IndexedDB case failed before the branch change and passes after it, and `open` rejects
   with `MIGRATION` on a non-record stored value.
2. `tests/src/browser/helpers.test.ts` asserts `INDEXABLE_STORAGE` is frozen with its exact
   members.
3. Both `scan` rows name ascending key order.
4. `rg -n '\.some\(\(storage\)' src` returns no hit and the `INDEXABLE_STORAGE` TSDoc names `includes`.
5. The gate chain exits 0.
6. `git status --short` lists only owned files.
