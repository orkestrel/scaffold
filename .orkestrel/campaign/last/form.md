# Last changes: form

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `ec87b5a`, merge base with `origin/main` `7779e6b`, layer L2, declared version 0.0.3, registry version 0.0.3.

## Commits since origin/main

```text
25f1c85 2026-08-28 Update every dependency to the published latest
6bff17d 2026-08-28 Adopt the catalog and guide mirrors for the wave
77d8274 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
b1fcb29 2026-09-01 Apply the verified src-audit fixes
1313672 2026-09-01 Adopt the renamed guide helpers in the parity test
d51fac8 2026-09-02 Close the fix-round audit findings in form
ec87b5a 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md       |  17 +++---
 package.json                      |   6 +--
 src/core/Form.ts                  | 134 +++++++++++++++++++----------------------------
 src/core/cloners.ts               |   8 +--
 src/core/constants.ts             |  73 +++++++++++++++++++-------
 src/core/errors.ts                |  12 ++---
 src/core/factories.ts             |   2 +-
 src/core/helpers.ts               | 222 ++++++++++++++++++++++++++++++++++++++++--------------------------------------
 src/core/parsers.ts               |  36 +++----------
 src/core/types.ts                 | 112 +++++++++++++++++++--------------------
 src/core/validators.ts            | 174 +++++++++----------------------------------------------------
 tests/guides.test.ts              |  24 ++++-----
 tests/src/core/Form.test.ts       |  29 ++++++++++-
 tests/src/core/constants.test.ts  |  23 ++++++++
 tests/src/core/helpers.test.ts    |  90 ++++++++++++++++++++++++++++++++
 tests/src/core/index.test.ts      |   5 ++
 tests/src/core/validators.test.ts |  11 ++++
 17 files changed, 502 insertions(+), 476 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 4c8b49f..f4fddab 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,6 +1,6 @@
 import type { FieldControl, FieldRuleName, FormStatus } from './types.js'
 
-/** Every field control, in the order declared by the public contract. */
+/** Lists every field control, in the order declared by the public contract. */
 export const FIELD_CONTROLS: readonly FieldControl[] = Object.freeze([
 	'text',
 	'editor',
@@ -16,14 +16,47 @@ export const FIELD_CONTROLS: readonly FieldControl[] = Object.freeze([
 	'file',
 ])
 
-/** Every form lifecycle status. */
+/** Lists the members every field declares, whatever its control. */
+export const FIELD_BASE_KEYS: readonly string[] = Object.freeze([
+	'control',
+	'name',
+	'label',
+	'help',
+	'group',
+	'hidden',
+	'disabled',
+	'locked',
+	'rule',
+	'meta',
+])
+
+/**
+ * Lists every member one field control permits, composed from {@link FIELD_BASE_KEYS} and the
+ * members the control's own interface adds.
+ */
+export const FIELD_KEYS: Readonly<Record<FieldControl, readonly string[]>> = Object.freeze({
+	text: Object.freeze([...FIELD_BASE_KEYS, 'default', 'placeholder']),
+	editor: Object.freeze([...FIELD_BASE_KEYS, 'default', 'placeholder']),
+	password: Object.freeze([...FIELD_BASE_KEYS, 'mask']),
+	number: Object.freeze([...FIELD_BASE_KEYS, 'default', 'placeholder']),
+	date: Object.freeze([...FIELD_BASE_KEYS, 'default']),
+	time: Object.freeze([...FIELD_BASE_KEYS, 'default']),
+	datetime: Object.freeze([...FIELD_BASE_KEYS, 'default']),
+	color: Object.freeze([...FIELD_BASE_KEYS, 'default']),
+	confirm: Object.freeze([...FIELD_BASE_KEYS, 'default']),
+	select: Object.freeze([...FIELD_BASE_KEYS, 'choices', 'default', 'open']),
+	checkbox: Object.freeze([...FIELD_BASE_KEYS, 'choices', 'default']),
+	file: Object.freeze([...FIELD_BASE_KEYS, 'accept', 'multiple']),
+})
+
+/** Lists every form lifecycle status. */
 export const FORM_STATUSES: readonly FormStatus[] = Object.freeze([
 	'editing',
 	'settled',
 	'abandoned',
 ])
 
-/** Default failure copy for every named field rule. */
+/** Holds the default failure copy for every named field rule. */
 export const RULE_MESSAGES: Readonly<Record<FieldRuleName, string>> = Object.freeze({
 	required: 'This field is required',
 	minimum: 'Must be at least {limit}',
@@ -36,55 +69,55 @@ export const RULE_MESSAGES: Readonly<Record<FieldRuleName, string>> = Object.fre
 	alphanumeric: 'Must contain only letters and numbers',
 })
 
-/** A practical whole-address email shape. */
+/** Matches a practical whole-address email shape. */
 export const EMAIL_PATTERN = Object.freeze(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
 
-/** An absolute HTTP or HTTPS URL shape. */
+/** Matches an absolute HTTP or HTTPS URL shape. */
 export const URL_PATTERN = Object.freeze(/^https?:\/\/[^\s]+$/)
 
-/** One or more ASCII letters or digits. */
+/** Matches one or more ASCII letters or digits. */
 export const ALPHANUMERIC_PATTERN = Object.freeze(/^[A-Za-z0-9]+$/)
 
-/** A signed or unsigned base-ten integer string. */
+/** Matches a signed or unsigned base-ten integer string. */
 export const INTEGER_PATTERN = Object.freeze(/^[+-]?\d+$/)
 
-/** A six-digit hexadecimal color string. */
+/** Matches a six-digit hexadecimal color string. */
 export const COLOR_PATTERN = Object.freeze(/^#[0-9A-Fa-f]{6}$/)
 
-/** An ISO calendar date string in `YYYY-MM-DD` form. */
+/** Matches an ISO calendar date string in `YYYY-MM-DD` form. */
 export const DATE_PATTERN = Object.freeze(/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/)
 
-/** A 24-hour time string with optional seconds. */
+/** Matches a 24-hour time string with optional seconds. */
 export const TIME_PATTERN = Object.freeze(/^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/)
 
-/** An ISO local date and time string with optional seconds. */
+/** Matches an ISO local date and time string with optional seconds. */
 export const DATETIME_PATTERN = Object.freeze(
 	/^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])T(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/,
 )
 
-/** The maximum accepted source length for an authored regular expression. */
+/** Caps the accepted source length for an authored regular expression. */
 export const PATTERN_LIMIT = 256
 
-/** The maximum number of fields one schema may declare. */
+/** Caps the number of fields one schema may declare. */
 export const FIELD_LIMIT = 512
 
-/** The maximum number of groups one schema may declare. */
+/** Caps the number of groups one schema may declare. */
 export const GROUP_LIMIT = 64
 
-/** The maximum number of choices one `select` or `checkbox` field may offer. */
+/** Caps the number of choices one `select` or `checkbox` field may offer. */
 export const CHOICE_LIMIT = 1024
 
-/** The maximum number of entries one list-valued answer may hold. */
+/** Caps the number of entries one list-valued answer may hold. */
 export const LIST_LIMIT = 1024
 
-/** The maximum length, in UTF-16 code units, of a schema, group, or field name. */
+/** Caps the length, in UTF-16 code units, of a schema, group, or field name. */
 export const NAME_LIMIT = 128
 
-/** The maximum length, in UTF-16 code units, of any single retained string. */
+/** Caps the length, in UTF-16 code units, of any single retained string. */
 export const STRING_LIMIT = 65536
 
-/** The maximum total length, in UTF-16 code units, of every string one schema retains. */
+/** Caps the total length, in UTF-16 code units, of every string one schema retains. */
 export const TEXT_LIMIT = 1048576
 
-/** The maximum total number of records, arrays, and leaves one schema retains. */
+/** Caps the total number of records, arrays, and leaves one schema retains. */
 export const NODE_LIMIT = 16384
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 246bece..96a321c 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,16 +1,16 @@
 import type { JSONRecord } from '@orkestrel/contract'
 import type { FormErrorCode } from './types.js'
 
-/** An error raised by the form domain. */
+/** Represents an error raised by the form domain. */
 export class FormError extends Error {
-	/** The machine-readable reason for this failure. */
+	/** Holds the machine-readable reason for this failure. */
 	readonly code: FormErrorCode
 
-	/** Structured values that locate or explain this failure. */
+	/** Holds structured values that locate or explain this failure. */
 	readonly context?: JSONRecord
 
 	/**
-	 * Create a form error.
+	 * Creates a form error.
 	 *
 	 * @param code - The machine-readable reason.
 	 * @param message - The human-readable failure text.
@@ -25,10 +25,10 @@ export class FormError extends Error {
 }
 
 /**
- * Determine whether an unknown value is a form error.
+ * Determines whether an unknown value is a form error.
  *
  * @param input - The value to inspect.
- * @returns Whether the value is a {@link FormError} instance.
+ * @returns True if the value is a {@link FormError} instance; false otherwise.
  */
 export function isFormError(input: unknown): input is FormError {
 	return input instanceof FormError
diff --git a/src/core/types.ts b/src/core/types.ts
index a5c0d5e..124d052 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -2,7 +2,7 @@ import type { JSONRecord, Result } from '@orkestrel/contract'
 import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
 
 /**
- * The control a field presents to the person answering it.
+ * Names the control a field presents to the person answering it.
  *
  * @remarks
  * The control is the discriminant of every {@link FormField} variant, so choosing it fixes
@@ -33,7 +33,7 @@ export type FieldControl =
 	| 'file'
 
 /**
- * Every value a field can hold.
+ * Represents every value a field can hold.
  *
  * @remarks
  * The variant follows the control: text-like controls hold a `string`, `number` holds a
@@ -43,7 +43,7 @@ export type FieldControl =
 export type FieldValue = string | number | boolean | readonly string[]
 
 /**
- * A form's answers, keyed by field name.
+ * Represents a form's answers, keyed by field name.
  *
  * @remarks
  * A name with no key is a field nobody has answered. A disabled field's value may appear so a
@@ -57,7 +57,7 @@ export type FieldValue = string | number | boolean | readonly string[]
 export type FormValues = Readonly<Record<string, FieldValue>>
 
 /**
- * Where a form sits in its life.
+ * Represents where a form sits in its life.
  *
  * @remarks
  * A form opens `editing`, turns `settled` on its first valid submit, and turns `abandoned`
@@ -71,7 +71,7 @@ export type FormValues = Readonly<Record<string, FieldValue>>
 export type FormStatus = 'editing' | 'settled' | 'abandoned'
 
 /**
- * The machine-readable code a form error carries.
+ * Names the machine-readable code a form error carries.
  *
  * @remarks
  * `SCHEMA` rejects a malformed schema. `FIELD` names a field the schema does not declare.
@@ -81,7 +81,7 @@ export type FormStatus = 'editing' | 'settled' | 'abandoned'
 export type FormErrorCode = 'SCHEMA' | 'FIELD' | 'CONTROL' | 'SETTLED' | 'ABANDONED'
 
 /**
- * One option a `select` or `checkbox` field offers.
+ * Represents one option a `select` or `checkbox` field offers.
  *
  * @remarks
  * `value` is what the form stores and `label` is what the person reads. `help` explains the
@@ -96,7 +96,7 @@ export interface FieldChoice {
 }
 
 /**
- * Check one value against the whole form.
+ * Checks one value against the whole form.
  *
  * @remarks
  * It runs after every named rule, and it runs on an absent value as well as a present one. That
@@ -120,7 +120,7 @@ export interface FieldChoice {
 export type FieldValidator = (value: FieldValue | undefined, values: FormValues) => true | string
 
 /**
- * The constraints one field's value must satisfy.
+ * Represents the constraints one field's value must satisfy.
  *
  * @remarks
  * `minimum` and `maximum` measure whatever the control makes countable: characters for
@@ -151,7 +151,7 @@ export interface FieldRule {
 }
 
 /**
- * Every rule that reports its failure by name.
+ * Lists every rule that reports its failure by name.
  *
  * @remarks
  * `custom` is excluded because it supplies its own message, so nothing keyed by a rule name
@@ -160,7 +160,7 @@ export interface FieldRule {
 export type FieldRuleName = Exclude<keyof FieldRule, 'custom'>
 
 /**
- * One failed check against one field.
+ * Represents one failed check against one field.
  *
  * @remarks
  * `rule` names the constraint that failed. It is absent when the message came from a
@@ -174,7 +174,7 @@ export interface FieldError {
 }
 
 /**
- * What every field carries, whatever its control.
+ * Declares what every field carries, whatever its control.
  *
  * @remarks
  * `name` keys the field in {@link FormValues} and `group` names a {@link FormGroup}.
@@ -201,14 +201,14 @@ export interface FieldBase {
 	readonly meta?: JSONRecord
 }
 
-/** A single line of text. */
+/** Represents a single line of text. */
 export interface TextField extends FieldBase {
 	readonly control: 'text'
 	readonly default?: string
 	readonly placeholder?: string
 }
 
-/** Text over many lines. */
+/** Represents text over many lines. */
 export interface EditorField extends FieldBase {
 	readonly control: 'editor'
 	readonly default?: string
@@ -216,7 +216,7 @@ export interface EditorField extends FieldBase {
 }
 
 /**
- * A secret, obscured as it is typed.
+ * Represents a secret, obscured as it is typed.
  *
  * @remarks
  * It carries no `default` deliberately: a seeded secret is a secret written down. `mask` is
@@ -227,45 +227,45 @@ export interface PasswordField extends FieldBase {
 	readonly mask?: string
 }
 
-/** A number. */
+/** Represents a number. */
 export interface NumberField extends FieldBase {
 	readonly control: 'number'
 	readonly default?: number
 	readonly placeholder?: string
 }
 
-/** A calendar date, held as the control's own string. */
+/** Represents a calendar date, held as the control's own string. */
 export interface DateField extends FieldBase {
 	readonly control: 'date'
 	readonly default?: string
 }
 
-/** A time of day, held as the control's own string. */
+/** Represents a time of day, held as the control's own string. */
 export interface TimeField extends FieldBase {
 	readonly control: 'time'
 	readonly default?: string
 }
 
-/** A date and a time of day together, with no zone, held as the control's own string. */
+/** Represents a date and a time of day together, with no zone, held as the control's own string. */
 export interface DatetimeField extends FieldBase {
 	readonly control: 'datetime'
 	readonly default?: string
 }
 
-/** A color, held as the control's own string. */
+/** Represents a color, held as the control's own string. */
 export interface ColorField extends FieldBase {
 	readonly control: 'color'
 	readonly default?: string
 }
 
-/** A single on/off box, holding a boolean. */
+/** Represents a single on/off box, holding a boolean. */
 export interface ConfirmField extends FieldBase {
 	readonly control: 'confirm'
 	readonly default?: boolean
 }
 
 /**
- * One choice out of a list.
+ * Represents one choice out of a list.
  *
  * @remarks
  * `open` admits a value the list does not offer, which is what turns a closed menu into a
@@ -279,7 +279,7 @@ export interface SelectField extends FieldBase {
 }
 
 /**
- * Any number of choices out of a list, holding the checked values.
+ * Represents any number of choices out of a list, holding the checked values.
  *
  * @remarks
  * A field offering one box that means yes or no is a {@link ConfirmField}, not a one-choice
@@ -292,7 +292,7 @@ export interface CheckboxField extends FieldBase {
 }
 
 /**
- * One or more files.
+ * Represents one or more files.
  *
  * @remarks
  * `accept` lists the media types and extensions the control offers, in the form the host
@@ -305,7 +305,7 @@ export interface FileField extends FieldBase {
 }
 
 /**
- * Any field a schema can declare.
+ * Represents any field a schema can declare.
  *
  * @remarks
  * The union discriminates on `control`, so narrowing on that member reaches each variant's
@@ -333,7 +333,7 @@ export type FormField =
 	| FileField
 
 /**
- * A named section of a form.
+ * Represents a named section of a form.
  *
  * @remarks
  * A field joins a group through {@link FieldBase.group}. Grouping arranges the form and
@@ -346,7 +346,7 @@ export interface FormGroup {
 }
 
 /**
- * Everything a form asks.
+ * Describes everything a form asks.
  *
  * @remarks
  * `fields` is the schema's only required member, and the order it declares is the order the
@@ -372,7 +372,7 @@ export interface FormSchema {
 }
 
 /**
- * What a submit answers with: the values, or every error that stopped them.
+ * Reports what a submit answers with: the values, or every error that stopped them.
  *
  * @example
  * ```ts
@@ -383,7 +383,7 @@ export interface FormSchema {
 export type FormResult = Result<FormValues, readonly FieldError[]>
 
 /**
- * Everything a form announces.
+ * Lists everything a form announces.
  *
  * @remarks
  * `fill` carries the field that changed and its new value, where `undefined` is the value
@@ -403,7 +403,7 @@ export type FormEventMap = {
 }
 
 /**
- * How to check a schema against a set of answers.
+ * Describes how to check a schema against a set of answers.
  *
  * @param options - The evaluation's settings.
  * @remarks
@@ -428,7 +428,7 @@ export interface EvaluationOptions {
 }
 
 /**
- * How to open a form.
+ * Describes how to open a form.
  *
  * @param options - The form's settings.
  * @remarks
@@ -453,7 +453,7 @@ export interface FormOptions {
 }
 
 /**
- * A form: a schema, the answers given against it, and the errors they carry.
+ * Represents a form: a schema, the answers given against it, and the errors they carry.
  *
  * @remarks
  * `valid` is true when the last completed evaluation found no error, and `dirty` is true once
@@ -470,26 +470,26 @@ export interface FormOptions {
  * ```
  */
 export interface FormInterface {
-	/** The form's event emitter. */
+	/** Holds the form's event emitter. */
 	readonly emitter: EmitterInterface<FormEventMap>
-	/** The schema this form asks. */
+	/** Holds the schema this form asks. */
 	readonly schema: FormSchema
-	/** The answers held right now. */
+	/** Reports the answers held right now. */
 	readonly values: FormValues
 	/**
-	 * The answers the form opened with: the schema's defaults, overlaid with any seeded values.
+	 * Holds the answers the form opened with: the schema's defaults, overlaid with any seeded values.
 	 *
 	 * @remarks
 	 * It is fixed when the form opens and never moves again, so it is what `dirty` measures
 	 * against and what {@link FormInterface.clear} returns to.
 	 */
 	readonly baseline: FormValues
-	/** Every error the last check produced. */
+	/** Holds every error the last check produced. */
 	readonly errors: readonly FieldError[]
-	/** The names of the fields somebody has visited. */
+	/** Lists the names of the fields somebody has visited. */
 	readonly touched: ReadonlySet<string>
 	/**
-	 * The names of the fields currently out of the form.
+	 * Lists the names of the fields currently out of the form.
 	 *
 	 * @remarks
 	 * It opens as the set the schema declares through {@link FieldBase.disabled} and moves with
@@ -497,14 +497,14 @@ export interface FormInterface {
 	 * holds the declaration and this holds the current fact.
 	 */
 	readonly disabled: ReadonlySet<string>
-	/** Where the form sits in its life. */
+	/** Reports where the form sits in its life. */
 	readonly status: FormStatus
-	/** Whether the last completed evaluation found no error. */
+	/** Reports whether the last completed evaluation found no error. */
 	readonly valid: boolean
-	/** Whether any answer has moved since the form opened. */
+	/** Reports whether any answer has moved since the form opened. */
 	readonly dirty: boolean
 	/**
-	 * The answers, once the form settles.
+	 * Holds the answers after the form settles.
 	 *
 	 * @remarks
 	 * It resolves with the submitted values on the first valid submit, and rejects when teardown
@@ -512,40 +512,40 @@ export interface FormInterface {
 	 */
 	readonly answer: Promise<FormValues>
 	/**
-	 * Find one field by name.
+	 * Finds one field by name.
 	 *
 	 * @param name - The field's name.
 	 * @returns The field, or `undefined` when the schema declares no such name.
 	 */
 	field(name: string): FormField | undefined
 	/**
-	 * Answer several fields at once.
+	 * Answers several fields at once.
 	 *
 	 * @param values - The answers to write, each keyed by its field name.
 	 */
 	fill(values: FormValues): void
 	/**
-	 * Answer one field.
+	 * Answers one field.
 	 *
 	 * @param name - The field's name.
 	 * @param value - The answer to write, or `undefined` to clear it.
 	 */
 	fill(name: string, value: FieldValue | undefined): void
 	/**
-	 * Record that somebody has visited a field.
+	 * Records that somebody has visited a field.
 	 *
 	 * @param name - The field's name.
 	 */
 	touch(name: string): void
 	/**
-	 * Fail a field from outside, for what the rules cannot see.
+	 * Fails a field from outside, for what the rules cannot see.
 	 *
 	 * @param name - The field's name.
 	 * @param message - What to tell the person.
 	 */
 	invalidate(name: string, message: string): void
 	/**
-	 * Take every field out of the form.
+	 * Takes every field out of the form.
 	 *
 	 * @remarks
 	 * A disabled field is neither evaluated nor submitted. Its answer is kept, and so is any
@@ -556,14 +556,14 @@ export interface FormInterface {
 	 */
 	disable(): void
 	/**
-	 * Take one field out of the form.
+	 * Takes one field out of the form.
 	 *
 	 * @param name - The field's name.
 	 * @throws A {@link FormError} coded `FIELD` when the schema declares no such name.
 	 */
 	disable(name: string): void
 	/**
-	 * Take several fields out of the form.
+	 * Takes several fields out of the form.
 	 *
 	 * @param names - The field names.
 	 * @throws A {@link FormError} coded `FIELD` when the schema declares no such name. Every name
@@ -571,7 +571,7 @@ export interface FormInterface {
 	 */
 	disable(names: readonly string[]): void
 	/**
-	 * Put every field back into the form.
+	 * Puts every field back into the form.
 	 *
 	 * @remarks
 	 * An enabled field is evaluated and submitted again, and any invalidation held while it was
@@ -580,14 +580,14 @@ export interface FormInterface {
 	 */
 	enable(): void
 	/**
-	 * Put one field back into the form.
+	 * Puts one field back into the form.
 	 *
 	 * @param name - The field's name.
 	 * @throws A {@link FormError} coded `FIELD` when the schema declares no such name.
 	 */
 	enable(name: string): void
 	/**
-	 * Put several fields back into the form.
+	 * Puts several fields back into the form.
 	 *
 	 * @param names - The field names.
 	 * @throws A {@link FormError} coded `FIELD` when the schema declares no such name. Every name
@@ -595,13 +595,13 @@ export interface FormInterface {
 	 */
 	enable(names: readonly string[]): void
 	/**
-	 * Check every answer and settle the form when they all pass.
+	 * Checks every answer and settles the form when they all pass.
 	 *
 	 * @returns The values on success, or every error that stopped them.
 	 */
 	submit(): FormResult
 	/**
-	 * Return every answer to {@link FormInterface.baseline}, the answers the form opened with.
+	 * Returns every answer to {@link FormInterface.baseline}, the answers the form opened with.
 	 *
 	 * @remarks
 	 * The runtime disabled overlay resets with them, so {@link FormInterface.disabled} reads the
@@ -609,7 +609,7 @@ export interface FormInterface {
 	 */
 	clear(): void
 	/**
-	 * Tear the form down, abandoning it when it has not settled.
+	 * Tears the form down, abandoning it when it has not settled.
 	 *
 	 * @remarks
 	 * A request from inside a listener defers teardown until the outermost mutation batch closes,
```
