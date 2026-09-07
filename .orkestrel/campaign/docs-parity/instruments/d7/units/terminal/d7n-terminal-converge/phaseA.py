import re, pathlib
p = pathlib.Path('/home/user/fleet/terminal/tests/guides.test.ts')
t = p.read_text()

def sub1(old, new):
    global t
    assert t.count(old) == 1, (t.count(old), old[:80])
    t = t.replace(old, new)

# 1. Header comment: the canonical drop-in text.
sub1(
"""// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
// this repo's own `guides/README.md` manifest. The constants that follow are this
// package's own, and are the only part a sibling package changes. The `guide fences`
// block at the end transcribes every fence line of `guides/terminal.md` that carries a
// value comment and asserts the value that line claims, which name resolution alone
// cannot prove. A line whose comment claims no value — a TTY walk, an emission, a
// teardown, a resolved default — carries no case here.
""",
"""// The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
// this repo's own `guides/README.md` manifest. The constants that follow are this
// package's own, and are the only part a sibling package changes.
""")

# 2. Import findDrift beside the existing readers.
sub1("""	extractFenceImports,
	findMissing,""", """	extractFenceImports,
	findDrift,
	findMissing,""")

# 3. The pilot's root form; drop the resolveRoot import.
sub1("import { requireValue, resolveRoot } from '@orkestrel/test'",
     "import { requireValue } from '@orkestrel/test'")
sub1("const root = resolveRoot(import.meta)",
     "const root = new URL('../', import.meta.url)")

# 4. GUIDE_SPEC beside the fence-language constants.
sub1("""/** The fence language whose blocks count as worked examples. */
const EXAMPLE_LANGUAGE = 'ts'
""",
"""/** The fence language whose blocks count as worked examples. */
const EXAMPLE_LANGUAGE = 'ts'
/** The one guide this package sources, whose tagline the README pitch equals. */
const GUIDE_SPEC = 'guides/terminal.md'
""")

# 5. The INTERNAL doc block's canonical wording.
sub1("intentional rather than forgotten — and the second assertion below fails when a name",
     "intentional rather than forgotten — and the assertion that follows it fails when a name")

# 6. ROOT_FILES carries the README the pitch case reads.
sub1("""/** Root-level files this package's guides link to. `readInventory` walks directories only. */
const ROOT_FILES = Object.freeze(['AGENTS.md'])""",
"""/** Root-level files these checks read. `readInventory` walks directories only. */
const ROOT_FILES = Object.freeze(['AGENTS.md', 'README.md'])""")

# 7. The `own` binding, the pin, and the README case.
sub1("""const sources = createSourceManager({ files, modules: MODULES })

it('manifest lists at least one guide', () => {
	expect(manifest.length).toBeGreaterThan(0)
})
""",
"""const sources = createSourceManager({ files, modules: MODULES })
const own = requireValue(
	manifest.find((entry) => entry.spec === GUIDE_SPEC),
	`Missing manifest row: ${GUIDE_SPEC}`,
)

it('manifest lists at least one guide', () => {
	expect(manifest.length).toBeGreaterThan(0)
})

// The example half of the equality case is silent over an empty population: with no
// title on both sides `findDrift` compares no pair and the case passes on the summaries
// alone. This pins the population this repository's own guide contributes, so removing
// every `@example` title reddens the suite instead of quietly retiring half the gate.
// The failure names both title sets, because a pin reporting only its own emptiness
// leaves the reader to work out which side dropped the title.
it('pairs at least one example title across the guide and the source', () => {
	const guide = createGuide(requireValue(files[GUIDE_SPEC], `Missing file: ${GUIDE_SPEC}`))
	const source = createSource({ files, module: own.source })
	const declared = source
		.examples()
		.map((example) => example.title)
		.filter((title) => title !== undefined)
	const titled = new Set(declared)
	const headings: string[] = []
	const paired: string[] = []
	for (const fence of guide.fences()) {
		if (fence.title === undefined) continue
		headings.push(fence.title)
		if (titled.has(fence.title)) paired.push(fence.title)
	}
	const unpaired =
		paired.length > 0
			? []
			: [
					`${GUIDE_SPEC} pairs: guide ${JSON.stringify(headings)} source ${JSON.stringify(declared)}`,
				]
	expect(unpaired).toEqual([])
})

// The README's pitch and the guide's tagline are one text, each read as the blockquote
// under its file's H1. `README.md` is outside the concept index, so the reader is
// applied to it directly rather than through a manifest row. Each side is guarded
// against `undefined` first, so a file that lost its blockquote reports that rather
// than reporting two absences as agreement.
it('opens the README with the guide tagline', () => {
	const pitch = createGuide(requireValue(files['README.md'], 'Missing file: README.md')).tagline()
	const tagline = createGuide(
		requireValue(files[GUIDE_SPEC], `Missing file: ${GUIDE_SPEC}`),
	).tagline()

	expect(pitch).not.toBeUndefined()
	expect(tagline).not.toBeUndefined()
	expect(pitch).toBe(tagline)
})
""")

# 8. The equality case, directly after the methods loop and before the examples case.
sub1("""		it('documents an example for every Surface function', () => {""",
"""		// The equality gate: a `Summary` cell against its export's description paragraph, a
		// titled fence against the `@example` of that title. `findDrift` owns the comparison
		// and names both sides; converge the two sides with `npm run docs`, never by
		// weakening this assertion. `findDrift` pairs an example only where a title is
		// present on both sides, so an untitled `@example` block is outside this case. Each
		// collected line is the spec, the key, and each side's text or `absent` — the same
		// worklist `npm run docs` prints, so a failure here is read the way that command's
		// output is.
		it('keeps every compared summary and example equal to its source', () => {
			const disagreeing: string[] = []
			for (const drift of findDrift(guide, source)) {
				const left = drift.guide === undefined ? 'absent' : JSON.stringify(drift.guide)
				const right = drift.source === undefined ? 'absent' : JSON.stringify(drift.source)
				disagreeing.push(`${entry.spec} ${drift.key}: guide ${left} source ${right}`)
			}
			expect(disagreeing).toEqual([])
		})

		it('documents an example for every Surface function', () => {""")

# 9. The `guide fences` block comment carries what the header dropped.
sub1("""// Name resolution is not a behavioural proof, so each case here drives part of one flagship fence of
// `guides/terminal.md` through the real exports and asserts the value its comments claim. Change a
// fence, change the transcription beside it.""",
"""// Name resolution is not a behavioural proof, so each case here drives part of one flagship fence of
// `guides/terminal.md` through the real exports and asserts the value its comments claim. Change a
// fence, change the transcription beside it. A fence line whose comment claims no value — a TTY
// walk, an emission, a teardown, a resolved default — carries no case here.""")

p.write_text(t)
print('ok')
