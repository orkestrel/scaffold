import pathlib
p = pathlib.Path('src/core/types.ts')
t = p.read_text(encoding='utf-8')

subs = []

# Voice: all-caps emphasis inside compared description paragraphs
subs.append((
""" * Represents caller-injected wording data for the reverse direction — mechanism, never
 * policy. Every phrase, label, and template string a `Narrator` renders is
 * DATA supplied here, never a core literal.""",
""" * Represents caller-injected wording data for the reverse direction — mechanism, never
 * policy. Every phrase, label, and template string a `Narrator` renders is
 * data supplied here, never a core literal."""))

subs.append((
""" * Represents the `Narrator` contract — a stateless, TOTAL, lexicon-driven rendering
 * engine for the reverse direction.""",
""" * Represents the `Narrator` contract — a stateless, total, lexicon-driven rendering
 * engine for the reverse direction."""))

subs.append((
"""export interface NormalizerInterface {
	normalize(text: string): NormalizeResult
}""",
"""export interface NormalizerInterface {
	/**
	 * Applies the contraction, abbreviation, and correction substitutions in order, then
	 * collapses whitespace.
	 *
	 * @param text - The raw text to clean
	 * @returns The cleaned text plus every substitution applied
	 */
	normalize(text: string): NormalizeResult
}"""))

subs.append((
"""export interface ExtractorInterface {
	extract(text: string): ExtractResult
}""",
"""export interface ExtractorInterface {
	/**
	 * Classifies the intent and mines every numeric literal from the text.
	 *
	 * @param text - The text to read
	 * @returns The classified intent plus the raw numbers mined from `text`
	 */
	extract(text: string): ExtractResult
}"""))

subs.append((
"""export interface ClarifierInterface {
	clarify(
		entities: readonly Entity[],
		template: Template,
		context: InterpretContextInterface | undefined,
		intent: Intent,
	): ClarifyResult
}""",
"""export interface ClarifierInterface {
	/**
	 * Resolves carry-over, template defaults, and computed fields, and surfaces an
	 * {@link Ambiguity} for every unresolved required field, worded through the narrator's
	 * `ambiguity.entity` line.
	 *
	 * @remarks
	 * A computation addresses one numeric element of an array-valued field as
	 * `{field}.{index}`, so only a collection of known length has a declarable aggregate.
	 *
	 * @param entities - The entities extraction already assigned
	 * @param template - The matched template supplying the mappings, defaults, and computations
	 * @param context - The cross-turn context carry-over reads from, or `undefined` for none
	 * @param intent - The classified intent, whose domain gates carry-over
	 * @returns The resolved entities plus every remaining ambiguity
	 */
	clarify(
		entities: readonly Entity[],
		template: Template,
		context: InterpretContextInterface | undefined,
		intent: Intent,
	): ClarifyResult
}"""))

subs.append((
"""export interface FormatterInterface {
	format(
		intent: Intent,
		template: Template,
		entities: readonly Entity[],
		ambiguities: readonly Ambiguity[],
	): FormatResult
}""",
"""export interface FormatterInterface {
	/**
	 * Renders the refined natural-language prompt for a matched template, clause by clause
	 * through the narrator's `prompt.*` lines.
	 *
	 * @param intent - The classified intent supplying the display verb
	 * @param template - The matched template supplying the prompt's name
	 * @param entities - The resolved entities rendered as the prompt's fields
	 * @param ambiguities - The unresolved fields rendered as the prompt's questions
	 * @returns The refined natural-language prompt
	 */
	format(
		intent: Intent,
		template: Template,
		entities: readonly Entity[],
		ambiguities: readonly Ambiguity[],
	): FormatResult
}"""))

subs.append((
"""export interface GeneratorInterface {
	generate(entities: readonly Entity[], template: Template): GenerateResult
}""",
"""export interface GeneratorInterface {
	/**
	 * Builds the final subject and definition pair plus its complete field audit, deriving no
	 * field the template did not declare.
	 *
	 * @param entities - The fully resolved entities the subject is built from
	 * @param template - The matched template supplying the mappings and the definition
	 * @returns The built subject and definition, every field mapping, and the mean confidence
	 */
	generate(entities: readonly Entity[], template: Template): GenerateResult
}"""))

subs.append((
"""export interface NarratorInterface {
	phrase(table: string, key: string, fallback?: string): string
	label(field: FieldPath): string
	line(id: string, values: Readonly<Record<string, unknown>>): string
	value(unit: string, raw: unknown): string
	describe(definition: Definition): string
	narrate(result: ReasonResult): string
}""",
"""export interface NarratorInterface {
	/**
	 * Looks up a two-level `table` and `key` pair in the lexicon's `phrases`, falling back to
	 * `fallback` or to `key`.
	 *
	 * @param table - The phrase table to read
	 * @param key - The phrase key within that table
	 * @param fallback - The phrase to render when the lookup misses. Default: `key`
	 * @returns The looked-up phrase, or the fallback
	 */
	phrase(table: string, key: string, fallback?: string): string
	/**
	 * Renders a field's display label from `labels`, falling back to `formatField`.
	 *
	 * @param field - The field path to label
	 * @returns The field's display label
	 */
	label(field: FieldPath): string
	/**
	 * Interpolates a named `templates` entry against `values`, falling back to an empty string
	 * when the id is absent.
	 *
	 * @param id - The template id to render
	 * @param values - The values the template's placeholders resolve against
	 * @returns The rendered line, or an empty string when no template carries `id`
	 */
	line(id: string, values: Readonly<Record<string, unknown>>): string
	/**
	 * Runs a named formatter over a raw value, catching a throw and falling back to
	 * `String(raw)`.
	 *
	 * @param unit - The formatter name to run
	 * @param raw - The value to format
	 * @returns The formatted value, or `String(raw)` when no formatter returns
	 */
	value(unit: string, raw: unknown): string
	/**
	 * Renders a reasons `Definition` to a one-line, display-neutral description.
	 *
	 * @param definition - The definition to describe
	 * @returns The one-line description
	 */
	describe(definition: Definition): string
	/**
	 * Renders a reasons `ReasonResult` to a one-line, display-neutral description.
	 *
	 * @param result - The result to narrate
	 * @returns The one-line description
	 */
	narrate(result: ReasonResult): string
}"""))

subs.append((
"""	readonly emitter: EmitterInterface<RecordEventMap>
	readonly count: number
	has(id: string): boolean
	record(id: string): TRecord | undefined
	records(): readonly TRecord[]
	add(id: string, value: TValue, build: RecordFunction<TValue, TRecord>): TRecord
	remove(ids: readonly string[]): boolean
	remove(id: string): boolean
	remove(): void
	destroy(): void
}""",
"""	readonly emitter: EmitterInterface<RecordEventMap>
	readonly count: number
	/**
	 * Reports whether a record with the given id is held.
	 *
	 * @param id - The record id to look for
	 * @returns True if a record with that id is held; false otherwise
	 */
	has(id: string): boolean
	/**
	 * Looks up one held record by id — the singular accessor.
	 *
	 * @param id - The record id to look up
	 * @returns The held record, or `undefined` when none carries that id
	 */
	record(id: string): TRecord | undefined
	/**
	 * Lists every held record — the plural accessor.
	 *
	 * @returns Every held record, in insertion order
	 */
	records(): readonly TRecord[]
	/**
	 * Stamps a value with its id, version, and content hash, builds the record, holds it, and
	 * emits `add`.
	 *
	 * @param id - The record id to hold the value under
	 * @param value - The value the record holds
	 * @param build - The function building the concrete record from its stamp and its value
	 * @returns The record just held
	 */
	add(id: string, value: TValue, build: RecordFunction<TValue, TRecord>): TRecord
	/**
	 * Removes the listed records by id, one record by id, or every record, and emits `remove`
	 * per removed id.
	 *
	 * @param ids - The record ids to remove, all-or-nothing; omit the argument to remove every record
	 * @returns True if every listed id was held; false otherwise
	 */
	remove(ids: readonly string[]): boolean
	remove(id: string): boolean
	remove(): void
	/**
	 * Tears the registry down idempotently — clears the collection, emits `destroy`, then
	 * destroys the emitter last.
	 */
	destroy(): void
}"""))

subs.append((
"""	readonly emitter: EmitterInterface<TemplateManagerEventMap>
	readonly count: number
	has(id: string): boolean
	template(id: string): TemplateRecord | undefined
	templates(): readonly TemplateRecord[]
	add(template: Template, options?: RecordOptions): TemplateRecord
	remove(ids: readonly string[]): boolean
	remove(id: string): boolean
	remove(): void
	destroy(): void
}""",
"""	readonly emitter: EmitterInterface<TemplateManagerEventMap>
	readonly count: number
	/**
	 * Reports whether a template with the given id has been added.
	 *
	 * @param id - The record id to look for
	 * @returns True if a template with that id has been added; false otherwise
	 */
	has(id: string): boolean
	/**
	 * Looks up one added template record by id — the singular accessor.
	 *
	 * @param id - The record id to look up
	 * @returns The added template record, or `undefined` when none carries that id
	 */
	template(id: string): TemplateRecord | undefined
	/**
	 * Lists every added template record — the plural accessor.
	 *
	 * @returns Every added template record, in insertion order
	 */
	templates(): readonly TemplateRecord[]
	/**
	 * Adds, or re-adds, one template from its data, and emits `add`.
	 *
	 * @param template - The template data to hold
	 * @param options - The record id overriding `template.id`. Default: `template.id`
	 * @returns The versioned, content-hashed record just held
	 */
	add(template: Template, options?: RecordOptions): TemplateRecord
	/**
	 * Removes the listed templates by id, one template by id, or every template, and emits
	 * `remove` per removed id.
	 *
	 * @param ids - The record ids to remove, all-or-nothing; omit the argument to remove every template
	 * @returns True if every listed id was added; false otherwise
	 */
	remove(ids: readonly string[]): boolean
	remove(id: string): boolean
	remove(): void
	/**
	 * Tears the registry down idempotently — clears the collection, emits `destroy`, then
	 * destroys the emitter last.
	 */
	destroy(): void
}"""))

subs.append((
"""	readonly emitter: EmitterInterface<SubjectManagerEventMap>
	readonly count: number
	has(id: string): boolean
	subject(id: string): SubjectRecord | undefined
	subjects(): readonly SubjectRecord[]
	add(subject: Subject, options?: RecordOptions): SubjectRecord
	remove(ids: readonly string[]): boolean
	remove(id: string): boolean
	remove(): void
	destroy(): void
}""",
"""	readonly emitter: EmitterInterface<SubjectManagerEventMap>
	readonly count: number
	/**
	 * Reports whether a subject with the given id has been added.
	 *
	 * @param id - The record id to look for
	 * @returns True if a subject with that id has been added; false otherwise
	 */
	has(id: string): boolean
	/**
	 * Looks up one added subject record by id — the singular accessor.
	 *
	 * @param id - The record id to look up
	 * @returns The added subject record, or `undefined` when none carries that id
	 */
	subject(id: string): SubjectRecord | undefined
	/**
	 * Lists every added subject record — the plural accessor.
	 *
	 * @returns Every added subject record, in insertion order
	 */
	subjects(): readonly SubjectRecord[]
	/**
	 * Adds one subject, minting a fresh record id when the caller supplies none, and emits
	 * `add`.
	 *
	 * @param subject - The subject to hold
	 * @param options - The record id overriding the minted one. Default: a freshly minted id
	 * @returns The versioned, content-hashed record just held
	 */
	add(subject: Subject, options?: RecordOptions): SubjectRecord
	/**
	 * Removes the listed subjects by id, one subject by id, or every subject, and emits
	 * `remove` per removed id.
	 *
	 * @param ids - The record ids to remove, all-or-nothing; omit the argument to remove every subject
	 * @returns True if every listed id was added; false otherwise
	 */
	remove(ids: readonly string[]): boolean
	remove(id: string): boolean
	remove(): void
	/**
	 * Tears the registry down idempotently — clears the collection, emits `destroy`, then
	 * destroys the emitter last.
	 */
	destroy(): void
}"""))

subs.append((
"""	readonly emitter: EmitterInterface<DefinitionManagerEventMap>
	readonly count: number
	has(id: string): boolean
	definition(id: string): DefinitionRecord | undefined
	definitions(): readonly DefinitionRecord[]
	add(definition: Definition, options?: RecordOptions): DefinitionRecord
	remove(ids: readonly string[]): boolean
	remove(id: string): boolean
	remove(): void
	destroy(): void
}""",
"""	readonly emitter: EmitterInterface<DefinitionManagerEventMap>
	readonly count: number
	/**
	 * Reports whether a definition with the given id has been added.
	 *
	 * @param id - The record id to look for
	 * @returns True if a definition with that id has been added; false otherwise
	 */
	has(id: string): boolean
	/**
	 * Looks up one added definition record by id — the singular accessor.
	 *
	 * @param id - The record id to look up
	 * @returns The added definition record, or `undefined` when none carries that id
	 */
	definition(id: string): DefinitionRecord | undefined
	/**
	 * Lists every added definition record — the plural accessor.
	 *
	 * @returns Every added definition record, in insertion order
	 */
	definitions(): readonly DefinitionRecord[]
	/**
	 * Adds, or re-adds, one definition, and emits `add`.
	 *
	 * @param definition - The definition to hold
	 * @param options - The record id overriding `definition.id`. Default: `definition.id`
	 * @returns The versioned, content-hashed record just held
	 */
	add(definition: Definition, options?: RecordOptions): DefinitionRecord
	/**
	 * Removes the listed definitions by id, one definition by id, or every definition, and
	 * emits `remove` per removed id.
	 *
	 * @param ids - The record ids to remove, all-or-nothing; omit the argument to remove every definition
	 * @returns True if every listed id was added; false otherwise
	 */
	remove(ids: readonly string[]): boolean
	remove(id: string): boolean
	remove(): void
	/**
	 * Tears the registry down idempotently — clears the collection, emits `destroy`, then
	 * destroys the emitter last.
	 */
	destroy(): void
}"""))

subs.append((
"""	previous(): readonly Interpretation[]
	entities(): readonly Entity[]
	add(result: Interpretation): void
	clear(): void
	destroy(): void
}""",
"""	/**
	 * Lists the buffered history, newest last, capped at `history`.
	 *
	 * @returns Every buffered interpretation, newest last
	 */
	previous(): readonly Interpretation[]
	/**
	 * Flattens every entity recorded across the buffered history, most recent last.
	 *
	 * @returns Every entity across the buffered history, most recent last
	 */
	entities(): readonly Entity[]
	/**
	 * Pushes one completed {@link Interpretation}, dropping the oldest entry past the cap.
	 *
	 * @param result - The completed interpretation to buffer
	 */
	add(result: Interpretation): void
	/**
	 * Resets the history, the subject registry, and the definition registry without
	 * destroying the context.
	 */
	clear(): void
	/**
	 * Tears the context down idempotently — the subject registry, then the definition
	 * registry, then the emitter last.
	 */
	destroy(): void
}"""))

subs.append((
"""	readonly emitter: EmitterInterface<InterpretEventMap>
	interpret(text: string): Interpretation
	add(template: Template): void
	remove(ids: readonly string[]): boolean
	remove(id: string): boolean
	remove(): void
	template(id: string): Template | undefined
	templates(): readonly Template[]
	describe(definition: Definition): string
	narrate(result: ReasonResult): string
	destroy(): void
}""",
"""	readonly emitter: EmitterInterface<InterpretEventMap>
	/**
	 * Runs the `[normalize, extract, clarify, format, generate]` pipeline over raw text,
	 * returning a complete or a visibly incomplete result.
	 *
	 * @param text - The raw text to interpret
	 * @returns The full, replayable outcome of the run
	 */
	interpret(text: string): Interpretation
	/**
	 * Adds one template, and emits `add`.
	 *
	 * @param template - The template data to add
	 */
	add(template: Template): void
	/**
	 * Removes the listed templates by id, one template by id, or every template.
	 *
	 * @param ids - The template ids to remove, all-or-nothing; omit the argument to remove every template
	 * @returns True if every listed id was added; false otherwise
	 */
	remove(ids: readonly string[]): boolean
	remove(id: string): boolean
	remove(): void
	/**
	 * Looks up one added template's plain data by id.
	 *
	 * @param id - The template id to look up
	 * @returns The template's plain data, or `undefined` when none carries that id
	 */
	template(id: string): Template | undefined
	/**
	 * Lists every added template's plain data.
	 *
	 * @returns Every added template's plain data, in insertion order
	 */
	templates(): readonly Template[]
	/**
	 * Renders a reasons `Definition` to a one-line, display-neutral description.
	 *
	 * @param definition - The definition to describe
	 * @returns The one-line description
	 */
	describe(definition: Definition): string
	/**
	 * Renders a reasons `ReasonResult` to a one-line, display-neutral description.
	 *
	 * @param result - The result to narrate
	 * @returns The one-line description
	 */
	narrate(result: ReasonResult): string
	/**
	 * Tears the orchestrator down idempotently — the template registry, the context it
	 * constructed itself, then the emitter last.
	 */
	destroy(): void
}"""))

for old, new in subs:
    if t.count(old) != 1:
        raise SystemExit(f'count {t.count(old)} for:\n{old[:120]}')
    t = t.replace(old, new, 1)
p.write_text(t, encoding='utf-8')
print('ok types.ts')
