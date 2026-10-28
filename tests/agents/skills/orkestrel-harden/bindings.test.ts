import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { WORKSPACE_ROOT } from '../../../setupServer.js'

/** Describes one ripgrep pattern a census item runs, and whether the item marks it `-U`. */
interface BindingsSignature {
	readonly source: string
	readonly multiline: boolean
}

/** Describes one labelled fenced fixture of a census item. */
interface BindingsFixture {
	readonly label: string
	readonly kind: string
	readonly code: string
}

/** Describes one census item: the keys its heading names, its signatures, and its fixtures. */
interface BindingsItem {
	readonly heading: string
	readonly keys: readonly string[]
	readonly delegates: readonly string[]
	readonly signatures: readonly BindingsSignature[]
	readonly fixtures: readonly BindingsFixture[]
}

const BINDINGS_PATH = '.agents/skills/orkestrel-harden/references/bindings.md'

// An opening run of backticks closes at the next run of the same length, so a double-backtick span
// can carry a single backtick inside a pattern.
const CODE_SPAN = /(`+)((?:(?!\1)[\s\S])+?)\1(?!`)/gu

// A key is two lowercase words joined by a dot, the form every item heading uses.
const KEY_SPAN = /^[a-z]+\.[a-z]+$/u

// The Signatures bullet is its first line and every indented line that follows it.
const SIGNATURES_BULLET = /^- \*\*Signatures[^\n]*(?:\n[ \t]+[^\n]*)*/mu

const FIXTURE = /^(Hit|Clear) fixture, `([^`]+)`:\n\n```ts\n([\s\S]*?)\n```$/gmu

/**
 * Reads the contents of every inline code span in a text.
 *
 * @param text - The Markdown text to read.
 * @returns Each span's content, in order.
 */
function readSpans(text: string): readonly string[] {
	return [...text.matchAll(CODE_SPAN)].map((match) => match[2] ?? '')
}

/**
 * Reads the patterns one Signatures bullet lists.
 *
 * @remarks
 * A span is a pattern when it carries a backslash; the prose spans of a bullet (`createRecorder`,
 * `.then(`) carry none. A span of exactly `-U` marks its bullet's patterns multiline, and a bullet
 * marked in its own opening line (`each with -U`) marks the bullets nested beneath it.
 *
 * @param bullet - The Signatures bullet text.
 * @returns Each pattern with its multiline mark.
 */
function readSignatures(bullet: string): readonly BindingsSignature[] {
	const [top = '', ...nested] = bullet.split(/\n(?=[ \t]+- )/u)
	const inherited = readSpans(top).includes('-U')
	return [top, ...nested].flatMap((unit) => {
		const spans = readSpans(unit)
		const multiline = inherited || spans.includes('-U')
		return spans.filter((span) => span.includes('\\')).map((source) => ({ source, multiline }))
	})
}

/**
 * Reads one census item from its section of the document.
 *
 * @param section - The section text, from its heading line to the next heading.
 * @returns The item's keys, the keys its Signatures bullet delegates to, its patterns, and its
 * labelled fixtures.
 */
function readBindingsItem(section: string): BindingsItem {
	const heading = section.split('\n')[0] ?? ''
	const bullet = SIGNATURES_BULLET.exec(section)?.[0] ?? ''
	return {
		heading,
		keys: readSpans(heading).filter((span) => KEY_SPAN.test(span)),
		delegates: readSpans(bullet).filter((span) => KEY_SPAN.test(span)),
		signatures: readSignatures(bullet),
		fixtures: [...section.matchAll(FIXTURE)].map((match) => ({
			kind: (match[1] ?? '').toLowerCase(),
			label: match[2] ?? '',
			code: match[3] ?? '',
		})),
	}
}

const TEXT = readFileSync(join(WORKSPACE_ROOT, BINDINGS_PATH), 'utf8').replaceAll('\r\n', '\n')

const ITEMS: readonly BindingsItem[] = TEXT.split(/^(?=## )/mu)
	.filter((section) => section.startsWith('## `'))
	.map(readBindingsItem)

/**
 * Resolves the patterns an item runs.
 *
 * @remarks
 * An item whose Signatures bullet lists no pattern of its own names another item's key and runs
 * that item's patterns (`middleware.fixed` applies `entity.closure`; `registry.reads` applies
 * `bound.field`). An item with patterns of its own runs only those, so a key its prose mentions in
 * passing adds none.
 *
 * @param item - The item to resolve.
 * @returns The item's own patterns, or the patterns of the item it names.
 */
function resolveSignatures(item: BindingsItem): readonly BindingsSignature[] {
	if (item.signatures.length > 0) return item.signatures
	return item.delegates.flatMap(
		(key) =>
			ITEMS.find((candidate) => candidate !== item && candidate.keys.includes(key))?.signatures ??
			[],
	)
}

/**
 * Compiles a ripgrep pattern as a JavaScript pattern, anchors per line.
 *
 * @param source - The pattern text the document gives.
 * @returns The compiled pattern, or `undefined` when JavaScript refuses it.
 */
function compileBindingsSignature(source: string): RegExp | undefined {
	try {
		return new RegExp(source, 'mu')
	} catch {
		return undefined
	}
}

/**
 * Reports whether any pattern matches a fixture, as the census runs it.
 *
 * @remarks
 * A multiline pattern runs over the whole fixture, as `rg -U` does; every other pattern runs over
 * one line at a time, as `rg -n` does. A pattern JavaScript refuses matches nothing.
 *
 * @param code - The fixture source.
 * @param signatures - The patterns to run.
 * @returns True if some pattern matches; false otherwise.
 */
function matchesBindingsFixture(code: string, signatures: readonly BindingsSignature[]): boolean {
	const lines = code.split('\n')
	return signatures.some(({ source, multiline }) => {
		const pattern = compileBindingsSignature(source)
		if (pattern === undefined) return false
		return multiline ? pattern.test(code) : lines.some((line) => pattern.test(line))
	})
}

const HITS = ITEMS.flatMap((item) =>
	item.fixtures
		.filter((fixture) => fixture.kind === 'hit')
		.map((fixture) => ({ item, fixture, label: fixture.label })),
)

// The census controls of `bindings.md` § Run the controls: every hit fixture must yield a candidate.
// Whether a clear fixture yields no kept candidate is a reading of each candidate, so the clear
// fixtures stay with the reader.
describe('the bindings census controls', () => {
	it('reads the document: items with patterns, and every hit fixture it labels', () => {
		const labelled = [...TEXT.matchAll(/^Hit fixture, `([^`]+)`:$/gmu)].map((match) => match[1])
		expect(ITEMS.length).toBeGreaterThan(0)
		expect(HITS.map(({ label }) => label)).toEqual(labelled)
		expect(ITEMS.filter((item) => resolveSignatures(item).length === 0)).toEqual([])
	})

	it('labels each fixture with a key of its own item and its own kind', () => {
		const stray = ITEMS.flatMap((item) =>
			item.fixtures
				.filter(
					(fixture) => !item.keys.some((key) => fixture.label === `${key}.${fixture.kind}.ts`),
				)
				.map((fixture) => fixture.label),
		)
		expect(stray).toEqual([])
		expect(
			ITEMS.filter((item) => !item.fixtures.some((fixture) => fixture.kind === 'hit')).map(
				({ heading }) => heading,
			),
		).toEqual([])
	})

	// Where a pattern does not compile, or means something else in JavaScript, the document is
	// the subject of the report and this list names the pattern; the document is not rewritten here.
	it('compiles every signature as a JavaScript pattern', () => {
		const refused = ITEMS.flatMap((item) =>
			item.signatures
				.filter(({ source }) => compileBindingsSignature(source) === undefined)
				.map(({ source }) => `${item.heading}: ${source}`),
		)
		expect(refused).toEqual([])
	})

	it.each(HITS)(
		'matches the hit fixture $label through a signature of its item',
		({ item, fixture }) => {
			expect(matchesBindingsFixture(fixture.code, resolveSignatures(item))).toBe(true)
		},
	)

	// The control: the same fixture against no signature, and against one that cannot occur, is
	// refused, so the match above is the item's signatures and not a matcher that accepts anything.
	it.each(HITS)(
		'refuses the hit fixture $label once the signatures of its item are removed',
		({ item, fixture }) => {
			expect(matchesBindingsFixture(fixture.code, resolveSignatures(item))).toBe(true)
			expect(matchesBindingsFixture(fixture.code, [])).toBe(false)
			expect(
				matchesBindingsFixture(fixture.code, [
					{ source: 'NeverInAFixture\\d{9}', multiline: false },
				]),
			).toBe(false)
		},
	)

	// The control for the `-U` mark: the clear-then-add pattern spans two lines, so it matches the
	// whole fixture and matches no single line of it.
	it('runs a signature the item marks -U over the whole fixture and the others line by line', () => {
		const registry = ITEMS.find((item) => item.keys.includes('registry.form'))
		const spanning = registry?.signatures.find(({ multiline }) => multiline)
		const fixture = registry?.fixtures.find(({ kind }) => kind === 'hit')
		expect(spanning).toBeDefined()
		expect(fixture).toBeDefined()
		if (spanning === undefined || fixture === undefined) return
		expect(matchesBindingsFixture(fixture.code, [spanning])).toBe(true)
		expect(matchesBindingsFixture(fixture.code, [{ ...spanning, multiline: false }])).toBe(false)
		const folded = ITEMS.find((item) => item.keys.includes('derivation.text'))
		expect(folded?.signatures.length).toBeGreaterThan(0)
		expect(folded?.signatures.every(({ multiline }) => multiline)).toBe(true)
	})
})
