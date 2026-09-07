# Brief — `d7n-indexeddb-converge-fix` (indexeddb's fix round on the audit's findings)

## Role and engine

`implementer` on Claude Opus 5. Sole writer in `/home/user/fleet/indexeddb` from the committed tip `b157a60` (clean; `@orkestrel/guide@0.0.18` installed `--no-save`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing. Put every instrument under `tmp/d7n-indexeddb-converge-fix/` inside this checkout.

## Read first

`/home/user/scaffold/AGENTS.md` § Writing; `/home/user/scaffold/.claude/rules/writing.md`; `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `/home/user/scaffold/.orkestrel/campaign/docs-parity/rulings.md` § Ruling 7, § Ruling 12, § Ruling 14, § Ruling 15, § Ruling 16; `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7n-single-face-audit-verdict.md`; the pilot's Types table `/home/user/fleet/abort/guides/abort.md:58-67`; `/home/user/fleet/budget/guides/budget.md:60-68` (a `plus` row); `tests/guides.test.ts:260-` (the flagship fence transcriptions).

## Items

1. **The `Shape` column (I1, Ruling 15).** `### Types` (`guides/indexeddb.md:85-106`) heads `API | Kind | Shape | Summary` under Ruling 15's convention sentence; each interface row's data members as bare names with `?`, `plus` its call-signature members, read from `src/browser/types.ts` (`IndexedDBDatabaseInterface` `{ database, name, version, stores, open } plus connect, …`; the cursor, transaction, store, index, and upgrade-manager interfaces; `IndexDefinition` `{ name, path, unique?, multiple? }`, `StoreDefinition`, `IndexedDBDatabaseOptions` `{ name, version?, stores, upgrade? }`, `IndexedDBCursorOptions`, `IndexedDBUpgradeContext`); each type alias's own literal (`Row`, `KeyPath`, `IndexedDBSchema`, `IndexedDBErrorCode`, arms escaped as `\|`). Delete the paragraph at `:108` ("The data-only shapes carry these members …") and every "Its readonly data members are …" line under a `####` heading in `## Methods` (`:122` and its siblings), and the `IndexedDBUpgradeContext` paragraph's member list (its behavioural sentence about `context.stores` stays); the `## Methods` intro sentence "Each interface's `readonly` data members are named in the paragraph under its own heading in this section" points at the `Shape` column instead.
2. **Remarks restating the description (I2).** `src/browser/IndexedDBTransaction.ts:11-15`: cut the trailing "and typed, scope-bound store access" from the remark's first sentence; `src/browser/errors.ts:12-16`: replace the remark's opener with the part the description does not carry (that `code` is an {@link IndexedDBErrorCode} and the native error rides as the standard `cause`).
3. **The opening prose (I3).** `guides/indexeddb.md:8` restates the tagline's closing clause ("into one you can `await`"); recast to keep the characterization and drop the repeated proposition — for example "It types IndexedDB's event-driven, callback-shaped, structurally-untyped surface and adds nothing more."
4. **The fuller demonstration (I4, Ruling 14).** The primary factory's titled example (`src/browser/factories.ts:21-29`, the fence under `guides/indexeddb.md:262`) lost the schema demonstration the baseline carried: extend the fence to declare `users: { path: 'id', indexes: [{ name: 'byAge', path: 'age' }] }` and show one index-backed read inside the `if`, keeping the heading; carry the body into the block with `npm run docs -- --to source`; where a flagship fence transcription case in `tests/guides.test.ts` asserts this fence's behaviour, extend that case to the grown fence (never delete an assertion).
5. **All-caps (I5).** `guides/indexeddb.md:327` "AND", `:348` "NEW" → plain wording ("closes and deletes", "the new position" where `new` names a value is permitted; write the sentence without the emphasis).
6. **The heading stays (Ruling 16).** `### Stores, indexes, cursors, transactions` at `:44` is not renamed.
7. **Propagation.** `npx oxfmt --write <paths>` after edits; `--to guide` after any description edit; `npm run docs` at `rows read: 1, disagreements found: 0`; both write directions at `written: 0`.

## Scope

Owned: `guides/indexeddb.md`, the doc blocks under `src/browser/**` (no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including `README.md`, every vendored file, `package.json`, `package-lock.json`, `tests/src/**`, `tests/setup*.ts`.

## Acceptance criteria, cheapest first

1. `git status --short` lists owned files only.
2. `npx oxfmt --check <owned paths>`, `npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>`, `npm run check` exit 0.
3. `npm run docs` at zero, both directions `written: 0`.
4. The convention sentence once above `### Types`; no `interface` row's `Shape` cell carries `:`; `grep -n 'readonly data members are\|data-only shapes carry' guides/indexeddb.md` prints nothing; `grep -n ' AND \| NEW ' guides/indexeddb.md` prints nothing.
5. `npm run test:guides` and `npm run test:policy` exit 0 (record the summaries); the browser suite over the flagship transcriptions green (`npm run test:src:browser` as an observation with its reading; the Orchestrator takes the deciding run).

## Output

`/home/user/scaffold/tmp/units/d7n-indexeddb-converge-fix-report.md`: per item the hunk, per criterion the command and its last lines, the wall clock. No count in prose. No process diary. Re-read every citation against the tree you leave.

## Deviation contract

Stop on a gate outside the owned files going red, a `Shape` cell Ruling 12 cannot express, or a fence claim that needs a code change. Decide ancillary matters and record them.
