# Report — `d7n-rater-converge-fix` (rater's fix round on RT1 to RT7, carrying the closing sweep's items)

Wall clock: 2026-09-08T01:43:06Z (the first file this unit wrote, `tmp/d7n-rater-converge-fix/edit-tests.py`) to 2026-09-08T01:46:25Z (the last gate reading). The reading phase before that first write is not timestamped.

Touched files:

- `guides/rater.md` — the Validators guard table's `Shape` column and its convention sentence, the two domain rules moved into § Surface, lead-in sentences for the Errors, Validators, `Create a rater`, and Methods fences, and the `rate` cell carried by `--to guide`.
- `README.md` — the onboarding sentence links `@orkestrel/reason`, and that paragraph is rewrapped.
- `src/core/types.ts` — `RaterInterface.rate`'s description names `{@link RatingDefinition}`.
- `tests/guides.test.ts` — the header's third line and the overload case's name.

Diffstat:

```text
 README.md            |  7 ++++---
 guides/rater.md      | 56 ++++++++++++++++++++++++++++++----------------------
 src/core/types.ts    |  4 ++--
 tests/guides.test.ts |  4 ++--
 4 files changed, 40 insertions(+), 31 deletions(-)
```

## Item 1 — the Validators guard table (RT1, Ruling 20)

The `Shape` cell of each row is the type its `value is X` predicate narrows to, read from `src/core/validators.ts` (`isStage` from its `Guard<Stage>` annotation at `src/core/validators.ts:49`). The sentence pointing the reader at the declarations is gone; the convention sentence sits between the section's prose and the table, as the brief directs.

```diff
-What each guard checks, and what it leaves unchecked, is documented on the guard's own
-declaration.
-
-| API                  | Kind     | Summary                                                                |
-| -------------------- | -------- | ---------------------------------------------------------------------- |
-| `isStage`            | const    | Determines whether a value is a `Stage` literal.                       |
-| `isLineDefinition`   | function | Determines whether a value is an exact `LineDefinition` record.        |
+In a guard table a `Shape` cell holds the type the guard narrows to.
+
+| API                  | Kind     | Shape              | Summary                                                                |
+| -------------------- | -------- | ------------------ | ---------------------------------------------------------------------- |
+| `isStage`            | const    | `Stage`            | Determines whether a value is a `Stage` literal.                       |
+| `isLineDefinition`   | function | `LineDefinition`   | Determines whether a value is an exact `LineDefinition` record.        |
```

The remaining rows took the same shape: `isRatingDefinition` → `RatingDefinition`, `isEvidence` → `Evidence`, `isWorksheetFactor` → `WorksheetFactor`, `isWorksheetGroup` → `WorksheetGroup`, `isStep` → `Step`, `isWorksheet` → `Worksheet`, `isLineResult` → `LineResult`, `isRatingResult` → `RatingResult`. No `API`, `Kind`, or `Summary` cell moved.

## Item 2 — the paragraph at `:88-92` (RT2)

The `emitter` and `[Methods](#methods)` sentence stays as the Types table's note; the two domain rules land in the § Surface paragraph that states what a failed line carries, with the trailing clause closed.

```diff
 to. `total` is derived from every line's `amount` by a `TotalHandler` (default
-`sumAmounts`, overridable through `RaterOptions.total`), and only a line that
-succeeded carries an `amount`.
+`sumAmounts`, overridable through `RaterOptions.total`). A `LineResult` carries an
+`amount` only when its `worksheet.success` is `true`, and a `RatingResult`'s `success`
+is `true` only when every line's `worksheet.success` is `true`.
```

```diff
 `RaterInterface`'s `emitter` is a `readonly` data member and stays in this table's
 `Shape` cell; the interface's call-signature members are documented under
-[Methods](#methods). A `LineResult` carries an `amount` only when its
-`worksheet.success` is `true`, and a `RatingResult`'s `success` is `true` only when
-every line's `worksheet.success` is.
+[Methods](#methods).
```

The § Surface paragraph's own trailing clause "and only a line that succeeded carries an `amount`" was the loose form of the rule that moved in, so the precise sentence replaces it rather than sitting beside it.

## Item 3 — fence lead-ins (RT3, Ruling 21)

Each named fence gained one complete sentence between the table or heading and the fence:

```diff
 | `isRaterError` | function | Narrows a caught value to a `RaterError`.                       |

+The `isRaterError` guard narrows a caught value, so a handler reads the `code` member
+off it:
+
 ```ts
```

```diff
+Each guard answers `true` for a value of its own shape:
+
 ```ts
 import { isLineDefinition, isRatingDefinition, isStage } from '@orkestrel/rater'
```

```diff
 #### Create a rater

+The demonstration builds a rater over its own engine and destroys that rater:
+
 ```ts
```

```diff
+The array-of-lines and rating-definition forms of `rate` each take one subject and
+return equal results for the same lines:
+
 ```ts
 import { buildLineDefinition, createRater } from '@orkestrel/rater'
```

The brief's "any other fence directly under a heading" is empty: the awk scan under criterion 4 prints nothing, and the § Surface, definition-builder, evidence, and worksheet fences each already sat under a lead-in.

The claims these lead-ins make are executed: `answers every Validators fence guard call with true`, `narrows the Errors fence throw to a RaterError coded DESTROYED`, and the renamed overload case in `tests/guides.test.ts` assert them.

## Item 4 — `rate`'s description (RT4)

```diff
 	/**
-	 * Rates an array of lines, or a rating definition, against one subject over the
-	 * shared quantitative engine.
+	 * Rates an array of lines, or a {@link RatingDefinition}, against one subject over
+	 * the shared quantitative engine.
 	 */
```

`npm run docs -- --to guide` carried it: `rows read: 1, disagreements found: 1, written: 1, reported: 0`, and the guide's Methods cell now reads "Rates an array of lines, or a `RatingDefinition`, against one subject over the shared quantitative engine." The rewrap keeps no hyphenated compound at a line end (Ruling 22).

## Item 5 — the README's link (RT5)

```diff
 Create a rater with the `createRater` function, hand it the lines a subject is rated
 against, and read the `LineResult` rows and the `total` it derives. Inject a
-`ReasonInterface` where the rating shares an engine with the rest of your reasoning, and
-call `destroy()` when the rater's work is done. Environment-agnostic — no I/O, no browser
-or server assumptions. Part of the `@orkestrel` line.
+[`@orkestrel/reason`](https://github.com/orkestrel/reason) `ReasonInterface` where the
+rating shares an engine with the rest of your reasoning, and call `destroy()` when the
+rater's work is done. Environment-agnostic — no I/O, no browser or server assumptions.
+Part of the `@orkestrel` line.
```

The link form is the replaced paragraph's, read from `git show 9162d8a:README.md`: `[`@orkestrel/reason`](https://github.com/orkestrel/reason)`. The H1 blockquote is untouched, so the pitch still equals the guide's tagline.

## Item 6 — the test name (RT6)

```diff
-	it('returns equal results from both Methods fence rate overloads', () => {
+	it('returns equal results from the array-of-lines and rating-definition `rate` overloads', () => {
```

## Item 7 — the closing items (RT7, Rulings 13 and 21)

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
 // this repo's own `guides/README.md` manifest. The constants that follow are this
-// package's own, and are the only part a sibling package changes.
+// package's own, as is the executed section that closes the file.
```

The region from `const root = ` through the manifest loop's closing brace was already the pilot's byte for byte and stays so. Read on this tip with `tmp/d7n-rater-converge-fix/region.py`, which locates `const root = `, then `for (const entry of manifest) {`, then the first column-zero `}` after that loop line:

```text
$ python3 tmp/d7n-rater-converge-fix/region.py /home/user/fleet/abort/tests/guides.test.ts > tmp/d7n-rater-converge-fix/pilot.region.txt
  /home/user/fleet/abort/tests/guides.test.ts: lines 47..258
$ python3 tmp/d7n-rater-converge-fix/region.py tests/guides.test.ts > tmp/d7n-rater-converge-fix/mine.region.txt
  tests/guides.test.ts: lines 69..280
$ diff tmp/d7n-rater-converge-fix/pilot.region.txt tmp/d7n-rater-converge-fix/mine.region.txt
  region identical                                                            exit 0
```

## Item 8 — propagation

```text
$ npx oxfmt --write guides/rater.md README.md tests/guides.test.ts src/core/types.ts
  Finished in 969ms on 4 files using 4 threads.                               exit 0
$ npm run docs                    rows read: 1, disagreements found: 0                        exit 0
$ npm run docs -- --to guide      rows read: 1, disagreements found: 0, written: 0, reported: 0   exit 0
$ npm run docs -- --to source     rows read: 1, disagreements found: 0, written: 0, reported: 0   exit 0
```

`git status --short` is unchanged after the two write directions.

## Criterion 1 — status

```text
$ git status --short
 M README.md
 M guides/rater.md
 M src/core/types.ts
 M tests/guides.test.ts
```

Owned files only. The instruments sit under `tmp/d7n-rater-converge-fix/` (`edit-tests.py`, `edit-guide.py`, `region.py`, and the two region captures), which git ignores. `package.json` and `package-lock.json` were not touched, and no install ran.

## Criterion 2 — format, lint, typecheck

```text
$ npx oxfmt --check guides/rater.md README.md tests/guides.test.ts src/core/types.ts
  All matched files use the correct format.
  Finished in 639ms on 4 files using 4 threads.                               exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core
  no output                                                                   exit 0
$ npm run check
  > @orkestrel/rater@0.0.14 check:src:core
  > tsc --noEmit -p configs/src/tsconfig.core.json                            exit 0
```

## Criterion 3 — the seed

Recorded under item 8: `npm run docs` at `rows read: 1, disagreements found: 0`, and each write direction at `written: 0`.

## Criterion 4 — the greps

```text
$ grep -c 'In a guard table' guides/rater.md
  1
$ grep -n '^| API *| Kind *| Shape *| Summary' guides/rater.md
  130:| API                  | Kind     | Shape              | Summary  …
$ grep -n 'documented on the guard' guides/rater.md
  (no output)
$ grep -c '{@link RatingDefinition}' src/core/types.ts
  1
$ grep -c 'orkestrel/reason' README.md
  3
$ grep -n 'both Methods fence' tests/guides.test.ts
  (no output)
$ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
  (no output)
$ awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/rater.md
  (no output)
```

## Criterion 5 — the suites

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
  Test Files  1 passed (1)
       Tests  29 passed (29)
    Duration  733ms (transform 318ms, setup 291ms, import 224ms, tests 75ms)   exit 0
$ npm run test:policy
  Test Files  1 passed (1)
       Tests  90 passed | 1 skipped (91)
    Duration  847ms (transform 372ms, setup 195ms, import 229ms, tests 258ms)  exit 0
```

Observation, not a criterion:

```text
$ npm run test:src:core
  Test Files  4 passed (4)
       Tests  131 passed (131)
    Duration  1.18s (transform 696ms, setup 575ms, import 475ms, tests 659ms)  exit 0
```

Taken inside this unit's own exec while sibling units ran in other checkouts; the authoritative reading is the closure's.

## Ancillary decisions recorded

- **The guard table's `Shape` cell carries the narrowed type alone**, with no `readonly` or `\|` decoration, because every `value is X` predicate in `src/core/validators.ts` narrows to a single named type. `isStage` is annotated `Guard<Stage>` rather than written as a predicate, and its cell reads `Stage` on the same rule.
- **The convention sentence sits directly above the table**, after the section's posture prose, per the brief; Ruling 20's "between that table's own heading and the table" is satisfied with the prose kept, because the prose states the guards' posture rather than the column's idiom.
- **The § Surface paragraph's loose trailing clause was replaced rather than kept**, so the `amount` rule is stated once.
- **The Errors and Validators lead-ins name what the fence proves**, matching an executed case in `tests/guides.test.ts` rather than restating the table.
- **The README's onboarding paragraph was rewrapped** after the link went in, because the insertion left a short line mid-paragraph. `oxfmt` does not rewrap Markdown prose, so the rewrap is this unit's; no word changed in it beyond the link.
- **A banned-term sweep over the added lines** (`git diff -U0 … | grep '^+' | grep -niE '\b(should|simply|easy|easier|just|currently|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|please|dummy|blacklist|whitelist|sanity check|both|above|below)\b'`) prints nothing over `guides/rater.md`, `README.md`, `src/core/types.ts`, and `tests/guides.test.ts`.

## Deviation state

No deviation. Every acceptance criterion is closed and green. No `Shape` cell needed an expression Ruling 12 cannot hold, and no gate outside the owned files reddened.
