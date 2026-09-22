# F5a close-out (Orchestrator, brief f5a-brief-2.md): run from /home/user/veneer after both lanes returned.
# Carries analyst claims 8, 11, 12, 15(a), 16 and reviewer claims 8, 12, 15(a), 16, 17 with F1, F2, F3, F4.
def edit(path, pairs):
    s = open(path, encoding='utf-8').read()
    for old, new in pairs:
        assert s.count(old) == 1, (path, old[:70], s.count(old))
        s = s.replace(old, new)
    open(path, 'w', encoding='utf-8').write(s)
    print('edited', path)

# ---------------------------------------------------------------- tests/setupConformance.ts
p = 'tests/setupConformance.ts'
s = open(p, encoding='utf-8').read()
start = s.index('/**\n * Holds the module specifiers the walk in flight has read, in source order.')
end = s.index('/**\n * Scans a source module for a forbidden import specifier.')
old_block = s[start:end]
assert 'export const SPECIFIER_READINGS' in old_block and 'export function extractSpecifiers' in old_block
new_block = '''/**
 * Reads module specifiers out of parsed source through Vite's visitor, holding the walk's readings
 * as its own state.
 *
 * @remarks
 * A `Visitor` handler is given the node and nothing else, so the walk and the reading it produces
 * cannot be joined by an argument. The handlers write into a field only this reader holds, and
 * {@link SpecifierReader.read} hands out a fresh list and leaves that field empty, so no caller can
 * reach another caller's readings or alter the reader's state.
 */
export class SpecifierReader {
	readonly #readings: string[] = []

	readonly #visitor = new Visitor({
		ImportDeclaration: (node) => {
			this.#readings.push(node.source.value)
		},
		ExportNamedDeclaration: (node) => {
			if (node.source !== null) this.#readings.push(node.source.value)
		},
		ExportAllDeclaration: (node) => {
			this.#readings.push(node.source.value)
		},
		ImportExpression: (node) => {
			const specifier = extractStringArgument(node.source)
			if (specifier !== undefined) this.#readings.push(specifier)
		},
		TSImportType: (node) => {
			this.#readings.push(node.source.value)
		},
		TSExternalModuleReference: (node) => {
			this.#readings.push(node.expression.value)
		},
		CallExpression: (node) => {
			if (node.callee.type !== 'Identifier' || node.callee.name !== 'require') return
			const argument = node.arguments[0]
			if (argument === undefined) return
			const specifier = extractStringArgument(argument)
			if (specifier !== undefined) this.#readings.push(specifier)
		},
	})

	/**
	 * Reads every literal import, re-export, dynamic import, and `require` specifier in one module.
	 * Parses with the `preserveParens` option disabled, so a parenthesized argument or callee reaches
	 * the visitor as the expression it wraps.
	 * @param text - A JavaScript, TypeScript, or declaration module.
	 * @returns The module specifiers in source order, including type imports, and the literal
	 * argument of a dynamic import and of a `require(...)` call, each read through
	 * {@link extractStringArgument}.
	 */
	read(text: string): readonly string[] {
		const parsed = parseSync('module.ts', text, { preserveParens: false })
		if (parsed.errors.length > 0)
			throw new Error(parsed.errors.map((error) => error.message).join('\\n'))
		this.#visitor.visit(parsed.program)
		return this.#readings.splice(0)
	}
}

/**
 * Extracts literal import and re-export specifiers through Vite's parser, on a reader of its own.
 * @param text - A JavaScript, TypeScript, or declaration module.
 * @returns The module specifiers in source order, as {@link SpecifierReader.read} returns them.
 */
export function extractSpecifiers(text: string): readonly string[] {
	return new SpecifierReader().read(text)
}

'''
s = s[:start] + new_block + s[end:]
open(p, 'w', encoding='utf-8').write(s); print('edited', p, '(reader)')
edit(p, [
    (""" * entry: the package is gone from the import graph and its code is in the file. Each entry here is
 * a name the runtime writes and Veneer does not — Bootstrap's plugin hook and event-key constant,
 * Popper's scope, Vue's application factory and its internal marker, and Tailwind's own prefix.
 */""", """ * entry: the package is gone from the import graph and its code is in the file. Each entry here is
 * a name the runtime writes and Veneer does not, measured in an installed distribution: Bootstrap's
 * plugin hook and event-key constant, Popper's scope, and Vue's application factory and its
 * internal marker. Tailwind ships no browser runtime a bundle could carry, so its guard is the
 * specifier pass over `tailwindcss` and `@tailwindcss/` in {@link FORBIDDEN_RUNTIME}.
 */"""),
    ("\t'__vue',\n\t'tailwind',\n])", "\t'__vue',\n])"),
    (""" * Lists the identifiers a forbidden runtime leaves in bundled output after its import is inlined.""",
     """ * Lists the text markers a forbidden runtime leaves in bundled output after its import is inlined,
 * each matched as a whole word anywhere in the entry, a comment or a string literal included."""),
    (""" * @param signatures - Identifiers a forbidden runtime leaves in bundled output, such as
 * {@link FORBIDDEN_SIGNATURES}.""", """ * @param signatures - Text markers a forbidden runtime leaves in bundled output, such as
 * {@link FORBIDDEN_SIGNATURES}, each matched as a whole word through {@link matchesSignature}."""),
    ("""		scanForbiddenSource(built, names) ?? signatures.find((signature) => built.includes(signature))
	)
}
""", """		scanForbiddenSource(built, names) ??
		signatures.find((signature) => matchesSignature(built, signature))
	)
}

/**
 * Reports whether a text carries a signature as a whole word.
 * @param text - The text to search, such as a built entry.
 * @param signature - The marker to find, such as a member of {@link FORBIDDEN_SIGNATURES}.
 * @returns `true` when the signature occurs with no identifier character (a letter, a digit, `_`,
 * or `$`) on either side of it, anywhere in the text, a comment or a string literal included.
 */
export function matchesSignature(text: string, signature: string): boolean {
	const escaped = signature.replace(/[.*+?^${}()|[\\]\\\\]/gu, '\\\\$&')
	return new RegExp(`(?<![\\\\w$])${escaped}(?![\\\\w$])`, 'u').test(text)
}
"""),
])

# ---------------------------------------------------------------- tests/setupConformance.test.ts
edit('tests/setupConformance.test.ts', [
    ("\tSPECIFIER_READINGS,\n", "\tSpecifierReader,\n"),
    ("\textractSpecifiers,\n", "\textractSpecifiers,\n\tmatchesSignature,\n"),
    ("\t\t\t'SPECIFIER_READINGS',\n\t\t\t'SPECIFIER_VISITOR',\n", "\t\t\t'SpecifierReader',\n"),
    ("\t\t\t'extractStringArgument',\n", "\t\t\t'extractStringArgument',\n\t\t\t'matchesSignature',\n"),
    ("""	it("drains the readings between walks, so one module's imports never reach the next", () => {
		expect(SPECIFIER_READINGS).toEqual([])
		expect(extractSpecifiers('import "./first.js"')).toEqual(['./first.js'])
		expect(SPECIFIER_READINGS).toEqual([])
		expect(extractSpecifiers('import "./second.js"')).toEqual(['./second.js'])
		expect(extractSpecifiers('')).toEqual([])
	})
""", """	it('matches a signature as a whole word, so a longer identifier sharing its prefix is not one', () => {
		expect(matchesSignature('const app = createApp(root)', 'createApp')).toBe(true)
		expect(matchesSignature('const app = createApplication(root)', 'createApp')).toBe(false)
		expect(matchesSignature('import "@popperjs/core"', '@popperjs')).toBe(true)
		expect(matchesSignature('// jQueryInterface stays', 'jQueryInterface')).toBe(true)
		expect(matchesSignature('const EVENT_KEY_SUFFIX = 1', 'EVENT_KEY')).toBe(false)
		expect(matchesSignature('window.__vue = 1', '__vue')).toBe(true)
	})

	it('keeps each reading its own, and exposes no state a caller could alter', () => {
		const reader = new SpecifierReader()
		const first = reader.read('import "./first.js"')
		expect(first).toEqual(['./first.js'])
		expect(reader.read('import "./second.js"')).toEqual(['./second.js'])
		expect(first).toEqual(['./first.js'])
		expect(reader.read('')).toEqual([])
		expect(Object.keys(reader)).toEqual([])
	})
"""),
])

# ---------------------------------------------------------------- tests/conformance.test.ts
edit('tests/conformance.test.ts', [
    ("""	it('bundles no forbidden runtime into either published JavaScript entry', () => {""",
     """	it('bundles no forbidden runtime into a published JavaScript entry', () => {"""),
])

# ---------------------------------------------------------------- tests/setupBrowser.ts
edit('tests/setupBrowser.ts', [
    ("""export function scanPositional(""", """export function scanPositionalPairs("""),
    (""" * The judgment is the browser's. Each tag is mounted alone, then inside each other tag, then after
 * each other tag, and the rules whose selectors `Element.matches` reports on it are compared across
 * the three. A set that differs""", """ * The judgment is the browser's. Each tag is mounted alone, then inside each tag (itself included,
 * so a rule such as `li + li` is read), then after each tag, and the rules whose selectors
 * `Element.matches` reports on it are compared across those placements. A set that differs"""),
    ("""		for (const inner of tags) {
			if (outer === inner) continue
			const resting""", """		for (const inner of tags) {
			const resting"""),
    (""" * The refusal is unproven and cannot be driven from a `CSSStyleRule`: a stylesheet holds only the
 * selectors the engine parsed, and assigning an unparseable one to `selectorText` is ignored. On
 * Chromium 141 every selector a sheet holds is a selector `matches` reads, so the guard exists for
 * an engine that parses a form it will not match — `:has()` was such a form before it shipped. A
 * case drives it on the day a supported engine refuses one, and until then the guard is what keeps
 * an unread selector from passing silently as a tag with nothing against it.
 */""", """ * The refusal is driven by a namespaced rule: a sheet holds `audit|p` as a parsed selector, and
 * `Element.matches` resolves no namespace prefix. The guard reads every selector before any tag is
 * mounted and names the one the engine refuses, where the comparison alone would throw the engine's
 * own message part way through a reading. The case in `tests/src/styles/index.test.ts` proves it
 * on Chromium 141.
 */"""),
])

# ---------------------------------------------------------------- tests/setupBrowser.test.ts
edit('tests/setupBrowser.test.ts', [
    ("""				'scanPositional',""", """				'scanPositionalPairs',"""),
    ("""import { BREAKPOINT_CASES } from './setupCases.js'""", """import { BREAKPOINT_CASES, MANDATED_TAG_PAIRS } from './setupCases.js'"""),
])
s2 = open('tests/setupBrowser.test.ts', encoding='utf-8').read().rstrip('\n') + """

describe('scanPositionalPairs', () => {
	it('excludes a nesting the content model mandates, and reports it when nothing mandates it', () => {
		// The exclusion is the one place the reader can stay silent, so the same plant runs with the
		// mandated table and without it: a `details summary` rule reads differently on `summary` nested
		// in `details` than on `summary` alone, and only the table turns that reading into no finding.
		const planted = requireValue(
			scene.load('@layer elements { details summary { margin: 0 } }').sheet,
			'The planted sheet parsed no rules',
		)
		const rules = collectNestedRules(planted.cssRules).filter(
			(rule) => rule instanceof CSSStyleRule,
		)
		expect(rules.map((rule) => rule.selectorText)).toEqual(['details summary'])
		expect(setup.scanPositionalPairs(rules, ['details', 'summary'], MANDATED_TAG_PAIRS)).toEqual([])
		expect(setup.scanPositionalPairs(rules, ['details', 'summary'], [])).toEqual([
			'details > summary',
		])
	})
	it('reads a rule that joins a tag to itself', () => {
		const planted = requireValue(
			scene.load('@layer elements { li + li { margin: 0 } }').sheet,
			'The planted sheet parsed no rules',
		)
		const rules = collectNestedRules(planted.cssRules).filter(
			(rule) => rule instanceof CSSStyleRule,
		)
		expect(setup.scanPositionalPairs(rules, ['li'], MANDATED_TAG_PAIRS)).toEqual(['li + li'])
	})
})
"""
open('tests/setupBrowser.test.ts', 'w', encoding='utf-8').write(s2); print('edited tests/setupBrowser.test.ts (cases)')

# ---------------------------------------------------------------- tests/src/styles/index.test.ts
edit('tests/src/styles/index.test.ts', [
    ("""	scanPositional,
	scene,""", """	scanPositionalPairs,
	scene,"""),
    ("""		expect(scanPositional(rules, STYLED_TAGS, MANDATED_TAG_PAIRS)).toEqual([])""",
     """		expect(scanPositionalPairs(rules, STYLED_TAGS, MANDATED_TAG_PAIRS)).toEqual([])"""),
    ("""		expect(scanPositional(rules, ['h1', 'p'], MANDATED_TAG_PAIRS)).toEqual(['h1 + p'])
	})
""", """		expect(scanPositionalPairs(rules, ['h1', 'p'], MANDATED_TAG_PAIRS)).toEqual(['h1 + p'])
	})
	it('refuses a rule whose selector the engine cannot read, rather than passing its tag', () => {
		// A namespaced rule is one the sheet parses and `Element.matches` cannot read, because the
		// selectors API resolves no namespace prefix. The reader refuses it, so a selector nothing
		// could be compared against is never counted as a tag that passed.
		const planted = requireValue(
			scene.load('@namespace audit url("urn:audit"); @layer elements { audit|p { margin: 0 } }')
				.sheet,
			'The planted sheet parsed no rules',
		)
		const rules = collectNestedRules(planted.cssRules).filter(
			(rule) => rule instanceof CSSStyleRule,
		)
		expect(rules.map((rule) => rule.selectorText)).toEqual(['audit|p'])
		expect(() => scanPositionalPairs(rules, ['p'], MANDATED_TAG_PAIRS)).toThrow(
			'The selector engine reads no audit|p',
		)
	})
"""),
])

# ---------------------------------------------------------------- tests/setupStyles.ts and tests/setupCases.ts
edit('tests/setupStyles.ts', [
    ("""reaches: `scanPositional` in `tests/setupBrowser.ts` puts""", """reaches: `scanPositionalPairs` in `tests/setupBrowser.ts` puts"""),
])
edit('tests/setupCases.ts', [
    (""" * The pairs here are the ones the markup cannot avoid: each descendant has no other legal parent.
 */""", """ * The pairs here are the ones the markup cannot avoid: each descendant is legal only under the
 * parents the table lists for it.
 */"""),
    (""" * The partial column is what keeps the table current. `tests/setupCases.test.ts` reads
 * `src/styles/elements/` and requires the stems it finds to be this column exactly, so a partial
 * added to the layer reddens that case until its tags are written here and the position proof in
 * `tests/src/styles/index.test.ts` covers them.
 */""", """ * The partial column is what keeps the rows current. `tests/setupCases.test.ts` reads
 * `src/styles/elements/` and requires the stems it finds to be this column exactly, so a partial
 * added to the layer reddens that case until its tags are written here and the position proof in
 * `tests/src/styles/index.test.ts` covers them. The tag column is written by hand and bound to no
 * reading yet: a tag a partial's rules gain is outside the position proof until it is written
 * here.
 */"""),
])

# ---------------------------------------------------------------- guides/veneer.md
edit('guides/veneer.md', [
    ("""A rule in the `elements` layer treats a tag by its name, never by where the markup puts that tag.
The exception is a pair the HTML content model mandates, where the descendant has no other legal
parent, and `MANDATED_TAG_PAIRS` in `tests/setupCases.ts` names every one of them. The browser's
own selector engine is what rules on this: `scanPositional` in `tests/setupBrowser.ts` mounts each
styled tag alone, then inside each other tag, then after each other tag, and compares the rules
`Element.matches` reports across the three. A rule reaching a tag through its position reports as a
pair, so nothing here parses a selector and a construct such as `:has()` or `:is()` is answered by
the engine that ships it.""", """A rule in the `elements` layer treats a tag by its name, never by where the markup puts that tag.
The exception is a pair the HTML content model mandates, where the descendant is legal only under
the parents `MANDATED_TAG_PAIRS` in `tests/setupCases.ts` lists for it, such as `li` under `ol`
and `ul`. The browser's own selector engine answers the question: `scanPositionalPairs` in
`tests/setupBrowser.ts` mounts each styled tag alone, then inside each tag (itself included), then
after each tag, and compares the rules `Element.matches` reports across those placements. A rule
reaching a tag through its position reports as a pair. Nothing here parses a selector, and a
construct such as `:has()` or `:is()` is answered by the engine that ships it."""),
])
print('f5a fix applied')
