# Report — `d7n-reason-close`

Checkout `/home/user/fleet/reason`, tip `684fd45`. Owned files touched: `guides/reason.md`, `tests/guides.test.ts`.

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

Read every interface the brief listed against `src/core/types.ts`: none declares a call-signature member, so no row needed a `plus` clause — the flagged rows were already correct bare-name braces. The single real gap was the `### Constants` table, which carried no `Shape` column. Added the column with the constants sentence and each constant's widened declared type read from `src/core/constants.ts` (`boolean`, `number`, `ReadonlySet<MathOperation>`, `string`, `unique symbol`).

```diff
 ### Constants
 
-| API                        | Kind  | Summary                                                                                                                                                                            |
-| -------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
-| `DEFAULT_REASON_BAIL`      | const | Holds the default `bail` for the `Reason` orchestrator — a reasoner throw is rethrown after the `error` emit. Default: `true`.                                                     |
+A `Shape` cell holds the constant's declared type.
+
+| API                        | Kind  | Shape                        | Summary                                                                                                                                                                            |
+| -------------------------- | ----- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
+| `DEFAULT_REASON_BAIL`      | const | `boolean`                    | Holds the default `bail` for the `Reason` orchestrator — a reasoner throw is rethrown after the `error` emit. Default: `true`.                                                     |
 … (every subsequent row gained its `Shape` cell the same way)
```

The `### Validators` table is a dedicated guard table (every row an `is*` guard), but the brief's enumerated findings for "Guard and constants tables, and convention sentences off the canon" name line 281 (Constants) alone, so it is out of this unit's fixed scope and left unchanged.

## Item 2 — member references

Brief's site list: `(none)`. `npm run docs` reports `disagreements found: 0`, confirming no `Owner#member` / `#member` drift.

## Item 3 — the drop-in's canon (Rulings 13 and 20)

Reverted the hoisted `findDrift` optimization the file had accreted (a comment plus `const drifts = findDrift(guide, source)` before the `describe`, and `for (const drift of drifts)` inside the equality case) back to the pilot's per-case `findDrift(guide, source)` call, and corrected the header's second and third lines to the pilot's Ruling 21 text.

```diff
-// this repo's own `guides/README.md` manifest. The constants below are this
-// package's own, and are the only part a sibling package changes.
+// this repo's own `guides/README.md` manifest. The constants that follow are this
+// package's own, as is the executed section that closes the file.
@@
-	// `findDrift` walks every documented row against every source declaration, which on a
-	// guide this size costs seconds rather than milliseconds (5192 ms measured on this
-	// guide, 2026-09-07). Computing it here rather than inside the case keeps that cost
-	// out of the per-test budget, the way the preceding readers already sit here.
-	const drifts = findDrift(guide, source)
@@
-			for (const drift of drifts) {
+			for (const drift of findDrift(guide, source)) {
```

`diff` of the region from `const root = ` through the manifest loop's closing brace against `/home/user/fleet/abort/tests/guides.test.ts`'s same region printed nothing (exit 0). Line 2 equals the pilot's. The `INTERNAL` block already carried the pilot's sentence.

## Item 4 — fence lead-ins (Ruling 21)

Brief's list: `(none)`. Confirmed with a script walking every heading/fence pair in `guides/reason.md`: no fence sits directly under a heading with only blank lines between.

## Item 5 — propagation

- `npx oxfmt --write guides/reason.md tests/guides.test.ts` — formatted the constants table.
- `npm run docs` — `rows read: 1, disagreements found: 0`.
- `npm run docs -- --to guide` — `rows read: 1, disagreements found: 0, written: 0, reported: 0`.
- `npm run docs -- --to source` — `rows read: 1, disagreements found: 0, written: 0, reported: 0`.

## Acceptance criteria

1. `git status --short`:
```
 M guides/reason.md
 M tests/guides.test.ts
```
Owned files only.

2. `grep -n '| interface *| \`{[^\`]*:' guides/reason.md` — no output (exit 1). `grep -n '…' guides/reason.md` — the ellipsis character appears twice in guide-body prose (a code-example comment and a bullet), neither inside a `Shape` cell.

3. Region diff against the pilot (`const root = ` through the manifest loop's closing brace): empty (exit 0). Line 2 equals the pilot's.

4. `npx oxfmt --check guides/reason.md tests/guides.test.ts`:
```
Checking formatting...
All matched files use the correct format.
Finished in 707ms on 2 files using 4 threads.
```
exit 0.
`npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts` — exit 0, no output.

5. `npm run docs` — `rows read: 1, disagreements found: 0`. Both write directions — `written: 0` (shown under item 5).

6. `npm run test:guides`:
```
 Test Files  1 passed (1)
      Tests  97 passed (97)
   Duration  1.20s
```
exit 0, the equality case green under the default budget.

`npm run test:policy`:
```
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.01s
```
exit 0.

## Deviations

None. The Validators guard table was evaluated against Ruling 20's guard-table trigger and found out of the brief's enumerated scope (see item 1); recorded as an ancillary decision rather than a stop, per the deviation contract's scope for ancillary matters.
