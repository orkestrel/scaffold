# Report — `d7n-indexeddb-close`

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

`guides/indexeddb.md`:

- `### Constants` gained the `Shape` column and its convention sentence "A `Shape` cell holds the constant's declared type." with `ERROR_CODES`'s cell holding its declared type, `Readonly<Record<string, IndexedDBErrorCode>>`.
- `### Types`' convention sentence gained the Ruling 21 clause "An extended interface's name comes before `plus`, with the members it adds after."
- `IndexedDBStoreInterface`'s cell changed from `{ name, path, indexes, increment } plus get, resolve, records, keys, has, count, set, add, remove, clear, index, cursor` to `IndexedDBRecordStoreInterface plus { name, path, indexes, increment } plus index`.
- `IndexedDBTransactionStoreInterface`'s cell changed from `{ store } plus get, resolve, records, keys, has, count, set, add, remove, clear, cursor` to `IndexedDBRecordStoreInterface plus { store }`.
- Deleted the now-false guide-body sentence "An extending interface's cell lists every member it declares or inherits, so `IndexedDBStoreInterface` and `IndexedDBTransactionStoreInterface` each carry the `IndexedDBRecordStoreInterface` verbs." — the cell now names the parent instead of flattening inherited members.
- `IndexDefinition`, `StoreDefinition`, `IndexedDBUpgradeContext`, `IndexedDBDatabaseOptions`, and `IndexedDBCursorOptions` carry no `plus` because each declaration in `src/browser/types.ts` (read directly: lines 85-90, 102-106, 181-187, 217-222, 232-235) has data members only and no call-signature member — no `plus` applies, so these rows are unchanged.
- No `Shape` cell spells a member's type and no cell holds `…`: `grep -n '| interface *| \`{[^\`]*:' guides/indexeddb.md` and `grep -n '…' guides/indexeddb.md` (both against the whole file) print nothing inside a `Shape` cell — the two `…` hits sit in plain prose (a `.claude/rules/patterns.md` cross-reference and a `DOMException.name` list), not in a `Shape` column.

## Item 2 — member references

Brief's site list was `(none)`. No `{@link}` sites needed rewriting; nothing changed here.

## Item 3 — the drop-in's canon (Rulings 13 and 20)

`tests/guides.test.ts`:

- The region from `const root = new URL('../', import.meta.url)` (line 49) through the manifest loop's closing brace (line 260) already matched the pilot's `/home/user/fleet/abort/tests/guides.test.ts:47-258` byte for byte before this unit ran — confirmed with `diff` over both regions, exit 0, no output.
- The header (lines 1-3) did not match: line 2 read "The four constants below are this" and line 3 read "package's own, and are the only part a sibling package changes." Rewrote both to the pilot's Ruling 21 canon: "The constants that follow are this" / "package's own, as is the executed section that closes the file."
- The `INTERNAL` doc block read "the second assertion below fails when a name" (line 41). Rewrote to the pilot's "the assertion that follows it fails when a name", matching Ruling 13's original correction.

## Item 4 — fence lead-ins (Ruling 21)

Added one lead-in sentence between each listed heading and its directly-following fence in `guides/indexeddb.md`: `## Surface`; `### Feature-detecting before opening a database` (titled, per Ruling 9 — names what the demonstration builds); `### Index-backed reads with key ranges`; `### Cursor streaming and in-place mutation`; `### Seeking an index cursor to one primary key`; `### Connection lifecycle: connect, close, drop`; `### Reading, testing, and clearing a store`; `### Explicit transaction control and cursor movement`; `### The request-boundary helpers directly`; `### Branching on a typed fault`; `### Narrowing a caught value with `isIndexedDBError``. `### Versioned upgrades …` was correctly excluded from the brief's list because a blockquote sits between its heading and its fence.

## Item 5 — propagation

Ran, in order: `npx oxfmt --write guides/indexeddb.md tests/guides.test.ts` (reformatted the two edited tables' column widths in `guides/indexeddb.md`; `tests/guides.test.ts` needed no formatting change), then `npm run docs`, `npm run docs -- --to guide`, `npm run docs -- --to source`.

## Acceptance criteria

1. `git status --short` → `M guides/indexeddb.md` and `M tests/guides.test.ts` only — the owned files.
2. `grep -n '| interface *| \`{[^\`]*:' guides/indexeddb.md` → no output. `grep -n '…' guides/indexeddb.md` → two hits, both in prose outside a `Shape` cell (line 250, line 425). Every table carrying `Shape` (`### Constants`, `### Types`) has its convention sentence between the heading and the table.
3. The item 3 region diff against the pilot: `diff` over `abort/tests/guides.test.ts:47-258` and `indexeddb/tests/guides.test.ts:49-260` → exit 0, no output. Lines 1-3 diff against the pilot's → exit 0, no output.
4. `npx oxfmt --check guides/indexeddb.md tests/guides.test.ts` → "All matched files use the correct format." exit 0. `npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` → no output, exit 0.
5. `npm run docs` → `rows read: 1, disagreements found: 0`, exit 0. `npm run docs -- --to guide` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`, exit 0. `npm run docs -- --to source` → `rows read: 1, disagreements found: 0, written: 0, reported: 0`, exit 0.
6. `npm run test:guides` → `Test Files 1 passed (1)`, `Tests 71 passed (71)`, `Duration 479ms`, exit 0. `npm run test:policy` → `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, `Duration 1.05s`, exit 0.

## Deviation

None. All items closed as briefed; no `Shape` cell that Ruling 12 could not express, no equality-case red, no gate outside the owned files went red, no disagreement `--to guide` failed to close.

Instruments under `/home/user/fleet/indexeddb/tmp/d7n-indexeddb-close/`: `oxfmt-write.log`, `oxfmt-check.log`, `oxlint.log`, `docs.log`, `docs-to-guide.log`, `docs-to-source.log`, `test-guides.log`, `test-policy.log`, `final.diff`.

---

Orchestrator's annotation (2026-09-08, closure): the checker ruled claim 2 FAIL on this report's prose alone (a count stated about a growable set); every citation was verified against the tree, and the tree is authoritative.
