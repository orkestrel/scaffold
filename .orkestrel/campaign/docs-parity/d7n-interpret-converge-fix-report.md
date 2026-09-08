# Report — `d7n-interpret-converge-fix`

Every item landed. `npm run docs` reads `rows read: 1, disagreements found: 0`, both write directions
read `written: 0`, and every acceptance criterion passes on the owned files.

Wall clock: first reading 2026-09-08T02:01Z (taken after `git log --oneline -3` confirmed the tip
`a0303e5` clean); last reading 2026-09-08T02:09Z.

## Item 1 — the owned prose (IN1)

`guides/interpret.md` § `InterpretContextInterface` intro, and the `@remarks` in
`src/core/InterpretContext.ts` that states the same fact:

```diff
-most recent last. `clear()` resets the history and both registries WITHOUT
-tearing the context down.
+most recent last. `clear()` resets the history, the subject registry, and the
+definition registry without tearing the context down.
```

```diff
- * one result and trims to the cap; `clear` resets the history and both
- * registries WITHOUT tearing the context down; `destroy()` is idempotent and
- * every method afterwards throws `InterpretError('DESTROYED', …)`.
+ * one result and trims to the cap; `clear` resets the history, the subject
+ * registry, and the definition registry without tearing the context down;
+ * `destroy()` is idempotent and every method afterwards throws
+ * `InterpretError('DESTROYED', …)`.
```

`guides/interpret.md` § Validators intro:

```diff
-Two postures, split by who produces the value. An input-record guard is exact: an extra key
+The posture splits by who produces the value. An input-record guard is exact: an extra key
```

## Item 2 — all-caps in `@remarks` (IN2)

Every brief-named site is lowered, and so is every other all-caps emphasis the closing grep found in
`src`, `guides/interpret.md`, and `README.md`. Each sentence keeps its contrast: the emphasised word
carries it as a lowercase word (`only`, `over`, `every`, `own`, `last`), or the sentence names the
members it contrasted (`marked on its record and on `failures``, `the action and the domain both
fire`).

`src/core/Interpret.ts` (its `@remarks` hunk is quoted under item 6):

```diff
- * then destroys the emitter LAST; every method afterwards except the
+ * then destroys the emitter last; every method afterwards except the
```
```diff
-	// A stage THROW — mark the failed stage's record, emit `error` with the raw
+	// A stage throw — mark the failed stage's record, emit `error` with the raw
```
```diff
-	// incomplete run is still a completed CALL — visibility is the point).
+	// incomplete run is still a completed call — visibility is the point).
```

`src/core/Narrator.ts`:

```diff
- * Every wording decision is DATA — a caller-supplied `Lexicon` merged, per
- * sub-record (`phrases` / `labels` / `templates`), OVER `DEFAULT_LEXICON`.
+ * Every wording decision is data — a caller-supplied `Lexicon` merged, per
+ * sub-record (`phrases`, `labels`, and `templates`), over `DEFAULT_LEXICON`.
```

`src/core/validators.ts` file header:

```diff
-// Every guard here is a TOTAL function — adversarial input (junk, hostile
+// Every guard here is a total function — adversarial input (junk, hostile
 // prototypes, cyclic/deep nesting) returns `false`, never throws.
-// Input-record guards are EXACT (`recordOf`): an extra key fails. Foreign
-// result guards are OPEN (`objectOf`): unknown members, class instances, and
+// Input-record guards are exact (`recordOf`): an extra key fails. Foreign
+// result guards are open (`objectOf`): unknown members, class instances, and
```
```diff
-// barrel's `export *` (TypeScript silently drops BOTH conflicting star
+// barrel's `export *` (TypeScript silently drops both conflicting star
```

The remaining lowered words, by file and by the word replaced:

| File | Word lowered |
| --- | --- |
| `src/core/Interpret.ts` | `SYNCHRONOUS`, `INCOMPLETE`, `THROW` (`@remarks` and the `#fail` comment), `AND`, `LAST`, `CALL` |
| `src/core/InterpretContext.ts` | `WITHOUT` |
| `src/core/Narrator.ts` | `DATA`, `OVER` |
| `src/core/constants.ts` | `NEUTRAL` |
| `src/core/helpers.ts` | `ANY`, `SINGLE`, `ONLY`, `PINNED`, `MUST`, `CURRENT`, `THE`, `EXPLICIT`, `RATERS`, `REASONS` |
| `src/core/managers/RecordManager.ts` | `CONTENT`, `ONLY`, `ALL-OR-NOTHING` |
| `src/core/managers/SubjectManager.ts` | `ONLY` |
| `src/core/managers/TemplateManager.ts` | `ALL-OR-NOTHING` |
| `src/core/stages/Clarifier.ts` | `SAME`, `KNOWN` |
| `src/core/stages/Extractor.ts` | `ASSIGNMENT` |
| `src/core/stages/Generator.ts` | `OWN`, `EVERY` |
| `src/core/stages/Normalizer.ts` | `OVER`, `KEY` |
| `src/core/types.ts` | `FORWARD`, `REVERSE`, `FOR`, `NOT`, `KNOWN`, `EVERY`, `ASSIGNMENT`, `OWN`, `OVER`, `CONTENT`, `LAST` (`RecordManagerInterface` and `InterpretInterface`), `BRING-YOUR-OWN`, `SYNCHRONOUS` |
| `src/core/validators.ts` | `TOTAL`, `EXACT`, `OPEN`, `BOTH` |

A rewrap followed wherever lowering a word left a short trailing line: the `classifyIntent`
`@remarks` in `src/core/helpers.ts`, and the `InterpretContext` `@remarks` quoted under item 1.
Each rewrap is whitespace inside the same paragraph.

### The closing grep, ruled

Pattern `\b[A-Z]{3,}\b`, run as `grep -rnE '\b[A-Z]{3,}\b' src guides/interpret.md README.md` over
the paths `src`, `guides/interpret.md`, and `README.md`. The distinct tokens its lines match, read
with `-o | sort -u`, are `API ASCII DESTROYED ESM FNV JSON LICENSE LLM MIT
README UNKNOWN`. Every one is permitted:

| Token | Why it stays |
| --- | --- |
| `DESTROYED` | The `InterpretErrorCode` member, a code literal — in the union's `Shape` cell, in every `InterpretError('DESTROYED', …)` call and its prose, and in the guide's Errors fence |
| `UNKNOWN` | The rejected code in the `isStageFailure` `@example` (`src/core/validators.ts:343`), a code literal the brief names |
| `JSON` | The format, and the `JSON.stringify` call in `src/core/helpers.ts` |
| `ASCII`, `FNV` | Acronyms in `src/core/helpers.ts` — the word-boundary class, and the hash `digestValue` computes |
| `LLM` | The disclaimer's acronym in `src/core/types.ts` and `guides/interpret.md:10` |
| `API` | The guide's own table column header, and "the public API" in the § Tests entry for the integration suite |
| `ESM`, `MIT` | Acronyms in `README.md` — the module format and the license |
| `LICENSE`, `README` | File names in links |

`grep -rnE '\b(SYNCHRONOUS|INCOMPLETE|THROW|LAST|DATA|OVER|ONLY|KNOWN|WITHOUT|ANY)\b' src/core
--include=*.ts` prints nothing (exit 1).

## Item 3 — the titled fence's lead-in (IN3, Ruling 21)

The § Surface lead-in moved below the titled heading, so one complete sentence sits between that
heading and the fence, outside the fence:

```diff
 ## Surface
 
+### Interpret text against an added template
+
 Add a template, interpret text through the normalize, extract, clarify, format, and generate
 pipeline, then render the result back to prose:
 
-### Interpret text against an added template
-
 ```ts
```

Ancillary decision: the lead-in keeps its colon rather than taking a full stop, and `## Surface`
sits bare above its H3. That is the converged shape `/home/user/fleet/brief/guides/brief.md:39-45`
carries (`## Surface`, then `### Compile and project a brief`, then a colon-terminated lead-in, then
the fence), and every converged sibling read — abort, budget, table, websocket — terminates a fence
lead-in with a colon.

## Item 4 — the header and the closing items (IN4, Rulings 13 and 21)

`tests/guides.test.ts` header line, the round's only edit to that file:

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
 // this repo's own `guides/README.md` manifest. The constants that follow are this
-// package's own, and are the only part a sibling package changes.
+// package's own, as is the executed section that closes the file.
```

The drop-in region needed no edit and still needs none. `const root = ` sits at line 112 and the
manifest loop closes at line 323; the pilot's same region runs 47 to 258:

```
diff <(sed -n '47,258p' /home/user/fleet/abort/tests/guides.test.ts) \
     <(sed -n '112,323p' tests/guides.test.ts)
  → no output (exit 0)
```

The closing brief's fence list named `25: ### Interpret text against an added template -> fence at
27`, closed by item 3. The lead-in awk now prints nothing.

## Item 5 — the `destroy` cells (IN5)

Each `destroy()` declaration in `src/core/types.ts` names its own entity, so the cells that read
alike now differ:

```diff
 	/**
-	 * Tears the registry down idempotently — clears the collection, emits `destroy`, then
-	 * destroys the emitter last.
+	 * Tears the record registry down idempotently — clears the collection, emits
+	 * `destroy`, then destroys the emitter last.
 	 */
 	destroy(): void
```

`record` on `RecordManagerInterface`, `template` on `TemplateManagerInterface`, `subject` on
`SubjectManagerInterface`, `definition` on `DefinitionManagerInterface`. Ancillary decision:
`RecordManagerInterface` is the shared engine each manager composes and is generic over the record it
mints, so its entity noun is `record` rather than one of its consumers' nouns; the brief's
parenthetical named a narrator, and this package declares no narrator registry and no narrator
`destroy`. `InterpretContextInterface#destroy` and `InterpretInterface#destroy` already named their
entities and are untouched.

## Item 6 — the pipeline stated twice (IN6, Ruling 7)

The class description already carries the pipeline, so the `@remarks` drops its second statement:

```diff
  * @remarks
- * `interpret()` is genuinely SYNCHRONOUS — it returns its
- * {@link Interpretation} directly, never a `Promise` — and runs the fixed
- * pipeline
- * `[normalize, extract, clarify, format, generate]` — each producing one
- * {@link StageRecord}. Between `extract` and `clarify` the orchestrator matches
+ * `interpret()` is genuinely synchronous — it returns its
+ * {@link Interpretation} directly, never a `Promise` — each phase producing
+ * one {@link StageRecord}. Between `extract` and `clarify` the orchestrator matches
```

## Item 7 — slash pairs (IN7)

Every options description in `src/core/types.ts` spells its pair with `and`, then `--to guide`
carried them into the § Types rows:

```diff
-/** Represents the options for `createNarrator` / the `Narrator` constructor. */
+/** Represents the options for `createNarrator` and the `Narrator` constructor. */
```

The same substitution ran over `createNormalizer`, `createExtractor`, `createClarifier`,
`createFormatter`, `createTemplateManager`, `createSubjectManager`, `createDefinitionManager`,
`createInterpretContext`, and `createInterpret`. The § Methods intro list:

```diff
-`count` on every record registry; `session` / `subjects` / `definitions` on
+`count` on every record registry; `session`, `subjects`, and `definitions` on
```

## Item 8 — the specifier (IN8)

Every untitled `@example` in `src/core/factories.ts` imports the published specifier the titled block
imports:

```diff
  * @example
  * ```ts
- * import { createNormalizer } from '@src/core'
+ * import { createNormalizer } from '@orkestrel/interpret'
```

The same edit ran on the blocks for `createExtractor`, `createClarifier`, `createFormatter`,
`createGenerator`, `createTemplateManager`, `createSubjectManager`, `createDefinitionManager`,
`createInterpretContext`, and `createNarrator`. `grep -n "from '@src/core'" src/core/factories.ts`
prints nothing. This is the converged fleet form: `/home/user/fleet/abort/src` and
`/home/user/fleet/budget/src` carry only their own published specifier in doc-block examples, as does
`/home/user/fleet/brief/src`.

## Item 9 — the Validators intro (IN9)

The first option, chosen because it reads well: each exact-posture guard's description names its
posture, in the form parallel to the open guards' shipped phrase (`an open `Provenance` result
record` → `an exact `EntityMapping` input record`), so the intro's sentence "Each row's `Summary`
names the posture its guard takes." is true of every row.

```diff
 /**
- * Determines whether a value is an {@link EntityMapping} — a literal
- * alias-phrase extraction rule pointing at a subject field.
+ * Determines whether a value is an exact {@link EntityMapping} input
+ * record — a literal alias-phrase extraction rule pointing at a subject
+ * field.
```

The same shape landed on `isFieldDefault`, `isComputedField`, and `isTemplate` — the guards the file
header calls exact. The open guards' descriptions are unchanged. The intro sentence is unchanged.

## Item 10 — propagation

```
npm run docs                → rows read: 1, disagreements found: 18                       (before)
npm run docs -- --to guide  → rows read: 1, disagreements found: 18, written: 18, reported: 0
npx oxfmt --config .oxfmtrc.json --write guides/interpret.md
npx oxfmt --config .oxfmtrc.json --write src/core tests/guides.test.ts README.md
npm run docs                → rows read: 1, disagreements found: 0                        (exit 0)
npm run docs -- --to guide  → rows read: 1, disagreements found: 0, written: 0, reported: 0
npm run docs -- --to source → rows read: 1, disagreements found: 0, written: 0, reported: 0
```

The rows the reader carried are the options rows, the exact-guard rows, and the `destroy` rows —
items 5, 7, and 9. Nothing else disagreed, and the titled pair never disagreed: the
titled block already imported `@orkestrel/interpret`, so item 8 left it untouched.

The whole guide change set, read with table whitespace collapsed
(`diff <(git show HEAD:guides/interpret.md | sed 's/  */ /g') <(sed 's/  */ /g' guides/interpret.md)`),
is exactly the § Surface heading move, the § Validators intro sentence, the § Methods intro list, the
`InterpretContextInterface` prose, and the rows `--to guide` wrote. Every other guide line in
`git diff` is a column-width reflow inside a table oxfmt rewrote.

## Criteria

### 1 — `git status --short` lists owned files only

```
 M guides/interpret.md
 M src/core/Interpret.ts
 M src/core/InterpretContext.ts
 M src/core/Narrator.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/managers/RecordManager.ts
 M src/core/managers/SubjectManager.ts
 M src/core/managers/TemplateManager.ts
 M src/core/stages/Clarifier.ts
 M src/core/stages/Extractor.ts
 M src/core/stages/Generator.ts
 M src/core/stages/Normalizer.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Owned files only. `README.md` is owned and needed no edit: no item touched its pitch, its Usage
paragraph, or a sentence a doc block feeds. `guides/README.md`, `package.json`,
`package-lock.json`, `tests/src/**`, `tests/setup*.ts`, and every vendored file are untouched.

`git diff -U0 -- src` filtered to lines that are not a comment (`*`, `//`, `/**`) is empty, so no code
token moved.

Diffstat:

```
 guides/interpret.md                  | 124 +++++++++++++++++------------------
 src/core/Interpret.ts                |  18 +++--
 src/core/InterpretContext.ts         |   7 +-
 src/core/Narrator.ts                 |   4 +-
 src/core/constants.ts                |   2 +-
 src/core/factories.ts                |  20 +++---
 src/core/helpers.ts                  |  28 ++++----
 src/core/managers/RecordManager.ts   |   6 +-
 src/core/managers/SubjectManager.ts  |   2 +-
 src/core/managers/TemplateManager.ts |   2 +-
 src/core/stages/Clarifier.ts         |   4 +-
 src/core/stages/Extractor.ts         |   2 +-
 src/core/stages/Generator.ts         |   4 +-
 src/core/stages/Normalizer.ts        |   4 +-
 src/core/types.ts                    |  64 +++++++++---------
 src/core/validators.ts               |  26 ++++----
 tests/guides.test.ts                 |   2 +-
 17 files changed, 160 insertions(+), 159 deletions(-)
```

### 2 — format, lint, typecheck

```
npx oxfmt --config .oxfmtrc.json --check guides/interpret.md README.md tests/guides.test.ts src/core
  All matched files use the correct format.
  Finished in 924ms on 23 files using 4 threads.
  exit 0

npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core
  (no output)
  exit 0

npm run check
  > tsc --noEmit --project tsconfig.json && npm run check:src
  > tsc --noEmit -p configs/src/tsconfig.core.json
  exit 0
```

### 3 — the seed reads zero

Quoted under item 10. `npm run docs` exit 0 at `rows read: 1, disagreements found: 0`; both write
directions at `written: 0`.

### 4 — the mechanical greps

```
grep -n 'WITHOUT\|both registries\|Two postures' guides/interpret.md
  (no output)  exit 1

grep -rnE '\b(SYNCHRONOUS|INCOMPLETE|THROW|LAST|DATA|OVER|ONLY|KNOWN|WITHOUT|ANY)\b' src/core --include=*.ts
  (no output)  exit 1

diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
  (no output)  exit 0

grep -c ' / the `Narrator` constructor' src/core/types.ts guides/interpret.md
  src/core/types.ts:0
  guides/interpret.md:0

grep -n 'Tears the template registry\|Tears the subject registry\|Tears the definition registry' guides/interpret.md
  810:| `destroy`   | `void` | Tears the template registry down idempotently — clears the collection, emits `destroy`, then destroys the emitter last. |
  855:| `destroy`  | `void` | Tears the subject registry down idempotently — clears the collection, emits `destroy`, then destroys the emitter last. |
  882:| `destroy`     | `void` | Tears the definition registry down idempotently — clears the collection, emits `destroy`, then destroys the emitter last. |
  (column padding trimmed here for width; the file's rows are oxfmt-aligned)

awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/interpret.md
  (no output)
```

### 5 — the suites

```
PATH=/opt/npm11/bin:$PATH npm run test:guides
   Test Files  1 passed (1)
        Tests  98 passed (98)
  exit 0

npm run test:policy
   Test Files  1 passed (1)
        Tests  90 passed | 1 skipped (91)
  exit 0
```

Observation, not a criterion:

```
npm run test:src:core
   Test Files  17 passed (17)
        Tests  285 passed (285)
     Duration  2.60s (transform 1.28s, setup 2.51s, import 830ms, tests 413ms, environment 2ms)
  exit 0
```

## Observations, for the round that owns them

- **Slash pairs survive outside the options rows.** `guides/interpret.md:78` reads "how one
  `FieldMapping` / `Entity` value was obtained", `:80` "the coded misuse / failure conditions", and
  `:103` "`add` / `remove` are the events (never ordered-list `append`/`prepend`)". Each is a
  `Summary` cell fed by a doc block in `src/core/types.ts`. IN7 named the options rows, so these stay
  for the capability that owns the Types table. `@remarks` and file-header comments carry more —
  `src/core/types.ts:11-13` and `:209`, `src/core/helpers.ts:794-796` — and the comparison never
  reads those.
- **The published specifier is inconsistent across the package.** After item 8, `src/core` carries
  `from '@src/core'` in doc-block examples in `validators.ts`, `helpers.ts`, `parsers.ts`,
  `types.ts`, `errors.ts`, `constants.ts`, `Interpret.ts`, `Narrator.ts`, `InterpretContext.ts`, the
  managers, and the stages, while `factories.ts` now carries `@orkestrel/interpret` throughout. IN8
  named `factories.ts`, whose titled block set the direction; the fleet form the converged siblings
  carry is the published specifier everywhere, so the remaining files are one mechanical unit.
- **`clear`'s cell and its prose word the same act differently.** The
  `InterpretContextInterface#clear` cell reads "without destroying the context" and the prose above
  the table reads "without tearing the context down". Each is true, and each mirrors the `destroy`
  cell's "Tears the context down"; the cell's wording predates this round and IN1 named the prose
  alone.

## Ancillary decisions

- **The § Surface lead-in keeps its colon and moves below the heading**, rather than taking a full
  stop and staying above it. Recorded under item 3 with the sibling guides read.
- **`RecordManagerInterface#destroy` names the `record` registry.** Recorded under item 5.
- **The exact guards read "an exact `X` input record"**, the phrase parallel to the shipped open
  guards' "an open `X` result record", rather than the brief's "as an exact record". Recorded under
  item 9.
- **`Narrator.ts`'s sub-record list took commas and `and`** in the same sentence item 2 lowered
  (`phrases` / `labels` / `templates` → `phrases`, `labels`, and `templates`), because that clause
  was being rewritten anyway. It is a `@remarks`, so the comparison never read it.
- **All-caps emphasis was lowered beyond the brief's named sites**, everywhere the closing grep
  found it, so that grep's remaining hits are all genuinely permitted. Recorded under item 2.

## Deviations

None. No gate outside the owned files went red, and no pair failed to hold: the titled pair never
entered the disagreement list, and the drop-in region matched the pilot before and after the edit.

Instruments for this unit live in `/home/user/fleet/interpret/tmp/d7n-interpret-converge-fix/`
(`lower.py`), inside the checkout, which git ignores.
