# Brief — P.1 `d7n-form-prep` (form's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/form` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `5d543fe`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

form's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== form 2026-09-07T16:39:08Z tarball sha256 7c24b68bca15d128
== before
0.0.17
(status end)
== replaced range
70:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 830ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### form (5d543fe, version 0.0.5, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 27 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setup.ts(1)
   src/core/helpers.ts(1)
-- docs
   guides/form.md const URL_PATTERN: guide "An absolute HTTP or HTTPS URL shape — the `url` rule's test." source "Matches an absolute HTTP or HTTPS URL shape."
   guides/form.md const ALPHANUMERIC_PATTERN: guide "One or more ASCII letters or digits — the `alphanumeric` rule's test." source "Matches one or more ASCII letters or digits."
   guides/form.md const INTEGER_PATTERN: guide "A signed or unsigned base-ten integer string — the `integer` rule's test on a text control." source "Matches a signed or unsigned base-ten integer string."
   guides/form.md const COLOR_PATTERN: guide "A six-digit hexadecimal color string — the shape a `color` value must have." source "Matches a six-digit hexadecimal color string."
   guides/form.md const DATE_PATTERN: guide "An ISO calendar date in `YYYY-MM-DD` form — the shape a `date` value must have." source "Matches an ISO calendar date string in `YYYY-MM-DD` form."
   guides/form.md const TIME_PATTERN: guide "A 24-hour time with optional seconds — the shape a `time` value must have." source "Matches a 24-hour time string with optional seconds."
   guides/form.md const DATETIME_PATTERN: guide "An ISO local date and time with optional seconds — the shape a `datetime` value must have." source "Matches an ISO local date and time string with optional seconds."
   guides/form.md const PATTERN_LIMIT: guide "The longest authored regular-expression source this package will compile: 256 characters." source "Caps the accepted source length for an authored regular expression."
   guides/form.md const FIELD_LIMIT: guide "The most fields one schema may declare: 512." source "Caps the number of fields one schema may declare."
   guides/form.md const GROUP_LIMIT: guide "The most groups one schema may declare: 64." source "Caps the number of groups one schema may declare."
   guides/form.md const CHOICE_LIMIT: guide "The most choices one `select` or `checkbox` may offer: 1024." source "Caps the number of choices one `select` or `checkbox` field may offer."
   guides/form.md const LIST_LIMIT: guide "The most entries one list-valued answer may hold: 1024." source "Caps the number of entries one list-valued answer may hold."
   guides/form.md const NAME_LIMIT: guide "The longest schema, group, or field name: 128 UTF-16 code units." source "Caps the length, in UTF-16 code units, of a schema, group, or field name."
   guides/form.md const STRING_LIMIT: guide "The longest single retained string: 65536 UTF-16 code units." source "Caps the length, in UTF-16 code units, of any single retained string."
   guides/form.md const TEXT_LIMIT: guide "The most string code units one schema may retain in total: 1048576." source "Caps the total length, in UTF-16 code units, of every string one schema retains."
   guides/form.md const NODE_LIMIT: guide "The most records, arrays, and leaves one schema may retain in total: 16384." source "Caps the total number of records, arrays, and leaves one schema retains."
   guides/form.md function isFieldControl: guide "Whether a value is one of the declared controls." source "Determines whether an unknown value is a declared field control."
   guides/form.md function isFormStatus: guide "Whether a value is a form lifecycle status." source "Determines whether an unknown value is a form lifecycle status."
   guides/form.md function isFieldValue: guide "Whether a value has a field-value shape — string, finite number, boolean, or list of strings." source "Determines whether an unknown value has a form field value shape."
   guides/form.md function isFieldChoice: guide "Whether a value is one exact `FieldChoice` record; an unknown member refuses it." source "Determines whether an unknown value is one exact field choice record."
   guides/form.md function isFieldRule: guide "Whether a value is one structurally valid `FieldRule` record." source "Determines whether an unknown value is one exact field rule record."
   guides/form.md function isFormField: guide "Whether a value is one exact discriminated `FormField`, checked against its control's own options." source "Determines whether an unknown value is one exact discriminated form field."
   guides/form.md function isFormGroup: guide "Whether a value is one exact `FormGroup` record." source "Determines whether an unknown value is one exact form group record."
   guides/form.md function isFormSchema: guide "Whether a value is one exact structural `FormSchema` — structure only, not domain soundness." source "Determines whether an unknown value is one exact structural form schema."
   guides/form.md function isFormValues: guide "Whether a value is a record whose every own key is a string and every value a `FieldValue`." source "Determines whether an unknown value is a record of field values."
   guides/form.md function isFieldError: guide "Whether a value is one exact `FieldError` record." source "Determines whether an unknown value is one exact field error record."
   guides/form.md function defineEntry: guide "One own enumerable entry written onto a record, so a `__proto__` key lands on the record rather than its prototype." source "Writes one own enumerable data property onto a record."
   guides/form.md function freezeEntry: guide "The same prototype-safe write, frozen — the entry is neither writable nor configurable." source "Writes one own enumerable data property that cannot be rewritten or removed."
   guides/form.md function matchesField: guide "Whether one control can hold a value — the shape gate every write and every seed passes through." source "Checks whether a value has the shape required by one field control."
   guides/form.md function matchesAnswer: guide "Whether a raw binding value counts as an answer — the documented projection a binding fills through." source "Decides whether a raw binding value projects to an answered field."
   guides/form.md function appliesRule: guide "Whether one named rule applies to one field control." source "Checks whether a named rule applies to one field control."
   guides/form.md function evaluateField: guide "Every failure one field's rule produces against its current value, in rule order." source "Evaluates one field rule against its current value."
   guides/form.md function evaluateForm: guide "Every failure the whole schema produces, in schema order then rule order; a disabled field is skipped." source "Evaluates every active field in schema order."
   guides/form.md function computeDefaults: guide "The values a schema explicitly seeds. `password` and `file` declare no default, so neither ever appears." source "Computes the values explicitly seeded by a schema."
   guides/form.md function matchesValue: guide "Whether two field values hold the same answer, comparing list values element by element." source "Compares two field values by scalar identity or ordered list content."
   guides/form.md function extractChanges: guide "The names whose answers differ between two value records, absence included." source "Extracts the names whose answers differ between two form value records."
   guides/form.md function matchesValues: guide "Whether two answer records hold the same answers, comparing list values element by element." source "Compares two form value records by keys and value content."
   guides/form.md function formatMessage: guide "One rule's resolved failure text — an override first, then `RULE_MESSAGES` — with `{limit}` substituted." source "Resolves and interpolates one rule message."
   guides/form.md function createFieldError: guide "One frozen named-rule failure: the field's name, the resolved message, and the rule." source "Creates one named-rule failure against a field."
   guides/form.md function serializeForm: guide "A schema projected into JSON, without any `custom` validator or absent member." source "Projects a schema into JSON while removing custom validators and absent values."
   guides/form.md function extractGroups: guide "The groups a schema's fields actually reference, in first-reference order and without duplicates." source "Selects referenced groups in first-reference field order."
   guides/form.md function auditSchema: guide "The domain-invariant faults a structurally valid schema carries, as human-readable diagnostics." source "Audits a structurally valid schema for domain invariants."
   guides/form.md function cloneValue: guide "One owned field value — a scalar unchanged, a list as a frozen copy." source "Clones one form value into an owned frozen snapshot."
   guides/form.md function cloneChoices: guide "A field's choices owned as a frozen list of frozen choice records." source "Clones a field's choices into an owned frozen snapshot."
   guides/form.md function cloneFormField: guide "One owned field, with its rule, its choices, its `meta`, and any list-valued default frozen." source "Clones one form field into an owned frozen snapshot."
   guides/form.md function cloneFormSchema: guide "A whole owned schema, with every nested group, field, rule, choice, and list frozen." source "Clones a form schema into an owned frozen snapshot."
   guides/form.md function parseForm: guide "Unknown wire data parsed into an owned, structurally valid, semantically sound schema; a `custom` rule is dropped." source "Parses unknown wire data into an owned, semantically sound form schema."
   guides/form.md function parseValue: guide "One answer parsed against its field's control, coercing a numeric string and `'true'` / `'false'`." source "Parses one answer against its field control."
   guides/form.md function parseValues: guide "A strict answer record parsed against a schema — one unknown key or one refused value refuses the whole record." source "Parses a strict answer record against the fields declared by a schema."
   guides/form.md FormInterface.field: guide absent source "Finds one field by name."
   guides/form.md FormInterface.fill: guide absent source "Answers several fields at once."
   guides/form.md FormInterface.touch: guide absent source "Records that somebody has visited a field."
   guides/form.md FormInterface.invalidate: guide absent source "Fails a field from outside, for what the rules cannot see."
   guides/form.md FormInterface.disable: guide absent source "Takes every field out of the form."
   guides/form.md FormInterface.enable: guide absent source "Puts every field back into the form."
   guides/form.md FormInterface.submit: guide absent source "Checks every answer and settles the form when they all pass."
   guides/form.md FormInterface.clear: guide absent source "Returns every answer to `FormInterface.baseline`, the answers the form opened with."
   guides/form.md FormInterface.destroy: guide absent source "Tears the form down, abandoning it when it has not settled."
   guides/form.md pitch: readme absent tagline "The environment-agnostic form document. A `FormSchema` states what is asked, a `Form` holds the answers given against it, declarative `FieldRule` data states what those answers must satisfy, and one submit settles the form exactly once. Nothing here renders, reads a keyboard, or opens a socket. A terminal prompt and a browser form are the same abstraction. Both ask a person a set of questions, hold partial answers, check them against rules, and finish once. What differs is the host, and each host contributes the one part it owns. Parking is the server environment's contribution: `answer` is a form whose result nobody has resolved yet, so a server can hand the document out, wait, and receive the answers back through the same promise a local caller awaits. Rendering is the browser's contribution, and it lives in the browser, not here. This package ships the document both hosts share. The core is pure and total. Every guard returns `false` off-shape rather than throwing, every parser returns `undefined` on refusal, and every value the form hands back is a frozen owned copy. Form-owned refusals raise `FormError`, and each one names a caller mistake. A custom validator's own throw escapes the mutation call unchanged."
   rows read: 1, disagreements found: 100
   exit 1
-- check
   tests/guides.test.ts(172,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(175,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(179,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(194,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(209,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 5 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  5 failed | 43 passed (48)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 2 | summary 1 | banned 1 | tests/setup.ts(1) src/core/helpers.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for form (taken 2026-09-07T16:39Z by facts.sh)

- Checkout `/home/user/fleet/form`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `5d543fe`, status: clean
- `package.json`: version `0.0.5`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 2 | summary 1 | banned 1 | tests/setup.ts(1) src/core/helpers.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                 | Source                    | Tests                                 |
    8:| ------- | -------------------- | ------------------------- | ------------------------------------- |
    9:| Form    | [`form.md`](form.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                |
    14:| ---------- | -------------------- |
    15:| `src/core` | [`form.md`](form.md) |
    26:| Mirror                       | Package               | Dependency  | What that package supplies here                                                       |
    27:| ---------------------------- | --------------------- | ----------- | ------------------------------------------------------------------------------------- |
    28:| [`contract.md`](contract.md) | `@orkestrel/contract` | runtime     | The outcome, guard, and JSON primitives `src/core` imports.                           |
    29:| [`emitter.md`](emitter.md)   | `@orkestrel/emitter`  | runtime     | The typed emitter a `Form` owns.                                                      |
    30:| [`guide.md`](guide.md)       | `@orkestrel/guide`    | development | The parity primitives [`tests/guides.test.ts`](../tests/guides.test.ts) runs on.      |
    31:| [`probe.md`](probe.md)       | `@orkestrel/probe`    | development | The `prove` instrument an agent arms against the `probe` Vitest project.              |
    32:| [`scaffold.md`](scaffold.md) | `@orkestrel/scaffold` | development | The generator that writes and repairs the vendored configuration, tests, and tooling. |
    33:| [`test.md`](test.md)         | `@orkestrel/test`     | development | The shared recorder, delay, and fixture helpers the suites import.                    |
- Guide `guides/form.md`: 1738 lines. Headings:
    1:# Form
    21:## Surface
    45:### Schema and fields
    70:### Answers and rules
    84:### The form
    107:### Constants
    138:### Guards
    156:### Helpers
    181:### Cloners
    194:### Parsers
    205:## Controls
    242:### text
    256:### editor
    269:### password
    286:### number
    302:### date
    315:### time
    329:### datetime
    342:### color
    355:### confirm
    368:### select
    393:### checkbox
    415:### file
    433:### meta
    500:### Rendering
    546:## Rules
    594:### How an answer is counted
    637:### The custom seam
    704:### Messages
    711:### Patterns and where trust lives
    743:### Budgets
    820:### Auditing a schema
    880:### The temporal patterns are lexical
    902:## Lifecycle and state
    958:### The visibility switches
    1000:### Taking a field out, and putting it back
    1132:### Filling, clearing, and failing from outside
    1183:### Park-as-Promise: `answer`
    1224:### Settle once
    1236:### The submit decision
    1262:### Retrying a submit
    1319:## Events
    1362:## Wire safety
    1448:### Owning what arrives
    1472:### Deriving without a form
    1509:## Methods
    1520:#### `FormInterface`
    1534:### Errors
    1586:## Contract
    1664:## Concept inventory
    1707:## Tests
    1735:## See also
- Table headers in `guides/form.md` (a header row is the row before a `| ---` row):
    49: | API             | Kind      | Summary                                                                                                                                   |
    74: | API                 | Kind      | Summary                                                                                                                                                                                            |
    88: | API             | Kind      | Summary                                                                                                         |
    113: | API                    | Kind  | Summary                                                                                         |
    143: | API              | Kind     | Summary                                                                                            |
    162: | API                | Kind     | Summary                                                                                                             |
    187: | API               | Kind     | Summary                                                                                      |
    199: | API           | Kind     | Summary                                                                                                            |
    227: | Control    | Value               | Its own options              | Notes                                                          |
    515: | Control    | Category             | What moves it                                                                                                                      | What the renderer owes                                                                                                            |
    552: | Rule           | Operand          | What it measures                                                                                                                                  |
    750: | Constant       | Value   | Unit                    | Bounds                                    |
    962: | Switch     | Renderer obligation          | `fill`  | Validated | Submitted |
    1323: | Event      | Payload                               | Fires                                                                                                                                                                                                                                                                                                          |
    1522: | Method       | Returns                    | Behavior                                                                                                           |
    1540: | Code        | Raised when                                                                                                                                                                                                                       |
    1671: | Concept                                | Layer         | Why it sits there                                                                                                                                                                                                                                                                     |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/form.md`):
    3: > The environment-agnostic form document. A `FormSchema` states what is asked, a `Form` holds the
    4: > answers given against it, declarative `FieldRule` data states what those answers must satisfy, and
    5: > one submit settles the form exactly once. Nothing here renders, reads a keyboard, or opens a
    6: > socket.
    7: >
    8: > **A terminal prompt and a browser form are the same abstraction.** Both ask a person a set of
    9: > questions, hold partial answers, check them against rules, and finish once. What differs is the
    10: > host, and each host contributes the one part it owns. Parking is the server environment's
    11: > contribution: `answer` is a form whose result nobody has resolved yet, so a server can hand the
    12: > document out, wait, and receive the answers back through the same promise a local caller awaits.
    13: > Rendering is the browser's contribution, and it lives in the browser, not here. This package ships
    14: > the document both hosts share.
    15: >
    16: > The core is pure and total. Every guard returns `false` off-shape rather than throwing, every
    17: > parser returns `undefined` on refusal, and every value the form hands back is a frozen owned copy.
    18: > Form-owned refusals raise `FormError`, and each one names a caller mistake. A custom validator's
    19: > own throw escapes the mutation call unchanged.
- Opening prose after the blockquote (first two lines):
    21: ## Surface
    23: Open a form, answer it, and settle it:
- README (`README.md`) first lines:
    # @orkestrel/form
    
    The environment-agnostic form document for the `@orkestrel` line — a schema of field controls, the
    answers given against it, declarative validation carried as data, and a submit that settles exactly
    once. A terminal prompt and a browser form ask the same thing in different places, so this package
    ships what they share and neither renders nor reads input itself. Its `answer` promise is the
    parking seam a server needs: hand the document out, wait, receive the answers back. A live form can
    take a field out and put it back with `disable` and `enable`, and exported budgets bound what one
    schema and its answers may retain, so a document that arrives from a wire costs a known maximum
    before anything decides to trust it.
    Built on `@orkestrel/contract` and `@orkestrel/emitter`.
    
- `## Patterns` fences, each with its nearest preceding heading:
    25: fence under "## Surface"
    244: fence under "### text"
    258: fence under "### editor"
    274: fence under "### password"
    290: fence under "### number"
    304: fence under "### date"
    317: fence under "### time"
    331: fence under "### datetime"
    344: fence under "### color"
    357: fence under "### confirm"
    377: fence under "### select"
    399: fence under "### checkbox"
    420: fence under "### file"
    471: fence under "### meta"
    575: fence under "## Rules"
    610: fence under "### How an answer is counted"
    647: fence under "### The custom seam"
    665: fence under "### The custom seam"
    684: fence under "### The custom seam"
    727: fence under "### Patterns and where trust lives"
    798: fence under "### Budgets"
    851: fence under "### Auditing a schema"
    892: fence under "### The temporal patterns are lexical"
    927: fence under "## Lifecycle and state"
    977: fence under "### The visibility switches"
    1007: fence under "### Taking a field out, and putting it back"
    1059: fence under "### Taking a field out, and putting it back"
    1115: fence under "### Taking a field out, and putting it back"
    1149: fence under "### Filling, clearing, and failing from outside"
    1193: fence under "### Park-as-Promise: `answer`"
    1208: fence under "### Park-as-Promise: `answer`"
    1290: fence under "### Retrying a submit"
    1337: fence under "## Events"
    1369: fence under "## Wire safety"
    1399: fence under "## Wire safety"
    1418: fence under "## Wire safety"
    1458: fence under "### Owning what arrives"
    1478: fence under "### Deriving without a form"
    1548: fence under "### Errors"
    1578: fence under "### Errors"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/factories.ts:30:export function createForm(schema: FormSchema, options?: FormOptions): FormInterface {
    src/core/helpers.ts:554:export function createFieldError(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/core/Form.ts:55:export class Form implements FormInterface {
    src/core/errors.ts:17:export class FormError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/factories.ts:3
    src/core/Form.ts:2
    src/core/helpers.ts:3
    src/core/types.ts:13
    src/core/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    23:} from '@orkestrel/guide'
    100:const ROOT_FILES = Object.freeze(['AGENTS.md', 'README.md'])
    106:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    121:			expect(findMissing(names, surface)).toEqual([])
    164:		for (const group of guide.methods()) {
    165:			const members = source.methods(group.interface)
    172:					expect(findMissing(members, group.methods)).toEqual([])
    175:					expect(findMissing(group.methods, members)).toEqual([])
    179:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    194:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    197:		for (const group of guide.methods()) {
    207:							? source.examples(group.interface)
    208:							: source.examples(group.interface).concat(source.examples(entity))
    209:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    221:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 1707:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.5"` → `"version": "0.0.6"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-form-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
