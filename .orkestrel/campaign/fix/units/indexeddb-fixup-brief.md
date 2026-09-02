# Unit indexeddb-fixup — close the indexeddb unit's subjective-lane findings

## Role and engine

`builder` on Claude Sonnet, a native subagent. You perform the assignment directly and spawn
nothing.

## Objective

The four required changes the subjective lane found outside its claims are closed as ruled in
`@orkestrel/indexeddb` at commit `0e5cf50`, and the guide states the `stores` asymmetry where a
reader meets it.

## Context

**Findings, each with its ruling** (`.orkestrel/campaign/fix/units/indexeddb-audit-verdict.md`
will record them):

1. **R1 — `src/browser/types.ts:331-332`.** The `IndexedDBStoreInterface` summary still reads
   "An object store — the full keyed CRUD surface, plus index, count, and cursor access." while
   its own `@remarks` and the guide describe the post-extraction shape. Ruling: rewrite the summary
   to "An object store — the keyed record surface plus the store's own schema metadata and
   `index` accessor." Leave the `@remarks` as it is.
2. **R2 — `guides/indexeddb.md:203`.** The paragraph "`IndexedDBUpgradeContext` itself carries
   only readonly data … so its rows stay in the Surface tables above. Its managers carry the
   upgrade's schema verbs." sits between the `IndexedDBTransactionStoreInterface` table and the
   `#### IndexedDBUpgradeStoreManagerInterface` heading, where a reader attaches it to the
   transaction store. It cannot take its own `####` heading (the parity test requires every
   `####` group to document a method). Ruling: move it into the `## Methods` preamble as a second
   paragraph, after the existing preamble paragraph (`:104`) and before
   `#### IndexedDBDatabaseInterface`, and reword it to: "`IndexedDBUpgradeContext` carries only
   readonly data — `transaction` / `old` / `version` / `stores` / `indexes` — so its Surface row
   earlier in this guide lists them and no Methods table follows for it. Its managers carry the
   upgrade's schema verbs: `context.stores` is the store manager, whose name list is `names`,
   while `IndexedDBDatabaseInterface.stores` is the plain name list." That last sentence closes
   referral F1 (state the asymmetry where the reader meets it) as ruled by the Orchestrator.
3. **R3 — `above` / `below` in prose this unit authored.** `.claude/rules/writing.md` § Code
   tokens, references, and links bans both. Ruling: `src/browser/IndexedDBStore.ts:77`, `:98`,
   `:140` — replace "// Overload selection, as in `get` above." with "// Overload selection, as in
   the `get` method."; `guides/indexeddb.md:119` — replace "Each extending table below repeats
   these rows" with "Each extending table that follows repeats these rows". The pre-existing
   instances at `guides/indexeddb.md:11,104,423` and `IndexedDBStore.ts:169` are outside this
   unit: do not touch them.
4. **R4 — `guides/indexeddb.md:283`.** The sentence "a non-record stored value reads `undefined`
   while the cursor still stops on that position and still exposes its `key` and `primary`" has
   no executed assertion for the `key` / `primary` clause. Ruling: in
   `tests/src/browser/IndexedDBCursor.test.ts`, the case "reports a non-record stored value as
   undefined, the same absence readRecord reports" (`:172-183`), add after the `value` expectation:
   `expect(seen.map((step) => step.key)).toEqual(['a', 'b'])` and
   `expect(seen.map((step) => step.primary)).toEqual(['a', 'b'])`. `drainCursor`
   (`tests/setupBrowser.ts:130`) returns one cursor snapshot per step, so the reads are per step.
5. **TSDoc opener voice (observation, ruled in).** Every other type block in `types.ts` opens with
   a noun phrase; the two managers open with a verb. Ruling: `src/browser/types.ts:109` "Manages
   the object stores of a version-change upgrade." → "The store manager of a version-change
   upgrade."; `:136` "Manages the secondary indexes of a version-change upgrade." → "The
   secondary-index manager of a version-change upgrade." Leave every `@remarks` and `@example`
   as it is.

Referral F2 (`open` as a state adjective on the database and a verb on the store manager;
`context.stores.open(name)` beside `transaction.store(name)`) stands as ruled and is recorded for
the next change; make no edit for it.

**Law.** `AGENTS.md`; `.claude/rules/writing.md`; `.claude/rules/documentation.md` § Parity;
`.claude/rules/tests.md`.

**Host.** Linux, bash. Repository `/home/user/fleet/indexeddb` at commit `0e5cf50`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, committed clean at launch, `node_modules` installed
with the closure staged (run `node /home/user/work/verify-stage.mjs indexeddb` if you doubt it).
Do not run `npm install`. Other gate chains run on this host concurrently; the browser project is
timing-sensitive, so if `npm test` fails on a timing-suspect test, re-run `npm run test:src` once
and report both readings.

**Standing conditions.** none.

## Unknowns

none.

## Scope

**Owned.** `src/browser/types.ts` (the named blocks only), `src/browser/IndexedDBStore.ts` (the
three comments only), `guides/indexeddb.md` (the named sites only),
`tests/src/browser/IndexedDBCursor.test.ts` (the named case only).

**Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `.claude/**`, `configs/**`, every other file, every other checkout.

**Tools and limits.** Read, Grep, Glob, Edit, Bash. No commit, stage, push, install, or discarding
`git` command. Tree-wide `format` only to converge after `npm run lint`; then the non-mutating
chain.

## Execution

A native subagent: perform the assignment directly and spawn nothing. Apply R4 first and run
`npm run test:src` to confirm the case still passes with the added assertions (quote the count),
then apply R1, R2, R3, and the voice edits, then run:

```text
npm run format:check && npm run lint:check && npm run check && npm run build && npm test
```

## Output

Return, as data: per finding — closed, with the file and line of the change, or stopped with the
deviation; the `test:src` count after R4; each gate command with its exit code and an excerpt for
any failure; `git diff --stat`; `git status --short`.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — when the added `key` / `primary` assertions fail (the cursor may not expose the
values the guide claims; that is a finding, not a test to weaken), or when a gate fails for a
cause you cannot attribute after the re-run. Decide, record, and carry on from the exact wording
of a moved sentence where the ruling's text does not fit its new position.

## Acceptance criteria

1. The `IndexedDBStoreInterface` summary names the record surface plus schema metadata and
   `index`.
2. The `IndexedDBUpgradeContext` paragraph sits in the `## Methods` preamble with the `stores`
   asymmetry sentence, and no paragraph remains between the transaction-store table and the
   store-manager heading.
3. `rg -n 'above|below' src/browser/IndexedDBStore.ts guides/indexeddb.md` returns only the four
   pre-existing lines named in R3.
4. The non-record cursor case asserts `key` and `primary` and passes.
5. The two manager blocks open with a noun phrase.
6. The gate chain exits 0.
7. `git status --short` lists only owned files.
