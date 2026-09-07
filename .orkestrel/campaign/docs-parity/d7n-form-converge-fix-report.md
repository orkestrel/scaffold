# Report — `d7n-form-converge-fix` (form's fix round on the audit's findings)

Wall clock: 2026-09-07T21:31:31Z (first command) to 2026-09-07T21:36:38Z (last command).
Baseline `ee1fa2b`, checkout `/home/user/fleet/form`. Sole writer; every instrument under
`tmp/d7n-form-converge-fix/`. Nothing committed.

Diffstat:

```
 guides/form.md        | 168 ++++++++++++++++++++++++++------------------------
 src/core/constants.ts |  18 +++---
 src/core/types.ts     |  14 ++---
 tests/guides.test.ts  |   8 +--
 4 files changed, 106 insertions(+), 102 deletions(-)
```

## Red first

`tmp/d7n-form-converge-fix/red-first-greps.txt`, taken at 21:31:31Z against the unedited tree:

```
### grep -n '^| API *| Kind *| Shape *| Summary' guides/form.md
54:| API             | Kind      | Shape ... | Summary ...
83:| API                 | Kind      | Shape ... | Summary ...
101:| API             | Kind      | Shape ... | Summary ...
### grep -c "A `Shape` cell holds the constant's declared type." guides/form.md
0
### grep -c 'In a guard table' guides/form.md
0
### grep -n 'Its own options\|Contract [0-9]* states\|/Interface$/u\|resolveRoot' guides/form.md tests/guides.test.ts
guides/form.md:246:| Control    | Value               | Its own options              | Notes  ...
guides/form.md:803:Contract 10 states: a source within `PATTERN_LIMIT` can still backtrack catastrophically, and
guides/form.md:936:previous error list in place. Contract 4 states the exact partial-state boundary.
tests/guides.test.ts:26:import { createRecorder, requireValue, resolveRoot } from '@orkestrel/test'
tests/guides.test.ts:105:const root = resolveRoot(import.meta)
tests/guides.test.ts:220:			const entity = group.interface.replace(/Interface$/u, '')
tests/guides.test.ts:281:			const entity = group.interface.replace(/Interface$/u, '')
```

The doc-block findings (F5, F7, F8) and the budget literals (F1) redden `npm run docs`, which read
`rows read: 1, disagreements found: 14`, exit 1, at 21:33:47Z after the source edits and before
`--to guide` (`tmp/d7n-form-converge-fix/docs-red.txt`). The same command reads
`rows read: 1, disagreements found: 0`, exit 0, after the convergence.

## Item 1 — the constants table (F1, Rulings 18 and 20)

`guides/form.md` `### Constants` heads `| API | Kind | Shape | Summary |`, under the constants
sentence alone, between the section's prose and the table:

```
`color`, `date`, `time`, and `datetime` value must have. Each budget's row names its ceiling.
[Budgets](#budgets) then works each ceiling through beside the unit it counts, and
[Patterns and where trust lives](#patterns-and-where-trust-lives) does the same for `PATTERN_LIMIT`.

A `Shape` cell holds the constant's declared type.

| API                    | Kind  | Shape                                               | Summary ...
| `FIELD_CONTROLS`       | const | `readonly FieldControl[]`                           | Lists every field control, ...
| `FIELD_BASE_KEYS`      | const | `readonly string[]`                                 | ...
| `FIELD_KEYS`           | const | `Readonly<Record<FieldControl, readonly string[]>>` | ...
| `FORM_STATUSES`        | const | `readonly FormStatus[]`                             | ...
| `RULE_MESSAGES`        | const | `Readonly<Record<FieldRuleName, string>>`           | ...
| `EMAIL_PATTERN`        | const | `Readonly<RegExp>`                                  | ...
| `PATTERN_LIMIT`        | const | `number`                                            | Caps the accepted source length for an authored regular expression, at 256.
```

Each pattern row takes `Readonly<RegExp>` and each budget row takes `number`. Every budget's
description paragraph in `src/core/constants.ts` names its literal, so the `Summary` cell carries it
through `--to guide`:

```diff
-/** Caps the number of fields one schema may declare. */
+/** Caps the number of fields one schema may declare, at 512. */
 export const FIELD_LIMIT = 512
```

The same shape landed for `PATTERN_LIMIT` 256, `GROUP_LIMIT` 64, `CHOICE_LIMIT` 1024,
`LIST_LIMIT` 1024, `NAME_LIMIT` 128, `STRING_LIMIT` 65536, `TEXT_LIMIT` 1048576, and
`NODE_LIMIT` 16384. The prose that deferred each value to another section is recast to the sentence
quoted earlier; the `### Budgets` table keeps its own `Value` column untouched.

**Ancillary decision, recorded.** The brief's parenthetical names `RegExp` for the pattern rows; the
brief's own instruction is to read each declared type from `src/core/constants.ts`, where each
pattern is `Object.freeze(/…/)` with no annotation. The emitted declaration is the evidence —
`dist/src/core/index.d.ts:202` reads `export declare const EMAIL_PATTERN: Readonly<RegExp>;` — so
the cell reads `Readonly<RegExp>`, which also carries the frozen fact the section's prose states.
The budget rows read `number` rather than their literal types (`256`, `512`, …) because Ruling 18
puts the literal in the description paragraph and bars a `Value` column, and a `Shape` cell holding
`512` is that column renamed.

## Item 2 — the guard table (F2, Ruling 20)

`### Guards` heads `| API | Kind | Shape | Summary |` under the guard sentence, each cell the type
that guard's `value is X` return narrows to, read from `src/core/validators.ts`:

```
In a guard table a `Shape` cell holds the type the guard narrows to.

| API              | Kind     | Shape          | Summary ...
| `isFieldControl` | function | `FieldControl` | Determines whether an unknown value is a declared field control.
| `isFormStatus`   | function | `FormStatus`   | ...
| `isFieldValue`   | function | `FieldValue`   | ...
| `isFieldChoice`  | function | `FieldChoice`  | ...
| `isFieldRule`    | function | `FieldRule`    | ...
| `isFormField`    | function | `FormField`    | ...
| `isFormGroup`    | function | `FormGroup`    | ...
| `isFormSchema`   | function | `FormSchema`   | ...
| `isFormValues`   | function | `FormValues`   | ...
| `isFieldError`   | function | `FieldError`   | ...
```

`isFormError` stays a row of the mixed `### The form` table with an empty `Shape` cell, as Ruling 20
leaves it.

## Item 3 — the Controls table (F3, Ruling 15)

```diff
-| Control    | Value               | Its own options              | Notes ...
-| `text`     | `string`            | `default`, `placeholder`     | Carries email and url as rules, and tel and search as neither. |
+| Control    | Value               | Notes ...
+| `text`     | `string`            | Carries email and url as rules, and tel and search as neither. |
```

No fact moved into `Notes`: every dropped cell's members already sit in that control's `Shape` cell
in `### Schema and fields` (`TextField` `{ control, default?, placeholder? }`, `PasswordField`
`{ control, mask? }`, `SelectField` `{ control, choices, default?, open? }`, `FileField`
`{ control, accept?, multiple? }`, and so on for each row), checked row by row before the column
went.

## Item 4 — list items named by position (F4)

```diff
-Contract 10 states: a source within `PATTERN_LIMIT` can still backtrack catastrophically, and
-evaluating an untrusted pattern spends the caller's thread.
+the "Guards are total and parsers refuse" invariant under [Contract](#contract) states: a source
+within `PATTERN_LIMIT` can still backtrack catastrophically, and evaluating an untrusted pattern
+spends the caller's thread.
```

```diff
-previous error list in place. Contract 4 states the exact partial-state boundary.
+previous error list in place. The "Errors are current after completed evaluation" invariant under
+[Contract](#contract) states the exact partial-state boundary.
```

Each names the invariant by its bolded title from `## Contract` and links the section.

## Item 5 — the `clear` row (F5)

```diff
 	/**
-	 * Returns every answer to {@link FormInterface.baseline}, the answers the form opened with.
+	 * Returns every answer to the ones the form opened with.
 	 *
 	 * @remarks
-	 * The runtime disabled overlay resets with them, so {@link FormInterface.disabled} reads the
-	 * schema's declarations again.
+	 * Those answers are {@link FormInterface.baseline}. The runtime disabled overlay resets with
+	 * them, so {@link FormInterface.disabled} reads the schema's declarations again.
 	 */
 	clear(): void
```

The `## Methods` cell reads "Returns every answer to the ones the form opened with." through
`--to guide`, and the `baseline` reference reaches the declaration's reader in `@remarks`.

## Item 6 — the opening paragraph (F6)

```diff
-Nothing here renders, reads a keyboard, or opens a socket. **A terminal prompt and a browser form
-are the same abstraction.** Both ask a person a set of questions, hold partial answers, check them
-against rules, and finish once. What differs is the host, and each host contributes the one part it
-owns. …
-browser, not here. This package ships the document both hosts share.
+**A terminal prompt and a browser form are the same abstraction.** Both ask a person a set of
+questions, hold partial answers, check them against rules, and finish once. What differs is the
+host, and each host contributes the one part it owns. …
+Rendering is the browser's contribution, and it lives in the browser, not here. Nothing here
+renders, reads a keyboard, or opens a socket. This package ships the document both hosts share.
```

Every sentence is kept; the paragraph is rewrapped to the file's width, which oxfmt does not reflow.

## Item 7 — `FormInterface`'s description (F7)

```diff
-/**
- * Represents a form: a schema, the answers given against it, and the errors they carry.
+/**
+ * Declares the contract a form exposes: the state it holds and the calls that move it.
```

The pair reads as interface and implementation beside `Form`'s "Implements `FormInterface`
exactly, over an owned schema, the answers given against it, and the errors they carry."

## Item 8 — overload families (F8, Ruling 7)

```diff
-	 * Answers several fields at once.
+	 * Answers one field, or several at once.
 	fill(values: FormValues): void
-	 * Takes every field out of the form.
+	 * Takes one field, several fields, or every field out of the form.
 	disable(): void
-	 * Puts every field back into the form.
+	 * Puts one field, several fields, or every field back into the form.
 	enable(): void
```

Each later overload keeps its own narrower description, matching the converged fleet idiom at
`/home/user/fleet/table/src/core/types.ts:475-494`, and no `@remarks` restates the family. The
guide's `## Methods` prose keeps only the all-or-nothing check:

```diff
-`fill` takes one name and one value, or a whole record. `disable` and `enable` each take no argument
-for every field, one name for one field, or a list of names for those. A record and a list are
-checked in full before anything moves, so a refused call changes nothing.
+A record of answers and a list of names are checked in full before anything moves, so a refused call
+changes nothing.
```

**Ancillary decision, recorded.** The kept sentence became its own paragraph, so "a record" and "a
list" lost the antecedent the deleted sentences supplied. The subject is named in place rather than
left dangling.

## Item 9 — the drop-in's bytes (F9, Rulings 13 and 20)

```diff
-import { createRecorder, requireValue, resolveRoot } from '@orkestrel/test'
+import { createRecorder, requireValue } from '@orkestrel/test'
-const root = resolveRoot(import.meta)
+const root = new URL('../', import.meta.url)
-			const entity = group.interface.replace(/Interface$/u, '')
+			const entity = group.interface.replace(/Interface$/, '')
```

`resolveRoot` had no other reader in the file, so its import went with it; `tests/setup.ts` is
untouched and keeps its export. `createRecorder` still has readers, so it stays.

## Criterion 1 — `git status --short`

```
$ git status --short
 M guides/form.md
 M src/core/constants.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

Owned files only.

## Criterion 2 — format, lint, typecheck

```
$ npx oxfmt --check guides/form.md tests/guides.test.ts src/core/types.ts src/core/constants.ts
All matched files use the correct format.
Finished in 820ms on 4 files using 4 threads.
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core
exit 0

$ npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
exit 0
```

## Criterion 3 — `npm run docs` at zero, both write directions at `written: 0`

```
$ npm run docs
rows read: 1, disagreements found: 0
exit 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
exit 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
exit 0
```

## Criterion 4 — the greps and the drop-in diff

```
$ grep -n '^| API *| Kind *| Shape *| Summary' guides/form.md
54:  | API | Kind | Shape | Summary |   (### Schema and fields)
83:  | API | Kind | Shape | Summary |   (### Answers and rules)
101: | API | Kind | Shape | Summary |   (### The form)
131: | API | Kind | Shape | Summary |   (### Constants)
165: | API | Kind | Shape | Summary |   (### Guards)

$ grep -c "A \`Shape\` cell holds the constant's declared type." guides/form.md
1

$ grep -c 'In a guard table' guides/form.md
1

$ grep -n 'Its own options\|Contract [0-9]* states\|/Interface$/u\|resolveRoot' guides/form.md tests/guides.test.ts
exit 1   (no match)

$ diff <(awk '/^const root = /{p=1} p{print} p && /^for \(const entry of manifest/{f=1} f && /^}$/{exit}' /home/user/fleet/abort/tests/guides.test.ts) <(awk '…' tests/guides.test.ts)
14a15,27
> const readme = createGuide(requireValue(files['README.md'], 'Missing file: README.md'))
>
> it('imports only real exports in every root README ```ts fence', () => {
>	const fences = readme.fences().filter((fence) => fence.language === EXAMPLE_LANGUAGE)
>	for (const fence of fences) {
>		for (const { specifier, names } of extractFenceImports(fence.code)) {
>			const imported = sources.source(specifier)
>			if (imported === undefined) continue
>			const surface = imported.surface().map((symbol) => symbol.name)
>			expect(findMissing(names, surface)).toEqual([])
>		}
>	}
> })
```

The only remainder is this package's own README-fence case, appended, which the criterion admits.
The pilot was read at 21:36:38Z at its tip `f54ab91`; a sibling unit moved the pilot's header
comment during this round, which sits outside the compared region.

## Criterion 5 — the suites

```
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  51 passed (51)
   Duration  1.00s
exit 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  762ms
exit 0
```

Observation, `test:src:core`:

```
$ npm run test:src:core
 Test Files  9 passed (9)
      Tests  183 passed (183)
   Duration  1.18s
exit 0
```

No timing red to report.

## Deviations

None. No gate outside the owned files went red, and no cell resisted Ruling 12. The ancillary
decisions recorded earlier — `Readonly<RegExp>` in the pattern rows, and naming the antecedent in
the kept Methods sentence — were taken under the deviation contract's ancillary clause.

## Instruments retained

`tmp/d7n-form-converge-fix/`: `guide-edits.py`, `source-edits.py`, `red-first-greps.txt`,
`docs-red.txt`, `docs-to-guide.txt`, `docs-green.txt`, `c1-status.txt`, `c2-fmt-lint.txt`,
`c2-check.txt`, `c4-greps.txt`, `c4-final.txt`, `c5-guides.txt`, `c5-policy.txt`,
`c5-src-core.txt`, `final-gates.txt`.
