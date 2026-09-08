# Report — `d7n-budget-close`

## Item 1 — the `Shape` idiom (Rulings 15, 18, 20)

The `### Validators` table lacked the `Shape` column (Ruling 20). Added the guard sentence and a
`Shape` cell per row, read from `src/core/validators.ts`'s `value is` predicates:

```diff
 ### Validators
 
-| API              | Kind     | Summary                                                                                                                              |
-| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
-| `isBudgetAmount` | function | Determines whether a value is a finite nonnegative budget amount.                                                                    |
-| `isBudgetSignal` | function | Determines whether a value is a genuine native `AbortSignal`, returning `false` rather than throwing on hostile input.               |
-| `isTokenScope`   | function | Determines whether a value is a supported `TokenScope` field selector.                                                               |
-| `isTokenUsage`   | function | Determines whether a value is readable token usage carrying three finite nonnegative counts, returning `false` rather than throwing. |
+In a guard table a `Shape` cell holds the type the guard narrows to.
+
+| API              | Kind     | Shape         | Summary                                                                                                                              |
+| ---------------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
+| `isBudgetAmount` | function | `number`      | Determines whether a value is a finite nonnegative budget amount.                                                                    |
+| `isBudgetSignal` | function | `AbortSignal` | Determines whether a value is a genuine native `AbortSignal`, returning `false` rather than throwing on hostile input.               |
+| `isTokenScope`   | function | `TokenScope`  | Determines whether a value is a supported `TokenScope` field selector.                                                               |
+| `isTokenUsage`   | function | `TokenUsage`  | Determines whether a value is readable token usage carrying three finite nonnegative counts, returning `false` rather than throwing. |
```

Checked the flagged `plus`-less interface rows (`BudgetOptions`, `TokenBudgetOptions`, `TokenUsage`)
against `src/core/types.ts`: none declares a call-signature member (`BudgetOptions.consumer` is a
data property of function type, not a method), so each cell's existing `{ … }` form with no `plus`
is already correct and took no edit. No interface row spells a member's type, no guard/constants
table other than Validators sits off canon, and no extended interface exists in this guide.

## Item 2 — member references

No site listed; `npm run docs` reports `rows read: 1, disagreements found: 0` on the installed head
start with no member-reference row to reconcile. No edit.

## Item 3 — the drop-in's canon (Rulings 13, 20, 21)

The drop-in region from `const root = new URL('../', import.meta.url)` through the manifest loop's
closing brace already matched the pilot's `/home/user/fleet/abort/tests/guides.test.ts` byte for
byte (confirmed by re-diffing the region under the fresh edits: no output). Two corrections outside
that region, both against the pilot's canon:

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
 // this repo's own `guides/README.md` manifest. The constants that follow are this
-// package's own, and are the only part a sibling package changes.
+// package's own, as is the executed section that closes the file.
```

```diff
  * intentional rather than forgotten — and the `INTERNAL.filter` assertion later in this file
- * fails when a name here stops being stranded, so the list cannot rot.
+ * intentional rather than forgotten — and the assertion that follows it fails when a name
+ * here stops being stranded, so the list cannot rot.
```

(second hunk collapsed for display; the applied edit rewraps the two lines to the pilot's exact
wording and line break.)

## Item 4 — fence lead-ins (Ruling 21)

No fence in `guides/budget.md` sits directly under a heading; every fence has an intervening
sentence. No edit.

## Item 5 — propagation

Ran in order; no edit resulted beyond the two files already touched by items 1 and 3.

## Acceptance criteria

1. `git status --short`:
```text
 M guides/budget.md
 M tests/guides.test.ts
```
Owned files only.

2. `grep -n '| interface *| `{[^`]*:' guides/budget.md` and `grep -n '…' guides/budget.md` both
   print nothing. The `### Types` table's convention sentence sits under its heading unchanged; the
   `### Validators` table's guard sentence now sits under its heading (item 1 diff).

3. Region diff (`const root = ` through the manifest loop's closing brace) against the pilot:
```text
(no difference)
```
Header line 2 equals the pilot's; line 3 and the `INTERNAL` block now match the pilot's bytes
(item 3 diffs).

4.
```text
$ npx oxfmt --check guides/budget.md tests/guides.test.ts
All matched files use the correct format.
Finished in 692ms on 2 files using 4 threads.
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts
exit 0
```

5.
```text
$ npm run docs
rows read: 1, disagreements found: 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

6.
```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  29 passed (29)
   Duration  467ms (transform 135ms, setup 47ms, import 225ms, tests 49ms, environment 0ms)
exit 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  540ms (transform 140ms, setup 38ms, import 140ms, tests 227ms, environment 0ms)
exit 0
```

Wall clock for the full sequence (edits plus every command in this report): under 20 seconds
measured wall time across the individual command timings above.

---

Orchestrator's annotation (2026-09-08, closure): the checker ruled claim 2 FAIL on this report's prose alone (a count stated about a growable set); every citation was verified against the tree, and the tree is authoritative.
