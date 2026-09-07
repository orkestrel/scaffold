# Brief — P.2 `d7n-form-converge` (form under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/form` from the committed baseline `ff9d979` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.6`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/form.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/form/guides/form.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-form-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/form.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/form.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/form.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/form.md interface FormSchema: guide "Everything a form asks — optional `name` / `label` / `help` / `groups`, and the required `fields` in presentation order." source "Describes everything a form asks."
guides/form.md interface FormGroup: guide "A named section of a form — `name` / `label` / optional `help`. Grouping arranges a form and changes no answer." source "Represents a named section of a form."
guides/form.md type FormField: guide "Any field a schema can declare — the union discriminated on `control`." source "Represents any field a schema can declare."
guides/form.md interface FieldBase: guide "What every field carries whatever its control — `name` / `label` / `help` / `group` / `hidden` / `disabled` / `locked` / `rule` / `meta`." source "Declares what every field carries, whatever its control."
guides/form.md type FieldControl: guide "The control a field presents — the discriminant that fixes the field's options and its value shape." source "Names the control a field presents to the person answering it."
guides/form.md interface FieldChoice: guide "One option a `select` or `checkbox` offers — `value` is stored, `label` is read, `help` explains, `disabled` refuses it." source "Represents one option a `select` or `checkbox` field offers."
guides/form.md interface TextField: guide "A single line of text — optional `default` and `placeholder`." source "Represents a single line of text."
guides/form.md interface EditorField: guide "Text over many lines — optional `default` and `placeholder`." source "Represents text over many lines."
guides/form.md interface PasswordField: guide "A secret, obscured as it is typed — optional `mask`, and no `default` by design." source "Represents a secret, obscured as it is typed."
guides/form.md interface NumberField: guide "A number — optional `default` and `placeholder`." source "Represents a number."
guides/form.md interface DateField: guide "A calendar date held as the control's own `YYYY-MM-DD` string — optional `default`." source "Represents a calendar date, held as the control's own string."
guides/form.md interface TimeField: guide "A time of day held as the control's own `HH:MM` string, seconds optional — optional `default`." source "Represents a time of day, held as the control's own string."
guides/form.md interface DatetimeField: guide "A date and time together with no zone, the browser's datetime-local — optional `default`." source "Represents a date and a time of day together, with no zone, held as the control's own string."
guides/form.md interface ColorField: guide "A color held as a six-digit `#rrggbb` string — optional `default`." source "Represents a color, held as the control's own string."
guides/form.md interface ConfirmField: guide "A single on/off box holding a boolean — optional `default`." source "Represents a single on/off box, holding a boolean."
guides/form.md interface SelectField: guide "One choice out of a list — required `choices`, optional `default`, and `open` to admit a value the list does not offer." source "Represents one choice out of a list."
guides/form.md interface CheckboxField: guide "Any number of choices out of a list, holding the checked values — required `choices`, optional `default`." source "Represents any number of choices out of a list, holding the checked values."
guides/form.md interface FileField: guide "One or more files, by name — optional `accept` media types and `multiple`." source "Represents one or more files."
guides/form.md type FieldValue: guide "Every value a field can hold — a `string`, a `number`, a `boolean`, or a `readonly string[]`." source "Represents every value a field can hold."
guides/form.md type FormValues: guide "A form's answers keyed by field name. A name with no key is a field nobody has answered." source "Represents a form's answers, keyed by field name."
guides/form.md interface FieldRule: guide "The constraints one field's value must satisfy — `required` / `minimum` / `maximum` / `step` / `pattern` / `email` / `url` / `integer` / `alphanumeric` / `custom`." source "Represents the constraints one field's value must satisfy."
guides/form.md type FieldRuleName: guide "Every rule that reports its failure by name — `FieldRule` without `custom`, and the key `FormOptions.messages` is keyed by." source "Lists every rule that reports its failure by name."
guides/form.md type FieldValidator: guide "The cross-field check `custom` runs — it receives the value or `undefined` and every answer the form holds, and returns `true` or a message; its own throw escapes after any earlier state change." source "Checks one value against the whole form."
guides/form.md interface FieldError: guide "One failed check — the `field`, the `message`, and the `rule` that produced it where a named rule did." source "Represents one failed check against one field."
guides/form.md interface EvaluationOptions: guide "How to check a schema against answers — per-rule `messages` overrides, and the `disabled` set that replaces the schema's own declarations." source "Describes how to check a schema against a set of answers."
guides/form.md class Form: guide "A form — a schema, the answers given against it, and the errors they carry. Implements `FormInterface` exactly." source "Represents a form: a schema, the answers given against it, and the errors they carry."
guides/form.md interface FormInterface: guide "The form contract — the readonly state in the `## Surface` rows plus the methods in `## Methods`." source "Represents a form: a schema, the answers given against it, and the errors they carry."
guides/form.md function createForm: guide "A form opened against a schema. The schema is copied, and the copy is what the form asks." source "Opens a form against a schema."
guides/form.md interface FormOptions: guide "How to open a form — `on` listeners, an `error` handler, seeded `values`, and per-rule `messages` overrides." source "Describes how to open a form."
guides/form.md type FormStatus: guide "Where a form sits in its life — `editing`, `settled`, or `abandoned`. Both end states are terminal." source "Represents where a form sits in its life."
guides/form.md type FormResult: guide "What a submit answers with — the values on success, or every `FieldError` that stopped them." source "Reports what a submit answers with: the values, or every error that stopped them."
guides/form.md type FormEventMap: guide "Everything a form announces — `fill` / `validate` / `disable` / `enable` / `submit` / `clear` / `abandon`." source "Lists everything a form announces."
guides/form.md class FormError: guide "An error raised by the form domain — a machine-readable `code` and optional structured `context`." source "Represents an error raised by the form domain."
guides/form.md type FormErrorCode: guide "The reason a `FormError` carries — `SCHEMA` / `FIELD` / `CONTROL` / `SETTLED` / `ABANDONED`." source "Names the machine-readable code a form error carries."
guides/form.md function isFormError: guide "Whether a caught value is a `FormError`, so a `catch` branches on `code` without an assertion." source "Determines whether an unknown value is a form error."
guides/form.md const FIELD_CONTROLS: guide "Every field control, in the order the public contract declares them." source "Lists every field control, in the order declared by the public contract."
guides/form.md const FIELD_BASE_KEYS: guide "The members every field declares, whatever its control." source "Lists the members every field declares, whatever its control."
guides/form.md const FIELD_KEYS: guide "Every member one control permits — the base members plus its own — as `isFormField` reads them." source "Lists every member one field control permits, composed from `FIELD_BASE_KEYS` and the members the control's own interface adds."
guides/form.md const FORM_STATUSES: guide "Every form lifecycle status — `editing`, `settled`, `abandoned`." source "Lists every form lifecycle status."
guides/form.md const RULE_MESSAGES: guide "The default failure copy for every named rule; `{limit}` is replaced with the rule's operand." source "Holds the default failure copy for every named field rule."
guides/form.md const EMAIL_PATTERN: guide "A practical whole-address email shape — the `email` rule's test." source "Matches a practical whole-address email shape."
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
```

## Facts for form (taken 2026-09-07T17:00Z by facts.sh)

- Checkout `/home/user/fleet/form`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `ff9d979`, status: clean
- `package.json`: version `0.0.6`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    165:			const members = source.methods(group.interface).map((method) => method.name)
    173:					expect(findMissing(members, documented)).toEqual([])
    176:					expect(findMissing(documented, members)).toEqual([])
    182:							: findMissing(
    183:									source.methods(entity).map((method) => method.name),
    201:				findUnexampled(
    204:					source.examples().map((example) => example.name),
    209:		for (const group of guide.methods()) {
    214:					? source.examples(group.interface).map((example) => example.name)
    218:							.concat(source.examples(entity).map((example) => example.name))
    225:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    237:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 1707:## Tests — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-form-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/form.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/form.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-form-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
