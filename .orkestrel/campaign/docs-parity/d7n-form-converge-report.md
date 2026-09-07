# Report — P.2 `d7n-form-converge` (form under the equality gate)

Wall clock: 2026-09-07T20:25:26Z (first command) to 2026-09-07T20:45:23Z (last command).

Baseline `ff9d979`, checkout `/home/user/fleet/form`. Sole writer; every instrument under
`tmp/d7n-form-converge/`.

## Criterion 1 — red-first on the unconverged tree

The gate cases were added to `tests/guides.test.ts` before any guide, README, or doc-block edit.
`npm run test:guides` then read `Tests 3 failed | 48 passed (51)`, exit 1. Each failing case's first
lines, verbatim:

```
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/form.md pairs: guide [\"Surface\",\"text\",\"editor\",\"password\",\"number\",\"date\",\"time\",\"datetime\",\"color\",\"confirm\",\"select\",\"checkbox\",\"file\",\"meta\",\"Rules\",\"How an answer is counted\",\"The custom seam\",\"The custom seam\",\"The custom seam\",\"Patterns and where trust lives\",\"Budgets\",\"Auditing a schema\",\"The temporal patterns are lexical\",\"Lifecycle and state\",\"The visibility switches\",\"Taking a field out, and putting it back\",\"Taking a field out, and putting it back\",\"Taking a field out, and putting it back\",\"Filling, clearing, and failing from outside\",\"Park-as-Promise: answer\",\"Park-as-Promise: answer\",\"Retrying a submit\",\"Events\",\"Wire safety\",\"Wire safety\",\"Wire safety\",\"Owning what arrives\",\"Deriving without a form\",\"Errors\",\"Errors\"] source []"

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined

 FAIL  |guides| tests/guides.test.ts > Form > keeps every compared summary and example equal to its source
AssertionError: expected [ …(99) ] to deeply equal []
+   "guides/form.md interface FormSchema: guide \"Everything a form asks — optional `name` / `label` / `help` / `groups`, and the required `fields` in presentation order.\" source \"Describes everything a form asks.\""
    … (the seed's worklist, minus the pitch, which the README case owns)
```

No control was planted in a file the unit did not own, so nothing is left to reverse; the red came
from the cases themselves against the unconverged tree.

Drop-in shape (Ruling 13 and its amendment): the header line reads "The constants that follow are
this package's own"; the `INTERNAL` block reads "the assertion that follows it fails when a name
here stops being stranded"; the `ROOT_FILES` doc line takes the pilot's wording; `GUIDE_SPEC` and
`own` are bound at file scope; the pin is the pilot's guard-and-continue loop with no local
predicate; the README case guards both sides before `toBe`; the equality case sits directly after
the methods loop and before `documents an example for every Surface function`. Two departures from
byte-for-byte, both pre-existing and deliberate: `/Interface$/u` keeps this package's unicode flag
(P.1 recorded it), and `resolveRoot(import.meta)` stays this package's root binding. The package's
own `imports only real exports in every root README ```ts fence` case and its flagship-fence section
were kept.

## Criterion 2 — headers, `Shape`, and the class rows

Every `## Surface` and `## Methods` table now heads `Summary` beside only `Kind`, `Shape`, or
`Returns`.

- `## Methods` `#### `FormInterface``: `Behavior` renamed `Summary`; `Returns` untouched.
- `### Schema and fields`, `### Answers and rules`, `### The form`: gained `Shape` between `Kind`
  and `Summary` (Ruling 15), each under Ruling 15's convention sentence verbatim. `### The form`
  adds one sentence of its own: "A class row and a function row carry none." — `Form`, `FormError`,
  `createForm`, and `isFormError` carry an empty cell.
- `### Constants`, `### Guards`, `### Helpers`, `### Cloners`, `### Parsers` stay `API | Kind |
  Summary`: their rows are constants and functions, which Ruling 15's trigger does not reach, and no
  cell of theirs carried a type literal to keep.
- Class rows: this guide has no `### Entities` table and documents no class under its own H3, so
  Ruling 5's rename and its added-row trigger have no site here. `Form` and `FormError` already
  carry rows in `### The form`, a mixed table that keeps its heading.

Rows whose literal stays in `Shape` (written by hand, every non-`Summary` cell then compared against
`git show HEAD:guides/form.md`): `FormSchema`, `FormGroup`, `FormField`, `FieldBase`, `FieldControl`,
`FieldChoice`, `TextField`, `EditorField`, `PasswordField`, `NumberField`, `DateField`, `TimeField`,
`DatetimeField`, `ColorField`, `ConfirmField`, `SelectField`, `CheckboxField`, `FileField`,
`FieldValue`, `FormValues`, `FieldRule`, `FieldRuleName`, `FieldValidator`, `FieldError`,
`EvaluationOptions`, `FormInterface`, `FormOptions`, `FormStatus`, `FormResult`, `FormEventMap`,
`FormErrorCode`. `FieldValidator`'s cell holds the alias's own call signature, the form contract's
converged guide uses for a function-type alias.

Hand-rebuild comparison (`tmp/d7n-form-converge/cells.py`, splitting on a pipe not preceded by a
backslash):

```
rows before: 177, rows after: 177
rows missing after: none
rows added after: none
non-Summary cells changed: 9   (the nine `Behavior` → `Summary` header cells of the Methods table)
```

Every other non-`Summary` cell in every table of the guide — `Kind`, `Returns`, and the Controls,
Rendering, Rules, Budgets, visibility, Events, error-code, and concept-inventory tables — is
byte-identical to the baseline.

## Criterion 3 — the doc blocks, then `--to guide`

Blocks rewritten by hand, each because the cell carried what the block lacked:

- `DateField`, `TimeField`, `ColorField` (`src/core/types.ts`): the description now names the
  control's own string format (`YYYY-MM-DD`, `HH:MM` with seconds optional, six-digit `#rrggbb`).
- `FileField`: description becomes "Represents one or more files, by name."; its `@remarks` gains
  "A value is the names alone: bytes never enter the document."
- `Form` (`src/core/Form.ts`): "Implements `FormInterface` exactly, over an owned schema, the answers
  given against it, and the errors they carry." — distinct from `FormInterface`'s own description,
  which the two rows previously shared.
- `FormInterface.invalidate`: `@remarks` added for the one-failure-per-field replacement and how
  long it lasts. `FormInterface.destroy`: `@remarks` gains the idempotence sentence.
- `isFieldValue`, `isFormSchema` (`src/core/validators.ts`): `@remarks` added for the non-finite
  refusal and for structure-alone against `auditSchema`.
- `matchesField`, `computeDefaults`, `formatMessage` (`src/core/helpers.ts`): `@remarks` added for
  the gate every write and seed passes through with its `STRING_LIMIT`/`LIST_LIMIT` reads, for
  `password` and `file` never appearing, and for the override-then-`RULE_MESSAGES` order.
- `parseValue` (`src/core/parsers.ts`): `@remarks` added for the numeric-string and
  `'true'`/`'false'` coercions.

`npm run docs -- --to guide` after those rewrites:
`rows read: 1, disagreements found: 99, written: 99, reported: 0`, then
`npx oxfmt --config .oxfmtrc.json --write guides/form.md README.md` (exit 0).

Ruling 7 landings — a fact a compared block cannot hold, placed in the guide's prose beside its
table, each named here:

- `### Schema and fields` intro: each control's interface adds its members to `FieldBase`, with a
  pointer to `## Controls`.
- After `### The form`: `FormInterface`'s readonly data members are the `Shape` cell's names before
  `plus`, and the call-signature members after it are documented under `## Methods`. The old
  paragraph that listed those members with glosses is gone (Ruling 15); every gloss it carried is
  worked through in the lifecycle, events, filling, and parking sections it belonged to.
- `### Constants` intro: which pattern is which rule's test, which patterns are a value's shape, and
  where each budget's value is stated (`## Budgets` for the ceilings, `### Patterns and where trust
  lives` for `PATTERN_LIMIT`).
- `### Guards` intro: `isFieldValue` refuses a non-finite number, and `isFormSchema` reads structure
  alone.
- `## Methods` intro: the overload sets `fill`, `disable`, and `enable` carry, and the all-or-nothing
  check, which the compared first-overload blocks cannot state.

## Criterion 4 — the titled pair

`createForm` (`src/core/factories.ts`) is the primary factory and the first `create*` the facts block
lists; its block is the titled one. The fence that demonstrates it is the guide's first, which sat
under the structural `## Surface` heading, so Ruling 9's heading was added directly above it:
`### Open a form, answer it, and settle it` (the wording of the lead-in sentence it replaces). The
heading text occurs once, heading-scoped: `grep -c '^#\+ Open a form, answer it, and settle it'
guides/form.md` → `1`. The fence body carries no three-backtick run and no doc-comment terminator.

Fence bodies read before choosing: the `## Surface` fence (chosen) and, as the alternative under the
factory, the `### Errors` closing fence that constructs `new Form(...)`. The Surface fence
demonstrates the whole opening-to-settling path the factory's block already showed, plus the parked
`answer`, so Ruling 14 extends the block toward the fence and deletes nothing: the block gains the
`import` line, `const result =` before `form.submit()`, and the `const answers = await form.answer`
line.

Title run recorded first: with the title added and no other change, `npm run docs` read
`rows read: 1, disagreements found: 1` — the pair alone. `npm run docs -- --to source` then read
`rows read: 1, disagreements found: 1, written: 1, reported: 0`, run last, after the summaries
already agreed. Every other `@example` block stays untitled.

## Criterion 5 — the tagline, the opening prose, and the pitch

The H1 blockquote is one noun phrase in plain text and code spans, no link and no bold:

```
> The environment-agnostic form document: a `FormSchema` stating what is asked, a `Form` holding
> the answers given against it, declarative `FieldRule` data stating what those answers must
> satisfy, and one submit that settles the form exactly once.
```

`README.md` carries that blockquote under its H1 with the same line breaks; `diff` over the two
three-line spans reports no difference.

Guide sentences displaced from the old blockquote, folded into new opening prose after it, none of
them restating a tagline clause: "Nothing here renders, reads a keyboard, or opens a socket."; the
terminal-prompt-and-browser-form paragraph whole, ending "This package ships the document both hosts
share."; and the pure-and-total paragraph whole, ending "A custom validator's own throw escapes the
mutation call unchanged."

README sentences changed: the opening paragraph loses its restatement of the tagline's clauses
("a schema of field controls, the answers given against it, declarative validation carried as data,
and a submit that settles exactly once") and keeps the onboarding it alone carries — the same-thing-
in-different-places sentence, the `answer` parking seam, `disable` and `enable` on a live form, and
the budgets bounding what arrives from a wire. The trailing "Built on `@orkestrel/contract` and
`@orkestrel/emitter`" line folds into that paragraph and picks up "and part of the `@orkestrel`
line", which the removed opening had carried.

`## Tests` (the guide's `tests/guides.test.ts` bullet) now names the equality gate descriptively:
every `Summary` cell against its declaration's description paragraph, the titled `Open a form,
answer it, and settle it` fence against the `@example` block of that title, and the README pitch
against the tagline. No SQ/MQ/EQ/RQ identifier.

## Criterion 6 — the seed

```
npm run docs                  → rows read: 1, disagreements found: 0                             exit 0
npm run docs -- --to guide    → rows read: 1, disagreements found: 0, written: 0, reported: 0
npm run docs -- --to source   → rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — gates

```
npx oxfmt --config .oxfmtrc.json --check <owned paths>   → All matched files use the correct format.  exit 0
npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts paths>  → no diagnostic                 exit 0
npm run check                                            → exit 0
npm run test:guides                                      → Test Files 1 passed (1), Tests 51 passed (51)
npm run test:policy                                      → Test Files 1 passed (1), Tests 90 passed | 1 skipped (91)
```

Observation (not a criterion): `npm run test:src:core` → `Test Files 9 passed (9), Tests 183 passed
(183)`, 869 ms, on a host carrying sibling units.

## Criterion 8 — tree

```
 M README.md
 M guides/form.md
 M src/core/Form.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Owned files only. `git diff --check` exits 0. Diffstat: 9 files changed, 312 insertions(+), 181
deletions(-). Instruments sit in the git-ignored `tmp/d7n-form-converge/`.

## Reader and seed defects met

None. `replaceCell` rewrote 99 cells across three- and four-column tables without disturbing a
non-`Summary` cell; `replaceExample` carried the titled body in on its own; `rows read` stayed
non-zero on every run; and no residual disagreement survived a doc-block rewrite under the P16
comparator.

## Ancillary decisions

- **`### Errors` promoted to `## Errors`.** Its `| Code | Raised when |` table documents error codes
  rather than members, and it sat inside the `## Methods` section only by document order, where the
  criterion "every `## Methods` table heads `Summary`" would have reached a table no reader keys and
  no declaration backs. Promoting the heading moves no content, keeps the `#errors` anchor, and
  leaves `## Methods` holding one table: `FormInterface`'s. `collectGroups` claims a table only after
  an H4 with a code span, so the reading is unchanged; `npm run docs` and `test:guides` were re-run
  after the promotion and stayed at zero and green.
- **The demonstration heading replaces its lead-in sentence.** `### Open a form, answer it, and
  settle it` carries the words of the sentence that introduced the fence, so the sentence is not
  repeated under it; this is the pilot's shape at `abort/guides/abort.md:97`.
- **The `## Surface` section statement moved above that heading.** "Everything in this guide is
  exported from `@orkestrel/form` …" is a section-level statement and now sits directly under
  `## Surface`, before the demonstration subsection. No fence moved, and the fence's nearest
  preceding heading is still its own H3.
- **The Constants table gained no column.** Ruling 15's trigger is an interface or type-alias row,
  and the budget values the cells carried are stated in the sections that work them through, named
  in the table's intro.
- **Voice sweeps.** No count in prose and no all-caps emphasis was found in `guides/form.md` or
  `README.md`: every numeral hit (`six-digit`, `base-ten`, `two field values`, `two arguments`,
  `roughly two megabytes`, `four times over`, `four-digit year`) is a fixed arity, a format, or a
  measurement rather than a tally of a set anyone can add to. None was introduced.

## Deviation state

No deviation. Every acceptance criterion is closed on the readings quoted here.
