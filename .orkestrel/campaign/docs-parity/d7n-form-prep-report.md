# Report — `d7n-form-prep`

Wall clock: 2026-09-07T16:40:10Z (first command) to 2026-09-07T16:43:30Z (last command).

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line: `9 written, 27 unchanged, 0 removed in ..`

`git status --short` immediately after:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Three hunks, each an exact match to the reference shape at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (this package's `/Interface$/u` flag kept, matching form's own prior style):

**Methods loop** (before):
```ts
for (const group of guide.methods()) {
	const members = source.methods(group.interface)
	const entity = group.interface.replace(/Interface$/u, '')
	describe(`${group.interface}`, () => {
		it('documents at least one method', () => {
			expect(group.methods.length).toBeGreaterThan(0)
		})
		it('documents every interface method', () => {
			expect(findMissing(members, group.methods)).toEqual([])
		})
		it('documents no phantom method', () => {
			expect(findMissing(group.methods, members)).toEqual([])
		})
		it(`${entity} exposes no undocumented method`, () => {
			const extra =
				entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
			expect(extra).toEqual([])
		})
	})
}
```

(after):
```ts
for (const group of guide.methods()) {
	const members = source.methods(group.interface).map((method) => method.name)
	const documented = group.methods.map((method) => method.name)
	const entity = group.interface.replace(/Interface$/u, '')
	describe(`${group.interface}`, () => {
		it('documents at least one method', () => {
			expect(group.methods.length).toBeGreaterThan(0)
		})
		it('documents every interface method', () => {
			expect(findMissing(members, documented)).toEqual([])
		})
		it('documents no phantom method', () => {
			expect(findMissing(documented, members)).toEqual([])
		})
		it(`${entity} exposes no undocumented method`, () => {
			const extra =
				entity === group.interface
					? []
					: findMissing(
							source.methods(entity).map((method) => method.name),
							documented,
						)
			expect(extra).toEqual([])
		})
	})
}
```

**Examples case** (before):
```ts
expect(findUnexampled(names, fences, source.examples())).toEqual([])
```
(after):
```ts
expect(
	findUnexampled(
		names,
		fences,
		source.examples().map((example) => example.name),
	),
).toEqual([])
```

**Examples loop** (before):
```ts
for (const group of guide.methods()) {
	const entity = group.interface.replace(/Interface$/u, '')
	describe(`${group.interface} examples`, () => {
		it('documents an example for every method', () => {
			const fences = guide
				.fences()
				.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
				.map((fence) => fence.code)
			const examples =
				entity === group.interface
					? source.examples(group.interface)
					: source.examples(group.interface).concat(source.examples(entity))
			expect(findUnexampled(group.methods, fences, examples)).toEqual([])
		})
	})
}
```
(after):
```ts
for (const group of guide.methods()) {
	const entity = group.interface.replace(/Interface$/u, '')
	const documented = group.methods.map((method) => method.name)
	const examples =
		entity === group.interface
			? source.examples(group.interface).map((example) => example.name)
			: source
					.examples(group.interface)
					.map((example) => example.name)
					.concat(source.examples(entity).map((example) => example.name))
	describe(`${group.interface} examples`, () => {
		it('documents an example for every method', () => {
			const fences = guide
				.fences()
				.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
				.map((fence) => fence.code)
			expect(findUnexampled(documented, fences, examples)).toEqual([])
		})
	})
}
```

No other change to the suite. The `findMissing` call on the import walk (`statement.names` against `face.surface().map(...)`, `names` against `surface`) was left unchanged, as directed.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1, before any edit:

```
src/core/helpers.ts:77:1: error policy(no-banned-term): Replace just in this comment: delete.
tests/setup.ts:493:1: error policy(no-malformed-summary): Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.
```

**`src/core/helpers.ts` (`no-banned-term`, "just")**

Before:
```
 * configurable, so the record a parser hands back cannot be edited through the key it just filled.
```
After:
```
 * configurable, so the record a parser hands back cannot be edited through the key it filled.
```

**`tests/setup.ts` (`no-malformed-summary`)**

Before:
```
 * Build a {@link FieldValidator} that answers each call from a fixed sequence, clamping to the
 * last entry once the sequence is exhausted.
```
After (also removes the temporal `once` per the substitution table, in the same sentence the diagnostic named):
```
 * Builds a {@link FieldValidator} that answers each call from a fixed sequence, clamping to the
 * last entry after the sequence is exhausted.
```

`npx oxlint --config .oxlintrc.json --deny-warnings .` after both edits: exit 0, empty output.

`npm run test:policy` after the edits: exit 0, `90 passed | 1 skipped (91)` — no `prose` diagnostic named a line in `guides/**` or `README.md`, so no further edit was needed under this item.

## Item 4 — the bump

`package.json`: `"version": "0.0.5"` → `"version": "0.0.6"`. `package-lock.json` left untouched.

## Acceptance criteria

1. `git status --short`:
```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M src/core/helpers.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```
The P21 repair list, plus `tests/guides.test.ts` (item 2), plus `src/core/helpers.ts` and `tests/setup.ts` (item 3's two diagnostics), and nothing else.

2. `npm run format:check`: exit 0 ("All matched files use the correct format."). `npx oxlint --config .oxlintrc.json --deny-warnings .`: exit 0. `npm run check`: exit 0 (`tsc --noEmit --project tsconfig.json && npm run check:src` → `check:src:core` clean).

3. `npm run test:guides`: exit 0, `Tests  48 passed (48)`. `npm run test:policy`: exit 0, `Tests  90 passed | 1 skipped (91)`. `npm run test:config`: exit 0, `Tests  172 passed | 1 skipped (173)`.

4. `npm run docs`: exit 1. Full output:

```
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
```

Matches the P21 reading exactly, and is the converge unit's worklist.

## Deviations

None. `repair` wrote exactly the P21 paths, both before-texts were found verbatim, both voice diagnostics named in-scope files (`src/core/helpers.ts` under a comment, `tests/setup.ts` under `tests/**`), `test:policy` reported no red, and every gate other than `docs` read green.
