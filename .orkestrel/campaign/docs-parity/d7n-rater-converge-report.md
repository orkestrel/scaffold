# Report — P.2 `d7n-rater-converge` (rater under the equality gate)

Wall clock: 2026-09-07T21:21:53Z (the first file this unit wrote, `tmp/d7n-rater-converge/guides.test.ts.baseline`) to 2026-09-07T21:32:49Z (the last gate reading). The reading phase before that first write is not timestamped.

Touched files: `guides/rater.md` (tagline, opening prose, every table, the demonstrating fence's heading, § Tests), `README.md` (the pitch blockquote and the onboarding paragraph), `src/core/types.ts` (`LineResult`, `RaterOptions`, `RaterInterface` remarks; `emitter`, `rate`, `destroy` member blocks added), `src/core/errors.ts` (`RaterError` remarks), `src/core/factories.ts` (`createRater` description, the `@example` title), `src/core/helpers.ts` (`buildLineDefinition`, `buildRatingDefinition` descriptions), `src/core/validators.ts` (every guard's remarks), `src/core/Rater.ts` (class remarks), `tests/guides.test.ts` (the gate cases and the canonical drop-in text).

Diffstat:

```text
 README.md              |  21 +++---
 guides/rater.md        | 198 ++++++++++++++++++++++++++++---------------------
 src/core/Rater.ts      |  10 +--
 src/core/errors.ts     |   3 +-
 src/core/factories.ts  |   5 +-
 src/core/helpers.ts    |   7 +-
 src/core/types.ts      |  17 ++++-
 src/core/validators.ts |  78 +++++++++++++------
 tests/guides.test.ts   |  80 ++++++++++++++++++--
 9 files changed, 284 insertions(+), 135 deletions(-)
```

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` after adding the gate cases and before any guide, README, or doc-block edit:

```text
 Test Files  1 failed (1)
      Tests  3 failed | 26 passed (29)
```

`pairs at least one example title across the guide and the source` — first lines:

```text
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/rater.md pairs: guide [\"Surface\",\"Errors\",\"Validators\",\"Helpers\",\"Helpers\",\"Helpers\",\"Factories\",\"RaterInterface\"] source []",
 ❯ tests/guides.test.ts:115:19
```

`opens the README with the guide tagline` — first lines:

```text
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:129:20
    129|  expect(pitch).not.toBeUndefined()
```

`Rater > keeps every compared summary and example equal to its source` — first lines:

```text
AssertionError: expected [ …(42) ] to deeply equal []
+   "guides/rater.md type Stage: guide absent source \"Names a worksheet derivation step stage.\"",
+   "guides/rater.md type RaterErrorCode: guide absent source \"Names a coded `RaterError` programmer-error code.\"",
+   "guides/rater.md type TotalHandler: guide absent source \"Represents a pure total port over resolved lines.\"",
 ❯ tests/guides.test.ts:210:24
```

The collected list is the brief's worklist minus its `pitch` row, which the file-scope README case owns. No control was planted: the unconverged tree reddened the equality case, the pin, and the README case on its own, so there is no reversal to record.

## Criterion 2 — headers and class rows

Header rows before and after, read by splitting on a pipe not preceded by a backslash (`tmp/d7n-rater-converge/cells.py`, run against `git show HEAD:guides/rater.md`):

```text
  before: Type | Kind | Shape                              after: Type | Kind | Shape | Summary
  before: API | Kind | Summary                             after: API | Kind | Summary
  before: API | Kind | Checks | Leaves unchecked and why   after: API | Kind | Summary
  before: API | Kind | Summary                             after: API | Kind | Summary
  before: API | Kind | Builds…                             after: API | Kind | Summary
  before: API | Kind | Summary                             after: API | Kind | Summary
  before: Method | Returns | Behavior                      after: Method | Returns | Summary
```

`### Entities` became `### Classes`: its only row's `Kind` is `class`. `Rater` is the only class documented under an H3 in this guide and already carried that row, so no row was added.

Non-`Summary` cell comparison against the baseline, from the same instrument: every `Type`, `API`, `Method`, `Kind`, and `Returns` cell is byte-identical to the baseline. The cells that moved are exactly the ones the brief names:

- Every `Shape` cell dropped its trailing em-dash prose clause, the type literal staying (`Stage`, `RaterErrorCode`, `TotalHandler`, `LineDefinition`, `RatingDefinition`, `Evidence`, `WorksheetFactor`, `WorksheetGroup`, `Step`, `Worksheet`, `LineResult`, `RatingResult`, `RaterOptions`).
- `RaterEventMap` took Ruling 19's bare member names: `` `Rater`'s push observation surface — `rate(subject, result)`. `` → `` `{ rate }` ``.
- `RaterInterface` took Ruling 12's `plus`: the prose cell → `` `{ emitter } plus rate, destroy` ``.
- The `Checks` and `Leaves unchecked and why` columns were removed from the Validators table, and `Builds…` and `Behavior` were renamed `Summary`.

Ruling 15's convention sentence sits above the Types table, the only table carrying `Shape`, in the fleet wording.

## Criterion 3 — the doc blocks and the propagation

Rows whose literal stayed in `Shape` and whose clause moved into the doc block: every Types row named earlier. Each clause was already carried by its declaration's description paragraph or its `@remarks`, so no clause was lost. `LineResult`'s `amount` presence rule and `RatingResult`'s `success` rule are facts no compared block can hold, and they landed in the guide's prose beside the Types table.

Blocks rewritten by hand, before `--to guide`:

- `src/core/factories.ts` `createRater` — description now states the contract it returns (`Creates a rating orchestrator over the shared quantitative engine, seeded from {@link RaterOptions} and returning a {@link RaterInterface}.`), which is what the removed `Builds…` cell carried.
- `src/core/helpers.ts` `buildLineDefinition` and `buildRatingDefinition` — distinct descriptions carrying the id, name, required member, and `overrides` merge the old cells carried; the guide's fence prose above them was trimmed to what the descriptions no longer repeat.
- `src/core/errors.ts` `RaterError` — `@remarks` gained the `context` sentence the old cell carried; the code list landed in the guide's prose above the Errors table, because no compared block can hold a class's readonly data member fact in its summary.
- `src/core/validators.ts` — every guard's `@remarks` gained the removed `Checks` and `Leaves unchecked and why` content, sentence by sentence; `isStage` gained a `@remarks` where it had none. The guide names their new home in one sentence above the table.
- `src/core/types.ts` — `RaterInterface` gained member doc blocks on `emitter`, `rate`, and `destroy`; the `rate` and `destroy` blocks are what closed the `RaterInterface.rate: guide absent source absent` and `RaterInterface.destroy` rows, which no cell edit alone could close.
- All-caps emphasis corrected in every block touched (`ONLY`, `OWNS`, `FIRST`, `SINGLE`, `EXACT`, `NO`, `OWNED`, `LAST`, `INJECTED`) and in every guide and README sentence carrying it (`WHICH`, `NO`, `MUST`, `ONE`, `FAILURE`, `OWNED`, `LAST`). No code token moved in any block.

`npm run docs -- --to guide` after the table rewrite: `rows read: 1, disagreements found: 0, written: 0, reported: 0`. The cells were written by hand from the source descriptions, so the seed found nothing left to carry; `npm run docs` read `rows read: 1, disagreements found: 0` before and after it. The scoped format ran after every edit (`npx oxfmt --config .oxfmtrc.json --write` over the owned paths).

## Criterion 4 — the titled pair

The pair is `createRater`'s `@example Create a rater` in `src/core/factories.ts` against the guide fence under the new `#### Create a rater` heading. `createRater` is the only exported `create*` declaration, and the `### Factories` fence is the one demonstrating it, so Ruling 9 applied: the heading was added one level deeper directly above that fence, the `### Factories` heading stayed, and no fence moved. `grep -n '^#\+ Create a rater' guides/rater.md` returns one line (264). The fence body carries no three-backtick run and no doc-comment terminator.

Each side's body, read through the installed readers (`tmp/d7n-rater-converge/titles.mjs`):

```text
guide fence titles: ["Surface","Errors","Validators","Helpers","Helpers","Helpers","Create a rater","RaterInterface"]
source example titles: ["Create a rater"]
paired source example name: createRater
paired body:      "import { createRater } from '@orkestrel/rater'\n\nconst rater = createRater()\nrater.destroy()"
paired fence body: "import { createRater } from '@orkestrel/rater'\n\nconst rater = createRater()\nrater.destroy()"
```

The block was titled first, by hand, and that is the whole of the pair's landing: the fence already demonstrated exactly what the block demonstrates, so Ruling 14 required no extension on either side and `npm run docs -- --to source`, run last with the summaries already agreeing, read `rows read: 1, disagreements found: 0, written: 0, reported: 0` rather than the `written: 1` the brief anticipated for a pair whose bodies differ. Every other `@example` stays untitled.

## Criterion 5 — the tagline, the pitch, and the displaced sentences

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold, and `README.md` carries it byte for byte under its own H1 with the same line breaks:

```text
> A typed quantitative rating layer over `@orkestrel/reason`'s shared engine: authored
> lines, each a plain reason `QuantitativeDefinition` joined to display metadata, rated
> against one subject to produce a `LineResult` per line — an `amount` and its
> `Worksheet` audit trail — and one `RatingResult` carrying every line's outcome and a
> derived `total`.
```

The guide's opening paragraph after the blockquote carries the displaced sentences and restates none of the tagline's clauses: the subject being a plain data record and the caller choosing the lines; `Rater` performing no evaluation arithmetic of its own; rating never mutating its inputs; the injected-versus-owned engine and what `destroy()` tears down; the injected engine's dispatch requirement and whose error surfaces; the `rate` event firing once per call; and the `Source:` / barrel sentence.

The README's opening paragraph keeps the onboarding it alone carries, rewritten so it restates no tagline clause: creating a rater with `createRater`, handing it the lines a subject is rated against, reading the `LineResult` rows and the `total`, injecting a `ReasonInterface` where the engine is shared, calling `destroy()`, and the environment-agnostic and `@orkestrel` line sentences. Its later usage sentence lost `both overloads` for `each overload` (a count over a set that can grow).

`npm run test:guides` after the README edit: `Tests 29 passed (29)`.

## Criterion 6 — the seed

```text
$ npm run docs                    exit 0   rows read: 1, disagreements found: 0
$ npm run docs -- --to guide      exit 0   rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source     exit 0   rows read: 1, disagreements found: 0, written: 0, reported: 0
```

`git status --short` is unchanged after the `--to guide` and `--to source` runs.

## Criterion 7 — gates

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/rater.md README.md src/core/*.ts tests/guides.test.ts
  All matched files use the correct format.  (11 files)                       exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings src/core tests/guides.test.ts
  no output                                                                   exit 0
$ npm run check                                                               exit 0
$ npm run test:guides    Test Files 1 passed (1) / Tests 29 passed (29)       exit 0
$ npm run test:policy    Test Files 1 passed (1) / Tests 90 passed | 1 skipped (91)   exit 0
```

Observation, not a criterion: `npm run test:src:core` read `Test Files 4 passed (4) / Tests 131 passed (131)`, exit 0, `Duration 825ms`, taken while sibling units were running in other checkouts.

## Criterion 8 — status

```text
 M README.md
 M guides/rater.md
 M src/core/Rater.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Owned files only. The instruments sit under `tmp/d7n-rater-converge/` (`edit-tests.py`, `edit-types.py`, `edit-src.py`, `edit-guide.py`, `edit-tables.py`, `cells.py`, `titles.mjs`, and the baseline copies of the guide, the README, and the drop-in), which git ignores. `package.json` and `package-lock.json` were not touched.

## The drop-in against Ruling 13

`diff -u /home/user/fleet/abort/tests/guides.test.ts tests/guides.test.ts` reports hunks only at the header line, the import block, the constants block, and the package-specific `flagship fences` block; the whole region between the constants and that block is identical. The header line reads "The constants that follow are this package's own" (Ruling 13 as amended); the pilot still reads `below` and takes that line in its own closing unit. The `INTERNAL` doc block was changed to the canonical "the assertion that follows it fails when a name here stops being stranded, so the list cannot rot." `ROOT_FILES` took the canonical comment and gained `README.md`; `GUIDE_SPEC` is `'guides/rater.md'` and is used by the pin and the README case. The equality case sits directly after the methods loop and before the examples case, which is named `documents an example for every Surface function`. The pin is the pilot's guard-and-continue loop with no local type predicate and the both-sides failure line.

## § Tests

The guide had no `## Tests` section; one was added naming `tests/guides.test.ts`, `tests/src/core/Rater.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/helpers.test.ts`, and `tests/src/core/validators.test.ts`, each with the checks its suite wires, described rather than coded — no SQ/MQ/EQ/RQ identifier. The `tests/guides.test.ts` row names each part of the equality gate: every `Summary` cell against its declaration's description paragraph, the titled `Create a rater` fence against the `@example` block of that title, and the README pitch against this guide's tagline. Every link resolves: `resolves every relative link` and `links only to test files that exist` are green in the run recorded earlier.

## Ancillary decisions recorded

- **The Validators table takes `API | Kind | Summary`, not a `Shape` column.** Ruling 15's trigger is an interface or type-alias row, and this table carries none; a `Shape` cell over a guard would restate the row's own name (`isLineDefinition` → `LineDefinition`). The removed columns' content went to each guard's `@remarks`, per Ruling 7, with one guide sentence above the table naming that home.
- **The Errors table keeps `API | Kind | Summary`.** Its rows are a class and a function, so Ruling 15 does not reach it; the code list and the `context` member landed in the guide's prose above it and in the class's `@remarks`.
- **The `#### Create a rater` heading sits after the `### Factories` paragraph and directly above the fence**, so the paragraph still introduces the section rather than the demonstration.
- **The `isStage` `@remarks` names only what the guard leaves unchecked**, because its `@returns` already lists the accepted literals and Ruling 7 prunes a repeat.

## Reader and seed defects met

None. The seed located every row after the header changes, `replaceCell` was never needed (the hand-written cells already agreed), and no residual disagreement stood under the P16 comparator.

## Deviation state

No deviation. Every acceptance criterion is closed and green.
